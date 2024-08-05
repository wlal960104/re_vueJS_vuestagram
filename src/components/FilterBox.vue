<template>
  <div @click="clickFilter" :style="`background-image : url(${imgUrl})`" :class="`filter-item ${filterNm}`">
    <slot></slot>
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
    // 필터 사진 클릭
    clickFilter () {
      console.log('필터 클릭');
      console.log('this > ', this.filterNm)
      // 이벤트 발사 (필터이름 전송)
      this.emitter.emit('getFilterNm', this.filterNm)
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