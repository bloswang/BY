<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/control/oneCard' }">一卡通总消费分析</el-breadcrumb-item>
      <el-breadcrumb-item>图书馆消费金额分析</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5 all_num">
          {{show_year}}年 图书馆总消费:{{all_Money}}元
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
          专业分布&nbsp;&nbsp;(单位:元)
        </h5>
        <div class="ec_height" id="chart_title">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          人员类别&nbsp;&nbsp;(单位:元)
        </h5>
        <div class="ec_height" id="person_type">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          男女比例&nbsp;&nbsp;(单位:人)
        </h5>
        <div class="ec_height" id="distribution">
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
          一卡通图书馆消费趋势&nbsp;&nbsp;(单位:元)
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
          月消费分布&nbsp;&nbsp;(单位:元)
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

    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          图书馆图书分析&lt;!&ndash;({{TS_start_time}}至{{TS_end_time}})&ndash;&gt;
          <div class="ec_h5_data" style="float: right;">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              type="date"
              format="yyyy-MM-dd"
              v-model="TS_start_time"
              @change="TS_start_time_change"
              placeholder="选择年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              type="date"
              format="yyyy-MM-dd"
              v-model="TS_end_time"
              @change="TS_end_time_change"
              placeholder="选择年">
            </el-date-picker>
          </div>
        </h5>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: -10px">
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          图书信息分析TOP5
        </h5>
        <div class="ec_height" id="TS_msg">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          图书读者分析TOP5
        </h5>
        <div class="ec_height" id="TS_person">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          图书借阅分析TOP5
        </h5>
        <div class="ec_height" id="TS_look">
        </div>
      </el-col>
    </el-row>-->
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
        keyCode:8,
        all_select_year:'',
        show_year:'',
        code:'217',
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

        //图书馆图书分析
        /*TS_start_time:'2017-01-01',
        TS_end_time:'2017-10-01',

        read_name:[],
        read_count:[],

        msg_name:[],
        msg_count:[],

        borrow_name:[],
        borrow_count:[]*/
      }
    },
    methods:{
      make_time(){
        let vm  = this
        vm.all_select_year = time.year;
        vm.show_year = time.year;
        vm.year_data = time.year;
        vm.month_data = time.year +'-'+time.month;
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
          //专业分布
          vm.$axios.request("post","oneCard/specialtyDis",{year:vm.all_select_year,code:vm.code},function(data){
            vm.KM_name = []
            vm.KM_count = []
            console.log(data)
            for(var i=0;i<data.result.length;i++){
              if(data.result[i].specialty!=="null"){
                vm.KM_name.push(data.result[i].specialty)
                vm.KM_count.push(parseInt(data.result[i].count*10000))
              }
            }
            vm.chart_title_fn()
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
            vm.all_Money = data.result[i].count*10000
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
            vm.RY_count.push({name:data.result[i].type,value:parseInt(data.result[i].count*10000)})
          }
          vm.person_type_fn()
        },function(err){
          console.log(err);
        })

        //男女分布
        vm.$axios.request("post","oneCard/sexCsonsume",{year:time,code:code},function(data){
          vm.ZJ_name = []
          vm.ZJ_count = []
          let sex = ''
          for(var i=0;i<data.result.length;i++){
              if(data.result[i].sex =='1.0'){
                sex = '男'
              }else if(data.result[i].sex =='0.0'){
                sex ='女'
              }else{
                sex = '其他'
              }
              vm.ZJ_name.push(sex)
              vm.ZJ_count.push({name:sex,value:(data.result[i].count)})

          }
          vm.distribution_fn()
        },function(err){
          console.log(err);
        })
      },

      //专业比例
      chart_title_fn(){
        let chart_title = this.$echarts.init(document.getElementById('chart_title'), 'customed');
        let option = {
          color:['#A9FBBA'],
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
            data: ['专业分布']
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
            data: this.KM_name
          },
          series: [{
            name: '专业分布',
            type: 'bar',
            data: this.KM_count,
            label:{
              normal:{
                show: true,
                position: 'right'}
            },
          }]
        };
        chart_title.setOption(option);
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

        person_type.setOption(option);
      },

      //男女比例echarts函数
      distribution_fn(){
        let distribution = this.$echarts.init(document.getElementById('distribution'), 'customed');
        let option = {
          /*title: {
            text: '单位(人)',
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
            data: this.ZJ_name
          },
          series : [
            {
              name: '洲际分布',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.ZJ_count,
              label: {
                normal: {
                  show: true,
                  formatter: '{b}({c}人)'
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

        distribution.setOption(option);
      },
      //一卡通总体消费趋势
      oneCard_max_fn(){
        let vm = this;
        let myChart = this.$echarts.init(document.getElementById('oneCard_max'), 'customed');
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
          legend: {
            data: [vm.name+'趋势']
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
      oneCard_month_fn(){
        let vm = this;
        let oneCard_month = this.$echarts.init(document.getElementById('oneCard_month'), 'customed');
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
          legend: {
            data: [vm.year_data+'年趋势']
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
              vm.yearList.push({name:data.result[i].month+'月',value:data.result[i].count*10000})
              vm.oneCard_month.push(data.result[i].month+'月')
              vm.oneCard_month_count.push(data.result[i].count*10000)
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

      /*//图书馆图书信息分析
      //图书信息
      TS_msg_fn(){
        let TS_msg = this.$echarts.init(document.getElementById('TS_msg'), 'customed');
        let option = {
          color:['#A9FBBA'],
          title: {
            text: '单位(本)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}本"
          },
          legend: {
            data: ['图书名称']
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
            data: this.msg_name
          },
          series: [{
            name: '图书名称',
            type: 'bar',
            data: this.msg_count,
            label:{
              normal:{
                show: true,
                position: 'right'}
            },
          }]
        };
        TS_msg.setOption(option);
      },
      //图书读者
      TS_person_fn(){
        let TS_person = this.$echarts.init(document.getElementById('TS_person'), 'customed');
        let option = {
          color:['#A9FBBA'],
          title: {
            text: '单位(本)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}本"
          },
          legend: {
            data: ['图书读者']
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
            data: this.read_name
          },
          series: [{
            name: '图书读者',
            type: 'bar',
            data: this.read_count,
            label:{
              normal:{
                show: true,
                position: 'right'}
            },
          }]
        };
        TS_person.setOption(option);
      },
      //图书借阅
      TS_look_fn(){
        let TS_look = this.$echarts.init(document.getElementById('TS_look'), 'customed');
        let option = {
          color:['#A9FBBA'],
          title: {
            text: '单位(本)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}本"
          },
          legend: {
            data: ['借阅书籍']
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
            data: this.borrow_name
          },
          series: [{
            name: '借阅书籍',
            type: 'bar',
            data: this.borrow_count,
            label:{
              normal:{
                show: true,
                position: 'right'}
            },
          }]
        };
        TS_look.setOption(option);
      },
      //初始化数据展现
      TS_init_fn(start,end){
        var vm = this
        //获取图书读者
        vm.$axios.request("post","oneCard/bookReaderTop5",{startYear:start,endYear:end},function(data){
          vm.read_name = []
          vm.read_count = []
          for(var i=data.result.length-1;i>=0;i--){
            vm.read_name.push(data.result[i].dzxm)
            vm.read_count.push(data.result[i].count)
          }
          vm.TS_person_fn()
        },function(err){
          console.log(err);
        })
        //获取图书借阅
        vm.$axios.request("post","oneCard/borrowBookTop5",{startYear:start,endYear:end},function(data){
          vm.borrow_name = []
          vm.borrow_count = []
          for(var i=data.result.length-1;i>=0;i--){
            vm.borrow_name.push(data.result[i].tm)
            vm.borrow_count.push(data.result[i].count)
          }
          vm.TS_look_fn()
        },function(err){
          console.log(err);
        })

        //获取图书信息
        vm.$axios.request("post","oneCard/bookMessageTop5",{startYear:start,endYear:end},function(data){
          vm.msg_name = []
          vm.msg_count = []
          for(var i=data.result.length-1;i>=0;i--){
            vm.msg_name.push(data.result[i].tm)
            vm.msg_count.push(data.result[i].count)
          }
          vm.TS_msg_fn()
        },function(err){
          console.log(err);
        })
      },
      //时间变化
      TS_start_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.TS_start_time = val
          vm.TS_init_fn(vm.TS_start_time,vm.TS_end_time)
        }

      },
      TS_end_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.TS_end_time = val
          vm.TS_init_fn(vm.TS_start_time,vm.TS_end_time)
        }

      },*/
    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);

      //this.proportion_fn()
      //this.china_data_fn()



    },
    created(){
      window.scrollTo(0,0);
      var vm = this
      vm.make_time()
      //获取总消费
      vm.$axios.request("post","oneCard/totalMoney",{date:vm.all_select_year,code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.all_Money = data.result[i].count*10000
        }

      },function(err){
        console.log(err);
      })

      //专业分布
      vm.$axios.request("post","oneCard/specialtyDis",{year:vm.all_select_year,code:vm.code},function(data){
        console.log(data)
        for(var i=0;i<data.result.length;i++){
          if(data.result[i].specialty!=="null"){
            vm.KM_name.push(data.result[i].specialty)
            vm.KM_count.push(parseInt(data.result[i].count*10000))
          }
        }
        vm.chart_title_fn()
      },function(err){
        console.log(err);
      })
      //人员类别
      vm.$axios.request("post","oneCard/personCategory",{date:vm.all_select_year,code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.RY_name.push(data.result[i].type)
          vm.RY_count.push({name:data.result[i].type,value:parseInt(data.result[i].count*10000)})
        }

        vm.person_type_fn()
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
            vm.ZJ_name.push(sex)
            vm.ZJ_count.push({name:sex,value:(data.result[i].count)})
        }
        vm.distribution_fn()
      },function(err){
        console.log(err);
      })

      //一卡通总体消费趋势
      vm.$axios.request("post","oneCard/consumeTrend",{code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.oneCard_count.push(data.result[i].count*10000)
          vm.oneCard_year.push(data.result[i].year)
          vm.countryList.push({name:data.result[i].year+'年',value:data.result[i].count*10000})
        }
        vm.oneCard_max_fn()
      },function(err){
        console.log(err);
      })

      /*//一年十二个月的数据表格
      vm.$axios.request("post","oneCard/monthSumCsonsume",{year:vm.year_data,code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.yearList.push({name:data.result[i].month+'月',value:data.result[i].count*10000})
          vm.oneCard_month.push(data.result[i].month+'月')
          vm.oneCard_month_count.push(data.result[i].count*10000)
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

      //vm.TS_init_fn(vm.TS_start_time,vm.TS_end_time)
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
