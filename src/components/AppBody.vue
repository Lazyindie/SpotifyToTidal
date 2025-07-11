<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col cols="12" class="text-center">
                <p class="text-h6">Choose the items you'd like to sync</p>
            </v-col>
        </v-row>
    </v-container>
    <v-container class="d-flex flex-column align-center">

        <v-expansion-panels class="w-75 elevation-0 rounded-xl border-lg" multiple v-model="allOpenPanels">
            <v-expansion-panel class="bg-grey-darken-4 rounded-xl" v-for="(variant, index) in variants" :key="variant">
                <v-expansion-panel-title class="rounded-0">
                    <template  v-slot:default="{ expanded }">
                        <span class="d-flex flex-row align-end">
                            <h3 class="ml-5 pl-1 mb-1">{{ variant }}</h3>
                            <span class="ml-3 text-caption opacity-80">{{ subheadings[index] }}</span>
                        </span>
                    </template>
                </v-expansion-panel-title>
            <v-expansion-panel-text class="ma-0 bg-surface-variant ">
                <v-container class="w-100 ml-3 my-3 pl-0 d-flex flex-wrap justify-left align-center">
                    <v-sheet v-for="i in 8" :elevation="24" :height="143" :width="143" class="ma-2 rounded-lg"></v-sheet>
                </v-container>
            </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-container>
        </v-container>
    </v-container>

</template>

<script setup lang="ts">
const variants = ['Playlists', 'Artists', 'Albums', 'Tracks'] as const;
const subheadings = ['Choose which playlists you\'d like to sync', 'Choose which artists to "like" on Tidal', 'Choose which albums to "like" on Tidal', 'Choose which tracks to "like" on Tidal'] as const;
const allOpenPanels = ref([0, 1, 2, 3]);

</script>

<style scoped lang="sass">

</style>
