
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, Upload, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface FileWithPreview extends File {
  preview?: string;
}

interface DemoFormValues {
  fullName: string;
  email: string;
  hospital: string;
  phone: string;
}

const Demo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [analysis, setAnalysis] = useState<{
    status: string;
    criticalIssues: Array<{issue: string, regulation: string}>;
    recommendations: string[];
    risk: string;
  } | null>(null);
  const [reportFile, setReportFile] = useState<FileWithPreview | null>(null);
  const [policyFile, setPolicyFile] = useState<FileWithPreview | null>(null);
  
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
      
      // Simulate AI compliance analysis
      setTimeout(() => {
        // Sample compliance analysis - in a real app, this would come from the backend
        const sampleAnalysis = {
          status: "⚠️ Minor Issues – Needs Fixes Before Submission",
          criticalIssues: [
            {
              issue: "Incomplete medication documentation",
              regulation: "Saudi Formulary (2023 Edition), Section 4.2"
            },
            {
              issue: "Missing pre-authorization for radiology procedure",
              regulation: "Tawuniya Policy Rules, Article 17.3"
            },
            {
              issue: "Outdated patient consent form used",
              regulation: "MOH Circular 2023-114, Documentation Requirements"
            }
          ],
          recommendations: [
            "Include full medication list with dosages and durations following Saudi Formulary guidelines",
            "Submit prior authorization form TW-RAD-23 for the CT scan procedure",
            "Replace consent form with latest version (MOH-PCF-2023v2) and ensure all fields are completed",
            "Add ICD-10-CM codes for all documented diagnoses"
          ],
          risk: "If submitted as-is, this report will face a mandatory 14-day delay in processing, with a 73% chance of claim denial according to NPHIES statistics for similar documentation issues. Patient may face uncovered charges for radiology procedures."
        };
        
        setAnalysis(sampleAnalysis);
        setIsSubmitting(false);
      }, 3000);
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
                    This is a demonstration version with simulated AI analysis. Please enter your details to try it out.
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
                <Button variant="outline" onClick={resetDemo}>Try Another Report</Button>
              </div>
              
              {isSubmitting ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-lg text-gray-600">Analyzing your report...</p>
                  <p className="text-sm text-gray-500 mt-2">Checking against Saudi healthcare regulations</p>
                </div>
              ) : analysis ? (
                <div className="prose max-w-none">
                  <div className="flex items-center mb-6">
                    {getStatusIcon()}
                    <h3 className={`text-xl font-bold ml-2 ${getStatusColor()}`}>Status: {analysis.status}</h3>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Critical Issues:</h4>
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
                    <h4 className="text-lg font-semibold mb-2 text-amber-800">Regulatory Risk if Submitted As-Is:</h4>
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
              This is a demonstration version with simulated AI analysis. 
              <br />For full functionality, please <button onClick={resetDemo} className="text-blue-500 underline">register</button> for early access.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
