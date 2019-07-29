import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入时间格式化插件
import moment from 'moment'
// 定义全局过滤器格式化时间 
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

import HomeContainer from '@/components/tabber/HomeContainer'
import MemberContainer from '@/components/tabber/MemberContainer'
import SearchContainer from '@/components/tabber/SearchContainer'
import ShopcarContainer from '@/components/tabber/ShopcarContainer'
import NewList from '@/components/news/NewsList'
import NewsInfo from '@/components/news/NewsInfo'
import PhotoList from '@/components/photos/PhotoList'
import PhotoInfo from '@/components/photos/PhotoInfo'
import GoodsList from '@/components/goods/GoodsList'

export default new Router({
  routes: [
    {
      path: '/home',
      component: HomeContainer
    },
    {
      path: '/member',
      component: MemberContainer
    },
    {
      path: '/search',
      component: SearchContainer
    },
    {
      path: '/shopcar',
      component: ShopcarContainer
    },
    {
      path: '/home/newlist',
      component: NewList
    },
    {
      path: '/home/newsinfo/:id',
      component: NewsInfo
    },
    {
      path: '/home/photolist',
      component: PhotoList
    },
    {
      path: '/home/photoinfo/:id',
      component: PhotoInfo
    },
    {
      path: '/home/goodslist',
      component: GoodsList
    }
  ],
  linkActiveClass: 'mui-active'
})
