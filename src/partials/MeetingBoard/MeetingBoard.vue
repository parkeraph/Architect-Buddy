<template>
    <div v-if="!isLoading" id="meeting-board-wrapper">
        <MeetingBoardColumn column-title="New Topics" :column-state="ETopicState.new"></MeetingBoardColumn>
        <MeetingBoardColumn column-title="Staged For Meeting" :column-state="ETopicState.staged"></MeetingBoardColumn>
        <MeetingBoardColumn column-title="Closed Topic" :column-state="ETopicState.closed"></MeetingBoardColumn>
    </div>
    <div v-else>
        Loading..
    </div>

    <v-dialog max-width="50%" v-model="showTaskCreationModal" >
        <TopicForm @submit="handleNewTopicSubmit" v-show="showTaskCreationModal"></TopicForm>
    </v-dialog>

    <v-btn
        icon
        color="#33aef5"
        size="x-large"
        id="add-topic-btn"
        :class="[{'is-top': focusedBtn === 'add'}]"
        @click="showTaskCreateModal"
        @mouseenter="focusedBtn = 'add'"
    >
        <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-btn
        icon
        color="#56f089"
        size="x-large"
        id="play-btn"
        :class="[{'is-top': focusedBtn === 'play'}]"
        @mouseenter="focusedBtn = 'play'"
    >
        <v-icon>mdi-play</v-icon>
    </v-btn>

</template>

<script setup lang="ts">
    import { ref, defineProps , onBeforeMount } from 'vue';
    import { storeToRefs } from 'pinia';
    import ETopicState from '../../models/ETopicState';
    import useMeetingBoardStore from '../../store/MeetingBoardStore';
    import MeetingBoardColumn from './MeetingBoardColumn.vue';
    import TopicForm from '../../components/TopicForm.vue';

    const { boardId } = defineProps<{
        boardId: number
    }>();

    const meetingBoardStore = useMeetingBoardStore();
    const { isLoading } = storeToRefs(meetingBoardStore)
    const showTaskCreationModal = ref<boolean>(false);
    const focusedBtn = ref<string>('');

    onBeforeMount(async () => {
        await meetingBoardStore.fetchTopicsByBoardId(boardId);
    })

    const showTaskCreateModal = () => {
        showTaskCreationModal.value = true;
    }

    const hideTaskCreateModal = () => {
        showTaskCreationModal.value = false;
    }

    const handleNewTopicSubmit = (title: string, description: string, discussionTime: number | null) => {
        showTaskCreationModal.value = false;
        console.log('handleNewTopicSubmit', title, description);
        meetingBoardStore.createTopic(title, description, discussionTime);
    }

    </script>

    <style scoped>
        #meeting-board-wrapper {
            display: flex;
            
        }

        .is-top {
            z-index: 1;
        }

        #add-topic-btn {
            position: fixed;
            bottom: 8px;
            right: 8px;
        }
        
        #add-topic-btn {
            position: fixed;
            bottom: 8px;
            right: 60px;
        }

        #play-btn {
            position: fixed;
            bottom: 8px;
            right: 8px;
        }

        #new-topic-modal {
            width: 500px
        }
</style>