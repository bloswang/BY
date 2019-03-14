<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/school' }">北语校情</el-breadcrumb-item>
      <el-breadcrumb-item>教职工人数详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          教职工列表
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="teacher_time"
              type="year"
              format="yyyy"
              @change="teacher_time_change"
              placeholder="选择时间">
            </el-date-picker>
            <!--<el-select v-model="teacherSelect" placeholder="在职" class="select_width" size="mini" @change="teacherChange">
              <el-option
                v-for="item in teacherList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>-->
            <el-select v-model="schoolSelect" placeholder="商学院" class="select_width" size="mini" @change="schoolChange">
              <el-option
                v-for="item in schoolList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </h5>
        <div class="grid-content bg-purple-dark">
          <template>
            <el-table :data="tableData" style="width: 100%" class="by_body_table" :border=false>
              <el-table-column prop="name" label="姓名" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="gender" label="性别" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="duty" label="学院" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="order" label="职称" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="age" label="入职时间" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
            </el-table>
          </template>
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
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          历年新增教职工人数趋势&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="history_start_time"
              type="year"
              format="yyyy"
              @change="history_start_time_change"
              placeholder="选择时间">
            </el-date-picker>
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="history_end_time"
              type="year"
              format="yyyy"
              @change="history_end_time_change"
              placeholder="选择时间">
            </el-date-picker>
            <el-select v-model="schoolSelect1" placeholder="商学院" class="select_width" size="mini" @change="schoolChange1">
              <el-option
                v-for="item in schoolList1"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </h5>
        <div class="ec_height" id="echarts_6">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          男女比例&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="sex_end_time"
              type="month"
              format="yyyy-MM"
              @change="sex_end_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="echarts_2">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          年龄比例&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="age_end_time"
              type="year"
              format="yyyy"
              @change="age_end_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="echarts_3">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          职称比例&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="ZC_end_time"
              type="month"
              format="yyyy-MM"
              @change="ZC_end_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="echarts_4">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          学位比例&nbsp;&nbsp;(单位:人)&nbsp;&nbsp;<!--有学位总人数：{{has_XW_sum}}人-->
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="teacher_XW_end"
              type="month"
              format="yyyy-MM"
              @change="teacher_XW_end_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="echarts_5">
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          教师出国情况统计
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="XSGL_time"
              type="year"
              format="yyyy"
              @change="XSGL_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="positive">
          <el-table
            :data="XSGL_list"
            align="center"
            style="width: 100%;overflow: auto"
            :show-header='true'>
            <el-table-column prop="one" label="姓名"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="four" label="所去国家" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="three" label="出国类别" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="two" label="单位名称" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="five" label="出国日期"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="sex" label="回国日期"  class-name="elTableName">
            </el-table-column>
          </el-table>
        </div>
        <div class="block"  style="width:300px;margin:20px auto">
          <el-pagination
            @size-change="CGSizeChange"
            @current-change="CGCurrentChange"
            :current-page.sync= CGpageNum
            :page-size= CGsize
            layout="total, prev, pager, next"
            :total=CGtotal_count>
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import time from '../../config/timeFormat'
  export default{
    data () {
      return {
        now_year:'',
        now_month:'',
        teacher_time:'2017',
        teacherSelect:'全部',
        teacher_code:'',
        teacherList:['全部','在职','离休','退休'],
        schoolSelect:'全部',
        code:'',
        schoolList:['全部'],
        schoolSelect1:'全部',
        schoolList1:['全部'],
        code1:'',
        pageNum:1,
        size:10,
        total_count:0,
        //男女比例
        sex_end_time:'2017-11',
        sex:[],
        sex_num:[],

        //年龄比例
        age_end_time:'2017',
        age:[],
        age_num:[],

        //职称比例
        ZC_end_time:'2018-01',
        title_name:[],
        title_num:[],

        //学位比例
        teacher_XW_end:'2018-01',
        has_XW_sum:0,
        teacher_XW_name:[],
        teacher_XW_count:[],

        //历史教职工人数趋势
        history_start_time:'2000',
        history_end_time:'2017',
        history_name:[],
        history_num:[],

        msg: '上网行为',
        teachingTeam_time:"2017-11",
        tableData: [],

        XSGL_time:'2017',
        XSGL_list:[

        ],
        CGpageNum:1,
        CGsize:8,
        CGtotal_count:0,
      }
    },
    components: {},
    methods: {
      make_time(){
        let vm = this
        vm.teacher_time= time.year
        vm.sex_end_time= time.year + '-' + time.month
        vm.age_end_time= time.year
        vm.ZC_end_time = time.year + '-' + time.month
        vm.teacher_XW_end = time.year + '-' + time.month
        vm.history_start_time= time.year - 10 + ''
        vm.history_end_time= time.year
        vm.teachingTeam_time = time.year + '-' + time.month
        vm.XSGL_time= time.year
      },
      menu() {
        window.scrollTo(0,0);
      },
      //教职工列表选择参数时的函数
      //在职离职状态
      teacherChange(val){
        var vm = this
        this.teacherSelect = val
        let code = ''
        if(val =='全部'){
          code = ''
        }else{
          code = val
        }
        this.teacher_code = code
      },

      //时间
      teacher_time_change(val){
        var vm = this
        if(val == undefined){
          return
        }else{
          this.teacher_time = val
          vm.all_fn(vm.code,vm.teacher_time,vm.pageNum,vm.size)
        }

      },
      //学院
      schoolChange(val){
        var vm = this
        if(val =='全部'){
          vm.code = ''
        }else{
          vm.code = val
        }
        this.schoolSelect = val
        vm.all_fn(vm.code,vm.teacher_time,vm.pageNum,vm.size)
      },
      //分页函数
      handleSizeChange(val) {
        var vm = this
        this.pageNum = val
        vm.all_fn(vm.code,vm.teacher_time,vm.pageNum,vm.size)
      },
      handleCurrentChange(val) {
        var vm = this
        this.pageNum = val
        vm.all_fn(vm.code,vm.teacher_time,vm.pageNum,vm.size)
      },
      all_fn(branch,year,page,pageSize){
        var vm= this
        //教职工人数更新
        vm.$axios.request("post","staff/teachersList",{branch:branch,year:year,page:page,pageSize:pageSize},function(data){
          vm.tableData = []
          vm.total_count = parseInt(data.totalCount)
          //当职称等于null的时候就让值等于无
          for(var i=0;i<data.result.length;i++){
            var title = ''
            if(data.result[i].title == 'null'||data.result[i].title == null){
              title = '无'
            }else{
              title = data.result[i].title
            }
            vm.tableData.push({
              order: title,
              name: data.result[i].name,
              age: data.result[i].date,
              gender: data.result[i].sex,
              duty: data.result[i].branch,
            })
          }
        },function(err){
          console.log(err);
        })
      },

      //男女比例的相关方法
      echarts2(){
        let echarts_2 = this.$echarts.init(document.getElementById("echarts_2"), 'customed');
        let option = {
          /*title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },*/
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
              data:this.sex_num,
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
        echarts_2.setOption(option)
      },
      /*开始时间选择*/

      /*结束时间*/
      sex_end_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.sex_end_time = val
          vm.sex_fn(vm.sex_end_time)
        }


      },
      sex_fn(end){
        let vm = this
        //教职工人数初始化
        vm.$axios.request("post","staff/teachersSex",{endDate:end},function(data){
          vm.sex = []
          vm.sex_num = []
          for(let i = 0;i<data.result.length;i++){
            if(data.result[i].sex!==null){
              vm.sex.push(data.result[i].sex)
              vm.sex_num.push({name:data.result[i].sex,value:data.result[i].count})
            }
          }
          vm.echarts2()
        },function(err){
          console.log(err);
        })
      },


      //年龄比例相关方法
      echarts3(){
        let vm = this
        let echarts_3 = this.$echarts.init(document.getElementById("echarts_3"), 'customed');
        let option = {
//          title: {
//            text: '单位(人)',
//            textStyle: {
//              fontSize: 12,
//            },
//            left:'90%',
//            top:'5%'
//          },
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
              data : vm.age,
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
              name:'年龄比例',
              type:'bar',
              barWidth: '60%',
              data:vm.age_num
            }
          ]
        };
        echarts_3.setOption(option)
      },
      //时间变化
      age_end_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.age_end_time = val
          vm.age_fn(vm.age_end_time)
        }

      },
      age_fn(end){
        let vm = this
        //教职工年龄比例
        vm.$axios.request("post","staff/teachersAge",{endYear:end},function(data){
          vm.age = []
          vm.age_num = []
          for(let i = 0;i<data.result.length;i++){
            vm.age.push(data.result[i].age)
            vm.age_num.push(parseInt(data.result[i].count))
          }
          vm.echarts3()
        },function(err){
          console.log(err);
        })
      },


      //职称比例相关函数
      echarts4(){
        let echarts_4 = this.$echarts.init(document.getElementById("echarts_4"), 'customed');
        let option = {
          /*title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },*/
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: this.title_name
          },
          series : [
            {
              name: '学位分布',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.title_num,
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
        echarts_4.setOption(option)
      },
      ZC_end_time_change(val){
        let vm = this
        if(val == undefined){
         return
        }else{
          vm.ZC_end_time = val
          vm.title_fn(vm.ZC_end_time)
        }

      },
      title_fn(end){
        let vm = this
        //职称比例
        vm.$axios.request("post","staff/teachersTitle",{endDate:end},function(data){
          vm.title_name=[]
          vm.title_num = []
          let title = ''
          let count = ''
          let other = 0
          for(let i = 0;i<data.result.length;i++){
            if(data.result[i].count < 10){
              other += data.result[i].count*1
            }else{
              title = data.result[i].title=='null'?'无':data.result[i].title
              count = data.result[i].count
              vm.title_name.push(title)
              vm.title_num.push({name:title,value:count})
            }
          }
          vm.title_name.push('其他')
          vm.title_num.push({name:'其他',value:other})
          vm.echarts4()
        },function(err){
          console.log(err);
        })
      },

      //学位比例
      echarts5(){
        let echarts_5 = this.$echarts.init(document.getElementById("echarts_5"), 'customed');
        let option = {
          /*title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },*/
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: this.teacher_XW_name
          },
          series : [
            {
              name: '学位分布',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.teacher_XW_count,
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
        echarts_5.setOption(option)
      },
      teacher_XW_end_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.teacher_XW_end = val
          vm.teacher_XW_fn(vm.teacher_XW_end )
        }

      },
      teacher_XW_fn(end){
        let vm = this
          //学位比例
        vm.$axios.request("post","staff/teachersDegree",{
          endDate:end,},function(data){
          vm.teacher_XW_name = []
          vm.teacher_XW_count = []
          for(let i = 0;i<data.result.length;i++){
              vm.has_XW_sum += data.result[i].count*1
              vm.teacher_XW_name.push(data.result[i].degree)
              vm.teacher_XW_count.push({name:data.result[i].degree,value:data.result[i].count})
          }
          vm.echarts5()
        },function(err){
          console.log(err);
        })
      },
      //历史教职工人数趋势
      echarts6(){
        let echarts_6 = this.$echarts.init(document.getElementById("echarts_6"), 'customed');
        let option = {
          /*title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },*/
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['年度新增教职工人数']
          },

          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: this.history_name
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: [
            {
              name:'年度新增教职工人数',
              type:'line',
              data:this.history_num,
              markPoint: {
                data: [
                  {name: '周最低', value: 5,type:'max',
                    symbolSize:2,
                    label: {
                      normal: {
                        position: 'top',
                        formatter: '历史最高人数'
                      }
                    }

                  }
                ]
              }
            }
          ]
        };
        echarts_6.setOption(option)
      },
      history_start_time_change(val){
        let vm = this
        if(val == undefined){
          console.log(val)
          return
        }else if(val >this.history_end_time){
          if(this.history_end_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.history_start_time = ''
            return
          }else{
            vm.$message.error('请选择结束时间！');
            vm.history_start_time = val
          }
        }else{
          vm.history_start_time = val
          vm.history_fn(vm.history_start_time,vm.history_end_time,vm.code1)
        }

      },
      history_end_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.history_start_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.history_end_time = ''
          return
        }else {
          if (this.history_start_time == '') {
            this.$message.error('请选择开始时间！');
            return
          } else {
            vm.history_end_time = val
            vm.history_fn(vm.history_start_time, vm.history_end_time, vm.code1)
          }
        }
      },

      //学院
      schoolChange1(val){
        var vm = this
        if(val =='全部'){
          vm.code1 = ''
        }else{
          vm.code1 = val
        }
        this.schoolSelect1 = val
        vm.history_fn(vm.history_start_time,vm.history_end_time,vm.code1)
      },
      history_fn(start,end,school){
        let vm = this
        //历史教职工人数趋势
        vm.$axios.request("post","staff/teachersTrend",{startYear:start,endYear:end,branch:school},function(data){
          vm.history_name = []
          vm.history_num = []
          for(let i = 0;i<data.result.length;i++){
            vm.history_name.push(data.result[i].year)
            vm.history_num.push(data.result[i].count)
          }
          vm.echarts6()
        },function(err){
          console.log(err);
        })
      },

      echarts1_datePicker(val){
        let vm = this

      },
      //教师出国情况分析
      XSGL_init_fn(year,page,size){
        let vm = this
        vm.$axios.request("post","staff/abroadTeacher",{
          year:year,
          page:page,
          pageSize:size},function(data){
          vm.CGtotal_count = parseInt(data.totalCount)
          vm.XSGL_list = []
          for(let i =0;i<data.result.length;i++){
            vm.XSGL_list.push({
              one:data.result[i].xm == 'null'?'未知':data.result[i].xm,
              two:data.result[i].sqdwmc == 'null'?'未知':data.result[i].sqdwmc,
              three:data.result[i].cglb == 'null'?'未知':data.result[i].cglb,
              four:data.result[i].cggj == 'null'?'未知':data.result[i].cggj,
              five:data.result[i].cgsj == 'null'?'未知':data.result[i].cgsj,
              sex:data.result[i].hgsj == 'null'?'未知':data.result[i].hgsj,
            })
          }
        },function(err){
          console.log(err);
        })
      },
      XSGL_time_change(val){
        let vm =this
        if(val == undefined){
          return
        }else{
          vm.XSGL_time = val
          vm.CGpageNum = 1
          vm.XSGL_init_fn(this.XSGL_time,this.CGpageNum,this.CGsize)
        }

      },
      //分页函数
      CGSizeChange(val) {
        var vm = this
        this.CGpageNum = val
        vm.XSGL_init_fn(this.XSGL_time,this.CGpageNum,this.CGsize)
      },
      CGCurrentChange(val) {
        var vm = this
        this.CGpageNum = val
        vm.XSGL_init_fn(this.XSGL_time,this.CGpageNum,this.CGsize)
      },

    },
    mounted () {
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.menu()
      let date =new Date;
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      if(month<10){
        this.now_month = year+''+'-'+'0'+month+''
      }else{
        this.now_month = year + '' + '-' + month + ''
      }
      this.now_year = year +''
    },
    created(){
      window.scrollTo(0,0);
      let vm = this;
      vm.make_time()
      /*获取教师单位下拉菜单*/
      vm.$axios.request("post","staff/branches",{},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.schoolList.push(data.result[i].branch)
          vm.schoolList1.push(data.result[i].branch)
        }
      },function(err){
        console.log(err);
      })
      //教职工人数初始化
      vm.$axios.request("post","staff/teachersList",{
        branch:vm.code,
        year:vm.teacher_time,
        page:vm.pageNum,
        pageSize:vm.size},function(data){
        vm.total_count = parseInt(data.totalCount)
        //当职称等于null的时候就让值等于无
        for(var i=0;i<data.result.length;i++){
          var title = ''
          if(data.result[i].title == 'null'){
            title = '无'
          }else{
            title = data.result[i].title
          }
          vm.tableData.push({
            order: title,
            name: data.result[i].name,
            age: data.result[i].date,
            gender: data.result[i].sex,
            duty: data.result[i].branch,
          })
        }
      },function(err){
        console.log(err);
      })

      //教职工男女比例
      vm.$axios.request("post","staff/teachersSex",{endDate:vm.sex_end_time},function(data){
        for(let i = 0;i<data.result.length;i++){
          vm.sex.push(data.result[i].sex)
          vm.sex_num.push({name:data.result[i].sex,value:data.result[i].count})
        }
        vm.echarts2()
      },function(err){
        console.log(err);
      })

      //教职工年龄比例
      vm.$axios.request("post","staff/teachersAge",{endYear:vm.age_end_time},function(data){
        for(let i = 0;i<data.result.length;i++){
          vm.age.push(data.result[i].age)
          vm.age_num.push(parseInt(data.result[i].count))
        }
        vm.echarts3()
      },function(err){
        console.log(err);
      })

      //职称比例
      vm.title_fn(vm.ZC_end_time)
      //学位比例
      vm.teacher_XW_fn(vm.teacher_XW_end )
      //历史教职工人数趋势
      vm.$axios.request("post","staff/teachersTrend",{startYear:vm.history_start_time,endYear:vm.history_end_time,branch:vm.code1},function(data){
        for(let i = 0;i<data.result.length;i++){
          vm.history_name.push(data.result[i].year)
          vm.history_num.push(data.result[i].count)
        }
        vm.echarts6()
      },function(err){
        console.log(err);
      })
      vm.XSGL_init_fn(this.XSGL_time,this.CGpageNum,this.CGsize)
    }
  }
</script>
<style lang="scss">
  .by_body_table {
    border: 0;
    td {
      border-bottom: 1px solid #2e2e30;
    }
    &::before {
      height: 0;
    }
    &::after {
      width: 0;
    }
  }

  /*.by_body_el_input {
    >.el-input__inner {
      background-color: #1f2024;
      color: #a2a3ab;
    }
  }

  .by_body_table th {
    background-color: #252629;
    border: 0;
    &.is-leaf {
      border-bottom: 1px solid #2e2e30;
    }
    .by_body_label {
      background-color: #252629;
      color: #a2a3ab;
      text-align: center;
    }
  }

  .by_body_row {
    background-color: #1f2024;
    color: #a2a3ab;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #252629;
  }*/

  .by_body_add {
    padding: 30px 50px;
    background-color: #1f2024;
    .el-dialog__header {
      text-align: center;
      .el-dialog__title {
        color: #04aec7;
      }
    }
    .form_bottom{
      text-align: center;
      .el-form-item__content{
        margin: 0 !important;
      }
    }
    .el-checkbox+.el-checkbox{
      margin-left: 0;
    }
    .el-checkbox{
      margin-right: 15px;
    }
  }

</style>

