<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item>疑似失联学生分析</el-breadcrumb-item>
    </el-breadcrumb>

    <h5 class="ec_h5">
      疑似失联学生列表
      <div class="ec_h5_data">
        <el-select
          v-model="timeSelect"
          placeholder="请选择"
          size="mini"
          class="major-select select_width"
          @change="timeChange">
          <el-option
            v-for="(item,index) in timeList"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-select
          v-model="typeSelect"
          placeholder="请选择"
          size="mini"
          class="major-select select_width"
          @change="typeChange">
          <el-option
            v-for="(item,index) in typeList"
            :key="index"
            :label="item"
            :value="index">
          </el-option>
        </el-select>
        <!--<el-input
          v-model="input"
          style="margin-right: 20px"
          placeholder="自定义失联时间"
          class="major-select"
          icon="search"
          size="mini"
          :on-icon-click="handleIconClick"></el-input>-->
      </div>
    </h5>
    <div class="ec_height" id="positive">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="goHome_list"
        align="center"
        style="width: 100%;overflow: auto"
        :show-header='true'>
        <el-table-column prop="name" label="姓名"  class-name="elTableName">
        </el-table-column>
        <el-table-column prop="age" label="年龄" class-name="elTableName">
        </el-table-column>
        <el-table-column prop="title" label="学号" class-name="elTableName">
        </el-table-column>
        <el-table-column prop="major" label="专业" class-name="elTableName">
        </el-table-column>
        <el-table-column prop="school" label="学院"  class-name="elTableName">
        </el-table-column>
        <el-table-column prop="loss_time" label="失联天数" class-name="elTableName">
        </el-table-column>
        <el-table-column prop="last_time" label="最后操作时间"  class-name="elTableName">
        </el-table-column>

      </el-table>
    </div>
    <div class="block"  style="width:300px;margin:20px auto">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync= pageNum
        :page-size= size
        layout="total, prev, pager, next"
        :total=total_count>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        loading:true,
        timeSelect: '近三天',
        timeList: ['近三天','近七天','近十五天'],
        time:'3',

        typeSelect: '门禁',
        typeList: ['门禁','消费','上网'],
        code:'1',

        pageNum:1,
        size:8,
        total_count:0,

        goHome_list:[],
        input:''
      }
    },
    methods:{
      //失联分析列表
      timeChange(val) {
        let time_code = ''
        if(val =='近三天'){
          time_code = '3'
        }else if(val == '近七天'){
          time_code ='7'
        }else if(val == '近十五天'){
          time_code = '15'
        }
        this.time = time_code
        this.fn(this.code,this.time,this.pageNum,this.size)
      },
      typeChange(val) {
        this.code = val+1
        console.log(this.code)
        this.fn(this.code,this.time,this.pageNum,this.size)
      },
      handleSizeChange(val) {
        var vm = this
        vm.loading = true
        vm.pageNum = val
        this.fn(this.code,this.time,this.pageNum,this.size)
      },
      handleCurrentChange(val) {
        var vm = this
        vm.loading = true
        vm.pageNum = val
        this.fn(this.code,this.time,this.pageNum,this.size)
      },
     /* handleIconClick(){
        console.log(typeof this.input)
      }*/
     fn(flag,days,page,size){
       let vm = this
       vm.loading = true
       vm.$axios.request("post","lossCommunication/lossList",
          {flag:flag,
           days:days,
           page:page,
           pageSize:size},function(data){
           vm.goHome_list = []
           vm.total_count = parseInt(data.totalCount)
           let name = ''
           let age = ''
           let title = ''
           let major = ''
           let school = ''
           let loss_time = ''
           let last_time = ''
           for(let i=0;i<data.result.length;i++){
             if(data.result[i].xm =='null'){
               name = '未知'
             }else{
               name = data.result[i].xm
             }

             if(data.result[i].age =='null'){
               age = '未知'
             }else{
               age = data.result[i].age
             }

             if(data.result[i].xh =='null'){
               title = '未知'
             }else{
               title = data.result[i].xh
             }

             if(data.result[i].t_zydm =='null'){
               major = '未知'
             }else{
               major = data.result[i].t_zydm
             }

             if(data.result[i].t_dwdm =='null'){
               school = '未知'
             }else{
               school = data.result[i].t_dwdm
             }

             if(data.result[i].losstime =='null'){
               loss_time = '未知'
             }else{
               loss_time = data.result[i].losstime
             }

             if(data.result[i].lasttime =='null'){
               last_time = '未知'
             }else{
               last_time = data.result[i].lasttime
             }

             vm.goHome_list.push({
               name : name,
               age : age,
               title : title,
               major : major,
               school : school,
               loss_time : loss_time,
               last_time : last_time,
             })
           }
           vm.$nextTick(function() {
             vm.loading = false
           })
         },function(err){
           console.log(err);
         })
     }

    },
    created(){
      window.scrollTo(0,0);
      let vm = this
      //失联列表
      vm.$axios.request("post","lossCommunication/lossList",
        {flag:vm.code,
          days:vm.time,
          page:vm.pageNum,
          pageSize:vm.size},function(data){
          vm.total_count = parseInt(data.totalCount)
          console.log(data)
          let name = ''
          let age = ''
          let title = ''
          let major = ''
          let school = ''
          let loss_time = ''
          let last_time = ''
        for(let i=0;i<data.result.length;i++){
          if(data.result[i].xm =='null'){
            name = '未知'
          }else{
            name = data.result[i].xm
          }

          if(data.result[i].age =='null'){
            age = '未知'
          }else{
            age = data.result[i].age
          }

          if(data.result[i].xh =='null'){
            title = '未知'
          }else{
            title = data.result[i].xh
          }

          if(data.result[i].t_zydm =='null'){
            major = '未知'
          }else{
            major = data.result[i].t_zydm
          }

          if(data.result[i].t_dwdm =='null'){
            school = '未知'
          }else{
            school = data.result[i].t_dwdm
          }

          if(data.result[i].losstime =='null'){
            loss_time = '未知'
          }else{
            loss_time = data.result[i].losstime
          }

          if(data.result[i].lasttime =='null'){
            last_time = '未知'
          }else{
            last_time = data.result[i].lasttime
          }

          vm.goHome_list.push({
           name : name,
           age : age,
           title : title,
           major : major,
           school : school,
           loss_time : loss_time,
           last_time : last_time,
          })
        }
          vm.$nextTick(function() {
            vm.loading = false
          })
      },function(err){
        console.log(err);
      })


    }
  }
</script>

<style>
  .el-table .elTableName{
    border:none;
  }
</style>
