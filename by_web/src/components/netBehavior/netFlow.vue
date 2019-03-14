
<template>
    <div class="w">
      <el-breadcrumb separator=">" class="navigation">
        <el-breadcrumb-item :to="{ path: '/home/safety' }">上网行为</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/status' }">上网流量分析</el-breadcrumb-item>
      </el-breadcrumb>
      <!--总体流量情况-->
      <el-row type="flex" justify="space-around">
        <el-col :span="24"
                v-loading.body="loadingAll"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg">
          <h5 class="ec_h5">
            总体流量情况&nbsp;&nbsp;(单位:G)
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="netFlow_time"
                type="year"
                format="yyyy"
                @change="netFlow_change"
                placeholder="选择时间">
              </el-date-picker>
              <el-select v-model="person_type" size="mini" class="select_width" @change="person_type_change" placeholder="请选择">
                <el-option
                  v-for="item in person_list"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
          </h5>
          <div class="ec_height" id="netFlow_echarts_1">
          </div>
        </el-col>
      </el-row>

      <!--各类用户月人均计费流量趋势图-->
      <el-row type="flex" justify="space-around">
        <el-col :span="24"
                v-loading.body="loading2"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg">
          <h5 class="ec_h5">
            各类用户月人均计费流量趋势图&nbsp;&nbsp;(单位:G)
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="user_month"
                type="year"
                format="yyyy"
                @change="user_month_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="netFlow_echarts_2">
          </div>
        </el-col>
      </el-row>

      <!--各年级 -->
      <el-row type="flex" justify="space-around">
        <el-col :span="24"
                v-loading.body="loading3"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg">
          <h5 class="ec_h5">
            中国学生各年级月人均计费流量&nbsp;&nbsp;(单位:G)
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
          <div class="ec_height" id="netFlow_echarts_3">
          </div>
        </el-col>
      </el-row>

      <!--学院-->
      <el-row type="flex" justify="space-around">
        <el-col :span="24"
                v-loading.body="loading4"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg">
          <h5 class="ec_h5">
            中国学生各学院月人均计费流量&nbsp;&nbsp;(单位:G)
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
          <div class="ec_height" id="netFlow_echarts_4">
          </div>
        </el-col>
      </el-row>

      <!--省份 和 国别-->
      <el-row type="flex" justify="space-around">
        <el-col :span="12"
                v-loading.body="loading5"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg">
          <h5 class="ec_h5">
            中国学生各省份月人均计费流量top5&nbsp;&nbsp;(单位:G)
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="SF_month"
                type="month"
                format="yyyy-MM"
                @change="SF_month_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="netFlow_echarts_5">
          </div>
        </el-col>
        <el-col :span="12"
                v-loading.body="loading6"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg">
          <h5 class="ec_h5">
            国际学生各国月人均计费流量top5&nbsp;&nbsp;(单位:G)
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
          <div class="ec_height" id="netFlow_echarts_6">
          </div>
        </el-col>
      </el-row>
    </div>
</template>
<script>
  import time from "../../config/timeFormat.js"
    export default{
        data () {
            return {
              msg: '上网行为',
              teachingTeam_time:"",
              tableData:[],

              //总体流量情况
              loadingAll:true,
              netFlow_echarts_1:'',
              netFlow_time:'',
              person_type:'全部',
              person_flag:'',
              person_list: ['全部','教师','中国学生','国际学生','临时人员'],
              FlowDateTime:[],
              FlowDateAll:[],
              FlowDateUp:[],
              FlowDateDown:[],

              //各类用户月人均计费流量趋势图
              loading2:true,
              netFlow_echarts_2:'',
              user_month:'2017',
              user_name:[],
              user_count:[],

              //中国学生各年级月人均计费流量
              loading3:true,
              netFlow_echarts_3:'',
              NJ_month:'2017-01',
              NJ_name:[],
              NJ_count:[],

              //中国学生各学院月人均计费流量
              loading4:true,
              netFlow_echarts_4:'',
              school_month:'2017-01',
              C_M_name:[],
              C_M_count:[],

              //中国学生各省份月人均计费流量top5
              loading5:true,
              netFlow_echarts_5:'',
              SF_month:'2017-01',
              SF_name:[],
              SF_count:[],

              //国际学生各国月人均计费流量top5
              loading6:true,
              netFlow_echarts_6:'',
              GJ_month:'2017-01',
              GJ_name:[],
              GJ_count:[],
            }
        },
        components: {},
        methods: {
          make_time(){
            let vm  = this
              vm.netFlow_time= time.year
              vm.user_month= time.year
              vm.NJ_month = time.year +'-'+time.month
              vm.school_month = time.year +'-'+time.month
              vm.SF_month = time.year +'-'+time.month
              vm.GJ_month = time.year +'-'+time.month
          },
          //总体流量情况
          netFlow_echarts1(){
            let option = option = {
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data:['总流量','上行流量','下行流量']
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
                data:this.FlowDateTime
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  name:'总流量',
                  type:'line',
                  stack: '总量1',
                  data:this.FlowDateAll
                },
                {
                  name:'上行流量',
                  type:'line',
                  stack: '总量2',
                  data:this.FlowDateUp
                },
                {
                  name:'下行流量',
                  type:'line',
                  stack: '总量3',
                  data:this.FlowDateDown
                }
              ]
            };
            this.netFlow_echarts_1.setOption(option)
          },
          netFlow_change(val){
            let vm = this
            if(val == undefined){
              return
            }else{
              vm.netFlow_time = val
              vm.netFlow_init_fn(vm.netFlow_time,vm.person_flag)
            }
          },
          person_type_change(val){
            let vm = this
            if(val == '全部'){
              vm.person_flag = ''
            }else if(val == '教师'){
              vm.person_flag = '3'
            }else if(val == '中国学生'){
              vm.person_flag = '1'
            }else if(val == '国际学生'){
              vm.person_flag = '2'
            }else{
              vm.person_flag = '4'
            }
            vm.person_type = val
            vm.netFlow_init_fn(vm.netFlow_time,vm.person_flag)
          },
          netFlow_init_fn(time,carType){
            let vm = this
            vm.loadingAll = true
            vm.FlowDateTime = []
            vm.FlowDateAll = []
            vm.FlowDateUp = []
            vm.FlowDateDown = []
            /*总流量*/
            vm.$axios.request("post","flow/netInterAllFlow",{year:time,carType:carType },function(data){
              for(let i = 0;i<data.allFlow.length;i++){
                vm.FlowDateTime.push(data.allFlow[i].month + '月')
                vm.FlowDateAll.push(data.allFlow[i].count)
              }
              vm.$nextTick(function() {
                vm.loadingAll = false
              })
              vm.netFlow_echarts1()
            },function(err){
              console.log(err);
            })
            /*上行流量*/
            vm.$axios.request("post","flow/netInterUpFlow",{year:time,carType:carType },function(data){
              for(let i = 0;i<data.upFlow.length;i++){
                vm.FlowDateUp.push(data.upFlow[i].count)
              }
              vm.netFlow_echarts1()
            },function(err){
              console.log(err);
            })
            /*下行流量*/
            vm.$axios.request("post","flow/netInterDownFlow",{year:time,carType:carType },function(data){
              for(let i = 0;i<data.downFlow.length;i++){
                vm.FlowDateDown.push(data.downFlow[i].count)
              }
              vm.netFlow_echarts1()
            },function(err){
              console.log(err);
            })
          },

          //各类用户月人均计费流量趋势图
          netFlow_echarts2(){
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
                data:this.user_name
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  name:'教师',
                  type:'line',
                  stack: '总量1',
                  data:this.user_count1
                },
                {
                  name:'中国学生',
                  type:'line',
                  stack: '总量2',
                  data:this.user_count2
                },
                {
                  name:'国际学生',
                  type:'line',
                  stack: '总量3',
                  data:this.user_count3
                },
                {
                  name:'其他',
                  type:'line',
                  stack: '总量4',
                  data:this.user_count4
                },
              ]
            };
            this.netFlow_echarts_2.setOption(option)
          },
          user_month_change(val){
            let vm = this
            if(val == undefined){
              return
            }else{
              vm.user_month = val
              vm.user_init_fn(vm.user_month)
            }
          },
          user_init_fn(time){
            let vm = this
            vm.loading2 = true
            vm.user_name = []
            vm.user_count1 = []
            vm.user_count2= []
            vm.user_count3 = []
            vm.user_count4 = []
            vm.$axios.request("post","flow/averageFlow",{year:time,cartype:'3'},function(data){
              let svg = ''
              for(let i= 0;i<data.result.length;i++){
                svg = data.result[i].flow/data.result[i].count
                vm.user_name.push(data.result[i].month + '月')
                vm.user_count1.push(svg.toFixed(2))
              }
              vm.$nextTick(function() {
                vm.loading2 = false
              })
              vm.netFlow_echarts2()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","flow/averageFlow",{year:time,cartype:'1'},function(data){
              let svg = ''
               for(let i= 0;i<data.result.length;i++){
                 svg = data.result[i].flow/data.result[i].count
                 vm.user_count2.push(svg.toFixed(2))
               }
              vm.netFlow_echarts2()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","flow/averageFlow",{year:time,cartype:'2'},function(data){
              let svg = ''
              for(let i= 0;i<data.result.length;i++){
                svg = data.result[i].flow/data.result[i].count
                vm.user_count3.push(svg.toFixed(2))

              }
              vm.netFlow_echarts2()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","flow/averageFlow",{year:time,cartype:'4'},function(data){
              let svg = ''
              for(let i= 0;i<data.result.length;i++){
                svg = data.result[i].flow/data.result[i].count
                vm.user_count4.push(svg.toFixed(2))
              }
              vm.netFlow_echarts2()
            },function(err){
              console.log(err);
            })
          },

          //中国学生各年级月人均计费流量
          netFlow_echarts3(){
            let option = {
              color: ['#3398DB','#0BDBD8'],
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

            this.netFlow_echarts_3.setOption(option)
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
            vm.loading3 = true
            vm.NJ_name = []
            vm.NJ_count = []
            vm.NJ_count1 = []
            vm.$axios.request("post","flow/gradeTop5",{date:time},function(data){
              for(let i= 0;i<data.result.length;i++){
                vm.NJ_name.push(data.result[i].sj + '级')
                vm.NJ_count.push(data.result[i].count)
              }
              for(let i= 0;i<data.result1.length;i++){
                vm.NJ_count1.push(data.result1[i].count)
              }
              vm.$nextTick(function() {
                vm.loading3 = false
              })
              vm.netFlow_echarts3()
            },function(err){
              console.log(err);
            })
          },

          //中国学生各学院月人均计费流量
          netFlow_echarts4(){
            let option = {
              color: ['#3398DB','#0BDBD8'],
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
            this.netFlow_echarts_4.setOption(option)
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
            vm.loading4 = true
            vm.C_M_name = []
            vm.C_M_count = []
            vm.$axios.request("post","flow/localStuAcademyFlow",{date:time},function(data){
              for(let i= 0;i<data.result.length;i++){
                vm.C_M_name.push(data.result[i].academy)
                vm.C_M_count.push(data.result[i].count)
              }
              vm.$nextTick(function() {
                vm.loading4 = false
              })
              vm.netFlow_echarts4()
            },function(err){
              console.log(err);
            })
          },

          //中国学生各省份月人均计费流量top5
          netFlow_echarts5(){
            let option = {
              color: ['#A0DB0D'],
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
            this.netFlow_echarts_5.setOption(option)
          },
          SF_month_change(val){
            let vm = this
            if(val == undefined){
              return
            }else{
              vm.SF_month = val
              vm.SF_init_fn(vm.SF_month)
            }
          },
          SF_init_fn(time){
            let vm = this
            vm.loading5 = true
            vm.SF_name = []
            vm.SF_count = []
            vm.$axios.request("post","flow/provinceTop5",{date:time},function(data){
              for(let i= data.result.length-1; i>=0; i--){
                vm.SF_name.push(data.result[i].province)
                vm.SF_count.push(data.result[i].count)
              }
              vm.$nextTick(function() {
                vm.loading5 = false
              })
              vm.netFlow_echarts5()
            },function(err){
              console.log(err);
            })
          },

          //国际学生各国月人均计费流量top5
          netFlow_echarts6(){
            let option = {
              color: ['#DBB507'],
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
            this.netFlow_echarts_6.setOption(option)
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
            vm.loading6 = true
            vm.GJ_name = []
            vm.GJ_count = []
            vm.$axios.request("post","flow/countryTop5",{date:time},function(data){
              for(let i= data.result.length-1; i>=0; i--){
                vm.GJ_name.push(data.result[i].country)
                vm.GJ_count.push(data.result[i].count)
              }
              vm.$nextTick(function() {
                vm.loading6 = false
              })
              vm.netFlow_echarts6()
            },function(err){
              console.log(err);
            })
          },
        },
        mounted () {
          this.$echarts.registerTheme('customed', this.$store.state.echartsData);
          this.netFlow_echarts_1 = this.$echarts.init(document.getElementById("netFlow_echarts_1"), 'customed');
          this.netFlow_echarts_2 = this.$echarts.init(document.getElementById("netFlow_echarts_2"), 'customed');
          this.netFlow_echarts_3 = this.$echarts.init(document.getElementById("netFlow_echarts_3"), 'customed');
          this.netFlow_echarts_4 = this.$echarts.init(document.getElementById("netFlow_echarts_4"), 'customed');
          this.netFlow_echarts_5 = this.$echarts.init(document.getElementById("netFlow_echarts_5"), 'customed');
          this.netFlow_echarts_6 = this.$echarts.init(document.getElementById("netFlow_echarts_6"), 'customed');

        },
      created(){
        window.scrollTo(0,0);
        let vm = this;
        vm.make_time()
        vm.netFlow_init_fn(vm.netFlow_time,vm.person_flag)
        vm.user_init_fn(vm.user_month)
        vm.NJ_init_fn(vm.NJ_month)
        vm.school_init_fn(vm.school_month)
        vm.SF_init_fn(vm.SF_month)
        vm.GJ_init_fn(vm.GJ_month)

      }
    }
</script>
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


