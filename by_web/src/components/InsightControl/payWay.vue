<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item>充值行为分析</el-breadcrumb-item>
    </el-breadcrumb>

    <!--<el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          男女人数比例&nbsp;&nbsp;(单位:人)
        </h5>
        <div class="ec_height" id="one"></div>
      </el-col>
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          学院比例&nbsp;&nbsp;(单位:人)
        </h5>
        <div class="ec_height" id="four"></div>
      </el-col>
    </el-row>-->
    <!--各类人员充值金额分析-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          各类人员充值金额分析&nbsp;&nbsp;(单位:万元)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="card_time_S"
              type="date"
              format="yyyy-MM-dd"
              @change="card_time_S_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="card_time_N"
              type="date"
              format="yyyy-MM-dd"
              @change="card_time_N_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="card_in">
        </div>
      </el-col>
    </el-row>
    <!--各类人员充值方式分析-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5" >
          各类人员充值方式分析&nbsp;&nbsp;(单位:万元)
          <div class="ec_h5_data" style="float: right; margin-left: 20px">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="CZ_sum_time_S_change"
              v-model="CZ_sum_time_S"
              type="date"
              placeholder="选择年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="CZ_sum_time_N_change"
              v-model="CZ_sum_time_N"
              type="date"
              placeholder="选择月">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="oneCard_CZ_sum">
        </div>
      </el-col>
    </el-row>
    <!--终端机充值人次-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          自助终端机充值人次 &nbsp;&nbsp;(单位:人次)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="Terminal_time_S"
              type="date"
              format="yyyy-MM-dd"
              @change="Terminal_time_S_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="Terminal_time_N"
              type="date"
              format="yyyy-MM-dd"
              @change="Terminal_time_N_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="five"></div>
      </el-col>
    </el-row>

    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <div class="tab_warPer" style="margin-bottom: 20px">
          <table class="table table_four" v-for="list in Terminal_data"  style = 'margin:15px;'>
            <tr>
              <td class="black" colspan="3">{{list.place}}</td>
            </tr>
            <tr>
              <td>充值人数</td>
              <td>充值人次</td>
              <td>充值金额</td>
            </tr>
            <tr>
              <td>{{list.renShu}}</td>
              <td>{{list.renCi}}</td>
              <td>
                <a href="javascript:;" class='blue' @click="open_window(list.code)">{{list.money}}</a>
              </td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>
    <el-dialog

      title='充值学生详情列表'
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="ec_height" id="policy">
        <el-table :data="listData" style="width: 100%"
                  v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)">

          <el-table-column prop="name" align="center" label="姓名" class-name="elTableName">
          </el-table-column>
          <el-table-column prop="age" align="center" label="年龄" class-name="elTableName">
          </el-table-column>
          <el-table-column prop="school" align="center" label="学院" class-name="elTableName">
          </el-table-column>
          <el-table-column prop="school_type" align="center" label="专业" class-name="elTableName">
          </el-table-column>
          <el-table-column prop="money" align="center" label="充值金额" class-name="elTableName">
          </el-table-column>
          <el-table-column prop="time" align="center" label="充值时间" class-name="elTableName">
          </el-table-column>
        </el-table>

        <div class="block"  style="width:300px;margin:20px auto">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync= pageNum
            :page-size= size
            layout="total, prev, pager, next"
            :total=total_count>
          </el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close_yes">确 定</el-button>
      </span>
    </el-dialog>-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" style="margin-bottom: 0">
        <div class="ec_h5" style="height: 30px;">
          <span style="font-weight: bold;font-size: 16px;">充值行为分析</span>
          <el-select  v-model="moneySelect" placeholder="请选择充值方式" size="mini" class="money_select" @change="moneyChange">
            <el-option
              v-for="(item,index) in moneyList"
              :key="item"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
          <el-date-picker
            align="right"
            size='mini'
            format="yyyy-MM"
            @change="money_time_change"
            v-model="money_time"
            type="month"
            class="money_select"
            placeholder='选择时间'>
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          人员类别比例&nbsp;&nbsp;(单位:人)
        </h5>
        <div class="ec_height" id="three"></div>
      </el-col>
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          金额比例&nbsp;&nbsp;(单位:人)
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
        loading:true,
        dialogVisible:false,
        moneySelect:'人工现金充值',
        moneyList:['人工现金充值','自助现金充值','微信充值','支付宝充值','银行卡充值'],
        money_time:'2017-08',
        person_sex:[],
        person_count:[],
        money_extent:[],
        money_count:[],
        personnel_type:[],
        personnel_count:[],
        school_type:[],
        school_count:[],
        select_change:'0',
        select_time:'2017-07',

        //充值机人次
        Terminal_time_S:'2017-01-01',
        Terminal_time_N:'2017-12-30',
        Terminal_name:[],
        Terminal_count:[],
        Terminal_data:[],
        Terminal_code:'',
        listData: [],
        pageNum:1,
        size:9,
        total_count:0,



        //五个卡类别充值情况分析
        card_in_dom:'',
        card_time_S:'2017-01-01',
        card_time_N:'2018-01-01',
        card_type:[],
        card_count:[],

        //各类人员充值方式分析
        oneCard_CZ_sum:'',
        CZ_sum_time_S:'2017-01-01',
        CZ_sum_time_N:'2018-01-01',
        CZ_count1:[],
        CZ_count2:[],
        CZ_count3:[],
        CZ_count4:[],
        CZ_count5:[],
        CZ_name:[],

      }
    },
    methods:{
      make_time(){
        let vm = this
          vm.money_time = time.year + '-' +time.month
          vm.select_time= time.year + '-' +time.month
          vm.Terminal_time_S= time.year + '-' + '01'+'-' + '01'
          vm.Terminal_time_N= time.year + '-' + time.month + '-' + time.day
          vm.card_time_S= time.year + '-' + '01'+'-' + '01'
          vm.card_time_N= time.year + '-' + time.month + '-' + time.day
          vm.CZ_sum_time_S= time.year + '-' + '01'+'-' + '01'
          vm.CZ_sum_time_N= time.year + '-' + time.month + '-' + time.day
      },
      menu() {
        window.scrollTo(0,0);
      },
      moneyChange(value){
        this.select_change = value
        this.all_charts_change(this.select_time,this.select_change)
      },

      //时间选择
      money_time_change(val){
        if(val == undefined){
          return
        }else{
          this.money_time = val
          this.all_charts_change(this.money_time,this.select_change)
        }

      },
      //echarts函数
      /*one_fn(){
        let one = this.$echarts.init(document.getElementById('one'), 'customed');
        let option = {
          /!*title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },*!/
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}人 ({d}%)"
          },
          legend: {
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
                  formatter: "{b} : {c}人 ({d}%)"
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
      },*/
      two_fn(){
        let two = this.$echarts.init(document.getElementById('two'), 'customed');
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
            left: 'left',
            data: this.money_extent
          },
          series : [
            {
              name: '充值金额（元）',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.money_count,
              label: {
                normal: {
                  formatter: "{b}元"
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
      three_fn(){
        let three = this.$echarts.init(document.getElementById('three'), 'customed');
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
            left: 'left',
            data: this.personnel_type
          },
          series : [
            {
              name: '人员类别',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.personnel_count,
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

        three.setOption(option);
      },
      /*four_fn(){
        let four = this.$echarts.init(document.getElementById('four'), 'customed');
        let option = {
          /!*title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },*!/
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}人 ({d}%)"
          },
          legend: {
            left: 'left',
            data: this.school_type
          },
          series : [
            {
              name: '学院比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.school_count,
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

        four.setOption(option);
      },*/
      all_charts_change(time,index){
        let vm = this;
        //男女比例
        /*vm.$axios.request("post","/recharge/rechargeSex",{date:time,flag:index},function(data){
          vm.person_sex=[]
          vm.person_count=[]
          for(let i=0;i<data.result.length;i++){
            vm.person_sex.push(data.result[i].sex)
            vm.person_count.push({name:data.result[i].sex,value:data.result[i].count})
          }
          vm.one_fn()
        },function(err){
          console.log(err);
        })
        //学院比例
        vm.$axios.request("post","/recharge/academyRatio",{date:time,flag:index},function(data){
          vm.school_type=[]
          vm.school_count = []
          for(let i=0;i<data.result.length;i++){
            vm.school_type.push(data.result[i].academy)
            vm.school_count.push({name:data.result[i].academy,value:data.result[i].count})
          }
          vm.four_fn()
        },function(err){
          console.log(err);
        })*/
        //金额比例
        vm.$axios.request("post","/recharge/amountProportion",{date:time,flag:index},function(data){
          vm.money_extent=[]
          vm.money_count = []
          for(let i=0;i<data.result.length;i++){
            vm.money_extent.push(data.result[i].extent)
            vm.money_count.push({name:data.result[i].extent,value:data.result[i].count})
          }
          vm.two_fn()
        },function(err){
          console.log(err);
        })
        //人员类别比例
        vm.$axios.request("post","/recharge/personnelCategory",{date:time,flag:index},function(data){
          vm.personnel_type=[]
          vm.personnel_count = []
          for(let i=0;i<data.result.length;i++){
            vm.personnel_type.push(data.result[i].type)
            vm.personnel_count.push({name:data.result[i].type,value:data.result[i].count})
          }
          vm.three_fn()
        },function(err){
          console.log(err);
        })

      },

      //终端机人次相关函数
      five_fn(){
        let five = this.$echarts.init(document.getElementById('five'), 'customed');
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
            bottom: '50%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data:this.Terminal_name,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval:0,
                rotate:-60
              },
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'充值人次',
              type:'bar',
              barWidth: '60%',
              data:this.Terminal_count,
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
            }
          ]
        };
        five.setOption(option);
      },
      Terminal_time_S_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.Terminal_time_N){
          if(this.Terminal_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.Terminal_time_S = ''
            return
          }else{
            this.Terminal_time_S = val
          }
        }else{
          this.Terminal_time_S = val;
          vm.Terminal_init_fn(vm.Terminal_time_S,vm.Terminal_time_N)
        }


      },
      Terminal_time_N_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.Terminal_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.Terminal_time_N = ''
          return
        }else{
          vm.Terminal_time_N = val
          vm.Terminal_init_fn(vm.Terminal_time_S,vm.Terminal_time_N)
        }

      },
      Terminal_init_fn(start,end){
        let vm = this
        //终端机充值情况
        vm.$axios.request("post","/recharge/terminalDis",{startTime:start,endTime:end},function(data){
          vm.Terminal_name = []
          vm.Terminal_count= []
          vm.Terminal_data= []
          let place = ''
          for(let i=0;i<data.result.length;i++){
            /*if(data.result[i].floorproperty ==''){
              place =data.result[i].floortype +  data.result[i].floorname + '(' + data.result[i].floorgltype + ')'
            }else{
              place = data.result[i].floorproperty + '(' + data.result[i].floorgltype + ')'
            }*/

            vm.Terminal_name.push(data.result[i].floornameuse)
            vm.Terminal_count.push(data.result[i].count)
            vm.Terminal_data.push({
              place:data.result[i].floornameuse,
              renShu:data.result[i].peoplecount,
              renCi:data.result[i].count,
              money:data.result[i].sum+ '元'
            })
          }
          vm.five_fn();
        },function(err){
          console.log(err);
        })
      },



      /*open_window(code){
        let vm = this
        vm.dialogVisible = true
        vm.Terminal_code = code
        vm.$axios.request("post", "recharge/terminalPeapoleList", {
          date:vm.Terminal_time_S,
          termid:vm.Terminal_code,
          page:vm.pageNum,
          pageSize:vm.size}, function(data) {
          vm.total_count = parseInt(data.totalCount)
          vm.listData = []
          for(let i = 0;i<data.result.length;i++){
            let name =''
            let age =''
            let sex =''
            let school =''
            let school_type =''
            let money = ''
            let time = ''
            if(data.result[i].xm ==null){
              name = '-'
            }else{
              name = data.result[i].xm
            }
            if(data.result[i].age ==null){
              age = '-'
            }else{
              age = data.result[i].age
            }
            if(data.result[i].t_dwdm ==null){
              school = '-'
            }else{
              school = data.result[i].t_dwdm
            }
            if(data.result[i].t_zydm== null ||data.result[i].t_zydm== 'null'){
              school_type = '-'
            }else{
              school_type = data.result[i].t_zydm
            }

            if(data.result[i].opfare ==null){
              money = '-'
            }else{
              money = data.result[i].opfare
            }

            if(data.result[i].time ==null){
              time = '-'
            }else{
              time = data.result[i].time
            }

            vm.listData.push({
              name:name,
              money: money,
              age:age,
              school: school,
              school_type: school_type,
              time: time})
          }
          vm.$nextTick(function() {
            vm.loading = false
          })
        }, function(err) {
          console.log(err);
        })
      },*/
      //分页插件
      /*handleSizeChange(val) {
        var vm = this
        vm.pageNum = val
        vm.listData = []
        vm.loading = true
        vm.$axios.request("post", "recharge/terminalPeapoleList", {
          date:vm.Terminal_time_S,
          termid:vm.Terminal_code,
          page:vm.pageNum,
          pageSize:vm.size}, function(data) {
          vm.total_count = parseInt(data.totalCount)
          for(let i = 0;i<data.result.length;i++){
            let name =''
            let age =''
            let sex =''
            let school =''
            let school_type =''
            let money = ''
            let time = ''
            if(data.result[i].xm ==null){
              name = '-'
            }else{
              name = data.result[i].xm
            }
            if(data.result[i].age ==null){
              age = '-'
            }else{
              age = data.result[i].age
            }
            if(data.result[i].t_dwdm ==null){
              school = '-'
            }else{
              school = data.result[i].t_dwdm
            }
            if(data.result[i].t_zydm== null||data.result[i].t_zydm== 'null'){
              school_type = '-'
            }else{
              school_type = data.result[i].t_zydm
            }

            if(data.result[i].opfare ==null){
              money = '-'
            }else{
              money = data.result[i].opfare
            }

            if(data.result[i].time ==null){
              time = '-'
            }else{
              time = data.result[i].time
            }

            vm.listData.push({
              name:name,
              money: money,
              age:age,
              school: school,
              school_type: school_type,
              time: time})
          }
          vm.$nextTick(function() {
              vm.loading = false
          })
        }, function(err) {
          console.log(err);
        })

      },
      handleCurrentChange(val) {
        var vm = this
        vm.pageNum = val
        vm.loading = true
        vm.$axios.request("post", "recharge/terminalPeapoleList", {
          date:vm.Terminal_time_S,
          termid:vm.Terminal_code,
          page:vm.pageNum,
          pageSize:vm.size}, function(data) {
          vm.total_count = parseInt(data.totalCount)
          vm.listData = []
          for(let i = 0;i<data.result.length;i++){
            let name =''
            let age =''
            let sex =''
            let school =''
            let school_type =''
            let money = ''
            let time = ''
            if(data.result[i].xm ==null){
              name = '-'
            }else{
              name = data.result[i].xm
            }
            if(data.result[i].age ==null){
              age = '-'
            }else{
              age = data.result[i].age
            }
            if(data.result[i].t_dwdm ==null){
              school = '-'
            }else{
              school = data.result[i].t_dwdm
            }
            if(data.result[i].t_zydm== null||data.result[i].t_zydm== 'null'){
              school_type = '-'
            }else{
              school_type = data.result[i].t_zydm
            }

            if(data.result[i].opfare ==null){
              money = '-'
            }else{
              money = data.result[i].opfare
            }

            if(data.result[i].time ==null){
              time = '-'
            }else{
              time = data.result[i].time
            }

            vm.listData.push({
              name:name,
              money: money,
              age:age,
              school: school,
              school_type: school_type,
              time: time})
          }
          vm.$nextTick(function() {
              vm.loading = false
          })
        }, function(err) {
          console.log(err);
        })
      },
      handleClose(done) {
        this.dialogVisible = false
        this.pageNum = 1
        this.loading = true
        this.listData = []

      },
      close_yes(){
        this.dialogVisible = false
        this.pageNum = 1
        this.loading = true
        this.listData = []

      }*/

      //各类人员充值金额分析
      card_in_fn(){
        let option = {
          /*title: {
            text: '单位(万元)',
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
              data : this.card_type,
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
              name:'充值金额',
              type:'bar',
              barWidth: '50',
              data:this.card_count
            }
          ]
        };
        this.card_in_dom.setOption(option);
      },
      card_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.card_time_N){
          if(this.card_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.card_time_S = ''
            return
          }else{
            this.card_time_S = val
          }
        }else{
          this.card_time_S = val
          this.card_time_change_fn(this.card_time_S,this.card_time_N)
        }
      },
      card_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.card_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.card_time_N = ''
          return
        }else{
          this.card_time_N = val
          this.card_time_change_fn(this.card_time_S,this.card_time_N)
        }
      },
      card_time_change_fn(startTime,endTime){
        var vm = this
        //食堂总消费人员分布
        vm.$axios.request("post","recharge/cardRechargeTotal",{startTime:startTime,endTime:endTime},function(data){
          vm.card_count = []
          vm.card_type = []
          for(var i=0;i<data.result.length;i++){
            vm.card_count.push(data.result[i].count)
            vm.card_type.push(data.result[i].cardtype)
          }
          vm.card_in_fn()
        },function(err){
          console.log(err);
        })
      },


      //各类人员充值方式分析
      oneCard_CZ_sum_fn(){
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
            data:['现金充值','自助充值','网上充值','支付宝充值','微信充值']
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
              data: this.CZ_name,
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
              name:'现金充值',
              type:'bar',
              barWidth:30,
              data:this.CZ_count3,
            },
            {
              name:'自助充值',
              type:'bar',
              barWidth:30,
              data:this.CZ_count1,
            },
            {
              name:'网上充值',
              type:'bar',
              barWidth:30,
              data:this.CZ_count2,
            },
            {
              name:'支付宝充值',
              type:'bar',
              barWidth:30,
              data:this.CZ_count4,
            },
            {
              name:'微信充值',
              type:'bar',
              barWidth:30,
              data:this.CZ_count5,
            }
          ]
        };
        this.oneCard_CZ_sum.setOption(option);
      },
      CZ_sum_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.CZ_sum_time_N){
          if(this.CZ_sum_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.CZ_sum_time_S = ''
            return
          }else{
            this.CZ_sum_time_S = val
          }
        }else{
          this.CZ_sum_time_S = val
          this.CZ_sum_init_fn(this.CZ_sum_time_S,this.CZ_sum_time_N)
        }

      },
      CZ_sum_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.CZ_sum_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.CZ_sum_time_N = ''
          return
        }else{
          this.CZ_sum_time_N = val
          this.CZ_sum_init_fn(this.CZ_sum_time_S,this.CZ_sum_time_N)
        }

      },
      CZ_sum_init_fn(start,end){
        let vm = this
        //自助充值
        vm.$axios.request("post","recharge/cardRechargeAny",{startTime:start,endTime:end,code:'136'},function(data){
          vm.CZ_name = []
          vm.CZ_count1 = []
          for(var i=0;i<data.result.length;i++){
            vm.CZ_name.push(data.result[i].cardtype)
            vm.CZ_count1.push(data.result[i].count)
          }
          vm.oneCard_CZ_sum_fn()
        },function(err){
          console.log(err);
        })
        //网上充值
        vm.$axios.request("post","recharge/cardRechargeAny",{startTime:start,endTime:end,code:'103'},function(data){
          vm.CZ_count2 = []
          for(var i=0;i<data.result.length;i++){
            vm.CZ_count2.push(data.result[i].count)
          }
          vm.oneCard_CZ_sum_fn()
        },function(err){
          console.log(err);
        })
        //现金充值
        vm.$axios.request("post","recharge/cardRechargeAny",{startTime:start,endTime:end,code:'100'},function(data){
          vm.CZ_count3= []
          for(var i=0;i<data.result.length;i++){
            vm.CZ_count3.push(data.result[i].count)
          }
          vm.oneCard_CZ_sum_fn()
        },function(err){
          console.log(err);
        })
        //支付宝充值
        vm.$axios.request("post","recharge/cardRechargeAny",{startTime:start,endTime:end,code:'137'},function(data){
          vm.CZ_count4 = []
          for(var i=0;i<data.result.length;i++){
            vm.CZ_count4.push(data.result[i].count)
          }
          vm.oneCard_CZ_sum_fn()
        },function(err){
          console.log(err);
        })
        //微信充值
        vm.$axios.request("post","recharge/cardRechargeAny",{startTime:start,endTime:end,code:'180'},function(data){
          vm.CZ_count5= []
          for(var i=0;i<data.result.length;i++){
            vm.CZ_count5.push(data.result[i].count)
          }
          vm.oneCard_CZ_sum_fn()
        },function(err){
          console.log(err);
        })

      },
    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.card_in_dom = this.$echarts.init(document.getElementById('card_in'), 'customed')
      this.oneCard_CZ_sum = this.$echarts.init(document.getElementById('oneCard_CZ_sum'), 'customed');
    },
    created(){

      let vm = this;
      vm.make_time()
      //男女比例
      vm.menu()
      /*vm.$axios.request("post","/recharge/rechargeSex",{date:vm.money_time,flag:'0'},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.person_sex.push(data.result[i].sex)
          vm.person_count.push({name:data.result[i].sex,value:data.result[i].count})
        }
        vm.one_fn();
      },function(err){
        console.log(err);
      })

      //学院比例
      vm.$axios.request("post","/recharge/academyRatio",{date:vm.money_time,flag:'0'},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.school_type.push(data.result[i].academy)
          vm.school_count.push({name:data.result[i].academy,value:data.result[i].count})
        }
        vm.four_fn();
      },function(err){
        console.log(err);
      })*/

      //金额比例
      vm.$axios.request("post","/recharge/amountProportion",{date:vm.money_time,flag:'0'},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.money_extent.push(data.result[i].extent)
          vm.money_count.push({name:data.result[i].extent,value:data.result[i].count})
        }
        vm.two_fn();
      },function(err){
        console.log(err);
      })

      //人员类别比例
      vm.$axios.request("post","/recharge/personnelCategory",{date:vm.money_time,flag:'0'},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.personnel_type.push(data.result[i].type)
          vm.personnel_count.push({name:data.result[i].type,value:data.result[i].count})
        }
        vm.three_fn();
      },function(err){
        console.log(err);
      })


      //终端机充值人次
      vm.Terminal_init_fn(vm.Terminal_time_S,vm.Terminal_time_N)

      //五种卡类别充值情况分析
      vm.card_time_change_fn(vm.card_time_S,vm.card_time_N)

      //各类人员充值方式分析
      vm.CZ_sum_init_fn(vm.CZ_sum_time_S,vm.CZ_sum_time_N)
    }
  }
</script>

<style lang="scss" scoped>
  table{
    float: left;
  td{
    text-align: center;
    height: 40px;
    width: 120px;
    border: 1px solid rgba(250,250,250,0.2);
  }

  }
  .money_select{
    float: right;
    width:130px;
    margin-left: 50px;
  }
  .table_four{
    width: 14%;
    td{
      width: 25%;
    }
  }
</style>
