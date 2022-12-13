import IBoard from "../models/IBoard";

const mockBoards: IBoard[] = [
  {
    id: 0,
    name: "December Architecture Meeting",
    teamId: 0,
    topics: [
      {
        id: 0,
        boardId: 0,
        title: "Evaluate unit testing tools",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        state: 0,
      },
      {
        id: 1,
        boardId: 0,
        title: "Discuss adoption of Pinia",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        state: 1,
      },
      {
        id: 3,
        boardId: 0,
        title: "Standardize lint configuration",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        state: 1,
      },
    ],
  },
  {
    id: 1,
    name: "January Architecture Meeting",
    teamId: 0,
    topics: [
      {
        id: 4,
        boardId: 1,
        title: "Look at npm package repository solutions",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        state: 0,
      },
    ],
  },
];

export { mockBoards };
