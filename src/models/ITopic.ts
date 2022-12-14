import ETopicState from "./ETopicState";
import INote from "./INote";

export default interface ITopic {
  id: number;
  boardId: number;
  title: string;
  description: string;
  state: ETopicState;
  discussionTimeMinutes: number | null;
  notes: INote[];
}
