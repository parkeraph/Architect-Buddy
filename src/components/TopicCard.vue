<template>
    <v-card v-if="topic.discussionTimeMinutes" :title="topic.title" :subtitle="conversationalTimeLength" :text="topic.description">
       <v-card-actions class="card-actions">
            <v-btn size="small">
                Edit
            </v-btn>
            <v-btn color="red" size="small" @click="handleDelete">
                Delete
            </v-btn>
       </v-card-actions>
    </v-card>
    <v-card v-else  subtitle="No time block" :text="topic.description">
    </v-card>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import ITopic from '../models/ITopic';
import { getConversationalTimeLength } from '../utils/timeUtils';

const emit = defineEmits(['delete', 'changed']);

const { topic } = defineProps<{
    topic: ITopic
}>();

const conversationalTimeLength = getConversationalTimeLength(topic.discussionTimeMinutes)

const handleDelete = () => {
    emit('delete')
}

</script>

<style scoped>
    .card-title-container {
        display: flex;
        justify-content: space-between;
        margin: 0 0 .5rem 0;
    }
</style>
