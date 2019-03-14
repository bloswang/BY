<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/safety' }">上网行为</el-breadcrumb-item>
      <el-breadcrumb-item>上网费用分析</el-breadcrumb-item>
    </el-breadcrumb>
    <!--1.各类用户网费充值金额/人次比例-->
    <el-row type="flex" justify="space-around">
      <el-col :span="12"
              v-loading.body="loading_money"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg"
              style="margin-bottom: 0">
        <h5 class="ec_h5">
          各类用户网费充值金额比例
          <div class="ec_h5_data">
          <el-date-picker
            class="select_width"
            size="mini"
            v-model="money_time_S"
            type="date"
            format="yyyy-MM-dd"
            @change="money_time_S_change"
            placeholder="选择时间">
          </el-date-picker>
          至
          <el-date-picker
            class="select_width"
            size="mini"
            v-model="money_time_N"
            type="date"
            format="yyyy-MM-dd"
            @change="money_time_N_change"
            placeholder="选择时间">
          </el-date-picker>
        </div>
        </h5>
        <div class="ec_height" id="chart1"></div>
      </el-col>
      <el-col :span="12"
              v-loading.body="loading_person"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg"
              style="margin-bottom: 0">
        <h5 class="ec_h5">
          各类用户网费充值人次比例
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="person_time_S"
              type="date"
              format="yyyy-MM-dd"
              @change="person_time_S_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="person_time_N"
              type="date"
              format="yyyy-MM-dd"
              @change="person_time_N_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="chart2"></div>
      </el-col>
    </el-row>

    <!--2.网费充值方式趋势图-->
    <el-row type="flex" justify="space-around" style="margin-top: 10px">
      <el-col :span="7" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          网费充值方式趋势图
        </h5>
      </el-col>
      <el-col :span="10" class="ec_bg" style="margin-bottom: 0">
        <div style=" width:50%; margin:0 auto;text-align: center;">
          <el-radio-group v-model="radio" size="small" @change="codeChange">
            <el-radio-button label="查看年充值"></el-radio-button>
            <el-radio-button label="查看月充值"></el-radio-button>
            <el-radio-button label="查看日充值"></el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="7" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          <div class="ec_h5_data">
            <el-select
              v-model="paySelect"
              placeholder="请选择"
              size="mini"
              class="major-select select_width"
              @change="payChange">
              <el-option
                v-for="(item,index) in payList"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-date-picker
              v-show="QS_M"
              class="select_width"
              size="mini"
              v-model="QSM_time"
              type="year"
              format="yyyy"
              @change="QSM_time_change"
              placeholder="选择时间">
            </el-date-picker>
            <el-date-picker
              v-show="QS_D"
              class="select_width"
              size="mini"
              v-model="QSD_time"
              type="month"
              format="yyyy-MM"
              @change="QSD_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" v-show="QS_Y">
      <el-col :span="24"
              v-loading.body="loading_QS1"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg">
        <div style="height: 500px" id="pay_QS"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" v-show="QS_M">
      <el-col :span="24"
              v-loading.body="loading_QS2"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg">
        <div style="height: 500px" id="pay_QS_M"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" v-show="QS_D">
      <el-col :span="24"
              v-loading.body="loading_QS3"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg">
        <div style="height: 500px" id="pay_QS_D"></div>
      </el-col>
    </el-row>

    <!--3.各类用户网费充值方式分析-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24"
              v-loading.body="loading_FS"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg"
              style="margin-bottom: 0">
        <h5 class="ec_h5">
          各类用户网费充值方式分析
          <div class="ec_h5_data">

            <el-date-picker
              class="select_width"
              size="mini"
              v-model="FS_time_S"
              type="date"
              format="yyyy-MM-dd"
              @change="FS_time_S_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="FS_time_N"
              type="date"
              format="yyyy-MM-dd"
              @change="FS_time_N_change"
              placeholder="选择时间">
            </el-date-picker>
            <el-select
              v-model="paySelect3"
              placeholder="请选择"
              size="mini"
              class="major-select select_width"
              @change="payChange3">
              <el-option
                v-for="(item,index) in payList3"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </h5>
        <div style="height: 500px" id="pay_FS"></div>
      </el-col>
    </el-row>

    <!--4.各类用户人均网费趋势图-->
    <el-row type="flex" justify="space-around" style="margin-top: 10px">
      <el-col :span="24"
              v-loading.body="loading_RJ"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg"
              style="margin-bottom: 0">
        <h5 class="ec_h5">
          各类用户人均网费趋势图
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="RJ_time"
              type="year"
              format="yyyy"
              @change="RJ_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div style="height: 500px" id="RJ_pay"></div>
      </el-col>
    </el-row>

    <!--5.各类用户总网费趋势-->
    <el-row type="flex" justify="space-around" style="margin-top: 10px">
      <el-col :span="7"class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          各类用户总网费趋势
        </h5>
      </el-col>
      <el-col :span="10" class="ec_bg" style="margin-bottom: 0">
        <div style=" width:50%; margin:0 auto;text-align: center;">
          <el-radio-group v-model="radio1" size="small" style="margin: -5px 20px 0 0;" @change="codeChange1">
            <el-radio-button label="查看年消费"></el-radio-button>
            <el-radio-button label="查看月消费"></el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="7" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          <div class="ec_h5_data">
          <el-date-picker
            v-show="ALL_M"
            class="select_width"
            size="mini"
            v-model="ALL_M_time"
            type="year"
            format="yyyy"
            @change="ALL_M_time_change"
            placeholder="选择时间">
          </el-date-picker>
          </div>
        </h5>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" v-show="ALL_Y">
      <el-col :span="24"
              v-loading.body="loading_All1"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg"
              style="margin-bottom: 0">
        <div style="height: 500px" id="pay_All"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" v-show="ALL_M">
      <el-col :span="24"
              v-loading.body="loading_All2"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg"
              style="margin-bottom: 0">
        <div style="height: 500px" id="pay_All_M"></div>
      </el-col>
    </el-row>

    <!--6.中国籍学生套餐使用情况-->
    <el-row type="flex" justify="space-around" style="margin-top: 10px">
      <el-col :span="24"
              v-loading.body="loading_CN"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg"
              style="margin-bottom: 0">
        <h5 class="ec_h5">
          中国籍学生套餐使用情况
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="CN_time"
              type="month"
              format="yyyy-MM"
              @change="CN_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div style="height: 500px" id="CN_pay"></div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import time from '../../config/timeFormat'
  export default {
    data(){
      return{
        //各类用户网费充值金额比例

        chart1:'',
        loading_money:true,
        money_time_S:'',
        money_time_N:'',
        money_name:[],
        money_data:[],

        //各类用户网费充值人次比例
        chart2:'',
        loading_person:true,
        person_time_S:'',
        person_time_N:'',
        person_name:[],
        person_data:[],

        //网费充值方式趋势图
        pay_QS:'',
        QS_Y:true,
        loading_QS1:true,
        loading_QS2:false,
        loading_QS3:false,
        radio: '查看年充值',
        code:'1',
        paySelect:'金额',
        payList:['金额','人次'],
        QSpay_name:[],
        QSpay_count1:[],
        QSpay_count2:[],
        QSpay_count3:[],
        QSpay_count4:[],
        QSpay_count5:[],
        //月
        pay_QS_M:'',
        QS_M:false,
        QSM_time:'',
        QSMpay_name:[],
        QSMpay_count1:[],
        QSMpay_count2:[],
        QSMpay_count3:[],
        QSMpay_count4:[],
        QSMpay_count5:[],
        //日
        pay_QS_D:'',
        QS_D:false,
        QSD_time:'',
        QSDpay_name:[],
        QSDpay_count1:[],
        QSDpay_count2:[],
        QSDpay_count3:[],
        QSDpay_count4:[],
        QSDpay_count5:[],

        //各类用户网费充值方式分析
        pay_FS:'',
        loading_FS:true,
        FS_time_S:'',
        FS_time_N:'',
        paySelect3:'金额',
        payList3:['金额','人次'],
        FSpay_name:[],
        FSpay_count1:[],
        FSpay_count2:[],
        FSpay_count3:[],
        FSpay_count4:[],
        FSpay_count5:[],

        //各类用户人均网费趋势图
        RJ_pay:'',
        loading_RJ:true,
        RJ_time:'',
        RJpay_name:[],
        RJpay_count1:[],
        RJpay_count2:[],
        RJpay_count3:[],
        RJpay_count4:[],

        //各类用户总网费趋势
        //年
        ALL_Y:true,
        pay_All:'',
        loading_All1:true,
        radio1: '查看年消费',
        code1:'1',
        Allpay_name:[],
        Allpay_count1:[],
        Allpay_count2:[],
        Allpay_count3:[],
        Allpay_count4:[],
        //月
        ALL_M:false,
        loading_All2:false,
        ALL_M_time:"",
        All_M_pay_name:[],
        All_M_pay_count1:[],
        All_M_pay_count2:[],
        All_M_pay_count3:[],
        All_M_pay_count4:[],

        ////中国籍学生套餐使用情况
        CN_pay:'',
        loading_CN:true,
        CN_time:'',
        CN_name:[],
        CN_count1:[],
        CN_count2:[],
        CN_count3:[],
        CN_count4:[],
        CN_count5:[],
        CN_count6:[],
      }
    },
    methods: {
      menu() {
        window.scrollTo(0,0);

      },
      make_time(){
        let vm = this
        vm.money_time_S = time.year + '-' + time.month + '-' + '01'
        vm.money_time_N = time.year + '-' + time.month + '-' + time.day + ''
        vm.person_time_S = time.year + '-' + time.month + '-' + '01'
        vm.person_time_N = time.year + '-' + time.month + '-' + time.day + ''
        vm.QSM_time = time.year
        vm.QSD_time = time.year + '-' + time.month
        vm.FS_time_S = time.year + '-' + time.month + '-' + '01'
        vm.FS_time_N = time.year + '-' + time.month + '-' + time.day + ''
        vm.RJ_time = time.year
        vm.ALL_M_time = time.year+''
        vm.CN_time = time.year + '-' + time.month
      },
      //各类用户网费充值金额比例
      chart1_fn(){
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            top:'20',
            data: this.money_name
          },
          series : [
            {
              name: '充值金额',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data: this.money_data,
              itemStyle: {
                normal: {
                  label:{
                    show: true,
                    formatter: '{b} : {c}元 ({d}%)'
                  }
                },
                labelLine :{show:true}
              }
            }
          ]
        };
        this.chart1.setOption(option);
      },
      money_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.money_time_N){
          if(this.money_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.money_time_S = ''
            return
          }else{
            this.$message.error('请选择结束时间！');
            this.money_time_S = val
          }
        }else{
          this.money_time_S = val
          this.loading_money = true
          this.money_time_change_fn(this.money_time_S,this.money_time_N)
        }
      },
      money_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.money_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.money_time_N = ''
          return
        }else{
          if(this.money_time_S == ''){
            this.$message.error('请选择开始时间！');
            return
          }else{
            this.money_time_N = val
            this.loading_money = true
            this.money_time_change_fn(this.money_time_S,this.money_time_N)
          }

        }
      },
      money_time_change_fn(startDate,endDate) {
        var vm = this
        vm.$axios.request("post","netRacharge/userRachargeRatio",{startDate:startDate,endDate:endDate,flag:'1'},function(data){
          vm.money_data = []
          vm.money_name = []
          for(var i=0;i<data.result.length;i++){
            vm.money_name.push(data.result[i].utype)
            vm.money_data.push({
              name:data.result[i].utype,
              value:data.result[i].money
            })
          }
          vm.loading_money = false
          vm.chart1_fn()
        },function(err){
          console.log(err);
        })
      },

      //各类用户网费充值人次比例
      chart2_fn(){
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: this.person_name,
            top:'20',
          },
          series : [
            {
              name: '充值金额',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data: this.person_data,
              itemStyle: {
                normal: {
                  label:{
                    show: true,
                    formatter: '{b} : {c}次 ({d}%)'
                  }
                },
                labelLine :{show:true}
              }
            }
          ]
        };
        this.chart2.setOption(option);
      },
      person_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.person_time_N){
          if(this.person_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.person_time_S = ''
            return
          }else{
            this.$message.error('请选择结束时间！');
            this.person_time_S = val
          }
        }else{
          this.person_time_S = val
          this.loading_person = true
          this.person_time_change_fn(this.person_time_S,this.person_time_N)
        }
      },
      person_time_N_change(val){
        if(val == undefined){
          return
        }else if(val<this.person_time_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.person_time_N = ''
          return
        }else{
          if(this.person_time_S == ''){
            this.$message.error('请选择开始时间！');
            return
          }else{
            this.person_time_N = val
            this.loading_person = true
            this.person_time_change_fn(this.person_time_S,this.person_time_N)
          }

        }
      },
      person_time_change_fn(startDate,endDate){
        var vm = this
        vm.$axios.request("post","netRacharge/userRachargeRatio",{startDate:startDate,endDate:endDate,flag:'2'},function(data){
          vm.person_data = []
          vm.person_name = []
          for(var i=0;i<data.result.length;i++){
            vm.person_name.push(data.result[i].utype)
            vm.person_data.push({
              name:data.result[i].utype,
              value:data.result[i].count
            })
          }
          vm.loading_person = false
          vm.chart2_fn()
        },function(err){
          console.log(err);
        })
      },

      //网费充值方式趋势图
      //下拉菜单，单选按钮以及初始化函数
      codeChange(label){
        var vm = this

        if(label == '查看年充值'){
          vm.code = 1
          vm.QS_Y = true
          vm.QS_M = false
          vm.QS_D = false
          this.loading_QS1 = true
          vm.payQS_init(vm.paySelect)
        }else if(label == '查看月充值'){
          vm.code = 2
          vm.QS_Y = false
          vm.QS_M = true
          vm.QS_D = false
          this.loading_QS2 = true
          let pay_QS_M = document.getElementById('pay_QS_M')
          pay_QS_M.style.height = '500px'
          setTimeout(function(){
            vm.payQS_init_M(vm.paySelect,vm.QSM_time)
          },100)
        }else if(label == '查看日充值'){
          vm.code = 3
          vm.QS_Y = false
          vm.QS_M = false
          vm.QS_D = true
          this.loading_QS3 = true
          let pay_QS_D = document.getElementById('pay_QS_D')
          pay_QS_D.style.height = '500px'
          setTimeout(function(){
            vm.payQS_init_D(vm.paySelect,vm.QSD_time)
          },100)
        }
        //vm.loading_QS1 = true
        //vm.payQS_init(vm.code)
      },
      payChange(val){
        let vm = this
        vm.paySelect = val

        if(vm.radio == '查看年充值'){
          vm.payQS_init(vm.paySelect)
          vm.loading_QS1 = true
        }else if(vm.radio == '查看月充值'){
          vm.payQS_init_M(vm.paySelect,vm.QSM_time)
          vm.loading_QS2 = true
        }else{
          vm.payQS_init_D(vm.paySelect,vm.QSD_time)
          vm.loading_QS3 = true
        }

      },
      //年
      payQS_fn(){
        let vm = this
        let option = {
          color:['#B7FF8F','#C14A21','#AB1C7A','#842CB6','#2F87DB'],
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              var name = ''
              if(vm.paySelect == '金额'){
                name = '总金额'
              }else{
                name = '总人次'
              }
              var all = Number(params[0].data) +
                Number(params[1].data) +
                Number(params[2].data) +
                Number(params[3].data)+
                Number(params[4].data);
                all = all.toFixed(2)
              return name+' : ' +all+ "<br>"+
                     params[0].seriesName + ' : ' + params[0].data + "<br>"+
                     params[1].seriesName + ' : ' + params[1].data + "<br>"+
                     params[2].seriesName + ' : ' + params[2].data + "<br>"+
                     params[3].seriesName + ' : ' + params[3].data + "<br>"+
                     params[4].seriesName + ' : ' + params[4].data + "<br>"
            },
          },
          legend: {
            data:['人工充值','现金充值机','圈存机','微信企业号','网络自服务']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data:this.QSpay_name
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'人工充值',
              type:'line',
              stack: '总量1',
              data:this.QSpay_count1
            },
            {
              name:'现金充值机',
              type:'line',
              stack: '总量2',
              data:this.QSpay_count2
            },
            {
              name:'圈存机',
              type:'line',
              stack: '总量3',
              data:this.QSpay_count3
            },
            {
              name:'微信企业号',
              type:'line',
              stack: '总量4',
              data:this.QSpay_count4
            },
            {
              name:'网络自服务',
              type:'line',
              stack: '总量5',
              data:this.QSpay_count5
            }
          ]
        };
        setTimeout(function () {
          vm.pay_QS.setOption(option)
        },1500)
      },
      payQS_init(select)  {
        let vm = this
        vm.QSpay_name = []
        vm.QSpay_count1 = []
        vm.QSpay_count2 = []
        vm.QSpay_count3 = []
        vm.QSpay_count4 = []
        vm.QSpay_count5 = []
        if(select == '金额'){
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByYear",{type:'人工充值'},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSpay_name.push(data.result[i].year)
              vm.QSpay_count1.push(data.result[i].money)
            }
            vm.$nextTick(function() {
              vm.loading_QS1 = false
            })
            vm.payQS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByYear",{type:'现金充值机'},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSpay_count2.push(data.result[i].money)
            }
            vm.payQS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByYear",{type:'圈存机'},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSpay_count3.push(data.result[i].money)
            }
            vm.payQS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByYear",{type:'微信企业号'},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSpay_count4.push(data.result[i].money)
            }
            vm.payQS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByYear",{type:'网络自服务'},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSpay_count5.push(data.result[i].money)
            }
            vm.payQS_fn()
          },function(err){
            console.log(err);
          })
        }
        else{
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByYear",{type:'人工充值'},function(data){
            console.log(data)
            for(let i = 0;i<data.result.length;i++){
              vm.QSpay_name.push(data.result[i].year)
              vm.QSpay_count1.push(data.result[i].count)
            }
            vm.$nextTick(function() {
              vm.loading_QS1 = false
            })
            vm.payQS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByYear",{type:'现金充值机'},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSpay_count2.push(data.result[i].count)
            }
            vm.payQS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByYear",{type:'圈存机'},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSpay_count3.push(data.result[i].count)
            }
            vm.payQS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByYear",{type:'微信企业号'},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSpay_count4.push(data.result[i].count)
            }
            vm.payQS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByYear",{type:'网络自服务'},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSpay_count5.push(data.result[i].count)
            }
            vm.payQS_fn()
          },function(err){
            console.log(err);
          })
        }
      },
      //月
      payQSM_fn(){
        var vm = this
        let pay_QS_M = this.$echarts.init(document.getElementById('pay_QS_M'), 'customed');
        let option = {
          color:['#B7FF8F','#C14A21','#AB1C7A','#842CB6','#2F87DB'],
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              var name = ''
              if(vm.paySelect == '金额'){
                name = '总金额'
              }else{
                name = '总人次'
              }
              var all = Number(params[0].data) +
                Number(params[1].data) +
                Number(params[2].data) +
                Number(params[3].data)+
                Number(params[4].data);
                all = all.toFixed(2)
              return name+' : ' +all+ "<br>"+
                params[0].seriesName + ' : ' + params[0].data + "<br>"+
                params[1].seriesName + ' : ' + params[1].data + "<br>"+
                params[2].seriesName + ' : ' + params[2].data + "<br>"+
                params[3].seriesName + ' : ' + params[3].data + "<br>"+
                params[4].seriesName + ' : ' + params[4].data + "<br>"
            },
          },
          legend: {
            data:['人工充值','现金充值机','圈存机','微信企业号','网络自服务']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.QSMpay_name
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'人工充值',
              type:'line',
              stack: '总量1',
              data:this.QSMpay_count1
            },
            {
              name:'现金充值机',
              type:'line',
              stack: '总量2',
              data:this.QSMpay_count2
            },
            {
              name:'圈存机',
              type:'line',
              stack: '总量3',
              data:this.QSMpay_count3
            },
            {
              name:'微信企业号',
              type:'line',
              stack: '总量4',
              data:this.QSMpay_count4
            },
            {
              name:'网络自服务',
              type:'line',
              stack: '总量5',
              data:this.QSMpay_count5
            }
          ]
        };
        setTimeout(function () {
          pay_QS_M.setOption(option);
        },1500)

      },
      QSM_time_change(val){
        if(val == undefined){
          return
        }else{
          this.QSM_time = val
          this.loading_QS2 = true
          this.payQS_init_M(this.paySelect,this.QSM_time)
        }
      },
      payQS_init_M(select,year){
        let vm = this
        vm.QSMpay_name = []
        vm.QSMpay_count1 = []
        vm.QSMpay_count2 = []
        vm.QSMpay_count3 = []
        vm.QSMpay_count4 = []
        vm.QSMpay_count5 = []
        if(select == '金额'){
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByMonth",{type:'人工充值',year:year},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSMpay_name.push(data.result[i].month+'月')
              vm.QSMpay_count1.push(data.result[i].money)
            }
            vm.$nextTick(function() {
              vm.loading_QS2 = false
            })

            vm.payQSM_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByMonth",{type:'现金充值机',year:year},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSMpay_count2.push(data.result[i].money)
            }
            vm.payQSM_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByMonth",{type:'圈存机',year:year},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSMpay_count3.push(data.result[i].money)
            }
            vm.payQSM_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByMonth",{type:'微信企业号',year:year},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSMpay_count4.push(data.result[i].money)
            }
            vm.payQSM_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByMonth",{type:'网络自服务',year:year},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSMpay_count5.push(data.result[i].money)
            }
            vm.payQSM_fn()
          },function(err){
            console.log(err);
          })
        }
        else{
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByMonth",{type:'人工充值',year:year},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSMpay_name.push(data.result[i].month+ '月')
              vm.QSMpay_count1.push(data.result[i].count)
            }
            vm.$nextTick(function() {
              vm.loading_QS2 = false
            })
            vm.payQSM_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByMonth",{type:'现金充值机',year:year},function(data){

            for(let i = 0;i<data.result.length;i++){
              vm.QSMpay_count2.push(data.result[i].count)
            }
            vm.payQSM_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByMonth",{type:'圈存机',year:year},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSMpay_count3.push(data.result[i].count)
            }
            vm.payQSM_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByMonth",{type:'微信企业号',year:year},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSMpay_count4.push(data.result[i].count)
            }
            vm.payQSM_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByMonth",{type:'网络自服务',year:year},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSMpay_count5.push(data.result[i].count)
            }
            vm.payQSM_fn()
          },function(err){
            console.log(err);
          })
        }
      },
      //日
      payQSD_fn(){
        var vm = this
        let pay_QS_D = this.$echarts.init(document.getElementById('pay_QS_D'), 'customed');
        let option = {
          color:['#B7FF8F','#C14A21','#AB1C7A','#842CB6','#2F87DB'],
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              var name = ''
              if(vm.paySelect == '金额'){
                name = '总金额'
              }else{
                name = '总人次'
              }
              var all = Number(params[0].data) +
                Number(params[1].data) +
                Number(params[2].data) +
                Number(params[3].data)+
                Number(params[4].data);
                all = all.toFixed(2)
              return name+' : ' +all+ "<br>"+
                params[0].seriesName + ' : ' + params[0].data + "<br>"+
                params[1].seriesName + ' : ' + params[1].data + "<br>"+
                params[2].seriesName + ' : ' + params[2].data + "<br>"+
                params[3].seriesName + ' : ' + params[3].data + "<br>"+
                params[4].seriesName + ' : ' + params[4].data + "<br>"
            },
          },
          legend: {
            data:['人工充值','现金充值机','圈存机','微信企业号','网络自服务']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.QSDpay_name
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'人工充值',
              type:'line',
              stack: '总量1',
              data:this.QSDpay_count1
            },
            {
              name:'现金充值机',
              type:'line',
              stack: '总量2',
              data:this.QSDpay_count2
            },
            {
              name:'圈存机',
              type:'line',
              stack: '总量3',
              data:this.QSDpay_count3
            },
            {
              name:'微信企业号',
              type:'line',
              stack: '总量4',
              data:this.QSDpay_count4
            },
            {
              name:'网络自服务',
              type:'line',
              stack: '总量5',
              data:this.QSDpay_count5
            }
          ]
        };
        setTimeout(function () {
          pay_QS_D.setOption(option)
        },1500)

      },
      QSD_time_change(val){
        if(val == undefined){
          return
        }else{
          this.QSD_time = val
          this.loading_QS3 = true
          this.payQS_init_D(this.paySelect,this.QSD_time)
        }
      },
      payQS_init_D(select,month){
        let vm = this
        vm.QSDpay_name = []
        vm.QSDpay_count1 = []
        vm.QSDpay_count2 = []
        vm.QSDpay_count3 = []
        vm.QSDpay_count4 = []
        vm.QSDpay_count5 = []
        if(select == '金额'){
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByDay",{type:'人工充值',month:month},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSDpay_name.push(data.result[i].day+'日')
              vm.QSDpay_count1.push(data.result[i].money)
            }
            vm.$nextTick(function() {
              vm.loading_QS3 = false
            })

            vm.payQSD_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByDay",{type:'现金充值机',month:month},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSDpay_count2.push(data.result[i].money)
            }
            vm.payQSD_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByDay",{type:'圈存机',month:month},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSDpay_count3.push(data.result[i].money)
            }
            vm.payQSD_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByDay",{type:'微信企业号',month:month},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSDpay_count4.push(data.result[i].money)
            }
            vm.payQSD_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByDay",{type:'网络自服务',month:month},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSDpay_count5.push(data.result[i].money)
            }
            vm.payQSD_fn()
          },function(err){
            console.log(err);
          })
        }
        else{
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByDay",{type:'人工充值',month:month},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSDpay_name.push(data.result[i].day+'日')
              vm.QSDpay_count1.push(data.result[i].count)
            }
            vm.$nextTick(function() {
              vm.loading_QS3 = false
            })
            vm.payQSD_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByDay",{type:'现金充值机',month:month},function(data){

            for(let i = 0;i<data.result.length;i++){
              vm.QSDpay_count2.push(data.result[i].count)
            }
            vm.payQSD_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByDay",{type:'圈存机',month:month},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSDpay_count3.push(data.result[i].count)
            }
            vm.payQSD_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByDay",{type:'微信企业号',month:month},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSDpay_count4.push(data.result[i].count)
            }
            vm.payQSD_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/rachargeTypeTrendByDay",{type:'网络自服务',month:month},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.QSDpay_count5.push(data.result[i].count)
            }
            vm.payQSD_fn()
          },function(err){
            console.log(err);
          })
        }
      },



      //各类用户网费充值方式分析
      payFS_fn(){
        let vm = this
        let option = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
              var name = ''
              if(vm.paySelect3 == '金额'){
                name = '总金额'
              }else{
                name = '总人次'
              }
              var all = Number(params[0].data) +
                Number(params[1].data) +
                Number(params[2].data) +
                Number(params[3].data)

              return name+' : ' +all+ "<br>"+
                params[0].seriesName + ' : ' + params[0].data + "<br>"+
                params[1].seriesName + ' : ' + params[1].data + "<br>"+
                params[2].seriesName + ' : ' + params[2].data + "<br>"+
                params[3].seriesName + ' : ' + params[3].data + "<br>"+
                params[4].seriesName + ' : ' + params[4].data + "<br>"
            },
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
            data:['人工充值','现金充值机','圈存机','微信企业号','网络自服务']
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
              data: this.FSpay_name,
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
              name:'人工充值',
              type:'bar',
              barWidth:30,
              data:this.FSpay_count1,
            },
            {
              name:'现金充值机',
              type:'bar',
              barWidth:30,
              data:this.FSpay_count2,
            },
            {
              name:'圈存机',
              type:'bar',
              barWidth:30,
              data:this.FSpay_count3,
            },
            {
              name:'微信企业号',
              type:'bar',
              barWidth:30,
              data:this.FSpay_count4,
            },
            {
              name:'网络自服务',
              type:'bar',
              barWidth:30,
              data:this.FSpay_count5,
            }
          ]
        };
        this.pay_FS.setOption(option);
      },
      FS_time_S_change(val){
        if(val == undefined){
          return
        }else if(val >this.FS_time_N){
          if(this.FS_time_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.FS_time_S = ''
            return
          }else{
            this.$message.error('请选择结束时间！');
            this.FS_time_S = val
          }
        }else{
            this.FS_time_S = val
            this.loading_FS = true
            this.FS_pay_init(this.FS_time_S,this.FS_time_N)
        }
      },
      FS_time_N_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<vm.FS_time_S){
          vm.$message.error('结束时间不能小于开始时间哦！');
          vm.FS_time_N = ''
          return
        }else{
          if(vm.FS_time_S == ''){
            vm.$message.error('请选择开始时间！');
            return
          }else{
            vm.FS_time_N = val
            vm.loading_FS = true
            vm.FS_pay_init(vm.FS_time_S,vm.FS_time_N)
          }
        }
      },
      payChange3(val){
        let vm = this
        vm.paySelect3 = val
        vm.loading_FS = true
        vm.FS_pay_init(vm.FS_time_S,vm.FS_time_N)
      },
      FS_pay_init(startDate,endDate){
        let vm = this
        vm.FSpay_name = []
        vm.FSpay_count1 = []
        vm.FSpay_count2 = []
        vm.FSpay_count3 = []
        vm.FSpay_count4 = []
        vm.FSpay_count5 = []
        if(vm.paySelect3 == '金额'){
          vm.$axios.request("post","netRacharge/userRachargeTypeAny",{type:'人工充值',startDate:startDate,endDate:endDate},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.FSpay_name.push(data.result[i].utype)
              vm.FSpay_count1.push(data.result[i].money)
            }
            vm.$nextTick(function() {
              vm.loading_FS = false
            })
            vm.payFS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/userRachargeTypeAny",{type:'现金充值机',startDate:startDate,endDate:endDate},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.FSpay_count2.push(data.result[i].money)
            }
            vm.payFS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/userRachargeTypeAny",{type:'圈存机',startDate:startDate,endDate:endDate},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.FSpay_count3.push(data.result[i].money)
            }
            vm.payFS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/userRachargeTypeAny",{type:'微信企业号',startDate:startDate,endDate:endDate},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.FSpay_count4.push(data.result[i].money)
            }
            vm.payFS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/userRachargeTypeAny",{type:'网络自服务',startDate:startDate,endDate:endDate},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.FSpay_count5.push(data.result[i].money)
            }
            vm.payFS_fn()
          },function(err){
            console.log(err);
          })
        }
        else{
          vm.$axios.request("post","netRacharge/userRachargeTypeAny",{type:'人工充值',startDate:startDate,endDate:endDate},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.FSpay_name.push(data.result[i].utype)
              vm.FSpay_count1.push(data.result[i].count)
            }
            vm.$nextTick(function() {
              vm.loading_FS = false
            })
            vm.payFS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/userRachargeTypeAny",{type:'现金充值机',startDate:startDate,endDate:endDate},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.FSpay_count2.push(data.result[i].count)
            }
            vm.payFS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/userRachargeTypeAny",{type:'圈存机',startDate:startDate,endDate:endDate},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.FSpay_count3.push(data.result[i].count)
            }
            vm.payFS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/userRachargeTypeAny",{type:'微信企业号',startDate:startDate,endDate:endDate},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.FSpay_count4.push(data.result[i].count)
            }
            vm.payFS_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","netRacharge/userRachargeTypeAny",{type:'网络自服务',startDate:startDate,endDate:endDate},function(data){
            for(let i = 0;i<data.result.length;i++){
              vm.FSpay_count5.push(data.result[i].count)
            }
            vm.payFS_fn()
          },function(err){
            console.log(err);
          })
        }

      },


      //各类用户人均网费趋势图
      RJ_pay_fn(){
        let option = {
          color:['#62F3FF','#FF877E','#9B8BFC','#58B6FF','#A4FCB8'],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['中国学生','国际学生','教师','临时人员']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.RJpay_name
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'中国学生',
              type:'line',
              stack: '总量1',
              data:this.RJpay_count1
            },
            {
              name:'国际学生',
              type:'line',
              stack: '总量2',
              data:this.RJpay_count2
            },
            {
              name:'教师',
              type:'line',
              stack: '总量3',
              data:this.RJpay_count3
            },
            {
              name:'临时人员',
              type:'line',
              stack: '总量4',
              data:this.RJpay_count4
            }
          ]
        };
        this.RJ_pay.setOption(option);
      },
      RJ_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.RJ_time = val
          vm.loading_RJ = true
          vm.RJ_pay_init(this.RJ_time)
        }

      },
      RJ_pay_init(year){
        let vm = this
        vm.RJpay_name = []
        vm.RJpay_count1 = []
        vm.RJpay_count2 = []
        vm.RJpay_count3 = []
        vm.RJpay_count4 = []
        vm.$axios.request("post","netRacharge/avgUserRacharge",{utype:'1',year:year},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.RJpay_name.push(data.result[i].month+'月')
            vm.RJpay_count1.push(data.result[i].count)
          }
          vm.$nextTick(function() {
            vm.loading_RJ = false
          })
          vm.RJ_pay_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","netRacharge/avgUserRacharge",{utype:'2',year:year},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.RJpay_count2.push(data.result[i].count)
          }
          vm.RJ_pay_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","netRacharge/avgUserRacharge",{utype:'3',year:year},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.RJpay_count3.push(data.result[i].count)
          }
          vm.RJ_pay_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","netRacharge/avgUserRacharge",{utype:'4',year:year},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.RJpay_count4.push(data.result[i].count)
          }
          vm.RJ_pay_fn()
        },function(err){
          console.log(err);
        })
      },

      //网费充值方式趋势图
      //公共
      codeChange1(label){
        var vm = this
        if(label == '查看年消费'){
          vm.code1 = 1
          vm.ALL_Y = true
          vm.ALL_M = false
          vm.ALL_D = false
        }else if(label == '查看月消费'){
          vm.code1 = 2
          vm.ALL_Y = false
          vm.ALL_M = true
          vm.ALL_D = false
          vm.loading_All2 = true
          let pay_All_M = document.getElementById('pay_All_M')
          pay_All_M.style.height = '500px'
          setTimeout(function(){
            vm.ALL_M_init(vm.ALL_M_time)
          },10)
        }
      },
      //年
      payAll_fn(){
        let option = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['中国学生','国际学生','教师','临时人员']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.Allpay_name
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'中国学生',
              type:'line',
              stack: '总量1',
              data:this.Allpay_count1
            },
            {
              name:'国际学生',
              type:'line',
              stack: '总量2',
              data:this.Allpay_count2
            },
            {
              name:'教师',
              type:'line',
              stack: '总量3',
              data:this.Allpay_count3
            },
            {
              name:'临时人员',
              type:'line',
              stack: '总量4',
              data:this.Allpay_count4
            }
          ]
        };
        this.pay_All.setOption(option);
      },
      payAll_init(){
        let vm = this
        vm.Allpay_name = []
        vm.Allpay_count1 = []
        vm.Allpay_count2 = []
        vm.Allpay_count3 = []
        vm.Allpay_count4 = []

        vm.$axios.request("post","netRacharge/totalUserRachargeByYear",{utype:'1'},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.Allpay_name.push(data.result[i].year)
            vm.Allpay_count1.push(data.result[i].count)
          }
          vm.$nextTick(function() {
            vm.loading_All1 = false
          })
          vm.payAll_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","netRacharge/totalUserRachargeByYear",{utype:'2'},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.Allpay_count2.push(data.result[i].count)
          }
          vm.payAll_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","netRacharge/totalUserRachargeByYear",{utype:'3'},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.Allpay_count3.push(data.result[i].count)
          }
          vm.payAll_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","netRacharge/totalUserRachargeByYear",{utype:'4'},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.Allpay_count4.push(data.result[i].count)
          }
          vm.payAll_fn()
        },function(err){
          console.log(err);
        })

      },

      //月
      payAll_M_fn(){
        let pay_All_M = this.$echarts.init(document.getElementById('pay_All_M'), 'customed');
        let option = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['中国学生','国际学生','教师','临时人员']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.All_M_pay_name
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'中国学生',
              type:'line',
              stack: '总量1',
              data:this.All_M_pay_count1
            },
            {
              name:'国际学生',
              type:'line',
              stack: '总量2',
              data:this.All_M_pay_count2
            },
            {
              name:'教师',
              type:'line',
              stack: '总量3',
              data:this.All_M_pay_count3
            },
            {
              name:'临时人员',
              type:'line',
              stack: '总量4',
              data:this.All_M_pay_count4
            }
          ]
        };
        pay_All_M.setOption(option);
      },
      ALL_M_time_change(val){
        if(val == undefined){
          return
        }else{
          this.ALL_M_time = val
          this.loading_All2 = true
          this.ALL_M_init(this.ALL_M_time)
        }
      },
      ALL_M_init(year){
        let vm = this
        vm.All_M_pay_name = []
        vm.All_M_pay_count1 = []
        vm.All_M_pay_count2 = []
        vm.All_M_pay_count3 = []
        vm.All_M_pay_count4 = []

        vm.$axios.request("post","netRacharge/totalUserRachargeByMonth",{utype:'1',year:year},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.All_M_pay_name.push(data.result[i].month+'月')
            vm.All_M_pay_count1.push(data.result[i].count)
          }
          vm.$nextTick(function() {
            vm.loading_All2 = false
          })
          vm.payAll_M_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","netRacharge/totalUserRachargeByMonth",{utype:'2',year:year},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.All_M_pay_count2.push(data.result[i].count)
          }
          vm.payAll_M_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","netRacharge/totalUserRachargeByMonth",{utype:'3',year:year},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.All_M_pay_count3.push(data.result[i].count)
          }
          vm.payAll_M_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","netRacharge/totalUserRachargeByMonth",{utype:'4',year:year},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.All_M_pay_count4.push(data.result[i].count)
          }
          vm.payAll_M_fn()
        },function(err){
          console.log(err);
        })

      },

    /**/
      CN_fn(){
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {type: 'cross'}
          },
          legend: {
            data:['未超出套餐人数','超出0-10元','超出10-30元','超出30-50元','超出50-100元','超出100元以上'],
            right:'center'
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              data:this.CN_name
            }
          ],
          yAxis: [
            {
              splitLine: {show: false},
              type: 'value',
              name: '套餐使用情况',
              position: 'left',
              axisLabel: {
                formatter: '{value} '
              }
            }],

          series: [{
            name:'未超出套餐人数',
            stack: '总量',
            type:'bar',
            barWidth : 30,
            data:this.CN_count1
          },{
            name:'超出0-10元',
            stack: '总量',
            type:'bar',
            barWidth : 30,
            data:this.CN_count2
          },{
            name:'超出10-30元',
            stack: '总量',
            type:'bar',
            barWidth : 30,
            data:this.CN_count3
          },{
            name:'超出30-50元',
            stack: '总量',
            type:'bar',
            barWidth : 30,
            data:this.CN_count4
          },{
            name:'超出50-100元',
            stack: '总量',
            type:'bar',
            barWidth : 30,
            data:this.CN_count5
          },{
            name:'超出100元以上',
            stack: '总量',
            type:'bar',
            barWidth : 30,
            data:this.CN_count6
          }]
        };
        this.CN_pay.setOption(option);
      },
      CN_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.CN_time = val
          vm.loading_CN = true
          vm.CN_init_fn(vm.CN_time)
        }
      },
      CN_init_fn(month){
        let vm = this
        vm.CN_name = []
        vm.CN_count1 = []
        vm.CN_count2 = []
        vm.CN_count3 = []
        vm.CN_count4 = []
        vm.CN_count5 = []
        vm.CN_count6 = []
        vm.$axios.request("post","netRacharge/userGroupAny",{startMoney:'0',endMoney:'0',month:month},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.CN_name.push(data.result[i].groupname)
            vm.CN_count1.push(data.result[i].count)
          }
          vm.$nextTick(function() {
            vm.loading_CN = false
          })
          vm.CN_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","netRacharge/userGroupAny",{startMoney:'1',endMoney:'10',month:month},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.CN_count2.push(data.result[i].count)
          }
          vm.CN_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","netRacharge/userGroupAny",{startMoney:'10',endMoney:'30',month:month},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.CN_count3.push(data.result[i].count)
          }
          vm.CN_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","netRacharge/userGroupAny",{startMoney:'30',endMoney:'50',month:month},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.CN_count4.push(data.result[i].count)
          }
          vm.CN_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","netRacharge/userGroupAny",{startMoney:'50',endMoney:'100',month:month},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.CN_count5.push(data.result[i].count)
          }
          vm.CN_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","netRacharge/userGroupAny",{startMoney:'100',endMoney:'10000',month:month},function(data){
          for(let i = 0;i<data.result.length;i++){
            vm.CN_count6.push(data.result[i].count)
          }
          vm.CN_fn()
        },function(err){
          console.log(err);
        })
      },
    },
    mounted(){
      let vm = this
      //echarts主题
      vm.$echarts.registerTheme('customed', vm.$store.state.echartsData);
      this.chart1 = this.$echarts.init(document.getElementById('chart1'), 'customed');
      this.chart2 = this.$echarts.init(document.getElementById('chart2'), 'customed');
      this.pay_QS = this.$echarts.init(document.getElementById('pay_QS'), 'customed');
      this.pay_FS = this.$echarts.init(document.getElementById('pay_FS'), 'customed');
      this.RJ_pay = this.$echarts.init(document.getElementById('RJ_pay'), 'customed');
      this.pay_All = this.$echarts.init(document.getElementById('pay_All'), 'customed');
      this.CN_pay = this.$echarts.init(document.getElementById('CN_pay'), 'customed');
    },
    created(){
      let vm = this
      vm.menu()
      vm.make_time()
      vm.money_time_change_fn(vm.money_time_S,vm.money_time_N)
      vm.person_time_change_fn(vm.person_time_S,vm.person_time_N)
      vm.payQS_init(vm.paySelect)
      vm.FS_pay_init(vm.FS_time_S,vm.FS_time_N)
      vm.RJ_pay_init(vm.RJ_time)
      vm.payAll_init()
      vm.CN_init_fn(vm.CN_time)
    }
  }
</script>

<style>
  .big_height{
    height:800px;

  }
</style>
