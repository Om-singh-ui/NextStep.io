// nextstep.io/lib/utils/text-extractor.js
export async function extractTextFromInput(inputData) {
  console.log('Extracting text from input type:', inputData.type)
  
  switch (inputData.type) {
    case 'url':
      return await extractTextFromURL(inputData.url)
    case 'text':
      return inputData.text
    case 'file':
      return await extractTextFromFile(inputData.file)
    default:
      throw new Error('Unsupported input type: ' + inputData.type)
  }
}

async function extractTextFromURL(url) {
  try {
    console.log('Extracting from URL:', url)
    // Mock implementation for URL extraction
    // In production, you'd use a service like Puppeteer or a dedicated API
    const mockContent = `Job posting from: ${url}

Company: Example Tech Corp
Position: Software Engineer
Location: San Francisco, CA (Remote)
Salary: $120,000 - $150,000

Job Description:
We are looking for a skilled Software Engineer to join our dynamic team. The ideal candidate will have experience with modern web technologies and a passion for building scalable applications.

Requirements:
- 3+ years of software development experience
- Proficiency in JavaScript/TypeScript
- Experience with React or similar frameworks
- Knowledge of cloud platforms (AWS, GCP, or Azure)

This is a mock implementation. In production, this would extract actual job posting content from the URL.`
    
    return mockContent
  } catch (error) {
    console.error('URL extraction error:', error)
    return `Job posting from: ${url}\n\nUnable to extract content automatically. Please verify the URL manually.`
  }
}

async function extractTextFromFile(file) {
  try {
    console.log('Extracting from file:', file?.name || file?.type)
    
    // Handle both File objects and processed file data
    const fileName = file.name || 'uploaded_file'
    const fileType = file.type || 'unknown'
    const fileSize = file.size ? `(${(file.size / 1024 / 1024).toFixed(2)}MB)` : ''
    
    if (fileType === 'application/pdf') {
      return `Extracted text from PDF: ${fileName} ${fileSize}

Company: Tech Innovations Inc.
Position: Senior Developer
Location: New York, NY
Salary: $130,000 - $160,000

Job Description:
We are seeking a Senior Developer to lead our engineering initiatives. The role involves architecting scalable systems and mentoring junior developers.

Key Responsibilities:
- Design and implement software solutions
- Collaborate with cross-functional teams
- Ensure code quality and best practices
- Participate in code reviews

This is a mock PDF extraction. In production, this would use a proper PDF text extraction service.`
    } else if (fileType.startsWith('image/')) {
      return `Extracted text from image: ${fileName} ${fileSize}

Company: Digital Solutions Ltd.
Position: Frontend Engineer
Location: Austin, TX (Hybrid)
Salary: $110,000 - $140,000

Job Description:
Join our frontend team to build amazing user experiences. We value clean code, performance, and user-centric design.

Requirements:
- Strong CSS/HTML/JavaScript skills
- Experience with modern frontend frameworks
- Understanding of responsive design
- Portfolio of previous work

This is a mock image OCR extraction. In production, this would use OCR services to extract text from images.`
    } else {
      return `File: ${fileName} (${fileType}) ${fileSize}

Unsupported file type for automatic text extraction. Please provide the job description in text format or use a supported file type (PDF, PNG, JPG).`
    }
  } catch (error) {
    console.error('File extraction error:', error)
    throw new Error(`Failed to extract text from file: ${error.message}`)
  }
}

// Mock implementations for backward compatibility
export async function processPDF(file) {
  return extractTextFromFile(file)
}

export async function processImage(file) {
  return extractTextFromFile(file)
}