<template>
  <div class="container">
    <button class="button-back" @click="goBack()"></button>
    <div class="title-1">和硕恪靖公主府</div>
    <div class="title-body">
      <div class="title">数字打卡寻宝</div>
      <div class="bag"></div>
      <a href="#" class="mybag" @click="navigateToMyBag()">我的背包</a>
    </div>
    <div class="body"></div>
    <div>
      <input v-model="contract" placeholder="输入合约地址" />
      <button @click="searchNFT">查询</button>
    </div>

    <div class="showcase">
      <!-- 使用 v-if 判断 isLoading 来显示加载状态 -->
      <div
        v-if="isLoading"
        v-for="index in 5"
        :key="index"
        class="showcase-item-loading"
      >
        <img
          class="showcase-image"
          :src="baseImageUrl"
          alt="待获取"
          @load="handleImageLoad($event, index)"
        />
      </div>
      <!-- 遍历 tokenId 在 1 到 5 范围内的数据 -->
      <!-- 遍历 tokenId 在 1 到 5 范围内的数据 -->
      <div
        v-for="(jsonData, index) in jsonDatas"
        :key="index"
        class="showcase-item"
        @click="jsonDataNotEmpty(jsonData) ? showModal(jsonData) : null"
      >
        <img
          class="showcase-image"
          :src="jsonData.image"
          alt="待获取"
          @load="handleImageLoad($event, index)"
        />
      </div>
    </div>
    <div class="text-nfts-normal">线索宝物卡槽</div>
    <div class="text-nfts-best">终极宝物卡槽</div>
  </div>

  <model
    v-if="selectedJsonData"
    :show="isModalVisible"
    @close="closeModal"
    :jsonData="selectedJsonData"
  ></model>
</template>
<script>
// import { mapState } from "vuex"; // 导入 mapState 函数
import { mapGetters } from 'vuex'; // 导入 mapGetters 方法

import axios from "axios";
import loadingImg from "../assets/img/loading.png";
import model from "./model.vue";
export default {
  components: {
    model,
  },
  
  data() {
    return {
      agreed: false,

      // contract: "0x4470e4CFEa9DEA0c439AdC2EA023B287b1F0739D",
      // contract: "0xFF493C8C490282d543eCcD5b08079BE52972207A", //1054-8
      
      placeholderImage: "",
      baseImageUrl: loadingImg, // 将 baseImageUrl 定义在 data 中
      baseName: "", // 将 baseName 定义在 data 中
      isModalVisible: false,
      // modalData 控制弹窗组件的状态和数据
      jsonDATA: {},
      jsonDATAN: {},
      JsonUrl: {},
      imageSizes: {},
      tokenId: 1, // 初始化 tokenId
      jsonDatas: [],
      isLoading: true, // 默认为加载状态
      selectedJsonData: {}, // 存储被选中的 JSON 数据
    };
  },
  computed: {
    ...mapGetters(['getAddress', 'getPhone']), // 导入你需要的 getters
  },
  created() {
    this.address = this.$store.getters.getAddress;
    console.log("create中的地址：",this.address);
  // 在这里使用 this.address 发起请求
  this.searchNFT()
    
},
  methods: {
    navigateToMyBag() {
      this.$router.push({ name: "MyBag" }); // 使用路由的名称导航
    },

    goBack() {
      this.$router.go(-1); // 返回上一页
    },

    toggleAgreement() {
      // 处理选择框状态的方法
      // 在这里可以执行相应的逻辑
      console.log("同意条款状态：", this.agreed);
    },

    async searchNFT() {
      try {
        // 请求开始，设置 isLoading 为 true
        this.isLoading = true;
        const address = this.address;
        console.log("address", address);
        const TokensOfResult = await axios.get(
          `http://localhost:3000/tokensOf/${address}`
        );

        // 初始化一个数组来存储所有的 JSON 数据
        const jsonDatas = [];

        const tokenIdsToShow = TokensOfResult;
        console.log("tokenIdsToShow::", tokenIdsToShow);
        // 遍历 tokenId 在 1 到 5 范围内的数据
        for (let tokenId = 1; tokenId <= 5; tokenId++) {
          // 检查 tokenId 是否在要显示的范围内
          if (tokenIdsToShow.includes(tokenId)) {
            console.log("uri方法拿到的 tokenId:", tokenId);
            const tokenURL = await axios.get(
              `http://localhost:3000/uri/${tokenId}`
            );
            const jsonData = tokenURL.data.jsonData;
            // 在这里拼接 https:// 到 image 属性前面
            jsonData.image = `https://${jsonData.image}`;
            console.log("jsonData:", jsonData);

            // 将每个 JSON 数据添加到数组中
            jsonDatas.push(jsonData);
          } else {
            // 如果 tokenId 不在要显示的范围内，插入一个空对象
            jsonDatas.push({});
          }
        }

        // 更新 jsonDatas 数组，将所有 JSON 数据添加进去
        this.jsonDatas = jsonDatas;

        // 请求成功，设置 isLoading 为 false
        this.isLoading = false;

        // 在这里可以进一步处理 jsonDatas 数组，根据需求使用其中的数据
        console.log("All JSON Data:", jsonDatas);
      } catch (error) {
        console.error("Error searching NFT:", error);
        this.isLoading = false;
      }
    },

    showModal(jsonData) {
      this.selectedJsonData = jsonData;
      this.isModalVisible = true;
      console.log("modalVisible:", this.isModalVisible);
      console.log("jsonData:", jsonData);
    },
    jsonDataNotEmpty(jsonData) {
      return Object.keys(jsonData).length > 0;
    },
    closeModal() {
      this.isModalVisible = false;
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
.title-body {
  display: flex;
  justify-content: space-evenly;
}
.title-1 {
  margin: 10px 0 10px 0;
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
}

.bag {
  margin: 15px 0 0 23px;
  background-image: url("../assets/img/bag.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 25px;
  height: 25px;
}
.mybag {
  margin: 15px 0 0 0px;
  color: #957a54;
  text-decoration: underline;
}
.body {
  /* background-color: #df1212; */
  margin: 20px 0 10px 0;
  background-image: url("../assets/img/map.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 80%;
  height: 32%;
}

.showcase {
  /* background-color: #4ac282; */
  margin: 15px 15px -15px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  /* border: 2px solid #000; */
  height: 110px;
  width: 90%;
}
.showcase-item {
  /* margin: -300px 0 0 0; */

  width: 18%;
  height: 60%;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin: 20px 10px 30px 10px;
  /* margin: 10px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #cccbcb;
}
.showcase-item-loading {
  width: 18%;
  height: 60%;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin: 20px 10px 30px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #cccbcb;
}
.showcase-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.text-nfts-normal {
  font-size: 21px;
  font-family: cursive;
  text-decoration: underline;
}
.text-nfts-best {
  margin: 80px 0 0 0;
  font-size: 21px;
  font-family: cursive;
  text-decoration: underline;
}
</style>
