<template>
    <v-card id="new-topic-modal-wrapper" title="Create Topic">
        <div id="new-topic-form">
            
            <v-text-field v-model="topicTitle" variant="outlined" density="compact" label="Topic Name"></v-text-field>
            <v-textarea v-model="topicDescription" label="Topic Description" variant="outlined"></v-textarea>
            
            <v-checkbox
                v-model="timeboxedDiscussion"
                label="Timebox Discussion"
            ></v-checkbox>
            
            <v-slider
                v-if="timeboxedDiscussion"
                v-model="maxDiscussionTime"
                label="Time Limit"
                step="10"
                min="10"
                max="90"
                >
            </v-slider>
            
            <div v-if="timeboxedDiscussion" class="slider-value-display">
                {{conversationalTimeLength}}
            </div>  
                

            <v-btn
            color="#33aef5"
            @click="onCreateClick"
            >
                Create
            </v-btn>

        </div>
    </v-card>    
</template>

<script setup lang="ts">
import { ref, defineEmits, computed } from 'vue'
import ITopic from '../models/ITopic';
import { getConversationalTimeLength } from '../utils/timeUtils';

const topicTitle = ref<string>('');
const topicDescription = ref<string>('');
const timeboxedDiscussion = ref<boolean>(false);
const maxDiscussionTime = ref<number>(10);

const emit = defineEmits(['submit'])

const conversationalTimeLength = computed(() => getConversationalTimeLength(maxDiscussionTime.value));

const onCreateClick = () => {
    emit('submit', topicTitle.value, topicDescription.value, timeboxedDiscussion ? maxDiscussionTime : null)    
}

</script>

<style scoped>
    #new-topic-modal-wrapper {
        padding: 1rem;
        background-color: #eeeeee;
    }
    #new-topic-form {
        padding: 1rem;
    }
    .slider-value-display {
        margin-bottom: 2rem;
        text-align: end;
    }
</style>