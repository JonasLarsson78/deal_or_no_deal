/**
 * Simple encryption/decryption utilities for localStorage
 * Uses XOR cipher with a rotating key
 */

const SECRET_KEY = 'deal_or_no_deal_secret_key_' + new Date().getFullYear()

/**
 * Encrypts sensitive data
 */
export function encrypt(data: any): string {
  try {
    const jsonStr = JSON.stringify(data)
    const encrypted = btoa(
      jsonStr
        .split('')
        .map((char, i) => {
          const keyChar = SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
          return String.fromCharCode(char.charCodeAt(0) ^ keyChar)
        })
        .join('')
    )
    return encrypted
  } catch (error) {
    console.error('Encryption failed:', error)
    return ''
  }
}

/**
 * Decrypts sensitive data
 */
export function decrypt(encrypted: string): any {
  try {
    const decoded = atob(encrypted)
    const decrypted = decoded
      .split('')
      .map((char, i) => {
        const keyChar = SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar)
      })
      .join('')
    return JSON.parse(decrypted)
  } catch (error) {
    console.error('Decryption failed:', error)
    return null
  }
}
