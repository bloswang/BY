<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/control/oneCard' }">一卡通总消费分析</el-breadcrumb-item>
      <el-breadcrumb-item>一卡通复印/打印消费分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5 all_num">
          {{all_select_year}}年 复印/打印总消费:{{all_Money}}元
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
      <!--各打印/复印点消费金额分析-->
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5" >
          各打印/复印点消费金额分析&nbsp;&nbsp;(单位:元)
        </h5>
        <div class="ec_height" id="oneCard_DY_count">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          人员类别&nbsp;&nbsp;(单位:元)
        </h5>
        <div class="ec_height" id="person_type">
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
          一卡通打印复印消费趋势&nbsp;&nbsp;(单位:万元)
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

    <!--各个打印复印点的消费人数情况-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5" >
          各打印/复印点消费人数分析&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data" style="float: right; margin-left: 20px">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="DY_person_time_S_change"
              v-model="DY_person_time_S"
              type="date"
              placeholder="选择年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="DY_person_time_N_change"
              v-model="DY_person_time_N"
              type="date"
              placeholder="选择月">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="oneCard_DY_person">
        </div>
      </el-col>
    </el-row>

    <!--各类人员打印/复印消费金额分析-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5" >
          各类人员打印/复印消费金额分析&nbsp;&nbsp;(单位:元)
          <div class="ec_h5_data" style="float: right; margin-left: 20px">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="DY_type_time_S_change"
              v-model="DY_type_time_S"
              type="date"
              placeholder="选择年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="DY_type_time_N_change"
              v-model="DY_type_time_N"
              type="date"
              placeholder="选择月">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="oneCard_DY_type">
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
        keyCode:7,
        all_select_year:'2017',
        code:'212',
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
        RY_count:[],
        RY_name:[],
        ZJ_count:[],
        ZJ_name:[],
        oneCard_count:[],
        oneCard_year:[],
        year_data:'2017',
        month_data:'2017-01',

        yearList:[],
        countryList:[],
        monthList:[],
        //年趋势数据
        oneCard_month:[],
        oneCard_month_count:[],
        //月趋势数据
        oneCard_date:[],
        oneCard_date_count:[],

        btn_flag:'点击查看月份消费趋势',
        flag_name:'查看年消费',
        year_flag:true,
        month_flag:false,
        day_flag:false,

        //各打印/复印点消费金额分析
        oneCard_DY_count:'',
        DY_count:[],
        DY_name:[],

        //各个打印复印点的消费人数情况
        oneCard_DY_person:'',
        DY_person_time_S:'2017-01-01',
        DY_person_time_N:'2018-01-01',
        DY_person:[],
        DY_name1:[],

        //各类人员打印复印的金额比例
        oneCard_DY_type:'',
        DY_type_time_S:'2017-01-01',
        DY_type_time_N:'2018-01-01',
        DY_type_count:[],
        DY_type_name1:[],
      }
    },
    methods:{
      make_time(){
        let vm = this
        vm.all_select_year = time.year;
        vm.year_data = time.year;
        vm.month_data = time.year +'-'+time.month;
        vm.DY_person_time_S = time.year + '-' +'01'+'-'+'01'
        vm.DY_person_time_N = time.year + '-' +time.month+'-'+time.day
        vm.DY_type_time_S = time.year + '-' +'01'+'-'+'01'
        vm.DY_type_time_N = time.year + '-' +time.month+'-'+time.day
      },
      //总消费时间选择
      all_change_year(val){
        var vm = this
        if(val == undefined){
          return
        }else{
          vm.all_select_year = val
          vm.btnAndTime(vm.all_select_year,vm.code)
        }

      },
      //控制条件更新后重新调接口的函数
      btnAndTime(time,code){
        var vm = this
        //获取总消费
        vm.$axios.request("post","oneCard/totalMoney",{date:time,code:code},function(data){
          for(var i=0;i<data.result.length;i++){
            vm.all_Money = parseInt(data.result[i].count *10000)
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
            vm.RY_count.push({name:data.result[i].type,value:data.result[i].count*10000})
          }
          vm.person_type_fn()
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
        //各打印/复印点消费金额分析
        vm.$axios.request("post","oneCard/printPlaceConsume",{date:time},function(data){
          vm.DY_name = []
          vm.DY_count = []
          for(var i=0;i<data.result.length;i++){
            vm.DY_name.push(data.result[i].termname)
            vm.DY_count.push(data.result[i].count)
          }
          vm.oneCard_DY_count_fn()
        },function(err){
          console.log(err);
        })
      },


      //人员类别echarts函数
      person_type_fn(){
        let person_type = this.$echarts.init(document.getElementById('person_type'), 'customed');
        let option = {
          /*title: {
            text: '单位(元)',
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
              radius : '55%',
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

        person_type.setOption(option);
      },

      //一卡通总体消费趋势
      oneCard_max_fn(){
        let vm = this;
        let myChart = this.$echarts.init(document.getElementById('oneCard_max'), 'customed');
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

      //点击查看年度总消费
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
              vm.yearList.push({name:data.result[i].month+'月',value:parseInt(data.result[i].count*10000)})
              vm.oneCard_month.push(data.result[i].month+'月')
              vm.oneCard_month_count.push(parseInt(data.result[i].count*10000))
            }
            vm.oneCard_month_fn()
          },function(err){
            console.log(err);
          })
        }

      },
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
              vm.monthList.push({name:data.result[i].day+'日',value:parseInt(data.result[i].count)})
              vm.oneCard_date.push(data.result[i].day+'日')
              vm.oneCard_date_count.push(parseInt(data.result[i].count))
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


      //各打印/复印点消费金额分析
      oneCard_DY_count_fn(){
        let vm = this
        let option = {
          color:['#11E7FB'],
          /*title: {
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
              type: 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}元"
          },
          legend: {
            data: ['金额']
          },
          grid: {
            left: '3%',
            right: '20%',
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
            data: this.DY_name
          },
          series: [{
            name: '金额',
            type: 'bar',
            barWidth:30,
            data: this.DY_count,
            label:{
              normal:{
                show: true,
                position: 'right'}
            },
          }]
        };
        this.oneCard_DY_count.setOption(option);
      },

      //各个打印复印点的消费人数情况
      oneCard_DY_person_fn(){
        let vm = this
        let  option = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            x: 'center',
            padding: [10, 0, 0, 30],
            itemWidth: 18,
            data:['消费人数']
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
              data: this.DY_name1,
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
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'black'
              }
            }
          },
          series : [
            {
              name:'消费人数',
              type:'bar',
              barWidth:30,
              itemStyle:{
                normal:{
                  color: "#FFC502" //图标颜色
                }
              },
              data:this.DY_person,
            },
          ]
        };
        this.oneCard_DY_person.setOption(option);
      },
      DY_person_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.DY_person_time_N){
          if(this.DY_person_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.DY_person_time_S = ''
            return
          }else{
            this.DY_person_time_S = val
          }
        }else{
          this.DY_person_time_S = val
          this.DY_person_init_fn(this.DY_person_time_S,this.DY_person_time_N)
        }

      },
      DY_person_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.DY_person_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.DY_person_time_N = ''
          return
        }else{
          this.DY_person_time_N = val
          this.DY_person_init_fn(this.DY_person_time_S,this.DY_person_time_N)
        }

      },
      DY_person_init_fn(start,end){
        let vm = this
        vm.$axios.request("post","oneCard/printPlaceCount",{startTime:start,endTime:end},function(data){
          vm.DY_name1 = []
          vm.DY_person = []
          for(var i=0;i<data.result.length;i++){
            vm.DY_name1.push(data.result[i].termname)
            vm.DY_person.push(data.result[i].count)
          }
          vm.oneCard_DY_person_fn()
        },function(err){
          console.log(err);
        })
      },

      //各类人员打印复印的金额比例
      oneCard_DY_type_fn(){
        let vm = this
        let  option = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            x: 'center',
            padding: [10, 0, 0, 30],
            itemWidth: 18,
            data:['消费卡类别']
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
              data: this.DY_type_name1,
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
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'black'
              }
            }
          },
          series : [
            {
              name:'消费卡类别',
              type:'bar',
              barWidth:30,
              itemStyle:{
                normal:{
                  color: "#0CFFB7" //图标颜色
                }
              },
              data:this.DY_type_count,
            },
          ]
        };
        this.oneCard_DY_type.setOption(option);
      },
      DY_type_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.DY_type_time_N){
          if(this.DY_type_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.DY_type_time_S = ''
            return
          }else{
            this.DY_type_time_S = val
          }
        }else{
          this.DY_type_time_S = val
          this.DY_type_init_fn(this.DY_type_time_S,this.DY_type_time_N)
        }

      },
      DY_type_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.DY_type_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.DY_type_time_N = ''
          return
        }else{
          this.DY_type_time_N = val
          this.DY_type_init_fn(this.DY_type_time_S,this.DY_type_time_N)
        }

      },
      DY_type_init_fn(start,end){
        let vm = this
        vm.$axios.request("post","oneCard/cardPrintConsume",{startTime:start,endTime:end},function(data){
          vm.DY_type_name1 = []
          vm.DY_type_count = []
          for(var i=0;i<data.result.length;i++){
            vm.DY_type_name1.push(data.result[i].cardtype)
            vm.DY_type_count.push(data.result[i].count)
          }
          vm.oneCard_DY_type_fn()
        },function(err){
          console.log(err);
        })
      },
    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.oneCard_DY_count = this.$echarts.init(document.getElementById('oneCard_DY_count'), 'customed');
      this.oneCard_DY_person = this.$echarts.init(document.getElementById('oneCard_DY_person'), 'customed');
      this.oneCard_DY_type = this.$echarts.init(document.getElementById('oneCard_DY_type'), 'customed');
    },
    created(){
      window.scrollTo(0,0);
      var vm = this
      vm.make_time()
      vm.btnAndTime(vm.all_select_year,vm.code)
      //各个打印复印点的消费人数情况
      this.DY_person_init_fn(this.DY_person_time_S,this.DY_person_time_N)

      //各类人员打印复印的金额比例
      this.DY_type_init_fn(this.DY_type_time_S,this.DY_type_time_N)

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
  .el-table .elTableName{
    border:none;
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
