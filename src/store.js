import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      // state 보관은 여기에
      name : 'kim',
      age : 20,
      likes : 30,
      isLike : false
    }
  },
  mutations : {
    // state 수정 방법 정의
    changeNm (state) {
      state.name = 'park'
    },
    // 10씩 증가
    increaseAge (state, data) {
      state.age += data;
    },
    // 좋아요 기능
    goLike (state) {
      if (state.isLike === false) {
        state.likes++;
        state.isLike = true;
      } else {
        state.likes--;
        state.isLike = false;
      }
    }
  }
})

export default store