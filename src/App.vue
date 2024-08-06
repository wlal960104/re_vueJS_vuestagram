<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li @click="step++" v-if="step === 1">Next</li>
      <li @click="publish" v-if="step === 2">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo"/>
  </div>

  <!--<h4> {{ 내이름 }}</h4>-->
  <!--<h4> {{ age }}</h4>-->

  <!--<p> {{ $store.state.more }}</p>-->
  <!--<button @click="$store.dispatch('getData')">더보기 버튼</button>-->
  <!--<h4>이름: {{ $store.state.name }}</h4>-->
  <!--<button @click="$store.commit('changeNm')"> store 데이터 변경하기</button>-->
  <!--<button @click="changeNm()"> store 데이터 변경하기</button>-->
  <!--<h4> 나이: {{ $store.state.age }}</h4>-->
  <!--<button @click="$store.commit('increaseAge', 10)"> 나이 변경하기</button>-->

  <Container :data="data" :step="step" :imgUrl="imgUrl" @write="content = $event"/>
  <button v-if="step === 0" @click="more">더보기</button>


  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" multiple accept="image/*" type="file" id="file" class="inputfile"/>
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

</template>

<script>
import Container from "@/components/Container.vue";
import data from "@/assets/data"
import {mapMutations, mapState} from "vuex";

export default {
  name: 'App',
  data() {
    return {
      data,
      moreNum: 0,
      step: 3,
      imgUrl : '',
      content : '',
      filterNm : '',
      counter : 0
    }
  },
  components: {
    Container
  },
  methods: {
    // 더보기 버튼 클릭
    more() {
      if (this.moreNum > 1) {
        console.log('더보기는 2개까지 가능');
        return;
      }

      console.log('this > ', this);

      this.axios.get(`https://codingapple1.github.io/vue/more${this.moreNum}.json`)
          .then((res) => {
            this.data.push(res.data);
            this.moreNum++;
          })
          .catch((err => {
            // 요청 실패 시 실행할 코드
            console.log('요청에 실패하였습니다 : ', err)
          }))
    },
    upload(e) {
      let file = e.target.files
      this.imgUrl = URL.createObjectURL(file[0]); // 업로드한 이미지의 URL 생성
      this.step = 1; // 업로드 후 다음 페이지로 이동
    },
    // 발행 버튼 클릭
    publish () {
      var newPost = {
        name: "Kim Nana",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.imgUrl,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.content,
        filter: this.filterNm
      };
      this.data.unshift(newPost); // 새로운 요소를 배열의 맨 앞에 추가
      this.step = 0; // 메인페이지로 탭변경
    },
    ...mapMutations(['setMore', 'changeNm'])
  },
  mounted() {
    // emitter 는 여기에
    this.emitter.on('getFilterNm', (data) => {
      this.filterNm = data;
    })
  },
  computed: {
    // name() {
    //   return this.$store.state.name
    // },
    // age() {
    //   return this.$store.state.age
    // },
    ...mapState(['name', 'age']),
    ...mapState({ 내이름 : 'name'})
  }
}
</script>

<style>

body {
  margin: 0;
}

ul {
  padding: 5px;
  list-style-type: none;
}

.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}

.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}

.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}

.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}

.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}

.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}

.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}

.inputfile {
  display: none;
}

.input-plus {
  cursor: pointer;
}

#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
