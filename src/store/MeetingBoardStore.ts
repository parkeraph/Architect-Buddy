import { defineStore } from "pinia";
import { ref, computed } from "vue";
import ITopic from "../models/ITopic";
import ETopicState from "../models/ETopicState";
import { getBoard } from "../api/topic";

const useMeetingBoardStore = defineStore("MeetingBoard", () => {
  const isLoading = ref<boolean>(false);
  const boardId = ref<number>(0);
  const boardName = ref<string>("");
  const topics = ref<ITopic[]>([]);

  // ----- actions ------
  const fetchTopicsByBoardId = async (requestedBoardId: number) => {
    isLoading.value = true;
    const response = await getBoard(requestedBoardId);
    console.log(response);

    boardId.value = response.id;
    boardName.value = response.name;
    topics.value = response.topics;

    isLoading.value = false;
  };

  const modifyTopic = (topicId: number, newTopic: ITopic) => {
    console.log("new topic", newTopic);

    let topicIdx = 0;
    for (const topic of topics.value) {
      if (topic.id === topicId) {
        topics.value[topicIdx] = newTopic;
        break;
      }
      topicIdx++;
    }
  };

  const changeTopicState = (topicId: number, newState: ETopicState) => {
    let topicIdx = 0;
    for (const topic of topics.value) {
      if (topic.id === topicId) {
        console.log({ ...topic, state: newState });
        topics.value[topicIdx] = { ...topic, state: newState };
        break;
      }
      topicIdx++;
    }
  };

  const createTopic = (
    newTopicTitle: string,
    newTopicDescription: string,
    newDiscussionTimeMinutes: number | null
  ) => {
    //this will be replaced with the api create response
    let highestId = 0;
    for (const topic of topics.value) {
      highestId = topic.id > highestId ? topic.id : highestId;
    }

    const newTopic: ITopic = {
      id: ++highestId,
      title: newTopicTitle,
      description: newTopicDescription,
      boardId: boardId.value,
      state: ETopicState.new,
      discussionTimeMinutes: newDiscussionTimeMinutes,
      notes: [],
    };

    topics.value = [...topics.value, newTopic];
  };

  const deleteTopic = (topicId: number) => {
    topics.value = topics.value.filter((topic) => topic.id !== topicId);
  };

  return {
    isLoading,
    boardId,
    boardName,
    topics,
    fetchTopicsByBoardId,
    modifyTopic,
    changeTopicState,
    createTopic,
    deleteTopic,
  };
});

export default useMeetingBoardStore;
