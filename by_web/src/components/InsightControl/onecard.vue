<template>
    <div class="w">
      <el-breadcrumb separator=">" class="navigation">
        <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
        <el-breadcrumb-item>一卡通总体消费分析</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5 all_num">{{show_allYear}}年{{name}}消费:{{all_Money}}万元
            <div class="ec_h5_data" style="float: right;">
              <el-date-picker
                class="select_width"
                align="right"
                size='mini'
                format="yyyy"
                @change="all_change_year"
                v-model="all_select_year"
                type="year"
                placeholder="选择年">
              </el-date-picker>
            </div>
          </h5>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="8" class="ec_bg">
          <h5 class="ec_h5">
            总消费分布&nbsp;&nbsp;(单位:万元)
          </h5>
          <div class="ec_height" id="all_chart_title">
          </div>
        </el-col>
        <el-col :span="8" class="ec_bg">
          <h5 class="ec_h5">
            人员类别&nbsp;&nbsp;(单位:万元)
          </h5>
          <div class="ec_height" id="all_person_type">
          </div>
        </el-col>
        <el-col :span="8" class="ec_bg">
          <h5 class="ec_h5">
            国别分布TOP10&nbsp;&nbsp;(单位:万元)
          </h5>
          <div class="ec_height" id="all_distribution">
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="4" class="ec_bg btn btn_to" v-for="(item,index) in luYou_List" key="index">
          <div :class="{'active_menu':index == keyCode}">
            <router-link :to='"/home/control/"+item.value'>
              <img :src='"../../assets/img/btn"+(index+1)+".png"' alt="" class="btn_to">
            </router-link>
            <h5 class="btn_text">{{item.name}}</h5>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg">
            <div style=" width:50%; margin:0 auto;text-align: center;">
              <el-radio-group v-model="flag_name" @change="flag_change">
                <el-radio-button label="查看年消费"></el-radio-button>
                <el-radio-button label="查看月消费"></el-radio-button>
                <el-radio-button label="查看日消费"></el-radio-button>
              </el-radio-group>
            </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around" style="margin-top: -10px" v-show="year_flag">
        <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5">
            一卡通总体消费趋势&nbsp;&nbsp;(单位:万元)
          </h5>
          <div class="ec_height" id="oneCard_max">
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" style="margin-top: -10px" v-show="year_flag">
        <el-col :span="24" class="ec_bg" style="padding-bottom: 50px">
          <div class="tab_warPer">
            <div  class="tab_F">
              <table v-for="list in countryList" class="table_C">
                <tr>
                  <td class="black">{{list.name}}</td>
                </tr>
                <tr>
                  <td>{{list.value}}</td>
                </tr>
              </table>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around" style="margin-top: -10px" v-show="month_flag">
        <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5" >
            月消费分布&nbsp;&nbsp;(单位:万元)
            <div class="ec_h5_data" style="float: right; margin-left: 20px">
              <el-date-picker
                class="select_width"
                align="right"
                size='mini'
                format="yyyy"
                @change="year_data_change"
                v-model="year_data"
                type="year"
                placeholder="选择年">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="oneCard_month">
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" style="margin-top: -10px" v-show="month_flag">
        <el-col :span="24" class="ec_bg" style="padding-bottom: 50px">
          <div class="tab_warPer">
            <div class="tab_F">
              <table v-for="list in yearList" class="table_C">
                <tr>
                  <td class="black">{{list.name}}</td>
                </tr>
                <tr>
                  <td>{{list.value}}</td>
                </tr>
              </table>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around" style="margin-top: -10px" v-show="day_flag">
        <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5">
            日消费分布&nbsp;&nbsp;单位(元)
            <div class="ec_h5_data" style="float: right; margin-left: 20px">
              <el-date-picker
                class="select_width"
                align="right"
                size='mini'
                format="yyyy-MM"
                @change="month_data_change"
                v-model="month_data"
                type="month"
                placeholder="选择年">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="oneCard_date">
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" style="margin-top: -10px" v-show="day_flag">
        <el-col :span="24" class="ec_bg" style="padding-bottom: 50px">
          <div class="tab_warPer">
            <div>
              <table v-for="list in monthList" class="table_C">
                <tr>
                  <td class="black">{{list.name}}</td>
                </tr>
                <tr>
                  <td>{{list.value}}</td>
                </tr>
              </table>
            </div>

          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5">
            消费类别分析 &nbsp; &nbsp;(单位:万元)
            <div class="ec_h5_data" style="float: right;">
              <el-date-picker
                class="select_width"
                align="right"
                size='mini'
                format="yyyy-MM-dd"
                @change="ZXF_start_year_change"
                v-model="ZXF_start_year"
                type="date"
                placeholder="选择开始时间">
              </el-date-picker>
              至
              <div class="ec_h5_data" style="float: right;">
                <el-date-picker
                  class="select_width"
                  align="right"
                  size='mini'
                  format="yyyy-MM-dd"
                  @change="ZXF_end_year_change"
                  v-model="ZXF_end_year"
                  type="date"
                  placeholder="选择结束时间">
                </el-date-picker>
              </div>
            </div>
          </h5>
          <div class="ec_height" id="ZXF">
          </div>
        </el-col>

      </el-row>


      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg">
          <div style=" width:50%; margin:0 auto;text-align: center;">
            <el-radio-group v-model="radio" @change="type_btn_change">
              <el-radio-button label="查看各类人员年消费"></el-radio-button>
              <el-radio-button label="查看各类人员月消费"></el-radio-button>
              <el-radio-button label="查看各类人员日消费"></el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" style="margin-top: -10px">
        <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5">
            各类人员消费分析 &nbsp; &nbsp;(单位:万元)
            <div class="ec_h5_data" style="float: right;">
              <el-date-picker
                v-show="type_month_flag"
                class="select_width"
                align="right"
                size='mini'
                format="yyyy"
                @change="cardType_year_change"
                v-model="cardType_year"
                type="year"
                placeholder="选择开始时间">
              </el-date-picker>
              <el-date-picker
                v-show="type_day_flag"
                class="select_width"
                align="right"
                size='mini'
                format="yyyy-MM"
                @change="cardType_month_change"
                v-model="cardType_month"
                type="month"
                placeholder="选择开始时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="card_type">
          </div>
        </el-col>

      </el-row>

      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5">
           消费科目分析 &nbsp; &nbsp;(单位:元)
            <div class="ec_h5_data" style="float: right;">
              <el-date-picker
                class="select_width"
                align="right"
                size='mini'
                format="yyyy-MM-dd"
                @change="KM_start_time_change"
                v-model="KM_start_time"
                type="date"
                placeholder="选择开始时间">
              </el-date-picker>
              至
              <el-date-picker
                class="select_width"
                align="right"
                size='mini'
                format="yyyy-MM-dd"
                @change="KM_end_time_change"
                v-model="KM_end_time"
                type="date"
                placeholder="选择开始时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="KM_type">
          </div>
        </el-col>

      </el-row>
    </div>
</template>

<script>
    import time from "../../config/timeFormat.js"
    export default {
      data(){
        return{
          luYou_List:[
            {name:'总消费',value:'oneCard'},
            {name:'食堂',value:'oneCard_ST'},
            {name:'洗浴',value:'oneCard_XZ'},
            {name:'商户',value:'oneCard_GW'},
            {name:'洗衣',value:'oneCard_XY'},
            {name:'网络缴费',value:'oneCard_RD'},
            {name:'上机',value:'oneCard_DS'},
            {name:'打印复印',value:'oneCard_BK'},
            {name:'图书',value:'oneCard_TSG'},
          ],
          keyCode:0,
          all_select_year:'',
          show_allYear:'',
          code:'',
          name:'总',
          all_Money:'',
          all_btn:[
            {
              name:'总消费',
              code:''
            },
            {
              name:'淋浴',
              code:'211'
            },
            {
              name:'食堂',
              code:'210'
            },
            {
              name:'城市热点',
              code:'224'
            },
            {
              name:'商场购物',
              code:'215'
            },
            {
              name:'图书馆',
              code:'217'
            }],
          countryList:[],
          yearList:[],
          monthList:[],
          KM_count:[],
          KM_name:[],
          RY_count:[],
          RY_name:[],
          ZJ_count:[],
          ZJ_name:[],
          //总趋势数据
          oneCard_count:[],
          oneCard_year:[],
          //年趋势数据
          oneCard_month:[],
          oneCard_month_count:[],
          //月趋势数据
          oneCard_date:[],
          oneCard_date_count:[],

          year_data:'2017',
          month_data:'2017-01',

          school_avg:[],
          school_count:[],
          school_name:[],

          btn_flag:'点击查看月份消费趋势',
          flag_name:'查看年消费',
          year_flag:true,
          month_flag:false,
          day_flag:false,

          ZXF_start_year:'2017-01-01',
          ZXF_end_year:'2017-12-30',
          ZXF_name:[],
          ZXF_count:[],

          type_dom :'',
          cardType_year:'2017',
          cardType_month:'2017-01',
          type_month_flag:false,
          type_day_flag:false,
          radio:'查看各类人员年消费',
          type_date:{
            type_time:[],
            one_count:[],
            two_count:[],
            three_count:[],
            four_count:[],
            five_count:[],
          },


          //消费科目分类
          KM_start_time:'2017-01-01',
          KM_end_time:'2017-12-01',
          KM_type:'',
          XFKM_name:[],
          XFKM_count1:[],
          XFKM_count2:[],
          XFKM_count3:[],
          XFKM_count4:[],
          XFKM_count5:[],
        }
      },
      methods:{
        make_time(){
          let vm = this
          vm.all_select_year = time.year;
          vm.show_allYear = time.year;
          vm.year_data= time.year;
          vm.month_data= time.year + '-' + time.month
          vm.ZXF_start_year= time.year + '-' + '01'+ '-' +'01'
          vm.ZXF_end_year= time.year + '-' + time.month + '-'+ time.day
          vm.cardType_year= time.year;
          vm.cardType_month= time.year + '-' + time.month
          vm.KM_start_time= time.year + '-' + '01'+ '-' +'01'
          vm.KM_end_time = time.year + '-' + time.month + '-'+ time.day
        },

        //总消费时间选择
        all_change_year(val){
          var vm = this
          if(val == undefined){
            return
          }else{
            vm.all_select_year = val
            vm.show_allYear = vm.all_select_year
            vm.btnAndTime(this.all_select_year)
            //科目分布
            vm.$axios.request("post","oneCard/subjectDistribute",{date:vm.all_select_year,flag:'1'},function(data){
              vm.KM_name = []
              vm.KM_count =[]
              for(var i=0;i<data.result.length;i++){
                vm.KM_name.push(data.result[i].desc)
                vm.KM_count.push({name:data.result[i].desc,value:data.result[i].count})
              }
              vm.all_chart_title_fn()
            },function(err){
              console.log(err);
            })
          }

        },
        //点击选择消费分类
        /*btn_select(item,name){
          this.code = item
          this.name = name
          this.btnAndTime(this.all_select_year,this.code)
        },*/
        //控制条件更新后重新调接口的函数
        btnAndTime(time,code){
          var vm = this
          //获取总消费
          vm.$axios.request("post","oneCard/totalMoney",{date:time},function(data){
            for(var i=0;i<data.result.length;i++){
              vm.all_Money = data.result[i].count
            }
          },function(err){
            console.log(err);
          })
          //人员类别
          vm.$axios.request("post","oneCard/personCategory",{date:time,code:code},function(data){
            vm.RY_name = []
            vm.RY_count =[]
            for(var i=0;i<data.result.length;i++){
              vm.RY_name.push(data.result[i].type)
              vm.RY_count.push({name:data.result[i].type,value:data.result[i].count})
            }
            vm.all_person_type_fn()
          },function(err){
            console.log(err);
          })

          //国别分布
          vm.$axios.request("post","oneCard/countryDis",{year:time,code:code},function(data){
            vm.ZJ_name = []
            vm.ZJ_count = []
            for(let i = data.result.length-1 ; i >= 0; i--){
              vm.ZJ_name.push(data.result[i].country)
              vm.ZJ_count.push(data.result[i].money)
            }
            vm.all_distribution_fn()
          },function(err){
            console.log(err);
          })

          //一卡通总体消费趋势
          vm.$axios.request("post","oneCard/consumeTrend",{code:code},function(data){
            vm.oneCard_count = []
            vm.oneCard_year = []
            for(var i=0;i<data.result.length;i++){
              vm.oneCard_count.push(data.result[i].count)
              vm.oneCard_year.push(data.result[i].year)
            }
            vm.oneCard_max_fn()
          },function(err){
            console.log(err);
          })
        },

        //总消费分类echarts函数
        all_chart_title_fn(){
          let all_chart_title = this.$echarts.init(document.getElementById('all_chart_title'), 'customed');
          let option = {
            /*title: {
              text: '(单位:万元)',
              textStyle: {
                fontSize: 12,
              },
              left:'80%',
              top:'5%'
            },*/
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: '<div style="text-align: center;">总消费分布</div>{b} : {c}'
            },
            legend: {
              left: 'center',
              data: ['一卡通总消费分布']
            },
            grid: {
              left: '1%',
              right: '15%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'value'

            }],
            yAxis: [{
              type: 'category',
              boundaryGap: true,
              axisTick: {
                show: true
              },
              axisLabel: {
                interval: null
              },
              data:this.KM_name,
              splitLine: {
                show: false
              }
            }],
            series: [{
              name: '一卡通总消费分布',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'right'
                }
              },
              data:this.KM_count
            }]
          };
          all_chart_title.setOption(option);
        },

        //人员类别echarts函数
        all_person_type_fn(){
          let all_person_type = this.$echarts.init(document.getElementById('all_person_type'), 'customed');
          let option = {
            /*title: {
              text: '(单位:万元)',
              textStyle: {
                fontSize: 12,
              },
              left:'80%',
              top:'5%'
            },*/
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              left: 'center',
              data: this.RY_name
            },
            series : [
              {
                name: '人员类别',
                type: 'pie',
                radius : '45%',
                center: ['48%', '50%'],
                data:this.RY_count,
                label: {
                  normal: {
                    show: true,
                    formatter: '{b}({d}%)'
                  },
                  emphasis: {
                    show: true
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

          all_person_type.setOption(option);
        },


        //国别分布echarts函数
        all_distribution_fn(){
          let all_distribution = this.$echarts.init(document.getElementById('all_distribution'), 'customed');
          let option = {
            color:['#A9FBBA'],
            title: {
              text: '(提示:不包括中国)',
              textStyle: {
                fontSize: 12,
                color:'red'
              },
              left:'70%',
              top:'5%'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
              formatter: "{a} <br/>{b} : {c}万元"
            },
            legend: {
              data: ['国别分布']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              "axisLabel": {
                "interval": 0,
                formatter: '{value}',
              }
            },
            yAxis: {
              type: 'category',
              data: this.ZJ_name
            },
            series: [{
              name: '国别分布',
              type: 'bar',
              data: this.ZJ_count,
              label: {
                normal: {
                  show: true,
                  position: 'right'
                }
              },
            }]
          };

          all_distribution.setOption(option);
        },

        //一卡通总体消费，年月日按钮
        flag_change(val){
          let vm = this
          if(val == '查看年消费'){
            this.year_flag = true
            this.month_flag = false
            this.day_flag = false
          }else if(val =='查看月消费'){
            this.year_flag = false
            this.month_flag = true
            this.day_flag = false
            //一年十二个月的数据表格
            vm.$axios.request("post","oneCard/monthSumCsonsume",{year:vm.year_data,code:''},function(data){
              vm.yearList = []
              vm.oneCard_month = []
              vm.oneCard_month_count =[]
              for(var i=0;i<data.result.length;i++){
                vm.yearList.push({name:data.result[i].month+'月',value:data.result[i].count})
                vm.oneCard_month.push(data.result[i].month+'月')
                vm.oneCard_month_count.push(data.result[i].count)
              }
              vm.oneCard_month_fn()
            },function(err){
              console.log(err);
            })
          }else{
            this.year_flag = false
            this.month_flag = false
            this.day_flag = true
            //一月三十天的数据表格
            vm.$axios.request("post","oneCard/daySumCsonsume",{month:vm.month_data,code:''},function(data){
              vm.monthList = []
              vm.oneCard_date = []
              vm.oneCard_date_count =[]
              for(var i=0;i<data.result.length;i++){
                vm.monthList.push({name:data.result[i].day+'日',value:data.result[i].count})
                vm.oneCard_date.push(data.result[i].day+'日')
                vm.oneCard_date_count.push(data.result[i].count)
              }
              vm.oneCard_date_fn()
            },function(err){
              console.log(err);
            })
          }
        },
        //一卡通总体消费趋势
        oneCard_max_fn(){
          let vm = this;
          let myChart = this.$echarts.init(document.getElementById('oneCard_max'), 'customed');
          let option = {
            toolbox: {
              feature: {
                dataView: {show: true, readOnly: true},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            /*title: {
              text: '(单位:万元)',
              textStyle: {
                fontSize: 12,
              },
              left:'80%',
              top:'5%'
            },*/
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            legend: {
              data: [vm.name+'趋势']
            },

            xAxis: [{
              type: 'category',
              boundaryGap: false,
              data: this.oneCard_year
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: vm.name+'趋势',
              type: 'line',
              stack: '总量',
              data: this.oneCard_count,
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
            }]
          };
          myChart.on('click', function(params) {
            console.log(params.name);
          });
          myChart.setOption(option);
        },
        //一卡通总体消费趋势
        oneCard_month_fn(){
          let vm = this;
          let oneCard_month = this.$echarts.init(document.getElementById('oneCard_month'), 'customed');
          let option = {
            /*title: {
              text: '(单位:万元)',
              textStyle: {
                fontSize: 12,
              },
              left:'80%',
              top:'5%'
            },*/
            toolbox: {
              feature: {
                dataView: {show: true, readOnly: true},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            legend: {
              data: [vm.year_data+'年趋势']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              data: this.oneCard_month
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: vm.year_data+'年趋势',
              type: 'line',
              stack: '总量',
              data: this.oneCard_month_count,
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
            }]
          };
          oneCard_month.on('click', function(params) {
            console.log(params.name);
          });
          oneCard_month.setOption(option);
        },
        year_data_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.year_data = val
            //一年十二个月的数据表格
            vm.$axios.request("post","oneCard/monthSumCsonsume",{year:vm.year_data,code:''},function(data){
              vm.yearList = []
              vm.oneCard_month = []
              vm.oneCard_month_count = []
              for(let i=0;i<data.result.length;i++){
                vm.yearList.push({name:data.result[i].month+'月',value:data.result[i].count})
                vm.oneCard_month.push(data.result[i].month+'月')
                vm.oneCard_month_count.push(data.result[i].count)
              }
              vm.oneCard_month_fn()
            },function(err){
              console.log(err);
            })
          }

        },

        //点击查看月度总消费
        oneCard_date_fn(){
          let vm = this;
          let oneCard_date = this.$echarts.init(document.getElementById('oneCard_date'), 'customed');
          let option = {
            /*title: {
              text: '单位(元)',
              textStyle: {
                fontSize: 12,
              },
              left:'80%',
              top:'5%'
            },*/
            toolbox: {
              feature: {
                dataView: {show: true, readOnly: true},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            legend: {
              data: [vm.month_data+'月趋势']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              data: this.oneCard_date
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: vm.month_data+'月趋势',
              type: 'line',
              stack: '总量',
              data: this.oneCard_date_count,

            }]
          };
          oneCard_date.on('click', function(params) {
            console.log(params.name);
          });
          oneCard_date.setOption(option);
        },
        month_data_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.month_data = val
            //一月三十天的数据表格
            vm.$axios.request("post","oneCard/daySumCsonsume",{month:vm.month_data,code:''},function(data){
              vm.monthList =[]
              vm.oneCard_date = []
              vm.oneCard_date_count = []
              for(var i=0;i<data.result.length;i++){
                vm.monthList.push({name:data.result[i].day+'日',value:data.result[i].count})
                vm.oneCard_date.push(data.result[i].day+'日')
                vm.oneCard_date_count.push(data.result[i].count)
              }
              vm.oneCard_date_fn()
            },function(err){
              console.log(err);
            })
          }

        },

        //消费类别分析
        ZXF_echart(){
          let ZXF = this.$echarts.init(document.getElementById('ZXF'), 'customed');
          let option = {
              color: ['#3398DB'],
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
            toolbox: {
              feature: {
                dataView: {show: true, readOnly: true},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
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
                  data : this.ZXF_name,
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
                  name:'消费分布',
                  type:'bar',
                  barWidth: '30%',
                  data:this.ZXF_count,
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                }
              ]
            };
          ZXF.setOption(option);
        },
        ZXF_init_fn(start,end){
          let vm = this
          vm.$axios.request("post","oneCard/subjectDistribute",{startTime :start,endTime:end},function(data){
            vm.ZXF_name = []
            vm.ZXF_count =[]
            for(var i=0;i<data.result.length;i++){
              vm.ZXF_name.push(data.result[i].desc)
              vm.ZXF_count.push(data.result[i].count)
            }
            vm.ZXF_echart()
          },function(err){
            console.log(err);
          })
        },
        ZXF_start_year_change(val){
          let vm = this
          if(val == undefined){
            return
          }else if(val >this.ZXF_end_year){
            if(this.ZXF_end_year!==''){
              this.$message.error('开始时间不能大于结束时间哦！');
              this.ZXF_start_year = ''
              return
            }else{
              vm.ZXF_start_year = val
            }
          }else{
            vm.ZXF_start_year = val
            vm.ZXF_init_fn(vm.ZXF_start_year,vm.ZXF_end_year)
          }
        },
        ZXF_end_year_change(val){
          let vm = this
          if(val == undefined){
            return
          }else if(val<this.ZXF_start_year){
            this.$message.error('结束时间不能小于开始时间哦！');
            this.ZXF_end_year = ''
            return
          }else{
            vm.ZXF_end_year = val
            vm.ZXF_init_fn(vm.ZXF_start_year,vm.ZXF_end_year)
          }
        },

        //各类人员消费分析echarts图
        card_type_fn(){
          let vm = this
          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            toolbox: {
              feature: {
                dataView: {show: true, readOnly: true},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            legend: {
              data: ['教工卡', '中国学生卡', '国际学生卡', '学员卡', '员工卡']
            },
            xAxis: {
              name: '时间',
              type: 'category',
              data: this.type_date.type_time,
              boundaryGap: false,
            },
            yAxis: {
              name: '金额',
              type: 'value'
            },
            series: [{
              name: '教工卡',
              type: 'line',
              symbolSize:7,
              itemStyle:{
                normal:{
                  color: "#22FFFE" //图标颜色
                }
              },
              lineStyle:{
                normal:{
                  width:2,  //连线粗细
                  color: "#22FFFE"  //连线颜色
                }
              },
              data: this.type_date.one_count,
            }, {
              name: '中国学生卡',
              type: 'line',
              symbolSize:7,
              itemStyle:{
                normal:{
                  color: "#FFC502" //图标颜色
                }
              },
              lineStyle:{
                normal:{
                  width:2,  //连线粗细
                  color: "#FFC502"  //连线颜色
                }
              },
              data: this.type_date.two_count,
            }, {
              name: '国际学生卡',
              type: 'line',
              symbolSize:7,
              itemStyle:{
                normal:{
                  color: "#FF2B8A" //图标颜色
                }
              },
              lineStyle:{
                normal:{
                  width:2,  //连线粗细
                  color: "#FF2B8A"  //连线颜色
                }
              },
              data: this.type_date.three_count,
            }, {
              name: '学员卡',
              type: 'line',
              symbolSize:7,
              itemStyle:{
                normal:{
                  color: "#1BFF25" //图标颜色
                }
              },
              lineStyle:{
                normal:{
                  width:2,  //连线粗细
                  color: "#1BFF25"  //连线颜色
                }
              },
              data: this.type_date.four_count,
            }, {
              name: '员工卡',
              type: 'line',
              symbolSize:7,
              itemStyle:{
                normal:{
                  color: "#771CFF" //图标颜色
                }
              },
              lineStyle:{
                normal:{
                  width:2,  //连线粗细
                  color: "#771CFF"  //连线颜色
                }
              },
              data: this.type_date.five_count,
            }, ]
          }
          vm.type_dom.setOption(option);
        },
        cardType_year_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.cardType_year = val
            this.card_type_month_init(vm.cardType_year,'2')
          }

        },
        cardType_month_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.cardType_month = val
            this.card_type_day_init(vm.cardType_month,'3')
          }
        },
        //查看各类人群年消费的函数
        card_type_init(time,flag){
          let vm = this
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'教工卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.type_time=[]
            vm.type_date.one_count=[]
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.type_time.push(data.result[i].year + '年')
              vm.type_date.one_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'中国学生卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.two_count=[]
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.two_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'国际学生卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.three_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.three_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'学员卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.four_count =[]
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.four_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'员工卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.five_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.five_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })

        },
        //查看各类人群月消费的函数
        card_type_month_init(time,flag){
          let vm = this
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'教工卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.type_time=[]
            vm.type_date.one_count=[]
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.type_time.push(data.result[i].month + '月')
              vm.type_date.one_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'中国学生卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.two_count=[]
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.two_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'国际学生卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.three_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.three_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'学员卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.four_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.four_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'员工卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.five_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.five_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })

        },
        //查看各类人群日消费的函数
        card_type_day_init(time,flag){
          let vm = this
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'教工卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.type_time=[]
            vm.type_date.one_count=[]
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.type_time.push(data.result[i].day + '日')
              vm.type_date.one_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'中国学生卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.two_count=[]
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.two_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'国际学生卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.three_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.three_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'学员卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.four_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.four_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/personnelAnalyze",{
            cardType :'员工卡',
            flag:flag,
            date:time},function(data){
            vm.type_date.five_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.type_date.five_count.push(data.result[i].count)
            }
            vm.card_type_fn()
          },function(err){
            console.log(err);
          })

        },

        //各类人员不同消费的年月日查询
        type_btn_change(val){
          let vm = this
          if(val =='查看各类人员年消费'){
            this.type_month_flag = false
            this.type_day_flag = false
            this.card_type_init('','1')
          }else if(val =='查看各类人员月消费'){
            this.type_month_flag = true
            this.type_day_flag = false
            this.card_type_month_init(vm.cardType_year,'2')
          }else{
            this.type_month_flag = false
            this.type_day_flag = true
            this.card_type_day_init(vm.cardType_month,'3')
          }
        },

        //消费科目分类
        KM_start_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else if(val >this.KM_end_time){
            if(this.KM_end_time!==''){
              this.$message.error('开始时间不能大于结束时间哦！');
              this.KM_start_time = ''
              return
            }else{
              vm.KM_start_time = val
            }
          }else{
            vm.KM_start_time = val
            vm.KM_type_data(vm.KM_start_time,vm.KM_end_time)
          }
        },
        KM_end_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else if(val<this.KM_start_time){
            this.$message.error('结束时间不能小于开始时间哦！');
            this.KM_end_time = ''
            return
          }else{
            vm.KM_end_time = val
            vm.KM_type_data(vm.KM_start_time,vm.KM_end_time)
          }
        },
        KM_type_init(){
          let vm = this
          let option = {
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              feature: {
                dataView: {show: true, readOnly: true},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            legend: {
              x: 'center',
              padding: [10, 0, 0, 30],
              itemWidth: 18,
              data:['教工卡','中国学生卡','国际学生卡','员工卡','学员卡']
            },
            grid: {
              left: '8%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                axisLabel :{
                  interval:0
                }  ,
                show:true,
                barGap: 0,
                padding:0,
                barMaxWidth:1,
                type: 'category',
                data: vm.XFKM_name,
                fontSize: 6,
                scale: true,
                lineStyle:2,
                axisTick: {
                  alignWithLabel: false
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                barGap: 1,
                padding: 0,
                axisLabel: {
                  formatter: '{value}'
                },
              }
            ],
            series : [
              {
                name:'教工卡',
                type:'bar',
                data:this.XFKM_count3,
              }
              ,
              {
                name:'中国学生卡',
                type:'bar',
                data:this.XFKM_count1,
              },
              {
                name:'国际学生卡',
                type:'bar',
                data:this.XFKM_count2,
              },
              {
                name:'员工卡',
                type:'bar',
                data:this.XFKM_count4,
              },
              {
                name:'学员卡',
                type:'bar',
                data:this.XFKM_count5,
              }
            ]
          };
          this.KM_type.setOption(option);
        },
        KM_type_data(start,end){
          let vm = this
          vm.$axios.request("post","oneCard/subjectAnalyze",{
            startTime:start,
            endTime:end,
            cardtype:'中国学生卡'
          },function(data){
            vm.XFKM_name = []
            vm.XFKM_count1 = []
            for(let i=0;i<data.result.length;i++){
             vm.XFKM_name.push(data.result[i].name)
             vm.XFKM_count1.push(data.result[i].count)
            }
            vm.KM_type_init()
          },function(err){
            console.log(err);
          })

          vm.$axios.request("post","oneCard/subjectAnalyze",{
            startTime:start,
            endTime:end,
            cardtype:'国际学生卡'
          },function(data){
            vm.XFKM_count2 = []
            for(let i=0;i<data.result.length;i++){
              vm.XFKM_count2.push(data.result[i].count)
            }
            vm.KM_type_init()
          },function(err){
            console.log(err);
          })

          vm.$axios.request("post","oneCard/subjectAnalyze",{
            startTime:start,
            endTime:end,
            cardtype:'教工卡'
          },function(data){
            vm.XFKM_count3 = []
            for(let i=0;i<data.result.length;i++){
              vm.XFKM_count3.push(data.result[i].count)
            }
            vm.KM_type_init()
          },function(err){
            console.log(err);
          })

          vm.$axios.request("post","oneCard/subjectAnalyze",{
            startTime:start,
            endTime:end,
            cardtype:'学员卡'
          },function(data){
            vm.XFKM_count4 = []
            for(let i=0;i<data.result.length;i++){
              vm.XFKM_count4.push(data.result[i].count)
            }
            vm.KM_type_init()
          },function(err){
            console.log(err);
          })

          vm.$axios.request("post","oneCard/subjectAnalyze",{
            startTime:start,
            endTime:end,
            cardtype:'员工卡'
          },function(data){
            vm.XFKM_count5 = []
            for(let i=0;i<data.result.length;i++){
              vm.XFKM_count5.push(data.result[i].count)
            }
            vm.KM_type_init()
          },function(err){
            console.log(err);
          })
        }
      },
      mounted(){
        //echarts主题
        this.$echarts.registerTheme('customed', this.$store.state.echartsData);
        this.type_dom = this.$echarts.init(document.getElementById('card_type'), 'customed');
        this.KM_type = this.$echarts.init(document.getElementById('KM_type'), 'customed');
      },
      created(){
        window.scrollTo(0,0);
        var vm = this
        vm.make_time()
        vm.KM_type_data(vm.KM_start_time,vm.KM_end_time)
        //获取总消费
        vm.$axios.request("post","oneCard/totalMoney",{date:vm.all_select_year,code:''},function(data){
          for(var i=0;i<data.result.length;i++){
            vm.all_Money = data.result[i].count
          }

        },function(err){
          console.log(err);
        })

        //总消费分布
        vm.$axios.request("post","oneCard/subjectDistribute",{date:vm.all_select_year,flag:'1'},function(data){
          for(var i=0;i<data.result.length;i++){
            vm.KM_name.push(data.result[i].desc)
            vm.KM_count.push(data.result[i].count)
          }
          vm.all_chart_title_fn()
        },function(err){
          console.log(err);
        })
        //人员类别
        vm.$axios.request("post","oneCard/personCategory",{date:vm.all_select_year,code:''},function(data){
          for(var i=0;i<data.result.length;i++){
            vm.RY_name.push(data.result[i].type)
            vm.RY_count.push({name:data.result[i].type,value:(data.result[i].count)})
          }

          vm.all_person_type_fn()
        },function(err){
          console.log(err);
        })
        //国别分布
        vm.$axios.request("post","oneCard/countryDis",{year:vm.all_select_year,code:vm.code},function(data){
          for(let i = data.result.length-1 ; i >= 0; i--){
            vm.ZJ_name.push(data.result[i].country)
            vm.ZJ_count.push(data.result[i].money)
          }
          vm.all_distribution_fn()
        },function(err){
          console.log(err);
        })

        //一卡通总体消费趋势
        vm.$axios.request("post","oneCard/consumeTrend",{code:''},function(data){
          for(var i=0;i<data.result.length;i++){
            vm.oneCard_count.push(data.result[i].count)
            vm.oneCard_year.push(data.result[i].year)
            vm.countryList.push({name:data.result[i].year+'年',value:data.result[i].count})
          }
          vm.oneCard_max_fn()
        },function(err){
          console.log(err);
        })

        vm.ZXF_init_fn(vm.ZXF_start_year,vm.ZXF_end_year)

        vm.card_type_init('','1')

      }
    }
</script>

<style lang="scss" scoped>
  .all_num{
    font-size: 30px;
    margin: 30px 0 20px 540px;
  }
  .btn{
    text-align: center;
    .btn_to{
      transform: scale(1);
      transition: 0.2s;
    }
    .btn_to:hover{
      transform: scale(1.2);
      transition: 0.2s;
    }
  }
  .NYR_btn{
    height: 30px;
    line-height: 10px;
    background-color: rgb(32, 160, 255);
    color:white;
  }
  .NYR_btn:hover{
    background-color: white;
    color:rgb(32, 160, 255);
  }
  .btn_text{
    font-size: 16px;
    color:#04aec7 ;
    margin: 10px 0;
  }
  .china_height{
    height: 500px;
  }

  .table_C{
    display: inline-block;
    td{
      text-align: center;
      height: 25px;
      width: 65px;
      border: 1px solid rgba(250, 250, 250,0.3);
    }
    .black{
      background: rgba(23,24,28,0.5);
    }
  }
  .tab_F{
    overflow: hidden;
    text-align: center;
  }

</style>
