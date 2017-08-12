import Vue from 'vue'
import Router from 'vue-router'
import sell from '@/components/sell/sell'
import chating from '@/components/chating/chating'
import payment from '@/components/payment/payment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sell',
      component: sell,
      children: [
        {
          path: 'goods',
          name: 'goods',
          component: require('../components/goods/goods')
        },
        {
          path: 'chat',
          name: 'chat',
          component: require('../components/chat/chat')
        }
      ]
    },
    {
      path: '/chating',
      name: 'chating',
      component: chating
    },
    {
      path: '/payment',
      name: 'payment',
      component: payment
    }
  ]
})
