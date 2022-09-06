import { createStore } from "./redux.js";

//data가 참조형이 아니라서 밖에 state는 영향을 안 받기 때문에 return 해줘여 함.

function reducer(state, action) {
  if (action.type === "count") {
    //다른 값들은 그대로 들어가게 스프레드 연산자 쓰고 counter부분만 오버 라이드 되게 !
    return { ...state, counter: action.payload.counter };
  }
  return state;
}

const store = createStore(reducer);

//묶어주는 데이터를 페이로드라고 많이 부름.
store.dispatch({
  type: "count",
  payload: {
    counter: 1,
  },
});
console.log(store.getState());

// updator => 내가 원하는 형태로 함수를 바꿔줘라고 함수를 푸쉬 할 수 있음.
// get으로 값을 꺼내는 이유는 진짜 state를 받게 되면 변경할 수 있기 떄문임.

//! update함수를 리덕스에선 reducer라고 부름;
// 데이터를 전달하고 어떤 함수를 호출할지를 dispatch라고 부름
