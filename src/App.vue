<template>
  <div id="app">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="小小商城">
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="goBack" v-show="flag">返回</mt-button>
      </router-link>
    </mt-header>

    <!-- 中间部分 router-view 区域 -->
    <transition mode="out-in">
      <router-view></router-view>
    </transition>

    <!-- 底部 Tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-wxy mui-active" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-wxy" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-wxy" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-wxy" to="/search">
        <span class="mui-icon mui-icon-gear"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>


<script>
export default {
  name: "app",
  data() {
    return {
      flag: false
    }
  },
  created() {
    this.flag = this.$route.path === '/home' ? false : true
    console.log(this.flag)
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  watch: {
    '$route.path': function(newVal) {
      if (newVal === '/home') {
        this.flag = false
      } else {
        this.flag = true
      }
    }
  }
};
</script>

<style>
.mint-head {
  z-index: 99;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 50px;
}

.app-container {
  /* padding-bottom: 50px; */
  overflow-x: hidden;
}

.is-fixed {
  height: 60px;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in;
}

.mui-bar-tab .mui-tab-item-wxy {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-wxy .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-wxy .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
