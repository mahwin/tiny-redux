import { createStore } from "./redux.js";

const COUNTER = "counter"; // 액션타입

//data가 참조형이 아니라서 밖에 state는 영향을 안 받기 때문에 return 해줘여 함.
function reducer(state, action) {
  if (action.type === COUNTER) {
    //다른 값들은 그대로 들어가게 스프레드 연산자 쓰고 counter부분만 오버 라이드 되게 !
    return { ...state, counter: action.payload.counter };
  }
  return state;
}

const store = createStore(reducer);

// 두개의 컴포넌트(A,B)가 하나의 값을 바라보고 있는데  B가 값을 바꿨음. 그러면 A는 모르잖아 그걸 해결하기 위해서 pub sub 구조를 갖춰줌.
// 구독하고 있으면 바꼇을때 바로 알려주기!
// 이렇게 핸들러를 store에 연결해놓으면 누가 바꿔도 알 수 있음.
function handler() {
  console.log(store.getState());
}

store.subscribe(handler);

//묶어주는 데이터를 페이로드라고 많이 부름.

function actionCreator(type, payload) {
  return {
    type,
    payload,
  };
}

function couter(data) {
  store.dispatch(actionCreator("counter", { data }));
}

couter({ counter: 1 });

// updator => 내가 원하는 형태로 함수를 바꿔줘라고 함수를 푸쉬 할 수 있음.
// get으로 값을 꺼내는 이유는 진짜 state를 받게 되면 변경할 수 있기 떄문임.

//! update함수를 리덕스에선 reducer라고 부름;
// 데이터를 전달하고 어떤 함수를 호출할지를 dispatch라고 부름
