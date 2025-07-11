import Cookies from 'js-cookie'

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || `${window.location.origin}/callback`
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize'

// Spotify OAuth scopes
const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-recently-played',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private'
].join(' ')

// Generate a random string for state parameter
const generateRandomString = (length: number) => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// Redirect to Spotify authorization page
export const redirectToSpotifyAuth = () => {
  const state = generateRandomString(16)
  Cookies.set('spotify_auth_state', state)

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
    state: state
  })

  window.location.href = `${AUTHORIZE_ENDPOINT}?${params.toString()}`
}

// Exchange authorization code for access token
export const getAccessTokenFromCode = async (code: string, state: string) => {
  const storedState = Cookies.get('spotify_auth_state')

  if (state !== storedState) {
    throw new Error('State mismatch')
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI
    }).toString()
  })

  if (!response.ok) {
    throw new Error('Failed to get access token')
  }

  const data = await response.json()

  // Store tokens in cookies
  Cookies.set('spotify_access_token', data.access_token, { expires: data.expires_in / 86400 })
  if (data.refresh_token) {
    Cookies.set('spotify_refresh_token', data.refresh_token, { expires: 365 })
  }

  Cookies.remove('spotify_auth_state')
  return data
}

// Refresh access token using refresh token
export const refreshAccessToken = async () => {
  const refreshToken = Cookies.get('spotify_refresh_token')

  if (!refreshToken) {
    throw new Error('No refresh token available')
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }).toString()
  })

  if (!response.ok) {
    throw new Error('Failed to refresh access token')
  }

  const data = await response.json()

  // Update access token
  Cookies.set('spotify_access_token', data.access_token, { expires: data.expires_in / 86400 })
  if (data.refresh_token) {
    Cookies.set('spotify_refresh_token', data.refresh_token, { expires: 365 })
  }

  return data.access_token
}

// Get current access token (refresh if needed)
const getAccessToken = async () => {
  let accessToken = Cookies.get('spotify_access_token')

  if (!accessToken) {
    try {
      accessToken = await refreshAccessToken()
    } catch (error) {
      throw new Error('No valid access token available')
    }
  }

  return accessToken
}

// Get the current now playing track of given user access token.
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
export const getNowPlaying = async () => {
  const accessToken = await getAccessToken()
  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}

// Get user profile
export const getUserProfile = async () => {
  const accessToken = await getAccessToken()
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return response.json()
}

// Get user's playlists
export const getUserPlaylists = async () => {
  const accessToken = await getAccessToken()
  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return response.json()
}

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!Cookies.get('spotify_access_token') || !!Cookies.get('spotify_refresh_token')
}

// Logout user
export const logout = () => {
  Cookies.remove('spotify_access_token')
  Cookies.remove('spotify_refresh_token')
  Cookies.remove('spotify_auth_state')
}
