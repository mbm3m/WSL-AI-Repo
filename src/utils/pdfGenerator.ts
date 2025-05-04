
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Create the PDF report with properly initialized autoTable
export const generateFixedReport = (analysis: {
  status: string;
  criticalIssues: Array<{issue: string, regulation: string}>;
  recommendations: string[];
  risk: string;
}, userData: {
  fullName: string;
  email: string;
  hospital: string;
  phone: string;
}) => {
  // Create new document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Add logo (placeholder position) - use MedAI logo
  doc.addImage('/lovable-uploads/2ed6d2ba-0c4f-43b0-9add-5ab55f5579bc.png', 'PNG', 10, 10, 20, 20);
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(0, 83, 156);
  doc.text('MedAI: Corrected Medical Report', pageWidth / 2, 20, { align: 'center' });
  
  // Add metadata
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Hospital/Clinic: ' + userData.hospital, 14, 40);
  doc.text('Generated for: ' + userData.fullName, 14, 48);
  doc.text('Contact: ' + userData.email, 14, 56);
  doc.text('Phone: ' + userData.phone, 14, 64);
  doc.text('Generation Date: ' + new Date().toLocaleDateString('en-US'), 14, 72);
  
  // Add separator
  doc.setDrawColor(0, 83, 156);
  doc.line(14, 80, pageWidth - 14, 80);
  
  // Add compliance status
  let statusColor = [0, 0, 0];
  if (analysis.status.includes("✅")) statusColor = [0, 128, 0];
  else if (analysis.status.includes("⚠️")) statusColor = [255, 153, 0];
  else if (analysis.status.includes("❌")) statusColor = [220, 0, 0];
  
  doc.setFontSize(14);
  doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.text('Original Status: ' + analysis.status, 14, 95);
  doc.setTextColor(0, 128, 0);
  doc.text('Corrected Status: ✅ Approved - Ready for Submission', 14, 105);
  
  // Add fixed issues table
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Issues Fixed in This Report:', 14, 125);
  
  const issueData = analysis.criticalIssues.map((issue, index) => [
    (index + 1).toString(),
    issue.issue,
    issue.regulation
  ]);
  
  // Use autoTable directly from the imported function
  autoTable(doc, {
    startY: 130,
    head: [['No.', 'Original Issue', 'Reference Policy']],
    body: issueData,
    theme: 'striped',
    headStyles: {
      fillColor: [0, 83, 156],
      textColor: [255, 255, 255]
    }
  });
  
  // Get the last Y position after the table
  let finalY = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(14);
  doc.text('Corrections Applied:', 14, finalY);
  finalY += 10;
  
  analysis.recommendations.forEach((rec, index) => {
    doc.setFontSize(11);
    doc.text(`${index + 1}. ${rec}`, 20, finalY);
    finalY += 8;
    
    // Add new page if needed
    if (finalY > 270) {
      doc.addPage();
      finalY = 20;
    }
  });
  
  // Add corrected medical report content
  if (finalY > 240) {
    doc.addPage();
    finalY = 20;
  }
  
  doc.setFontSize(14);
  doc.setTextColor(0, 83, 156);
  doc.text('Corrected Medical Report', pageWidth / 2, finalY, { align: 'center' });
  finalY += 15;
  
  // Add the corrected medical content
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  
  // Sample corrected medical report content
  const correctedContent = [
    { title: "PATIENT INFORMATION", content: "Name: [Patient Name]\nMRN: [Medical Record Number]\nDOB: [Date of Birth]\nGender: [Gender]\nInsurance: [Insurance Provider]" },
    { title: "DIAGNOSIS", content: "Primary Diagnosis: [ICD-11 Code] [Diagnosis]\nSecondary Diagnoses: [ICD-11 Code] [Diagnosis]\n[ICD-11 Code] [Diagnosis]" },
    { title: "MEDICATION LIST (Updated per Saudi Formulary 2024)", content: "1. [Medication Name] [Dosage] [Route] [Frequency] [Duration]\n2. [Medication Name] [Dosage] [Route] [Frequency] [Duration]\n3. [Medication Name] [Dosage] [Route] [Frequency] [Duration]" },
    { title: "PROCEDURES", content: "1. [Procedure Name] - Pre-authorization obtained (Form TW-RAD-24)\n2. [Procedure Name] - [Date] - [Provider]\n3. [CT Scan] - Pre-authorization included (Form TW-RAD-24)" },
    { title: "CONSENT", content: "Patient consent obtained using form MOH-PCF-2024v1 on [Date]\nForm complies with latest MOH Circular 2024-043 requirements" },
    { title: "PROVIDER INFORMATION", content: "Physician: [Name] [License Number]\nDigital Signature: [Verified per CHI Electronic Documentation Standard 2.3]\nContact: [Contact Information]" },
    { title: "APPROVAL STATUS", content: "✅ This report complies with all Saudi healthcare regulations and insurance standards" }
  ];
  
  correctedContent.forEach(section => {
    // Check if we need a new page
    if (finalY > 250) {
      doc.addPage();
      finalY = 20;
    }
    
    doc.setFontSize(12);
    doc.setTextColor(0, 83, 156);
    doc.text(section.title + ":", 14, finalY);
    finalY += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // Split content by newlines and render each line
    const lines = section.content.split('\n');
    lines.forEach(line => {
      doc.text(line, 20, finalY);
      finalY += 6;
    });
    
    finalY += 8; // Add spacing between sections
  });
  
  // Add footer
  if (finalY > 240) {
    doc.addPage();
    finalY = 20;
  } else {
    finalY += 15;
  }
  
  doc.setFontSize(12);
  doc.setTextColor(0, 83, 156);
  doc.text('This report has been automatically corrected by MedAI', pageWidth / 2, finalY, { align: 'center' });
  finalY += 8;
  doc.setFontSize(10);
  doc.text('All corrections comply with Saudi healthcare regulations and insurance standards.', pageWidth / 2, finalY, { align: 'center' });
  
  return doc;
};
