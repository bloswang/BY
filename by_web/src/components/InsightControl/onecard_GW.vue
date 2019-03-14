<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/control/oneCard' }">一卡通总消费分析</el-breadcrumb-item>
      <el-breadcrumb-item>商户消费金额分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5 all_num">
          {{show_year}}年 商户总消费:{{all_Money}}万元
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
          商户分类&nbsp;&nbsp;(单位:万元)
        </h5>
        <div class="ec_height" id="GW_chart_title">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          人员类别&nbsp;&nbsp;(单位:万元)
        </h5>
        <div class="ec_height" id="GW_person_type">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          男女比例&nbsp;&nbsp;(单位:人)
        </h5>
        <div class="ec_height" id="GW_distribution">
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
      <!--<el-col :span="4" class="ec_bg btn" key="index">
        <div>
          <router-link to="/home/control/oneCard_XZ">
            <img :src='"../../assets/img/btn2.png"' alt="" class="btn_to">
          </router-link>
          <h5 class="btn_text">洗浴</h5>
        </div>
      </el-col>
      <el-col :span="4" class="ec_bg btn" key="index">
        <div>
          <router-link to="/home/control/oneCard_ST">
            <img :src='"../../assets/img/btn3.png"' alt="" class="btn_to">
          </router-link>
          <h5 class="btn_text">食堂</h5>
        </div>
      </el-col>
      <el-col :span="4" class="ec_bg btn" key="index">
        <div>
          <router-link to="/home/control/oneCard_RD">
            <img :src='"../../assets/img/btn4.png"' alt="" class="btn_to">
          </router-link>
          <h5 class="btn_text">上网热点</h5>
        </div>
      </el-col>
      <el-col :span="4" class="ec_bg btn" key="index">
        <div>
          <router-link to="/home/control/oneCard_GW">
            <img :src='"../../assets/img/btn5.png"' alt="" class="btn_to">
          </router-link>
          <h5 class="btn_text">商户购物</h5>
        </div>
      </el-col>
      <el-col :span="4" class="ec_bg btn" key="index">
        <div>
          <router-link to="/home/control/oneCard_TSG">
            <img :src='"../../assets/img/btn6.png"' alt="" class="btn_to">
          </router-link>
          <h5 class="btn_text">图书馆</h5>
        </div>
      </el-col>-->
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
          一卡通商户消费趋势&nbsp;&nbsp;(单位:万元)
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

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          商户消费人数趋势&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="Supermarket_time"
              type="year"
              format="yyyy"
              @change="Supermarket_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="diningRoom_num">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          人均消费分析&nbsp;&nbsp;(单位:万元)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="people_Average_time"
              type="year"
              format="yyyy"
              @change="people_Average_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="people_Average">
        </div>
      </el-col>
    </el-row>
    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          刷卡金额分析
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="slot_card_time"
              type="year"
              format="yyyy"
              @change="slot_card_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height1" id="diningRoom_hot">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          人均刷卡次数分析
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="number_times_time"
              type="year"
              format="yyyy"
              @change="number_times_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height1" id="number_times">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          男女比例
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="people_type_time"
              type="year"
              format="yyyy"
              @change="people_type_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="people_type">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          国别比例TOP5
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="country_type_start_time"
              type="month"
              format="yyyy-MM"
              @change="country_start_time_change"
              placeholder="开始时间">
            </el-date-picker>
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="country_type_end_time"
              type="month"
              format="yyyy-MM"
              @change="country_end_time_change"
              placeholder="开始时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="country_type">
        </div>
      </el-col>
    </el-row>-->
    <!--商户前十后十-->
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          商户消费前十名分析&nbsp;&nbsp;(单位:元)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="ten1_start"
              type="date"
              format="yyyy-MM-dd"
              @change="ten1_start_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="ten1_end"
              type="date"
              format="yyyy-MM-dd"
              @change="ten1_end_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="diningRoom_list"></div>
      </el-col>
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          商户消费后十名分析&nbsp;&nbsp;(单位:元)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="ten_start"
              type="date"
              format="yyyy-MM-dd"
              @change="ten_start_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="ten_end"
              type="date"
              format="yyyy-MM-dd"
              @change="ten_end_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="diningRoom_last">
        </div>
      </el-col>
    </el-row>


    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          学历比例&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="education_start_time"
              type="date"
              format="yyyy-MM-dd"
              @change="education_start_time_change"
              placeholder="选择时间">
            </el-date-picker>
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="education_end_time"
              type="date"
              format="yyyy-MM-dd"
              @change="education_end_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="education_type">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          年龄比例&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="CS_age_type_time_start"
              type="date"
              format="yyyy-MM-dd"
              @change="CS_age_type_time_start_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="CS_age_type_time_end"
              type="date"
              format="yyyy-MM-dd"
              @change="CS_age_type_time_end_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="CS_age_type">
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
        keyCode:3,
        all_select_year:'',
        show_year:'',
        code:'215',
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
        //商户消费转移过来的内容
        Supermarket_time:'2017',
        people_Average_time:'2017',
        education_start_time:'2017-01-01',
        education_end_time:'2018-01-01',
        CS_age_type_time_start:'2017-01-01',
        CS_age_type_time_end:'2018-01-01',

        supermarket_data:[],
        supermarket_time:[],
        slot_card_count:[],
        slot_card_day:[],
        slot_card_num:[],
        slot_card_num_day:[],
        slot_card_Average:[],
        slot_card_Average_day:[],
        person_sex:[],
        person_count:[],
        country_type:[],
        country_count:[],
        education_type:[],
        education_count:[],
        XL_type:[],
        XL_count:[],
        CS_age_type:[],
        CS_age_count:[],

        eatSelect:'早餐',
        eat_code:'1',
        eatTypeList:['早餐','午餐','晚餐'],

        ten_start:'2017-01-01',
        ten_end:'2017-12-30',
        list_count:[],
        list_name:[],
        ten1_start:'2017-01-01',
        ten1_end:'2017-12-30',
        last_count:[],
        last_name:[]
      }
    },
    methods:{
      time_init(){
        this.all_select_year = time.year;
        this.show_year = time.year;
        this.year_data= time.year;
        this.month_data= time.year + '-' + time.month;
        this.Supermarket_time = time.year
        this.people_Average_time = time.year
        this.education_start_time= time.year + '-' +'01'+'-'+'01'
        this.education_end_time= time.year + '-' +time.month+'-'+time.day
        this.CS_age_type_time_start= time.year + '-' +'01'+'-'+'01'
        this.CS_age_type_time_end= time.year + '-' +time.month+'-'+time.day
        this.ten_start= time.year + '-' +'01'+'-'+'01'
        this.ten_end= time.year + '-' +time.month+'-'+time.day
        this.ten1_start= time.year + '-' +'01'+'-'+'01'
        this.ten1_end= time.year + '-' +time.month+'-'+time.day
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
          //商户分类
          vm.$axios.request("post","oneCard/commercialAna",{year:vm.all_select_year},function(data){
            vm.KM_name = []
            vm.KM_count = []
            for(var i=0;i<data.result.length;i++){
              if(data.result[i].commercial!=="null"){
                vm.KM_name.push(data.result[i].commercial)
                vm.KM_count.push(data.result[i].count)
              }
            }
            vm.GW_chart_title_fn()
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
          vm.GW_person_type_fn()
        },function(err){
          console.log(err);
        })

        //男女分布
        vm.$axios.request("post","oneCard/sexCsonsume",{year:time,code:code},function(data){
          vm.ZJ_name =[]
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
          vm.GW_distribution_fn()
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

      //商户分类
      GW_chart_title_fn(){
        let GW_chart_title = this.$echarts.init(document.getElementById('GW_chart_title'), 'customed');
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
            data: ['商户分类']
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
            name: '商户分类',
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
        GW_chart_title.setOption(option);
      },
      //人员类别echarts函数
      GW_person_type_fn(){
        let GW_person_type = this.$echarts.init(document.getElementById('GW_person_type'), 'customed');
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

        GW_person_type.setOption(option);
      },
      //男女分布echarts函数
      GW_distribution_fn(){
        let GW_distribution = this.$echarts.init(document.getElementById('GW_distribution'), 'customed');
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
            formatter: "{a} <br/>{b} : {c}人 ({d}%)"
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
                  formatter: '{b}：{c}人'
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

        GW_distribution.setOption(option);
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

      //商户新一过来的方法
      //商户消费趋势echarts函数
      Supermarket_num_fn(){
        let diningRoom_num = this.$echarts.init(document.getElementById('diningRoom_num'), 'customed');
        let option = {
          /*title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'10%'
          },*/
          color: ['#3398DB'],
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
              data : this.supermarket_time,
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
          series : [
            {
              name:'消费人数',
              type:'bar',
              barWidth: '60%',
              data:this.supermarket_data
            }
          ]
        };
        diningRoom_num.setOption(option);
      },
      //商户消费趋势时间时的函数
      Supermarket_time_change(val){
        if(val == undefined){
          return
        }else{
          this.Supermarket_time = val
          this.Supermarket_fn(this.Supermarket_time)
        }

      },
      Supermarket_fn(time){
        let vm = this;
        //商户总消费金额分布
        vm.$axios.request("post","supermarketConsume/timeConsume",{year:time,flag:'0'},function(data){
          vm.supermarket_data = []
          vm.supermarket_time = []
          for(var i=0;i<data.result.length;i++){
            vm.supermarket_data.push(data.result[i].count)
            vm. supermarket_time.push(data.result[i].month+'月')
          }
          vm.Supermarket_num_fn()
        },function(err){
          console.log(err);
        })
      },

      //人均消费echarts函数
      people_Average_fn(){
        let people_Average = this.$echarts.init(document.getElementById('people_Average'), 'customed');
        let option = {
          /*title: {
            text: '单位(元)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'10%'
          },*/
          //color: ['#9BDB57'],
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
            data: ['人均消费']
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
            data: this.slot_card_Average_day
          }],
          yAxis: [{
            type: 'value'
          }],
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
          series: [{
            name: '人均消费',
            type: 'line',
            stack: '总量',
            smooth:false,
            itemStyle : {
              normal : {
                color:'#A84BBB',
                lineStyle:{
                  color:'#A84BBB'
                }
              }
            },
            data: this.slot_card_Average
          }]
        };
        people_Average.setOption(option);
      },
      //人均消费选择时间函数
      people_Average_time_change(val){
        var vm = this
        if(val == undefined){
          return
        }else{
          vm.people_Average_time = val
          //人均消费分布
          vm.$axios.request("post","supermarketConsume/averageConsume",{year:vm.people_Average_time,flag:'0'},function(data){
            vm.slot_card_Average = []
            vm.slot_card_Average_day = []
            for(var i=0;i<data.result.length;i++){
              vm.slot_card_Average.push(data.result[i].count)
              vm.slot_card_Average_day.push(data.result[i].month+'月')
            }
            vm.people_Average_fn()
          },function(err){
            console.log(err);
          })
        }

      },

      /*
       //刷卡金额echarts函数
       slot_card_fn(){
         let diningRoom_hot = this.$echarts.init(document.getElementById('diningRoom_hot'), 'customed');
         let option = {
           title: {
             text: '单位(万元)',
             textStyle: {
               fontSize: 12,
             },
             left:'90%',
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
           legend: {
             data: ['刷卡金额']
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
             data: this.slot_card_day
           }],
           yAxis: [{
             type: 'value'
           }],
           series: [{
             name: '刷卡金额',
             type: 'line',
             stack: '总量',
             smooth:false,
             itemStyle : {
               normal : {
                 color:'#00B600',
                 lineStyle:{
                   color:'#00B600'
                 }
               }
             },
             data: this.slot_card_count
           }]
         };
         diningRoom_hot.setOption(option);
       },
       //刷卡金额选择时间时的函数
       slot_card_time_change(val){
         var vm = this
         if(val == undefined){
           return
         }else{
           vm.slot_card_time = val
           //刷卡金额分布
           vm.$axios.request("post","supermarketConsume/cardMoney",{year:vm.slot_card_time,flag:'0'},function(data){
             vm.slot_card_count=[]
             vm. slot_card_day=[]
             for(var i=0;i<data.result.length;i++){
               vm.slot_card_count.push(data.result[i].count)
               vm. slot_card_day.push(data.result[i].month+'月')
             }
             vm.slot_card_fn()
           },function(err){
             console.log(err);
           })
         }

       },
       //人均刷卡次数echarts函数
       number_times_fn(){
         let number_times = this.$echarts.init(document.getElementById('number_times'), 'customed');
         let option = {
           title: {
             text: '单位(次)',
             textStyle: {
               fontSize: 12,
             },
             left:'90%',
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
           legend: {
             data: ['人均刷卡次数']
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
             data: this.slot_card_num_day
           }],
           yAxis: [{
             type: 'value'
           }],
           series: [{
             name: '人均刷卡次数',
             type: 'line',
             stack: '总量',
             smooth:false,
             itemStyle : {
               normal : {
                 color:'#BB8C1A',
                 lineStyle:{
                   color:'#BB8C1A'
                 }
               }
             },
             data: this.slot_card_num
           }]
         };
         number_times.setOption(option);
       },
       //刷卡次数选择时间时的函数
       number_times_time_change(val){
         var vm = this
         if(val == undefined){
           return
         }else{
           vm.number_times_time = val
           //刷卡次数分布
           vm.$axios.request("post","supermarketConsume/cardCount",{year:vm.number_times_time,flag:'0'},function(data){
             vm.slot_card_num = []
             vm.slot_card_num_day =[]
             for(var i=0;i<data.result.length;i++){
               vm.slot_card_num.push(data.result[i].count)
               vm.slot_card_num_day.push(data.result[i].month+'月')
             }
             vm.number_times_fn()
           },function(err){
             console.log(err);
           })
         }

       },
       //男女比例
       people_type_fn(){
         let people_type = this.$echarts.init(document.getElementById('people_type'), 'customed');
         let option = {
           title: {
             text: '单位(人)',
             textStyle: {
               fontSize: 12,
             },
             left:'90%',
             top:'5%'
           },
           tooltip : {
             trigger: 'item',
             formatter: "{a} <br/>{b} : {c} ({d}%)"
           },
           legend: {
             orient: 'vertical',
             left: 'left',
             data: this.person_sex
           },
           series : [
             {
               name: '男女比例',
               type: 'pie',
               radius : '55%',
               center: ['50%', '60%'],
               data:this.person_count,
               label: {
                 normal: {
                   show: true,
                   formatter: '{b} : {c}  ({d}%)'
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

         people_type.setOption(option);
       },
       people_type_time_change(val){
         var vm = this
         if(val == undefined){
           return
         }else{
           vm.people_type_time = val
           //男女比例
           vm.$axios.request("post","supermarketConsume/getSupermarketSex",{year:vm.people_type_time},function(data){
             vm.person_sex = []
             vm.person_count = []
             for(var i=0;i<data.result.length;i++){
               vm.person_sex.push(data.result[i].sex)
               vm.person_count.push({value:data.result[i].count,name:data.result[i].sex})
             }
             vm.people_type_fn()
           },function(err){
             console.log(err);
           })
         }

       },
       //国别比例
       country_type_fn(){
         let country_type = this.$echarts.init(document.getElementById('country_type'), 'customed');
         let option = {
           color:['#A9FBBA'],
           title: {
             text: '单位(人)',
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
             formatter: "{a} <br/>{b} : {c}"
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
             data: this.country_type
           },
           series: [{
             name: '国别分布',
             type: 'bar',
             data: this.country_count,
             label: {
               normal: {
                 show: true,
                 position: 'right'
               }
             },
           }]
         };

         country_type.setOption(option);
       },
       country_start_time_change(val){
         if(val == undefined){
           return
         }else if(val >this.country_type_end_time){
           if(this.country_type_end_time!==''){
             this.$message.error('开始时间不能大于结束时间哦！');
             this.country_type_start_time = ''
             return
           }else{
             this.country_type_start_time = val
           }
         }else{
           this.country_type_start_time = val
           this.country_JK_fn(this.country_type_start_time,this.country_type_end_time)
         }

       },
       country_end_time_change(val){
         if(val == undefined){
           return
         }else if(val<this.country_type_start_time){
           this.$message.error('结束时间不能小于开始时间哦！');
           this.country_type_end_time = ''
           return
         }else{
           this.country_type_end_time = val
           this.country_JK_fn(this.country_type_start_time,this.country_type_end_time)
         }

       },
       country_JK_fn(start,end){
         var vm = this
         vm.$axios.request("post","supermarketConsume/countryRatio",{startTime:start,endTime:end},function(data){
           vm.country_type = []
           vm.country_count = []
           for(let i = data.result.length-1 ; i >= 0; i--){
             vm.country_type.push(data.result[i].country)
             vm.country_count.push(data.result[i].count)
           }
           vm.country_type_fn()
         },function(err){
           console.log(err);
         })
       },
 */


      //学历比例
      education_type_fn(){
        let education_type = this.$echarts.init(document.getElementById('education_type'), 'customed');
        let option = {
          /*title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },*/
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.XL_type
          },
          series : [
            {
              name: '学历名称',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.XL_count,
              label: {
                normal: {
                  show: true,
                  formatter: '{b} : {c}  ({d}%)'
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
        education_type.setOption(option);
      },
      education_start_time_change(val){
        let vm= this
        if(val == undefined){
          return
        }else if(val >this.education_end_time){
          if(this.education_end_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.education_start_time = ''
            return
          }else{
            this.education_start_time = val
          }
        }else{
          vm.education_start_time = val
          vm.education_fn(vm.education_start_time,vm.education_end_time)
        }

      },
      education_end_time_change(val){
        let vm= this
        if(val == undefined){
          return
        }else if(val<this.education_start_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.education_end_time = ''
          return
        }else{
          vm.education_end_time = val
          vm.education_fn(vm.education_start_time,vm.education_end_time)
        }

      },
      education_fn(start,end){
        let vm = this
        //学历比例
        vm.$axios.request("post","supermarketConsume/staffCategory",{startTime:start,endTime:end},function(data){
          vm.XL_type = []
          vm.XL_count = []
          for(var i=0;i<data.result.length;i++){
            vm.XL_type.push(data.result[i].type)
            vm.XL_count.push({name:data.result[i].type,value:data.result[i].count})
          }
          vm.education_type_fn()
        },function(err){
          console.log(err);
        })
      },
      //年龄比例
      CS_age_type_fn(){
        let CS_age_type = this.$echarts.init(document.getElementById('CS_age_type'), 'customed');
        let option = {
          /*title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },*/
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.CS_age_type
          },
          series : [
            {
              name: '年龄比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.CS_age_count,
              label: {
                normal: {
                  show: true,
                  formatter: '{b} : {c}  ({d}%)'
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
        CS_age_type.setOption(option);
      },
      CS_age_type_time_start_change(val){
        if(val == undefined){
          return
        }else if(val >this.CS_age_type_time_end){
          if(this.CS_age_type_time_end!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.CS_age_type_time_start = ''
            return
          }else{
            this.CS_age_type_time_start = val
          }
        }else{
          this.CS_age_type_time_start = val
          this.age_time_change_fn(this.CS_age_type_time_start,this.CS_age_type_time_end)
        }

      },
      CS_age_type_time_end_change(val){
        if(val == undefined){
          return
        }else if(val<this.CS_age_type_time_start){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.CS_age_type_time_end = ''
          return
        }else{
          this.CS_age_type_time_end = val
          this.age_time_change_fn(this.CS_age_type_time_start,this.CS_age_type_time_end)
        }

      },
      age_time_change_fn(start,end){
        let vm = this
        //年龄比例
        vm.$axios.request("post","supermarketConsume/ageCategory",{startTime:start,endTime:end},function(data){
          vm.CS_age_type = []
          vm.CS_age_count = []
          for(let i=0;i<data.result.length;i++){
            vm.CS_age_type.push(data.result[i].age )
            vm.CS_age_count.push({name:data.result[i].age ,value:data.result[i].count})
          }
          vm.CS_age_type_fn()
        },function(err){
          console.log(err);
        })
      },


      //商户窗口分析echarts函数
      //前十名
      ten_fn(){
        let vm = this
        let diningRoom_list = this.$echarts.init(document.getElementById('diningRoom_list'), 'customed');
        let option = {
          color: ['#53c6f2'],
          tooltip : {
            trigger: 'axis',
            position: function (point, params, dom) {
              // 固定在顶部
              return [point[0]-80, '20%'];
            },
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'       // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '12%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : this.list_name,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval:0,
                rotate:-20
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
              name:'前十名商户数据',
              type:'bar',
              barWidth: '40%',
              data:this.list_count
            }
          ]
        };
        diningRoom_list.setOption(option);
      },
      ten_start_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.ten_end){
          if(this.ten_end!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.ten_start = ''
            return
          }else{
            this.ten_start = val
          }
        }else{
          this.ten_start = val;
          vm.ten_init_fn(vm.ten_start,vm.ten_end)
        }
      },
      ten_end_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.ten_start){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.ten_end = ''
          return
        }else{
          this.ten_end = val;
          vm.ten_init_fn(vm.ten_start,vm.ten_end)
        }
      },
      ten_init_fn(start,end){
        let vm = this
        //前十
        vm.$axios.request("post","oneCard/commercialTop10",{startDate:start,endDate:end,flag:'desc'},function(data){
          vm.list_name = []
          vm.list_count = []
          for(let i=0;i<data.result.length;i++){
            vm.list_name.push(data.result[i].commercial )
            vm.list_count.push(data.result[i].count)
          }
          vm.ten_fn()
        },function(err){
          console.log(err);
        })

      },
      //后十名
      backTen_last_fn(){
        let vm = this
        let diningRoom_last = this.$echarts.init(document.getElementById('diningRoom_last'), 'customed');
        let option = {
          color: ['#98F2C8'],
          tooltip : {
            trigger: 'axis',
            position: function (point, params, dom) {
              // 固定在顶部
              return [point[0]-80, '20%'];
            },
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'       // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '12%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : this.last_name,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval:0,
                rotate:-20
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
              name:'后十名商户数据',
              type:'bar',
              barWidth: '40%',
              data:this.last_count,
            }
          ]
        };
        diningRoom_last.setOption(option);
      },
      ten1_start_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.ten1_end){
          if(this.ten1_end!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.ten1_start = ''
            return
          }else{
            this.ten1_start = val
          }
        }else{
          this.ten1_start = val;
          vm.ten1_init_fn(vm.ten1_start,vm.ten1_end)
        }
      },
      ten1_end_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.ten1_start){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.ten1_end = ''
          return
        }else{
          this.ten1_end = val;
          vm.ten1_init_fn(vm.ten1_start,vm.ten1_end)
        }
      },
      ten1_init_fn(start,end){
        let vm = this
        //后十
        vm.$axios.request("post","oneCard/commercialTop10",{startDate:start,endDate:end,flag:'asc'},function(data){
          vm.last_name = []
          vm.last_count = []
          for(let i=0;i<data.result.length;i++){
            vm.last_name.push(data.result[i].commercial )
            vm.last_count.push(data.result[i].count)
          }
          vm.backTen_last_fn()
        },function(err){
          console.log(err);
        })
      },


    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
    },
    created(){
      window.scrollTo(0,0);
      var vm = this
      //获取总消费
      vm.$axios.request("post","oneCard/totalMoney",{date:vm.all_select_year,code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.all_Money = data.result[i].count
        }

      },function(err){
        console.log(err);
      })

      //专业分布
      vm.$axios.request("post","oneCard/commercialAna",{year:vm.all_select_year},function(data){
        for(var i=0;i<data.result.length;i++){
          if(data.result[i].commercial!=="null"){
            vm.KM_name.push(data.result[i].commercial)
            vm.KM_count.push(data.result[i].count)
          }
        }
        vm.GW_chart_title_fn()
      },function(err){
        console.log(err);
      })
      //人员类别
      vm.$axios.request("post","oneCard/personCategory",{date:vm.all_select_year,code:vm.code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.RY_name.push(data.result[i].type)
          vm.RY_count.push({name:data.result[i].type,value:(data.result[i].count)})
        }

        vm.GW_person_type_fn()
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
        vm.GW_distribution_fn()
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

////////////////////////商户一过来的方法///////////////////////////////////////////////////////////////////////////////

      vm.time_init()
      //食堂总消费金额分布
      /*前十*/
      vm.ten_init_fn(vm.ten_start,vm.ten_end)
      /*后十*/
      vm.ten1_init_fn(vm.ten1_start,vm.ten1_end)
      vm.$axios.request("post","supermarketConsume/timeConsume",{year:vm.Supermarket_time,flag:'0'},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.supermarket_data.push(data.result[i].count)
          vm. supermarket_time.push(data.result[i].month+'月')
        }
        vm.Supermarket_num_fn()
      },function(err){
        console.log(err);
      })
      //人均消费分布
      vm.$axios.request("post","supermarketConsume/averageConsume",{year:vm.people_Average_time,flag:'0'},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.slot_card_Average.push(data.result[i].count)
          vm.slot_card_Average_day.push(data.result[i].month+'月')
        }
        vm.people_Average_fn()
      },function(err){
        console.log(err);
      })

      /*//刷卡金额分布
      vm.$axios.request("post","supermarketConsume/cardMoney",{year:vm.slot_card_time,flag:'0'},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.slot_card_count.push(data.result[i].count)
          vm. slot_card_day.push(data.result[i].month+'月')
        }
        vm.slot_card_fn()
      },function(err){
        console.log(err);
      })
      //刷卡次数分布
      vm.$axios.request("post","supermarketConsume/cardCount",{year:vm.number_times_time,flag:'0'},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.slot_card_num.push(data.result[i].count)
          vm.slot_card_num_day.push(data.result[i].month+'月')
        }
        vm.number_times_fn()
      },function(err){
        console.log(err);
      })
      //男女比例
      vm.$axios.request("post","supermarketConsume/getSupermarketSex",{year:vm.people_type_time},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.person_sex.push(data.result[i].sex)
          vm.person_count.push({value:data.result[i].count,name:data.result[i].sex})
        }
        vm.people_type_fn()
      },function(err){
        console.log(err);
      })
      //国别比例
      vm.$axios.request("post","supermarketConsume/countryRatio",{startTime:vm.country_type_start_time,endTime:vm.country_type_end_time},function(data){
        for(let i = data.result.length-1 ; i >= 0; i--){
          vm.country_type.push(data.result[i].country)
          vm.country_count.push(data.result[i].count)
        }
        vm.country_type_fn()
      },function(err){
        console.log(err);
      })
*/


      //学历比例
      vm.$axios.request("post","supermarketConsume/staffCategory",{startTime:vm.education_start_time,endTime:vm.education_end_time},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.XL_type.push(data.result[i].type)
          vm.XL_count.push({name:data.result[i].type,value:data.result[i].count})
        }
        vm.education_type_fn()
      },function(err){
        console.log(err);
      })

      //年龄比例
      vm.$axios.request("post","supermarketConsume/ageCategory",{startTime:vm.CS_age_type_time_start,endTime:vm.CS_age_type_time_end},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.CS_age_type.push(data.result[i].age )
          vm.CS_age_count.push({name:data.result[i].age ,value:data.result[i].count})
        }
        vm.CS_age_type_fn()
      },function(err){
        console.log(err);
      })

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
