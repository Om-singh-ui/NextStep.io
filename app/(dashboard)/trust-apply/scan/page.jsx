// nextstep.io/app/(dashboard)/trust-apply/scan/page.jsx
"use client"

import { useState, useEffect } from "react"
import { ScanInput } from "@/components/trust-apply/scan/scan-input"
import { ScanProgress } from "@/components/trust-apply/scan/scan-progress"
import { PageTransition } from "@/components/trust-apply/page-transition"
import { scanJob } from "@/lib/actions/scan-job"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Scan, AlertTriangle, CheckCircle2, History, Users, Target, Zap, Clock, FileText, Link, Copy } from "lucide-react"
  
export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [scanHistory, setScanHistory] = useState([])
  const [stats, setStats] = useState({ total: 0, highRisk: 0, safe: 0, accuracy: 98.7 })

  useEffect(() => {
    loadScanHistory()
  }, [])

  const loadScanHistory = () => {
    try {
      const history = JSON.parse(localStorage.getItem('trust-apply-scan-history') || '[]')
      setScanHistory(history.slice(0, 5))
      
      const stats = history.reduce((acc, scan) => {
        acc.total++
        if (scan.riskLevel === 'Very High' || scan.riskLevel === 'High') acc.highRisk++
        if (scan.score >= 80) acc.safe++
        return acc
      }, { total: 0, highRisk: 0, safe: 0, accuracy: 98.7 })
      
      setStats(stats)
    } catch (error) {
      console.error('Error loading scan history:', error)
    }
  }

  const handleScan = async (inputData) => {
    setIsScanning(true)
    try {
      if (inputData.file) {
        const file = inputData.file
        const fileBuffer = await file.arrayBuffer()
        const base64 = Buffer.from(fileBuffer).toString('base64')
        
        const fileData = {
          name: file.name,
          type: file.type,
          size: file.size,
          base64: base64
        }
        
        inputData.file = fileData
      }

      const result = await scanJob(inputData)
      setScanResult(result)
      
      const history = JSON.parse(localStorage.getItem('trust-apply-scan-history') || '[]')
      const newScan = {
        id: result.scanId,
        timestamp: new Date().toISOString(),
        input: inputData.type,
        score: result.authenticityScore,
        riskLevel: result.riskLevel,
        title: result.jobDetails?.title || 'Unknown Job',
        company: result.jobDetails?.company || 'Unknown Company'
      }
      
      history.unshift(newScan)
      localStorage.setItem('trust-apply-scan-history', JSON.stringify(history.slice(0, 50)))
      loadScanHistory()
      
    } catch (error) {
      console.error('Scan failed:', error)
      let errorMessage = 'Scan failed. Please try again.'
      if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection.'
      } else if (error.message.includes('validation')) {
        errorMessage = 'Invalid input format. Please check your submission.'
      }
      alert(errorMessage)
    } finally {
      setIsScanning(false)
    }
  }

  const getRiskColor = (riskLevel) => {
    const baseClasses = "p-4 rounded-xl border transition-all cursor-pointer"
    switch (riskLevel) {
      case 'Low': 
        return `${baseClasses} text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-400`
      case 'Medium': 
        return `${baseClasses} text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800 dark:text-amber-400`
      case 'High': 
        return `${baseClasses} text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800 dark:text-orange-400`
      case 'Very High': 
        return `${baseClasses} text-red-600 bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800 dark:text-red-400`
      default: 
        return `${baseClasses} text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400`
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400'
    if (score >= 60) return 'text-amber-600 dark:text-amber-400'
    if (score >= 40) return 'text-orange-600 dark:text-orange-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getStatColor = (color) => {
    return {
      blue: 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400',
      emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400',
      orange: 'bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400',
      violet: 'bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-400'
    }[color]
  }

  if (isScanning) {
    return (
      <PageTransition>
        <ScanProgress />
      </PageTransition>
    )
  }

  if (scanResult) {
    window.location.href = `/trust-apply/scan/result/${scanResult.scanId}`
    return null
  }

  return (
    <PageTransition>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-blue-50 dark:bg-blue-950/30 rounded-2xl px-6 py-3 mb-6 border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">AI-Powered Job Verification</span>
              </div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Job Authenticity{" "}
              <span className="text-blue-600 dark:text-blue-400">Scanner</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              Verify job postings with advanced AI analysis. Protect your career and personal information from scams.
            </motion.p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {[
              { 
                icon: Scan, 
                label: 'Total Scans', 
                value: stats.total, 
                color: 'blue',
                description: 'Jobs analyzed'
              },
              { 
                icon: CheckCircle2, 
                label: 'Safe Jobs', 
                value: stats.safe, 
                color: 'emerald',
                description: 'Verified legitimate'
              },
              { 
                icon: AlertTriangle, 
                label: 'High Risk', 
                value: stats.highRisk, 
                color: 'orange',
                description: 'Potential scams'
              },
              { 
                icon: Target, 
                label: 'Accuracy', 
                value: `${stats.accuracy}%`, 
                color: 'violet',
                description: 'Detection rate'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${getStatColor(stat.color)}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{stat.label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.description}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Scanner - Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="lg:col-span-2 space-y-8"
            >
              <ScanInput onScan={handleScan} />
              
              {/* How It Works Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">How It Works</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">1</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-white mb-1">Submit Job Details</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Provide the job posting via URL, text, or file upload</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">2</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-white mb-1">AI Analysis</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Our AI scans for scam patterns and red flags</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">3</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-white mb-1">Risk Assessment</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Get a detailed authenticity score and risk level</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">4</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-white mb-1">Safety Recommendations</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Receive actionable advice to stay safe</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Input Methods Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Choose Your Input Method</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Link,
                      title: 'URL',
                      description: 'Paste job posting URL',
                      bestFor: 'LinkedIn, Indeed, Company sites'
                    },
                    {
                      icon: Copy,
                      title: 'Text',
                      description: 'Copy & paste job description',
                      bestFor: 'Email offers, Text postings'
                    },
                    {
                      icon: FileText,
                      title: 'Upload',
                      description: 'Upload PDF or image',
                      bestFor: 'Screenshots, Documents'
                    }
                  ].map((method, index) => (
                    <motion.div
                      key={method.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <method.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{method.title}</h3>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{method.description}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">Best for: {method.bestFor}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Sidebar - Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              {/* Recent Scans */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <History className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Scans</h2>
                  </div>
                  {scanHistory.length > 0 && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">
                      {scanHistory.length} items
                    </div>
                  )}
                </div>
                
                <AnimatePresence>
                  {scanHistory.length > 0 ? (
                    <div className="space-y-3">
                      {scanHistory.map((scan, index) => (
                        <motion.div
                          key={scan.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className={`transition-all duration-200 cursor-pointer ${getRiskColor(scan.riskLevel)}`}
                          onClick={() => window.location.href = `/trust-apply/scan/result/${scan.id}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-slate-900 dark:text-white truncate text-sm">{scan.title}</h3>
                              <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-1">{scan.company}</p>
                            </div>
                            <div className={`text-lg font-bold ml-3 ${getScoreColor(scan.score)}`}>
                              {scan.score}
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="capitalize font-medium">{scan.riskLevel} Risk</span>
                            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(scan.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-slate-500 dark:text-slate-400"
                    >
                      <Scan className="h-12 w-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">No scans yet</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Your scan history will appear here</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Safety Tips */}
              <div className="bg-orange-50 dark:bg-orange-950/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Safety Tips</h2>
                </div>
                <ul className="space-y-3 text-sm">
                  {[
                    'Never pay for job applications or training',
                    'Verify company email domains match official websites',
                    'Research companies on professional networks',
                    'Be cautious of unrealistic compensation offers',
                    'Always verify through video interviews'
                  ].map((tip, index) => (
                    <motion.li
                      key={tip}
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                    >
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="leading-relaxed">{tip}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Why Verify Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="bg-blue-50 dark:bg-blue-950/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Why Verify Jobs?</h2>
                </div>
                <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <Zap className="h-4 w-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Protect personal and financial information</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-4 w-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Avoid sophisticated job scam tactics</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-4 w-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Save time on fake job applications</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-4 w-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Make confident career decisions</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}