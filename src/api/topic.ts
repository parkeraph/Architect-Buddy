import { mockBoards } from "../mockData/mockboards";
import IBoard from "../models/IBoard";

const fakeTransmittionTime = (load: any): Promise<any> => {
  return new Promise((resolve) => setTimeout(() => resolve(load), 1000));
};

const getBoard = async (boardId: number): Promise<IBoard> => {
  console.log(mockBoards, boardId);
  const board = mockBoards.find((board) => board.id === boardId);
  console.log(board);
  return await fakeTransmittionTime(board);
};

export { getBoard };
