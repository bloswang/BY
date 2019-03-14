<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/control' }">消费行为分析</el-breadcrumb-item>
      <el-breadcrumb-item>超市消费</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          超市人数趋势
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
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          学历比例
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="education_start_time"
              type="month"
              format="yyyy-MM"
              @change="education_start_time_change"
              placeholder="选择时间">
            </el-date-picker>
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="education_end_time"
              type="month"
              format="yyyy-MM"
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
          年龄比例
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="CS_age_type_time_start"
              type="month"
              format="yyyy-MM"
              @change="CS_age_type_time_start_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="CS_age_type_time_end"
              type="month"
              format="yyyy-MM"
              @change="CS_age_type_time_end_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="CS_age_type">
        </div>
      </el-col>
    </el-row>
    <!--超市前十后十-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          商户消费前十名窗口分析
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
        <div class="ec_height" id="diningRoom_list"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          商户消费后十名窗口分析
        </h5>
        <div class="ec_height" id="diningRoom_last">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        Supermarket_time:'2017',
        slot_card_time:'2017',
        number_times_time:'2017',
        people_Average_time:'2017',
        diningRoom_people_time:'2017',
        people_type_time:'2017',
        country_type_start_time:'2015-06',
        country_type_end_time:'2017-06',
        education_start_time:'2016-08',
        education_end_time:'2017-08',
        CS_age_type_time_start:'2016-01',
        CS_age_type_time_end:'2017-01',
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

        list_count:['1','1','1','1','1','1','1','1',],
        list_name:['1','1','1','1','1','1','1','1',],

        last_count:['1','1','1','1','1','1','1','1',],
        last_name:['1','1','1','1','1','1','1','1',]
      }
    },
    methods:{
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
          this.education_start_time = startMonth
          this.education_end_time = month
          this.CS_age_type_time_start = startMonth
          this.CS_age_type_time_end = month

      },
      //超市消费趋势echarts函数
      Supermarket_num_fn(){
        let diningRoom_num = this.$echarts.init(document.getElementById('diningRoom_num'), 'customed');
        let option = {
          title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },
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
      //超市消费趋势时间时的函数
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
        //超市总消费金额分布
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
          title: {
            text: '单位(元)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },
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


      //食堂窗口分析echarts函数
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
      },//前十名
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
      },//后十名
      //食堂窗口选择时间时的函数
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
      }

    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
    },
    created() {
      let vm = this;
      vm.time_init()
      //食堂总消费金额分布
      vm.menu()
      vm.ten_init_fn(vm.ten_start,vm.ten_end)
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

<style>
  .ec_height1{
    height: 300px;
  }
</style>
