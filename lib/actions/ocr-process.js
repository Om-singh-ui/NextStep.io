// nextstep.io/lib/actions/ocr-process.js
"use server"

import { processPDF, processImage } from "@/lib/utils/text-extractor"

export async function extractTextFromFile(file) {
  try {
    if (!file) {
      throw new Error('No file provided')
    }

    const fileType = file.type
    
    if (fileType === 'application/pdf') {
      return await processPDF(file)
    } else if (fileType.startsWith('image/')) {
      return await processImage(file)
    } else {
      throw new Error('Unsupported file type')
    }
  } catch (error) {
    console.error('OCR processing error:', error)
    throw new Error(`Failed to extract text: ${error.message}`)
  }
}