import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/home'
import Cards from '@/views/cards'
import Table from '@/views/table'
import RenderTable from '@/views/render-table'
import VforTable from '@/views/vfor-table'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'HelloWorld',
    components: {
      default: Home
    }
  },
  {
    path: '/cards',
    name: 'Cards',
    components: {
      default: Cards
    }
  },
  {
    path: '/table',
    name: 'Table',
    components: {
      default: Table
    }
  },
  {
    path: '/render-table',
    name: 'Render table',
    components: {
      default: RenderTable
    }
  },
  {
    path: '/vfor-table',
    name: 'v-for table',
    components: {
      default: VforTable
    }
  }
  ]
})
