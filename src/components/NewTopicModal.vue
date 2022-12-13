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
                step="1"
                >
            </v-slider>
            
            <div v-if="timeboxedDiscussion" class="slider-value-display">
                <span v-if="Math.floor(maxDiscussionTime / 60) > 0">
                    {{Math.floor(maxDiscussionTime / 60)}}
                    <span v-if="Math.floor(maxDiscussionTime / 60) > 1">{{Math.floor(maxDiscussionTime / 60)}} hours </span>
                    <span v-else> hour </span>
                </span>
                <span>{{maxDiscussionTime % 60}} minutes </span>
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
import { ref, defineEmits } from 'vue'
import ITopic from '../models/ITopic';

const topicTitle = ref<string>('');
const topicDescription = ref<string>('');
const timeboxedDiscussion = ref<boolean>(false);
const maxDiscussionTime = ref<number>(0);

const emit = defineEmits(['submit'])


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