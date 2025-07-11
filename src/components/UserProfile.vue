<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      <v-avatar v-if="user?.images?.[0]" class="me-3">
        <v-img :src="user.images[0].url" :alt="user.display_name" />
      </v-avatar>
      <v-avatar v-else class="me-3" color="green">
        <v-icon>mdi-account</v-icon>
      </v-avatar>

      <div>
        <h3>{{ user?.display_name || 'Spotify User' }}</h3>
        <div class="text-caption text-medium-emphasis">
          {{ user?.followers?.total || 0 }} followers
        </div>
      </div>

      <v-spacer />

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>
              <v-icon start>mdi-logout</v-icon>
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>

    <v-card-text v-if="user">
      <v-row>
        <v-col cols="6">
          <div class="text-caption">Country</div>
          <div class="font-weight-medium">{{ user.country || 'Not specified' }}</div>
        </v-col>
        <v-col cols="6">
          <div class="text-caption">Subscription</div>
          <div class="font-weight-medium text-capitalize">
            {{ user.product || 'free' }}
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-4" />

      <div class="d-flex align-center">
        <v-icon color="green" class="me-2">mdi-spotify</v-icon>
        <span class="text-caption">
          Connected as {{ user.id }}
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const logout = () => {
  authStore.logout()
}
</script>
