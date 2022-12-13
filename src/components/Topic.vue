<template>
    <v-expansion-panels class="topic-">
        <v-expansion-panel :title="title" :text="content"></v-expansion-panel>
    </v-expansion-panels>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const { title } = defineProps<{
    title: string,
    content: string
}>();

</script>

<style scoped>

</style>
