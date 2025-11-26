// nextstep.io/lib/validations/scan.js
export function validateScanInput(inputData) {
  if (!inputData || typeof inputData !== 'object') {
    return { success: false, error: 'Invalid input data' }
  }

  const { type } = inputData

  switch (type) {
    case 'url':
      return validateURLInput(inputData)
    case 'text':
      return validateTextInput(inputData)
    case 'file':
      return validateFileInput(inputData)
    default:
      return { success: false, error: 'Invalid input type' }
  }
}

function validateURLInput(inputData) {
  const { url } = inputData
  
  if (!url || typeof url !== 'string') {
    return { success: false, error: 'URL is required' }
  }

  try {
    const parsed = new URL(url)
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { success: false, error: 'Invalid URL protocol' }
    }
  } catch {
    return { success: false, error: 'Invalid URL format' }
  }

  if (url.length > 500) {
    return { success: false, error: 'URL too long' }
  }

  return { success: true }
}

function validateTextInput(inputData) {
  const { text } = inputData
  
  if (!text || typeof text !== 'string') {
    return { success: false, error: 'Job text is required' }
  }

  if (text.trim().length < 50) {
    return { success: false, error: 'Job text too short (minimum 50 characters)' }
  }

  if (text.length > 10000) {
    return { success: false, error: 'Job text too long (maximum 10,000 characters)' }
  }

  return { success: true }
}

function validateFileInput(inputData) {
  const { file } = inputData
  
  if (!file) {
    return { success: false, error: 'File is required' }
  }

  // For file objects from the client
  if (file instanceof File) {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: 'File type not supported. Use PDF, JPEG, or PNG.' }
    }

    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return { success: false, error: 'File too large (maximum 10MB)' }
    }
  }
  // For file data from server actions (already processed)
  else if (file && typeof file === 'object') {
    // Basic validation for processed file data
    if (!file.name || !file.type) {
      return { success: false, error: 'Invalid file data' }
    }
  }
  // Invalid file format
  else {
    return { success: false, error: 'Invalid file format' }
  }

  return { success: true }
}

// Export as default for easier imports
const scanValidations = {
  validateScanInput
}
