const axios = require('axios');

// Read tokens from environment variable, split by comma
const GITHUB_TOKENS = (process.env.GITHUB_TOKENS || '').split(',').filter(token => token.trim() !== '');

if (GITHUB_TOKENS.length === 0) {
  console.error('❌ No GitHub tokens found in the GITHUB_TOKENS environment variable.');
}

function getToken() {
  if (GITHUB_TOKENS.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * GITHUB_TOKENS.length);
  return GITHUB_TOKENS[randomIndex];
}

async function uploadToGitHub(filename, content) {
  const token = getToken();
  if (!token) {
    console.error('❌ Cannot upload to GitHub: No token available.');
    return false;
  }
  const url = `https://api.github.com/repos/sir-bravin111/Session-store/contents/Store/${filename}.json`;

  const data = {
    message: `feat: Add ${filename} session file`,
    content: Buffer.from(content).toString('base64'),
    committer: {
      name: 'Bwmxmd',
      email: 'Bwmxmd@adams.com'
    }
  };

  try {
    await axios.put(url, data, {
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`✅ Session uploaded to GitHub: ${filename}`);
    return true;
  } catch (error) {
    console.error(`❌ GitHub upload failed for ${filename}:`, error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    return false;
  }
}

module.exports = { uploadToGitHub };
