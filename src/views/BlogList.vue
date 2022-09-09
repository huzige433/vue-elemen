<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee" v-show="!isShowMultiple">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>所有文章</template>
            <el-menu-item-group>
              <template slot="title">作者</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>

          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item @click.native="setMaskShow">新增</el-dropdown-item>
              <el-dropdown-item @click.native="quitout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        <el-main>
          <el-table :data="tableData" >
            <el-table-column prop="name" label="标题" width="200px" />
            <el-table-column prop="address" label="描述" />
            <el-table-column prop="date" label="日期" width="200px" />
          </el-table>
        </el-main>

        <el-pagination background layout="prev, pager, next, jumper, ->, total" :total="1000">
        </el-pagination>

      </el-container>
    </el-container>
    <el-row class="model" v-show="isShowMultiple">
      <el-col class="modelFixed" ref="child" >
          <Editor ></Editor>
        <el-button type="primary" @click.native="setMaskhide" style="margin-left:50%;">保存文章</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Editor from './Editor.vue'

export default {
  name: "BlogList",
  components: { Editor },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎王小虎王',
      address: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),
      isShowMultiple: false
    }
  },
  methods: {
    setMaskShow() {

        this.isShowMultiple = true;
      
    },
    setMaskhide() {
        this.isShowMultiple = false;
    },
    quitout(){
      this.$router.push({ name: 'Login' })
    }
  }
};
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>