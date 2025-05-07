import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Upload, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { extractTextFromFile } from "@/utils/fileProcessing";

interface FileWithPreview extends File {
  preview?: string;
}

interface DemoFormValues {
  fullName: string;
  email: string;
  hospital: string;
  phone: string;
}

interface AnalysisResult {
  status: string;
  criticalIssues: Array<{issue: string, regulation: string}>;
  recommendations: string[];
  risk: string;
}

const Demo = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [reportFile, setReportFile] = useState<FileWithPreview | null>(null);
  const [policyFile, setPolicyFile] = useState<FileWithPreview | null>(null);
  const [userData, setUserData] = useState<DemoFormValues | null>(null);
  const [analysisStage, setAnalysisStage] = useState<string>("");
  
  const form = useForm<DemoFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      hospital: "",
      phone: "",
    }
  });

  const handleReportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check if file is PDF or DOCX
      if (file.type !== 'application/pdf' && 
          file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        toast.error("Please upload a PDF or DOCX file for the medical report");
        return;
      }
      setReportFile(file);
      toast.success("Medical report file uploaded successfully");
    }
  };

  const handlePolicyFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check if file is PDF or DOCX
      if (file.type !== 'application/pdf' && 
          file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        toast.error("Please upload a PDF or DOCX file for the policies");
        return;
      }
      setPolicyFile(file);
      toast.success("Policy file uploaded successfully");
    }
  };
  
  const navigateToWaitlist = () => {
    navigate('/?scrollToRegistration=true');
  };

  const analyzeWithGPT4o = async (reportText: string, policyText: string) => {
    try {
      setAnalysisStage("Analyzing with GPT-4o...");
      
      // Use Supabase Edge Function instead of direct API call
      const { data, error } = await supabase.functions.invoke('analyze-medical-report', {
        body: {
          reportText,
          policyText
        },
      });
      
      if (error) {
        console.error("Error calling analyze-medical-report:", error);
        throw new Error(error.message || 'Failed to analyze report');
      }
      
      return data;
    } catch (error) {
      console.error("Error analyzing with GPT-4o:", error);
      throw error;
    }
  };

  const onSubmit = async (data: DemoFormValues) => {
    if (!reportFile) {
      toast.error("Please upload a medical report file");
      return;
    }
    
    if (!policyFile) {
      toast.error("Please upload a policy file");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save user data for later use
      setUserData(data);
      
      // Save to Supabase
      const { error } = await supabase.from('applications').insert({
        full_name: data.fullName,
        email: data.email,
        hospital: data.hospital,
        phone: data.phone
      });
      
      if (error) {
        console.error("Error submitting application:", error);
        toast.error("Failed to submit your information. Please try again.");
        setIsSubmitting(false);
        return;
      }
      
      // Show success message
      toast.success("Information submitted successfully!");
      
      // Show report section
      setShowForm(false);
      setShowReport(true);
      
      // Process files - now actually extract text
      setAnalysisStage("Extracting text from medical report...");
      const reportText = await extractTextFromFile(reportFile);
      
      setAnalysisStage("Extracting text from policy document...");
      const policyText = await extractTextFromFile(policyFile);
      
      // Analyze with GPT-4o - using the real API
      try {
        const analysisResult = await analyzeWithGPT4o(reportText, policyText);
        setAnalysis(analysisResult);
      } catch (error) {
        toast.error("Error analyzing report. Please try again later.");
        console.error("Analysis error:", error);
      }
      
      setIsSubmitting(false);
    } catch (err) {
      console.error("Error in submission:", err);
      toast.error("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const resetDemo = () => {
    setShowForm(true);
    setShowReport(false);
    setAnalysis(null);
    setReportFile(null);
    setPolicyFile(null);
    setUserData(null);
    setAnalysisStage("");
    form.reset();
  };

  const getStatusColor = () => {
    if (!analysis) return "";
    
    if (analysis.status.includes("✅")) return "text-green-600";
    if (analysis.status.includes("⚠️")) return "text-amber-500";
    if (analysis.status.includes("❌")) return "text-red-600";
    return "";
  };

  const getStatusIcon = () => {
    if (!analysis) return null;
    
    if (analysis.status.includes("✅")) return <CheckCircle className="h-8 w-8 text-green-600 mb-2" />;
    if (analysis.status.includes("⚠️")) return <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />;
    if (analysis.status.includes("❌")) return <XCircle className="h-8 w-8 text-red-600 mb-2" />;
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Medical Report Compliance Checker
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload your medical report to verify compliance with Saudi Arabia's insurance regulations before submission
            </p>
          </div>

          {showForm && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="bg-blue-50 p-6 rounded-lg mb-8">
                  <h2 className="text-lg font-medium text-blue-800 mb-2">👋 Before You Begin</h2>
                  <p className="text-blue-700">
                    This demo uses GPT-4o to analyze your medical reports against Saudi healthcare regulations. Please enter your details to try it out.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hospital"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hospital/Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your organization" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* File Upload for Medical Report */}
                <div className="space-y-2">
                  <FormLabel>Medical Report</FormLabel>
                  <div className="border border-gray-300 rounded-md bg-white p-4">
                    <label className="flex flex-col items-center justify-center gap-2 cursor-pointer text-center">
                      <FileText className="h-10 w-10 text-blue-500" />
                      <span className="font-medium text-blue-500">
                        {reportFile ? reportFile.name : "Upload medical report"}
                      </span>
                      <span className="text-sm text-gray-500">
                        PDF or DOCX, max 10MB
                      </span>
                      <Input 
                        type="file" 
                        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                        className="hidden" 
                        onChange={handleReportFileChange}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="mt-2"
                      >
                        <Upload className="mr-2 h-4 w-4" /> Browse files
                      </Button>
                    </label>
                  </div>
                </div>
                
                {/* File Upload for Policies */}
                <div className="space-y-2">
                  <FormLabel>Applicable Policies</FormLabel>
                  <div className="border border-gray-300 rounded-md bg-white p-4">
                    <label className="flex flex-col items-center justify-center gap-2 cursor-pointer text-center">
                      <FileText className="h-10 w-10 text-blue-500" />
                      <span className="font-medium text-blue-500">
                        {policyFile ? policyFile.name : "Upload policy documents"}
                      </span>
                      <span className="text-sm text-gray-500">
                        PDF or DOCX, max 10MB
                      </span>
                      <Input 
                        type="file" 
                        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                        className="hidden" 
                        onChange={handlePolicyFileChange}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="mt-2"
                      >
                        <Upload className="mr-2 h-4 w-4" /> Browse files
                      </Button>
                    </label>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Analyze Report"}
                </Button>
              </form>
            </Form>
          )}

          {showReport && (
            <div className="bg-white border rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Compliance Report</h2>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={resetDemo}>Try Another Report</Button>
                </div>
              </div>
              
              {isSubmitting ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-lg text-gray-600">{analysisStage}</p>
                  <p className="text-sm text-gray-500 mt-2">Analyzing with GPT-4o against Saudi healthcare regulations</p>
                </div>
              ) : analysis ? (
                <div className="prose max-w-none">
                  <div className="flex items-center mb-6">
                    {getStatusIcon()}
                    <h3 className={`text-xl font-bold ml-2 ${getStatusColor()}`}>Status: {analysis.status}</h3>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                    <h4 className="text-lg font-semibold mb-2 text-green-800 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" /> Report Analysis Complete
                    </h4>
                    <p className="text-green-700">
                      We've analyzed your report and identified the compliance issues below.
                      Register for early access to get automatic corrections and downloadable fixed reports.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Critical Issues Found:</h4>
                    <ol className="list-decimal pl-5 space-y-2">
                      {analysis.criticalIssues.map((issue, index) => (
                        <li key={index}>
                          <span className="font-medium">{issue.issue}</span> - <span className="text-sm text-gray-600 italic">{issue.regulation}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Fix Recommendations:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                    <h4 className="text-lg font-semibold mb-2 text-amber-800">Regulatory Risk:</h4>
                    <p className="text-amber-700">{analysis.risk}</p>
                  </div>
                </div>
              ) : (
                <p>No analysis available.</p>
              )}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              This is a demonstration version with GPT-4o analysis. 
              <br />For full functionality, please <Button variant="link" onClick={navigateToWaitlist} className="text-blue-500 underline p-0 h-auto">register</Button> for early access.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
