<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item>疑似困难学生分析</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" style="margin-bottom: 0">
        <div class="ec_h5" style="height: 30px;margin-bottom: 30px">
          <el-radio-group v-model="radio" size="large" @change="typeChange">
            <el-radio-button label="低消费学生分析"></el-radio-button>
            <el-radio-button label="高消费学生分析" style="margin-right: 20px"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="ec_h5" style="height: 30px;">
          <el-select
            v-model="student"
            style="margin-right: 20px"
            placeholder="请选择"
            size="mini"
            class="major-select"
            @change="studentChange">
            <el-option
              v-for="item in studentList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-select
            v-model="majorSelect"
            style="margin-right: 20px;height: 30px"
            placeholder="请选择"
            size="mini"
            class="major-select"
            @change="majorChange">
            <el-option
              v-for="item in majorList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-input
            v-model="input"
            style="margin-right: 20px;margin-left: -5px"
            placeholder="点图标查询"
            class="major-select"
            icon="search"
            size="mini"
            :on-icon-click="handleIconClick">
          </el-input>
          <el-popover
            ref="popover1"
            placement="top-start"
            width="200"
            trigger="hover"
            content="低消费默认:50元 ; 高消费默认:(留学生:508.25元,本科生:869.24元)">
          </el-popover>
          <el-button  type="text" v-popover:popover1>自定义金额:</el-button>
        </div>
        <div class="ec_height" id="home_time"></div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          男女比例
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy"
              @change="education_time_change"
              v-model="education_time"
              type="year"
              placeholder='选择时间'>
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="education"></div>
      </el-col>
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          洲际比例
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy"
              @change="college_time_change"
              v-model="college_time"
              type="year"
              placeholder='选择时间'>
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="college"></div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          {{radio}}列表
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy"
              @change="student_list_time_change"
              v-model="student_list_time"
              type="year"
              placeholder='选择时间'>
            </el-date-picker>
          </div>
        </h5>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg_left" style="margin-right: 0;">
        <div style="height: 450px;" id="positive">
          <el-table :data="goHome_list" align="center" style="width: 100%;overflow: auto" :show-header='true'>
            <el-table-column prop="name" label="姓名"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="sex" label="性别"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="specialty" label="专业" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="branch" label="学院"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="cardno" label="卡号" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="native" label="地区" class-name="elTableName">
            </el-table-column>

          </el-table>
        </div>

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
      </el-col>

    </el-row>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        goHome_list:[],
        education_time:'2017',
        college_time:'2017',
        majorSelect:'汉语言',
        majorList:[
          '对外汉语',
          '汉语言',
          '德语',
          '英语',
          '新闻学',
          '绘画',
          '捷克语—斯洛伐克语',
          '日语','朝鲜语',
          '瑞典语',
          '人力资源管理',
          '西班牙语',
          '金融学',
          '计算机科学与技术',
          '阿拉伯语',
          '信息管理与信息系统',
          '科学教育',
          '汉语国际教育',
          '国际政治',
          '俄语',
          '会计学',
          '国际经济与贸易',
          '法语',
          '中国革命史与中国共产党党史',
          '翻译',
          '汉语言文学',
          '国际事务与国际关系',
          '测绘工程',
        ],
        student:'留学生长期生',
        studentList:['本科生','留学生长期生','留学生短期生'],
        radio:'低消费学生分析',
        flag:'0',
        input:'',
        one_year:[],
        one_count:[],
        sex:[],
        sex_count:[],
        ZJ_circle:[],
        ZJ_count:[],
        pageNum:1,
        size:10,
        total_count:0,
        student_list_time:'2017'
      }
    },
    methods:{
      menu() {
        window.scrollTo(0,0);
      },
      //筛选条件
      majorChange(val){
        var vm = this
        vm.majorSelect = val
        vm.all_search(vm.flag,vm.student,vm.majorSelect,this.input)
        vm.sex_circle_fn(this.flag,this.student,this.majorSelect,this.input,this.education_time)
        vm.ZJ_circle_fn(this.flag,this.student,this.majorSelect,this.input,this.college_time)
        vm.FY_fn(vm.student_list_time,vm.flag,vm.student,vm.majorSelect,vm.input,vm.pageNum,vm.size)
      },
      studentChange(val){
        var vm = this
        this.student = val
        vm.all_search(vm.flag,vm.student,vm.majorSelect,this.input)
        this.sex_circle_fn(this.flag,this.student,this.majorSelect,this.input,this.education_time)
        this.ZJ_circle_fn(this.flag,this.student,this.majorSelect,this.input,this.college_time)
        vm.FY_fn(vm.student_list_time,vm.flag,vm.student,vm.majorSelect,vm.input,vm.pageNum,vm.size)
      },
      typeChange(label){
        var vm = this
        if(label == '低消费学生分析'){
          vm.flag = 0
        }else{
          vm.flag = 1
        }
        vm.all_search(vm.flag,vm.student,vm.majorSelect,vm.input)
        vm.sex_circle_fn(vm.flag,vm.student,vm.majorSelect,vm.input,vm.education_time)
        vm.ZJ_circle_fn(vm.flag,vm.student,vm.majorSelect,vm.input,vm.college_time)
        vm.FY_fn(vm.student_list_time,vm.flag,vm.student,vm.majorSelect,vm.input,vm.pageNum,vm.size)
      },
      //点击放大镜查找的函数
      handleIconClick(ev){
        var vm = this
        console.log(vm.input)
        vm.all_search(vm.flag,vm.student,vm.majorSelect,vm.input)
        vm.sex_circle_fn(vm.flag,vm.student,vm.majorSelect,vm.input,vm.education_time)
        vm.ZJ_circle_fn(vm.flag,vm.student,vm.majorSelect,vm.input,vm.college_time)
        vm.FY_fn(vm.student_list_time,vm.flag,vm.student,vm.majorSelect,vm.input,vm.pageNum,vm.size)
      },


      //查询的函数
      all_search(flag,type,specialty,line){
        var vm = this
        vm.$axios.request("post","difficultStudent/specialtyDis",{flag:flag,type:type,specialty:specialty,line:line},function(data){
          vm.one_year = []
          vm.one_count = []
          for(var i=0;i<data.result.length;i++){
            vm.one_year.push(data.result[i].year)
            vm.one_count.push(data.result[i].count)
          }
          console.log(data)
          vm.home_time_fn()
        },function(err){
          console.log(err);
        })
      },
      //男女比例请求数据函数
      sex_circle_fn(flag,type,specialty,line,year){
        var vm = this
        //男女比例

        vm.$axios.request("post","difficultStudent/sexDis",{
          flag:flag,
          type:type,
          specialty:specialty,
          line:line,
          year:year},function(data){
          console.log(data)
          vm.sex = []
          vm.sex_count = []
          for(var i=0;i<data.result.length;i++){
            vm.sex.push(data.result[i].sex)
            vm.sex_count.push({name:data.result[i].sex,value:data.result[i].count})
          }
          vm.sex_fn()
        },function(err){
          console.log(err);
        })
      },
      //洲际比例请求数据函数
      ZJ_circle_fn(flag,type,specialty,line,year){
        var vm = this
        //洲际比例
        vm.$axios.request("post","difficultStudent/continentDis",{flag:flag,type:type,specialty:specialty,line:line,year:year},function(data){
          vm.ZJ_circle = []
          vm.ZJ_count = []
          for(var i=0;i<data.result.length;i++){
            vm.ZJ_circle.push(data.result[i].continent)
            vm.ZJ_count.push({name:data.result[i].continent,value:data.result[i].count})
          }
          vm.college_fn()
        },function(err){
          console.log(err);
        })
      },
      //分页筛选条件不同时发送求情的方法
      FY_fn(time,flag,type,major,line,num,size){
        var vm = this
        vm.$axios.request("post","difficultStudent/studentList",{
          year:time,
          flag:flag,
          type:type,
          specialty:major,
          line:line,
          page:num,
          pageSize:size},function(data){
          vm.goHome_list = []
          vm.total_count = parseInt(data.totalCount)
          for(var i=0;i<data.result.length;i++){
            var native = ''
            if(data.result[i].native == 'null'){
              native = '未知'
            }else{
              native = data.result[i].native
            }
            vm.goHome_list.push({
              branch:data.result[i].branch,
              cardno:parseInt(data.result[i].cardno),
              name:data.result[i].name,
              native:native,
              sex:data.result[i].sex,
              specialty:data.result[i].specialty,
            })

          }
        },function(err){
          console.log(err);
        })
      },


      //困难学生分析echarts函数
      home_time_fn(){
        let home_time = this.$echarts.init(document.getElementById('home_time'), 'customed');
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
            data: ['消费人数趋势']
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
            data: this.one_year,
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '消费人数趋势',
            type: 'line',
            stack: '总量',
            data: this.one_count
          }]
        };
        home_time.setOption(option);
      },
      //男女比例
      sex_fn(){
        let education = this.$echarts.init(document.getElementById('education'), 'customed');
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
            data: this.sex
          },
          series : [
            {
              name: '男女比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.sex_count,
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

        education.setOption(option);
      },
      education_time_change(val){
        if(val == undefined){
          return
        }else{
          this.education_time = val
          this.sex_circle_fn(this.flag,this.student,this.majorSelect,this.input,this.education_time)
        }

      },
      //洲际比例
      college_fn(){
        let college = this.$echarts.init(document.getElementById('college'), 'customed');
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
            data:this.ZJ_circle
          },
          series : [
            {
              name: '洲际分布',
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

        college.setOption(option);
      },
      college_time_change(val){
        if(val == undefined){
          return
        }else{
          this.college_time = val
          this.ZJ_circle_fn(this.flag,this.student,this.majorSelect,this.input,this.college_time)
        }

      },

      //分页函数
      handleSizeChange(val) {
        var vm = this
        this.pageNum = val
        vm.FY_fn(vm.student_list_time,vm.flag,vm.student,vm.majorSelect,vm.input,vm.pageNum,vm.size)
      },
      handleCurrentChange(val) {
        var vm = this
        this.pageNum = val
        vm.FY_fn(vm.student_list_time,vm.flag,vm.student,vm.majorSelect,vm.input,vm.pageNum,vm.size)
      },
      student_list_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.student_list_time = val
          vm.FY_fn(vm.student_list_time,vm.flag,vm.student,vm.majorSelect,vm.input,vm.pageNum,vm.size)
        }

      }


    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.college_fn()
    },
    created(){
      var vm= this
      vm.menu()
      //页面一进来默认请求
      vm.$axios.request("post","difficultStudent/specialtyDis",{flag:vm.flag,type:vm.student,specialty:vm.majorSelect,line:''},function(data){
        console.log(data.result.length)
        for(var i=0;i<data.result.length;i++){
          vm.one_year.push(data.result[i].year)
          vm.one_count.push(data.result[i].count)
        }
        vm.home_time_fn()
      },function(err){
        console.log(err);
      })

      //男女比例
      vm.$axios.request("post","difficultStudent/sexDis",{
        flag:vm.flag,
        type:vm.student,
        specialty:vm.majorSelect,
        line:'',
        year:vm.education_time
        },function(data){
        for(var i=0;i<data.result.length;i++){
          vm.sex.push(data.result[i].sex)
          vm.sex_count.push({name:data.result[i].sex,value:data.result[i].count})
        }
        vm.sex_fn()
      },function(err){
        console.log(err);
      })
      //洲际比例
      vm.$axios.request("post","difficultStudent/continentDis",{flag:vm.flag,type:vm.student,specialty:vm.majorSelect,line:''},function(data){
        for(var i=0;i<data.result.length;i++){
          vm.ZJ_circle.push(data.result[i].continent)
          vm.ZJ_count.push({name:data.result[i].continent,value:data.result[i].count})
        }
        vm.college_fn()
      },function(err){
        console.log(err);
      })

      //高低消费学生列表
      vm.$axios.request("post","difficultStudent/studentList",{
        flag:vm.flag,
        type:vm.student,
        specialty:vm.majorSelect,
        line:'',
        year:vm.student_list_time,
        page:vm.pageNum,
        pageSize:vm.size},function(data){
        vm.total_count = parseInt(data.totalCount)
        for(var i=0;i<data.result.length;i++){
            var native = ''
            if(data.result[i].native == 'null'){
              native = '未知'
            }else{
              native = data.result[i].native
            }
          vm.goHome_list.push({
            branch:data.result[i].branch,
            cardno:parseInt(data.result[i].cardno),
            name:data.result[i].name,
            native:native,
            sex:data.result[i].sex,
            specialty:data.result[i].specialty,
          })

        }
      },function(err){
        console.log(err);
      })
    }
  }
</script>

<style>
  .search{
    width: 200px;
    float: left;
  }
</style>
