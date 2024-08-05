<template>
  <div :style="`background-image : url(${imgUrl})`" :class="`filter-item ${filterNm}`">
    <slot></slot>
    <button @click="fire">버튼</button>
  </div>
</template>

<script>
export default {
  name: 'FilterBox',
  props: {
    imgUrl: String,
    filterNm: String
  },
  data () {
    return {
      msg: '안녕하세요'
    };
  },
  methods : {
    fire () {
      // 이벤트 발사
      this.emitter.emit('test', '데이터')
    }
  }
}
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}

</style>