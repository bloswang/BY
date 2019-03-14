<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item>疑似沉迷网络学生分析</el-breadcrumb-item>
    </el-breadcrumb>

    <h5 class="ec_h5">
      疑似沉迷学生列表
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

        <el-date-picker
          class="select_width"
          align="right"
          size='mini'
          v-model="start_time"
          @change="start_time_change"
          format="yyyy-MM-dd"
          type="date"
          placeholder="开始时间">
        </el-date-picker>至
        <el-date-picker
          class="select_width"
          align="right"
          size='mini'
          v-model="end_time"
          @change="end_time_change"
          format="yyyy-MM-dd"
          type="date"
          placeholder="结束时间">
        </el-date-picker>
        <span class="text">自定义连续上网时长:</span>
      </div>
    </h5>
    <div class="ec_height" id="positive">
      <el-table
        v-loading="loading_chenmi"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="SW_list"
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
        <el-table-column prop="SW_time" label="上网时长"  class-name="elTableName">
        </el-table-column>
        <el-table-column prop="SW_date" label="日期" class-name="elTableName">
        </el-table-column>
      </el-table>
    </div>
    <div class="block"  style="width:300px;margin:20px auto">
      <el-pagination
        @size-change="handleSizeChange_CM"
        @current-change="handleCurrentChange_CM"
        :current-page.sync= pageNum_chenmi
        :page-size= size_chenmi
        layout="total, prev, pager, next"
        :total=total_count_chenmi>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        loading_chenmi:true,
        start_time:'2017-07-01',
        end_time:'2017-09-01',

        timeSelect: '五小时以上',
        timeList: ['五小时以上','六小时以上','七小时以上','八小时以上','九小时以上','十小时以上'],
        duration:'5',

        pageNum_chenmi:1,
        size_chenmi:8,
        total_count_chenmi:0,

        SW_list:[],
        input_chenmi:''
      }
    },
    methods:{
      time_init(){
        let date=new Date;
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate()
        let startDay = ''
        year = year + ''
        if(month <10){
          month = year +'-'+'0'+ month
        }else if(month>10){
          month = year +'-'+ month
        }
        day = day + ''
        if(day <10){
          day = month +'-'+ '0' + day
          startDay = month +'-'+'01'
        }else if(day > 10){
          day =  month + '-' + day
          startDay = month +'-'+'01'
        }
        this.start_time =startDay
        this.end_time = day

      },
      //沉迷网络学生分析列表
      start_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.end_time){
          if(this.end_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.start_time = ''
            return
          }else{
            this.start_time = val
          }
        }else{
          vm.start_time = val
          this.fn(this.start_time,this.end_time,this.duration,this.pageNum_chenmi,this.size_chenmi)
        }

      },
      end_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.start_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.end_time = ''
          return
        }else{
          vm.end_time = val
          this.fn(this.start_time,this.end_time,this.duration,this.pageNum_chenmi,this.size_chenmi)
        }

      },
      timeChange(val) {
        let time_code = ''
        if(val =='五小时以上'){
          time_code = '5'
        }else if(val == '六小时以上'){
          time_code ='6'
        }else if(val == '七小时以上'){
          time_code = '7'
        }else if(val == '八小时以上'){
          time_code = '8'
        }else if(val == '九小时以上'){
          time_code = '9'
        }else if(val == '十小时以上'){
          time_code = '10'
        }
        this.duration = time_code
        this.fn(this.start_time,this.end_time,this.duration,this.pageNum_chenmi,this.size_chenmi)
      },
      handleSizeChange_CM(val) {
        var vm = this
        vm.loading_chenmi = true
        vm.pageNum_chenmi = val
        this.fn(this.start_time,this.end_time,this.duration,this.pageNum_chenmi,this.size_chenmi)
      },
      handleCurrentChange_CM(val) {
        var vm = this
        vm.loading_chenmi = true
        vm.pageNum_chenmi = val
        this.fn(this.start_time,this.end_time,this.duration,this.pageNum_chenmi,this.size_chenmi)
      },
      fn(start,end,duration,page,size){
        let vm = this
        vm.loading_chenmi = true
        //沉迷网络
        vm.$axios.request("post","WallowNet/wallowNetList", {
          startTime:start,
          endTime:end,
          duration:duration,
          page:page,
          pageSize:size},function(data){
          vm.SW_list=[]
          vm.total_count_chenmi = parseInt(data.totalCount)
          let name = ''
          let age = ''
          let title = ''
          let major = ''
          let school = ''
          let SW_time = ''
          let SW_date = ''
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

            if(data.result[i].sum =='null'){
              SW_time = '未知'
            }else{
              SW_time = data.result[i].sum
            }

            if(data.result[i].in_year_month_day =='null'){
              SW_date = '未知'
            }else{
              SW_date = data.result[i].in_year_month_day
            }

            vm.SW_list.push({
              name : name,
              age : age,
              title : title,
              major : major,
              school : school,
              SW_time : SW_time,
              SW_date : SW_date,
            })
          }
          vm.$nextTick(function() {
            vm.loading_chenmi = false
          })
        },function(err){
          console.log(err);
        })
      }

    },
    created(){
      window.scrollTo(0,0);
      let vm = this
      vm.time_init()
      //沉迷网络
      vm.$axios.request("post","WallowNet/wallowNetList", {
          startTime:vm.start_time,
          endTime:vm.end_time,
          duration:vm.duration,
          page:vm.pageNum_chenmi,
          pageSize:vm.size_chenmi},function(data){
          vm.total_count_chenmi = parseInt(data.totalCount)
          let name = ''
          let age = ''
          let title = ''
          let major = ''
          let school = ''
          let SW_time = ''
          let SW_date = ''
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

            if(data.result[i].sum =='null'){
              SW_time = '未知'
            }else{
              SW_time = data.result[i].sum
            }

            if(data.result[i].in_year_month_day =='null'){
              SW_date = '未知'
            }else{
              SW_date = data.result[i].in_year_month_day
            }

            vm.SW_list.push({
              name : name,
              age : age,
              title : title,
              major : major,
              school : school,
              SW_time : SW_time,
              SW_date : SW_date,
            })
          }
          vm.$nextTick(function() {
            vm.loading_chenmi = false
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
  .text{
    float: right;
    color: #f0f0f0;
    font-size: 12px;
    margin-right: -15px;
    margin-left: 20px;
    margin-top: 3px;
  }
</style>
