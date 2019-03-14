<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item>疑似早出晚归学生分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          <el-select
            class="select_width"
            v-model="select_ZCWG"
            placeholder="请选择"
            size="mini"
            @change="select_ZCWGChange">
            <el-option
              v-for="item in list_ZCWG"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-date-picker
            class="select_width"
            size="mini"
            v-model="list_time_ZCWG"
            type="month"
            format="yyyy-MM"
            @change="list_time_ZCWG_change"
            placeholder="选择时间">
          </el-date-picker>
        </h5>
        <div class="ec_height" id="policy1">
          <el-table
            v-loading="loading_ZCWG"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="goHome_list"
            style="width: 100%">
            <el-table-column prop="name" align="center" label="姓名" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="sex" align="center" label="性别" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="age" align="center" label="年龄" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="count" align="center" label="次数" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="major" align="center" label="专业" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="school" align="center" label="学院" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="education" align="center" label="目前学历" class-name="elTableName">
            </el-table-column>

          </el-table>
        </div>
        <div class="block"  style="width:300px;margin:0 auto;margin-top: 50px">
          <el-pagination
            @size-change="handleSizeChange_ZCWG"
            @current-change="handleCurrentChange_ZCWG"
            :current-page.sync= pageNum_ZCWG
            :page-size= size_ZCWG
            layout="total, prev, pager, next"
            :total=total_count_ZCWG>
          </el-pagination>
        </div>
      </el-col>

    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          {{select_ZCWG}}-趋势: {{list_time_ZCWG}}月
          <!--<div class="ec_h5_data">
            <el-date-picker
              align="right"
              size='mini'
              format="yyyy"
              @change="home_time_change"
              v-model="home_time"
              type="year"
              placeholder='选择时间'>
            </el-date-picker>
          </div>-->
        </h5>
        <div class="ec_height" id="home_time"></div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          {{select_ZCWG}}-专业比例TOP10: ( {{list_time_ZCWG}}月)
          <!--<div class="ec_h5_data">
            <el-date-picker
              align="right"
              size='mini'
              format="yyyy"
              @change="education_time_change"
              v-model="education_time"
              type="year"
              placeholder='选择时间'>
            </el-date-picker>
          </div>-->
        </h5>
        <div class="ec_height" id="education"></div>
      </el-col>
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          {{select_ZCWG}}-学院比例:({{list_time_ZCWG}}月)
          <!--<div class="ec_h5_data">
            <el-date-picker
              align="right"
              size='mini'
              format="yyyy"
              @change="college_time_change"
              v-model="college_time"
              type="year"
              placeholder='选择时间'>
            </el-date-picker>
          </div>-->
        </h5>
        <div class="ec_height" id="college"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        select_ZCWG:'早出',
        list_ZCWG:['早出','晚归'],
        code:'2',
        list_time_ZCWG:'2017-07',
        goHome_list:[],
        pageNum_ZCWG:1,
        size_ZCWG:8,
        total_count_ZCWG:0,
        loading_ZCWG:true,

        /*home_time:'',
        education_time:'',
        college_time:''*/
        ZCWGQS_time:[],
        ZCWGQS_count:[],

        ZCWGXL_time:[],
        ZCWGXL_count:[],

        ZCWGXY_time:[],
        ZCWGXY_count:[]
      }
    },
    methods:{
      menu() {
        window.scrollTo(0,0);
      },
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      select_ZCWGChange(val){
        let vm =this
        vm.select_ZCWG = val
        vm.loading_ZCWG = true
        if(val =='早出'){
          vm.code = '2'
        }else{
          vm.code = '1'
        }
        this.made_list_fn(this.code,this.list_time_ZCWG,this.pageNum_ZCWG,this.size_ZCWG)
        this.home_fn(this.code,this.list_time_ZCWG)
        this.education_change_fn(this.code,this.list_time_ZCWG)
        this.college_change_fn(this.code,this.list_time_ZCWG)
      },
      list_time_ZCWG_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.list_time_ZCWG = val
          this.made_list_fn(this.code,this.list_time_ZCWG,this.pageNum_ZCWG,this.size_ZCWG)
          this.home_fn(this.code,this.list_time_ZCWG)
          this.education_change_fn(this.code,this.list_time_ZCWG)
          this.college_change_fn(this.code,this.list_time_ZCWG)
        }

      },
      //分页函数
      handleSizeChange_ZCWG(val) {
        var vm = this
        vm.loading_ZCWG = true
        vm.pageNum_ZCWG = val
        this.made_list_fn(this.code,this.list_time_ZCWG,this.pageNum_ZCWG,this.size_ZCWG)
      },
      handleCurrentChange_ZCWG(val) {
        var vm = this
        vm.loading_ZCWG = true
        vm.pageNum_ZCWG = val
        this.made_list_fn(this.code,this.list_time_ZCWG,this.pageNum_ZCWG,this.size_ZCWG)
      },
      made_list_fn(flag,month,page,pageSize){
        let vm = this
        vm.$axios.request("post","EarlyAndLate/stuList", {
          flag:flag,
          month:month,
          page:page,
          pageSize:pageSize,
        },function(data){
          vm.goHome_list = []
          vm.total_count_ZCWG = parseInt(data.totalCount)
          let name =''
          let sex = ''
          let age = ''
          let major = ''
          let school = ''
          let education = ''
          let count = ''
          for(let i=0;i<data.result.length;i++){
            if(data.result[i].name =='??'||data.result[i].name =='null'){
              name = '未知'
            }else{
              name = data.result[i].name
            }

            if(data.result[i].sex =='??'||data.result[i].sex =='null'){
              sex = '未知'
            }else{
              sex = data.result[i].sex
            }

            if(data.result[i].age =='??'||data.result[i].age =='null'){
              age = '未知'
            }else{
              age = data.result[i].age
            }

            if(data.result[i].specialty =='??'||data.result[i].specialty =='null'){
              major = '未知'
            }else{
              major = data.result[i].specialty
            }

            if(data.result[i].branch =='??'||data.result[i].branch =='null'){
              school = '未知'
            }else{
              school = data.result[i].branch
            }

            if(data.result[i].education =='??'||data.result[i].education =='null'){
              education = '未知'
            }else{
              education = data.result[i].education
            }

            if(data.result[i].count =='??'||data.result[i].count =='null'){
              count = '未知'
            }else{
              count = data.result[i].count
            }
            vm.goHome_list.push({
              name : name,
              sex : sex,
              age : age,
              major : major,
              school : school ,
              education:education,
              count:count
            })
          }
          vm.$nextTick(function() {
            vm.loading_ZCWG = false
          })
        },function(err){
          console.log(err);
        })
      },
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //早出晚归echarts函数

      home_time_fn(){
        let home_time = this.$echarts.init(document.getElementById('home_time'), 'customed');
        let option = {
          title: {
            text: '单位(人)',
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
            }
          },
          legend: {
            data: [this.select_ZCWG+'趋势']
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
            data: this.ZCWGQS_time
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: this.select_ZCWG+'趋势',
            type: 'line',
            stack: '总量',
            data: this.ZCWGQS_count
          }]
        };
        home_time.setOption(option);
      },
      home_fn(flag,time){
        let vm = this
        vm.$axios.request("post","EarlyAndLate/tendency", {
          flag:flag,
          date:time,
        },function(data){
          vm.ZCWGQS_time = []
          vm.ZCWGQS_count = []
          for(let i=0;i<data.result.length;i++){
            vm.ZCWGQS_time.push(data.result[i].day + '日')
            vm.ZCWGQS_count.push(data.result[i].count)
          }
          vm.home_time_fn()
        },function(err){
          console.log(err);
        })
      },
      /*home_time_change(){},*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //专业
      education_fn(){
        let education = this.$echarts.init(document.getElementById('education'), 'customed');
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
            formatter: "{a} <br/>{b} : {c}人"
          },
          legend: {
            data: ['专业分布']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            minInterval : 1,
            boundaryGap: [0, 0.01],
            "axisLabel": {
              "interval": 0,
              formatter: '{value}',
            },
          },
          yAxis: {
            type: 'category',
            data: this.ZCWGXL_time,
          },
          series: [{
            name: '专业分布',
            type: 'bar',
            data: this.ZCWGXL_count,
            label:{
              normal:{
                show: true,
                position: 'right'}
            },
          }]
        };

        education.setOption(option);
      },
      education_change_fn(flag,time){
        let vm = this
        vm.$axios.request("post","EarlyAndLate/specialtyDis", {
          flag:flag,
          date:time,
        },function(data){
          vm.ZCWGXL_time = []
          vm.ZCWGXL_count = []
          let name = ''
          for(let i=0;i<data.result.length;i++){
            if(data.result[i].specialty ==null){
              name = '未知'
            }else{
              name = data.result[i].specialty
            }
            vm.ZCWGXL_time.push(name)
            vm.ZCWGXL_count.push(data.result[i].count)
          }
          vm.education_fn()
        },function(err){
          console.log(err);
        })
      },
      /*education_time_change(val){},*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //学院
      school_fn(){
        let college = this.$echarts.init(document.getElementById('college'), 'customed');
        let option = {
          color:['#FB5D6D'],
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
            formatter: "{a} <br/>{b} : {c}人"
          },
          legend: {
            data: ['学院分布']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            minInterval : 1,
            boundaryGap: [0, 0.01],
            "axisLabel": {
              "interval": 0,
              formatter: '{value}',
            }
          },
          yAxis: {
            type: 'category',
            data: this.ZCWGXY_time
          },
          series: [{
            name: '学院分布',
            type: 'bar',
            data: this.ZCWGXY_count,
            label:{
              normal:{
                show: true,
                position: 'right'}
            },
          }]
        };

        college.setOption(option);
      },
      college_change_fn(flag,time){
        let vm = this
        vm.$axios.request("post","EarlyAndLate/academyDis", {
          flag:flag,
          date:time,
        },function(data){
          vm.ZCWGXY_time = []
          vm.ZCWGXY_count = []
          for(let i=0;i<data.result.length;i++){
            vm.ZCWGXY_time.push(data.result[i].academy )
            vm.ZCWGXY_count.push({name:data.result[i].academy ,value:data.result[i].count})
          }
          vm.school_fn()
        },function(err){
          console.log(err);
        })
      },
     /*college_time_change(val){}*/
    },
    mounted(){
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
    },
    created(){
      this.menu()
      this.made_list_fn(this.code,this.list_time_ZCWG,this.pageNum_ZCWG,this.size_ZCWG)
      this.home_fn(this.code,this.list_time_ZCWG)
      this.education_change_fn(this.code,this.list_time_ZCWG)
      this.college_change_fn(this.code,this.list_time_ZCWG)
    }
  }
</script>

<style>

</style>
