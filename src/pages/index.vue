<template>
  <div>
    <AppHeader />

    <v-container class="py-8">
      <!-- Show login card if not authenticated -->
      <div v-if="!authStore.isAuthenticated" class="d-flex justify-center">
        <LoginCard />
      </div>

      <!-- Show main content if authenticated -->
      <div v-else>
            <AppBody />
      </div>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LoginCard from '@/components/LoginCard.vue'
import UserProfile from '@/components/UserProfile.vue'

const authStore = useAuthStore()

onMounted(() => {
  // Initialize authentication state
  authStore.initializeAuth()
})

</script>
