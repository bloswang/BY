<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item>浴室洗浴人数分析</el-breadcrumb-item>
    </el-breadcrumb>

    <!--各个洗浴每一天的实时时段分析-->
    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          各个洗浴每一天的实时时段分析&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="room_time"
              type="date"
              format="yyyy-MM-dd"
              @change="room_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="room_timer">
        </div>
      </el-col>
    </el-row>-->

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          洗浴人数趋势&nbsp;&nbsp;(单位:人)
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
    </el-row>-->
    <!--<el-row type="flex" justify="space-around">
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
    </el-row>-->
    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          人均消费分析
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
        <div class="ec_height1" id="people_Average">
        </div>
      </el-col>
    </el-row>-->
    <!--<el-row type="flex" justify="space-around">
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
            至
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


    <!--各浴室消费人数分析-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5" >
          各浴室消费人数分析&nbsp;&nbsp;(单位:人)
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

    <!--各类人员洗浴人数分析-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5" >
          各类人员洗浴人数分析&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data" style="float: right; margin-left: 20px">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="XY_sum_time_S_change"
              v-model="XY_sum_time_S"
              type="date"
              placeholder="选择年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="XY_sum_time_N_change"
              v-model="XY_sum_time_N"
              type="date"
              placeholder="选择月">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="oneCard_XY_sum">
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
            至
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
              v-model="XZ_age_type_time_start"
              type="date"
              format="yyyy-MM-dd"
              @change="XZ_age_type_time_start_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="XZ_age_type_time_end"
              type="date"
              format="yyyy-MM-dd"
              @change="XZ_age_type_time_end_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="XZ_age_type">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import time from '../../config/timeFormat'
  export default {
    data(){
      return {
        //各个洗浴每一天的实时时段分析
        /*room_timer:'',
        room_time:'2017-01-01',
        room1_count:[],
        room2_count:[],
        room3_count:[],
        room4_count:[],
        room_date:[],*/

        Supermarket_time:'2017',
        slot_card_time:'2017',
        number_times_time:'2017',
        /*people_Average_time:'2017',*/
        diningRoom_people_time:'',
        people_type_time:'2017',
        country_type_start_time:'2016-06',
        country_type_end_time:'2017-06',
        education_start_time:'2017-01-01',
        education_end_time:'2018-01-01',
        XZ_age_type_time_start:'2017-01-01',
        XZ_age_type_time_end:'2018-01-01',
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
        XZ_age_type:[],
        XZ_age_count:[],

        //各浴室消费人数分析
        oneCard_XY_num:'',
        XY_num_time_S:'2017-01-01',
        XY_num_time_N:'2018-01-01',
        XY_count1:[],
        XY_count2:[],
        XY_count3:[],
        XY_count4:[],
        XY_count5:[],
        XY_name:[],

        //各类人员洗浴人数分析
        oneCard_XY_sum:'',
        XY_sum_time_S:'2017-01-01',
        XY_sum_time_N:'2018-01-01',
        Sum_count1:[],
        Sum_count2:[],
        Sum_count3:[],
        Sum_count4:[],
        Sum_count5:[],
        Sum_name:[],

      }
    },
    methods:{
      make_time(){
        let vm = this
          vm.Supermarket_time= time.year
          vm.slot_card_time= time.year
          vm.number_times_time= time.year
          vm.diningRoom_people_time= time.year
          vm.people_type_time= time.year
          vm.country_type_start_time= time.year + '-' + '01'
          vm.country_type_end_time= time.year + '-' + time.month
          vm.education_start_time= time.year + '-' + '01' + '-' + '01'
          vm.education_end_time = time.year + '-' + time.month +  '-' +time.day
          vm.XZ_age_type_time_start= time.year + '-' + '01' + '-' + '01'
          vm.XZ_age_type_time_end= time.year + '-' + time.month +  '-' +time.day
          vm.XY_num_time_S= time.year + '-' + '01' + '-' + '01'
          vm.XY_num_time_N= time.year + '-' + time.month +  '-' +time.day
          vm.XY_sum_time_S= time.year + '-' + '01' + '-' + '01'
          vm.XY_sum_time_N= time.year + '-' + time.month +  '-' +time.day
      },
      menu() {
        window.scrollTo(0,0);
      },
      time_init(){
        let date=new Date;
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let startMonth = ''
        let day = date.getDate()
        let startDay = ''
        year = year + ''
        if(month <10){
          month = year +'-'+'0'+ month
          startMonth = year +'-'+'01'
        }else if(month>10){
          month = year +'-'+ month
          startMonth = year +'-'+'01'
        }
        day = day + ''
        if(day <10){
          day = month +'-'+ '0' + day
          startDay = month +'-'+'01'
        }else if(day > 10){
          day =  month + '-' + day
          startDay = month +'-'+'01'
        }
          this.Supermarket_time = year
          this.slot_card_time = year
          this.number_times_time = year
          this.people_Average_time = year
          this.diningRoom_people_time = year
          this.people_type_time = year
          this.country_type_start_time = startMonth
          this.country_type_end_time = month

      },

      //各个洗浴每一天的实时时段分析
      /*room_timer_fn(){
        let option = {
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          color: ["#00BFFF", "#FF00FF", "#1ce322", "#F8FC08", '#EE7942'],
          legend: {
            data: ['西浴室（女）', '西浴室（男）', '东浴室（女）', '学14楼']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },

          xAxis: {
            type: 'category',
            boundaryGap: false,
            data:this.room_date
          },
          yAxis: [{
            type: 'value',
            axisLabel: {
              formatter: '{value} '
            },

          }],
          dataZoom: [{
            type: 'inside',
            start: 50,
            end: 100
          }, {
            show: true,
            type: 'slider',
            y: '90%',
            start: 50,
            end: 100
          }],
          series: [{
            name: '西浴室（女）',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
              }
            },
            data:this.room1_count
          }, {
            name: '西浴室（男）',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
              }
            },
            data:this.room2_count
          }, {
            name: '东浴室（女）',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
              }
            },
            data:this.room3_count
          }, {
            name: '学14楼',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
              }
            },
            data:this.room4_count
          }]
        };
        this.room_timer.setOption(option);
      },
      room_time_change(val){
        if(val == undefined){
          return
        }else{
          this.room_time = val
          this.room_timer_init(this.room_time)
        }
      },
      room_timer_init(time){
        //洗浴总消费人数趋势
        var vm = this
        /!*西浴室（女）*!/
        vm.$axios.request("post","oneCard/bathCurrentConsume",{currentTime:time,bathPlace:'西浴室（女）'},function(data){
          vm.room_date = []
          vm.room1_count = []
          for(var i=0;i<data.result.length;i++){
            vm.room1_count.push(data.result[i].count)
            vm.room_date.push(data.result[i].time)
          }
          vm.room_timer_fn()
        },function(err){
          console.log(err);
        })
        /!*西浴室（男）*!/
        vm.$axios.request("post","oneCard/bathCurrentConsume",{currentTime:time,bathPlace:'西浴室（男）'},function(data){
          vm.room2_count = []
          for(var i=0;i<data.result.length;i++){
            vm.room2_count.push(data.result[i].count)
          }
          vm.room_timer_fn()
        },function(err){
          console.log(err);
        })
        /!*东浴室（女）*!/
        vm.$axios.request("post","oneCard/bathCurrentConsume",{currentTime:time,bathPlace:'东浴室（女）'},function(data){
          vm.room3_count = []
          for(var i=0;i<data.result.length;i++){
            vm.room3_count.push(data.result[i].count)
          }
          vm.room_timer_fn()
        },function(err){
          console.log(err);
        })
        /!*学14楼*!/
        vm.$axios.request("post","oneCard/bathCurrentConsume",{currentTime:time,bathPlace:'学14楼'},function(data){
          vm.room4_count = []
          for(var i=0;i<data.result.length;i++){
            vm.room4_count.push(data.result[i].count)
          }
          vm.room_timer_fn()
        },function(err){
          console.log(err);
        })


      },
      /!*定时器，五分钟请求一次*!/
      getListIng() {
        let vm = this
        // 这里是一个http的异步请求
        setInterval(function(){
          vm.room_timer_init();
        },300000)
      },*/

      //洗浴消费人数趋势echarts函数
      Supermarket_num_fn(){
        let diningRoom_num = this.$echarts.init(document.getElementById('diningRoom_num'), 'customed');
        let option = {

          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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

      //洗浴消费趋势时间时的函数
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
        //洗浴总消费金额分布
        vm.$axios.request("post","bath/bathConsumeWithTime",{year:time,flag:'0'},function(data){
          vm.supermarket_data = []
          vm.supermarket_time = []
          for(var i=0;i<data.result.length;i++){
            vm.supermarket_data.push(data.result[i].count)
            vm. supermarket_time.push(data.result[i].month+"月")
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
          vm.$axios.request("post","bath/bathAverageConsume",{year:vm.people_Average_time,flag:'0'},function(data){
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



      /*//刷卡金额echarts函数
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
          vm.$axios.request("post","bath/bathMoney",{year:vm.slot_card_time,flag:'0'},function(data){
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

      //刷卡次数echarts函数
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
          vm.$axios.request("post","bath/bathCount",{year:vm.number_times_time,flag:'0'},function(data){
            vm.slot_card_num = []
            vm.slot_card_num_day = []
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
            left: 'center',
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
          vm.$axios.request("post","bath/bathSex",{year:vm.people_type_time},function(data){
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
        vm.$axios.request("post","bath/countryRatio",{startTime:start,endTime:end},function(data){
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
      },*/

      //学历比例
      education_type_fn(){
        let education_type = this.$echarts.init(document.getElementById('education_type'), 'customed');
        let option = {

          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: "center",
            data: this.education_type
          },
          label: {
            normal: {
              formatter: "{b} ({d}%)",
              position: "insideTopRight"
            }
          },
          series: {
            name: '学历比例饼状图',
            type: 'pie',
            startAngle: 10,
            minAngle: 5,
            roseType: 'angle',
            itemStyle: {
              emphasis: {
                //阴影的大小
                shadowBlur: 50,
                // 阴影水平方向上的偏移
                shadowOffsetX: 0,
                // 阴影垂直方向上的偏移
                shadowOffsetY: 0,
                // 阴影颜色
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: this.education_count
          }
        };
        education_type.setOption(option);
      },
      education_start_time_change(val){
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
          this.education_start_time = val
          this.education_JK_fn(this.education_start_time,this.education_end_time)
        }

      },
      education_end_time_change(val){
        if(val == undefined){
          return
        }else if(val<this.education_start_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.education_end_time = ''
          return
        }else{
          this.education_end_time = val
          this.education_JK_fn(this.education_start_time,this.education_end_time)
        }

      },
      education_JK_fn(start,end){
        var vm = this
        //学历比例
        vm.$axios.request("post","bath/staffCategory",{startTime:start,endTime:end},function(data){
          vm.education_type = []
          vm.education_count = []
          for(var i=0;i<data.result.length;i++){
            vm.education_type.push(data.result[i].type)
            vm.education_count.push({name:data.result[i].type,value:data.result[i].count})
          }
          vm.education_type_fn()
        },function(err){
          console.log(err);
        })
      },
      //年龄比例
      XZ_age_type_fn(){
        let XZ_age_type = this.$echarts.init(document.getElementById('XZ_age_type'), 'customed');
        let option = {

          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.XZ_age_type
          },
          series : [
            {
              name: '年龄比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.XZ_age_count,
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
        XZ_age_type.setOption(option);
      },
      XZ_age_type_time_start_change(val){
        if(val == undefined){
          return
        }else if(val >this.XZ_age_type_time_end){
          if(this.XZ_age_type_time_end!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.XZ_age_type_time_start = ''
            return
          }else{
            this.XZ_age_type_time_start = val
          }
        }else{
          this.XZ_age_type_time_start = val
          this.age_time_change_fn(this.XZ_age_type_time_start,this.XZ_age_type_time_end)
        }

      },
      XZ_age_type_time_end_change(val){
        if(val == undefined){
          return
        }else if(val<this.XZ_age_type_time_start){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.XZ_age_type_time_end = ''
          return
        }else{
          this.XZ_age_type_time_end = val
          this.age_time_change_fn(this.XZ_age_type_time_start,this.XZ_age_type_time_end)
        }

      },
      age_time_change_fn(start,end){
        let vm = this
        //年龄比例
        vm.$axios.request("post","bath/ageCategory",{startTime:start,endTime:end},function(data){
          vm.XZ_age_type = []
          vm.XZ_age_count = []
          for(let i=0;i<data.result.length;i++){
            vm.XZ_age_type.push(data.result[i].age)
            vm.XZ_age_count.push({name:data.result[i].age,value:data.result[i].count})
          }
          vm.XZ_age_type_fn()
        },function(err){
          console.log(err);
        })
      },


      //各浴室消费人数分析
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
            data:[ '消费人数']
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
              name:'消费人数',
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
        vm.$axios.request("post","bath/bathPersonDayToDay",{startTime:start,endTime:end},function(data){
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
      //各类人员洗浴人数分析
      oneCard_XY_sum_fn(){
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
            data:['教工卡','中国学生卡', '国际学生卡','员工卡', '学员卡']
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
              name:'教工卡',
              type:'bar',
              barWidth:30,
              data:this.Sum_count3,
            },
            {
              name:'中国学生卡',
              type:'bar',
              barWidth:30,
              data:this.Sum_count1,
            },
            {
              name:'国际学生卡',
              type:'bar',
              barWidth:30,
              data:this.Sum_count2,
            },
            {
              name:'员工卡',
              type:'bar',
              barWidth:30,
              data:this.Sum_count5,
            },
            {
              name:'学员卡',
              type:'bar',
              barWidth:30,
              data:this.Sum_count4,
            }
          ]
        };
        this.oneCard_XY_sum.setOption(option);
      },
      XY_sum_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.XY_sum_time_N){
          if(this.XY_sum_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.XY_sum_time_S = ''
            return
          }else{
            this.XY_sum_time_S = val
          }
        }else{
          this.XY_sum_time_S = val
          this.XY_sum_init_fn(this.XY_sum_time_S,this.XY_sum_time_N)
        }

      },
      XY_sum_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.XY_sum_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.XY_sum_time_N = ''
          return
        }else{
          this.XY_sum_time_N = val
          this.XY_sum_init_fn(this.XY_sum_time_S,this.XY_sum_time_N)
        }

      },
      XY_sum_init_fn(start,end){
        let vm = this
        //中国学生卡
        vm.$axios.request("post","oneCard/bathCardConsum",{startTime:start,endTime:end,cardType:'中国学生卡'},function(data){
          vm.Sum_name = []
          vm.Sum_count1 = []
          console.log(data)
          for(var i=0;i<data.result.length;i++){
            vm.Sum_name.push(data.result[i].bathplace)
            vm.Sum_count1.push(data.result[i].count)
          }
          vm.oneCard_XY_sum_fn()
        },function(err){
          console.log(err);
        })
        //国际学生卡
        vm.$axios.request("post","oneCard/bathCardConsum",{startTime:start,endTime:end,cardType:'国际学生卡'},function(data){
          vm.Sum_count2 = []
          for(var i=0;i<data.result.length;i++){
            vm.Sum_count2.push(data.result[i].count)
          }
          vm.oneCard_XY_sum_fn()
        },function(err){
          console.log(err);
        })
        //教工卡
        vm.$axios.request("post","oneCard/bathCardConsum",{startTime:start,endTime:end,cardType:'教工卡'},function(data){
          vm.Sum_count3= []
          for(var i=0;i<data.result.length;i++){
            vm.Sum_count3.push(data.result[i].count)
          }
          vm.oneCard_XY_sum_fn()
        },function(err){
          console.log(err);
        })
        //学员卡
        vm.$axios.request("post","oneCard/bathCardConsum",{startTime:start,endTime:end,cardType:'学员卡'},function(data){
          vm.Sum_count4 = []
          for(var i=0;i<data.result.length;i++){
            vm.Sum_count4.push(data.result[i].count)
          }
          vm.oneCard_XY_sum_fn()
        },function(err){
          console.log(err);
        })
        //员工卡
        vm.$axios.request("post","oneCard/bathCardConsum",{startTime:start,endTime:end,cardType:'员工卡'},function(data){
          vm.Sum_count5= []
          for(var i=0;i<data.result.length;i++){
            vm.Sum_count5.push(data.result[i].count)
          }
          vm.oneCard_XY_sum_fn()
        },function(err){
          console.log(err);
        })

      },

    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.oneCard_XY_num = this.$echarts.init(document.getElementById('oneCard_XY_num'), 'customed');
      this.oneCard_XY_sum = this.$echarts.init(document.getElementById('oneCard_XY_sum'), 'customed');

      //this.room_timer = this.$echarts.init(document.getElementById('room_timer'), 'customed');
    },
    created() {
      let vm = this;
      vm.menu()
      vm.make_time()
      vm.time_init()
      //洗浴总消费金额分布
      vm.$axios.request("post","bath/bathConsumeWithTime",{year:vm.Supermarket_time,flag:'0'},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.supermarket_data.push(data.result[i].count)
          vm. supermarket_time.push(data.result[i].month +"月")
        }
        vm.Supermarket_num_fn()
      },function(err){
        console.log(err);
      })

      //人均消费分布
      /*vm.$axios.request("post","bath/bathAverageConsume",{year:vm.people_Average_time,flag:'0'},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.slot_card_Average.push(data.result[i].count)
          vm.slot_card_Average_day.push(data.result[i].month+'月')
        }
        vm.people_Average_fn()
      },function(err){
        console.log(err);
      })*/
      /* //刷卡金额分布
      vm.$axios.request("post","bath/bathMoney",{year:vm.slot_card_time,flag:'0'},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.slot_card_count.push(data.result[i].count)
          vm. slot_card_day.push(data.result[i].month+'月')
        }
        vm.slot_card_fn()
      },function(err){
        console.log(err);
      })
      //刷卡次数分布
      vm.$axios.request("post","bath/bathCount",{year:vm.number_times_time,flag:'0'},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.slot_card_num.push(data.result[i].count)
          vm.slot_card_num_day.push(data.result[i].month+'月')
        }
        vm.number_times_fn()
      },function(err){
        console.log(err);
      })
      //男女比例
      vm.$axios.request("post","bath/bathSex",{year:vm.people_type_time},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.person_sex.push(data.result[i].sex)
          vm.person_count.push({value:data.result[i].count,name:data.result[i].sex})
        }
        vm.people_type_fn()
      },function(err){
        console.log(err);
      })
      //国别比例
      vm.$axios.request("post","bath/countryRatio",{startTime:vm.country_type_start_time,endTime:vm.country_type_end_time},function(data){
        for(let i = data.result.length-1 ; i >= 0; i--){
          vm.country_type.push(data.result[i].country)
          vm.country_count.push(data.result[i].count)
        }
        vm.country_type_fn()
      },function(err){
        console.log(err);
      })*/

      //学历比例
      vm.$axios.request("post","bath/staffCategory",{startTime:vm.education_start_time,endTime:vm.education_start_time},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.education_type.push(data.result[i].type)
          vm.education_count.push({name:data.result[i].type,value:data.result[i].count})
        }
        vm.education_type_fn()
      },function(err){
        console.log(err);
      })

      //年龄比例
      vm.$axios.request("post","bath/ageCategory",{startTime:vm.XZ_age_type_time_start,endTime:vm.XZ_age_type_time_end},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.XZ_age_type.push(data.result[i].age )
          vm.XZ_age_count.push({name:data.result[i].age ,value:data.result[i].count})
        }
        vm.XZ_age_type_fn()
      },function(err){
        console.log(err);
      })

      vm.sum_init_fn(vm.XY_num_time_S,vm.XY_num_time_N)
      vm.XY_sum_init_fn(vm.XY_sum_time_S,vm.XY_sum_time_N)
      //洗浴实时人数分析
      /*this.room_timer_init(this.room_time)
      this.getListIng();*/
    }
  }
</script>

<style>
  .ec_height1{
    height: 300px;
  }
</style>
