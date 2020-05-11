const loggerMiddleware = (store) => (next) => (action) => {
  // 미들웨어 기본 구조
  // 미들웨어는 함수를 반환하는 함수이다.
  // store : 리덕스 스토어 인스턴스
  // next : 함수 형태 파라미터
  // ㄴ next 를 호출하면 그다음 처리해야할 미들웨어에게 액션을 넘겨주고 그다음 미들웨어가 없으면 리듀서에게 액션을 넘겨준다.

  console.group("액션 타입으로 log를 그룹화", action && action.type); //
  console.log("이전상태>>", store.getState());
  console.log("액션>>", action);
  next(action); //다음 미들웨어 또는 리듀서에게 전달
  console.log("다음상태>>", store.getState());
  console.groupEnd(); //그룹 끝
};

export default loggerMiddleware;
