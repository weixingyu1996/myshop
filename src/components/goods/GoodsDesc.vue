<template>
    <div class="goodsdesc-container">
        <h3 class="title">{{ info.title }}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            info: {}
        }
    },
    created() {
        this.getGoodsDesc();
    },
    methods: {
        getGoodsDesc() {
            this.$http.get('api/goods/getdesc/' + this.$route.params.id).then(result => {
                if (result.body.status === 0) {
                    this.info = result.body.message[0];
                }
            })
        }
    }
}
</script>

<style>
.goodsdesc-container {
    padding: 4px;
}

.title {
    font-size: 15px;
    color: #226aff;
    margin: 15px 0;
}

img {
    width: 100%;
}
</style>
