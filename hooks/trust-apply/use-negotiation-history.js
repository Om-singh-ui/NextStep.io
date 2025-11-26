// nextstep.io/hooks/trust-apply/use-negotiation-history.js
import { useState, useEffect } from 'react'

export function useNegotiationHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem('trust-apply-negotiation-history')
      if (stored) {
        setHistory(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading negotiation history:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToHistory = (draft) => {
    const newHistory = [draft, ...history].slice(0, 50) // Keep last 50 items
    setHistory(newHistory)
    
    try {
      localStorage.setItem('trust-apply-negotiation-history', JSON.stringify(newHistory))
    } catch (error) {
      console.error('Error saving negotiation history:', error)
    }
  }

  const clearHistory = () => {
    setHistory([])
    try {
      localStorage.removeItem('trust-apply-negotiation-history')
    } catch (error) {
      console.error('Error clearing negotiation history:', error)
    }
  }

  const getDraft = (draftId) => {
    return history.find(item => item.id === draftId)
  }

  return {
    history,
    loading,
    addToHistory,
    clearHistory,
    getDraft,
    hasHistory: history.length > 0
  }
}