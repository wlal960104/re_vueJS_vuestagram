<template>
  <!-- Composition API 실습 -->
  {{ follower }}
  <div style="padding : 10px">
    <h4>팔로워</h4>
    <input placeholder="검색"/>
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
    let follower = ref([]);
    let test = reactive({name: 'kim'}) // reactive 사용

    // props 사용하기
    let {one, two} = toRefs(props);
    console.log('one >', one.value);
    console.log('two >', two.value);

    // watch 사용하기
    watch(one, () => {
      // one 데이터가 변경될 때마다 실행되는 코드
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
        follower.value = res.data; // 데이터 담고 싶다면 변수명.value
      })
    })

    return {follower,test}
  },
  props : {
    one : Number,
    two : Number
  }
}
</script>

<style scoped>

</style>