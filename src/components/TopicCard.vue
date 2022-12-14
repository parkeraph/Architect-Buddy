<template>
    <v-card v-if="topic.discussionTimeMinutes" :title="topic.title" :subtitle="getConversationalTimeLength(topic.discussionTimeMinutes)" :text="topic.description">
       <v-card-actions class="card-actions">
            <v-btn size="small" @click="handleEditCLick">
                Edit
            </v-btn>
            <v-btn color="red" size="small" @click="handleDeleteClick">
                Delete
            </v-btn>
       </v-card-actions>
    </v-card>
    <v-card v-else :title="topic.title" subtitle="No time block" :text="topic.description">
        <v-card-actions class="card-actions">
            <v-btn size="small" @click="handleEditCLick">
                Edit
            </v-btn>
            <v-btn color="red" size="small" @click="handleDeleteClick">
                Delete
            </v-btn>
       </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
import { defineProps, computed, defineEmits } from 'vue';
import ITopic from '../models/ITopic';
import { getConversationalTimeLength } from '../utils/timeUtils';

const emit = defineEmits(['delete', 'edit']);

const { topic } = defineProps<{
    topic: ITopic
}>();

const handleDeleteClick = () => {
    emit('delete')
}

const handleEditCLick = () => {
    emit('edit')
}

</script>

<style scoped>
    .card-title-container {
        display: flex;
        justify-content: space-between;
        margin: 0 0 .5rem 0;
    }
</style>
