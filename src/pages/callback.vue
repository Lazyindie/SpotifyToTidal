<template>
  <div class="d-flex align-center justify-center min-height-screen">
    <v-card class="pa-6" max-width="400">
      <v-card-title class="text-center">
        <v-icon color="green" size="48" class="mb-4">
          mdi-spotify
        </v-icon>
        <h2>Authenticating with Spotify</h2>
      </v-card-title>

      <v-card-text class="text-center">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="green"
          size="48"
          class="mb-4"
        />

        <div v-if="error" class="text-error">
          <v-icon color="error" class="mb-2">mdi-alert-circle</v-icon>
          <p>{{ error }}</p>
          <v-btn color="primary" @click="$router.push('/')">
            Go Home
          </v-btn>
        </div>

        <div v-else-if="!loading">
          <v-icon color="success" class="mb-2">mdi-check-circle</v-icon>
          <p>Successfully authenticated!</p>
          <p>Redirecting...</p>
        </div>

        <p v-else>
          Please wait while we complete your authentication...
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const { loading, error } = storeToRefs(authStore)

onMounted(async () => {
  const code = route.query.code as string
  const state = route.query.state as string
  const errorParam = route.query.error as string

  if (errorParam) {
    authStore.error = 'Authentication was cancelled or failed'
    setTimeout(() => router.push('/'), 3000)
    return
  }

  if (!code || !state) {
    authStore.error = 'Invalid callback parameters'
    setTimeout(() => router.push('/'), 3000)
    return
  }

  try {
    await authStore.handleCallback(code, state)
    // Redirect to home page on success
    setTimeout(() => router.push('/'), 2000)
  } catch (err) {
    // Error is handled in the store
    setTimeout(() => router.push('/'), 3000)
  }
})
</script>

<style scoped>
.min-height-screen {
  min-height: 100vh;
}
</style>
