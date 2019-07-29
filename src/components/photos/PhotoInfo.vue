<template>
    <div>
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图 -->
        <vue-preview :slides="list" @close="handleClose"></vue-preview>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 放置评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import { Toast } from "mint-ui"
import comment from '../subcomponents/Comment'

export default {
    data() {
        return {
            id: this.$route.params.id,
            photoinfo: {},
            list: []
        }
    },
    created() {
        this.getPhotoInfo();
        this.handleClose();
    },
    methods: {
        getPhotoInfo() {
            this.$http.get('api/getimageInfo/' + this.id).then(result => {
                if (result.body.status ===0) {
                    this.photoinfo = result.body.message[0];
                } else {
                    Toast("获取详情失败");
                }
            })
        },
        handleClose() {
            this.$http.get('api/getthumimages/' + this.id).then(result => {
                if (result.body.status === 0) {
                    var i = 0;
                    result.body.message.forEach(item => {
                        item.msrc = item.src;
                        item.w = 600;
                        item.h = 400;
                        // item.alt = i++;
                        item.alt = "缺少图片按原图显示"
                    });
                    this.list = result.body.message;
                } else {
                    Toast("获取缩略图失败");
                }
            })
        }
    },
    components: {
        'cmt-box': comment
    }
}
</script>

<style scoped>
.photoinfo-container {
    padding: 3px;
}

h3 {
    color: #26A2FF;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
}

.subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}

.content {
    font-size: 14px;
    line-height: 30px;
}
</style>
