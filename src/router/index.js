import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Register from '@/views/Register'
import BlogList from '@/views/BlogList'
import Article from '@/views/Article'
import Editor from '@/views/Editor'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/bloglist',
      name: 'BlogList',
      component: BlogList
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor
    },
  ],
  mode: 'history'
})
