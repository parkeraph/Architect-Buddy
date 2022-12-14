<template>
    <div id="column-wrapper">
        <div id="column-title">{{columnTitle}}</div>
        
        <div 
            v-if="columnTopics.length" 
            @drop="onDrop($event)" 
            @dragenter.prevent 
            @dragover.prevent
        >
            <div 
                v-for="topic in columnTopics" 
                :key="topic.id" 
                draggable="true" 
                @dragstart="startDrag($event, topic)" 
                class="column-item"
            >
                <TopicCard :topic="topic" v-on:delete="onTopicDelete(topic.id)"/>
            </div>
        </div>

        <div v-else id="empty-column-msg" @drop="onDrop($event)" @dragenter.prevent @dragover.prevent>
            <span>Drag and drop content to add..</span>
        </div>
    
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import TopicCard from '../../components/TopicCard.vue';
import ETopicState from '../../models/ETopicState';
import ITopic from '../../models/ITopic';
import useMeetingBoardStore from '../../store/MeetingBoardStore';

const { columnState , columnTitle } = defineProps<{
    columnState: ETopicState,
    columnTitle: string
}>();

const meetingBoardStore = useMeetingBoardStore();
const { topics } = storeToRefs(meetingBoardStore);

const columnTopics = computed(() => {
    return topics.value.filter(topic => topic.state == columnState);
});

const startDrag = (event: DragEvent, item: ITopic) => {
    if(event.dataTransfer){
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('topicId', String(item.id))
    }
}

const onDrop = (event: DragEvent) => {
    if(event.dataTransfer){
        console.log("here")
        const topicId = parseInt(event.dataTransfer.getData('topicId'));
        let topicIdx = 0;
        meetingBoardStore.changeTopicState(topicId, columnState);
    }
}

const onTopicDelete = (topicId: number) => {
    meetingBoardStore.deleteTopic(topicId);
}

</script>

<style scoped lang="scss">
    #column-wrapper {
        height: 100%;
        min-width: 32.75%;
        background-color: #eeeeee ;
        padding: 1rem;
        margin: .5rem .25% 0 .25%;
        border-radius: 3px;
        
    }
    .column-item {
        margin-top: 1rem;
    }

    #empty-column-msg {
        border-style: dashed;
        border-width: 2px;
        min-height: 150px;
        text-align: center;
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-size: medium;
        font-style: italic;
    }

    #column-title {
        font-size: large
    }
</style>