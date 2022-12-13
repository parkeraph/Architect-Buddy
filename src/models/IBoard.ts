import ITopic from "./ITopic";

export default interface IBoard {
  id: number;
  name: string;
  teamId: number;
  topics: ITopic[];
}
