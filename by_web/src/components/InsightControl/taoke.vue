<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item>疑似逃课行为分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg_left">
        <h5 class="ec_h5">
          疑似逃课行为分析&nbsp;&nbsp;({{major_data}}月)
          <div class="ec_h5_data">
            <el-select
              v-model="majorSelect_TK"
              placeholder="请选择"
              size="mini"
              class="major-select"
              @change="TKChange">
              <el-option
                v-for="item in majorList_TK"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-date-picker
              class="major-data select_width"
              align="right"
              size='mini'
              format="yyyy-MM"
              @change="TK_change_year"
              v-model="major_data"
              type="month"
              placeholder="选择年">
            </el-date-picker>
          </div>

        </h5>
        <div class="ec_height" id="positive">
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="TK_list"
            align="center"
            style="width: 100%;overflow: auto"
            :show-header='true'>
            <el-table-column prop="name" width="100"  label="姓名"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="sex" width="100" label="性别" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="country" width="150"  label="国别" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="school" width="150"  label="学院"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="major" label="专业" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="subject" label="所逃课程"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="teacher" width="150"  label="任课教师" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="xh" label="学号"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="time" label="逃课时间"  class-name="elTableName">
            </el-table-column>
          </el-table>
        </div>
        <div class="block"  style="width:300px;margin:20px auto">
          <el-pagination
            @size-change="handleSizeChange_TK"
            @current-change="handleCurrentChange_TK"
            :current-page.sync= pageNum_TK
            :page-size= size_TK
            layout="total, prev, pager, next"
            :total=total_count_TK>
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          逃课行为趋势 &nbsp;&nbsp;{{TK_time}}月&nbsp;&nbsp;-单位(人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM"
              @change="TK_time_change"
              v-model="TK_time"
              type="month"
              placeholder='选择时间'>
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="home_time"></div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          男女比例&nbsp;&nbsp;{{sex_time}}月&nbsp;&nbsp;-单位(人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM"
              @change="sex_time_change"
              v-model="sex_time"
              type="month"
              placeholder='选择时间'>
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="education"></div>
      </el-col>
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          逃课学生学院分布TOP5&nbsp;&nbsp;{{ZJ_time}}月&nbsp;&nbsp;-单位(人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM"
              @change="ZJ_time_change"
              v-model="ZJ_time"
              type="month"
              placeholder='选择时间'>
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="college"></div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          逃课率比例&nbsp;&nbsp;{{course_time}}月&nbsp;&nbsp;-单位(人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM"
              @change="course_time_change"
              v-model="course_time"
              type="month"
              placeholder='选择时间'>
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="course"></div>
      </el-col>
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          逃课教师分布TOP10&nbsp;&nbsp;{{teacher_time}}月&nbsp;&nbsp;-单位(人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM"
              @change="teacher_time_change"
              v-model="teacher_time"
              type="month"
              placeholder='选择时间'>
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="teacher"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        major_data:'2017-10',
        majorSelect_TK: '商学院',
        majorList_TK: [
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
        loading:true,
        TK_list:[],
        pageNum_TK:1,
        size_TK:8,
        total_count_TK:0,
        //学生逃课趋势
        TK_time:'2017-10',
        QS_time:[],
        QS_count:[],
        //男女比例
        sex_time:'2017-10',
        sex_name:[],
        sex_count_TK:[],

        //学院比例
        ZJ_time:'2017-10',
        ZJ_name:[],
        ZJ_count_TK:[],

        //逃课率比例
        course_time:'2017-10',
        course_name:[],
        course_count:[],

        //逃课教师比例
        teacher_time:'2017-10',
        teacher_name:[],
        teacher_count:[]
      }
    },
    methods: {
      menu() {
        window.scrollTo(0,0);
      },
      //逃课行为分析列表
      TKChange(val) {
        var vm = this
        vm.majorSelect_TK = val
        vm.TK_list_init_fn(vm.majorSelect_TK,vm.major_data,vm.pageNum_TK,vm.size_TK)
      },
      //逃课时间选择
      TK_change_year(val){
        var vm = this
        if(val == undefined){
          return
        }else{
          vm.major_data = val
          vm.TK_list_init_fn(vm.majorSelect_TK,vm.major_data,vm.pageNum_TK,vm.size_TK)
        }

      },
      handleSizeChange_TK(val) {
        var vm = this
        vm.loading = true
        vm.pageNum_TK = val
        vm.TK_list_init_fn(vm.majorSelect_TK,vm.major_data,vm.pageNum_TK,vm.size_TK)

      },
      handleCurrentChange_TK(val) {
        var vm = this
        vm.loading = true
        vm.pageNum_TK = val
        vm.TK_list_init_fn(vm.majorSelect_TK,vm.major_data,vm.pageNum_TK,vm.size_TK)
      },
      TK_list_init_fn(academy,date,page,pageSize){
        let vm = this
        //逃课列表初始化
        vm.$axios.request("post","skipClasses/taokeList",{
          academy:academy,
          date:date,
          page:page,
          pageSize:pageSize},function(data){
          vm.TK_list=[]
          vm.total_count_TK = parseInt(data.totalCount)
          for(let i = 0;i<data.result.length;i++){
            vm.TK_list.push({
              name:data.result[i].name,
              sex:data.result[i].sex,
              country:data.result[i].country,
              school:data.result[i].academy,
              major:data.result[i].specialty,
              subject:data.result[i].subject,
              teacher:data.result[i].teacher,
              xh:data.result[i].xh,
              time:data.result[i].opdt,
            })
            vm.$nextTick(function() {
              vm.loading = false
            })
          }
        },function(err){
          console.log(err);
        })
      },

      //逃课行为趋势echarts函数
      TK_time_fn() {
        let home_time = this.$echarts.init(document.getElementById('home_time'), 'customed');
        let option = {
          /*title: {
            text: '单位(人数)',
            textStyle: {
              fontSize: 12,
            },
          },*/
          color: ['#9BDB57'],
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
            data: ['逃课人数趋势']
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
            name: '逃课人数趋势',
            type: 'line',
            stack: '总量',
            data:this.QS_count
          }]
        };
        home_time.setOption(option);
      },
      TK_time_change(val) {
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.TK_time = val
          vm.Tk_QS_init_fn(this.TK_time)
        }


      },
      Tk_QS_init_fn(date){
        let vm = this
        //历年考研趋势
        vm.$axios.request("post","skipClasses/taoKeTrend", {date:date},function(data){
          vm.QS_name = []
          vm.QS_count = []
          for(let i=0;i<data.result.length;i++){
            vm.QS_name.push(data.result[i].day + '日')
            vm.QS_count.push(data.result[i].count)
          }
          vm.TK_time_fn()
        },function(err){
          console.log(err);
        })
      },

      //男女比例
      sex_fn() {
        let education = this.$echarts.init(document.getElementById('education'), 'customed');
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: this.sex_name
          },
          series: [
            {
              name: '男女比例',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.sex_count_TK,
              label: {
                normal: {
                  show: true,
                  formatter: '{b}:{c}人'
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
      sex_time_change(val) {
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.sex_time = val
          vm.sex_init_fn(this.sex_time)
        }


      },
      sex_init_fn(date){
        let vm = this
        //历年考研趋势
        vm.$axios.request("post","skipClasses/taoKeSex", {date:date},function(data){
          vm.sex_name = []
          vm.sex_count_TK = []
          for(let i=0;i<data.result.length;i++){
            vm.sex_name.push(data.result[i].sex)
            vm.sex_count_TK.push({name:data.result[i].sex,value:data.result[i].count})
          }
          vm.sex_fn()
        },function(err){
          console.log(err);
        })
      },

      //洲际比例
      ZJ_fn() {
        let college = this.$echarts.init(document.getElementById('college'), 'customed');
        let option = {
          color:['#FB591C'],
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
            boundaryGap: [0, 0.01],
            "axisLabel": {
              "interval": 0,
              formatter: '{value}',
            }
          },
          yAxis: {
            type: 'category',
            data: this.ZJ_name
          },
          series: [{
            name: '学院分布',
            type: 'bar',
            data: this.ZJ_count_TK,
            label:{
              normal:{
                show: true,
                position: 'right'}
            },
          }]
        };
        college.setOption(option);
      },
      ZJ_time_change(val) {
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.ZJ_time = val
          vm.ZJ_init_fn(this.ZJ_time)
        }

      },
      ZJ_init_fn(date){
        let vm = this
        //历年考研趋势
        vm.$axios.request("post","skipClasses/taoKeAcademy", {date:date},function(data){
          vm.ZJ_name = []
          vm.ZJ_count_TK = []
          for(let i=0;i<data.result.length;i++){
            vm.ZJ_name.push(data.result[i].academy)
            vm.ZJ_count_TK.push(data.result[i].count)
          }
          vm.ZJ_fn()
        },function(err){
          console.log(err);
        })
      },

      //逃课率比例
      course_fn() {
        let course = this.$echarts.init(document.getElementById('course'), 'customed');
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: this.course_name
          },
          series: [
            {
              name: '逃课率比例',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.course_count,
              label: {
                normal: {
                  show: true,
                  formatter: '{b}:{c}人'
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
        course.setOption(option);
      },
      course_time_change(val){
        if(val == undefined){
          return
        }else{
          this.course_time = val
          this.course_init_fn(this.course_time)
        }

      },
      course_init_fn(date){
        let vm = this
        //历年考研趋势
        vm.$axios.request("post","skipClasses/taoKeCurriculum", {date:date},function(data){
          vm.course_name = []
          vm.course_count = []
          for(let i=0;i<data.result.length;i++){
            vm.course_name.push(data.result[i].subject)
            vm.course_count.push({name:data.result[i].subject,value:data.result[i].count})
          }
          vm.course_fn()
        },function(err){
          console.log(err);
        })
      },


      //逃课教师比例
      teacher_fn() {
        let teacher = this.$echarts.init(document.getElementById('teacher'), 'customed');
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
            data: ['逃课教师分布']
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
            data: this.teacher_name
          },
          series: [{
            name: '逃课教师分布',
            type: 'bar',
            data: this.teacher_count,
            label:{
              normal:{
                show: true,
                position: 'right'}
            },
          }]
        };
        teacher.setOption(option);
      },
      teacher_time_change(val){
        if(val == undefined){
          return
        }else{
          this.teacher_time = val
          this.teacher_init_fn(this.teacher_time)
        }

      },
      teacher_init_fn(date){
        let vm = this
        //历年考研趋势
        vm.$axios.request("post","skipClasses/taoKeTeacher", {date:date},function(data){
          vm.teacher_name = []
          vm.teacher_count = []
          for(let i=0;i<data.result.length;i++){
            vm.teacher_name.push(data.result[i].teacher)
            vm.teacher_count.push(data.result[i].count)
          }
          vm.teacher_fn()
        },function(err){
          console.log(err);
        })
      }
    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
    },
    created(){
      this.menu()
      this.TK_list_init_fn(this.majorSelect_TK,this.major_data,this.pageNum_TK,this.size_TK)
      this.Tk_QS_init_fn(this.TK_time)
      this.sex_init_fn(this.sex_time)
      this.course_init_fn(this.course_time)
      this.teacher_init_fn(this.teacher_time)
      this.ZJ_init_fn(this.ZJ_time)
    }
  }
</script>

<style>

</style>
