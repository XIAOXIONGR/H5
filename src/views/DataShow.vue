<template>
    <div>
      <!-- 使用 v-for 循环渲染 tokenId 在 1 到 5 范围内的位置 -->
      <div v-for="tokenId in 5" :key="tokenId" class="position">
        <!-- 根据 tokenId 获取数据，如果不存在则置空 -->
        {{ getTokenData(tokenId) }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 模拟后台返回的数据
        responseData: {
          1: "数据1",
          3: "数据3",
          6: "数据6",
          7: "数据7",
        },
      };
    },
    methods: {
      getTokenData(tokenId) {
        // 根据 tokenId 获取数据，如果不存在则置空
        return this.responseData[tokenId] || "";
      },
    },
  };
  </script>
  
  <style>
  .position {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 5px;
  }
  </style>
  