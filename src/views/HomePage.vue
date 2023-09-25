<template>
  <div class="container">
    <div class="title-1"></div>
    <div class="title">数字打卡寻宝活动</div>
    <div class="body">
      <div class="text-1">"与历史对话"</div>
      <div class="text-1">数字文旅由呼和浩特博物院召集</div>
      <div class="text-2">呼和浩特博物馆、昭君博物院、</div>
      <div class="text-2">将军衙署博物院、公主府博物馆合力打造</div>
      <div class="text-3">
        <p>
          亲爱的游客，本活动是一场由数字技术加成的沉浸式文旅体验活动。参与这场寻宝游戏，您将沉浸在历史和文化故事之中，探索景区独特的风格与特色。
        </p>
        <p>
          完成寻宝任务后，您将带着难忘的经历和博物馆专属数字宝藏离开这里，以表彰您在寻宝过程中的努力和智慧。
        </p>
        让我们一起开启本站精彩的探索之旅！
      </div>
      <div class="text-1">欢迎来到和硕恪靖公主府</div>
      <div class="text-3">
        清·和硕恪靖公主府，建于康熙四十二年(1703年)，距
        今已有300多年历史，是康熙皇帝第六女和硕格请公主下嫁
        喀尔喀蒙古土谢图汗部扎萨克多罗郡王敦多布多尔济所建
        府邸。和硕格靖公主府是目前全国唯一一座保存完整的清
        代公主府，也是从北京往西唯一的清代官式建筑，有着“
        西出京城第一府”的美称。它的唯一性和不可替代性，具
        有文化传承的多元性，是研究中国古代建筑史、中国古代
        和亲史、边疆民族史、清代宫廷文化、草原文化等多领域
        的重要文化载体。2001年，国务院将和硕恪靖公主府公
        布为全国重点文物保护单位。
      </div>
    </div>

    <button class="button" @click="toAuthPage()">进入</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  
  methods: {
    toAuthPage() {
    const authorizationURL = "https://tjtest.pugongyinghulian.com/isotop_auth/#/?appid=HY4iog6mcgp9x&redirect_url=http://localhost:5173/punch/#/PayPage";
    window.open(authorizationURL, "_blank"); // 在新标签页中打开外部链接
  },
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
.title-1 {
  margin: 10vh 0 1px 0;
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
  background-image: url("../assets/img/1st_body.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 90%;
  height: 57%;
}
.text-1 {
  color: #886e46;
  font-family: cursive;
  font-size: 20px;
}
.text-2 {
  color: #1b1111;

  font-size: 14px;
  font-weight: bold;
}
.text-3 {
  margin: 10px 24px 10px 26px;
  font-size: 12px;
  text-align: left; /* 从左往右排列 */
}
.button {
  margin: 30px 0 10px 0;
  background-image: url("../assets/img/1st_button.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 150px;
  border: none;
  background-color: transparent;
  font-family: cursive;
  font-size: large;
  color: #85683c;
  /* border-radius: 39%; */
}
</style>
