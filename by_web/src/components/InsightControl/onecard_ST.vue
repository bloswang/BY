<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/control/oneCard' }">一卡通总消费分析</el-breadcrumb-item>
      <el-breadcrumb-item>食堂消费金额分析</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5 all_num">
          {{show_year}}年 食堂总消费:{{all_Money}}万元
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
          各食堂年消费金额分布&nbsp;&nbsp;(单位:万元)
        </h5>
        <div class="ec_height" id="ST_chart_title">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          人员类别&nbsp;&nbsp;(单位:万元)
        </h5>
        <div class="ec_height" id="ST_person_type">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          国别分布TOP10&nbsp;&nbsp;(单位:万元)
        </h5>
        <div class="ec_height" id="ST_distribution">
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
          食堂总体消费趋势&nbsp;&nbsp;(单位:万元)
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


    <!--食堂三餐总消费分析-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5" >
          食堂三餐总消费分析&nbsp;&nbsp;(单位:万元)
          <div class="ec_h5_data" style="float: right; margin-left: 20px">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="ST_sum_time_S_change"
              v-model="ST_sum_time_S"
              type="date"
              placeholder="选择年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="ST_sum_time_N_change"
              v-model="ST_sum_time_N"
              type="date"
              placeholder="选择月">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="oneCard_ST_sum">
        </div>
      </el-col>
    </el-row>
    <!--食堂三餐平均消费分析-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5" >
          食堂三餐平均消费分析&nbsp;&nbsp;(单位:元)
          <div class="ec_h5_data" style="float: right; margin-left: 20px">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="ST_avg_time_S_change"
              v-model="ST_avg_time_S"
              type="date"
              placeholder="选择年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="ST_avg_time_N_change"
              v-model="ST_avg_time_N"
              type="date"
              placeholder="选择月">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="oneCard_ST_svg">
        </div>
      </el-col>
    </el-row>

    <!--各食堂时段内消费总金额-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5" >
          各食堂消费总金额&nbsp;&nbsp;(单位:万元)
          <div class="ec_h5_data" style="float: right; margin-left: 20px">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="ST_room_time_S_change"
              v-model="ST_room_time_S"
              type="date"
              placeholder="选择年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="ST_room_time_N_change"
              v-model="ST_room_time_N"
              type="date"
              placeholder="选择月">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="oneCard_ST_room">
        </div>
      </el-col>
    </el-row>

    <!--各类人员食堂消费分析-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5" >
          各类人员食堂消费分析&nbsp;&nbsp;(单位:万元)
          <div class="ec_h5_data" style="float: right; margin-left: 20px">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="ST_card_time_S_change"
              v-model="ST_card_time_S"
              type="date"
              placeholder="选择年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="ST_card_time_N_change"
              v-model="ST_card_time_N"
              type="date"
              placeholder="选择月">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="oneCard_ST_card">
        </div>
      </el-col>
    </el-row>

    <!--各类人员三餐平均消费分析-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5" >
          各类人员三餐平均消费分析&nbsp;&nbsp;(单位:元)
          <div class="ec_h5_data" style="float: right; margin-left: 20px">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="ST_type_time_S_change"
              v-model="ST_type_time_S"
              type="date"
              placeholder="选择年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="ST_type_time_N_change"
              v-model="ST_type_time_N"
              type="date"
              placeholder="选择月">
            </el-date-picker>
          </div>

          <el-select
            v-model="roomSelect"
            placeholder="请选择"
            size="mini"
            class="major-select select_width"
            @change="room_type_Change">
            <el-option
              v-for="(item,index) in roomList"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </h5>
        <div class="ec_height" id="oneCard_ST_type">
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
        showMonth:false,
        showText:'点击查看月均消费',
        eatSelect:'早餐',
        eat_type_code:'1',
        eatTypeList:['早餐','中餐','晚餐'],
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
        keyCode:1,
        all_select_year:'',
        show_year:'',
        code:'210',
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

        //食堂三餐人均消费
        oneCard_ST_svg:'',
        ST_avg_time_S:'2017-01-01',
        ST_avg_time_N:'2018-01-01',
        Avg_count_zao:[],
        Avg_count_wu:[],
        Avg_count_wan:[],
        Avg_name:[],

        //食堂三餐总消费
        oneCard_ST_sum:'',
        ST_sum_time_S:'2017-01-01',
        ST_sum_time_N:'2018-01-01',
        Sum_count_zao:[],
        Sum_count_wu:[],
        Sum_count_wan:[],
        Sum_name:[],

        //各食堂时段内总消费
        oneCard_ST_room:'',
        ST_room_time_S:'2017-01-01',
        ST_room_time_N:'2018-01-01',
        room_count:[],
        room_name:[],

        //不同卡类别在食堂消费情况
        oneCard_ST_card:'',
        ST_card_time_S:'2017-01-01',
        ST_card_time_N:'2018-01-01',
        card_count1:[],
        card_count2:[],
        card_count3:[],
        card_count4:[],
        card_count5:[],
        card_name:[],

        //不同卡类别在不同食堂早中晚消费情况
        roomSelect:'清晏楼一层',
        roomList:['清晏楼一层','清晏楼二层','家属区食堂','租赁档口','风味档口',],
        oneCard_ST_type:'',
        ST_type_time_S:'2017-01-01',
        ST_type_time_N:'2018-01-01',
        type_count1:[],
        type_count2:[],
        type_count3:[],
        type_count4:[],
        type_count5:[],
        type_name:[],
      }
    },
    methods:{
      make_time(){
          this.all_select_year = time.year
          this.show_year  = time.year
          this.year_data= time.year
          this.month_data= time.year + '-' + time.month
          this.ST_avg_time_S= time.year + '-' + '01'+ '-' +'01'
          this.ST_avg_time_N= time.year + '-' + time.month + '-'+ time.day
          this.ST_sum_time_S= time.year + '-' + '01'+ '-' +'01'
          this.ST_sum_time_N= time.year + '-' + time.month + '-'+ time.day
          this.ST_room_time_S= time.year + '-' + '01'+ '-' +'01'
          this.ST_room_time_N= time.year + '-' + time.month + '-'+ time.day
          this.ST_card_time_S= time.year + '-' + '01'+ '-' +'01'
          this.ST_card_time_N= time.year + '-' + time.month + '-'+ time.day
          this.ST_type_time_S= time.year + '-' + '01'+ '-' +'01'
          this.ST_type_time_N= time.year + '-' + time.month + '-'+ time.day
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
          vm.ST_person_type_fn()
        },function(err){
          console.log(err);
        })

        //食堂消费分布
        vm.$axios.request("post","oneCard/canteenMoneyDis",{year:time},function(data){
          vm.KM_name = []
          vm.KM_count = []
          for(var i=0;i<data.result.length;i++){
            vm.KM_name.push(data.result[i].canteen)
            vm.KM_count.push(data.result[i].money)
          }
          vm.ST_chart_title_fn()
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
          vm.ST_distribution_fn()
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

      //食堂分类echarts函数
      ST_chart_title_fn(){
        let ST_chart_title = this.$echarts.init(document.getElementById('ST_chart_title'), 'customed');
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
              type: 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}万元"
          },
          legend: {
            data: ['食堂分布']
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
            name: '食堂分布',
            type: 'bar',
            data: this.KM_count,
            label: {
              normal: {
                show: true,
                position: 'right'
              }
            },
          }]
        };
        ST_chart_title.setOption(option);
      },
      //人员类别echarts函数
      ST_person_type_fn(){
        let ST_person_type = this.$echarts.init(document.getElementById('ST_person_type'), 'customed');
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

        ST_person_type.setOption(option);
      },
      //专业比例echart函数

      //国别分布echarts函数
      ST_distribution_fn(){
        let ST_distribution = this.$echarts.init(document.getElementById('ST_distribution'), 'customed');
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

        ST_distribution.setOption(option);
      },


      //食堂三餐总消费分析
      oneCard_ST_sum_fn(){
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
            data:['早餐','午餐','晚餐']
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
              data: this.Sum_name,
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
              name:'早餐',
              type:'bar',
              barWidth:30,
              data:this.Sum_count_zao,
            },
            {
              name:'午餐',
              type:'bar',
              barWidth:30,
              data:this.Sum_count_wu,
            },
            {
              name:'晚餐',
              type:'bar',
              barWidth:30,
              data:this.Sum_count_wan,
            }
          ]
        };
        this.oneCard_ST_sum.setOption(option);
      },
      ST_sum_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.ST_sum_time_N){
          if(this.ST_sum_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.ST_sum_time_S = ''
            return
          }else{
            this.ST_sum_time_S = val
          }
        }else{
          this.ST_sum_time_S = val
          this.sum_init_fn(this.ST_sum_time_S,this.ST_sum_time_N)
        }

      },
      ST_sum_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.ST_sum_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.ST_sum_time_N = ''
          return
        }else{
          this.ST_sum_time_N = val
          this.sum_init_fn(this.ST_sum_time_S,this.ST_sum_time_N)
        }

      },
      sum_init_fn(start,end){
        let vm = this
        //早餐
        vm.$axios.request("post","oneCard/canteenRepastDis",{startTime:start,endTime:end,different:'1'},function(data){
          vm.Sum_name = []
          vm.Sum_count_zao = []
          for(var i=0;i<data.result.length;i++){
            vm.Sum_name.push(data.result[i].canteenname)
            vm.Sum_count_zao.push(data.result[i].count)
          }
          vm.oneCard_ST_sum_fn()
        },function(err){
          console.log(err);
        })
        //午餐
        vm.$axios.request("post","oneCard/canteenRepastDis",{startTime:start,endTime:end,different:'2'},function(data){
          vm.Sum_count_wu = []
          for(var i=0;i<data.result.length;i++){
            vm.Sum_count_wu.push(data.result[i].count)
          }
          vm.oneCard_ST_sum_fn()
        },function(err){
          console.log(err);
        })
        //晚餐
        vm.$axios.request("post","oneCard/canteenRepastDis",{startTime:start,endTime:end,different:'3'},function(data){
          vm.Sum_count_wan= []
          for(var i=0;i<data.result.length;i++){
            vm.Sum_count_wan.push(data.result[i].count)
          }
          vm.oneCard_ST_sum_fn()
        },function(err){
          console.log(err);
        })

      },

      //食堂三餐平均消费分析
      oneCard_ST_svg_fn(){
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
            data:['早餐','午餐','晚餐']
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
              data: this.Avg_name,
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
              name:'早餐',
              type:'bar',
              barWidth:30,
              data:this.Avg_count_zao,
            },
            {
              name:'午餐',
              type:'bar',
              barWidth:30,
              data:this.Avg_count_wu,
            },
            {
              name:'晚餐',
              type:'bar',
              barWidth:30,
              data:this.Avg_count_wan,
            }
          ]
        };
        this.oneCard_ST_svg.setOption(option);
      },
      ST_avg_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.ST_avg_time_N){
          if(this.ST_avg_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.ST_avg_time_S = ''
            return
          }else{
            this.ST_avg_time_S = val
          }
        }else{
          this.ST_avg_time_S = val
          this.svg_init_fn(this.ST_avg_time_S,this.ST_avg_time_N)
        }

      },
      ST_avg_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.ST_avg_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.ST_avg_time_N = ''
          return
        }else{
          this.ST_avg_time_N = val
          this.svg_init_fn(this.ST_avg_time_S,this.ST_avg_time_N)
        }

      },
      svg_init_fn(start,end){
        let vm = this
        //早餐
        vm.$axios.request("post","oneCard/canteenDis",{startTime:start,endTime:end,different:'1'},function(data){
          vm.Avg_name = []
          vm.Avg_count_zao = []
          for(var i=0;i<data.result.length;i++){
            vm.Avg_name.push(data.result[i].canteenname)
            vm.Avg_count_zao.push(data.result[i].count)
          }
          vm.oneCard_ST_svg_fn()
        },function(err){
          console.log(err);
        })
        //午餐
        vm.$axios.request("post","oneCard/canteenDis",{startTime:start,endTime:end,different:'2'},function(data){
          vm.Avg_count_wu = []
          for(var i=0;i<data.result.length;i++){
            vm.Avg_count_wu.push(data.result[i].count)
          }
          vm.oneCard_ST_svg_fn()
        },function(err){
          console.log(err);
        })
        //晚餐
        vm.$axios.request("post","oneCard/canteenDis",{startTime:start,endTime:end,different:'3'},function(data){
          vm.Avg_count_wan= []
          for(var i=0;i<data.result.length;i++){
            vm.Avg_count_wan.push(data.result[i].count)
          }
          vm.oneCard_ST_svg_fn()
        },function(err){
          console.log(err);
        })

      },

      //各食堂总消费分析
      oneCard_ST_room_fn(){
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
            data:['消费金额']
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
              data: this.room_name,
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
              data:this.room_count,
            },
          ]
        };
        this.oneCard_ST_room.setOption(option);
      },
      ST_room_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.ST_room_time_N){
          if(this.ST_room_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.ST_room_time_S = ''
            return
          }else{
            this.ST_room_time_S = val
          }
        }else{
          this.ST_room_time_S = val
          this.room_init_fn(this.ST_room_time_S,this.ST_room_time_N)
        }

      },
      ST_room_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.ST_room_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.ST_room_time_N = ''
          return
        }else{
          this.ST_room_time_N = val
          this.room_init_fn(this.ST_room_time_S,this.ST_room_time_N)
        }

      },
      room_init_fn(start,end){
        let vm = this
        vm.$axios.request("post","canteen/canteenConsumeDis",{startTime:start,endTime:end},function(data){
          vm.room_name = []
          vm.room_count = []
          console.log(data)
          for(var i=0;i<data.result.length;i++){
            vm.room_name.push(data.result[i].canteenname)
            vm.room_count.push(data.result[i].count)
          }
          vm.oneCard_ST_room_fn()
        },function(err){
          console.log(err);
        })
      },

      //不同卡类别在不同食堂消费
      oneCard_ST_card_fn(){
        let vm = this
        let  option = {
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
            data: this.card_name,
            boundaryGap: false,
          },
          yAxis: {
            name: '金额',
            type: 'value'
          },
          series: [
            {
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
              data: this.card_count3,
            },{
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
            data: this.card_count1,
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
            data: this.card_count2,
          },{
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
            data: this.card_count4,
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
            data: this.card_count5,
          }, ]
        }
        this.oneCard_ST_card.setOption(option);
      },
      ST_card_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.ST_card_time_N){
          if(this.ST_card_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.ST_card_time_S = ''
            return
          }else{
            this.ST_card_time_S = val
          }
        }else{
          this.ST_card_time_S = val
          this.card_init_fn(this.ST_card_time_S,this.ST_card_time_N)
        }

      },
      ST_card_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.ST_card_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.ST_card_time_N = ''
          return
        }else{
          this.ST_card_time_N = val
          this.card_init_fn(this.ST_card_time_S,this.ST_card_time_N)
        }

      },
      card_init_fn(start,end){
        let vm = this
        /*中国学生卡*/
        vm.$axios.request("post","oneCard/canteenCardConsume",{startTime:start,endTime:end,cardType:'中国学生卡'},function(data){
          vm.card_name = []
          vm.card_count1 = []
          for(var i=0;i<data.result.length;i++){
            vm.card_name.push(data.result[i].canteenname)
            vm.card_count1.push(data.result[i].count)
          }
          vm.oneCard_ST_card_fn()
        },function(err){
          console.log(err);
        })
        /*国际学生卡*/
        vm.$axios.request("post","oneCard/canteenCardConsume",{startTime:start,endTime:end,cardType:'国际学生卡'},function(data){
          vm.card_count2 = []
          for(var i=0;i<data.result.length;i++){
            vm.card_count2.push(data.result[i].count)
          }
          vm.oneCard_ST_card_fn()
        },function(err){
          console.log(err);
        })
        /*教工卡*/
        vm.$axios.request("post","oneCard/canteenCardConsume",{startTime:start,endTime:end,cardType:'教工卡'},function(data){
          vm.card_count3 = []
          for(var i=0;i<data.result.length;i++){
            vm.card_count3.push(data.result[i].count)
          }
          vm.oneCard_ST_card_fn()
        },function(err){
          console.log(err);
        })
        /*学员卡*/
        vm.$axios.request("post","oneCard/canteenCardConsume",{startTime:start,endTime:end,cardType:'学员卡'},function(data){
          vm.card_count4 = []
          for(var i=0;i<data.result.length;i++){
            vm.card_count4.push(data.result[i].count)
          }
          vm.oneCard_ST_card_fn()
        },function(err){
          console.log(err);
        })
        /*员工卡*/
        vm.$axios.request("post","oneCard/canteenCardConsume",{startTime:start,endTime:end,cardType:'员工卡'},function(data){
          vm.card_count5 = []
          for(var i=0;i<data.result.length;i++){
            vm.card_count5.push(data.result[i].count)
          }
          vm.oneCard_ST_card_fn()
        },function(err){
          console.log(err);
        })
      },

      //不同卡类别在不同食堂早中晚消费
      oneCard_ST_type_fn(){
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
            data:['早餐','午餐','晚餐']
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
              data: this.type_name,
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
              name:'早餐',
              type:'bar',
              barWidth:30,
              itemStyle:{
                normal:{
                  color: "#FFC502" //图标颜色
                }
              },
              data:this.type_count1,
            },
            {
              name:'午餐',
              type:'bar',
              barWidth:30,
              itemStyle:{
                normal:{
                  color: "#0DFF87" //图标颜色
                }
              },
              data:this.type_count2,
            },
            {
              name:'晚餐',
              type:'bar',
              barWidth:30,
              itemStyle:{
                normal:{
                  color: "#29BCFF" //图标颜色
                }
              },
              data:this.type_count3,
            }
          ]
        };
        this.oneCard_ST_type.setOption(option);
      },
      ST_type_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.ST_type_time_N){
          if(this.ST_type_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.ST_type_time_S = ''
            return
          }else{
            this.ST_type_time_S = val
          }
        }else{
          this.ST_type_time_S = val
          this.type_init_fn(this.ST_type_time_S,this.ST_type_time_N,this.roomSelect)
        }

      },
      ST_type_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.ST_type_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.ST_type_time_N = ''
          return
        }else{
          this.ST_type_time_N = val
          this.type_init_fn(this.ST_type_time_S,this.ST_type_time_N,this.roomSelect)
        }

      },
      room_type_Change(val){
        let vm = this
        vm.roomSelect = val
        this.type_init_fn(this.ST_type_time_S,this.ST_type_time_N,this.roomSelect)
      },
      type_init_fn(start,end,room){
        let vm = this
        /*中国学生卡*/
        vm.$axios.request("post","oneCard/diningCardConsume",{startTime:start,endTime:end,flag:'1',canteenname:room},function(data){
          vm.type_name = []
          vm.type_count1 = []
          for(var i=0;i<data.result.length;i++){
            vm.type_name.push(data.result[i].cardtype)
            vm.type_count1.push(data.result[i].count)
          }
          vm.oneCard_ST_type_fn()
        },function(err){
          console.log(err);
        })
        /*国际学生卡*/
        vm.$axios.request("post","oneCard/diningCardConsume",{startTime:start,endTime:end,flag:'2',canteenname:room},function(data){
          vm.type_count2 = []
          for(var i=0;i<data.result.length;i++){
            vm.type_count2.push(data.result[i].count)
          }
          vm.oneCard_ST_type_fn()
        },function(err){
          console.log(err);
        })
        /*教工卡*/
        vm.$axios.request("post","oneCard/diningCardConsume",{startTime:start,endTime:end,flag:'3',canteenname:room},function(data){
          vm.type_count3 = []
          for(var i=0;i<data.result.length;i++){
            vm.type_count3.push(data.result[i].count)
          }
          vm.oneCard_ST_type_fn()
        },function(err){
          console.log(err);
        })
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
          title: {
            text: '单位(元)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
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
    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.oneCard_ST_svg = this.$echarts.init(document.getElementById('oneCard_ST_svg'), 'customed');
      this.oneCard_ST_sum = this.$echarts.init(document.getElementById('oneCard_ST_sum'), 'customed');
      this.oneCard_ST_room = this.$echarts.init(document.getElementById('oneCard_ST_room'), 'customed');
      this.oneCard_ST_card = this.$echarts.init(document.getElementById('oneCard_ST_card'), 'customed');
      this.oneCard_ST_type = this.$echarts.init(document.getElementById('oneCard_ST_type'), 'customed');
      },
    created(){
      window.scrollTo(0,0);
      var vm = this
      //获取总消费
      vm. make_time()
      vm.$axios.request("post","oneCard/totalMoney",{date:vm.all_select_year,code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.all_Money = data.result[i].count
        }

      },function(err){
        console.log(err);
      })

      //食堂消费分布
      vm.$axios.request("post","oneCard/canteenMoneyDis",{year:vm.all_select_year},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.KM_name.push(data.result[i].canteen)
          vm.KM_count.push(data.result[i].money)
        }
        vm.ST_chart_title_fn()
      },function(err){
        console.log(err);
      })
      //人员类别
      vm.$axios.request("post","oneCard/personCategory",{date:vm.all_select_year,code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.RY_name.push(data.result[i].type)
          vm.RY_count.push({name:data.result[i].type,value:(data.result[i].count)})
        }

        vm.ST_person_type_fn()
      },function(err){
        console.log(err);
      })
      //国别分布
      vm.$axios.request("post","oneCard/countryDis",{year:vm.all_select_year,code:vm.code},function(data){
        for(let i = data.result.length-1 ; i >= 0; i--){
          vm.ZJ_name.push(data.result[i].country)
          vm.ZJ_count.push(data.result[i].money)
        }
        vm.ST_distribution_fn()
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
      vm.svg_init_fn(vm.ST_avg_time_S,vm.ST_avg_time_N)
      vm.sum_init_fn(vm.ST_sum_time_S,vm.ST_sum_time_N)
      vm.room_init_fn(vm.ST_room_time_S,vm.ST_room_time_N)
      vm.card_init_fn(vm.ST_card_time_S,vm.ST_card_time_N)
      vm.type_init_fn(vm.ST_type_time_S,vm.ST_type_time_N,vm.roomSelect)
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
