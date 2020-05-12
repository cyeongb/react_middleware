import { handleActions } from "redux-actions";
import * as api from "../lib/api";

// api.js 에서 데이터를 받아와서 상태를 관리할 sample 이라는 "리듀서"

//------------------------- 엑션 타입을 설정하기
// 한 요청당 세개를 만들어야 한다.
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

//-------------------------- thunk 함수 생성하기
// thunk 함수 내부에서는 시작할때/성공할때/실패할 때 다 다른 action을 dispatch 한다.

export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST }); //요청이 시작된것을 알린다.

  try {
    console.log("getPost 요청 성공");
    const response = await api.getPost(id);

    dispatch({
      // 요청 성공 시
      type: GET_POST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    console.log("getPost 요청 실패 >>", e);

    dispatch({
      // 요청 실패 시
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
    throw e; //나중에 컴포넌트 단에서 에러를 조회할 수 있게 해준다
  }
};

export const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS });
  try {
    console.log("getUsers 요청 성공");
    const response = await api.getUsers();

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    console.log("getUsers 요청 실패>>", e);
    dispatch({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

// -------------------- 초기 상태 선언
// 요청의 로딩중 상태는 loading 객체에서 관리한다.
const initialState = {
  loading: {
    GET_POST: false,
    GET_USERS: false,
  },
  post: null,
  users: null,
};

const sample = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: true, //요청 시작
      },
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false, // 요청 완료
      },
      post: action.payload,
    }),
    [GET_POST_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false,
      },
    }),
    [GET_USERS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: true,
      },
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false,
      },
      users: action.payload,
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false,
      },
    }),
  },
  initialState
);

export default sample;
