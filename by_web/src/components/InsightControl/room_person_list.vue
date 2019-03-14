<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/control/eat_type' }">食堂就餐人数分析</el-breadcrumb-item>
      <el-breadcrumb-item>食堂人员分布</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg_left">
        <h5 class="ec_h5">
          食堂人员分布分析
          <div class="ec_h5_data">
            <el-select v-model="eatSelect" placeholder="请选择" size="mini" class="major-select" @change="eatChange">
              <el-option
                v-for="item in eatTypeList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-select v-model="roomSelect" placeholder="请选择" size="mini" class="major-select" @change="roomChange">
              <el-option
                v-for="item in roomTypeList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="start_time"
              type="date"
              format="yyyy-MM-dd"
              @change="start_time_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              style="margin-right: 15px"
              class="select_width"
              size="mini"
              v-model="end_time"
              type="date"
              format="yyyy-MM-dd"
              @change="end_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="8" class="ec_bg_left">
        <h5 class="ec_h5">
          国别比例TOP10
        </h5>
        <div class="ec_height" id="city">
        </div>
      </el-col>

      <el-col :span="8" class="ec_bg_left">
        <h5 class="ec_h5">
          人员类别比例
        </h5>
        <div class="ec_height" id="category">
        </div>
      </el-col>

      <el-col :span="8" class="ec_bg_left">
        <h5 class="ec_h5">
          学院比例TOP10
        </h5>
        <div class="ec_height" id="school">
        </div>
      </el-col>
    </el-row>


    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" style="padding-bottom: 50px">
        <h5 class="ec_h5" style="float: left;width: 100%">
          终端机消费情况&nbsp;&nbsp;&nbsp;&nbsp;(单位:万元)
          <div class="ec_h5_data" style="float: right; margin-left: 20px">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM"
              @change="ZDJ_S_time_change"
              v-model="ZDJ_S_time"
              type="month"
              placeholder="选择年">
            </el-date-picker>
          </div>
        </h5>
        <br>
        <div class="tab_warPer">
          <table v-for="list in countryList" class="table" style="margin: 10px">
            <tr>
              <td class="black" colspan="2">窗口名:{{list.name}}</td>
            </tr>
            <tr>
              <td>金额:{{list.value}}</td>
              <td>终端机名:{{list.code}}</td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>-->


    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" style="padding-bottom: 50px">
        <h5 class="ec_h5" style="float: left;width: 100%">
          终端机消费情况
          <div class="ec_h5_data" style="float: right; margin-left: 20px">
            <el-select v-model="ZDJ_Select" placeholder="请选择" size="mini" class="major-select" @change="ZDJ_Change">
              <el-option
                v-for="item in ZDJ_List"
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
              @change="ZDJ_S_time_change"
              v-model="ZDJ_S_time"
              type="date"
              placeholder="选择年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="ZDJ_E_time_change"
              v-model="ZDJ_E_time"
              type="date"
              placeholder="选择年">
            </el-date-picker>
          </div>
        </h5>
        <br>
        <div class="tab_warPer">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="食堂名称">
            </el-table-column>
            <el-table-column
              prop="name_C"
              label="窗口名称">
            </el-table-column>
            <el-table-column
              prop="name_J"
              label="终端机名称">
            </el-table-column>
            <el-table-column
              prop="A_count"
              label="消费金额(元)"
              sortable>
            </el-table-column>
            <el-table-column
              prop="C_count"
              label="刷卡次数(次)"
              sortable>
            </el-table-column>
            <el-table-column
              prop="J_count"
              label="次均消费额(元)"
              sortable>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<style lang="scss">


</style>
<script>
  import time from '../../config/timeFormat'
  export default {
    data() {
      return {

        isShow:true,
        eatSelect:'早餐',
        eat_type_code:'1',
        eatTypeList:['早餐','中餐','晚餐'],
        roomSelect:'清晏楼一层',
        roomTypeList:['清晏楼一层','清晏楼二层','家属区食堂','租赁档口','风味档口','教工餐厅'],
        start_time:'2016-01-01',
        end_time:'2017-01-01',
        //国别top10
        country_name:[],
        country_count:[],



        //人员类别
        people_name:[],
        people_count:[],

        //成绩比例
        result_name:[],
        result_count:[],



        //学院比例
        school_name:[],
        school_count:[],

        ZDJ_S_time:'2017-04-01',
        ZDJ_E_time:'2017-05-01',

        ZDJ_Select:'全部',
        select_flag:'',
        ZDJ_List:[
          '全部',
          '清晏楼一层',
          '清晏楼二层',
          '家属区食堂',
          '租赁档口',
          '风味档口',
          '教工餐厅'
        ],
        tableData: [],
      }
    },
    methods: {
      make_time(){
        let vm = this
        vm.start_time= time.year + '-' + '01' + '-' + '01'
        vm.end_time= time.year + '-' + time.month + '-' + time.day
        vm.ZDJ_S_time= time.year + '-' + '01' + '-' + '01'
        vm.ZDJ_E_time= time.year + '-' + time.month + '-' +time.day
      },
      //国别比例
      city_fn() {
        let city = this.$echarts.init(document.getElementById('city'), 'customed');
        let option = {
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
            }
          },
          legend: {
            data: ['国别比例TOP10']
          },
          grid: {
            left: '1%',
            right: '7%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: this.country_name
          },
          series: [
            {
              name: '国别比例TOP10',
              type: 'bar',
              data: this.country_count
            }
          ]
        };

        city.setOption(option);
      },

      //人员类别比例
      category() {
        let myChart = this.$echarts.init(document.getElementById('category'), 'customed');
        let option = {
          title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {

            left: 'center',
            data:this.people_name
          },
          series: [{
            name: '人员类别比例',
            type: 'pie',
            radius: '40%',
            center: ['50%', '60%'],
            data: this.people_count,
            label: {
              normal: {
                show: true,
                formatter: '{b} :({d}%)'
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
          }]
        };
        myChart.setOption(option);
      },
      //成绩比例
      result_fn() {
        let result = this.$echarts.init(document.getElementById('result'), 'customed');
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
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}元 ({d}%)"
          },
          legend: {

            left: 'center',
            data: this.result_name
          },
          series: [{
            name: '成绩比例',
            type: 'pie',
            radius: '40%',
            center: ['50%', '60%'],
            data: this.result_count,
            label: {
              normal: {
                show: true,
                formatter: '{b} : ({c}元)'
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
          }]
        };
        result.setOption(option);
      },

      //学院比例
      school_fn() {
        let school = this.$echarts.init(document.getElementById('school'), 'customed');
        let option = {
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
            }
          },
          legend: {
            data: ['学院比例TOP10']
          },
          grid: {
            left: '1%',
            right: '7%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: this.school_name
          },
          series: [
            {
              name: '国别比例TOP10',
              type: 'bar',
              data: this.school_count
            }
          ]
        };
        school.setOption(option);
      },


      //时间变化函数
      start_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.end_time){
          if(this.end_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.start_time = ''
            return
          }else{
            this.start_time = val
          }
        }else{
          vm.start_time = val
          vm.all_fn(vm.start_time,vm.end_time,vm.eat_type_code,vm.roomSelect )
        }

      },
      end_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.start_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.end_time = ''
          return
        }else{
          vm.end_time = val
          vm.all_fn(vm.start_time,vm.end_time,vm.eat_type_code,vm.roomSelect )
        }

      },
      //用餐类别选择插件
      eatChange(val){
        let vm = this
        vm.eatSelect = val
        if(val =='早餐'){
          vm.eat_type_code = '1'
        }else if(val =='中餐'){
          vm.eat_type_code = '2'
        }else{
          vm.eat_type_code = '3'
        }
        vm.all_fn(vm.start_time,vm.end_time,vm.eat_type_code,vm.roomSelect )
      },
      //食堂选择
      roomChange(val){
        let vm = this
        vm.roomSelect = val
        /*if(vm.roomSelect =='风味档口'){
          vm.isShow = false
        }else{
          vm.isShow = true
        }*/
        vm.all_fn(vm.start_time,vm.end_time,vm.eat_type_code,vm.roomSelect )
      },

      all_fn(start,end,flag,eat_type){
        let vm = this
        //国别比例top10
        vm.$axios.request("post","spread/nationTop10", {
          startDate:start,
          endDate:end,
          flag:flag,
          name:eat_type},function(data){
          vm.country_name = []
          vm.country_count = []
          for(var i = data.results.length-1;i>=0;i--){
            vm.country_name.push(data.results[i].country)
            vm.country_count.push(data.results[i].count)
          }
          vm.city_fn()
        },function(err){
          console.log(err);
        })



        //人员类比比例
        vm.$axios.request("post","spread/staffRatio", {
          startDate:start,
          endDate:end,
          flag:flag,
          name:eat_type},function(data){
          vm.people_name = []
          vm.people_count = []
          for(var i=0;i<data.results.length;i++){
            vm.people_name.push(data.results[i].type)
            vm.people_count.push({name:data.results[i].type,value:data.results[i].count})
          }
          vm.category()
        },function(err){
          console.log(err);
        })



        //学院比例
        vm.$axios.request("post","spread/instituteRatios", {
          startDate:start,
          endDate:end,
          flag:flag,
          name:eat_type},function(data){
          vm.school_name = []
          vm.school_count = []
          for(var i=data.results.length-1;i>=0;i--){
            vm.school_name.push(data.results[i].institute)
            vm.school_count.push(data.results[i].count)
          }
          vm.school_fn()
        },function(err){
          console.log(err);
        })
      },

      //终端机列表时间
      ZDJ_Change(val){
        let vm = this
        vm.ZDJ_Select= val
        if(vm.ZDJ_Select == '全部'){
          vm.select_flag = ''
        }else{
          vm.select_flag = vm.ZDJ_Select
        }
        vm.zdj_init_fn(vm.ZDJ_S_time,vm.ZDJ_E_time,vm.select_flag)
      },
      ZDJ_S_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.ZDJ_E_time){
          if(this.ZDJ_E_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.ZDJ_S_time = ''
            return
          }else{
            this.ZDJ_S_time = val
          }
        }else{
          this.ZDJ_S_time = val;
          vm.zdj_init_fn(vm.ZDJ_S_time,vm.ZDJ_E_time,vm.select_flag)
        }

      },
      ZDJ_E_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.ZDJ_S_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.ZDJ_E_time = ''
          return
        }else{
          this.ZDJ_E_time = val;
          vm.zdj_init_fn(vm.ZDJ_S_time,vm.ZDJ_E_time,vm.select_flag)
        }
      },
      zdj_init_fn(start,end,flag){
        let vm = this
        vm.$axios.request("post","spread/termConsume", {startTime:start,endTime:end,canteenname:flag},function(data){
          vm.tableData = []
          console.log(data)
          for(let i = 0; i<data.result.length;i++){
            vm.tableData.push({
              name : data.result[i].canteen,
              name_C : data.result[i].win,
              name_J : data.result[i].termname,
              A_count : data.result[i].moneycount,
              C_count: data.result[i].count*1,
              J_count:data.result[i].avg
            })
          }
        },function(err){
          console.log(err);
        })
      }
    },
    mounted() {
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);

    },
    created() {
      window.scrollTo(0,0);
      let vm = this;
      vm.make_time()
      vm.zdj_init_fn(vm.ZDJ_S_time,vm.ZDJ_E_time,vm.select_flag)
      vm.all_fn(vm.start_time,vm.end_time,vm.eat_type_code,vm.roomSelect )
    },
  }

</script>
