// 리덕스의 핵심 90%
// 리덕스의 컨셉?
// 전역 상태가 필요해 근데 여러 컴포넌트가 상태 값이 접근할 껀데, 그러다가 의도가 다르게 이상하게 수정된다? 그러면 수정이 어디서 잘못 됐느지 찾기가 어려워
// 그래서 컴포넌트가 값을 직접 수정하지 못하게 하자. 무엇을 어떻게 수정해줘라는 TRIGGER를 주는 꼴.
// 내생각:
// 1. 프롭스 드릴 보다 훨씬 수정하기 쉬움.
// 2. set 함수를 넘겨 받으며 이곳 저곳에서 스테이트를 변경하는 건 캡슐화 컨셉에서 벗어남.
// 그래서 차라리 여러곳에서 사용될 상태 값이라면, 그 값을 사용하거나 변경하려는 컴포넌트는 바라보고 수정 요청만 하고 진짜 변경은 리덕스한테 수정하는 형태의 함수를 줄 테니 실행 시켜줘 정도가 됨.

export function createStore(reducer, middleware = []) {
  let state;
  const handler = [];

  function dispatch(action) {
    state = reducer(state, action);
    handler.forEach((listener) => {
      listener();
    });
  }
  function getState() {
    return state;
  }
  function subscribe(listener) {
    handler.push(listener);
  }
  middleware = Array.from(middleware).reverse();

  const store = {
    dispatch,
    getState,
    subscribe,
  };

  let lastDispatch = dispatch;
  middleware.forEach((m) => {
    lastDispatch = m(store)(lastDispatch);
  });
  return { ...store, dispatch: lastDispatch };
}

// 다시보면 store는 값을 변경할 수 있는 디스패치를 갖고 있고 값을 반환해주는 getState도 갖고 있음.
// 필요한 것들을 다 갖고 있는 도구 박스
