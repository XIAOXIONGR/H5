<template>
  <div class="container">
    <button class="button-back" @click="goBack()"></button>
    <div class="title-1"></div>
    <div class="title">数字打卡寻宝活动</div>
    <div class="body">
      <div class="Four">
        <div class="Hu"></div>
        <div class="Zhao"></div>
        <div class="Jiang"></div>
        <div class="Gong" @click="ToGong()"></div>
      </div>
      <div class="BigBest"></div>
    </div>

    
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toPayPage() {
      this.$router.push({
        path: "/PayPage",
      });
    },
    goBack() {
      this.$router.go(-1); // 返回上一页
    },
    ToGong(){
      this.$router.push({
        path: "/GamePage",
      });
    }
  },
};
</script>
<style scoped>
.container {
  /* background-color: #d83535; */
  background-image: url("../assets/img/gz_bg.png");
  background-size: cover;
  /* background-position: center; */

  display: flex;
  flex-direction: column;

  align-items: center;
  height: 100vh;

  width: 100vw;
}
.button-back {
    position: absolute;
  /* background-color: #c41010; */
  background-image: url("../assets/img/fanhui.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 60% 70%;
  /* border: none; */
  background-color: transparent;
  width: 10px;
  height: 30px;
  margin: 10vh 0 0 -80vw;
}
.title-1 {
  margin: 17vh 0 1px 0;
  background-image: url("../assets/img/1st_title.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 90%;
  height: 13%;
}
.title {
  margin: 10px 0 10px 0;
  font-size: 20px;
  color: #1b1111;
  font-weight: bold;
}
.body {
  /* background-color: #df1212; */
  /* background-image: url("../assets/img/1st_body.png"); */
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 90%;
  height: 57%;
}

.Four{
    margin:30px 10px 0 10px;
    display: flex;
    flex-wrap: wrap;
    /* align-items: center; */
    justify-content: center;
    justify-content: space-evenly;
    align-content: space-evenly;
}
.Hu{
    background-image: url("../assets/img/Hu-light.png");
    background-repeat: no-repeat;
  background-size: 100% 100%;
    width: 35%;
    height: 14vh;
    /* background-color: #ad3333; */
}
.Zhao{
    background-image: url("../assets/img/Zhao-light.png");
    background-repeat: no-repeat;
  background-size: 100% 100%;
    width: 35%;
    height: 14vh;
    /* background-color: #4fad33; */
}
.Jiang{
    margin:30px 0 0 0;
    background-image: url("../assets/img/Jiang-light.png");
    background-repeat: no-repeat;
  background-size: 100% 100%;
    width: 35%;
    height: 14vh;
    /* background-color: #33ad99; */
}
.Gong{
    margin:30px 0 0 0;
    background-image: url("../assets/img/Gong-light.png");
    background-repeat: no-repeat;
  background-size: 100% 100%;
    width: 35%;
    height: 14vh;
    /* background-color: #ad3384; */
}

.BigBest {
  margin: 30px 0 10px 11%;
  background-image: url("../assets/img/BigBest-light.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 78%;
    height: 12vh;
  /* border: none; */
  /* background-color: transparent; */
  /* border-radius: 39%; */
}
</style>
