// nextstep.io/lib/storage/local-cache.js
export class LocalCache {
  constructor(namespace = 'trust-apply') {
    this.namespace = namespace
  }

  set(key, value, ttl = 24 * 60 * 60 * 1000) { // Default 24 hours
    try {
      const item = {
        value,
        expiry: Date.now() + ttl,
        timestamp: Date.now()
      }
      localStorage.setItem(`${this.namespace}:${key}`, JSON.stringify(item))
      return true
    } catch (error) {
      console.error('LocalStorage set error:', error)
      return false
    }
  }

  get(key) {
    try {
      const item = localStorage.getItem(`${this.namespace}:${key}`)
      if (!item) return null

      const parsed = JSON.parse(item)
      
      // Check if expired
      if (Date.now() > parsed.expiry) {
        this.remove(key)
        return null
      }

      return parsed.value
    } catch (error) {
      console.error('LocalStorage get error:', error)
      this.remove(key)
      return null
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(`${this.namespace}:${key}`)
      return true
    } catch (error) {
      console.error('LocalStorage remove error:', error)
      return false
    }
  }

  clear() {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(`${this.namespace}:`)) {
          localStorage.removeItem(key)
        }
      })
      return true
    } catch (error) {
      console.error('LocalStorage clear error:', error)
      return false
    }
  }

  getKeys() {
    try {
      const keys = Object.keys(localStorage)
      return keys
        .filter(key => key.startsWith(`${this.namespace}:`))
        .map(key => key.replace(`${this.namespace}:`, ''))
    } catch (error) {
      console.error('LocalStorage getKeys error:', error)
      return []
    }
  }
}
