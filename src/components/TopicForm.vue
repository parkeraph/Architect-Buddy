<template>
    <v-card id="new-topic-modal-wrapper" :title="formTitle">
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
            @click="onSubmitClick"
            >
                Submit
            </v-btn>

        </div>
    </v-card>    
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, defineEmits, computed, onMounted } from 'vue'
import ITopic from '../models/ITopic';
import { getConversationalTimeLength } from '../utils/timeUtils';


interface NewTopicFormProps {
    formTitle?: string
    topic?: ITopic
}

const { topic, formTitle} = withDefaults(defineProps<NewTopicFormProps>(), {
    formTitle: () => "Create Topic",
    topic: () => { return {
        id: -1,
        boardId: -1,
        title: "",
        description: "",
        state: 0,
        discussionTimeMinutes: null,
        notes: [],
      }}
})

const topicTitle = ref<string>('');
const topicDescription = ref<string>('');
const maxDiscussionTime = ref<number | undefined>(undefined);
const isTimeboxed = ref<boolean>(false)

const timeboxedDiscussion = computed({
    get() {
        return isTimeboxed.value && maxDiscussionTime.value !== undefined
    },
    set(newValue: boolean) {
        isTimeboxed.value = newValue;
        maxDiscussionTime.value = 10
    }
});

onMounted(() => {
    topicTitle.value = topic.title;
    topicDescription.value = topic.description;

    if(topic.discussionTimeMinutes){
        maxDiscussionTime.value = topic.discussionTimeMinutes || 10;
        isTimeboxed.value = true;
    }
        
})

const emit = defineEmits(['submit'])

const conversationalTimeLength = computed(() => getConversationalTimeLength(maxDiscussionTime.value || 0));

const onSubmitClick = () => {
    emit('submit', topicTitle.value, topicDescription.value, isTimeboxed.value ? maxDiscussionTime.value : null, topic.id)    
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