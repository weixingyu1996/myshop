<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item class="item-img" v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" alt="item.id" :class="{'full' : isFull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["lunbotuList", "isFull"]
};
</script>

<style scoped>
.mint-swipe {
  height: 180px;
  text-align: center;
}

img {
  height: 100%;
}

.full {
    width: 100%;
}
</style>
