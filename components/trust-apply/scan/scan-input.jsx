// nextstep.io/components/trust-apply/scan/scan-input.jsx
"use client"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Link2, FileText, Copy, X, AlertCircle, CheckCircle2, Shield, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ScanInput({ onScan }) {
  const [activeTab, setActiveTab] = useState("url")
  const [url, setUrl] = useState("")
  const [text, setText] = useState("")
  const [files, setFiles] = useState([])
  const [isDragActive, setIsDragActive] = useState(false)
  const [validationError, setValidationError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    setValidationError("")

    const droppedFiles = Array.from(e.dataTransfer.files)
    const validFiles = validateFiles(droppedFiles)
    
    if (validFiles.length > 0) {
      setFiles(validFiles.slice(0, 1))
      setValidationError("")
    }
  }, [])

  const validateFiles = (fileList) => {
    return fileList.filter(file => {
      const isValidType = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/jpg'
      ].includes(file.type)
      
      const isValidSize = file.size <= 10 * 1024 * 1024
      
      if (!isValidType) {
        setValidationError('Please upload PDF, JPEG, or PNG files only.')
        return false
      }
      
      if (!isValidSize) {
        setValidationError('File size must be less than 10MB.')
        return false
      }
      
      return true
    })
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setValidationError("")
    
    if (selectedFiles.length > 0) {
      const validFiles = validateFiles(selectedFiles)
      if (validFiles.length > 0) {
        setFiles(validFiles.slice(0, 1))
      }
    }
  }

  const removeFile = () => {
    setFiles([])
    setValidationError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const validateInput = () => {
    setValidationError("")
    
    switch (activeTab) {
      case "url":
        if (!url.trim()) {
          setValidationError("Please enter a job posting URL")
          return false
        }
        try {
          new URL(url.trim())
        } catch {
          setValidationError("Please enter a valid URL starting with http:// or https://")
          return false
        }
        break
      case "text":
        if (!text.trim()) {
          setValidationError("Please paste the job description text")
          return false
        }
        if (text.trim().length < 50) {
          setValidationError("Job description should be at least 50 characters for accurate analysis")
          return false
        }
        if (text.trim().length > 10000) {
          setValidationError("Job description is too long. Please limit to 10,000 characters.")
          return false
        }
        break
      case "file":
        if (files.length === 0) {
          setValidationError("Please select a file to upload")
          return false
        }
        break
    }
    
    return true
  }

  const handleSubmit = async () => {
    if (!validateInput()) return

    setIsSubmitting(true)
    try {
      let inputData = { type: activeTab }

      switch (activeTab) {
        case "url":
          inputData.url = url.trim()
          break
        case "text":
          inputData.text = text.trim()
          break
        case "file":
          inputData.file = files[0]
          break
      }

      await onScan(inputData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit = () => {
    if (isSubmitting) return false
    
    switch (activeTab) {
      case "url": return url.trim().length > 0
      case "text": return text.trim().length >= 50 && text.trim().length <= 10000
      case "file": return files.length > 0
      default: return false
    }
  }

  const getExampleText = () => {
    return `Senior Software Engineer
Tech Innovations Inc. • San Francisco, CA (Remote)
$120,000 - $150,000 per year

About the Role:
We are seeking an experienced Senior Software Engineer to join our dynamic engineering team. You will be responsible for developing scalable web applications and contributing to our platform architecture.

Requirements:
• 5+ years of software development experience
• Proficiency in JavaScript/TypeScript, React, Node.js
• Experience with cloud platforms (AWS, GCP, or Azure)
• Strong understanding of system design and architecture
• Excellent problem-solving and communication skills

Benefits:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• 401(k) with company matching
• Flexible work arrangements and remote options
• Professional development budget
• Generous paid time off

Join our innovative team and help build the future of technology!`
  }

  const pasteExample = () => {
    setText(getExampleText())
  }

  const clearInput = () => {
    switch (activeTab) {
      case "url":
        setUrl("")
        break
      case "text":
        setText("")
        break
      case "file":
        removeFile()
        break
    }
    setValidationError("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
        
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl text-slate-900">Scan Job Posting</CardTitle>
              <CardDescription className="text-slate-600 mt-1">
                Choose your input method for AI-powered authenticity analysis
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-lg">
              <TabsTrigger 
                value="url" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Link2 className="h-4 w-4" />
                URL
              </TabsTrigger>
              <TabsTrigger 
                value="file" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Upload className="h-4 w-4" />
                Upload
              </TabsTrigger>
              <TabsTrigger 
                value="text" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Copy className="h-4 w-4" />
                Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4 pt-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-900 flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-slate-500" />
                  Job Posting URL
                </label>
                <Input
                  type="url"
                  placeholder="https://company.com/careers/senior-engineer"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full h-12 text-slate-900 placeholder-slate-400"
                />
                <p className="text-xs text-slate-500">
                  Enter the full URL from any job board or company career page
                </p>
              </div>
            </TabsContent>

            <TabsContent value="file" className="space-y-4 pt-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-900 flex items-center gap-2">
                  <Upload className="h-4 w-4 text-slate-500" />
                  Upload File
                </label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragActive 
                      ? 'border-blue-300 bg-blue-50 ring-2 ring-blue-100' 
                      : 'border-slate-300 bg-slate-50 hover:border-slate-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileSelect}
                  />
                  <Upload className={`mx-auto h-8 w-8 mb-3 ${
                    isDragActive ? 'text-blue-500' : 'text-slate-400'
                  }`} />
                  <p className="text-sm font-medium text-slate-700 mb-1">
                    {isDragActive ? "Drop file here" : "Drag & drop or click to upload"}
                  </p>
                  <p className="text-xs text-slate-500">
                    Supports PDF, PNG, JPG • Max 10MB
                  </p>
                </div>
              </div>
              
              <AnimatePresence>
                {files.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-between p-4 border border-emerald-200 bg-emerald-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <div>
                        <span className="text-sm font-medium text-slate-900 block">{files[0].name}</span>
                        <span className="text-xs text-slate-500">
                          ({(files[0].size / 1024 / 1024).toFixed(1)} MB)
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 text-slate-400"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="text" className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-900 flex items-center gap-2">
                  <Copy className="h-4 w-4 text-slate-500" />
                  Paste Job Description
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={pasteExample}
                    className="text-xs h-8"
                  >
                    Use Example
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearInput}
                    className="text-xs h-8"
                    disabled={!text.trim()}
                  >
                    Clear
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder="Paste the complete job description here... Include details like company name, position, requirements, and benefits for best results."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                className="resize-none w-full font-sans text-slate-900 placeholder-slate-400 border-slate-300 focus:border-blue-300"
              />
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Minimum 50 characters required</span>
                <span className={
                  text.length < 50 ? 'text-red-500 font-medium' : 
                  text.length > 10000 ? 'text-red-500 font-medium' : 
                  'text-emerald-600 font-medium'
                }>
                  {text.length} / 10,000 characters
                </span>
              </div>
            </TabsContent>
          </Tabs>

          <AnimatePresence>
            {validationError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 p-4 border border-red-200 bg-red-50 rounded-xl"
              >
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-700">{validationError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <Button 
              className="w-full h-12 text-base font-medium" 
              size="lg"
              onClick={handleSubmit}
              disabled={!canSubmit()}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Zap className="h-4 w-4" />
                    Analyze Job Posting
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            <div className="text-center">
              <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" />
                Your data is processed securely and never stored on our servers
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  // Helper function for drag and drop
  function getRootProps() {
    return {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop
    }
  }
} 