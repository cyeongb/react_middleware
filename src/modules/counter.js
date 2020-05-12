import { createAction, handleActions } from "redux-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// ---createAction
// 액션 생성 자동화
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 1초뒤에 increase 혹은 decrease 함수를 디스패치
export const increaseAsync = () => (dispatch) => {
  console.log("increaseAsync dispatch>>", dispatch);
  setTimeout(() => {
    dispatch(increase());
  }, 500);
};

export const decreaseAsync = () => (dispatch) => {
  console.log("decreaseAsync dispatch>>", dispatch);
  setTimeout(() => {
    dispatch(decrease());
  }, 500);
};

const initialState = 0; //상태가 꼭 객체일 필요없다 숫자도 가능

// ---- handleActions
// switch문 대신 사용가능
// 첫번째 파라미터는 액션에 따라 실행할 함수를 가진 객체, 두번째 파라미터는 상태의 기본값(initialSTATE)을 넣는다.
const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;
