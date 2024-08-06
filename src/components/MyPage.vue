<template>
  <!-- Composition API 실습 -->
  <div style="padding : 10px">
    <h4>팔로워</h4>
    {{ name }}
    <input v-model="name" placeholder="검색"/>

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
    // // array 테스트
    // let arr = ['_Limvely', 'salmon_X', '360noscope'];
    // console.log('arr > ', arr);
    //
    //
    // let result = arr.filter((arr)=>{
    //   console.log('arr > ', arr);
    //   return arr.includes('noscope');
    // })
    // console.log('result > ', result)

    let followerOrigin = []; // 원본 follower 저장
    let follower = ref([]);

    let test = reactive({name: 'kim'}) // reactive 사용
    let name = ref('검색');

    // 함수 사용하기
    function doThis () {
      console.log('doThis 함수입니다');
    }

    // 유저 검색 기능
    // function search () {
    //
    // }

    // props 사용하기
    let {one, two} = toRefs(props);
    console.log('one >', one.value);
    console.log('two >', two.value);

    // watch 사용하기
    watch(name, (a) => {
      if (a === '') {
        follower.value = [...followerOrigin];
      }
      console.log('<<<<<<<<<<<< 변경되는 중 >>>>>>>>>>>>> ', a);
      // 데이터가 변경될 때마다 실행되는 코드
      let followers = [...follower.value];
      console.log('followers >' , followers)

      console.log('follower.value > ', follower.value);

       followers = followers.filter((arr) => {
        console.log('검색어 >>> ', a)
        console.log('arr.name > ', arr.name)
        return arr.name.includes(a);
      })
      if (followers.length >= 1 ){
        follower.value = followers;
      } else {
        follower.value = [];
      }


      console.log('followers', followers);
      console.log('followers.length',followers.length);


      console.log('--------------------------------------')
      console.log('followers', followers);
      console.log('follower > ', follower.value);
      console.log('원본 followerOrigin > ', followerOrigin)


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
        followerOrigin = [...(res.data)];
        follower.value = [...(res.data)]



        // // TODO: 왜 원본 데이터 저장 안되지
        // followerOrigin = [...res.data]; // 원본 데이터 저장
        // follower = [...res.data]; // 데이터 담고 싶다면 변수명.value
        // followerOrigin[0].name = 'nana';
        // console.log('followerOrigin >>>>>>>>> ', followerOrigin);
        // console.log('follower.value >>>>>>>>>>>', follower);
      })

      // let array = [1, 2, 3, 4, 5, 6];
      // let a = [...array];
      // let b = [...array];
      // a[0] = 100
      // console.log(' a >>> ', a);
      // console.log(' b >>>', b)


    })

    return {follower, test, doThis, name}
  },
  props : {
    one : Number,
    two : Number
  }
}
</script>

<style scoped>

</style>