x<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/control/eat_type' }">食堂就餐人数分析</el-breadcrumb-item>
      <el-breadcrumb-item>{{name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          {{name}}消费时间趋势
          <div class="ec_h5_data">
            <el-date-picker
              size="mini"
              v-model="diningRoom_time"
              type="month"
              format="yyyy-MM"
              @change="diningRoom_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="diningRoom_num">
        </div>
      </el-col>
    </el-row>-->

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          {{name}}:刷卡金额  ({{diningRoom_hot_time}}年)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="diningRoom_hot_time"
              type="year"
              format="yyyy"
              @change="diningRoom_hot_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="diningRoom_hot">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
       <el-col :span="24" class="ec_bg">
         <h5 class="ec_h5">
           {{name}}:刷卡次数  ({{number_times_time}}年)
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
         <div class="ec_height" id="number_times">
         </div>
       </el-col>
     </el-row>
    <el-row type="flex" justify="space-around">
       <el-col :span="24" class="ec_bg">
         <h5 class="ec_h5">
           {{name}}:人均消费  ({{people_Average_time}}年)
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
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          男女比例
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="people_type_time_start"
              type="month"
              format="yyyy-MM"
              @change="people_type_time_start_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="people_type_time_end"
              type="month"
              format="yyyy-MM"
              @change="people_type_time_end_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="people_type">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          年龄比例
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="age_type_time_start"
              type="month"
              format="yyyy-MM"
              @change="age_type_time_start_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="age_type_time_end"
              type="month"
              format="yyyy-MM"
              @change="age_type_time_end_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="age_type">
        </div>
      </el-col>
    </el-row>-->
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          人员类别比例
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="education_type_time_start"
              type="month"
              format="yyyy-MM"
              @change="education_type_time_start_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="education_type_time_end"
              type="month"
              format="yyyy-MM"
              @change="education_type_time_end_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="education_type">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          国别比例TOP5
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="country_type_time_start"
              type="month"
              format="yyyy-MM"
              @change="country_type_time_start_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="country_type_time_end"
              type="month"
              format="yyyy-MM"
              @change="country_type_time_end_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="country_type">
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
        name:'',
        code:'',
        diningRoom_time:'',

        //刷卡金额
        diningRoom_hot_time:'2017',
        card_month:[],
        card_money:[],
        //刷卡次数
        number_times_time:'2017',
        number_month:[],
        card_number:[],
        //人均消费
        people_Average_time:'2017',
        svg_month:[],
        card_svg:[],
        diningRoom_people_time:'',
        /*//男女比例
        people_type_time_start:'2016-07',
        people_type_time_end:'2017-07',
        people_type_name:[],
        people_type_count:[],

        //年龄比例
        age_type_time_start:'2016-01',
        age_type_time_end:'2017-01',
        age_type_name:[],
        age_type_count:[],*/

        //国别比例
        country_type_time_start:'2016-01',
        country_type_time_end:'2017-01',
        country_type_name:[],
        country_type_count:[],

        //人员类别
        education_type_time_start:'2016-01',
        education_type_time_end:'2017-01',
        education_type_name:[],
        education_type_count:[],


      }
    },
    methods:{
      make_time(){
        let vm = this
        vm.diningRoom_hot_time= time.year
        vm.number_times_time= time.year
        vm.people_Average_time= time.year
        vm.country_type_time_start= time.year + '-' + '01'
        vm.country_type_time_end= time.year + '-' + time.month
        vm.education_type_time_start= time.year + '-' + '01'
        vm.education_type_time_end= time.year + '-' + time.month
      },
      menu() {
        window.scrollTo(0,0);
      },

      /*//超市消费趋势echarts函数
      diningRoom_num_fn(){
        let diningRoom_num = this.$echarts.init(document.getElementById('diningRoom_num'), 'customed');
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
              data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
              data:[10, 52, 200, 334, 390, 330, 220]
            }
          ]
        };
        diningRoom_num.setOption(option);
      },
      //超市消费趋势时间时的函数
      diningRoom_time_change(val){

      },*/

      //刷卡金额echarts函数
      diningRoom_hot_fn(){
        let diningRoom_hot = this.$echarts.init(document.getElementById('diningRoom_hot'), 'customed');
        let option = {
          color:['#FA0C62'],
          title: {
            text: '单位(万元)',
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
            },
            formatter: '{b} : {c}万元'
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
            data: this.card_month
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '刷卡金额',
            type: 'line',
            stack: '总量',
            data: this.card_money
          }]
        };
        diningRoom_hot.setOption(option);
      },
      //刷卡金额选择时间时的函数
      diningRoom_hot_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.diningRoom_hot_time = val
          //刷卡金额
          vm.$axios.request("post","canteen/windowCardMoney",{year:vm.diningRoom_hot_time,flag:'0',dptcode:vm.code},function(data){
            vm.card_month = []
            vm.card_money = []
            for(let i=0;i<data.result.length;i++){
              vm.card_month.push(data.result[i].month+'月')
              vm.card_money.push(data.result[i].count)
            }
            vm.diningRoom_hot_fn()
          },function(err){
            console.log(err);
          })
        }


      },

      //刷卡次数echarts函数
      number_times_fn(){
        let number_times = this.$echarts.init(document.getElementById('number_times'), 'customed');
        let option = {
          color:['#40F828'],
          title: {
            text: '单位(次)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
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
            },
            formatter: '{b} : {c}次'
          },
          legend: {
            data: ['刷卡次数']
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
            data: this.number_month
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '刷卡次数',
            type: 'line',
            stack: '总量',
            data: this.card_number
          }]
        };
        number_times.setOption(option);
      },
      //刷卡次数选择时间时的函数
      number_times_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.number_times_time = val
          //刷卡次数
          vm.$axios.request("post","canteen/windowCardCount",{year:vm.number_times_time,flag:'0',dptcode:vm.code},function(data){
            vm.number_month = []
            vm.card_number = []
            for(let i=0;i<data.result.length;i++){
              vm.number_month.push(data.result[i].month+'月')
              vm.card_number.push(data.result[i].count)
            }
            vm.number_times_fn()
          },function(err){
            console.log(err);
          })
        }

      },

      //人均消费echarts函数
      people_Average_fn(){
        let people_Average = this.$echarts.init(document.getElementById('people_Average'), 'customed');
        let option = {
          color:['#69E6F8'],
          title: {
            text: '单位(元)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
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
            },
            formatter: '{b} : {c}元'
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
            data: this.svg_month
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '人均消费',
            type: 'line',
            stack: '总量',
            data: this.card_svg
          }]
        };
        people_Average.setOption(option);
      },
      //人均消费选择时间函数
      people_Average_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.people_Average_time = val
          //人均消费
          vm.$axios.request("post","canteen/windowAverageConsume",{year:vm.people_Average_time,flag:'0',dptcode:vm.code},function(data){
            vm.svg_month = []
            vm.card_svg = []
            for(let i=0;i<data.result.length;i++){
              vm.svg_month.push(data.result[i].month+'月')
              vm.card_svg.push(Math.round(data.result[i].count))
            }
            vm.people_Average_fn()
          },function(err){
            console.log(err);
          })
        }

      },

      /*//男女比例
      people_type_fn(){
        let people_type = this.$echarts.init(document.getElementById('people_type'), 'customed');
        let option = {
          title: {
            text: '单位(万元)',
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
            orient: 'vertical',
            left: 'left',
            data: this.people_type_name
          },
          series : [
            {
              name: '男女比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.people_type_count,
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
      people_type_time_start_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.people_type_time_end){
          if(this.people_type_time_end!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.people_type_time_start = ''
            return
          }else{
            this.people_type_time_start = val
          }
        }else{
          vm.people_type_time_start = val
          vm.people_time_change_fn(vm.people_type_time_start,vm.people_type_time_end)
        }

      },
      people_type_time_end_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.people_type_time_start){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.people_type_time_end = ''
          return
        }else{
          vm.people_type_time_end = val
          vm.people_time_change_fn(vm.people_type_time_start,vm.people_type_time_end)
        }

      },
      people_time_change_fn(start,end){
        let vm = this
        //男女比例
        vm.$axios.request("post","canteen/windowSex",{startTime:start,endTime:end,dptcode:vm.code},function(data){
          vm.people_type_name = []
          vm.people_type_count = []
          for(let i=0;i<data.result.length;i++){
            vm.people_type_name.push(data.result[i].sex)
            vm.people_type_count.push({name:data.result[i].sex,value:data.result[i].money})
          }
          vm.people_type_fn()
        },function(err){
          console.log(err);
        })
      },
      //年龄比例
      age_type_fn(){
        let age_type = this.$echarts.init(document.getElementById('age_type'), 'customed');
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
            formatter: "{a} <br/>{b} : {c}人 ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.age_type_name
          },
          series : [
            {
              name: '年龄比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.age_type_count,
              label: {
                normal: {
                  show: true,
                  formatter: '{b} : {c}人  ({d}%)'
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
        age_type.setOption(option);
      },
      age_type_time_start_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.age_type_time_end){
          if(this.age_type_time_end!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.age_type_time_start = ''
            return
          }else{
            this.age_type_time_start = val
          }
        }else{
          vm.age_type_time_start = val
          vm.age_time_change_fn(vm.age_type_time_start,vm.age_type_time_end)
        }

      },
      age_type_time_end_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.age_type_time_start){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.age_type_time_end = ''
          return
        }else{
          vm.age_type_time_end = val
          vm.age_time_change_fn(vm.age_type_time_start,vm.age_type_time_end)
        }


      },
      age_time_change_fn(start,end){
        let vm = this
        //年龄类别比例
        vm.$axios.request("post","canteen/windowAgeCategory",{startTime:start,endTime:end,dptcode:vm.code},function(data){
          vm.age_type_name = []
          vm.age_type_count = []
          for(let i=0;i<data.result.length;i++){
            vm.age_type_name.push(data.result[i].age )
            vm.age_type_count.push({name:data.result[i].age ,value:data.result[i].count})
          }
          vm.age_type_fn()
        },function(err){
          console.log(err);
        })
      },*/
      //国别比例
      country_type_fn(){
        let country_type = this.$echarts.init(document.getElementById('country_type'), 'customed');
        let option = {
          color:['#A9FBBA'],
          title: {
            text: '单位(万元)',
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
            formatter: "{a} <br/>{b} : {c}万元"
          },
          legend: {
            data: ['国别比例TOP5']
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
            data: this.country_type_name
          },
          series: [{
            name: '国别比例TOP5',
            type: 'bar',
            data: this.country_type_count
          }]
        };

        country_type.setOption(option);
      },
      country_type_time_start_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.country_type_time_end){
          if(this.country_type_time_end!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.country_type_time_start = ''
            return
          }else{
            this.country_type_time_start = val
          }
        }else{
          vm.country_type_time_start = val
          vm.country_time_change_fn(vm.country_type_time_start,vm.country_type_time_end)
        }

      },
      country_type_time_end_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.country_type_time_start){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.country_type_time_end = ''
          return
        }else{
          vm.country_type_time_end = val
          vm.country_time_change_fn(vm.country_type_time_start,vm.country_type_time_end)
        }

      },
      country_time_change_fn(start,end){
        let vm = this
        //国别比例
        vm.$axios.request("post","canteen/windowCountryRatio",{startTime:start,endTime:end,dptcode:vm.code},function(data){
          vm.country_type_name = []
          vm.country_type_count = []
          for(let i = data.result.length-1 ; i >= 0; i--){
            vm.country_type_name.push(data.result[i].country)
            vm.country_type_count.push(data.result[i].count)
          }
          vm.country_type_fn()
        },function(err){
          console.log(err);
        })
      },

      //人员类别比例
      education_type_fn(){
        let education_type = this.$echarts.init(document.getElementById('education_type'), 'customed');
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
            formatter: "{a} <br/>{b} : {c}人 ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data:this.education_type_name
          },
          series : [
            {
              name:'人员类别比例',
              type:'pie',
              radius : [30, 110],
              center : ['50%', '50%'],
              roseType : 'radius',
              data:this.education_type_count,
              label: {
                normal: {
                  show: true,
                  formatter: '{b} : {c}人  ({d}%)'
                },
                emphasis: {
                  show: true
                }
              },
            },
          ]
        };

        education_type.setOption(option);
      },
      education_type_time_start_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.education_type_time_end){
          if(this.education_type_time_end!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.education_type_time_start = ''
            return
          }else{
            this.education_type_time_start = val
          }
        }else{
          vm.education_type_time_start = val
          vm.education_time_change_fn(vm.education_type_time_start,vm.education_type_time_end)
        }

      },
      education_type_time_end_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.education_type_time_start){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.education_type_time_end = ''
          return
        }else{
          vm.education_type_time_end = val
          vm.education_time_change_fn(vm.education_type_time_start,vm.education_type_time_end)
        }

      },
      education_time_change_fn(start,end){
        let vm = this
        //人员类别比例
        vm.$axios.request("post","canteen/windowStaffCategory",{startTime:start,endTime:end,dptcode:vm.code},function(data){
          vm.education_type_name = []
          vm.education_type_count = []
          for(let i=0;i<data.result.length;i++){
            vm.education_type_name.push(data.result[i].type)
            vm.education_type_count.push({name:data.result[i].type,value:data.result[i].count})
          }
          vm.education_type_fn()
        },function(err){
          console.log(err);
        })

      },




    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      //this.diningRoom_hot_fn()
      this.name =this.$route.query.name
      this.code = this.$route.query.code
    },
    created(){
      this.make_time()
      this.menu()
      let vm = this
      //刷卡金额
      this.code = this.$route.query.code
      vm.$axios.request("post","canteen/windowCardMoney",{year:vm.diningRoom_hot_time,flag:'0',dptcode:vm.code},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.card_month.push(data.result[i].month+'月')
          vm.card_money.push(data.result[i].count)
        }
        vm.diningRoom_hot_fn()
        },function(err){
        console.log(err);
      })

      //刷卡次数
      vm.$axios.request("post","canteen/windowCardCount",{year:vm.diningRoom_hot_time,flag:'0',dptcode:vm.code},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.number_month.push(data.result[i].month+'月')
          vm.card_number.push(data.result[i].count)
        }
        vm.number_times_fn()
      },function(err){
        console.log(err);
      })

      //人均消费
      vm.$axios.request("post","canteen/windowAverageConsume",{year:vm.diningRoom_hot_time,flag:'0',dptcode:vm.code},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.svg_month.push(data.result[i].month+'月')
          vm.card_svg.push(Math.round(data.result[i].count))
        }
        vm.people_Average_fn()
      },function(err){
        console.log(err);
      })



      //国别比例
      vm.$axios.request("post","canteen/windowCountryRatio",{startTime:vm.country_type_time_start,endTime:vm.country_type_time_end,dptcode:vm.code},function(data){
        for(let i = data.result.length-1 ; i >= 0; i--){
          vm.country_type_name.push(data.result[i].country)
          vm.country_type_count.push(data.result[i].count)
        }
        vm.country_type_fn()
      },function(err){
        console.log(err);
      })

      //人员类别比例
      vm.$axios.request("post","canteen/windowStaffCategory",{startTime:vm.education_type_time_start,endTime:vm.education_type_time_end,dptcode:vm.code},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.education_type_name.push(data.result[i].type)
          vm.education_type_count.push({name:data.result[i].type,value:data.result[i].count})
        }
        vm.education_type_fn()
      },function(err){
        console.log(err);
      })

      /*//年龄类别比例
      vm.$axios.request("post","canteen/windowAgeCategory",{startTime:vm.age_type_time_start,endTime:vm.age_type_time_end,dptcode:vm.code},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.age_type_name.push(data.result[i].age )
          vm.age_type_count.push({name:data.result[i].age ,value:data.result[i].count})
        }
        vm.age_type_fn()
      },function(err){
        console.log(err);
      })
      //男女比例
      vm.$axios.request("post","canteen/windowSex",{startTime:vm.people_type_time_start,endTime:vm.people_type_time_end,dptcode:vm.code},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.people_type_name.push(data.result[i].sex)
          vm.people_type_count.push({name:data.result[i].sex,value:data.result[i].money})
        }
        vm.people_type_fn()
      },function(err){
        console.log(err);
      })*/

    }
  }
</script>

<style>

</style>
