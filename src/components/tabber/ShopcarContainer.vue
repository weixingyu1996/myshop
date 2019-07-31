<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner" v-for="item in goodslist" :key="item.id">
            <mt-switch v-model="$store.getters.getSelected[item.id]" @change="selectedChange(item.id, $store.getters.getSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
                <h1>{{ item.title }}</h1>
                <p>
                    <span class="price">￥{{ item.sell_price }}</span>
                    <numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                    <a href="#" style="font-size:13px;" @click.prevent="remove(item.id)">删除</a>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
            <div class="left">
                <p>总计(不含运费)</p>
                <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsAccountAndAmount.count }}</span> 件，总价 <span class="red">￥{{ $store.getters.getGoodsAccountAndAmount.amount }}</span> 元</p>
            </div>
            <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from '../subcomponents/ShopCar_numbox'

export default {
    data() {
        return {
            goodslist: []
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList() {
            var idArr = [];
            this.$store.state.car.forEach(item => idArr.push(item.id));
            if (idArr.length <= 0) {
                return;
            }
            this.$http.get('api/goods/getshopcarlist/' + idArr.join(",")).then(result => {
                if(result.body.status === 0) {
                    this.goodslist = result.body.message;
                }
            })
        },
        remove(id, index) {
            this.goodslist.splice(index, 1);
            this.$store.commit('removeFromCar', id)
        },
        selectedChange(id, val) {
            this.$store.commit('updateGoodSelected', {id, selected: val})
        }
    },
    components: {
        numbox
    }
}
</script>

<style scoped>
.shopcar-container {
    background-color: #eee;
    overflow: hidden;
}

img {
    width: 60px;
    height: 60px;
}

h1 {
    font-size: 13px;
}

.info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.price {
    color: red;
    font-weight: bold;
}

.mui-card-content-inner {
    display: flex;
    align-items: center;
}

.jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.red {
    color: red;
    font-weight: bold;
    font-size: 16px;
}
</style>