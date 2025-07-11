<template>
  <v-container class="d-flex flex-row align-center justify-space-between">
    <h3 class="text-center text-h5 mb-4">Spotify to TIDAL Sync</h3>
    <span class="d-flex flex-row align-center justify-space-between">
      <v-btn class="ml-3" :color="spotifyLinked ? 'green' : 'red'" variant="outlined">
        Spotify
        <v-icon class="ml-3">
          {{ spotifyLinked ? 'mdi-link' : 'mdi-link-off' }}
        </v-icon>
      </v-btn>
      <v-btn class="ml-3" :color="tidalLinked ? 'green' : 'red'" variant="outlined">
        TIDAL
        <v-icon class="ml-3">
          {{ tidalLinked ? 'mdi-link' : 'mdi-link-off' }}
        </v-icon>
      </v-btn>
    </span>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const spotifyLinked = computed(() => isAuthenticated.value)
const tidalLinked = ref(false) // TODO: Implement TIDAL authentication
</script>

<style scoped lang="sass">

</style>
