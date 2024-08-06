<template>
  <!-- Composition API 실습 -->
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
import {onMounted, ref} from "vue";
import axios from "axios";

export default {
  name: 'MyPage',
  setup() {
    let follower = ref([]);

    onMounted(() => {
      axios.get('/follower.json').then((res) => {
        follower.value = res.data; // 데이터 담고 싶다면 변수명.value
      })
    })

    return {follower}
  }
}
</script>

<style>

</style>