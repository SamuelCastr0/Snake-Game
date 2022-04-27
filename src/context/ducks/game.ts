import { Action, Reducer } from "redux";
import { ValuesType } from "utility-types";
import getRandomCoordinates from "../../utils/getRandomCoodinates";

export enum ActionTypes {
  SNAKE = "SNAKE/SET_DOTS",
  FOOD = "FOOD/SET_DOTS",
  DIRECTION = "DIRECTION/SET",
  SPEED = "SPEED/SET",
  PLAY = "GAME/TOOGLE",
  CRASH = "GAME/CRASH",
  RESET = "GAME/RESET",
}

export interface StateProps {
  snakeDots: number[][];
  foodDots: number[][];
  snakeSpeed: number;
  isPlaying: boolean;
  hasSnakeCrashed: boolean;
  direction: "UP" | "DOWN" | "LEFT" | "RIGHT";
}

export interface ActionProps extends Action<ActionTypes> {
  value: ValuesType<StateProps>;
}

const initialState: StateProps = {
  snakeDots: [
    [0, 0],
    [1, 0],
  ],
  foodDots: [getRandomCoordinates()],
  snakeSpeed: 200,
  isPlaying: false,
  hasSnakeCrashed: false,
  direction: "RIGHT",
};

const reducer: Reducer<StateProps, ActionProps> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.SNAKE:
      return { ...state, snakeDots: action.value as number[][] };
    case ActionTypes.FOOD:
      return { ...state, foodDots: action.value as number[][] };
    case ActionTypes.DIRECTION:
      return {
        ...state,
        direction: action.value as "UP" | "DOWN" | "LEFT" | "RIGHT",
      };
    case ActionTypes.PLAY:
      return { ...state, isPlaying: action.value as boolean };
    case ActionTypes.SPEED:
      return { ...state, snakeSpeed: action.value as number };
    case ActionTypes.CRASH:
      return { ...state, hasSnakeCrashed: action.value as boolean };
    case ActionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

export const actions = {
  snake: (value: number[][]) => ({ type: ActionTypes.SNAKE, value }),
  food: (value: number[][]) => ({ type: ActionTypes.FOOD, value }),
  direction: (value: string) => ({ type: ActionTypes.DIRECTION, value }),
  speed: (value: number) => ({ type: ActionTypes.SPEED, value }),
  play: (value: boolean) => ({ type: ActionTypes.PLAY, value }),
  crash: (value: boolean) => ({ type: ActionTypes.CRASH, value }),
  reset: () => ({ type: ActionTypes.RESET }),
};

export default reducer;
