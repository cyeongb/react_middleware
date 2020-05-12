import { handleActions } from "redux-actions"; //handleAction 이라는 reducer는  보통 action 처리와 error action 처리를 하기 위해 사용한다.
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";

// api.js 에서 데이터를 받아와서 상태를 관리할 sample 이라는 "리듀서"
// sample 리듀서에서는 로딩중에 대한 상태처리를 할 필요가 없다. 성공했을때의 케이스만 잘 관리하면 된다.

//------------------------- 엑션 타입을 설정하기
// 한 요청당 세개를 만들어야 한다.
// const 객체에 타입을 설정하는데 , 중복되지 않게 해당 패키지명/타입명 으로 설정한다.
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
//const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
//const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

//-------------------------- thunk 함수 생성하기
// thunk 함수 내부에서는 시작할때/성공할때/실패할 때 다 다른 action을 dispatch 한다.
// createRequestThunk 컴포넌트에서 요청에 따른 처리를 해 준다.
export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

// -------------------- 초기 상태 선언
// 요청의 로딩중 상태는 loading 객체에서 관리한다.
const initialState = {
  //   loading: {
  //     GET_POST: false, //로딩중에는 요청 상태를 false로 만들어 놓는다.
  //     GET_USERS: false,
  //   },
  post: null,
  users: null,
};

const sample = handleActions(
  {
    // [GET_POST]: (state) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_POST: true, //요청 시작
    //   },
    // }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      //   loading: {
      //     ...state.loading,
      //     GET_POST: false, // 요청 완료
      //   },
      post: action.payload,
    }),
    // [GET_POST_FAILURE]: (state, action) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_POST: false,
    //   },
    // }),
    // [GET_USERS]: (state) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_USERS: true,
    //   },
    // }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      //   loading: {
      //     ...state.loading,
      //     GET_USERS: false,
      //   },
      users: action.payload,
    }),
    // [GET_USERS_FAILURE]: (state, action) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_USERS: false,
    //   },
    // }),
  },
  initialState
);

export default sample;
