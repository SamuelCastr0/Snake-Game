import { Game } from "../types";

const getRandomCoordinates = () => {
  const min = 1;
  const maxX = Game.ARENA_WIDTH;
  const maxY = Game.ARENA_HEIGHT;

  const x = Math.floor(Math.random() * (maxX - min) + min);
  const y = Math.floor(Math.random() * (maxY - min) + min);

  return [x, y];
};

export default getRandomCoordinates;
