<template>
  <v-app>
    <v-main>
      <MeetingBoard :boardId="0"></MeetingBoard>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import MeetingBoard from './partials/MeetingBoard/MeetingBoard.vue';
</script>

