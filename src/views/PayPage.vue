<template>
  <div class="container">
    <button class="button-back" @click="goBack()"></button>
    <div class="title-1">和硕恪靖公主府</div>
    <div class="title">数字打卡寻宝活动</div>
    <div class="body">
      <div class="text-1">活动说明</div>
      <div class="text-2">
        1.搜寻带有“寻宝”字样二维码，扫码获得 一枚数字【线索宝物】<br />
        2.集齐所有数字线索宝物后，可获得一枚数 字【终极宝物】<br />
        3.活动期间，集齐四大犬博物馆终极宝物，可
        额外获赠【呼市2023国庆节限定超级数字纪 念品】一份<br /><br />
        本次活动为付费项目，愦用49.9元，数字文
        创品一经售出无法进行退换货，请您知恶。
      </div>
    </div>

    <button class="button" @click="toPay()">继续支付</button>
    <div>
      <label class="round-checkbox">
        <input type="checkbox" v-model="agreed" @change="toggleAgreement()" />
        <span class="checkmark"></span>
      </label>
      <span class="span2"
        >继续代表阅读和同意<a href="#" class="link">隐私条款</a>，及<a
          href="#"
          class="link"
          >服务协议</a
        ></span
      >
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return { agreed: false };
  },
  created() {
    const address = this.$route.query.address;
    const phone = this.$route.query.phone;
    console.log("私钥和电话：；；；；", address, phone);

    // 将数据存储到 Vuex
    this.$store.commit("setAddress", address);
    this.$store.commit("setPhone", phone);
  },
  methods: {
    async toPay() {
      if (!this.agreed) {
        // 当复选框未选中时，显示弹出框或其他提示
        alert("请勾选隐私条款与服务协议");
      } else {
        try {
          const requestBody = {
            ownerAddress: this.$store.state.address,
            phone: this.$store.state.phone,
            totalFee: 1, // 传递整数类型的 totalFee
            name: "公主府支付",
            authAppid:456,
            openId:'oOBcB4808YXB1sXaA2HkUSDXMvzg',

          };

          // 将请求体对象转换为 x-www-form-urlencoded 格式
          const formData = new URLSearchParams();
          for (const key in requestBody) {
            formData.append(key, requestBody[key]);
          }

          console.log("requestBody", requestBody);
          console.log(
            "请求头的私钥和电话：",
            this.$store.state.address,
            this.$store.state.phone
          );
          // 发送 HTTP 请求获取微信支付参数
          const response = await axios.post(
            "https://tjtest.pugongyinghulian.com/isotop_api/minipro/pay/payByjsapi",
            formData, // 使用转换后的请求体
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          const payParams = response.data.results; // 假设接口返回的数据包含微信支付参数
          console.log("打印的返回微信必须参数：；；", payParams);
          // 调用微信支付接口
           // 调用微信支付接口
           function onBridgeReady() {
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest',
              {
                "appId": payParams.appId,
                "timeStamp": payParams.timestamp,
                "nonceStr": payParams.noncestr,
                "package": payParams.package,
                "signType": payParams.signType,
                "paySign": payParams.paySign,
              },
              function(res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  // 支付成功
                  console.log("支付成功");
                  alert("支付成功");
                  // 可以在这里进行支付成功后的处理逻辑
                } else {
                  // 支付失败或其他情况
                  console.log("支付失败或其他情况");
                  alert("支付失败或其他情况");
                  // 可以在这里进行支付失败后的处理逻辑
                }
              }
            );
          }

          if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
          } else {
            onBridgeReady();
          }


          // 在微信支付代码执行后，你可以跳转到支付结果页或者进行其他逻辑处理
          this.$router.push({
            path: "/GamePage",
          });
        } catch (error) {
          // 处理请求失败的情况
          console.error("请求微信支付参数失败", error);
        }
      }
    },
    goBack() {
      this.$router.go(-1); // 返回上一页
    },
    methods: {
      toggleAgreement() {
        // 处理选择框状态的方法
        // 在这里可以执行相应的逻辑
        console.log("同意条款状态：", this.agreed);
      },
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
.button-back {
  /* background-color: #c41010; */
  background-image: url("../assets/img/fanhui.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 60% 70%;
  /* border: none; */
  background-color: transparent;
  width: 10px;
  height: 30px;
  margin: 40px 0 0 -80vw;
}
.title-1 {
  margin: 20px 0 10px 0;
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
  font-size: 23px;
  font-family: cursive;
}
.body {
  /* background-color: #df1212; */
  background-image: url("../assets/img/1st_body.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 90%;
  height: 50%;
}
.button {
  margin: 30px 0 20px 0;
  background-image: url("../assets/img/1st_button.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 150px;
  border: none;
  background-color: transparent;
  /* border-radius: 39%; */
}
.text-1 {
  margin: 60px 0 0 0;
  font-size: 24px;
  font-weight: 950;
}
.text-2 {
  margin: 10px 24px 10px 26px;
  font-size: 15px;
  text-align: left; /* 从左往右排列 */
  font-weight: 700;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.round-checkbox {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.round-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  margin: -11px 0 0 -25px;
  height: 12px;
  width: 12px;
  background-color: #e4d7cd;
  border: 1px solid #312828;
  border-radius: 50%; /* 使选择框变成圆形 */
}

.round-checkbox input:checked + .checkmark {
  background-color: #957a54; /* 选中时的背景颜色 */
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.round-checkbox input:checked + .checkmark:after {
  display: block;
}

.round-checkbox .checkmark:after {
  left: 4px;
  top: 0px;
  width: 3px;
  height: 8px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.span2 {
  font-size: 12px;
}

/* 改变自定义链接的颜色和下划线 */
.link {
  color: #957a54;
  text-decoration: underline;
}

/* 鼠标悬停时改变自定义链接颜色 */
.link:hover {
  color: #52432e;
  text-decoration: none;
}
</style>
