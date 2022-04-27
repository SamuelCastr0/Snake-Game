import { combineReducers } from "redux";

import game from "./ducks/game";

const reducers = combineReducers({ game });

export default reducers;
