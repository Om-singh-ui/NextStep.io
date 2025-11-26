// nextstep.io/lib/actions/file-upload.js
"use server"

import { writeFile } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

export async function uploadFile(formData) {
  try {
    const file = formData.get('file')
    if (!file) {
      throw new Error('No file uploaded')
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size must be less than 10MB')
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only PDF, JPEG, and PNG files are allowed')
    }

    // Create temporary file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.type === 'application/pdf' ? 'pdf' : 
                     file.type === 'image/jpeg' ? 'jpg' : 'png'
    const filename = `upload_${timestamp}.${extension}`
    const filepath = join(tmpdir(), filename)
    
    // Write to temporary directory
    await writeFile(filepath, buffer)
    
    return {
      success: true,
      filename,
      filepath,
      size: file.size,
      type: file.type
    }
  } catch (error) {
    console.error('File upload error:', error)
    throw new Error(`Upload failed: ${error.message}`)
  }
}