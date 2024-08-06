<template>
  <!-- Composition API 실습 -->
  <div style="padding : 10px">
    <h4>팔로워</h4>
    <input @input="search($event.target.value)" placeholder="검색"/>

    <div v-for="(a,i) in follower" :key="i" class="post-header">
      <div :style="`background-image: url(${a.image})`" class="profile"></div>
      <span class="profile-name">{{ a.name }}</span>
    </div>
  </div>
</template>

<script>
import {computed, onMounted, reactive, ref, toRefs, watch} from "vue";
import axios from "axios";
import {useStore} from "vuex";

export default {
  name: 'MyPage',
  setup(props) {
    let followerOrigin = ref([]); // 원본 follower 저장
    let follower = ref([]);

    let test = reactive({name: 'kim'}) // reactive 사용

    // 함수 사용하기
    function doThis () {
      console.log('doThis 함수입니다');
    }

    // 유저 검색 기능
    function search (text) {
      // filter 는 원본에서
      let newFollower = followerOrigin.value.filter((arr) => {
        return arr.name.includes(text);
      })

      follower.value = [...newFollower];
    }

    // props 사용하기
    let {one, two} = toRefs(props);
    console.log('one >', one.value);
    console.log('two >', two.value);

    // watch 사용하기
    watch(name, () => {

    })

   // computed 사용하기
    let num = computed(() => {
      return '3'
    })
    console.log('num >', num.value)

    // vuex의 store 사용하기
    let store = useStore();
    console.log('store > ', store.state.name)

    onMounted(() => {
      axios.get('/follower.json').then((res) => {
        console.log('res.data > ', res.data);
        // array 안의 object 까지 모두 참조 다르게 하려면 다른 방법 사용해야 한다. (언더스코어 등)
        followerOrigin.value = [...res.data]
        follower.value = [...res.data];

        console.log('follower.value > ', follower.value);
        console.log('followerOrigin > ', followerOrigin.value);
      })
    })

    return {follower, followerOrigin, test, doThis, search}
  },
  props : {
    one : Number,
    two : Number
  }
}
</script>

<style scoped>

</style>