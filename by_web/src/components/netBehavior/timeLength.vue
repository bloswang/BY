/**
* Created by zhangxin on 2017/10/16.
*/
<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/safety' }">上网行为</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/status' }">上网时长分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          各类用户的上网时长&nbsp;&nbsp;(单位:小时)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="start_time"
              type="date"
              format="yyyy-MM-dd"
              @change="start_time_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="end_time"
              type="date"
              format="yyyy-MM-dd"
              @change="end_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="timeLength_echarts_1">
        </div>
      </el-col>
    </el-row>
    <!--各类用户月人均上网时长趋势图-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          各类用户月人均上网时长趋势图&nbsp;&nbsp;(单位:小时)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="two_time"
              type="year"
              format="yyyy"
              @change="two_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="timeLength_echarts_2">
        </div>
      </el-col>
    </el-row>

    <!--各年级 -->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          中国学生各年级月人均上网时长&nbsp;&nbsp;(单位:小时)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="NJ_month"
              type="month"
              format="yyyy-MM"
              @change="NJ_month_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="timeLength_echarts_3">
        </div>
      </el-col>
    </el-row>

    <!--学院-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          中国学生各学院月人均上网时长&nbsp;&nbsp;(单位:小时)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="school_month"
              type="month"
              format="yyyy-MM"
              @change="school_month_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="timeLength_echarts_4">
        </div>
      </el-col>
    </el-row>

    <!--省份 和 国别-->
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          中国学生各省份月人均上网时长top5&nbsp;&nbsp;(单位:小时)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="time_SF_month"
              type="month"
              format="yyyy-MM"
              @change="time_SF_month_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="timeLength_echarts_5">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          国际学生各国月人均上网时长top5&nbsp;&nbsp;(单位:小时)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="GJ_month"
              type="month"
              format="yyyy-MM"
              @change="GJ_month_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="timeLength_echarts_6">
        </div>
      </el-col>
    </el-row>

    <!--<el-row type="flex" justify="space-around" >
      <el-col :span="24" class="ec_bg"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
        <h5 class="ec_h5">
          上网时长与成绩关联分析
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="result_time"
              type="year"
              format="yyyy"
              @change="result_time_change"
              placeholder="选择时间">
            </el-date-picker>
            <el-select
              v-model="Select"
              placeholder="请选择"
              size="mini"
              class="major-select"
              @change="SelectChange">
              <el-option
                v-for="item in year_List"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </h5>
        <div class="ec_height" id="timeLength_echarts_5" >
        </div>
      </el-col>
    </el-row>-->
  </div>
</template>
<style lang="scss">
  .by_body_table {
    border: 0;
    td {
      border-bottom: 1px solid #2e2e30;
    }
    &::before {
      height: 0;
    }
    &::after {
      width: 0;
    }
  }

  .by_body_el_input {
    >.el-input__inner {
      background-color: #1f2024;
      color: #a2a3ab;
    }
  }

  .by_body_table th {
    background-color: #252629;
    border: 0;
    &.is-leaf {
      border-bottom: 1px solid #2e2e30;
    }
    .by_body_label {
      background-color: #252629;
      color: #a2a3ab;
      text-align: center;
    }
  }

  .by_body_row {
    background-color: #1f2024;
    color: #a2a3ab;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #252629;
  }

  .by_body_add {
    padding: 30px 50px;
    background-color: #1f2024;
    .el-dialog__header {
      text-align: center;
      .el-dialog__title {
        color: #04aec7;
      }
    }
    .form_bottom{
      text-align: center;
      .el-form-item__content{
        margin: 0 !important;
      }
    }
    .el-checkbox+.el-checkbox{
      margin-left: 0;
    }
    .el-checkbox{
      margin-right: 15px;
    }
  }

</style>
<script>
  import time from "../../config/timeFormat.js"
  export default{
    data () {
      return {
        loading:true,
        msg: '上网行为',
        teachingTeam_time:"",

        //各类用户的上网时长
        start_time:'2017-08-01',
        end_time:'2017-08-20',
        people_count_b:[],
        people_count_g:[],
        people_count_a:[],

        //各类用户月人均上网时长趋势图
        two_time:'2017',
        person_type:[],
        type_count_T:[],
        type_count_C:[],
        type_count_G:[],
        type_count_Q:[],
        //中国学生各年级月人均上网时长
        NJ_month:'2017-01',
        NJ_name:[],
        NJ_count:[],

        //中国学生各学院月人均上网时长
        school_month:'2017-01',
        C_M_name:[],
        C_M_count:[],

        //中国学生各省份月人均上网时长top5
        time_SF_month:'2017-01',
        SF_name:[],
        SF_count:[],

        //国际学生各国月人均上网时长top5
        GJ_month:'2017-01',
        GJ_name:[],
        GJ_count:[],

        //成绩分布
        /*Select:'上学年',
        code:'1',
        year_List:['上学年','下学年'],
        result_time:'2017',
        result_SW_time:[],
        result_1:[],
        result_2:[],
        result_3:[],
        result_4:[],
        result_5:[],*/
      }
    },
    components: {},
    methods: {
      make_time(){
        let vm  = this
          vm.start_time= time.year +'-'+'01'+'-'+'01';
          vm.end_time= time.year +'-'+time.month+'-'+ time.day;
          vm.two_time= time.year
          vm.NJ_month= time.year +'-'+time.month
          vm.school_month= time.year +'-'+time.month
          vm.time_SF_month= time.year +'-'+time.month
          vm.GJ_month= time.year +'-'+time.month
      },
      //各类用户的上网时长
      timeLength_echarts_1_fn(){
        let option =  {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['总上网时长', '男生上网时长', '女生上网时长'],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: [ '中国学生', '国际学生', '教师','其他人员']
          }],
          yAxis: [{
            type: 'value',
            name: '时长',
            axisLabel: {
              formatter: '{value}'
            }
          }],
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            }
          },
          series: [{
            name: '总上网时长',
            type: 'bar',
            barWidth:'30',
            data: this.people_count_a
          }, {
            name: '男生上网时长',
            type: 'bar',
            barWidth:'30',
            data: this.people_count_b
          }, {
            name: '女生上网时长',
            type: 'bar',
            barWidth:'30',
            data: this.people_count_g
          }]
        };
        this.timeLength_echarts_1.setOption(option)
      },
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
          vm.timeLength_echarts_1_init(vm.start_time,vm.end_time)
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
          vm.timeLength_echarts_1_init(vm.start_time,vm.end_time)
        }

      },
      timeLength_echarts_1_init(start,end){
        let vm = this
        vm.$axios.request("post","habit/sexProportion",{startDate:start,endDate:end,flag:'1',carType:'1'},function(data){
          vm.people_count_b=[]
          vm.people_count_g=[]
          vm.people_count_a=[]
          for(let i= 0;i<data.result.length;i++){
            vm.people_count_b.push(data.result[i].time)
          }
          for(let i= 0;i<data.result2.length;i++){
            vm.people_count_g.push(data.result2[i].time)
          }
          for(let i= 0;i<data.resultTotal.length;i++){
            vm.people_count_a.push(data.resultTotal[i].time)
          }
          vm.timeLength_echarts_1_fn()
        },function(err){
          console.log(err);
        })
      },


      //各类用户的上网时长
      timeLength_echarts_2_fn(){
        let option = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['教师','中国学生','国际学生','其他']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.person_type
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'教师',
              type:'line',
              stack: '总量1',
              data:this.type_count_T
            },
            {
              name:'中国学生',
              type:'line',
              stack: '总量2',
              data:this.type_count_C
            },
            {
              name:'国际学生',
              type:'line',
              stack: '总量3',
              data:this.type_count_G
            },
            {
              name:'其他',
              type:'line',
              stack: '总量4',
              data:this.type_count_Q
            }
          ]
        };
        this.timeLength_echarts_2.setOption(option)
      },
      two_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.two_time = val
          vm.timeLength_echarts_2_init(vm.two_time)
        }

      },
      timeLength_echarts_2_init(time){
        let vm = this
        /*教师*/
         vm.$axios.request("post","habit/usersType",{date:time,cartype:'3'},function(data){
           vm.person_type = []
           vm.type_count_T = []
           let count = ''
           for(let i= 0;i<data.result.length;i++){
             count = data.result[i].time/data.result[i].count
             vm.person_type.push(data.result[i].month+'月')
             vm.type_count_T.push(count.toFixed(2))
           }
           vm.timeLength_echarts_2_fn()
         },function(err){
           console.log(err);
         })
        /*中国学生*/
        vm.$axios.request("post","habit/usersType",{date:time,cartype:'1'},function(data){
          vm.type_count_C = []
          let count = ''
          for(let i= 0;i<data.result.length;i++){
            count = data.result[i].time/data.result[i].count
            vm.type_count_C.push(count.toFixed(2))
          }
          vm.timeLength_echarts_2_fn()
        },function(err){
          console.log(err);
        })
        /*国际学生*/
        vm.$axios.request("post","habit/usersType",{date:time,cartype:'2'},function(data){
          vm.type_count_G = []
          let count = ''
          for(let i= 0;i<data.result.length;i++){
            count = data.result[i].time/data.result[i].count
            vm.type_count_G.push(count.toFixed(2))
          }
          vm.timeLength_echarts_2_fn()
        },function(err){
          console.log(err);
        })
        /*其他*/
        vm.$axios.request("post","habit/usersType",{date:time,cartype:'4'},function(data){
          vm.type_count_Q = []
          let count = ''
          for(let i= 0;i<data.result.length;i++){
            count = data.result[i].time/data.result[i].count
            vm.type_count_Q.push(count.toFixed(2))
          }
          vm.timeLength_echarts_2_fn()
        },function(err){
          console.log(err);
        })
      },

      //中国学生各年级月人均上网时长
      timeLength_echarts3(){
        let option = {
          color: ['#8BDB05','#DBC912'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data:['本科生','研究生']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : this.NJ_name,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'本科生',
              type:'bar',
              barWidth: '20%',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              data:this.NJ_count
            },
            {
              name:'研究生',
              type:'bar',
              barWidth: '20%',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              data:this.NJ_count1
            }
          ]
        };

        this.timeLength_echarts_3.setOption(option)
      },
      NJ_month_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.NJ_month = val
          vm.NJ_init_fn(vm.NJ_month)
        }
      },
      NJ_init_fn(time){
        let vm = this
        vm.NJ_name = []
        vm.NJ_count = []
        vm.NJ_count1 = []
        vm.$axios.request("post","habit/gradeTime",{date:time},function(data){
          for(let i= 0;i<data.result.length;i++){
            vm.NJ_name.push(data.result[i].sj + '级')
            vm.NJ_count.push(data.result[i].count)
          }
          for(let i= 0;i<data.result1.length;i++){
            vm.NJ_count1.push(data.result1[i].count)
          }
          vm.timeLength_echarts3()
        },function(err){
          console.log(err);
        })
      },

      //中国学生各学院月人均上网时长
      timeLength_echarts4(){
        let option = {
          color: ['#1485DB','#DBCF5E'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '23%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : this.C_M_name,
              axisLabel: {
                interval:0,
                rotate:-30
              },
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name: '学院',
              type: 'bar',
              barWidth: '20%',
              data: this.C_M_count,
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
            }
          ]
        };
        this.timeLength_echarts_4.setOption(option)
      },
      school_month_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.school_month = val
          vm.school_init_fn(vm.school_month)
        }
      },
      school_init_fn(time){
        let vm = this
        vm.C_M_name = []
        vm.C_M_count = []
        vm.$axios.request("post","habit/collegeType",{date:time},function(data){
          for(let i= 0;i<data.result.length;i++){
            vm.C_M_name.push(data.result[i].academy)
            vm.C_M_count.push(data.result[i].count)
          }
          vm.timeLength_echarts4()
        },function(err){
          console.log(err);
        })
      },

      //中国学生各省份月人均上网时长top5
      timeLength_echarts5(){
        let option = {
          color: ['#B7FBFB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data:['省份']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          yAxis: [{
            type: 'category',
            data: this.SF_name,
            axisTick: {
              alignWithLabel: true
            }
          }],
          xAxis: [{
            type: 'value',
            splitNumber:3
          }],
          series: [{
            name: '省份',
            type: 'bar',
            barWidth: '40%',
            data: this.SF_count,
            label: {
              normal: {
                show: true,
                position: 'right',
              }
            }
          }]
        };
        this.timeLength_echarts_5.setOption(option)
      },
      time_SF_month_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.time_SF_month = val
          vm.SF_init_fn(vm.time_SF_month)
        }
      },
      SF_init_fn(time){
        let vm = this
        vm.SF_name = []
        vm.SF_count = []
        vm.$axios.request("post","habit/provinceTime",{date:time},function(data){
          for(let i= data.result.length-1; i>=0; i--){
            vm.SF_name.push(data.result[i].province)
            vm.SF_count.push(data.result[i].count)
          }
          vm.timeLength_echarts5()
        },function(err){
          console.log(err);
        })
      },

      //国际学生各国月人均上网时长top5
      timeLength_echarts6(){
        let option = {
          color: ['#C8DB18'],
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data:['国别']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          yAxis: [{
            type: 'category',
            data: this.GJ_name,
            axisTick: {
              alignWithLabel: true
            }
          }],
          xAxis: [{
            type: 'value',
            splitNumber:3
          }],
          series: [{
            name: '国别',
            type: 'bar',
            barWidth: '40%',
            data: this.GJ_count,
            label: {
              normal: {
                show: true,
                position: 'right',
              }
            }
          }]
        };
        this.timeLength_echarts_6.setOption(option)
      },
      GJ_month_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.GJ_month = val
          vm.GJ_init_fn(vm.GJ_month)
        }
      },
      GJ_init_fn(time){
        let vm = this
        vm.GJ_name = []
        vm.GJ_count = []
        vm.$axios.request("post","habit/countryTime",{date:time},function(data){
          for(let i= data.result.length-1; i>=0; i--){
            vm.GJ_name.push(data.result[i].country)
            vm.GJ_count.push(data.result[i].count)
          }
          vm.timeLength_echarts6()
        },function(err){
          console.log(err);
        })
      },

      //成绩分布
     /* timeLength_echarts5(){
        let timeLength_echarts_5 = this.$echarts.init(document.getElementById("timeLength_echarts_5"), 'customed');
        let option = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            top: '10%',
            data: ['60分以下', '60分-70分', '70分-80分','80分-90分','90分以上']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.result_SW_time
          },
          yAxis: {
            type: 'value',
            name:'单位(小时)'

          },
          series: [{
            name: '60分以下',
            type: 'line',
            data: this.result_1
          }, {
            name: '60分-70分',
            type: 'line',
            data: this.result_2
          }, {
            name: '70分-80分',
            type: 'line',
            data: this.result_3
          }, {
            name: '80分-90分',
            type: 'line',
            data: this.result_4
          }, {
            name: '90分以上',
            type: 'line',
            data: this.result_5
          }]
        };
        timeLength_echarts_5.setOption(option)
      },
      result_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.result_time = val
          vm.loading = true;
          vm.result_init_fn(vm.result_time,vm.code)
        }

      },
      SelectChange(val){
        let vm = this
        vm.Select = val
        vm.loading = true;
        if(val =='上学年'){
          vm.code = '1'
        }else{
          vm.code='2'
        }
        vm.result_init_fn(vm.result_time,vm.code)
      },
      result_init_fn(time,flag){
        let vm = this
        //成绩分布60一下
        vm.$axios.request("post","habit/markAnalyse",{date:time,flag:flag},function(data){
          vm.result_SW_time=[]
          vm.result_1=[]
          for(let i= 0;i<data.result.length;i++){
            if(data.result[i].line!=='其他'){
              vm.result_SW_time.push(data.result[i].line)
              vm.result_1.push(data.result[i].time)
            }
          }
          vm.$nextTick(function() {
            vm.loading = false;
          })
          vm.timeLength_echarts5()
        },function(err){
          console.log(err);
        })
        //成绩分布60-70
        vm.$axios.request("post","habit/markAnalyse1",{date:time,flag:flag},function(data){
          vm.result_2=[]
          for(let i= 0;i<data.result.length;i++){
            if(data.result[i].line!=='其他'){
              vm.result_2.push(data.result[i].time)
            }

          }
          vm.$nextTick(function() {
            vm.loading = false;
          })
          vm.timeLength_echarts5()
        },function(err){
          console.log(err);
        })
        //成绩分布70-80
        vm.$axios.request("post","habit/markAnalyse2",{date:time,flag:flag},function(data){
          vm.result_3=[]
          for(let i= 0;i<data.result.length;i++){
            if(data.result[i].line!=='其他'){
              vm.result_3.push(data.result[i].time)
            }

          }
          vm.$nextTick(function() {
            vm.loading = false;
          })
          vm.timeLength_echarts5()
        },function(err){
          console.log(err);
        })
        //成绩分布80-90
        vm.$axios.request("post","habit/markAnalyse3",{date:time,flag:flag},function(data){
          vm.result_4=[]
          for(let i= 0;i<data.result.length;i++){
            if(data.result[i].line!=='其他'){
              vm.result_4.push(data.result[i].time)
            }

          }
          vm.$nextTick(function() {
            vm.loading = false;
          })
          vm.timeLength_echarts5()
        },function(err){
          console.log(err);
        })
        //成绩分布90以上
        vm.$axios.request("post","habit/markAnalyse4",{date:time,flag:flag},function(data){
          vm.result_5=[]
          for(let i= 0;i<data.result.length;i++){
            if(data.result[i].line!=='其他'){
              vm.result_5.push(data.result[i].time)
            }

          }
          vm.$nextTick(function() {
            vm.loading = false;
          })
          vm.timeLength_echarts5()
        },function(err){
          console.log(err);
        })
      },*/

      //所有时间的函数
      /*all_init_fn(start,end){
        let vm = this
        //年龄比例
        vm.$axios.request("post","habit/ageProportion",{startDate:start,endDate:end,flag:'1'},function(data){
          vm.age_type = []
          vm.age_count = []
          for(let i= 0;i<data.result.length;i++){
            vm.age_type.push(data.result[i].age+'岁')
            vm.age_count.push({name:data.result[i].age+'岁',value:Math.round(data.result[i].long)})
          }
          vm.timeLength_echarts1()
        },function(err){
          console.log(err);
        })
        //性别比例
        vm.$axios.request("post","habit/sexProportion",{startDate:start,endDate:end,flag:'1'},function(data){
          vm.sex_type = []
          vm.sex_count = []
          for(let i= 0;i<data.result.length;i++){
            vm.sex_type.push(data.result[i].sex)
            vm.sex_count.push({name:data.result[i].sex,value:data.result[i].long})
          }
          vm.timeLength_echarts2()
        },function(err){
          console.log(err);
        })
        //人员类别
        vm.$axios.request("post","habit/personProportion",{startDate:start,endDate:end,flag:'1'},function(data){
          vm.people_type = []
          vm.people_count = []
          for(let i= 0;i<data.result.length;i++){
            vm.people_type.push(data.result[i].type)
            vm.people_count.push(Math.round(data.result[i].fldtime))
          }
          vm.timeLength_echarts3()
        },function(err){
          console.log(err);
        })
        //省份列表
        vm.$axios.request("post","habit/provinceLong",{startDate:start,endDate:end,flag:'1'},function(data){
          vm.monthList = []
          for(let i=0;i<data.result.length;i++){
            let place = ''
            if(data.result[i].province =='null' || data.result[i].province ==null){
              place = '未知'
            }else{
              place = data.result[i].province
            }
            vm.monthList.push({name:place,value:data.result[i].time})
          }
        },function(err){
          console.log(err);
        })
      },*/

    },
    mounted () {
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.timeLength_echarts_1 = this.$echarts.init(document.getElementById("timeLength_echarts_1"), 'customed');
      this.timeLength_echarts_2 = this.$echarts.init(document.getElementById("timeLength_echarts_2"), 'customed');
      this.timeLength_echarts_3 = this.$echarts.init(document.getElementById("timeLength_echarts_3"), 'customed');
      this.timeLength_echarts_4 = this.$echarts.init(document.getElementById("timeLength_echarts_4"), 'customed');
      this.timeLength_echarts_5 = this.$echarts.init(document.getElementById("timeLength_echarts_5"), 'customed');
      this.timeLength_echarts_6 = this.$echarts.init(document.getElementById("timeLength_echarts_6"), 'customed');
      this.timeLength_echarts_1_fn()
      this.timeLength_echarts_2_fn()
      },
    created(){
      window.scrollTo(0,0);
      let vm = this;
      vm. make_time()
      vm.timeLength_echarts_1_init(vm.start_time,vm.end_time)
      vm.timeLength_echarts_2_init(vm.two_time)
      //vm.result_init_fn(vm.result_time,vm.code)
      vm.NJ_init_fn(vm.NJ_month)
      vm.school_init_fn(vm.school_month)
      vm.SF_init_fn(vm.time_SF_month)
      vm.GJ_init_fn(vm.GJ_month)
    }
  }
</script>


