<template>
  <div class="container">
    <button class="button-back" @click="goBack()"></button>
    <div class="title-1">和硕恪靖公主府</div>
    <div class="title-body">
      <div class="title">数字打卡寻宝</div>
      <div class="bag"></div>
      <a href="#" class="mybag" @click="navigateToMyBag()">我的背包</a>
    </div>
    <div class="text-1">
      恭喜您集齐所有线索宝物！<br />
      获得本站外极宝物！
    </div>
    <div class="body"></div>
    <div class="text-flex">
      <div class="text-2">恪靖固伦公主金册（复制品）</div>
      <div class="icon"></div>
    </div>
    <div class="text-3">
      雍正元年(1723)，公主四十四岁，座正皇帝册封格请公主为“格请固伦
      公主”，并赐金册。是目前能看到的非早的清代册封公主的金册，原件现
      存于蒙古国博物馆。金册为一册四页 每页长23厘米，宽10厘米。纯金打
      造，完好无损，册文用满汉两种文字刻，字体端庄秀美。册文大意为：
      恪请公主是圣祖仁皇帝之第六女，通诗书，言行得体。缔结烟亲，雍正
      元年封为格靖固伦公主。“固伦”是语，汉意“国家”，“固伦”属于
      公主的最高品级。<br />
      金册体现了清代满蒙联烟的烟亲制度 这一制度的推行更加强化了清代对
      北部边疆地区的管璃与治理，喝予金中的行为本身更是体现了清代对边目
      巩固的高度重视。清代北部边需的政版图为今日中国的需域奠定了很好
      的基础，这不仅仅源于南征北战，同明付也得益于持续三个世纪左右的烟亲 制度。
    </div>
    <div class="QRCode"></div>
    <div class="qrText">（识别二维码进入活动）</div>
    <button class="button" @click="toDownload()">点击保存图片</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
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
  margin: 6vh 0 0 -80vw;
}
.title-body {
  display: flex;
  justify-content: space-evenly;
}
.title-1 {
  margin: 10vh 0 10px 0;
  background-image: url("../assets/img/pay_kuang.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 70vw;
  height: 60px;
  font-size: 35px;
  color: #8a6637;
  font-weight: 700;
}
.title {
  font-size: 24px;
  font-family: cursive;
  color: #575654;
  font-weight: 500;
}

.bag {
  margin: 8px 0 0 23px;
  background-image: url("../assets/img/bag.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 25px;
  height: 25px;
}
.mybag {
  margin: 8px 0 0 0px;
  color: #957a54;
  text-decoration: underline;
}
.text-1 {
  margin: 5px 0 0 0;
  color: #957a54;
  font-size: 24px;
  text-decoration: underline;
  font-family: cursive;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 4px;
}
.body {
  /* background-color: #df1212; */
  margin: 10px 0 1px 0;
  background-image: url("../assets/img/GongZhu-share.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 80%;
  height: 16%;
}
.text-flex {
  display: flex;
}
.text-2 {
  margin: 10px 0 0 0;
  color: #1b1a18;
  font-size: 18px;
  text-decoration: underline;
  font-family: cursive;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
}
.icon {
  margin: 10px 0 10px 10px;
  background-image: url("../assets/img/icon-share.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 25px;
  height: 25px;
}
.text-3{
    margin:2px 20px 0 20px;
    font-size: 8px;
    text-align: left;
    color: #684d29;
}
.QRCode{
    width: 80px;
    height: 80px;
    background-color: #fff;
    border-radius: 15px;
}
.qrText{
    font-size: 10px;
    color: #797777;
}
.button {
  margin: 10px 0 10px 0;
  background-image: url("../assets/img/1st_button.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 150px;
  border: none;
  background-color: transparent;
  color: #684d29;
  font-family: cursive;
  font-weight:bold;
  /* border-radius: 39%; */
}
</style>
