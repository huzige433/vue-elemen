// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'


//引入quill-editor编辑器
import VueQuillEditor from 'vue-quill-editor' 
import 'quill/dist/quill.core.css' 
import 'quill/dist/quill.snow.css' 
import 'quill/dist/quill.bubble.css' 
Vue.use(VueQuillEditor)

//实现quill-editor编辑器拖拽上传图片
import * as Quill from 'quill'
import { ImageDrop } from 'quill-image-drop-module'
Quill.register('modules/imageDrop', ImageDrop)

//实现quill-editor编辑器调整图片尺寸
import imageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', imageResize)

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h=>h(App)
})
