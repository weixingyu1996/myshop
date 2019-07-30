<template>
  <div>
    <!-- 轮播图 -->
    <swiper :lunbotuList="lunbotuList" :isFull="true"></swiper>

    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newlist">
          <img src="../../images/menu1.png" class="menuimg">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" class="menuimg">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" class="menuimg">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" class="menuimg">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" class="menuimg">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" class="menuimg">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from '../subcomponents/Swiper'

export default {
  data() {
    return {
      lunbotuList: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.$http
        .get("api/getlunbo")
        .then(result => {
          console.log(result.body);
          if (result.body.status === 0) {
            this.lunbotuList = result.body.message;
          } else {
            Toast("加载轮播图失败！！！");
          }
        });
    }
  },
  components: {
    swiper
  }
};
</script>

<style scoped>
/* 没有引入saas插件，该字体样式被禁用了 */
.mui-media-body { 
    font-size: 10px;
}

.mui-table-view.mui-grid-view {
  background-color: #fff;
  border: 0ch;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0ch;
}

.menuimg {
    width: 50px;
    height: 50px;
}

</style>
