<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', cate.id === 0 ? 'mui-active' : '']"
            v-for="cate in cates"
            :key="cate.id" @click="getPhotoListByCateId(cate.id)"
          >{{ cate.title }}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link class="photo-list-li" v-for="item in photos" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
            <h1 class="info-title">{{ item.title }}</h1>
            <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 导入mui控件
import mui from "../../lib/mui/js/mui.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      cates: [],
      photos: []
    };
  },
  created() {
    this.getAllCategory();
  },
  mounted() {
    // 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        } else {
          Toast("获取数据失败");
        }
      });
    },
    getPhotoListByCateId(cateId) {
        this.$http.get('api/getimages/' + cateId).then(result => {
            if(result.body.status === 0) {
                this.photos = result.body.message;
            } else {
                Toast("获取图片失败");
            }
        })
    }
  }
};
</script>

<style scoped>
* {
  touch-action: pan-y;
}

.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
}

.photo-list-li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
}

img {
    width: 100%;
    vertical-align: middle;
}

img[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
}

.info {
    color: white;
    text-align: left;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    max-height: 84px;
}

.info-title {
    font-size: 14px;
}

.info-body {
    font-size: 13px;
}
</style>
