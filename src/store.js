import { createStore } from 'vuex'
import axios from "axios";

const store = createStore({
  state() {
    return {
      // state 보관은 여기에
      name : 'kim',
      age : 20,
      likes : 30,
      isLike : false,
      more : {} // 더보기
    }
  },
  mutations : {
    setMore (state, data) {
      state.more = data
    },
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
  },
  // actions에 추가한 파라미터는 $store를 뜻한다고 생각
  actions : {
    // ajax 또는 오래걸리는 작업들
    getData (context) {
      // axios import 해야 함
      axios.get('https://codingapple1.github.io/vue/more0.json').then((res)=>{
        console.log('res >', res.data);
        context.commit('setMore', res.data)
      })
    }
  },

})

export default store