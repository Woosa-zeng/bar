import Vue from 'vue'
import Router from 'vue-router'
import sell from '@/components/sell/sell'
import chat from '@/components/chat/chat'
import goods from '@/components/goods/goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sell',
      component: sell
    },
    {
      path: '/sell',
      name: 'sell',
      component: sell,
      children: [
        {path: 'goods', components: goods},
        {path: 'chat', components: chat}
      ]
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat
    }
  ]
})
