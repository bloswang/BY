<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/control/oneCard' }">一卡通总消费分析</el-breadcrumb-item>
      <el-breadcrumb-item>网络缴费金额分析</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5 all_num">
          {{show_year}}年 网络缴费总消费:{{all_Money}}万元
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
          专业TOP25&nbsp;&nbsp;(单位:万元)
        </h5>
        <div class="ec_height" id="RD_distribution">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          人员类别&nbsp;&nbsp;(单位:万元)
        </h5>
        <div class="ec_height" id="RD_person_type">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          男女比例&nbsp;&nbsp;(单位:人)
        </h5>
        <div class="ec_height" id="RD_chart_title">
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
          一卡通网络缴费消费趋势&nbsp;&nbsp;(单位:万元)
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
          日消费分布&nbsp;&nbsp;(单位:元)
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

    <!--圈存机网络缴费金额-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          圈存机网络缴费金额 &nbsp;&nbsp;&nbsp;&nbsp; (单位:元)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="Terminal_money_time_S"
              type="date"
              format="yyyy-MM-dd"
              @change="Terminal_money_time_S_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="Terminal_money_time_N"
              type="date"
              format="yyyy-MM-dd"
              @change="Terminal_money_time_N_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="Terminal_money"></div>
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
        keyCode:5,
        all_select_year:'',
        show_year:'',
        code:'224',
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
        oneCard_count:[],
        oneCard_year:[],

        btn_flag:'点击查看月份消费趋势',
        flag_name:'查看年消费',
        year_flag:true,
        month_flag:false,
        day_flag:false,

        //年趋势数据
        oneCard_month:[],
        oneCard_month_count:[],
        //月趋势数据
        oneCard_date:[],
        oneCard_date_count:[],
        school_avg:[],
        school_count:[],
        school_name:[],
        year_data:'2017',
        month_data:'2017-01',

        //充值机金额
        Terminal_money:'',
        Terminal_money_time_S:'2016-01-01',
        Terminal_money_time_N:'2017-12-30',
        Terminal_money_name:[],
        Terminal_money_count:[],



      }
    },
    methods:{
      make_time(){
        let vm = this
        vm.all_select_year = time.year;
        vm.show_year = time.year;
        vm.year_data = time.year;
        vm.month_data = time.year +'-'+time.month;
        vm.Terminal_money_time_S= time.year + '-' +'01'+'-'+'01'
        vm.Terminal_money_time_N= time.year + '-' +time.month+'-'+time.day
      },
      //总消费时间选择
      all_change_year(val){
        var vm = this
        if(val == undefined){
          return
        }else{
          vm.all_select_year = val
          vm.show_year = vm.all_select_year
          vm.btnAndTime(vm.all_select_year,vm.code)
          //男女分布
          vm.$axios.request("post","oneCard/sexCsonsume",{year:vm.all_select_year,code:vm.code},function(data){
            vm.KM_count = []
            vm.KM_name = []
            let sex = ''
            for(var i=0;i<data.result.length;i++){
              if(data.result[i].sex !== null){
                if(data.result[i].sex =='1.0'){
                  sex = '男'
                }else if(data.result[i].sex =='0.0'){
                  sex ='女'
                }else{
                  sex = '其他'
                }
                vm.KM_name.push(sex)
                vm.KM_count.push({name:sex,value:(data.result[i].count)})
              }

            }
            vm.RD_chart_title_fn()
          },function(err){
            console.log(err);
          })
        }

      },

      //控制条件更新后重新调接口的函数
      btnAndTime(time,code){
        var vm = this
        //获取总消费
        vm.$axios.request("post","oneCard/totalMoney",{date:time,code:code},function(data){
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
          vm.RD_person_type_fn()
        },function(err){
          console.log(err);
        })

        //专业缴费前25
        vm.$axios.request("post","oneCard/onlinePaymentSpecialty25",{year:time},function(data){
          vm.ZJ_name = []
          vm.ZJ_count = []
          for(let i = data.result.length-1 ; i >= 0; i--){
            vm.ZJ_name.push(data.result[i].zy)
            vm.ZJ_count.push(data.result[i].count/10000)
          }
          vm.RD_distribution_fn()
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

      //科目分类echarts函数
      RD_chart_title_fn(){
        let RD_chart_title = this.$echarts.init(document.getElementById('RD_chart_title'), 'customed');
        let option = {
          title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: this.KM_name,
          },
          series : [
            {
              name: '男女比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.KM_count,
              label: {
                normal: {
                  show: true,
                  formatter: '{b} ({c}人)'
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
        RD_chart_title.setOption(option);
      },
      //人员类别echarts函数
      RD_person_type_fn(){
        let RD_person_type = this.$echarts.init(document.getElementById('RD_person_type'), 'customed');
        let option = {
          /*title: {
            text: '单位(万元)',
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
              center: ['50%', '60%'],
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

        RD_person_type.setOption(option);
      },

      //专业top25charts函数
      RD_distribution_fn(){
        let RD_distribution = this.$echarts.init(document.getElementById('RD_distribution'), 'customed');
        let option = {
          color:['#A9FBBA'],
          /*title: {
            text: '单位(万元)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },*/
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}万元"
          },
          legend: {
            data: ['专业分布']
          },
          grid: {
            left: '3%',
            right: '6%',
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
            name: '专业分布',
            type: 'bar',
            data: this.ZJ_count
          }]
        };

        RD_distribution.setOption(option);
      },

      //一卡通总体消费趋势
      oneCard_max_fn(){
        let vm = this;
        let myChart = this.$echarts.init(document.getElementById('oneCard_max'), 'customed');
        let option = {
//          title: {
//            text: '单位(万元)',
//            textStyle: {
//              fontSize: 12,
//            },
//            left:'80%',
//            top:'5%'
//          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'black'
              }
            }
          },
          toolbox: {
            show : true,
            feature : {
              dataView : {show: true, readOnly: true},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          legend: {
            data: [vm.name+'趋势']
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
            data: this.oneCard_year
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: vm.name+'趋势',
            type: 'line',
            stack: '总量',
            data: this.oneCard_count
          }]
        };
        /*myChart.on('click', function(params) {
          //console.log(params.name);
          vm.$router.push({ path: "studentSourceDetails", query: { name: params.name } });
        });*/
        myChart.setOption(option);
      },


      //一卡通总体消费趋势
      oneCard_month_fn(){
        let vm = this;
        let oneCard_month = this.$echarts.init(document.getElementById('oneCard_month'), 'customed');
        let option = {
          /*title: {
            text: '单位(万元)',
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
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'black'
              }
            }
          },
          toolbox: {
            show : true,
            feature : {
              dataView : {show: true, readOnly: true},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
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
            data: this.oneCard_month_count
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
          vm.$axios.request("post","oneCard/monthSumCsonsume",{year:vm.year_data,code:vm.code},function(data){
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
         /* title: {
            text: '单位(元)',
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
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'black'
              }
            }
          },
          toolbox: {
            show : true,
            feature : {
              dataView : {show: true, readOnly: true},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
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
            data: this.oneCard_date_count
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
          vm.$axios.request("post","oneCard/daySumCsonsume",{month:vm.month_data,code:vm.code},function(data){
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

      //一卡通总体消费，年月日按钮
      flag_change(val){
        let vm = this
        if(val == '查看年消费'){
          this.year_flag = true
          this.month_flag = false
          this.day_flag = false
        }
        else if(val =='查看月消费'){
          this.year_flag = false
          this.month_flag = true
          this.day_flag = false
          //一年十二个月的数据表格
          vm.$axios.request("post","oneCard/monthSumCsonsume",{year:vm.year_data,code:vm.code},function(data){
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
        }
        else{
          this.year_flag = false
          this.month_flag = false
          this.day_flag = true
          //一月三十天的数据表格
          vm.$axios.request("post","oneCard/daySumCsonsume",{month:vm.month_data,code:vm.code},function(data){
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

      //终端机金额相关函数
      Terminal_money_fn(){
        let option = {
          color: ['#1BDB8F'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '30%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data:this.Terminal_money_name,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval:0,
                rotate:-60
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
              name:'充值金额',
              type:'bar',
              barWidth: '60%',
              data:this.Terminal_money_count,
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
            }
          ]
        };
        this.Terminal_money.setOption(option);
      },
      Terminal_money_time_S_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.Terminal_money_time_N){
          if(this.Terminal_money_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.Terminal_money_time_S = ''
            return
          }else{
            this.Terminal_money_time_S = val
          }
        }else{
          this.Terminal_money_time_S = val;
          vm.Terminal_money_init_fn(vm.Terminal_money_time_S,vm.Terminal_money_time_N)
        }


      },
      Terminal_money_time_N_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.Terminal_money_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.Terminal_money_time_N = ''
          return
        }else{
          vm.Terminal_money_time_N = val
          vm.Terminal_money_init_fn(vm.Terminal_money_time_S,vm.Terminal_money_time_N)
        }

      },
      Terminal_money_init_fn(start,end){
        let vm = this
        //终端机充值情况
        vm.$axios.request("post","oneCard/netFeeByTransferMachine",{startTime:start,endTime:end},function(data){
          vm.Terminal_money_name = []
          vm.Terminal_money_count= []
          for(let i=0;i<data.result.length;i++){
            vm.Terminal_money_name.push(data.result[i].floornameuse)
            vm.Terminal_money_count.push(data.result[i].count)
          }
          vm.Terminal_money_fn();
        },function(err){
          console.log(err);
        })
      },




    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.Terminal_money = this.$echarts.init(document.getElementById('Terminal_money'), 'customed');

      //this.proportion_fn()
      //this.china_data_fn()
    },
    created(){
      window.scrollTo(0,0);
      var vm = this
      vm. make_time()
      //获取总消费
      vm.$axios.request("post","oneCard/totalMoney",{date:vm.all_select_year,code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.all_Money = data.result[i].count
        }

      },function(err){
        console.log(err);
      })

      //男女分布
      vm.$axios.request("post","oneCard/sexCsonsume",{year:vm.all_select_year,code:vm.code},function(data){
        let sex = ''
        for(var i=0;i<data.result.length;i++){
            if(data.result[i].sex =='1.0'){
              sex = '男'
            }else if(data.result[i].sex =='0.0'){
              sex ='女'
            }else{
              sex = '其他'
            }
            vm.KM_name.push(sex)
            vm.KM_count.push({name:sex,value:(data.result[i].count)})
        }
        vm.RD_chart_title_fn()
      },function(err){
        console.log(err);
      })
      //人员类别
      vm.$axios.request("post","oneCard/personCategory",{date:vm.all_select_year,code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.RY_name.push(data.result[i].type)
          vm.RY_count.push({name:data.result[i].type,value:(data.result[i].count)})
        }

        vm.RD_person_type_fn()
      },function(err){
        console.log(err);
      })
      //专业top25
      vm.$axios.request("post","oneCard/onlinePaymentSpecialty25",{year:vm.all_select_year},function(data){
        for(let i = data.result.length-1 ; i >= 0; i--){
          vm.ZJ_name.push(data.result[i].zy)
          vm.ZJ_count.push(data.result[i].count/10000)
        }
        vm.RD_distribution_fn()
      },function(err){
        console.log(err);
      })

      //一卡通总体消费趋势
      vm.$axios.request("post","oneCard/consumeTrend",{code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.oneCard_count.push(data.result[i].count)
          vm.oneCard_year.push(data.result[i].year)
          vm.countryList.push({name:data.result[i].year+'年',value:data.result[i].count})
        }
        vm.oneCard_max_fn()
      },function(err){
        console.log(err);
      })
      //终端机充值金额
      vm.Terminal_money_init_fn(vm.Terminal_money_time_S,vm.Terminal_money_time_N)


      /*//一年十二个月的数据表格
      vm.$axios.request("post","oneCard/monthSumCsonsume",{year:vm.year_data,code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.yearList.push({name:data.result[i].month+'月',value:data.result[i].count})
          vm.oneCard_month.push(data.result[i].month+'月')
          vm.oneCard_month_count.push(data.result[i].count)
        }
        vm.oneCard_month_fn()
      },function(err){
        console.log(err);
      })

      //一月三十天的数据表格
      vm.$axios.request("post","oneCard/daySumCsonsume",{month:vm.month_data,code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.monthList.push({name:data.result[i].day+'日',value:data.result[i].count})
          vm.oneCard_date.push(data.result[i].day+'日')
          vm.oneCard_date_count.push(data.result[i].count)
        }
        vm.oneCard_date_fn()
      },function(err){
        console.log(err);
      })*/
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
