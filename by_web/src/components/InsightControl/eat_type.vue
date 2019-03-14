<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control'}">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/control'}">食堂就餐人数分析</el-breadcrumb-item>
      <!--<el-breadcrumb-item>{{eat_hot_Select}}</el-breadcrumb-item>-->
    </el-breadcrumb>
    <!--各个食堂每一天的实时时段分析-->
    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          各个食堂每一天的实时时段分析&nbsp;&nbsp;(单位:人)
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
          各食堂消费人员分析&nbsp;&nbsp;(单位:人)
          <el-button size="mini" @click="skip('room_person_list')">分析</el-button>
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="distribution_time_S"
              type="date"
              format="yyyy-MM-dd"
              @change="distribution_time_S_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="distribution_time_N"
              type="date"
              format="yyyy-MM-dd"
              @change="distribution_time_N_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="personnel_distribution">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          各食堂三餐总消费人数分析&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data">
            <!--<el-select v-model="EAT_select" placeholder="请选择" size="mini" class="select_width" @change="EAT_change">
              <el-option
                v-for="item in EAT_List"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>-->
            <!--<el-select v-model="EAT_room" placeholder="请选择" size="mini" class="select_width" @change="ROOM_change">
              <el-option
                v-for="item in ROOM_List"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>-->
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="diningRoom_people_time_S"
              type="date"
              format="yyyy-MM-dd"
              @change="diningRoom_people_time_S_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="diningRoom_people_time_N"
              type="date"
              format="yyyy-MM-dd"
              @change="diningRoom_people_time_N_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="diningRoom_people">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          各食堂三餐平均消费人数趋势&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="diningRoom_avg_time_S"
              type="date"
              format="yyyy-MM-dd"
              @change="diningRoom_avg_time_S_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="diningRoom_avg_time_N"
              type="date"
              format="yyyy-MM-dd"
              @change="diningRoom_avg_time_N_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="diningRoom_avg">
        </div>
      </el-col>
    </el-row>

    <!--各类人员三餐消费人数分析-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5" >
          各类人员三餐消费人数分析&nbsp;&nbsp;(单位:元)
          <div class="ec_h5_data" style="float: right; margin-left: 20px">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="ST_person_time_S_change"
              v-model="ST_person_time_S"
              type="date"
              placeholder="选择年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="ST_person_time_N_change"
              v-model="ST_person_time_N"
              type="date"
              placeholder="选择月">
            </el-date-picker>
          </div>

          <el-select
            v-model="roomSelect1"
            placeholder="请选择"
            size="mini"
            class="major-select select_width"
            @change="room_person_Change">
            <el-option
              v-for="(item,index) in roomList1"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </h5>
        <div class="ec_height" id="oneCard_ST_person">
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          食堂消费前十名窗口分析&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data">
            <el-select v-model="eatSelect" placeholder="请选择" size="mini" class="major-select" @change="eatChange">
              <el-option
                v-for="item in eatTypeList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="diningRoom_list_time_S"
              type="date"
              format="yyyy-MM-dd"
              @change="diningRoom_list_time_S_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="diningRoom_list_time_N"
              type="date"
              format="yyyy-MM-dd"
              @change="diningRoom_list_time_N_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="diningRoom_list"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          食堂消费后十名窗口分析&nbsp;&nbsp;(单位:人)
        </h5>
        <div class="ec_height" id="diningRoom_last">
        </div>
      </el-col>
    </el-row>


    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          食堂周期热度&nbsp;&nbsp;(单位:人)
          <!--<el-button size="mini" @click="skip('shitang_hot')">分析</el-button>-->
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="diningRoom_hot_time"
              type="month"
              format="yyyy-MM"
              @change="diningRoom_hot_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="diningRoom_hot">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          学历比例&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data">
            <el-select v-model="roomSelect" placeholder="请选择" size="mini" class="select_width" @change="roomChange">
              <el-option
                v-for="item in roomList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="ST_time_change"
              v-model="ST_time"
              type="date"
              placeholder='选择时间'>
            </el-date-picker>

            <el-select  v-model="eat_hot_Select1" placeholder="选择用餐时间" size="mini" class="select_width" @change="eat_hot_Change1">
              <el-option
                v-for="(item,index) in eat_hot_list1"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </h5>
        <div class="ec_height" id="two"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import time from '../../config/timeFormat'
  export default {
    data(){
      return{
        diningRoom_timeS:'2017-01-01',
        diningRoom_timeN:'2018-01-01',

        //各个食堂每一天的实时时段分析
       /* room_timer:'',
        room_time:'2017-01-01',
        room1_count:[],
        room2_count:[],
        room3_count:[],
        room4_count:[],
        room5_count:[],
        room_date:[],*/

        //食堂总消费人数趋势
        diningRoom_people_time_S:'2017-01-01',
        diningRoom_people_time_N:'2018-01-01',
        diningRoom_person_num:[],
        diningRoom_person_num1:[],
        diningRoom_person_num2:[],
        diningRoom_data:[],

        //食堂平均消费人数趋势
        diningRoom_avg_time_S:'2017-01-01',
        diningRoom_avg_time_N:'2018-01-01',
        diningRoom_avg_num:[],
        diningRoom_avg_num1:[],
        diningRoom_avg_num2:[],
        diningRoom_avg_data:[],
        /*EAT_select:'早餐',
        EAT_code:'1',
        EAT_List:['早餐','午餐','晚餐'],*/
        /*EAT_room:'清晏楼一层',
        ROOM_List:['清晏楼一层','清晏楼二层','家属区食堂','租赁档口','风味档口'],*/

        //不同卡类别在不同食堂早中晚消费情况
        oneCard_ST_person:'',
        roomSelect1:'清晏楼一层',
        roomList1:['清晏楼一层','清晏楼二层','家属区食堂','租赁档口','风味档口','教工餐厅'],
        oneCard_ST_type:'',
        ST_person_time_S:'2017-01-01',
        ST_person_time_N:'2018-01-01',
        person_count1:[],
        person_count2:[],
        person_count3:[],
        person_count4:[],
        person_count5:[],
        person_name:[],

        distribution_time_S:'2017-01-01',
        distribution_time_N:'2018-01-01',

        diningRoom_list_time_S:'2017-01-01',
        diningRoom_list_time_N:'2018-01-01',
        eatSelect:'早餐',
        eat_code:'1',
        eatTypeList:['早餐','午餐','晚餐'],
        diningRoom_num_type:[],
        diningRoom_num:[],
        diningRoom_hot_num:[],
        distribution_count:[],
        distribution_type:[],
        diningRoom_list_count:[],
        diningRoom_list_name:[],
        diningRoom_last_count:[],
        diningRoom_last_name:[],

        //食堂周期热度
        diningRoom_hot_time:'2017-01',
        eat_hot_Select:'早餐',
        eat_hot_list:['早餐','午餐','晚餐'],
        flag:'1',

        eat_hot_Select1:'早餐',
        eat_hot_list1:['早餐','午餐','晚餐'],
        flag1:'1',

        SF_flag:'1',
        roomSelect:'清晏楼一层',
        roomList:['清晏楼一层','清晏楼二层','家属区食堂','租赁档口','风味档口','教工餐厅'],
        ST_time:'2017-10-01',
        countryList:[],
        eat_start_time:'2017-10-01',
        LC_count:[],
        LC_name:[],
        XL_type:[],
        XL_count:[],
        ZJ_name:[],
        ZJ_count:[],
        age:[],
        age_count:[],
        LB_name:[],
        LB_count:[],
        TOP3_name:[],
        TOP3_count:[]
      }
    },
    methods:{
      make_time(){
        let vm = this

          vm.diningRoom_timeS = time.year + '-' + time.month + '-' + '01'
          vm.diningRoom_timeN = time.year + '-' + time.month + '-' + time.day
          vm.diningRoom_people_time_S = time.year + '-' + '01' + '-' + '01'
          vm.diningRoom_people_time_N = time.year + '-' + time.month + '-' + time.day
          vm.diningRoom_avg_time_S = time.year + '-' + '01' + '-' + '01'
          vm.diningRoom_avg_time_N = time.year + '-' + time.month + '-' + time.day
          vm.ST_person_time_S = time.year + '-' + '01' + '-' + '01'
          vm.ST_person_time_N = time.year + '-' + time.month + '-' + time.day
          vm.distribution_time_S = time.year + '-' + '01' + '-' + '01'
          vm.distribution_time_N = time.year + '-' + time.month + '-' + time.day
          vm.diningRoom_list_time_S = time.year + '-' + '01' + '-' + '01'
          vm.diningRoom_list_time_N = time.year + '-' + time.month + '-' + time.day
          vm.diningRoom_hot_time = time.year + '-' + time.month
          vm.ST_time = time.year + '-' + time.month + '-' + time.day
          vm.eat_start_time = time.year + '-' + time.month + '-' + time.day
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
        this.diningRoom_time = startMonth
      },

      //跳转函数，添加路由
      skip(link) {
        switch (link) {
          case 'shitang_hot':
            this.$router.push('shitang_hot')
            break;
          case 'room_person_list':
            this.$router.push('room_person_list')
            break;
        }
      },

      //各个食堂每一天的实时时段分析
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
            data: ['清晏楼一层', '清晏楼二层', '家属区食堂', '租赁档口', '风味档口']
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
            name: '清晏楼一层',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
              }
            },
            data:this.room1_count
          }, {
            name: '清晏楼二层',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
              }
            },
            data:this.room2_count
          }, {
            name: '家属区食堂',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
              }
            },
            data:this.room3_count
          }, {
            name: '租赁档口',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
              }
            },
            data:this.room4_count
          }, {
            name: '风味档口',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2,
              }
            },
            data:this.room5_count
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
        //食堂总消费人数趋势
        var vm = this
        /!*清晏楼一层*!/
        vm.$axios.request("post","canteen/currentConsume",{currentTime:time,canteenname:'清晏楼一层'},function(data){
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
        /!*清晏楼二层*!/
        vm.$axios.request("post","canteen/currentConsume",{currentTime:time,canteenname:'清晏楼二层'},function(data){
          vm.room2_count = []
          for(var i=0;i<data.result.length;i++){
            vm.room2_count.push(data.result[i].count)
          }
          vm.room_timer_fn()
        },function(err){
          console.log(err);
        })
        /!*家属区食堂*!/
        vm.$axios.request("post","canteen/currentConsume",{currentTime:time,canteenname:'家属区食堂'},function(data){
          vm.room3_count = []
          for(var i=0;i<data.result.length;i++){
            vm.room3_count.push(data.result[i].count)
          }
          vm.room_timer_fn()
        },function(err){
          console.log(err);
        })
        /!*租赁档口*!/
        vm.$axios.request("post","canteen/currentConsume",{currentTime:time,canteenname:'租赁档口'},function(data){
          vm.room4_count = []
          for(var i=0;i<data.result.length;i++){
            vm.room4_count.push(data.result[i].count)
          }
          vm.room_timer_fn()
        },function(err){
          console.log(err);
        })
        /!*风味档口*!/
        vm.$axios.request("post","canteen/currentConsume",{currentTime:time,canteenname:'风味档口'},function(data){
          vm.room5_count = []
          for(var i=0;i<data.result.length;i++){
            vm.room5_count.push(data.result[i].count)
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

      //食堂总消费人数趋势
      diningRoom_people_fn(){
        let diningRoom_people = this.$echarts.init(document.getElementById('diningRoom_people'), 'customed');
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
              data: this.diningRoom_data,
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
              data:this.diningRoom_person_num,
            },
            {
              name:'午餐',
              type:'bar',
              barWidth:30,
              data:this.diningRoom_person_num1,
            },
            {
              name:'晚餐',
              type:'bar',
              barWidth:30,
              data:this.diningRoom_person_num2,
            }
          ]
        };
        diningRoom_people.setOption(option);
      },
      diningRoom_people_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.diningRoom_people_time_N){
          if(this.diningRoom_people_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.diningRoom_people_time_S = ''
            return
          }else{
            this.diningRoom_people_time_S = val
          }
        }else{
          this.diningRoom_people_time_S = val
          this.dingingRoom_change(this.diningRoom_people_time_S,this.diningRoom_people_time_N,this.EAT_code)
        }
      },
      diningRoom_people_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.diningRoom_people_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.diningRoom_people_time_N = ''
          return
        }else{
          this.diningRoom_people_time_N = val
          this.dingingRoom_change(this.diningRoom_people_time_S,this.diningRoom_people_time_N,this.EAT_code)
        }

      },
      dingingRoom_change(start,end){
        //食堂总消费人数趋势
        var vm = this
        vm.$axios.request("post","canteen/canteenConsumersTrend",{startTime:start,endTime:end,flag:'1'},function(data){
          vm.diningRoom_person_num = []
          vm.diningRoom_data = []
          for(var i=0;i<data.result.length;i++){
            vm.diningRoom_person_num.push(data.result[i].count)
            vm.diningRoom_data.push(data.result[i].canteenname)
          }
          vm.diningRoom_people_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","canteen/canteenConsumersTrend",{startTime:start,endTime:end,flag:'2'},function(data){
          vm.diningRoom_person_num1 = []
          for(var i=0;i<data.result.length;i++){
            vm.diningRoom_person_num1.push(data.result[i].count)
          }
          vm.diningRoom_people_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","canteen/canteenConsumersTrend",{startTime:start,endTime:end,flag:'3'},function(data){
          vm.diningRoom_person_num2 = []
          for(var i=0;i<data.result.length;i++){
            vm.diningRoom_person_num2.push(data.result[i].count)
          }
          vm.diningRoom_people_fn()
        },function(err){
          console.log(err);
        })

      },
      /*EAT_change(val){
        let vm = this
        vm.EAT_select = val
        if(val =='早餐'){
          vm.EAT_code = '1'
        }else if(val =='午餐'){
          vm.EAT_code = '2'
        }else{
          vm.EAT_code = '3'
        }
        this.dingingRoom_change(this.diningRoom_people_time_S,this.diningRoom_people_time_N,this.EAT_code)
      },*/
      /*ROOM_change(val){
        let vm = this
        vm.EAT_room = val
        this.dingingRoom_change(this.diningRoom_people_time_S,this.diningRoom_people_time_N,this.EAT_code)
      },*/


      //食堂平均消费人数趋势
      diningRoom_avg_fn(){
        let diningRoom_avg = this.$echarts.init(document.getElementById('diningRoom_avg'), 'customed');
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
              data: this.diningRoom_avg_data,
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
              data:this.diningRoom_avg_num,
            },
            {
              name:'午餐',
              type:'bar',
              barWidth:30,
              data:this.diningRoom_avg_num1,
            },
            {
              name:'晚餐',
              type:'bar',
              barWidth:30,
              data:this.diningRoom_avg_num2,
            }
          ]
        };
        diningRoom_avg.setOption(option);
      },
      diningRoom_avg_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.diningRoom_avg_time_N){
          if(this.diningRoom_avg_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.diningRoom_avg_time_S = ''
            return
          }else{
            this.diningRoom_avg_time_S = val
          }
        }else{
          this.diningRoom_avg_time_S = val
          this.dingingRoom_avg_change(this.diningRoom_avg_time_S,this.diningRoom_avg_time_N)
        }
      },
      diningRoom_avg_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.diningRoom_avg_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.diningRoom_avg_time_N = ''
          return
        }else{
          this.diningRoom_avg_time_N = val
          this.dingingRoom_avg_change(this.diningRoom_avg_time_S,this.diningRoom_avg_time_N)
        }

      },
      dingingRoom_avg_change(start,end){
        //食堂总消费人数趋势
        var vm = this
        vm.$axios.request("post","canteen/diningAvgCount",{startTime:start,endTime:end,flag:'1'},function(data){
          vm.diningRoom_avg_num = []
          vm.diningRoom_avg_data = []
          for(var i=0;i<data.result.length;i++){
            vm.diningRoom_avg_num.push(parseInt(data.result[i].count))
            vm.diningRoom_avg_data.push(data.result[i].canteenname)
          }
          vm.diningRoom_avg_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","canteen/diningAvgCount",{startTime:start,endTime:end,flag:'2'},function(data){
          vm.diningRoom_avg_num1 = []
          for(var i=0;i<data.result.length;i++){
            vm.diningRoom_avg_num1.push(parseInt(data.result[i].count))
          }
          vm.diningRoom_avg_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","canteen/diningAvgCount",{startTime:start,endTime:end,flag:'3'},function(data){
          vm.diningRoom_avg_num2 = []
          for(var i=0;i<data.result.length;i++){
            vm.diningRoom_avg_num2.push(parseInt(data.result[i].count))
          }
          vm.diningRoom_avg_fn()
        },function(err){
          console.log(err);
        })

      },

      //不同卡类别在不同食堂早中晚消费
      oneCard_ST_person_fn(){
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
              data: this.person_name,
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
              data:this.person_count1,
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
              data:this.person_count2,
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
              data:this.person_count3,
            }
          ]
        };
        this.oneCard_ST_person.setOption(option);
      },
      ST_person_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.ST_person_time_N){
          if(this.ST_person_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.ST_person_time_S = ''
            return
          }else{
            this.ST_person_time_S = val
          }
        }else{
          this.ST_person_time_S = val
          this.person_init_fn(this.ST_person_time_S,this.ST_person_time_N,this.roomSelect)
        }

      },
      ST_person_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.ST_person_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.ST_person_time_N = ''
          return
        }else{
          this.ST_person_time_N = val
          this.person_init_fn(this.ST_person_time_S,this.ST_person_time_N,this.roomSelect)
        }

      },
      room_person_Change(val){
        let vm = this
        vm.roomSelect = val
        this.person_init_fn(this.ST_person_time_S,this.ST_person_time_N,this.roomSelect)
      },
      person_init_fn(start,end,room){
        let vm = this
        /*早餐*/
        vm.$axios.request("post","oneCard/diningCardCount",{startTime:start,endTime:end,flag:'1',canteenname:room},function(data){
          vm.person_name = []
          vm.person_count1 = []
          for(var i=0;i<data.result.length;i++){
            vm.person_name.push(data.result[i].cardtype)
            vm.person_count1.push(data.result[i].count)
          }
          vm.oneCard_ST_person_fn()
        },function(err){
          console.log(err);
        })
        /*午餐*/
        vm.$axios.request("post","oneCard/diningCardCount",{startTime:start,endTime:end,flag:'2',canteenname:room},function(data){
          vm.person_count2 = []
          for(var i=0;i<data.result.length;i++){
            vm.person_count2.push(data.result[i].count)
          }
          vm.oneCard_ST_person_fn()
        },function(err){
          console.log(err);
        })
        /*晚餐*/
        vm.$axios.request("post","oneCard/diningCardCount",{startTime:start,endTime:end,flag:'3',canteenname:room},function(data){
          vm.person_count3 = []
          for(var i=0;i<data.result.length;i++){
            vm.person_count3.push(data.result[i].count)
          }
          vm.oneCard_ST_person_fn()
        },function(err){
          console.log(err);
        })
      },

      //食堂窗口分析echarts函数
      diningRoom_list_fn(){
        let vm = this
        let diningRoom_list = this.$echarts.init(document.getElementById('diningRoom_list'), 'customed');
        let option = {
          title: {
            text: '提示:点击柱状图可查看对应窗口详情',
            textStyle: {
              fontSize: 12,
              color:'red'
            },
            left:'80%',
            top:'5%'
          },
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
              data : this.diningRoom_list_name,
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
              name:'前十名窗口数据',
              type:'bar',
              barWidth: '40%',
              data:this.diningRoom_list_count
            }
          ]
        };
        diningRoom_list.on('click', function(params) {
          vm.$router.push({ path: "shitang_list", query: { name: params.name,code:params.data.name} });
        });
        diningRoom_list.setOption(option);
      },//前十名
      diningRoom_last_fn(){
        let vm = this
        let diningRoom_last = this.$echarts.init(document.getElementById('diningRoom_last'), 'customed');
        let option = {
          title: {
            text: '提示:点击柱状图可查看对应窗口详情',
            textStyle: {
              fontSize: 12,
              color:'red'
            },
            left:'80%',
            top:'5%'
          },
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
              data : this.diningRoom_last_name,
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
              name:'后十名窗口数据',
              type:'bar',
              barWidth: '40%',
              data:this.diningRoom_last_count,
            }
          ]
        };
        diningRoom_last.on('click', function(params) {
          vm.$router.push({ path: "shitang_list", query: { name: params.name,code:params.data.name} });
        });
        diningRoom_last.setOption(option);
      },//后十名
      //食堂窗口选择时间时的函数
      diningRoom_list_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.diningRoom_list_time_N){
          if(this.diningRoom_list_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.diningRoom_list_time_S = ''
            return
          }else{
            this.diningRoom_list_time_S = val
          }
        }else{
          this.diningRoom_list_time_S = val
          this.ListAndLast_fn(this.diningRoom_list_time_S,this.diningRoom_list_time_N,this.eat_code)
        }
      },
      diningRoom_list_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.diningRoom_list_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.diningRoom_list_time_N = ''
          return
        }else{
          this.diningRoom_list_time_N = val
          this.ListAndLast_fn(this.diningRoom_list_time_S,this.diningRoom_list_time_N,this.eat_code)
        }
      },
      ListAndLast_fn(start,end,flag){
        var vm = this
        //食堂消费前十名
        vm.$axios.request("post","canteen/canteenWindowAnalyzeTop10",{startTime:start,endTime:end,flag:flag},function(data){
          vm.diningRoom_list_count = []
          vm.diningRoom_list_name = []
          for(var i=0;i<data.result.length;i++){
            vm.diningRoom_list_count.push(data.result[i].count)
            vm.diningRoom_list_name.push(data.result[i].win)
          }
          vm.diningRoom_list_fn()
        },function(err){
          console.log(err);
        })
        //食堂消费后十名
        vm.$axios.request("post","canteen/canteenWindowAnalyzeLast10",{startTime:start,endTime:end,flag:flag},function(data){
          vm.diningRoom_last_count = []
          vm.diningRoom_last_name = []
          for(var i=0;i<data.result.length;i++){
            vm.diningRoom_last_count.push(data.result[i].count)
            vm.diningRoom_last_name.push(data.result[i].win)
          }
          vm.diningRoom_last_fn()
        },function(err){
          console.log(err);
        })
      },
      //用餐早中晚变化时的函数
      eatChange(val){
        this.eatSelect = val
        if(val =='早餐'){
          this.eat_code = '1'
        }else if(val =='午餐'){
          this.eat_code = '2'
        }else{
          this.eat_code = '3'
        }

        this.ListAndLast_fn(this.diningRoom_list_time_S,this.diningRoom_list_time_N,this.eat_code)
      },

      //食堂人员分布echarts函数
      personnel_distribution_fn(){
        let personnel_distribution = this.$echarts.init(document.getElementById('personnel_distribution'), 'customed');
        let option = {
          /*title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'10%'
          },*/
          //color: ['#C4DB1E'],
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
              dataView : {show: true, readOnly: false},
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
              data : this.distribution_type,
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
              barWidth: '50',
              data:this.distribution_count
            }
          ]
        };
        personnel_distribution.setOption(option);
      },
      //食堂人员分布选择时间时的函数
      distribution_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.distribution_time_N){
          if(this.distribution_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.distribution_time_S = ''
            return
          }else{
            this.distribution_time_S = val
          }
        }else{
          this.distribution_time_S = val
          this.distribution_time_change_fn(this.distribution_time_S,this.distribution_time_N)
        }
      },
      distribution_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.distribution_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.distribution_time_N = ''
          return
        }else{
          this.distribution_time_N = val
          this.distribution_time_change_fn(this.distribution_time_S,this.distribution_time_N)
        }
      },
      distribution_time_change_fn(startTime,endTime){
        var vm = this
        //各食堂消费人员分析
        vm.$axios.request("post","canteen/canteenConsumerDis",{startTime:startTime,endTime:endTime},function(data){
          vm.distribution_count = []
          vm.distribution_type = []
          for(var i=0;i<data.result.length;i++){
            vm.distribution_count.push(data.result[i].count)
            vm.distribution_type.push(data.result[i].canteen)
          }
          vm.personnel_distribution_fn()
        },function(err){
          console.log(err);
        })
      },

      //食堂周期热度echarts函数
      diningRoom_hot_fn(){
        let diningRoom_hot = this.$echarts.init(document.getElementById('diningRoom_hot'), 'customed');
        let option = {
         /* title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },*/
          //color: ['#C4DB1E'],
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
              data : ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
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
              name:'食堂周期热度',
              type:'bar',
              barWidth: '60%',
              data:this.diningRoom_hot_num
            }
          ]
        };
        diningRoom_hot.setOption(option);
      },
      //食堂周期热度选择时间时的函数
      diningRoom_hot_time_change(val){
        if(val == undefined){
          return
        }else{
          this.diningRoom_hot_time = val
          this.diningRoom_hot_change(this.diningRoom_hot_time)
        }

      },
      diningRoom_hot_change(date){
        var vm = this
        //食堂周期热度
        vm.$axios.request("post","canteen/canteenWeekConsume",{date:date},function(data){
          vm.diningRoom_hot_num = []
          for(var i=0;i<data.result.length;i++){
            vm.diningRoom_hot_num.push(data.result[i].count)
          }
          vm.diningRoom_hot_fn()
        },function(err){
          console.log(err);
        })
      },

      //就餐类别选择
      eat_hot_Change(val){
        let vm = this
        vm.eat_hot_Select = val
        if(val == '早餐'){
          vm.flag = '1'
        }else if(val == '午餐'){
          vm.flag = '2'
        }else{
          vm.flag = '3'
        }
        //人员楼层分布seven
        vm.$axios.request("post","repast/floorAnalyse",{flag:vm.flag,date:vm.eat_start_time},function(data){
          vm.LC_name = []
          vm.LC_count = []
          for(var i=0;i<data.result.length;i++){
            if(data.result[i].canteen !== '其他'){
              vm.LC_name.push(data.result[i].canteen)
              vm.LC_count.push(data.result[i].count)
            }
          }
          vm.seven_fn()
        },function(err){
          console.log(err);
        })
      },
      //第一个图开始时间
      eat_time_change(val){
        let vm = this;
        if(val == undefined){
          return
        }else{
          this.eat_start_time = val
          //人员楼层分布seven
          vm.$axios.request("post","repast/floorAnalyse",{flag:this.flag,date:this.eat_start_time},function(data){
            vm.LC_name = []
            vm.LC_count = []
            for(var i=0;i<data.result.length;i++){
              if(data.result[i].canteen !== '其他'){
                vm.LC_name.push(data.result[i].canteen)
                vm.LC_count.push(data.result[i].count)
              }
            }
            vm.seven_fn()
          },function(err){
            console.log(err);
          })
        }

      },
      //选择食堂以及选择时间函数
      ST_time_change(val){
        if(val == undefined){
          return
        }else{
          this.ST_time = val
          this.all_JK_fn(this.flag1,this.ST_time,this.roomSelect)
        }

      },
      roomChange(val) {
        this.roomSelect = val
        this.all_JK_fn(this.flag1,this.ST_time,this.roomSelect)
      },
      eat_hot_Change1(val){
        let vm = this
        vm.eat_hot_Select1 = val
        if(val == '早餐'){
          vm.flag1 = '1'
        }else if(val == '午餐'){
          vm.flag1 = '2'
        }else{
          vm.flag1 = '3'
        }
        this.all_JK_fn(this.flag1,this.ST_time,this.roomSelect)
      },
      all_JK_fn(flag,time,ST){
        var vm = this


        //学历比例
        vm.$axios.request("post","repast/floorDocuments",{flag:flag,date:time,name:ST},function(data){
          vm.XL_type=[]
          vm.XL_count=[]
          for(var i=0;i<data.result.length;i++){
            vm.XL_type.push(data.result[i].type)
            vm.XL_count.push({name:data.result[i].type,value:data.result[i].count})
          }
          vm.two_fn()
        },function(err){
          console.log(err);
        })
        /*//省份列表
        vm.$axios.request("post","repast/provinceCount",{flag:flag,date:time,name:ST},function(data){
          vm.countryList = []
          for(let i=0;i<data.results.length;i++){
            let SF = ''
            if(data.results[i].province =='null'||data.results[i].province ==null){
              SF = '未知'
            }else{
              SF = data.results[i].province
            }
            vm.countryList.push({name:SF,value:data.results[i].count+'人'})
          }
        },function(err){
          console.log(err);
        })
        //洲际比例
        vm.$axios.request("post","repast/continentRatio",{flag:flag,date:time,name:ST},function(data){
          vm.ZJ_name=[]
          vm.ZJ_count =[]
          let ZJ = ''
          for(var i=0;i<data.result.length;i++){
            if(data.result[i].intercontinental == null ||data.result[i].intercontinental == 'null'){
              ZJ = '其他'
            }else{
              ZJ = data.result[i].intercontinental
            }
            vm.ZJ_name.push(ZJ)
            vm.ZJ_count.push({
              name:ZJ,
              value:data.result[i].count})
          }
          vm.three_fn()
        },function(err){
          console.log(err);
        })

        //年龄比例
        vm.$axios.request("post","repast/ageRatio",{flag:flag,date:time,name:ST},function(data){
          vm.age=[]
          vm.age_count =[]
          for(var i=0;i<data.result.length;i++){
            vm.age.push(data.result[i].age )
            vm.age_count.push({name:data.result[i].age ,value:data.result[i].count})
          }
          vm.four_fn()
        },function(err){
          console.log(err);
        })
        //人员类别分布
        vm.$axios.request("post","repast/categoryRatio",{flag:flag,date:time,name:ST},function(data){
          vm.LB_name=[]
          vm.LB_count =[]
          for(var i=0;i<data.result.length;i++){
            vm.LB_name.push(data.result[i].type)
            vm.LB_count.push({name:data.result[i].type,value:data.result[i].count})
          }
          vm.five_fn()
        },function(err){
          console.log(err);
        })

        //top3分布
        vm.$axios.request("post","repast/windowTop3",{flag:flag,date:time,name:ST},function(data){
          vm.TOP3_name=[]
          vm.TOP3_count =[]
          for(var i=0;i<data.result.length;i++){
            vm.TOP3_name.push(data.result[i].win)
            vm.TOP3_count.push(data.result[i].count)
          }
          vm.six_fn()
        },function(err){
          console.log(err);
        })*/
      },
      //echart
      //学历比例
      two_fn(){
        let two = this.$echarts.init(document.getElementById('two'), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: this.XL_type
          },
          series : [
            {
              name: '学历比例',
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

        two.setOption(option);
      },
      one_fn(){
        let one = this.$echarts.init(document.getElementById('one'), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: this.sex
          },
          series : [
            {
              name: '人员楼层分布',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.sex_num,
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

        one.setOption(option);
      },
      three_fn(){
        let three = this.$echarts.init(document.getElementById('three'), 'customed');
        let option = {
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
              name: '洲际比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.ZJ_count,
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

        three.setOption(option);
      },
      four_fn(){
        let four = this.$echarts.init(document.getElementById('four'), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data:this.age
          },
          series : [
            {
              name: '年龄比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.age_count,
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

        four.setOption(option);
      },
      five_fn(){
        let five = this.$echarts.init(document.getElementById('five'), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data:this.LB_name
          },
          series : [
            {
              name: '人员类别分布',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.LB_count,
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
        five.setOption(option);
      },
      six_fn(){
        let six = this.$echarts.init(document.getElementById('six'), 'customed');
        let option = {
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
              data : this.TOP3_name,
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
              name:'TOP3',
              type:'bar',
              barWidth: '20%',
              data:this.TOP3_count
            }
          ]
        };

        six.setOption(option);
      },
      seven_fn(){
        let seven = this.$echarts.init(document.getElementById('seven'), 'customed');
        let option = {
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
              data : this.LC_name,
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
              name:'楼层分布',
              type:'bar',
              barWidth: '30%',
              data:this.LC_count
            }
          ]
        };

        seven.setOption(option);
      },
    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.oneCard_ST_person = this.$echarts.init(document.getElementById('oneCard_ST_person'), 'customed')
      //this.room_timer = this.$echarts.init(document.getElementById('room_timer'), 'customed');
    },
    created(){
      let vm = this;
      vm.make_time()
      vm.menu()
      vm.time_init()
      //食堂总消费人数趋势
      this.dingingRoom_change(this.diningRoom_people_time_S,this.diningRoom_people_time_N)
      //食堂平均消费人数趋势
      this.dingingRoom_avg_change(this.diningRoom_avg_time_S,this.diningRoom_avg_time_N)
      //各食堂消费人员分析
      this.distribution_time_change_fn(this.distribution_time_S,this.distribution_time_N)
      //食堂三餐平均人数
      this.person_init_fn(this.ST_person_time_S,this.ST_person_time_N,this.roomSelect)

      this.ListAndLast_fn(this.diningRoom_list_time_S,this.diningRoom_list_time_N,this.eat_code)

      this.diningRoom_hot_change(this.diningRoom_hot_time)
      vm.eat_hot_Select = this.$route.query.type
      if(this.$route.query.type == '早餐'){
        this.flag = '1'
      }else if(this.$route.query.type == '午餐'){
        this.flag = '2'
      }else{
        this.flag = '3'
      }

      /*//人员楼层分布seven
      vm.$axios.request("post","repast/floorAnalyse",{flag:vm.flag,date:vm.eat_start_time},function(data){
        for(var i=0;i<data.result.length;i++){
          if(data.result[i].canteen !== '其他'){
            vm.LC_name.push(data.result[i].canteen)
            vm.LC_count.push(data.result[i].count)
          }
        }
        vm.seven_fn()
      },function(err){
        console.log(err);
      })*/
      this.all_JK_fn(this.flag,this.ST_time,this.roomSelect)
      //食堂实时人数分析
      /*this.room_timer_init(this.room_time)
      this.getListIng();*/
    }
  }
</script>

<style lang="scss" scoped>
  table{
    float: left;
    td{
      text-align: center;
      height: 40px;
      width: 90px;
      border: 1px solid rgba(1,1,1,0.2);
    }
    .black{
      background: rgba(23,24,28,0.5);
    }
  }
</style>
