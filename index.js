import { createStore } from "./redux.js";

const COUNTER = "counter"; // 액션타입
const FETCH = "fetch";
const FETCH_RESPONSE = "fetch-response";

//리듀서 함수는 순수함수라서 비동기 처리인 데이터 패치를 못하는데 이걸 하기 위해 middleware로 감싸줌
//별 다른게 아니라 그냥 middleware라는 함수 안에서 action이 비동기 행동이면 api call을 하고 도착했을때 그냥 도착했다 저장해라 라는 dispatch를 해주는게 다임.
//하나면 간단한데 여러개면 꼬이지 않을까?
//이걸 해결하기 위해 몽키 디스패치를 사용함.
//미들웨어가 여러개가 있을때 리덕스 안에서 미들웨어의 순서들을 재조립할 수 있는 테크닉. 이때 커링이 쓰임.

// const middleware = (dispatch,action) => {dispatch(action)};
// 이렇게 함수를 만들어 놓으면 action인자를 주입할 때 함수가 돌아가기 때문에
// 두번째 함수 호출을 밖에서 결정할 수 있다는 것을 의미함. curring 기법
// 이렇게 해서 리덕스 안쪽에서 미들웨어가 작동하는 타이밍을 잡을 수 있다.
const middleware1 = (store) => (dispatch) => (action) => {
  if (action.type === FETCH) {
    setTimeout(() => {
      dispatch({ type: "fetch-response", payload: [1, 2, 3] });
    }, 2000);
  } else {
    dispatch(action);
  }
};

//data가 참조형이 아니라서 밖에 state는 영향을 안 받기 때문에 return 해줘여 함.
function reducer(state, action) {
  if (action.type === COUNTER) {
    //다른 값들은 그대로 들어가게 스프레드 연산자 쓰고 counter부분만 오버 라이드 되게 !
    return { ...state, counter: action.payload.counter };
  }
  if (action.type === FETCH_RESPONSE) {
    return { ...state, response: action.payload };
  }

  return state;
}

const store = createStore(reducer, [middleware1]);

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
  store.dispatch(actionCreator("counter", { ...data }));
}

couter({ counter: 1 });

// updator => 내가 원하는 형태로 함수를 바꿔줘라고 함수를 푸쉬 할 수 있음.
// get으로 값을 꺼내는 이유는 진짜 state를 받게 되면 변경할 수 있기 떄문임.

//! update함수를 리덕스에선 reducer라고 부름;
// 데이터를 전달하고 어떤 함수를 호출할지를 dispatch라고 부름

//

store.dispatch(actionCreator(FETCH));
