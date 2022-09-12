<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee" v-show="!isShowMultiple">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>所有文章</template>
            <el-menu-item-group>
              <template slot="title">作者</template>
              <el-menu-item index="2-1" v-for="auth in authDate" :key="auth.id" @click="showbloglist(auth.id)">

                {{auth.username}}
              </el-menu-item>
            </el-menu-item-group>

          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px;width: 30px;height: 30px;"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item @click.native="setMaskShow">新增</el-dropdown-item>
              <el-dropdown-item @click.native="quitout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{$store.getters.getUser.username}}</span>
        </el-header>
        <el-main>
          <el-table :data="tableData" >
            <el-table-column prop="title" label="标题" width="200px" />
            <el-table-column prop="descript" label="描述" />
            <el-table-column label="链接"  prop="code" :show-overflow-tooltip="true">
              <template slot-scope="scope">
              <div @click="goEnviro(scope.row.id)"  style="cursor:pointer;color:blue">访问</div>
              </template>
            </el-table-column>
          
          </el-table>
        </el-main>


        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
          layout="total, sizes, prev, pager, next, jumper" :total="total" :page-size="5"
          :page-sizes="[5,10, 20, 30, 40, 50, 100]">
        </el-pagination>

      </el-container>
    </el-container>
    <el-row class="model" v-show="isShowMultiple">
      <el-col class="modelFixed" ref="child">
        <Editor></Editor>
        <el-button type="primary" @click.native="setMaskhide" style="margin-left:50%;">关闭编辑器</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Editor from './Editor.vue'
import http from "../utils/requets"

export default {
  name: "BlogList",
  components: { Editor },
  mounted() {
    this.showAuth()
  },
  data() {
    return {
      tableData: new Array(),
      authDate: new Array(),
      isShowMultiple: false,
      dialogFormVisible: false,
      tableData: [],
      total: 0,  //总条数
      pSize: 5,  //默认10条
      noewuserid:0
    }
  },
  methods: {
    setMaskShow() {

      this.isShowMultiple = true;

    },
    setMaskhide() {
      this.isShowMultiple = false;
    },
    quitout() {
      localStorage.clear()
      this.$store.dispatch('asyncUpdateUser', {username:'',id:''})
      this.$router.push({ name: 'Login' })
    },
    showbloglist(userid) {
      // var options = {
      //   method: 'GET',
      //   url: 'http://127.0.0.1:8080/blog/list/' + userid
      // };
      // http(options).then((response) => {
      //   this.loading = false
      //   if (response.flag) {
      //     this.tableData = response.data
      //   } else {
      //     alert("显示失败")
      //   }
      // }).catch(function (error) {
      //   this.loading = false
      //   alert("显示失败")
      // })
      this.noewuserid=userid
      this.handleCurrentChange(1)
    },
    showAuth() {
      var options = {
        method: 'GET',
        url: 'http://127.0.0.1:8080/v1/getusers'
      };
      http(options).then((response) => {
        this.loading = false
        if (response.flag) {
          this.authDate = response.data
          this.showbloglist(this.authDate[0].id)
        } else {
          alert("显示失败")
        }
      }).catch(function (error) {
        this.loading = false
        alert("显示失败")
      })
      
    },
    getDataList(index, pageSize,userid) {  //获取数据列表
      var options = {
        method: 'GET',
        url: 'http://127.0.0.1:8080/blog/page',
        params: { pageSize: pageSize, currentPage: index ,userid:userid}
      };
      http(options).then(response => {
        this.total = response.total;
        if (response.data) {
          this.tableData = response.data;
        }
      }).catch(err => {
        alert(err);
      })
    },

    handleSizeChange(val) {
      console.log('每页' + val + ' 条');
      this.pSize = val;
      this.getDataList(1, val,this.noewuserid);
    },
    handleCurrentChange(val) {
      console.log('当前页: ' + val);
      this.getDataList(val, this.pSize,this.noewuserid);
    },
    mounted() {
      this.getDataList(1, this.pSize,this.noewuserid);
    },
    goEnviro(articleid){
      this.$router.push({name:'Article',query: {articleid:articleid}})
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