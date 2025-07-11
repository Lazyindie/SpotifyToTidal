<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title class="text-center pa-6">
      <v-icon class="mb-4" color="green" size="64">
        mdi-spotify
      </v-icon>
      <h2>Connect to Spotify</h2>
    </v-card-title>

    <v-card-text class="text-center pa-6">
      <p class="mb-6">
        Connect your Spotify account to sync your music and access your playlists.
      </p>

      <v-btn
        block
        color="green"
        :loading="loading"
        prepend-icon="mdi-spotify"
        size="large"
        variant="elevated"
        @click="login"
      >
        Connect with Spotify
      </v-btn>
      <v-btn
        block
        color="white"
        :loading="loading"
        size="large"
        variant="elevated"
        @click="login"
      >
        <v-icon alt="TIDAL Logo" class="mr-2" sizes="xs" src="custom-tidal" />
        Connect with TIDAL
      </v-btn>

      <v-alert
        v-if="error"
        class="mt-4"
        :text="error"
        type="error"
      />
    </v-card-text>

    <v-card-text class="text-center text-caption pa-4">
      <p>
        By connecting, you agree to allow this app to access your Spotify data
        including playlists and currently playing tracks.
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'

  const authStore = useAuthStore()
  const { loading, error } = storeToRefs(authStore)

  const login = () => {
    authStore.login()
  }
</script>
