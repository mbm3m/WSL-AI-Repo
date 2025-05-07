
// Function to convert file to text
export const extractTextFromFile = async (file: File): Promise<string> => {
  if (file.type === 'application/pdf') {
    return extractTextFromPDF(file);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return extractTextFromDOCX(file);
  } else {
    // For other file types, try to read as text
    return readAsText(file);
  }
};

const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    // We'll use pdf.js to extract text from PDF
    const pdfjs = await import('pdfjs-dist');
    const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
    
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText || `[Could not extract text from PDF: ${file.name}]`;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return `[Error extracting text from PDF: ${file.name}]`;
  }
};

const extractTextFromDOCX = async (file: File): Promise<string> => {
  try {
    // We'll use mammoth to extract text from DOCX
    const mammoth = await import('mammoth');
    
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    return result.value || `[Could not extract text from DOCX: ${file.name}]`;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    return `[Error extracting text from DOCX: ${file.name}]`;
  }
};

const readAsText = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result.toString());
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = (e) => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsText(file);
  });
};
