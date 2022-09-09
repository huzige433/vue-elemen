<template>
    <el-container>
        <el-header>
            <el-page-header @back="goBack" content="详情页面">
            </el-page-header>
        </el-header>
        <el-main>
            <el-row type="flex" class="row-bg" justify="center" :span="24">
                <el-col :span="8"><div class="grid-content bg-purple-light" style="text-align:center">
                    <h1>我是标题</h1>
                </div></el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center" :span="24">
                <el-col :span="18"><div class="grid-content bg-purple-light" >
                    <div>我是内容</div>
                    <div>我是内容</div>
                    <div>我是内容</div>
                    <div>我是内容</div>
                </div></el-col>
            </el-row>

        </el-main>
    
    <el-footer>
    </el-footer>
    </el-container>


</template>

<script>
    export default {
    name:"Articl",
      methods: {
        goBack() {
          this.$router.push({name:"BlogList"})
          console.log('go back');
        }
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