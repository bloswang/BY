<template>
    <div class="w">
      <el-breadcrumb separator=">" class="navigation">
        <el-breadcrumb-item :to="{ path: '/home/safety' }">上网行为</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/status' }">上网人数分析</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row type="flex" justify="space-around">
        <el-col :span="24"
                v-loading.body="loading"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg">
          <h5 class="ec_h5">
            上网人数趋势&nbsp;&nbsp;(单位:人)
            <div class="ec_h5_data">
              <el-date-picker
                size="mini"
                class="select_width"
                v-model="surf_time"
                type="year"
                format="yyyy"
                @change="surf_time_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="Internet_users_echarts_1">
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="12"
                v-loading.body="loading2"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg">
          <h5 class="ec_h5">
            人员类别&nbsp;&nbsp;(单位:人)
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="start2_time"
                type="date"
                format="yyyy-MM-dd"
                @change="start2_time_change"
                placeholder="选择时间">
              </el-date-picker>
              至
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="end2_time"
                type="date"
                format="yyyy-MM-dd"
                @change="end2_time_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="Internet_users_echarts_2">
          </div>
        </el-col>
        <el-col :span="12"
                v-loading.body="loading3"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg">
          <h5 class="ec_h5">
            教师上网年龄分布&nbsp;&nbsp;(单位:人)
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="start3_time"
                type="date"
                format="yyyy-MM-dd"
                @change="start3_time_change"
                placeholder="选择时间">
              </el-date-picker>
              至
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="end3_time"
                type="date"
                format="yyyy-MM-dd"
                @change="end3_time_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="Internet_users_echarts_3">
          </div>
        </el-col>
      </el-row>
      <!--性别类别-->
      <el-row type="flex" justify="space-around">
        <el-col :span="24"
                v-loading.body="loading4"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg">
          <h5 class="ec_h5">
            性别类别&nbsp;&nbsp;(单位:人)
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="start4_time"
                type="date"
                format="yyyy-MM-dd"
                @change="start4_time_change"
                placeholder="选择时间">
              </el-date-picker>
              至
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="end4_time"
                type="date"
                format="yyyy-MM-dd"
                @change="end4_time_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="Internet_users_echarts_4">
          </div>
        </el-col>
      </el-row>
      <!--省份列表-->
      <el-row type="flex" justify="space-around" >
        <el-col :span="12"
                v-loading.body="loading5"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg">
          <h5 class="ec_h5">
            国别比例TOP5&nbsp;&nbsp;(单位:人)
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="start5_time"
                type="date"
                format="yyyy-MM-dd"
                @change="start5_time_change"
                placeholder="选择时间">
              </el-date-picker>
              至
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="end5_time"
                type="date"
                format="yyyy-MM-dd"
                @change="end5_time_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="Internet_users_echarts_5">
          </div>
        </el-col>
        <el-col :span="12"
                v-loading.body="loading6"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg" style="padding-bottom: 50px">
          <h5 class="ec_h5">
            省份比例TOP5&nbsp;&nbsp;(单位:人)
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="start6_time"
                type="date"
                format="yyyy-MM-dd"
                @change="start6_time_change"
                placeholder="选择时间">
              </el-date-picker>
              至
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="end6_time"
                type="date"
                format="yyyy-MM-dd"
                @change="end6_time_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="Internet_users_echarts_6">
          </div>

        </el-col>
      </el-row>
      <!--中国学生各个套餐人数-->
      <el-row type="flex" justify="space-around" >
        <el-col :span="24"
                v-loading.body="loading7"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg" style="padding-bottom: 50px">
          <h5 class="ec_h5">
            中国学生各个套餐人数&nbsp;&nbsp;(单位:人)
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="echarts7_time"
                type="year"
                format="yyyy"
                @change="echarts7_time_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="Internet_users_echarts_7">
          </div>
        </el-col>
      </el-row>
      <!--国际学生各个套餐人数-->
      <el-row type="flex" justify="space-around" >
        <el-col :span="24"
                v-loading.body="loading8"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg" style="padding-bottom: 50px">
          <h5 class="ec_h5">
           国际学生各个套餐人数&nbsp;&nbsp;(单位:人)
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="echarts8_time"
                type="year"
                format="yyyy"
                @change="echarts8_time_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="Internet_users_echarts_8">
          </div>
        </el-col>
      </el-row>
      <!--流量段内上网人数分析-->
      <el-row type="flex" justify="space-around" >
        <el-col :span="24"
                v-loading.body="loading9"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg" style="padding-bottom: 50px">
          <h5 class="ec_h5">
            流量段内上网人数分析&nbsp;&nbsp;(单位:人)
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="echarts9_time"
                type="year"
                format="yyyy"
                @change="echarts9_time_change"
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
          <div class="ec_height" id="Internet_users_echarts_9">
          </div>
        </el-col>
      </el-row>
      <!--中国学生各学院上网人数-->
      <el-row type="flex" justify="space-around">
        <el-col :span="24"
                v-loading.body="loading10"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg">
          <h5 class="ec_h5">
            中国学生各学院上网人数&nbsp;&nbsp;(单位:人)
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="start10_time"
                type="date"
                format="yyyy-MM-dd"
                @change="start10_time_change"
                placeholder="选择时间">
              </el-date-picker>
              至
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="end10_time"
                type="date"
                format="yyyy-MM-dd"
                @change="end10_time_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="Internet_users_echarts_10">
          </div>
        </el-col>
      </el-row>
      <!--中国学生各年级上网人数-->
      <el-row type="flex" justify="space-around">
        <el-col :span="24"
                v-loading.body="loading11"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading"
                class="ec_bg">
          <h5 class="ec_h5">
            中国学生各年级上网人数&nbsp;&nbsp;(单位:人)
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="start11_time"
                type="date"
                format="yyyy-MM-dd"
                @change="start11_time_change"
                placeholder="选择时间">
              </el-date-picker>
              至
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="end11_time"
                type="date"
                format="yyyy-MM-dd"
                @change="end11_time_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="Internet_users_echarts_11">
          </div>
        </el-col>
      </el-row>
    </div>
</template>
<script>
    /**
     * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
     * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
     * import loginButton from './components/loginButton.vue';
     */
    import time from "../../config/timeFormat.js"
    export default{
        data () {
            return {
              msg: '上网行为',
              teachingTeam_time:"",
              //上网人数趋势
              loading:true,
              surf_time:'2017',
              SW_people_time:[],
              SW_people_sum:[],
              SW_people_num:[],
              SW_people_num2:[],
              SW_people_num3:[],
              SW_people_num4:[],

              //人员类别
              loading2:true,
              start2_time:'2017-01-01',
              end2_time:'2018-01-01',
              people_type:[],
              people_count:[],

              //年龄比例
              loading3:true,
              start3_time:'2017-01-01',
              end3_time:'2018-01-01',
              age_type:[],
              age_count:[],
              age_count1:[],

              //性别
              loading4:true,
              start4_time:'2017-01-01',
              end4_time:'2018-01-01',
              sex_type:[],
              sum_boy_count:[],
              sum_girl_count:[],
              user_boy_count:[],
              user_girl_count:[],

              //国别TOP5
              loading5:true,
              Internet_users_echarts_5:'',
              start5_time:'2017-01-01',
              end5_time:'2018-01-01',
              country:[],
              country_count:[],
              country_count1:[],

              //省份列表
              loading6:true,
              Internet_users_echarts_6:'',
              start6_time:'2017-01-01',
              end6_time:'2018-01-01',
              SF_type:[],
              SF_count:[],
              SF_count1:[],

              //中国学生套餐使用情况
              loading7:true,
              Internet_users_echarts_7:'',
              echarts7_time:'2017',
              ZG_time:[],
              ZG_count1:[],
              ZG_count2:[],
              ZG_count3:[],
              ZG_count4:[],
              ZG_count5:[],

              //国际学生套餐使用情况
              loading8:true,
              Internet_users_echarts_8:'',
              echarts8_time:'2017',
              GJ_time:[],
              GJ_count1:[],
              GJ_count2:[],
              GJ_count3:[],
              GJ_count4:[],
              GJ_count5:[],

              //流量段内上网人数分析
              loading9:true,
              Internet_users_echarts_9:'',
              echarts9_time:'2017',
              person_type: '中国学生',
              type_code:'1',
              person_list: ['中国学生','国际学生','教师','临时人员'],
              LL_time:[],
              LL_count1:[],
              LL_count2:[],
              LL_count3:[],
              LL_count4:[],
              LL_count5:[],
              LL_count6:[],

              //中国学生各学院上网人数
              loading10:true,
              Internet_users_echarts_10:'',
              start10_time:'2017-01-01',
              end10_time:'2018-01-01',
              school_name:[],
              school_count:[],

              //中国学生各学院上网人数
              loading11:true,
              Internet_users_echarts_11:'',
              start11_time:'2017-01-01',
              end11_time:'2018-01-01',
              NJ_name:[],
              NJ_count:[],
              NJ_count1:[],
            }
        },
        components: {},
        methods: {
          make_time(){
              let vm  = this
              vm.surf_time = time.year
              vm.start2_time= time.year +'-'+'01'+'-'+'01';
              vm.end2_time= time.year +'-'+time.month+'-'+ time.day;
              vm.start3_time= time.year +'-'+'01'+'-'+'01';
              vm.end3_time= time.year +'-'+time.month+'-'+ time.day;
              vm.start4_time= time.year +'-'+'01'+'-'+'01';
              vm.end4_time= time.year +'-'+time.month+'-'+ time.day;
              vm.start5_time= time.year +'-'+'01'+'-'+'01';
              vm.end5_time= time.year +'-'+time.month+'-'+ time.day;
              vm.start6_time= time.year +'-'+'01'+'-'+'01';
              vm.end6_time= time.year +'-'+time.month+'-'+ time.day;
              vm.echarts7_time= time.year
              vm.echarts8_time= time.year
              vm.echarts9_time= time.year
              vm.start10_time= time.year +'-'+'01'+'-'+'01';
              vm.end10_time= time.year +'-'+time.month+'-'+ time.day;
              vm.start11_time= time.year +'-'+'01'+'-'+'01';
              vm.end11_time= time.year +'-'+time.month+'-'+ time.day;
          },
          //上网人数趋势相关函数
          echarts1(){
            let Internet_users_echarts_1 = this.$echarts.init(document.getElementById("Internet_users_echarts_1"), 'customed');
            let option = {
              /*title: {
                text: '单位(万元)',
                textStyle: {
                  fontSize: 12,
                },
                left:'90%',
                top:'5%'
              },*/
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data:['总人数','教师','中国学生','国际学生','其他人员']
              },
              xAxis:  {
                type: 'category',
                  boundaryGap: false,
                  data: this.SW_people_time
              },
              yAxis: {
                type: 'value',
                  axisLabel: {
                  formatter: '{value}'
                }
              },
              series: [
                {
                  name:'总人数',
                  type:'line',
                  data:this.SW_people_sum,
                },
                {
                  name:'教师',
                  type:'line',
                  data:this.SW_people_num,
                },
                {
                  name:'中国学生',
                  type:'line',
                  data:this.SW_people_num2,
                },
                {
                  name:'国际学生',
                  type:'line',
                  data:this.SW_people_num3,
                },
                {
                  name:'其他人员',
                  type:'line',
                  data:this.SW_people_num4,
                }
              ],
            };
            Internet_users_echarts_1.setOption(option)
          },
          //时间变化时
          surf_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else{
              vm.surf_time = val
              vm.surf_fn(vm.surf_time)
            }

          },
          surf_fn(time){
            let vm = this
            vm.loading= true
            //上网人数趋势
            vm.$axios.request("post","number/personTrend",{date:time,flag:'1'},function(data){
              vm.SW_people_time = []
              vm.SW_people_sum = []
              for(let i= 0;i<data.result.length;i++){
                vm.SW_people_time.push(data.result[i].month+'月')
                vm.SW_people_sum.push(data.result[i].count)
              }
              vm.$nextTick(function() {
                vm.loading= false
              })
              vm.echarts1()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/personTrend",{date:time,cardtype:'3',flag:'0'},function(data){
              vm.SW_people_num = []
              for(let i= 0;i<data.result.length;i++){
                vm.SW_people_num.push(data.result[i].count)
              }
              vm.echarts1()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/personTrend",{date:time,cardtype:'1',flag:'0'},function(data){
              vm.SW_people_num2 = []
              for(let i= 0;i<data.result.length;i++){
                vm.SW_people_num2.push(data.result[i].count)
              }
              vm.echarts1()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/personTrend",{date:time,cardtype:'2',flag:'0'},function(data){
              vm.SW_people_num3 = []
              for(let i= 0;i<data.result.length;i++){
                vm.SW_people_num3.push(data.result[i].count)
              }
              vm.echarts1()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/personTrend1",{date:time,cardtype:'4'},function(data){
              vm.SW_people_num4 = []
              for(let i= 0;i<data.result.length;i++){
                vm.SW_people_num4.push(data.result[i].count)
              }
              vm.echarts1()
            },function(err){
              console.log(err);
            })
          },

          //人员类别相关函数
          echarts2(){
            let Internet_users_echarts_2 = this.$echarts.init(document.getElementById("Internet_users_echarts_2"), 'customed');
            let option = {
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                left: 'center',
                data: this.people_type
              },
              series : [
                {
                  name: '人员类别分布',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:this.people_count,
                  label: {
                    normal: {
                      formatter: "{b} : {c}人 ({d}%)"
                    }
                  },
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            };
            Internet_users_echarts_2.setOption(option)
          },
          start2_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val >this.end2_time){
              if(this.end2_time!==''){
                this.$message.error('开始时间不能大于结束时间哦！');
                this.start2_time = ''
                return
              }else{
                this.start2_time = val
              }
            }else{
              vm.start2_time = val
              vm.chart2_init(vm.start2_time,vm.end2_time)
            }

          },
          end2_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val<this.start2_time){
              this.$message.error('结束时间不能小于开始时间哦！');
              this.end2_time = ''
              return
            }else{
              vm.end2_time = val
              vm.chart2_init(vm.start2_time,vm.end2_time)
            }

          },
          chart2_init(start,end){
            let vm = this
            vm.loading2= true
            //人员类别
            vm.$axios.request("post","number/personGenre",{startDate:start,endDate:end,flag:'1'},function(data){
              vm.people_type = []
              vm.people_count = []
              for(let i= 0;i<data.result.length;i++){
                if(data.result[i].type!=='其他人员'){
                  vm.people_type.push(data.result[i].type)
                  vm.people_count.push({name:data.result[i].type,value:data.result[i].count})
                }
              }
              vm.$nextTick(function() {
                vm.loading2= false
              })
              vm.echarts2()
            },function(err){
              console.log(err);
            })

            vm.$axios.request("post","number/personGenre1",{startDate:start,endDate:end},function(data){
              for(let i= 0;i<data.result.length;i++){
                vm.people_type.push(data.result[i].type)
                vm.people_count.push({name:data.result[i].type,value:data.result[i].count})
              }
              vm.echarts2()
            },function(err){
              console.log(err);
            })
          },

          //年龄类别相关函数
          echarts3(){
            let Internet_users_echarts_3 = this.$echarts.init(document.getElementById("Internet_users_echarts_3"), 'customed');
            let option = {
              legend: {
                data:['年龄段总人数','年龄段内上网人数']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
              },
              tooltip: {
                show:"true",
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function(params) {
                  let per = params[0].value/params[1].value * 100
                  per = per.toFixed(2)
                  return  '总人数: ' + params[1].value +'人' + "<br/>"+"<br/>"+
                          '上网人数: '+ params[0].value +'人' + "<br/>"+"<br/>"+
                          '占比: '+ per+'%'+ "<br/>"+"<br/>"
                }
            },
              yAxis:  {
                type: 'value',
                axisTick : {show: false},
                axisLine: {
                  show: false,
                  lineStyle:{
                    color:'#984A59',
                  }
                },
                splitLine: {show:false},
                axisLabel: {
                  show: true,
                  interval: 'auto',
                  formatter: '{value}'
                },
              },
              xAxis: [
                {
                  type: 'category',
                  axisTick : {show: false},
                  axisLine: {
                    show: true,
                    lineStyle:{
                      color:'#984A59',
                    }
                  },
                  data: this.age_type
                },
                {
                  type: 'category',
                  axisLine: {show:false},
                  axisTick: {show:false},
                  axisLabel: {show:false},
                  splitArea: {show:false},
                  splitLine: {show:false},
                  data: this.age_type
                },

              ],
              series: [
                {
                  name: '年龄段总人数',
                  type: 'bar',
                  xAxisIndex:1,
                  itemStyle:{
                    normal: {
                      show: true,
                      color: '#D0D0D0',
                      borderWidth:0,
                      borderColor:'#FBFFB9',
                    }
                  },
                  barGap:'0%',
                  barCategoryGap:'50%',
                  data: this.age_count1
                },
                {
                  name: '年龄段内上网人数',
                  type: 'bar',
                  itemStyle:{
                    normal: {
                      show: true,
                      color: '#EC7357',
                      borderWidth:0,
                      borderColor:'#333',
                    }
                  },
                  barGap:'0%',
                  barCategoryGap:'50%',
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      textStyle: {
                        color: '#fff'
                      }
                    }
                  },
                  data: this.age_count
                }

              ]
            };
            Internet_users_echarts_3.setOption(option)
          },
          start3_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val >this.end3_time){
              if(this.end3_time!==''){
                this.$message.error('开始时间不能大于结束时间哦！');
                this.start3_time = ''
                return
              }else{
                this.start3_time = val
              }
            }else{
              vm.start3_time = val
              vm.chart3_init(vm.start3_time,vm.end3_time)
            }

          },
          end3_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val<this.start3_time){
              this.$message.error('结束时间不能小于开始时间哦！');
              this.end3_time = ''
              return
            }else{
              vm.end3_time = val
              vm.chart3_init(vm.start3_time,vm.end3_time)
            }

          },
          chart3_init(start,end){
            let vm = this
            vm.loading3= true
            //年龄类别
            vm.$axios.request("post","number/ageGenre",{startDate:start,endDate:end},function(data){
              vm.age_type = []
              vm.age_count =[]
              vm.age_count1 =[]
              for(let i= 0;i<data.specialtyList.length;i++){
                if(data.specialtyList[i].nl!='不使用'){
                  vm.age_type.push(data.specialtyList[i].nl)
                  vm.age_count.push(data.specialtyList[i].count)
                  vm.age_count1.push(data.specialtyList[i].count1)
                }
              }
              vm.$nextTick(function() {
                vm.loading3= false
              })
              vm.echarts3()
            },function(err){
              console.log(err);
            })
          },

          //性别比例相关函数
          echarts4(){
            let option = {
              legend: {
                top: 20,
                textStyle: {
                  color: '#fff',
                },
                data: ['男生上网人数', '女生上网人数']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
              },
              tooltip: {
                show: "true",
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function(params) {
                  let b = params[0].value/params[2].value * 100
                  b = b.toFixed(2)
                  let g = params[1].value/params[3].value * 100
                  g = g.toFixed(2)
                  return params[0].axisValue+" : "+"<br/>"+"<br/>"+
                    params[2].seriesName+ ' : ' + params[2].value +'人 ; ' + "<br/>" +"<br/>"+
                    params[0].seriesName + ' : ' + params[0].value +'人 ; ' + '占比: '+ b+'%'+ "<br/>"+"<br/>"+
                    params[3].seriesName+ ' : ' + params[3].value +'人 ; ' + "<br/>"  +"<br/>"+
                    params[1].seriesName + ' : ' + params[1].value +'人 ; ' + '占比: '+ g+'%'+ "<br/>"+"<br/>"

                }
              },
              yAxis: {
                type: 'value',
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#fff',
                  }
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: '#aaa',
                  }
                },
              },
              xAxis: [{
                type: 'category',
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#fff',
                  }
                },
                data: [ '教师','中国学生', '国际学生','其他人员']
              }, {
                type: 'category',
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: false
                },
                splitArea: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                data: ['教师','中国学生', '国际学生', '其他人员']
              },

              ],
              series: [
                {
                name: '男生总人数',
                type: 'bar',
                xAxisIndex: 1,
                itemStyle: {
                  normal: {
                    show: true,
                    color: '#CEC5C6',
                    borderWidth: 0,
                    borderColor: '#333',
                  }
                },
                barWidth: '20%',
                data: this.sum_boy_count
              },
                {
                name: '女生总人数',
                type: 'bar',
                xAxisIndex: 1,
                barWidth: '20%',
                itemStyle: {
                    normal: {
                      show: true,
                      color: '#CEC5C6',
                      borderWidth: 0,
                      borderColor: '#333',
                    }
                  },
                barGap: '100%',
                data: this.sum_girl_count
              },
                {
                name: '男生上网人数',
                type: 'bar',
                itemStyle: {
                  normal: {
                    show: true,
                    borderWidth: 0,
                    borderColor: '#333',
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: '#fff'
                    }
                  }
                },
                barWidth: '20%',
                data: this.user_boy_count
              },
                {
                name: '女生上网人数',
                type: 'bar',
                barWidth: '20%',
                itemStyle: {
                  normal: {
                    show: true,
                    borderWidth: 0,
                    borderColor: '#333',
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: '#fff'
                    }
                  }
                },
                barGap: '100%',
                data: this.user_girl_count
              }

              ]
            };
            this.Internet_users_echarts_4.setOption(option)
          },
          start4_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val >this.end4_time){
              if(this.end4_time!==''){
                this.$message.error('开始时间不能大于结束时间哦！');
                this.start4_time = ''
                return
              }else{
                this.start4_time = val
              }
            }else{
              vm.start4_time = val
              vm.chart4_init(vm.start4_time,vm.end4_time)
            }

          },
          end4_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val<this.start4_time){
              this.$message.error('结束时间不能小于开始时间哦！');
              this.end4_time = ''
              return
            }else{
              vm.end4_time = val
              vm.chart4_init(vm.start4_time,vm.end4_time)
            }

          },
          chart4_init(start,end){
            let vm = this
            vm.loading4= true
            vm.sum_boy_count=[]
            vm.sum_girl_count=[]
            vm.user_boy_count=[]
            vm.user_girl_count=[]
            //教师
            /*vm.$axios.request("post","number/sexGenre1",{startDate:start,endDate:end},function(data){
              for(let i= 0;i<data.boynet.length;i++){
                vm.user_boy_count.push(data.boynet[i].count)
              }
              for(let i= 0;i<data.boytotal.length;i++){
                vm.sum_boy_count.push(data.boytotal[i].count)
              }
              for(let i= 0;i<data.girlnet.length;i++){
                vm.user_girl_count.push(data.girlnet[i].count)
              }
              for(let i= 0;i<data.girltotal.length;i++){
                vm.sum_girl_count.push(data.girltotal[i].count)
              }
              vm.echarts4()
            },function(err){
              console.log(err);
            })*/
            //教师以外
            vm.$axios.request("post","number/sexGenre",{startDate:start,endDate:end},function(data){
              for(let i= 0;i<data.boynet.length;i++){
                vm.user_boy_count.push(data.boynet[i].count)
              }
              for(let i= 0;i<data.boytotal.length;i++){
                vm.sum_boy_count.push(data.boytotal[i].count)
              }
              for(let i= 0;i<data.girlnet.length;i++){
                vm.user_girl_count.push(data.girlnet[i].count)
              }
              for(let i= 0;i<data.girltotal.length;i++){
                vm.sum_girl_count.push(data.girltotal[i].count)
              }
              vm.$nextTick(function() {
                vm.loading4= false
              })
              vm.echarts4()
            },function(err){
              console.log(err);
            })
            //其他
            /*vm.$axios.request("post","number/sexGenre2",{startDate:start,endDate:end},function(data){
              for(let i= 0;i<data.boynet.length;i++){
                vm.user_boy_count.push(data.boynet[i].count)
              }
              for(let i= 0;i<data.boytotal.length;i++){
                vm.sum_boy_count.push(data.boytotal[i].count)
              }
              for(let i= 0;i<data.girlnet.length;i++){
                vm.user_girl_count.push(data.girlnet[i].count)
              }
              for(let i= 0;i<data.girltotal.length;i++){
                vm.sum_girl_count.push(data.girltotal[i].count)
              }
              vm.echarts4()
            },function(err){
              console.log(err);
            })*/
          },

          //国别比列相关函数
          echarts5(){
            let option = {
              legend: {
                top: 20,
                textStyle:{
                  color:'#fff',
                },
                data: ['总人数', '上网人数']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
              },

              tooltip: {
                show:"true",
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function(params) {
                  let per = params[0].value/params[1].value * 100
                  per = per.toFixed(2)
                  return  '总人数: ' + params[1].value +'人' + "<br/>"+"<br/>"+
                          '上网人数: '+ params[0].value +'人' + "<br/>"+"<br/>"+
                          '占比: '+ per+'%'+ "<br/>"+"<br/>"
                }
              },
              xAxis:  {
                type: 'value',
                axisTick : {show: false},
                axisLine: {
                  show: false,
                  lineStyle:{
                    color:'#fff',
                  }
                },
                splitLine: {
                  show: false
                },
              },
              yAxis: [
                {
                  type: 'category',
                  axisTick : {show: false},
                  axisLine: {
                    show: true,
                    lineStyle:{
                      color:'#fff',
                    }
                  },
                  data: this.country
                },
                {
                  type: 'category',
                  axisLine: {show:false},
                  axisTick: {show:false},
                  axisLabel: {show:false},
                  splitArea: {show:false},
                  splitLine: {show:false},
                  data: this.country
                },

              ],
              series: [
                {
                  name: '总人数',
                  type: 'bar',
                  yAxisIndex:1,

                  itemStyle:{
                    normal: {
                      show: true,
                      color: '#BEC2CE',
                      borderWidth:0,
                      borderColor:'#333',
                    }
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'right',
                      textStyle: {
                        color: '#fff'
                      }
                    }
                  },
                  barGap:'0%',
                  barCategoryGap:'50%',
                  data: this.country_count1
                },
                {
                  name: '上网人数',
                  type: 'bar',
                  itemStyle:{
                    normal: {
                      show: true,
                      color: '#47ACAA',
                      borderWidth:0,
                      borderColor:'#333',
                    }
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'right',
                      textStyle: {
                        color: '#fff'
                      }
                    }
                  },
                  barGap:'0%',
                  barCategoryGap:'50%',
                  data: this.country_count
                }

              ]
            };
            this.Internet_users_echarts_5.setOption(option)
          },
          start5_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val >this.end5_time){
              if(this.end5_time!==''){
                this.$message.error('开始时间不能大于结束时间哦！');
                this.start5_time = ''
                return
              }else{
                this.start5_time = val
              }
            }else{
              vm.start5_time = val
              vm.chart5_init(vm.start5_time,vm.end5_time)
            }

          },
          end5_time_change(val){
            let vm = this

            if(val == undefined){
              return
            }else if(val<this.start5_time){
              this.$message.error('结束时间不能小于开始时间哦！');
              this.end5_time = ''
              return
            }else{
              vm.end5_time = val
              vm.chart5_init(vm.start5_time,vm.end5_time)
            }

          },
          chart5_init(start,end){
            let vm = this
            vm.loading5= true
            //国别比例
            vm.$axios.request("post","number/countryTop5",{startDate:start,endDate:end},function(data){
              vm.country =[]
              vm.country_count = []
              vm.country_count1 = []
              for(let i = data.specialtyList.length-1 ; i >= 0; i--){
                vm.country.push(data.specialtyList[i].gj)
                vm.country_count.push(data.specialtyList[i].count)
                vm.country_count1.push(data.specialtyList[i].count1)
              }
              vm.$nextTick(function() {
                vm.loading5= false
              })
              vm.echarts5()
            },function(err){
              console.log(err);
            })
          },

          //省份比列相关函数
          echarts6(){
            let option = {
              legend: {
                top: 20,
                textStyle:{
                  color:'#fff',
                },
                data: ['省份总人数','省份上网人数']
              },
              grid: {
                left: '13%',
                right: '4%',
                bottom: '10%',
                containLabel: true
              },

              tooltip: {
                show:"true",
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function(params) {
                  let per = params[0].value/params[1].value * 100
                  per = per.toFixed(2)
                  return  '省份总人数: ' + params[1].value +'人' + "<br/>"+"<br/>"+
                    '省份上网人数: '+ params[0].value +'人' + "<br/>"+"<br/>"+
                    '占比: '+ per+'%'+ "<br/>"+"<br/>"
                }
              },
              xAxis:  {
                type: 'value',
                axisTick : {show: false},
                axisLine: {
                  show: false,
                  lineStyle:{
                    color:'#fff',
                  }
                },
                splitLine: {
                  show: false
                },
              },
              yAxis: [
                {
                  type: 'category',
                  axisTick : {show: false},
                  axisLine: {
                    show: true,
                    lineStyle:{
                      color:'#fff',
                    }
                  },
                  data: this.SF_type
                },
                {
                  type: 'category',
                  axisLine: {show:false},
                  axisTick: {show:false},
                  axisLabel: {show:false},
                  splitArea: {show:false},
                  splitLine: {show:false},
                  data: this.SF_type
                },

              ],
              series: [
                {
                  name: '省份总人数',
                  type: 'bar',
                  yAxisIndex:1,

                  itemStyle:{
                    normal: {
                      show: true,
                      color: '#BEC2CE',
                      borderWidth:0,
                      borderColor:'#333',
                    }
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'right',
                      textStyle: {
                        color: '#fff'
                      }
                    }
                  },
                  barGap:'0%',
                  barCategoryGap:'50%',
                  data: this.SF_count1
                },
                {
                  name: '省份上网人数',
                  type: 'bar',
                  itemStyle:{
                    normal: {
                      show: true,
                      color: '#0E65AC',
                      borderWidth:0,
                      borderColor:'#333',
                    }
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'right',
                      textStyle: {
                        color: '#fff'
                      }
                    }
                  },
                  barGap:'0%',
                  barCategoryGap:'50%',
                  data: this.SF_count
                }

              ]
            };
            this.Internet_users_echarts_6.setOption(option)
          },
          //接口调用函数
          start6_time_change(val){
            let vm = this

            if(val == undefined){
              return
            }else if(val >this.end6_time){
              if(this.end6_time!==''){
                this.$message.error('开始时间不能大于结束时间哦！');
                this.start6_time = ''
                return
              }else{
                this.start6_time = val
              }
            }else{
              vm.start6_time = val
              vm.chart6_init(vm.start6_time,vm.end6_time)
            }

          },
          end6_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val<this.start6_time){
              this.$message.error('结束时间不能小于开始时间哦！');
              this.end6_time = ''
              return
            }else{
              vm.end6_time = val
              vm.chart6_init(vm.start6_time,vm.end6_time)
            }

          },
          chart6_init(start,end){
            let vm = this
            vm.loading6= true
            //省份列表
            vm.$axios.request("post","number/provincePerson",{startDate:start,endDate:end},function(data){
              vm.SF_type = []
              vm.SF_count = []
              vm.SF_count1 = []
              for(let i = data.specialtyList.length-1 ;i>=0;i--){
                vm.SF_type.push(data.specialtyList[i].sf)
                vm.SF_count.push(data.specialtyList[i].count)
                vm.SF_count1.push(data.specialtyList[i].count1)
              }
              vm.$nextTick(function() {
                vm.loading6= false
              })
              vm.echarts6()
            },function(err){
              console.log(err);
            })
          },

          //中国学生各个套餐人数
          echarts7(){
            let option = {
              color: ["#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#37A2DA", "#32C5E9", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"],
              tooltip: {
                trigger: 'axis',
              },
              toolbox: {
                show : true,
                feature : {
                  dataView : {show: true, readOnly: false},
                  magicType : {show: true, type: ['line', 'bar']},
                  restore : {show: true},
                  saveAsImage : {show: true}
                }
              },
              legend: {
                data: ['0.002元/Mb','10元套餐','20元套餐','30元套餐','40元套餐']
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.ZG_time
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                name:'0.002元/Mb',
                type: 'line',
                smooth: true,
                stack: '总量',
                symbol: 'circle',
                areaStyle: {
                  normal: {
                    opacity: "0.1",
                  }
                },
                data:this.ZG_count1
              }, {
                name:'10元套餐',
                type: 'line',
                smooth: true,
                stack: '总量2',
                symbol: 'circle',
                areaStyle: {
                  normal: {
                    opacity: "0.1",
                  }
                },
                data: this.ZG_count2
              }, {
                name:'20元套餐',
                type: 'line',
                smooth: true,
                stack: '总量3',
                symbol: 'circle',
                areaStyle: {
                  normal: {
                    opacity: "0.1",
                  }
                },
                data: this.ZG_count3
              }, {
                name:'30元套餐',
                type: 'line',
                smooth: true,
                stack: '总量4',
                symbol: 'circle',
                areaStyle: {
                  normal: {
                    opacity: "0.1",
                  }
                },
                data:this.ZG_count4
              }, {
                name:'40元套餐',
                type: 'line',
                smooth: true,
                stack: '总量5',
                symbol: 'circle',
                areaStyle: {
                  normal: {
                    opacity: "0.1",
                  }
                },
                data:this.ZG_count5
              }]
            };
            this.Internet_users_echarts_7.setOption(option)
          },
          echarts7_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else{
              this.echarts7_time = val
              vm.chart7_init(vm.echarts7_time)
            }
          },
          chart7_init(year){
            let vm = this
            vm.loading7= true
            vm.ZG_time = []
            vm.ZG_count1 = []
            vm.ZG_count2 = []
            vm.ZG_count3 = []
            vm.ZG_count4 = []
            vm.ZG_count5 = []
            //中国学生各个套餐人数
            vm.$axios.request("post","number/packageUser",{year:year,type:'0.002元/Mb',flag:'1'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.ZG_time.push(data.result[i].month + '月')
                vm.ZG_count1.push(data.result[i].count)
              }
              vm.$nextTick(function() {
                vm.loading7= false
              })
              vm.echarts7()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/packageUser",{year:year,type:'10元15G',flag:'2'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.ZG_count2.push(data.result[i].count)
              }
              vm.echarts7()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/packageUser",{year:year,type:'20元35G',flag:'3'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.ZG_count3.push(data.result[i].count)
              }
              vm.echarts7()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/packageUser",{year:year,type:'30元55G',flag:'4'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.ZG_count4.push(data.result[i].count)
              }
              vm.echarts7()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/packageUser",{year:year,type:'40元80G',flag:'5'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.ZG_count5.push(data.result[i].count)
              }
              vm.echarts7()
            },function(err){
              console.log(err);
            })

          },

          //国际学生各个套餐人数
          echarts8(){
            let option = {
              color: ["#32C5E9",  "#fb7293", "#e7bcf3", "#FFDB5C", "#ff9f7f", "#fb7293", "#37A2DA", "#E062AE",  "#9d96f5", "#8378EA", "#96BFFF"],
              tooltip: {
                trigger: 'axis',
              },
              toolbox: {
                show : true,
                feature : {
                  dataView : {show: true, readOnly: false},
                  magicType : {show: true, type: ['line', 'bar']},
                  restore : {show: true},
                  saveAsImage : {show: true}
                }
              },
              legend: {
                data: ['1天餐套','15天餐套','30天餐套','60元餐套','300元餐套']
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.GJ_time
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                name:'1天餐套',
                type: 'line',
                smooth: true,
                stack: '总量',
                symbol: 'circle',
                areaStyle: {
                  normal: {
                    opacity: "0.1",
                  }
                },
                data: this.GJ_count1
              }, {
                name:'15天餐套',
                type: 'line',
                smooth: true,
                stack: '总量2',
                symbol: 'circle',
                areaStyle: {
                  normal: {
                    opacity: "0.1",
                  }
                },
                data: this.GJ_count2
              },{
                name:'30天餐套',
                type: 'line',
                smooth: true,
                stack: '总量3',
                symbol: 'circle',
                areaStyle: {
                  normal: {
                    opacity: "0.1",
                  }
                },
                data: this.GJ_count3
              },{
                name:'60元餐套',
                type: 'line',
                smooth: true,
                stack: '总量4',
                symbol: 'circle',
                areaStyle: {
                  normal: {
                    opacity: "0.1",
                  }
                },
                data: this.GJ_count4
              }, {
                name:'300元餐套',
                type: 'line',
                smooth: true,
                stack: '总量5',
                symbol: 'circle',
                areaStyle: {
                  normal: {
                    opacity: "0.1",
                  }
                },
                data: this.GJ_count5
              }]
            };
            this.Internet_users_echarts_8.setOption(option)
          },
          echarts8_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else{
              this.echarts8_time = val
              vm.chart8_init(vm.echarts8_time)
            }

          },
          chart8_init(year){
            //国际学生各个套餐人数
            let vm = this
            vm.loading8= true
            vm.GJ_time = []
            vm.GJ_count1 = []
            vm.GJ_count2 = []
            vm.GJ_count3 = []
            vm.GJ_count4 = []
            vm.GJ_count5 = []
            //国际学生各个套餐人数
            vm.$axios.request("post","number/packageForeignin",{year:year,type:'国际学生5/元包天',flag:'1'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.GJ_time.push(data.result[i].month+ '月')
                vm.GJ_count1.push(data.result[i].count)
              }
              vm.$nextTick(function() {
                vm.loading8= false
              })
              vm.echarts8()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/packageForeignin",{year:year,type:'国际学生50元/15天',flag:'2'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.GJ_count2.push(data.result[i].count)
              }
              vm.echarts8()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/packageForeignin",{year:year,type:'国际学生80元/30天',flag:'3'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.GJ_count3.push(data.result[i].count)
              }
              vm.echarts8()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/packageForeignin",{year:year,type:'国际学生60元/180小时',flag:'4'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.GJ_count4.push(data.result[i].count)
              }
              vm.echarts8()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/packageForeignin",{year:year,type:'300元/120天',flag:'5'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.GJ_count5.push(data.result[i].count)
              }
              vm.echarts8()
            },function(err){
              console.log(err);
            })
          },

          //流量段内上网人数分析
          echarts9(){
            let option = {
              color: ["#32C5E9","#9d96f5", "#9FE6B8","#E690D1", "#e7bcf3", "#FFDB5C", "#ff9f7f",  "#96BFFF"],
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              toolbox: {
                show : true,
                feature : {
                  dataView : {show: true, readOnly: false},
                  magicType : {show: true, type: ['line', 'bar']},
                  restore : {show: true},
                  saveAsImage : {show: true}
                }
              },
              legend: {
                data:['0-10G','10-20G','20-30G','30-40G','40-50G','50G以上']
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
                  data : this.LL_time
                }
              ],
              yAxis : [
                {
                  type : 'value'
                }
              ],
              series : [
                {
                  name:'0-10G',
                  type:'bar',
                  barWidth : 30,
                  stack: '上网流量',
                  data:this.LL_count1
                },
                {
                  name:'10-20G',
                  type:'bar',
                  stack: '上网流量',
                  barWidth : 30,
                  data:this.LL_count2
                },
                {
                  name:'20-30G',
                  type:'bar',
                  stack: '上网流量',
                  barWidth : 30,
                  data:this.LL_count3
                },
                {
                  name:'30-40G',
                  type:'bar',
                  stack: '上网流量',
                  barWidth : 30,
                  data:this.LL_count4
                },
                {
                  name:'40-50G',
                  type:'bar',
                  stack: '上网流量',
                  barWidth : 30,
                  data:this.LL_count5
                },
                {
                  name:'50G以上',
                  type:'bar',
                  stack: '上网流量',
                  barWidth : 20,
                  data:this.LL_count6
                }
              ]
            };
            this.Internet_users_echarts_9.setOption(option)
          },
          echarts9_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else{
              vm.echarts9_time = val
              vm.chart9_init(vm.echarts9_time,vm.type_code)
            }

          },
          person_type_change(val){
            let vm = this
            this.person_type = val
            if(val == '中国学生'){
              vm.type_code = '1'
            }else if(val == '国际学生'){
              vm.type_code = '2'
            }else if(val == '教师'){
              vm.type_code = '3'
            }else{
              vm.type_code = '4'
            }
            vm.chart9_init(vm.echarts9_time,vm.type_code)
          },
          chart9_init(year,type){
            let vm = this
            vm.loading9= true
            //流量段内上网人数分析
            vm.LL_time=[]
            vm.LL_count1=[]
            vm.LL_count2=[]
            vm.LL_count3=[]
            vm.LL_count4=[]
            vm.LL_count5=[]
            vm.LL_count6=[]
            vm.$axios.request("post","number/flowPerson",{year:year,cartype:type,flag:'1'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.LL_time.push(data.result[i].month+'月')
                vm.LL_count1.push(data.result[i].count)
              }
              vm.$nextTick(function() {
                vm.loading9= false
              })
              vm.echarts9()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/flowPerson",{year:year,cartype:type,flag:'2'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.LL_count2.push(data.result[i].count)
              }
              vm.echarts9()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/flowPerson",{year:year,cartype:type,flag:'3'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.LL_count3.push(data.result[i].count)
              }
              vm.echarts9()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/flowPerson",{year:year,cartype:type,flag:'4'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.LL_count4.push(data.result[i].count)
              }
              vm.echarts9()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/flowPerson",{year:year,cartype:type,flag:'5'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.LL_count5.push(data.result[i].count)
              }
              vm.echarts9()
            },function(err){
              console.log(err);
            })
            vm.$axios.request("post","number/flowPerson",{year:year,cartype:type,flag:'6'},function(data){
              for(let i = 0 ;i<data.result.length;i++){
                vm.LL_count6.push(data.result[i].count)
              }
              vm.echarts9()
            },function(err){
              console.log(err);
            })
          },

          //中国学生各学院上网人数
          echarts10(){
            let option = {
              color: ['#DB8C09'],
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
                  data : this.school_name,
                  axisTick: {
                    alignWithLabel: true
                  },
                  axisLabel: {
                    interval:0,
                    rotate:-30
                  },
                }
              ],
              yAxis : [
                {
                  type : 'value'
                }
              ],
              series : [
                {
                  name:'',
                  type:'bar',
                  barWidth: '30%',
                  data:this.school_count,
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
            this.Internet_users_echarts_10.setOption(option)
          },
          start10_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val >this.end10_time){
              if(this.end10_time!==''){
                this.$message.error('开始时间不能大于结束时间哦！');
                this.start10_time = ''
                return
              }else{
                this.start10_time = val
              }
            }else{
              vm.start10_time = val
              vm.chart10_init(vm.start10_time,vm.end10_time)
            }

          },
          end10_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val<this.start10_time){
              this.$message.error('结束时间不能小于开始时间哦！');
              this.end10_time = ''
              return
            }else{
              vm.end10_time = val
              vm.chart10_init(vm.start10_time,vm.end10_time)
            }

          },
          chart10_init(start,end){
            let vm = this
            vm.loading10= true
            vm.school_name = []
            vm.school_count = []
            vm.$axios.request("post","number/netPerson",{startDate:start,endDate:end},function(data){
              for(let i= 0;i<data.result.length;i++){
                if(data.result[i].academy!=null){
                  vm.school_name.push(data.result[i].academy)
                  vm.school_count.push(data.result[i].count)
                }

              }
              vm.$nextTick(function() {
                vm.loading10= false
              })
              vm.echarts10()
            },function(err){
              console.log(err);
            })
          },

          //12.中国学生各年级上网人数
          echarts11(){
            let option = {
              color: ['#0ECBDB','#47DB42'],
              legend: {
                data: ['本科生', '研究生']
              },
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
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
                  data:this.NJ_count,
                  label: {
                  normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: '#fff'
                    }
                  }
                },
                },
                {
                  name:'研究生',
                  type:'bar',
                  barWidth: '20%',
                  data:this.NJ_count1,
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
            this.Internet_users_echarts_11.setOption(option)
          },
          start11_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val >this.end11_time){
              if(this.end11_time!==''){
                this.$message.error('开始时间不能大于结束时间哦！');
                this.start11_time = ''
                return
              }else{
                this.start11_time = val
              }
            }else{
              vm.start11_time = val
              vm.chart11_init(vm.start11_time,vm.end11_time)
            }

          },
          end11_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val<this.start11_time){
              this.$message.error('结束时间不能小于开始时间哦！');
              this.end11_time = ''
              return
            }else{
              vm.end11_time = val
              vm.chart11_init(vm.start11_time,vm.end11_time)
            }

          },
          chart11_init(start,end){
            let vm = this
            vm.loading11= true
            vm.NJ_name = []
            vm.NJ_count = []
            vm.NJ_count1 = []
            vm.$axios.request("post","number/gradePerson",{startDate:start,endDate:end},function(data){
              for(let i = data.result.length-1; i>=0; i--){
                vm.NJ_name.push(data.result[i].nj+ '级')
                vm.NJ_count.push(data.result[i].count)
              }
              for(let i = data.result1.length-1; i>=0; i--){
                vm.NJ_count1.push(data.result1[i].count)
              }
              vm.$nextTick(function() {
                vm.loading11= false
              })
              vm.echarts11()
            },function(err){
              console.log(err);
            })
          },
        },
        mounted () {

          this.$echarts.registerTheme('customed', this.$store.state.echartsData);
          this.Internet_users_echarts_4 = this.$echarts.init(document.getElementById("Internet_users_echarts_4"), 'customed');
          this.Internet_users_echarts_5 = this.$echarts.init(document.getElementById("Internet_users_echarts_5"), 'customed');
          this.Internet_users_echarts_6 = this.$echarts.init(document.getElementById("Internet_users_echarts_6"), 'customed');
          this.Internet_users_echarts_7 = this.$echarts.init(document.getElementById("Internet_users_echarts_7"), 'customed');
          this.Internet_users_echarts_8 = this.$echarts.init(document.getElementById("Internet_users_echarts_8"), 'customed');
          this.Internet_users_echarts_9 = this.$echarts.init(document.getElementById("Internet_users_echarts_9"), 'customed');
          this.Internet_users_echarts_10 = this.$echarts.init(document.getElementById("Internet_users_echarts_10"), 'customed');
          this.Internet_users_echarts_11 = this.$echarts.init(document.getElementById("Internet_users_echarts_11"), 'customed');
          },
      created(){
        window.scrollTo(0,0);
        let vm = this;
        vm.make_time()
        //上网人数趋势
        vm.surf_fn(vm.surf_time)
        vm.chart2_init(vm.start2_time,vm.end2_time)
        vm.chart3_init(vm.start3_time,vm.end3_time)
        vm.chart4_init(vm.start4_time,vm.end4_time)
        vm.chart5_init(vm.start5_time,vm.end5_time)
        vm.chart6_init(vm.start6_time,vm.end6_time)
        vm.chart7_init(vm.echarts7_time)
        vm.chart8_init(vm.echarts8_time)
        vm.chart9_init(vm.echarts9_time,vm.type_code)
        vm.chart10_init(vm.start10_time,vm.end10_time)
        vm.chart11_init(vm.start11_time,vm.end11_time)

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

