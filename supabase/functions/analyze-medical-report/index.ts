
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reportText, policyText } = await req.json();

    if (!reportText || !policyText) {
      return new Response(
        JSON.stringify({ error: 'Both report text and policy text are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Analyzing report with GPT-4o. Report length:", reportText.length, "Policy length:", policyText.length);

    const systemPrompt = `You are an expert medical compliance checker specializing in Saudi Arabian healthcare regulations.
    
Your task is to analyze medical reports for compliance against insurance policies and Saudi healthcare regulations.

For each report, you must:
1. Check the report against the provided policy document
2. Identify any compliance issues or missing information
3. Reference specific Saudi healthcare regulations that are relevant (CCHI, MOH, NPHIES standards)
4. Determine if the report would likely be rejected by insurance companies

Return the analysis in the following JSON format:
{
  "status": "(One of: '✅ Fully Compliant - Ready for Submission', '⚠️ Minor Issues – Needs Fixes Before Submission', '❌ Major Issues - High Risk of Rejection')",
  "criticalIssues": [
    {
      "issue": "Brief description of the issue",
      "regulation": "Specific regulatory reference (e.g., 'Saudi Formulary (2024 Edition), Section X.Y.Z')"
    }
  ],
  "recommendations": ["List of specific recommendations to improve compliance"],
  "risk": "A detailed explanation of the risks if submitted as-is"
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Please analyze the following medical report against the provided insurance policy for compliance with Saudi healthcare regulations.
            
Medical Report:
${reportText}

Insurance Policy:
${policyText}

Provide your analysis in the specified JSON format.`
          }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    
    // Parse the content as JSON to ensure proper format
    const analysisText = data.choices[0].message.content;
    console.log("Received analysis from GPT-4o:", analysisText);
    
    const analysis = JSON.parse(analysisText);

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-medical-report function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
