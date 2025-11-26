// nextstep.io/hooks/trust-apply/use-scan-history.js
import { useState, useEffect } from 'react'

export function useScanHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem('trust-apply-scan-history')
      if (stored) {
        setHistory(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading scan history:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToHistory = (scanResult) => {
    const newHistory = [scanResult, ...history].slice(0, 50) // Keep last 50 items
    setHistory(newHistory)
    
    try {
      localStorage.setItem('trust-apply-scan-history', JSON.stringify(newHistory))
    } catch (error) {
      console.error('Error saving scan history:', error)
    }
  }

  const clearHistory = () => {
    setHistory([])
    try {
      localStorage.removeItem('trust-apply-scan-history')
    } catch (error) {
      console.error('Error clearing scan history:', error)
    }
  }

  const getScanResult = (scanId) => {
    return history.find(item => item.id === scanId)
  }

  return {
    history,
    loading,
    addToHistory,
    clearHistory,
    getScanResult,
    hasHistory: history.length > 0
  }
}