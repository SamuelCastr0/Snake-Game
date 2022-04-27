import { createStore } from "redux";
import { StateProps as GameProps } from "./ducks/game";
import reducers from "./reducers";

export interface RootStateProps {
  game: GameProps;
}

const store = createStore(reducers);

export default store;
