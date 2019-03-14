<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/safety' }">上网行为</el-breadcrumb-item>
      <el-breadcrumb-item>网络应用分析</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="space-around">
      <el-col :span="24"
              v-loading.body="loading_FB"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg"
              style="margin-bottom: 0">
        <h5 class="ec_h5">
          应用使用分布比例 单位(万次)
          <div class="ec_h5_data">
            <el-radio-group v-model="radio" size="small" style="margin: -5px 20px 0 0;" @change="codeChange">
              <el-radio-button label="近一个月"></el-radio-button>
              <el-radio-button label="近三个月"></el-radio-button>
              <el-radio-button label="近半年"></el-radio-button>
            </el-radio-group>
          </div>
        </h5>
        <div style="height: 500px" id="app_FB"></div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24"
              v-loading.body="loading"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg"
              style="margin-bottom: 0">
        <h5 class="ec_h5">
          应用使用趋势---{{typeSelect}}&nbsp;&nbsp;-单位(万次)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy"
              @change="app_time_change"
              v-model="app_time"
              type="year"
              placeholder='选择时间'>
            </el-date-picker>
            <el-select
              v-model="typeSelect"
              placeholder="请选择"
              size="mini"
              class="major-select select_width"
              @change="typeChange">
              <el-option
                v-for="(item,index) in typeList"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </h5>
        <div class="ec_height" id="app"></div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24"
              v-loading.body="loading1"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg"
              style="margin-bottom: 0">
        <h5 class="ec_h5">
          应用使用人次分析---{{typeSelect1}}&nbsp;&nbsp;-单位(万次)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM"
              @change="people_time_change"
              v-model="people_time"
              type="month"
              placeholder='选择时间'>
            </el-date-picker>

            <el-select
              v-model="typeSelect1"
              placeholder="请选择"
              size="mini"
              class="major-select select_width"
              @change="typeChange1">
              <el-option
                v-for="(item,index) in typeList1"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </h5>
        <div class="big_height" id="people_time"></div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24"
              v-loading.body="loading2"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg"
              style="margin-bottom: 0">
        <h5 class="ec_h5">
          成绩应用使用分析&nbsp;&nbsp;-单位(万次)
          <div class="ec_h5_data">
            <el-radio-group v-model="result_list" size="small" style="margin: -5px 20px 0 0;" @change="result_Change">
              <el-radio-button label="60分以下"></el-radio-button>
              <el-radio-button label="60分-70分"></el-radio-button>
              <el-radio-button label="70分-80分"></el-radio-button>
              <el-radio-button label="80分-90分"></el-radio-button>
              <el-radio-button label="90分以上"></el-radio-button>
            </el-radio-group>
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM"
              @change="result_time_change"
              v-model="result_time"
              type="month"
              placeholder='选择时间'>
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="result"></div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    data(){
      return{
        loading:true,
        loading1:true,
        loading2:true,
        loading_FB:true,
        //应用分布
        FB_name:[],
        FB_count:[],
        //应用使用趋势
        app_time:'2017',
        typeSelect:'招聘',
        typeList:[],
        radio: '近半年',
        code:'3',
        QS_name:[],
        QS_count:[],
        //应用使用人次分析
        people_time:'2017-11',
        typeSelect1:'高级翻译学院',
        typeList1:[
          '高级翻译学院',
          '外国语学院',
          '商学院',
          '汉语速成学院',
          '语言康复学院',
          '汉语进修学院',
          '语言科学院',
          '艺术学院',
          '汉语学院',
          '培训学院',
          '马克思主义学院',
          '人文学院',
          '信息科学学院',
          '网络教育学院',],
        RC_name:[],
        RC_count:[],
        //成绩应用分布
        result_DOM:'',
        result_time:'2017-11',
        result_list:'60分以下',
        show_list_name:[],
        show_list_count:[],
        show_color:'#C00BC0',
        //60
        list1_name:[],
        list1_count:[],
        //60-70
        list2_name:[],
        list2_count:[],
        //70-80
        list3_name:[],
        list3_count:[],
        //80-90
        list4_name:[],
        list4_count:[],
        //90
        list5_name:[],
        list5_count:[],


      }
    },
    methods: {
      menu() {
        window.scrollTo(0,0);
      },

      //app_FB 应用程序分布
      app_FB_fn(){
        let app_FB = this.$echarts.init(document.getElementById('app_FB'), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:this.FB_name
          },
          series : [
            {
              name: '应用程序',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.FB_count,
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
        app_FB.setOption(option);
      },
      codeChange(label){
        var vm = this
        if(label == '近一个月'){
          vm.code = 1
        }else if(label == '近三个月'){
          vm.code = 2
        }else if(label == '近半年'){
          vm.code = 3
        }
        vm.loading_FB = true
        vm.app_FB_init(vm.code)
      },
      app_FB_init(flag){

        let vm = this
        vm.$axios.request("post","applicationTrend/appDis",{flag:flag},function(data){
          vm.FB_name = []
          vm.FB_count = []
          for(let i = 0;i<data.result.length;i++){
            vm.FB_name.push(data.result[i].urltype)
            vm.FB_count.push({name:data.result[i].urltype,value:data.result[i].count})
          }
          vm.$nextTick(function() {
            vm.loading_FB = false
          })
          vm.app_FB_fn()
        },function(err){
          console.log(err);
        })

      },

      //app应用折线图echarts函数
      app_fn() {
        let app = this.$echarts.init(document.getElementById('app'), 'customed');
        let option = {
          legend: {
            data: ['应用使用次数']
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
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: this.QS_name
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '应用使用次数',
            smooth:false,
            type: 'line',
            stack: '总量',
            data: this.QS_count
          }]
        };
        app.setOption(option);
      },
      app_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.app_time = val
          vm.loading = true
          vm.app_all_fn(vm.app_time,vm.typeSelect)
        }

      },
      typeChange(val){
        let vm = this
        vm.loading = true
        vm.typeSelect = val
        vm.app_all_fn(vm.app_time,vm.typeSelect)
      },
      app_all_fn(year,name){
        let vm  = this
        vm.$axios.request("post","applicationTrend/trend",{
          year:year,
          name:name},function(data){
          vm.QS_name = []
          vm.QS_count = []
          for(let i = 0;i<data.result.length;i++){
            vm.QS_name.push(data.result[i].month+'月')
            vm.QS_count.push(data.result[i].count)
          }
          vm.$nextTick(function() {
            vm.loading = false
          })
          vm.app_fn()
        },function(err){
          console.log(err);
        })
      },

      //应用使用人次
      people_time_fn() {
        let people_time = this.$echarts.init(document.getElementById('people_time'), 'customed');
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}"
          },
          legend: {
            data: ['应用人次分析']
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
            data: this.RC_name
          },
          series: [{
            name: '应用人次分析',
            type: 'bar',
            data: this.RC_count,
            label: {
              normal: {
                show: true,
                position: 'right',
                textStyle: {
                  color: 'white'
                }
              }
            }
          }]
        };
        people_time.setOption(option);
      },
      people_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.people_time = val
          vm.app_people_fn(vm.people_time,vm.typeSelect1)
        }

      },
      typeChange1(val){
        let vm = this
        vm.typeSelect1 = val
        vm.app_people_fn(vm.people_time,vm.typeSelect1)
      },
      app_people_fn(time,school){
        let vm  = this
        vm.$axios.request("post","applicationPerson/person", {
          date: time,
          name: school,},function(data){
          vm.RC_name = []
          vm.RC_count = []
          for(let i=0;i<data.result.length;i++){
            vm.RC_name.push(data.result[i].urltype)
            vm.RC_count.push(data.result[i].count)
          }
          vm.$nextTick(function() {
            vm.loading1 = false
          })
          vm.people_time_fn()
        },function(err){
          console.log(err);
        })
      },

      //成绩应用分布
      result_fn() {
        let option = {
          title: {
            text: this.result_list +'应用分布',
            textStyle: {
              fontSize: 16,
              color:this.show_color
            },
            left:'center',
            top:'5%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
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
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: this.show_list_name
          },
          series: [
            {
              name: '成绩应用分布',
              type: 'bar',
              data: this.show_list_count,
              itemStyle: {
                normal: {
                  color: this.show_color
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    color: 'white'
                  }
                }
              }
            }
          ]
        };
        this.result_DOM.setOption(option);
      },
      result_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.result_time = val
          vm.result_send_fn(vm.result_time)
        }

      },
      result_Change(lable){
        let vm = this
        if(lable == '60分以下'){
          vm.show_list_name = vm.list1_name
          vm.show_list_count = vm.list1_count
          vm.show_color = '#C00BC0'
          vm.result_fn()
        }else if(lable == '60分-70分'){
          vm.show_list_name = vm.list2_name
          vm.show_list_count = vm.list2_count
          vm.show_color = '#51C025'
          vm.result_fn()
        }else if(lable == '70分-80分'){
          vm.show_list_name = vm.list3_name
          vm.show_list_count = vm.list3_count
          vm.show_color = '#69BDC0'
          vm.result_fn()
        }else if(lable == '80分-90分'){
          vm.show_list_name = vm.list4_name
          vm.show_list_count = vm.list4_count
          vm.show_color = '#B4C01C'
          vm.result_fn()
        }else{
          vm.show_list_name = vm.list5_name
          vm.show_list_count = vm.list5_count
          vm.show_color = '#C02E36'
          vm.result_fn()
        }
      },
      result_send_fn(year){
        let vm = this
        vm.$axios.request("post","appSpread/spread", {year:year},function(data){
          vm.show_list_name=[]
          vm.show_list_count=[]
          vm.list1_name=[]
          vm.list1_count=[]
          vm.list2_name=[]
          vm.list2_count=[]
          vm.list3_name=[]
          vm.list3_count=[]
          vm.list4_name=[]
          vm.list4_count=[]
          vm.list5_name=[]
          vm.list5_count=[]
          for(let i=0;i<data.result.length;i++){
            vm.show_list_name.push(data.result[i].urltype)
            vm.show_list_count.push(data.result[i].count)
            vm.list1_name.push(data.result[i].urltype)
            vm.list1_count.push(data.result[i].count)
          }
          for(let i=0;i<data.result1.length;i++){
            vm.list2_name.push(data.result1[i].urltype)
            vm.list2_count.push(data.result1[i].count)
          }
          for(let i=0;i<data.result2.length;i++){
            vm.list3_name.push(data.result2[i].urltype)
            vm.list3_count.push(data.result2[i].count)
          }
          for(let i=0;i<data.result3.length;i++){
            vm.list4_name.push(data.result3[i].urltype)
            vm.list4_count.push(data.result3[i].count)
          }
          for(let i=0;i<data.result4.length;i++){
            vm.list5_name.push(data.result4[i].urltype)
            vm.list5_count.push(data.result4[i].count)
          }
          vm.$nextTick(function() {
            vm.loading2 = false
          })
          vm.result_fn()
        },function(err){
          console.log(err);
        })

      }

    },
    mounted(){
      let vm = this
      //echarts主题
      vm.$echarts.registerTheme('customed', vm.$store.state.echartsData);
      vm.result_DOM = this.$echarts.init(document.getElementById('result'), 'customed');
    },
    created(){
      let vm = this
      vm.menu()
      vm.app_FB_init(vm.code)
      vm.app_all_fn(vm.app_time,vm.typeSelect)
      vm.app_people_fn(vm.people_time,vm.typeSelect1)
      vm.result_send_fn(vm.result_time)

      //获取应用sellect
      vm.$axios.request("post","applicationTrend/getApps", {},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.typeList.push(data.result[i].subtype)
        }
      },function(err){
        console.log(err);
      })

    }
  }
</script>

<style>
    .big_height{
      height:800px;
    }
</style>
