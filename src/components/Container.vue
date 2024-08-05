<template>
  <div>
    <!-- 포스트(메인화면)-->
    <div v-if="step === 0">
      <Post :data="a" v-for="(a,i) in data" :key="i"/> <!-- 한 개의 데이터만 props -->
    </div>

    <!-- 필터선택페이지 -->
    <div v-if="step === 1">
      <div :class="filterNm" class="upload-image" :style="`background-image: url(${imgUrl})`"></div>
      <div class="filters">
        <FilterBox :imgUrl="imgUrl" v-for="(filter,i) in filter" :key="i" :filterNm="filter">
          <span style="color: blue"> {{ filter }} </span>
        </FilterBox>
      </div>
    </div>

    <!-- 글작성페이지 -->
    <div v-if="step === 2">
      <div :class="filterNm" class="upload-image" :style="`background-image: url(${imgUrl})`"></div>
      <div class="write">
        <textarea @input="$emit('write', $event.target.value)" class="write-box">write!</textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import FilterBox from "@/components/FilterBox.vue";
import filter from "@/assets/filter";

export default {
  name: 'Container',
  data () {
    return {
      content : 'write!', // 사용자가 입력한 글
      test : '',
      filter,
      filterNm : ''
    }
  },
  components : {
    Post,
    FilterBox
  },
  props : {
    data : Array,
    step : Number,
    imgUrl : String,
  },
  mounted() {
    console.log('Container.vue :: mounted');
    // mounted 가 실행되지 않더라도 emitter.on 은 실행된다.
    this.emitter.on('getFilterNm', (data) => {
      this.filterNm = data;
    })
  },
  updated() {
  }
}
</script>

<style>
  .upload-image{
width: 100%;
height: 450px;
background: cornflowerblue;
background-size : cover;
}
.filters{
overflow-x:scroll;
white-space: nowrap;
}
.filter-1 {
width: 100px;
height: 100px;
background-color: cornflowerblue;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
}
.filters::-webkit-scrollbar {
height: 5px;
}
.filters::-webkit-scrollbar-track {
background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
background: #888;
border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
background: #555;
}
.write-box {
border: none;
width: 90%;
height: 100px;
padding: 15px;
margin: auto;
display: block;
outline: none;
}
</style>