import { combineReducers } from "redux";
import counter from "./counter";
import sample from "./sample";
import loading from "./loading";

/*------- 리듀서들을 루트 리듀서에 포함시키기 */

const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

export default rootReducer;
