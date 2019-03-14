<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/control' }">消费行为分析</el-breadcrumb-item>
      <el-breadcrumb-item>食堂消费分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
        各食堂月消费金额分布
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="diningRoom_timeS"
              type="date"
              format="yyyy-MM-dd"
              @change="diningRoom_timeS_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="diningRoom_timeN"
              type="date"
              format="yyyy-MM-dd"
              @change="diningRoom_timeN_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="diningRoom_num"></div>
      </el-col>
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          食堂周期热度
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
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          食堂总消费人数趋势
          <div class="ec_h5_data">
            <el-select v-model="EAT_select" placeholder="请选择" size="mini" class="select_width" @change="EAT_change">
              <el-option
                v-for="item in EAT_List"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-select v-model="EAT_room" placeholder="请选择" size="mini" class="select_width" @change="ROOM_change">
              <el-option
                v-for="item in ROOM_List"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="diningRoom_people_time"
              type="month"
              format="yyyy-MM"
              @change="diningRoom_people_time_change"
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
          食堂总消费人员分布
          <el-button size="mini" @click="skip('room_person_list')">分析</el-button>
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="distribution_time"
              type="month"
              format="yyyy-MM"
              @change="distribution_time_change"
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
          食堂消费前十名窗口分析
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
              v-model="diningRoom_list_time"
              type="month"
              format="yyyy-MM"
              @change="diningRoom_list_time_change"
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
          食堂消费后十名窗口分析
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
        diningRoom_timeS:'2017-01-01',
        diningRoom_timeN:'2018-01-01',
        diningRoom_hot_time:'',
        //食堂总消费人数趋势
        diningRoom_people_time:'',
        EAT_select:'早餐',
        EAT_code:'1',
        EAT_List:['早餐','午餐','晚餐'],
        EAT_room:'清晏楼一层',
        ROOM_List:['清晏楼一层','清晏楼二层','家属区食堂','租赁档口','风味档口'],

        distribution_time:'',
        diningRoom_list_time:'',
        eatSelect:'早餐',
        eat_code:'1',
        eatTypeList:['早餐','午餐','晚餐'],
        diningRoom_num_type:[],
        diningRoom_num:[],
        diningRoom_hot_num:[],
        diningRoom_person_num:[],
        diningRoom_data:[],
        distribution_count:[],
        distribution_type:[],
        diningRoom_list_count:[],
        diningRoom_list_name:[],
        diningRoom_last_count:[],
        diningRoom_last_name:[]
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
        this.diningRoom_time = startMonth
        this.diningRoom_hot_time = startMonth
        this.diningRoom_people_time = startMonth
        this.distribution_time = startMonth
        this.diningRoom_list_time = startMonth

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

      //食堂总消费金额分布echarts函数
      diningRoom_num_fn(){
        let diningRoom_num = this.$echarts.init(document.getElementById('diningRoom_num'), 'customed');
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
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            x: "left",
            data:this.diningRoom_num_type
          },
          label: {
            normal: {
              formatter: "{b} ({d}%)",
              position: "insideTopRight"
            }
          },
          labelLine: {
            normal: {
              smooth: .6
            }
          },

          calculable: !0,
          series: [{
            name: "食堂消费金额分类",
            type: "pie",
            roseType: "area",
            label: {
              normal: {
                show: !0
              },
              emphasis: {
                show: !0
              }
            },
            lableLine: {
              normal: {
                show: !0
              },
              emphasis: {
                show: !0
              }
            },
            data: this.diningRoom_num
          }]
        };
        diningRoom_num.setOption(option);
      },
      //食堂消费选择时间时的函数
      diningRoom_timeS_change(val){
        if(val == undefined){
          return
        }else if(val >this.diningRoom_timeN){
          if(this.diningRoom_timeN!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.diningRoom_timeS = ''
            return
          }else{
            this.diningRoom_timeS = val
          }
        }else{
          this.diningRoom_timeS = val
          this.diningRoom_num_change(this.diningRoom_timeS,this.diningRoom_timeN)
        }
      },
      diningRoom_timeN_change(val){
        if(val == undefined){
          return
        }else if(val<this.diningRoom_timeS){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.diningRoom_timeN = ''
          return
        }else{
          this.diningRoom_timeN = val
          this.diningRoom_num_change(this.diningRoom_timeS,this.diningRoom_timeN)
        }

      },
      diningRoom_num_change(start,end){
        let vm = this;
        //食堂总消费金额分布
        vm.$axios.request("post","canteen/canteenConsumeDis",{startDate:start,endDate:end},function(data){
          vm.diningRoom_num = []
          vm. diningRoom_num_type=[]
          for(var i=0;i<data.result.length;i++){
            vm.diningRoom_num.push({name:data.result[i].canteen,value:Math.round(data.result[i].charge)})
            vm. diningRoom_num_type.push(data.result[i].canteen)
          }
          vm.diningRoom_num_fn()
        },function(err){
          console.log(err);
        })
      },
      //食堂周期热度echarts函数
      diningRoom_hot_fn(){
        let diningRoom_hot = this.$echarts.init(document.getElementById('diningRoom_hot'), 'customed');
        let option = {
          title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },
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

      //食堂总消费人数趋势echarts函数
      diningRoom_people_fn(){
        let diningRoom_people = this.$echarts.init(document.getElementById('diningRoom_people'), 'customed');
        let option = {
          title: {
            text: '单位(人)',
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
            data: [this.diningRoom_people_time+'月消费人数趋势']
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
            data: this.diningRoom_data
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name:this.diningRoom_people_time+'月消费人数趋势',
            type: 'line',
            stack: '总量',
            data: this.diningRoom_person_num
          }]
        };
        diningRoom_people.setOption(option);
      },
      //食堂总消费人数趋势选择时间时的函数
      diningRoom_people_time_change(val){
        if(val == undefined){
          return
        }else{
          this.diningRoom_people_time = val
          this.dingingRoom_change(this.diningRoom_people_time,this.EAT_code,this.EAT_room)
        }

      },
      EAT_change(val){
        let vm = this
        vm.EAT_select = val
        if(val =='早餐'){
          vm.EAT_code = '1'
        }else if(val =='午餐'){
          vm.EAT_code = '2'
        }else{
          vm.EAT_code = '3'
        }
        vm.dingingRoom_change(this.diningRoom_people_time,this.EAT_code,this.EAT_room)
      },
      ROOM_change(val){
        let vm = this
        vm.EAT_room = val
        vm.dingingRoom_change(this.diningRoom_people_time,this.EAT_code,this.EAT_room)
      },
      dingingRoom_change(month,flag,room){
        //食堂总消费人数趋势
        var vm = this
        vm.$axios.request("post","canteen/canteenConsumersTrend",{date:month,flag:flag,canteen:room},function(data){
          vm.diningRoom_person_num = []
          vm.diningRoom_data = []
          for(var i=0;i<data.result.length;i++){
            vm.diningRoom_person_num.push(data.result[i].count)
            vm.diningRoom_data.push(data.result[i].day+'日')
          }
          vm.diningRoom_people_fn()
        },function(err){
          console.log(err);
        })

      },

      //食堂人员分布echarts函数
      personnel_distribution_fn(){
        let personnel_distribution = this.$echarts.init(document.getElementById('personnel_distribution'), 'customed');
        let option = {
          title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },
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
              barWidth: '60%',
              data:this.distribution_count
            }
          ]
        };
        personnel_distribution.setOption(option);
      },
      //食堂人员分布选择时间时的函数
      distribution_time_change(val){
        if(val == undefined){
          return
        }else{
          this.distribution_time = val
          this.distribution_time_change_fn(this.distribution_time)
        }

      },
      distribution_time_change_fn(time){
        var vm = this
        //食堂总消费人员分布
        vm.$axios.request("post","canteen/canteenConsumerDis",{date:time},function(data){
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
      diningRoom_list_time_change(val){
        if(val == undefined){
          return
        }else{
          this.diningRoom_list_time = val
          this.ListAndLast_fn(this.diningRoom_list_time,this.eat_code)
        }

      },
      ListAndLast_fn(time,flag){
        var vm = this
        //食堂消费前十名
        vm.$axios.request("post","canteen/canteenWindowAnalyzeTop10",{date:time,flag:flag},function(data){
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
        vm.$axios.request("post","canteen/canteenWindowAnalyzeLast10",{date:time,flag:flag},function(data){
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

        this.ListAndLast_fn(this.diningRoom_list_time,this.eat_code)
      }
    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
    },
    created() {
      window.scrollTo(0,0);
      let vm = this;
      vm.menu()
      vm.time_init()
      //食堂总消费金额分布
      this.diningRoom_num_change(this.diningRoom_timeS,this.diningRoom_timeN)
      //食堂周期热度
      vm.$axios.request("post","canteen/canteenWeekConsume",{date:vm.diningRoom_hot_time},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.diningRoom_hot_num.push(data.result[i].count)
        }
        vm.diningRoom_hot_fn()
      },function(err){
        console.log(err);
      })

      vm.dingingRoom_change(this.diningRoom_people_time,this.EAT_code,this.EAT_room)

      //食堂总消费人员分布
      vm.$axios.request("post","canteen/canteenConsumerDis",{date:vm.distribution_time},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.distribution_count.push(data.result[i].count)
          vm.distribution_type.push(data.result[i].canteen)
        }
        vm.personnel_distribution_fn()
      },function(err){
        console.log(err);
      })

      //食堂消费前十名
      vm.$axios.request("post","canteen/canteenWindowAnalyzeTop10",{date:vm.diningRoom_list_time,flag:vm.eat_code},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.diningRoom_list_name.push(data.result[i].win)
          vm.diningRoom_list_count.push({name:data.result[i].dptcode,value:data.result[i].count})
        }
        vm.diningRoom_list_fn()
      },function(err){
        console.log(err);
      })
      //食堂消费后十名
      vm.$axios.request("post","canteen/canteenWindowAnalyzeLast10",{date:vm.diningRoom_list_time,flag:vm.eat_code},function(data){
        console.log(data)
        for(var i=0;i<data.result.length;i++){
          vm.diningRoom_last_count.push({name:data.result[i].dptcode,value:data.result[i].count})
          vm.diningRoom_last_name.push(data.result[i].win)
        }
        vm.diningRoom_last_fn()
      },function(err){
        console.log(err);
      })
    }
  }
</script>

<style lang="scss" scoped>
  .major-select {
    width: 130px;
  }

</style>
