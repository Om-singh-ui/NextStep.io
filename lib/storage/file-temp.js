// nextstep.io/lib/storage/file-temp.js
import { writeFile, unlink, readFile } from 'fs/promises'
import { join } from 'path'
import { tmpdir } from 'os'

export class TemporaryFileStorage {
  constructor() {
    this.files = new Map()
    this.cleanupInterval = setInterval(() => this.cleanup(), 60 * 60 * 1000) // Cleanup hourly
  }

  async storeFile(buffer, filename, ttl = 60 * 60 * 1000) { // 1 hour default
    try {
      const filepath = join(tmpdir(), `trust-apply-${Date.now()}-${filename}`)
      await writeFile(filepath, buffer)
      
      const fileInfo = {
        filepath,
        filename,
        storedAt: Date.now(),
        expiresAt: Date.now() + ttl
      }
      
      this.files.set(filepath, fileInfo)
      return fileInfo
    } catch (error) {
      console.error('File storage error:', error)
      throw new Error('Failed to store temporary file')
    }
  }

  async getFile(filepath) {
    try {
      const fileInfo = this.files.get(filepath)
      if (!fileInfo) {
        throw new Error('File not found')
      }

      // Check if expired
      if (Date.now() > fileInfo.expiresAt) {
        await this.deleteFile(filepath)
        throw new Error('File expired')
      }

      const buffer = await readFile(filepath)
      return { buffer, fileInfo }
    } catch (error) {
      console.error('File retrieval error:', error)
      throw error
    }
  }

  async deleteFile(filepath) {
    try {
      await unlink(filepath)
      this.files.delete(filepath)
      return true
    } catch (error) {
      console.error('File deletion error:', error)
      this.files.delete(filepath) // Remove from tracking even if file doesn't exist
      return false
    }
  }

  async cleanup() {
    const now = Date.now()
    const expiredFiles = []
    
    for (const [filepath, fileInfo] of this.files) {
      if (now > fileInfo.expiresAt) {
        expiredFiles.push(filepath)
      }
    }

    for (const filepath of expiredFiles) {
      await this.deleteFile(filepath)
    }

    return expiredFiles.length
  }

  getFileInfo(filepath) {
    return this.files.get(filepath)
  }

  destroy() {
    clearInterval(this.cleanupInterval)
    // Clean up all files on destruction
    this.cleanup()
  }
}

