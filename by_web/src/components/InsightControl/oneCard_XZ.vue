<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item>浴窒消费金额分析</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5 all_num">
          {{show_year}}年 洗浴总消费:{{all_Money}}万元
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
          各浴室年消费金额分析&nbsp;&nbsp;(单位:万元)
        </h5>
        <div class="ec_height" id="XZ_chart_title">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          人员类别&nbsp;&nbsp;(单位:万元)
        </h5>
        <div class="ec_height" id="XZ_person_type">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          男女比例&nbsp;&nbsp;(单位:人)
        </h5>
        <div class="ec_height" id="XZ_distribution">
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
      <!--一卡通洗浴消费趋势-->
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
          一卡通洗浴消费趋势&nbsp;&nbsp;(单位:万元)
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

    <!--澡堂人均消费echarts以及列表-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5" >
          洗浴人均{{time_flag}}消费分析 &nbsp;&nbsp;(单位:元)
          <div class="ec_h5_data" style="float: right; margin-left: 20px">
            <el-date-picker
              v-show="showMonth"
              class="select_width"
              align="right"
              size='mini'
              format="yyyy"
              @change="avg_time_change"
              v-model="avg_time"
              type="year"
              placeholder="选择年">
            </el-date-picker>

            <el-date-picker
              v-show="showDate"
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM"
              @change="XZ_avg_month_change"
              v-model="XZ_avg_month"
              type="month"
              placeholder="选择月">
            </el-date-picker>

            <el-button size="mini" style="margin-left: 10px" @click="return_year">{{showText}}</el-button>
          </div>
        </h5>
        <div class="ec_height" id="oneCard_XZ_svg">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: -10px">
      <el-col :span="24" class="ec_bg" style="padding-bottom: 50px">
        <h5 class="ec_h5">
          男生洗浴人均{{time_flag}}消费&nbsp;&nbsp;(单位:元)
        </h5>
        <div class="tab_warPer">
          <table v-for="list in boy_list" class="table">
            <tr>
              <td class="black">{{list.name}}</td>
            </tr>
            <tr>
              <td>{{list.value}}</td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: -10px">
      <el-col :span="24" class="ec_bg" style="padding-bottom: 50px">
        <h5  class="ec_h5">
          女生洗浴人均{{time_flag}}消费&nbsp;&nbsp;(单位:元)
        </h5>
        <div class="tab_warPer">
          <table v-for="list in girl_list" class="table">
            <tr>
              <td class="black">{{list.name}}</td>
            </tr>
            <tr>
              <td>{{list.value}}</td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>

    <!--各浴室消费金额分析-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5" >
          各浴室消费金额分析&nbsp;&nbsp;(单位:元)
          <div class="ec_h5_data" style="float: right; margin-left: 20px">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="XY_num_time_S_change"
              v-model="XY_num_time_S"
              type="date"
              placeholder="选择年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="XY_num_time_N_change"
              v-model="XY_num_time_N"
              type="date"
              placeholder="选择月">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="oneCard_XY_num">
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
        isShow:true,
        showMonth:false,
        showDate:true,
        showText:'点击查看月均消费',
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
        keyCode:2,
        all_select_year:'',
        show_year:'',
        code:'211',
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
        year_data:'',
        month_data:'',

        //男女人均消费
        time_flag:'日',
        oneCard_XZ_svg:'',
        avg_time:'',
        XZ_avg_month:'',
        Avg_date:[],
        Avg_count_boy:[],
        Avg_count_girl:[],
        boy_list:[],
        girl_list:[],
        avg_title:[],

        //洗浴地点在时间段的消费人数分析
        oneCard_XY_num:'',
        XY_num_time_S:'2017-01-01',
        XY_num_time_N:'2018-01-01',
        XY_count1:[],
        XY_count2:[],
        XY_count3:[],
        XY_count4:[],
        XY_count5:[],
        XY_name:[],

      }
    },
    methods:{
      time_init(){
        this.all_select_year = time.year
        this.show_year = time.year
        this.year_data = time.year
        this.month_data = time.year + '-' +time.month
        this.avg_time = time.year
        this.XZ_avg_month = time.year + '-' +time.month
        this.XY_num_time_S= time.year + '-' +'01'+'-'+'01'
        this.XY_num_time_N= time.year + '-' +time.month +'-' + time.day
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
          //洗浴地点
          vm.$axios.request("post","oneCard/bathPlaceAna",{year:vm.all_select_year},function(data){

            vm.KM_name = []
            vm.KM_count = []
            for(var i=0;i<data.result.length;i++){
              if(data.result[i].bathplace!=="null"){
                vm.KM_name.push(data.result[i].bathplace)
                vm.KM_count.push(data.result[i].count)
              }
            }
            vm.XZ_chart_title_fn()
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
          vm.XZ_person_type_fn()
        },function(err){
          console.log(err);
        })

        //男女分布
        vm.$axios.request("post","oneCard/sexCsonsume",{year:vm.all_select_year,code:vm.code},function(data){
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
          vm.XZ_distribution_fn()
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
      //洗浴地点
      XZ_chart_title_fn(){
        let XZ_chart_title = this.$echarts.init(document.getElementById('XZ_chart_title'), 'customed');
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
            formatter: "{a} <br/>{b} : {c}万元"
          },
          legend: {
            data: ['洗浴地点分布']
          },
          grid: {
            left: '3%',
            right: '10%',
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
            name: '洗浴地点分布',
            type: 'bar',
            barWidth:30,
            data: this.KM_count,
            label:{
              normal:{
                show: true,
                position: 'right'}
            },
          }]
        };
        XZ_chart_title.setOption(option);
      },
      //人员类别echarts函数
      XZ_person_type_fn(){
        let XZ_person_type = this.$echarts.init(document.getElementById('XZ_person_type'), 'customed');
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

        XZ_person_type.setOption(option);
      },
      //男女比例echarts函数
      XZ_distribution_fn(){
        let XZ_distribution = this.$echarts.init(document.getElementById('XZ_distribution'), 'customed');
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
            data: this.ZJ_name
          },
          series : [
            {
              name: '男女比例',
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

        XZ_distribution.setOption(option);
      },


      //洗浴人均消费分析
      oneCard_XZ_svg_fn(){
        let vm = this
        let option = {
          /*title: {
            text: '提示:点击月份时间点查看当月数据详情',
            textStyle: {
              fontSize: 12,
              color:'#FE0F36'
            },
            left:'80%',
            top:'5%'
          },*/
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
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [this.avg_title[0]+'男生', this.avg_title[0]+'女生'],
            top: 'top',
            textStyle: {
              color: '#fff'
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: vm.Avg_date,
          },
          yAxis: {
            splitLine: {
              lineStyle: {
                // 使用深浅的间隔色
                color: ['#aaa', '#ddd'],
                type :'dashed'
              }
            },

          },
          series: [{
            name: this.avg_title[0]+'男生',
            type: 'line',
            data: vm.Avg_count_boy
          }, {
            name: this.avg_title[0]+'女生',
            type: 'line',
            data: vm.Avg_count_girl
          }]
        };
        this.oneCard_XZ_svg .setOption(option);
        /*this.oneCard_XZ_svg .on('click',function(params){
          setTimeout(function(){
            vm.isShow = true
          },1000)
          let time = ''
          let flag = params.name
          let flag2 = params.name
          flag = flag.slice(1,2)
          flag2 = flag2.slice(2,3)
          if(flag =='日'||flag2 =='日'){
            return
          }else {
            if (parseInt(params.name) < 10) {
              time = vm.avg_time + '-' + '0' + parseInt(params.name)
            } else {
              time = vm.avg_time + '-' + parseInt(params.name)
            }
            //洗浴人均消费男
            vm.$axios.request("post", "oneCard/bathDis", {date: time, flag: '1', sex: '男'}, function (data) {
              vm.Avg_date = []
              vm.Avg_count_boy = []
              vm.boy_list = []
              vm.avg_title = []
              for (var i = 0; i < data.result.length; i++) {
                vm.Avg_date.push(data.result[i].day + '日')
                vm.Avg_count_boy.push(data.result[i].count)
                vm.boy_list.push({name: data.result[i].day + '日', value: data.result[i].count})
              }
              let title = time+ '月人均消费-'
              vm.avg_title.push(title)
              vm.oneCard_XZ_svg_fn()
            }, function (err) {
              console.log(err);
            })

            //洗浴人均消费女
            vm.$axios.request("post", "oneCard/bathDis", {date: time, flag: '1', sex: '女'}, function (data) {
              vm.Avg_count_girl = []
              vm.girl_list = []
              for (var i = 0; i < data.result.length; i++) {
                vm.Avg_count_girl.push(data.result[i].count)
                vm.girl_list.push({name: data.result[i].day + '日', value: data.result[i].count })
              }
              vm.oneCard_XZ_svg_fn()
            }, function (err) {
              console.log(err);
            })
          }
        })*/
      },
      //月均
      avg_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.avg_time = val
          vm.time_flag = '月'
          vm.avg_init_fn(vm.avg_time,'0')
        }

      },
      avg_init_fn(year,flag){
        let vm = this
        //洗浴人均消费男
        vm.$axios.request("post","oneCard/bathDis",{year:year,flag:flag,sex:'男'},function(data){
          vm.Avg_date = []
          vm.Avg_count_boy = []
          vm.boy_list = []
          vm.avg_title = []
          for(var i=0;i<data.result.length;i++){
            vm.Avg_date.push(data.result[i].month+ '月')
            vm.Avg_count_boy.push(data.result[i].count)
            vm.boy_list.push({name:data.result[i].month + '月',value:data.result[i].count})
          }
          let title = vm.avg_time+'年人均消费-'
          vm.avg_title.push(title)
          vm.oneCard_XZ_svg_fn()
        },function(err){
          console.log(err);
        })

        //洗浴人均消费女
        vm.$axios.request("post","oneCard/bathDis",{year:year,flag:flag,sex:'女'},function(data){
          vm.Avg_count_girl = []
          vm.girl_list = []
          for(var i=0;i<data.result.length;i++){
            vm.Avg_count_girl.push(data.result[i].count)
            vm.girl_list.push({name:data.result[i].month + '月',value:data.result[i].count })
          }
          vm.oneCard_XZ_svg_fn()
        },function(err){
          console.log(err);
        })

      },
      //日均
      XZ_avg_month_change(val){
        let vm = this

        if(val == undefined){
          return
        }else{
          vm.time_flag = '日'
          vm.XZ_avg_month = val
          vm.avg_month_init_fn(vm.XZ_avg_month,'1')
        }
      },
      avg_month_init_fn(time,flag){
        let vm = this
        //洗浴人均消费男
        vm.$axios.request("post", "oneCard/bathDis", {date: time, flag: flag, sex: '男'}, function (data) {
          vm.Avg_date = []
          vm.Avg_count_boy = []
          vm.boy_list = []
          vm.avg_title = []
          for (var i = 0; i < data.result.length; i++) {
            vm.Avg_date.push(data.result[i].day + '日')
            vm.Avg_count_boy.push(data.result[i].count)
            vm.boy_list.push({name: data.result[i].day + '日', value: data.result[i].count})
          }
          let title = time+ '月人均消费-'
          vm.avg_title.push(title)
          vm.oneCard_XZ_svg_fn()
        }, function (err) {
          console.log(err);
        })

        //洗浴人均消费女
        vm.$axios.request("post", "oneCard/bathDis", {date: time, flag: flag, sex: '女'}, function (data) {
          vm.Avg_count_girl = []
          vm.girl_list = []
          for (var i = 0; i < data.result.length; i++) {
            vm.Avg_count_girl.push(data.result[i].count)
            vm.girl_list.push({name: data.result[i].day + '日', value: data.result[i].count })
          }
          vm.oneCard_XZ_svg_fn()
        }, function (err) {
          console.log(err);
        })
      },
      return_year(){
        let vm = this
        if(vm.showText == '点击查看月均消费'){
          vm.showMonth = true
          vm.showDate= false
          vm.showText = '点击查看日均消费'
          vm.time_flag = '月'
          vm.avg_init_fn(vm.avg_time,'0')

        }else if( vm.showText == '点击查看日均消费'){
          vm.showMonth = false
          vm.showDate= true
          vm.showText = '点击查看月均消费'
          vm.time_flag = '日'
          vm.avg_month_init_fn(vm.XZ_avg_month,'1')
        }

        /*setTimeout(function(){
          vm.isShow = false
        },1000)
        vm.$axios.request("post", "oneCard/bathDis", {year: vm.avg_time, flag: '0', sex: '男'}, function (data) {
          vm.Avg_date = []
          vm.Avg_count_boy = []
          vm.boy_list = []
          vm.avg_title = []
          for (var i = 0; i < data.result.length; i++) {
            vm.Avg_date.push(data.result[i].month + '月')
            vm.Avg_count_boy.push(data.result[i].count)
            vm.boy_list.push({name: data.result[i].month + '月', value: data.result[i].count })
          }
          let title = vm.avg_time+'年人均消费-'
          vm.avg_title.push(title)
          vm.oneCard_XZ_svg_fn()
        }, function (err) {
          console.log(err);
        })

        //洗浴人均消费女
        vm.$axios.request("post", "oneCard/bathDis", {year: vm.avg_time, flag: '0', sex: '女'}, function (data) {
          vm.Avg_count_girl = []
          vm.girl_list = []
          for (var i = 0; i < data.result.length; i++) {
            vm.Avg_count_girl.push(data.result[i].count)
            vm.girl_list.push({name: data.result[i].month + '月', value: data.result[i].count })
          }

          vm.oneCard_XZ_svg_fn()
        }, function (err) {
          console.log(err);
        })*/
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

      //点击查看年度人均消费
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
              vm.yearList.push({name:data.result[i].month+'月份',value:data.result[i].count+'万元'})
              vm.oneCard_month.push(data.result[i].month+'月')
              vm.oneCard_month_count.push(data.result[i].count)
            }
            vm.oneCard_month_fn()
          },function(err){
            console.log(err);
          })
        }

      },

      //点击查看月度人均消费
      oneCard_date_fn(){
        let vm = this;
        let oneCard_date = this.$echarts.init(document.getElementById('oneCard_date'), 'customed');
        let option = {
          /*title: {
            text: '(单位:元)',
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
            data: [vm.month_data+'月趋势']
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

      //洗浴地点在时间段的消费人数分析
      oneCard_XY_num_fn(){
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
            data:[ '消费金额']
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
              data: this.XY_name,
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
              name:'消费金额',
              type:'bar',
              barWidth:30,
              data:this.XY_count,
            },
          ]
        };
        this.oneCard_XY_num.setOption(option);
      },
      XY_num_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.XY_num_time_N){
          if(this.XY_num_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.XY_num_time_S = ''
            return
          }else{
            this.XY_num_time_S = val
          }
        }else{
          this.XY_num_time_S = val
          this.sum_init_fn(this.XY_num_time_S,this.XY_num_time_N)
        }

      },
      XY_num_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.XY_num_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.XY_num_time_N = ''
          return
        }else{
          this.XY_num_time_N = val
          this.sum_init_fn(this.XY_num_time_S,this.XY_num_time_N)
        }

      },
      sum_init_fn(start,end){
        let vm = this
        vm.$axios.request("post","bath/bathMoneyDayToDay",{startTime:start,endTime:end},function(data){
          vm.XY_name = []
          vm.XY_count = []
          for(var i=0;i<data.result.length;i++){
            vm.XY_name.push(data.result[i].bathplace)
            vm.XY_count.push(data.result[i].count)
          }
          vm.oneCard_XY_num_fn()
        },function(err){
          console.log(err);
        })
      },


    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.oneCard_XZ_svg = this.$echarts.init(document.getElementById('oneCard_XZ_svg'), 'customed');
      this.oneCard_XY_num = this.$echarts.init(document.getElementById('oneCard_XY_num'), 'customed');
      },
    created(){
      window.scrollTo(0,0);
      var vm = this
      vm.time_init()
      //获取人均消费
      vm.$axios.request("post","oneCard/totalMoney",{date:vm.all_select_year,code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.all_Money = data.result[i].count
        }

      },function(err){
        console.log(err);
      })

      //洗浴地点
      vm.$axios.request("post","oneCard/bathPlaceAna",{year:vm.all_select_year},function(data){
        for(var i=0;i<data.result.length;i++){
          if(data.result[i].bathplace!=="null"){
            vm.KM_name.push(data.result[i].bathplace)
            vm.KM_count.push(data.result[i].count)
          }
        }
        vm.XZ_chart_title_fn()
      },function(err){
        console.log(err);
      })
      //人员类别
      vm.$axios.request("post","oneCard/personCategory",{date:vm.all_select_year,code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.RY_name.push(data.result[i].type)
          vm.RY_count.push({name:data.result[i].type,value:(data.result[i].count)})
        }

        vm.XZ_person_type_fn()
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
        vm.XZ_distribution_fn()
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

      /*//一年十二个月的数据表格
      vm.$axios.request("post","oneCard/monthSumCsonsume",{year:vm.year_data,code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.yearList.push({name:data.result[i].month+'月份',value:data.result[i].count})
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
      })
*/
      vm.avg_month_init_fn(vm.XZ_avg_month,'1')



      vm.sum_init_fn(vm.XY_num_time_S,vm.XY_num_time_N)

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
