<template>
    <el-container>
        <el-header>
            <el-page-header @back="goBack" content="详情页面">
            </el-page-header>
        </el-header>
        <el-main>
            <el-row type="flex" class="row-bg" justify="center" :span="24">
                <el-col :span="8"><div class="grid-content bg-purple-light" style="text-align:center">
                    <h1>{{Article.title}}</h1>
                </div></el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center" :span="24">
                <el-col :span="18"><div class="grid-content bg-purple-light" v-html="Article.content">

                </div></el-col>
            </el-row>

        </el-main>
    
    <el-footer>
    </el-footer>
    </el-container>


</template>

<script>
import http from '../utils/requets'

    export default {
    name:"Articl",
    data () {
      return {
        Article:''
      }
    },
      methods: {
        goBack() {
          this.$router.push({name:"BlogList"})
          console.log('go back');
        },
        //获取文章内容
      loginsubmit() {
      var that=this
          //async  await  是解决异步的一种方案，必须要加，但是原生封装就不用
          var options = {
            method: 'GET',
            url: 'http://127.0.0.1:8080/blog/article',
            params:{articleid:this.$route.query.articleid}
          };
          http(options).then((response) => {
            that.loading = false
            if (response.id) {
              this.Article=response

            } else {
              console.log("获取失败")
              alert("获取失败")
            }
          }).catch(error => {
            alert("获取失败")})
    }
      },
      mounted () {
        this.loginsubmit()
      }
    }
  </script>

<style>
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
  </style>