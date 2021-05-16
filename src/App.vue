<template>
  <div id="app">
      <div class="weatherSys">
        <h3>天气查询</h3>
        <label for="weatherInput">
          <input id="weatherInput" v-model="city" type="text" @change="inputPress" placeholder="请输入查询区域名如：北京">
          <button id="weatherButton" type="button" @click="weatherQuery">查询</button>
        </label>
        <h4 v-if="city+'市'===position.city">所在地：{{position.nation}}-{{position.province}}-{{position.city}}</h4>
        <h4 v-else>查询城市：{{city}}</h4>
        <div class="show">
          <ul class="showUl" >
            <li class="showLi" v-for="(item, itemIndex) in data">
              <h5>{{item.date}}</h5>
              <h6>{{item.type}}</h6>
              <p>风力: {{item.fengli}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;风向: {{item.fengxiang}}</p>
              <p>{{item.low}} ~ {{item.high}}</p>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
  import {weatherRequest} from "./network/api"
  import { VueJsonp } from 'vue-jsonp'
  import Vue from "vue"
  Vue.use(VueJsonp)
  export default {
  name: 'App',
  data() {
    return {
      city: "",
      data: [],
      showFlage: false,
      position: {
        nation: "",
        province: "",
        city: ""
      }
    }
  },
  mounted() {
    this.locationCity()
  },
  methods: {
    locationCity() {
      let data = {
        key: "2L6BZ-EISKQ-M6D5Y-GCNU5-FDNVF-U3BJN",
        output: "jsonp"
      }
      let url = "https://apis.map.qq.com/ws/location/v1/ip"
      this.$jsonp(url, data)
          .then(res => {
            this.position.nation = res.result.ad_info.nation
            this.position.province = res.result.ad_info.province;
            this.position.city = res.result.ad_info.city;
            this.city = this.position.city.split("市")[0]
            this.inputPress()
          })
          .catch(error => {
            console.log(error);
          })
    },
    inputPress() {
      if (this.city) {
        this.weatherQuery()
      } else {
        this.showFlage = false
        this.data = []
      }
    },
    weatherQuery() {
      weatherRequest(this.city).then(res=>{
        this.showFlage = true
        this.data = res.data.data.forecast
        this.data[0].date = "今天"
        this.data[1].date = "明天"
        this.data.map(item => {
          var parrtern = /\d+/g
          item.fengli = item.fengli.match(parrtern)[0]
        })
      })
    }
  }
}
</script>

<style>
#app {
  width: 1000px;
  margin: 0 auto;
}
.weatherSys {
  display: block;
  width: 850px;
  color: coral;
  text-align: center;
  font-size: 30px;
  margin: 0 auto;
}
#weatherInput {
  outline: none;
  width: 600px;
  height: 40px;
  font-size: 16px;
  border: 1px solid coral;
  border-radius: 6px;
}
#weatherInput:focus {
  border-color: hotpink;
}
#weatherInput:hover {
  border-color: hotpink;
}
#weatherButton {
  outline: none;
  width: 150px;
  height: 44px;
  border: 1px solid coral;
  border-radius: 6px;
  background-color: coral;
  color: white;
  font-size: 16px;
}
#weatherButton:hover {
  border-color: hotpink;
  background-color: hotpink;
 }
.showUl {
  width: 100%;
  height: 500px;
  padding: 0;
  list-style-type: none;
  color: darkorange;
}
.show h4{
  height: 20px;
  font-size: 30px;
}
.showLi {
  width: 33%;
  height: 60%;
  float: left;
}
.showLi p{
  font-size: 20px;
}
</style>
