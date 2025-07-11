import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  redirectToSpotifyAuth,
  getAccessTokenFromCode,
  isAuthenticated as checkAuth,
  logout as spotifyLogout,
  getUserProfile
} from '@/plugins/spotify'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => checkAuth())
  const isLoggedIn = computed(() => !!user.value)

  // Actions
  const login = () => {
    redirectToSpotifyAuth()
  }

  const handleCallback = async (code: string, state: string) => {
    loading.value = true
    error.value = null

    try {
      await getAccessTokenFromCode(code, state)
      await fetchUser()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Authentication failed'
      console.error('Auth error:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async () => {
    if (!isAuthenticated.value) return

    loading.value = true
    try {
      const userData = await getUserProfile()
      user.value = userData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch user'
      console.error('Failed to fetch user:', err)
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    spotifyLogout()
    user.value = null
    error.value = null
  }

  const initializeAuth = async () => {
    if (isAuthenticated.value && !user.value) {
      await fetchUser()
    }
  }

  return {
    // State
    user,
    loading,
    error,

    // Getters
    isAuthenticated,
    isLoggedIn,

    // Actions
    login,
    logout,
    handleCallback,
    fetchUser,
    initializeAuth
  }
})
