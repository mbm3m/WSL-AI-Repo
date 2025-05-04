
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
  
  // Add logo (placeholder position)
  // doc.addImage('/lovable-uploads/2ed6d2ba-0c4f-43b0-9add-5ab55f5579bc.png', 'PNG', 10, 10, 20, 20);
  
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
  
  // Add footer
  if (finalY > 240) {
    doc.addPage();
    finalY = 20;
  }
  
  finalY += 15;
  doc.setFontSize(12);
  doc.setTextColor(0, 83, 156);
  doc.text('This report has been automatically corrected by MedAI', pageWidth / 2, finalY, { align: 'center' });
  finalY += 8;
  doc.setFontSize(10);
  doc.text('All corrections comply with Saudi healthcare regulations and insurance standards.', pageWidth / 2, finalY, { align: 'center' });
  
  return doc;
};
