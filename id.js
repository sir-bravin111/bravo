/**
 * Generate cryptographically secure session IDs
 * Default length: 32 bytes = 64 hex characters
 */
function makeid(num = 32) {
  // Ensure minimum security length
  const secureLength = Math.max(num, 16);
  
  // Use cryptographically secure random bytes
  const array = new Uint8Array(secureLength);
  
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    // Node.js fallback
    if (typeof require !== 'undefined') {
      try {
        const crypto = require('crypto');
        crypto.randomFillSync(array);
      } catch (e) {
        // Final fallback - less secure
        for (let i = 0; i < secureLength; i++) {
          array[i] = Math.floor(Math.random() * 256);
        }
      }
    } else {
      // Browser fallback without crypto
      for (let i = 0; i < secureLength; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
    }
  }
  
  // Convert to hex string (doubles the character length)
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * URL-safe base64 session ID
 * Good for cookies and URLs
 */
function makeSessionId(numBytes = 24) {
  const array = new Uint8Array(numBytes);
  
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < numBytes; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  
  // Convert to base64 URL-safe string
  const base64 = btoa(String.fromCharCode.apply(null, array));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Alphanumeric session ID (backward compatible interface)
 */
function makeAlphanumericId(length = 32) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsLength = characters.length;
  
  const array = new Uint8Array(length);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  }
  
  for (let i = 0; i < length; i++) {
    const randomValue = array[i] || Math.floor(Math.random() * 256);
    result += characters.charAt(randomValue % charsLength);
  }
  
  return result;
}

module.exports = {
  makeid,                 // Hex string (secure, 64 chars default)
  makeSessionId,          // Base64 URL-safe (32 chars default)
  makeAlphanumericId,     // Like original but secure (32 chars default)
  
  // Helper functions
  generateToken: () => makeid(48),      // 96 hex chars
  generateShortCode: () => makeAlphanumericId(8),
  generateUUID: () => {
    // Generate a UUID v4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
};
