<template>
  <div class="modal-overlay" @click="handleOverlayClick" v-if="show">
    <div class="modal">
      <div class="title">您已扫码打卡点{{ index }}<br />获得线索宝物</div>
      <div class="modal-header">
        {{ jsonData.name }}
      </div>
      <div class="modal-content">
        <!-- 这里可以根据需要展示jsonData中的数据 -->

        <div class="scrollable-content">
          <img class="detail-image" :src="jsonData.image" alt="" />

         
        
          <div class="modal-footer">
            
            
            <p class="description">{{ jsonData.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  props: {
    title: String,
    show: Boolean,
    name: String,
    jsonData: Object,
  },
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      cube: null,
      rotationCompleted: false,
      rotationAngle: 0,
      textureLoaded: false, // 添加标志来跟踪贴图加载状态
      texture: null, // 存储贴图对象
    };
  },
  watch: {
    jsonData: {
      handler: "handleJsonDataChange",
      deep: true,
    },
    // if (newValue.image) {
    //     this.initThree(newValue.image);
    //   }
  },

  methods: {
    handleJsonDataChange(newValue) {
      // 在这里触发 loadTexture 方法
      const newurl1 = newValue.image;
      const newurl = "https://" + newurl1;
      console.log("newurl:", newurl);
      console.log("newValue.image:", newValue.image);
      console.log("!this.textureLoaded:", !this.textureLoaded);
      if (newValue.image && !this.textureLoaded) {
        console.log("Loading texture...");
        this.loadTexture(newurl);
      } else {
        console.log(
          "Texture not loaded. newValue.image:",
          newValue.image,
          "textureLoaded:",
          this.textureLoaded
        );
      }
    },

    closeModal() {
      this.$emit("close");
    },
    handleOverlayClick(event) {
      // 如果点击的是非弹窗区域，则关闭弹窗
      if (event.target.classList.contains("modal-overlay")) {
        // 重置 textureLoaded 为 false
        this.textureLoaded = false;
        this.closeModal();
      }
    },

    loadTexture(newurl) {
      // 先清除之前的场景
      this.disposeScene();

      console.log("加载的newurl::", newurl);
      const loader = new THREE.TextureLoader();

      loader.load(
        newurl,
        (texture) => {
          console.log("贴图加载完成时的texture::", texture);
          // 贴图加载完成的回调函数
          //   this.initThree(texture);

          // 获取贴图的图片链接
          // this.texture = texture; // 存储贴图对象
          const imageUrl = texture.image.src;
          console.log("Loaded image URL:", imageUrl);

          // 使用 $nextTick 异步触发初始化方法

          this.initThree(imageUrl);
          this.textureLoaded = true; // 设置加载完成标志

          // this.texture = texture.clone(); // 使用 clone 来创建一个非响应式贴图对象
          // this.textureLoaded = true; // 设置加载完成标志
        },
        undefined, // 进度回调
        (error) => {
          console.error("An error occurred while loading the texture.", error);
        }
      );

      // 添加这一行来重置加载完成标志
      this.textureLoaded = false;
      console.log("textureLoaded::", this.textureLoaded);
    },

    initThree(imageUrl) {
      //   console.log("load后的初始化imageUrl::", imageUrl);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        82,
        window.innerWidth / window.innerHeight,
        1,
        500
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
      document
        .getElementById("canvas-container")
        .appendChild(renderer.domElement);

      const materials = [
        new THREE.MeshBasicMaterial({ color: 0x7d7b7c }), // Right face (red)
        new THREE.MeshBasicMaterial({ color: 0x7d7b7c }), // Left face (green)
        new THREE.MeshBasicMaterial({ color: 0x7d7b7c }), // Top face (blue)
        new THREE.MeshBasicMaterial({ color: 0x7d7b7c }), // Bottom face (yellow)
        new THREE.MeshStandardMaterial({
          map: new THREE.TextureLoader().load(imageUrl), // Front and back face texture
          roughness: 0,
          metalness: 0,
        }),
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load(imageUrl), // Front and back face texture
          roughness: 0,
          metalness: 0,
        }), // Back face color (magenta)
      ];

      const geometry = new THREE.BoxGeometry(1.5, 1, 0.09);

      const cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);

      scene.background = new THREE.Color(0xe5dcd4);
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 2, 3);
      scene.add(directionalLight);

      camera.position.z = 3;
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.update();
      // const axesHelper = new THREE.AxesHelper(3);
      // scene.add(axesHelper);
      cube.scale.set(1, 2, 1);

      let rotationCompleted = false;
      let rotationAngle = 0;

      function animate() {
        controls.update();
        requestAnimationFrame(animate);

        // 旋转半圈（180度）
        if (!rotationCompleted) {
          rotationAngle += Math.PI / 180; // 每帧旋转角度增加
          cube.rotation.y = rotationAngle;

          if (rotationAngle >= Math.PI) {
            rotationCompleted = true; // 旋转完成
          }
        }

        renderer.render(scene, camera);
      }

      animate();
      this.initialized = true; // 将初始化标志设置为 true
    },

    // 清除场景和资源
    disposeScene() {
      if (this.scene) {
        // 移除所有子对象
        while (this.scene.children.length > 0) {
          const child = this.scene.children[0];
          this.scene.remove(child);
          if (child.dispose) {
            child.dispose();
          }
        }

        // 解绑控制器
        if (this.controls) {
          this.controls.dispose();
        }

        // 清除渲染器
        if (this.renderer) {
          this.renderer.dispose();
        }
      }
    },
  },
};
</script>

<style>
/* 样式可以根据需要进行调整 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  /* background-color: white; */
  background-image: url("../assets/img/box.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  height: 75%;
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 55%; */
  font-size: 24px;
  font-family: cursive;

}


.modal-content {
  color: #81796d;
  height: 80%;
}

.modal-content img {
  max-width: 100%;
  height: auto;
}
/* 添加滚动条样式 */
.scrollable-content {
  max-height: 100%; /* 设置最大高度，超过部分会出现滚动条 */
  overflow-y: auto; /* 添加垂直滚动条 */
  margin-top: 10px; /* 调整上边距 */
}
.modal-content canvas {
  max-width: 100%;
  height: auto;
}
.ThreeJs {
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: -80%; */
  /* width: 80%;
    height: 80%; */
  /* background-color: #d82020; */
}

/*  */
.title {
  margin:10px 0 10px 0;
  font-size: 18px;
  color: #927045;
  font-weight: 600;
  /* font-family:'Times New Roman', Times, serif */
}
.detail-image {
  background-color: #d63030;
  width: 90%;
  height: 200px !important;
  border-radius: 15px;
}
.description{
  /* height: 150%; */
  margin:10px 15px 10px 15px;
  font-size: 14px;
  color: #81796d;
  text-align: left; /* 从左往右排列 */
}
</style>
