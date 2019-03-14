<template>
  <div class="w">
    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo"
             style="width: 36px; position: fixed;top: 300px; right:0;z-index: 10000;"
             theme="dark"
             :collapse="isCollapse">
      <a href="javascript:;"  @click="mao(40)">
        <el-menu-item index="1">
          <img src="../../assets/img/student_1.png" height="20" width="20" alt="">
          <span slot="title">
          <a href="javascript:;"  @click="mao(40)" style="color: white;font-size: 14px">师资团队分析</a>
          </span>
        </el-menu-item>
      </a>
      <a href="javascript:;"  @click="mao(300)">
        <el-menu-item index="3">
          <img src="../../assets/img/student_03.png" height="25" width="25" alt="">
          <span slot="title">
          <a href="javascript:;" @click="mao(300)" style="color: white;font-size: 14px">学生基本情况分析</a>
        </span>
        </el-menu-item>
      </a>
      <a href="javascript:;" @click="mao(800)">
        <el-menu-item index="4">
          <img src="../../assets/img/student_04.png" height="23" width="23" alt="">
          <span slot="title">
            <a href="javascript:;" @click="mao(800)" style="color: white;font-size: 14px">学院资产详情</a>
          </span>
        </el-menu-item>
      </a>
      <a href="javascript:;" @click="mao(900)">
        <el-menu-item index="5">
          <img src="../../assets/img/student_05.png" height="25" width="25" alt="">
          <span slot="title">
            <a href="javascript:;" @click="mao(900)" style="color: white;font-size: 14px">监测办学指标分析</a>
          </span>
        </el-menu-item>
      </a>
    </el-menu>
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/school' }">北语校情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg"  v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5" id="top1">
          师资团队分析
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="teachingTeam_time"
              type="year"
              format="yyyy"
              @change="teachingTeam_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <el-col :span="8">
          <div class="ec_height" id="echarts_1">
          </div>
        </el-col>
        <el-col :span="8">
          <div class="ec_height" id="echarts_2">
          </div>
        </el-col>
        <el-col :span="8">
          <div class="ec_height" id="echarts_3">
          </div>
        </el-col>
        <!--<el-col :span="6">
          <div class="ec_height" id="echarts_4">
          </div>
        </el-col>-->
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5" id="top2">
          学生基本情况分析 &nbsp;&nbsp;&nbsp;&nbsp;单位(人)
          <div class="ec_h5_data">
            <el-button size="mini" @click="skip('student_TJ')">分析</el-button>
          </div>
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="echarts8_start_time"
              type="year"
              format="yyyy"
              @change="echarts8_start_time_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="echarts8_end_time"
              type="year"
              format="yyyy"
              @change="echarts8_end_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="echarts_8">
        </div>
      </el-col>
    </el-row>

    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5">
          办学软实力分析
          <div class="ec_h5_data" style="width: 55%">
            <el-radio-group v-model="student_type" @change="student_change" size="small" style="margin: 0 auto">
              <el-radio-button label="本科生"></el-radio-button>
              <el-radio-button label="研究生"></el-radio-button>
              <el-radio-button label="留学生"></el-radio-button>
            </el-radio-group>
            <el-button size="mini" @click="skip('teacher_RSL')">分析</el-button>
          </div>
        </h5>
        <el-col :span="12">
          <div style="height:600px;" id="echarts_6">
          </div>
        </el-col>
        <el-col :span="11">
          <div class="grid-content bg-purple-dark" style="margin-top: 20px;">
            <template>
              <el-table
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="student_table"
                height="550"
                style="width: 100%;overflow: auto"
                :border=false>
                <el-table-column prop="name" label="专业名称" align="center">
                </el-table-column>
                <el-table-column prop="girl" label="女生人数" align="center">
                </el-table-column>
                <el-table-column prop="boy" label="男生人数" align="center">
                </el-table-column>
                <el-table-column prop="sum" label="总人数" align="center">
                </el-table-column>

              </el-table>
            </template>
          </div>
        </el-col>
      </el-col>
    </el-row>-->

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" v-loading.body="loading_ZCXQ" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5" id="top3">
          学院资产详情&nbsp;&nbsp;&nbsp;&nbsp;单位(万元)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="teach_start_time"
              type="year"
              format="yyyy"
              @change="teach_start_time_change"
              placeholder="开始时间">
            </el-date-picker>
            至
            <el-date-picker
              style="margin-right: 10px"
              class="select_width"
              size="mini"
              v-model="teach_end_time"
              type="year"
              format="yyyy"
              @change="teach_end_time_change"
              placeholder="结束时间">
            </el-date-picker>

            <el-button size="mini" @click="skip('teacher_ZB')">分析</el-button>
          </div>
        </h5>
        <div class="ec_height" id="echarts_9">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24"  class="ec_bg">
        <h5 class="ec_h5" id="top4">
          监测办学指标分析({{look_school}}年)
          <!--<div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="look_school"
              type="year"
              format="yyyy"
              @change="look_school_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>-->
        </h5>
        <div class="tab_warPer" style="margin-bottom: 50px">
          <table v-for="list in listData" class="table table_ten" style="width: 13%">
            <tr>
              <td class="black">{{list.name}}</td>
            </tr>
            <tr>
              <td>
                {{list.value}}
              </td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" v-loading.body="loading_KYRY" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5">
          科研人员&nbsp;&nbsp;单位(人)
          <div class="ec_h5_data">
            <el-button size="mini" @click="skip('teacher_RSL')">分析</el-button>
          </div>
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="three_time"
              type="year"
              format="yyyy"
              @change="three_time_change"
              placeholder="选择时间">
            </el-date-picker>
            <el-select v-model="KYRY_Select"  class="select_width" size="mini" @change="KYRY_Select_Change">
              <el-option
                v-for="item in KYRY_List"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </h5>
        <div class="ec_height" id="KYRY">
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
        loading:true,
        isCollapse: true,
        teachingTeam_time:'2017',
        echarts8_start_time:'2008',
        echarts8_end_time:'2017',
        student_date:[],
        BKS_count:[],
        LXS_count:[],
        YJS_count:[],
        //echarts数据
        teacher_num:'',
        yJ_num:'',
        height_num:'',
        student_house:'',
        school_house:'',
        //教学科研仪器分析
        loading_ZCXQ:true,
        teach_start_time:'2010',
        teach_end_time:'2017',
        teach_year:[],
        teach_money:[],

        //检测办学指标
        look_school:'2017',
        listData:[],
        //权限数组
        jurisdiction:[],

       /* student_type:'本科生',
        student_table:[],
        student_type_data:[],
        link_data:[]*/
        loading_KYRY:true,
        three_time:'2017',
        KYRY_Select:'单位',
        KYRY_List:['单位','学位','职称'],
        KYRY_code:'1',
        KYRY_name:[],
        KYRY_count:[],
      }
    },
    methods:{
      mao(selector){
        window.scrollTo(0,selector );
      },
      make_time(){
        let vm = this
        vm.teachingTeam_time = time.year
        vm.echarts8_start_time = time.year - 10 + ''
        vm.echarts8_end_time = time.year
        vm.teach_start_time = time.year - 10 + ''
        vm.teach_end_time = time.year
        vm.look_school = time.year
        vm.three_time = time.year
      },
      //跳转函数，添加路由
      skip(link) {
        switch (link) {
          case 'teach_TJ':
            this.$router.push('school/teacher_TJ')
            break;
          case 'teacher_ZB':
            for(let i=0;i<this.jurisdiction.length;i++){
              if(this.jurisdiction[i] == 'teacher_ZB'){
                this.$store.commit('change_active','3-7')
                this.$router.push('school/teacher_ZB')
                return
              }
            }
            this.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
            break;
          case 'teacher_RSL':
            for(let i=0;i<this.jurisdiction.length;i++){
              if(this.jurisdiction[i] == 'teacher_RSL'){
                this.$store.commit('change_active','3-6')
                this.$router.push('school/teacher_RSL')
                return
              }
            }
            this.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
            break;
          case 'student_TJ':
            for(let i=0;i<this.jurisdiction.length;i++){
              if(this.jurisdiction[i] == 'student_TJ'){
                this.$store.commit('change_active','3-5')
                this.$router.push('school/student_TJ')
                return
              }
            }
            this.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
            break;

        }
      },

      //师资团队echarts函数
      echarts1(){
        let vm = this;
        let echarts_1 = this.$echarts.init(document.getElementById("echarts_1"));
        let option = {
          color:['#B73349'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: ['教职工人数'],
            textStyle: {
              color: '#B73349',
            }
          },
          series: [{
            name: '教职工人数',
            type: 'pie',
            radius: ['50%', '60%'],
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: vm.teacher_num,
              name: '教职工人数',
              label: {
                normal: {
                  formatter: "{b} : {c}人",
                  textStyle: {
                    fontSize: 14
                  },
                  color:'#B73349'
                }
              },
              itemStyle:{
                normal:{color:'#B73349'}
              }
            }]
          }]
        };
        echarts_1.setOption(option)
        echarts_1.on("click",function (param) {
          for(let i=0;i<vm.jurisdiction.length;i++){
            if(vm.jurisdiction[i] == 'teacher_num'){
              vm.$router.push({path:'/home/school/teacher'})
              vm.$store.commit('change_active','3-2')
              return
            }
          }
          vm.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');

        })
        vm.$nextTick(function() {
          vm.loading = false;
        })
      },
      echarts2(){
        var vm = this
        let echarts_2 = this.$echarts.init(document.getElementById("echarts_2"));
        let option = {
          title: {
            text: '(提示:在记录统计人数)',
            textStyle: {
              fontSize: 12,
              color:'red'
            },
            left:'60%',
            top:'10%'
          },
          color:['#0B85B7'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: ['外聘教师人数'],
            textStyle: {
              color: '#0B85B7',
            }
          },
          series: [{
            name: '外聘教师人数',
            type: 'pie',
            radius: ['50%', '60%'],
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              color:'#0B85B7',
              value: this.yJ_num,
              name: '外聘教师人数',
              label: {
                normal: {
                  formatter: "{b} : {c}人",
                  textStyle: {
                    fontSize: 14
                  },
                  color:'#0B85B7'
                }
              },
              itemStyle:{
                normal:{color:'#0B85B7'}
              }
            }]
          }]
        };
        echarts_2.setOption(option)
        echarts_2.on("click",function (param) {
          for(let i=0;i<vm.jurisdiction.length;i++){
            if(vm.jurisdiction[i] == 'out_num'){
              vm.$router.push({path:'/home/school/goreignTeacher'})
              vm.$store.commit('change_active','3-3')
              return
            }
          }
          vm.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
        })
        vm.$nextTick(function() {
          vm.loading = false;
        })
      },
      echarts3(){
        let vm = this;
        let echarts_3 = this.$echarts.init(document.getElementById("echarts_3"));
        let option = {
          color:['#6AB73A'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: [' 教授及副教授人数'],
            textStyle: {
              color: '#6AB73A',
            }
          },
          series: [{
            name: ' 教授及副教授人数',
            type: 'pie',
            radius: ['50%', '60%'],
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              color:'#6AB73A',
              value: vm.height_num,
              name: ' 教授及副教授人数',
              label: {
                normal: {
                  formatter: "{b} : {c}人",
                  textStyle: {
                    fontSize: 14
                  },
                  color:'#6AB73A'
                }
              },
              itemStyle:{
                normal:{color:'#6AB73A'}
              }
            }]
          }]
        };
        echarts_3.setOption(option)
        echarts_3.on("click",function (param) {
          for(let i=0;i<vm.jurisdiction.length;i++){
            if(vm.jurisdiction[i] == 'height_num'){
              vm.$router.push({path:'/home/school/heightPeople'})
              vm.$store.commit('change_active','3-4')
              return
            }
          }
          vm.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
        })
        vm.$nextTick(function() {
          vm.loading = false;
        })
      },
      //师资团队趋势时间时的函数
      teachingTeam_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.teachingTeam_time = val
          //教师人数初始化
          vm.$axios.request("post","staff/teachersCount",{flag:'0',year:vm.teachingTeam_time},function(data){
            for(var i = 0; i<data.result.length;i++){
              vm.teacher_num = data.result[i].count
            }
            vm.echarts1()
          },function(err){
            console.log(err);
          })
          //高层人数初始化
          vm.$axios.request("post","topTeacher/topTeachersCount",{flag:'0',year:vm.teachingTeam_time},function(data){
            for(var i = 0; i<data.result.length;i++){
              vm.height_num = data.result[i].count
            }
            vm.echarts3()
          },function(err){
            console.log(err);
          })
          //外聘教师人数初始化
          vm.$axios.request("post","externalTeachers/teacherSum",{flag:'0',year:vm.teachingTeam_time},function(data){
            for(var i = 0; i<data.results.length;i++){
              vm.yJ_num = data.results[i].count
            }
            vm.echarts2()
          },function(err){
            console.log(err);
          })
        }


      },


      /*//本科生，留学生，研究生 与专业关系图。
      echarts6(){
        let vm = this;
        let echarts_6 = this.$echarts.init(document.getElementById("echarts_6"));
        let option = {
          tooltip: {},
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 12
              },
            }
          },
          series: [
            {
              type: 'graph',
              layout: 'force',
              symbolSize: 15,
              focusNodeAdjacency: true,
              roam: false,
              draggable : false,
              categories: [{
                name: '本科生专业',
                itemStyle: {
                  normal: {
                    color: "#10AEFF",
                  }
                }
              }],
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 12
                  },
                  position: 'top',
                }
              },
              force: {
                repulsion: 400
              },
              edgeSymbolSize: [4, 50],
              data: vm.student_type_data,
              links: vm.link_data,
              lineStyle: {
                normal: {
                  opacity: 0.3,
                  width: 1,
                  curveness: 0
                }
              }
            }
          ]
        };
        echarts_6.setOption(option)
      },
      //点击不同学生 本科生 留学生 研究生 显示不同数据
      student_change(val){
        if(val =='本科生'){
          this.student_type_init('1')
          this.student_type_list('1')
        }else if(val =='研究生'){
          this.student_type_init('2')
          this.student_type_list('2')
        }else{
          this.student_type_init('3')
          this.student_type_list('3')
        }
      },
      student_type_init(flag){
        let vm = this
        vm.$axios.request("post","StudentAnalyze/specialtys",{flag:flag},function(data){
          vm.student_type_data = []
          vm.link_data = []
          vm.student_type_data.push({name:vm.student_type + data.result.length+'个专业',symbolSize: 30,})
          for(let i = 0;i<data.result.length;i++){
            vm.student_type_data.push({name:data.result[i].zymc,category: 0,})
            vm.link_data.push({
              source: 0,
              target: i+1,
            })
          }
          vm.echarts6()
        },function(err){
          console.log(err);
        })
      },
      student_type_list(flag){
        let vm = this
        vm.$axios.request("post","softPower/specialtySexCount",{flag:flag},function(data){
          vm.student_table = []
          console.log(data)
          for(let i=0;i<data.result.length;i++){
            vm.student_table.push({
              name:data.result[i].specialty,
              girl:data.result[i].gcount == null?0:data.result[i].gcount,
              boy:data.result[i].bcount == null?0:data.result[i].bcount,
              sum:data.result[i].gcount *1 + data.result[i].bcount*1
            })
          }
        },function(err){
          console.log(err);
        })
      },*/


      //学生基本条件分析
      echarts8(){
        let echarts_8 = this.$echarts.init(document.getElementById("echarts_8"), 'customed');
        let option = {
          title: {
            text: '招生人数',
            textStyle: {
              fontSize: 12,
            },
            left: 30,
            top: 10
          },
          /*title: {
            text: '单位(万元)',
            textStyle: {
              fontSize: 12,
            },
            padding: [0, 50]
          },*/
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
            data: ['本科生','研究生','留学生']
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
            data: this.student_date
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '本科生',
            type: 'line',
            stack: '总量1',
            data: this.BKS_count
          },
          {
            name: '研究生',
            type: 'line',
            stack: '总量3',
            data: this.YJS_count
          },
          {
            name: '留学生',
            type: 'line',
            stack: '总量2',
            data: this.LXS_count
          },
          ],
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'black'
              }
            }
          }
        };
        echarts_8.setOption(option)
      },
      //学生基本条件选择时间函数
      echarts8_start_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.echarts8_end_time){
          if(this.echarts8_end_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.echarts8_start_time = ''
            return
          }else{
            this.$message.error('请选择结束时间！');
            vm.echarts8_start_time = val
          }
        }else{
          vm.echarts8_start_time = val
          vm.student_fn(vm.echarts8_start_time,vm.echarts8_end_time)
        }

      },
      echarts8_end_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.echarts8_start_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.echarts8_end_time = ''
          return
        }else {
          if (this.echarts8_start_time == '') {
            this.$message.error('请选择开始时间！');
            return
          } else {
            vm.echarts8_end_time = val
            vm.student_fn(vm.echarts8_start_time, vm.echarts8_end_time)
          }
        }

      },
      student_fn(start,end){
        let vm = this
        //学生基本条件分析
        vm.$axios.request("post","StudentAnalyze/studentCondition",{
          startYear:start,
          endYear:end},function(data){
          vm.student_date = []
          vm.BKS_count = []
          vm.LXS_count = []
          vm.YJS_count = []
          for(let i=0;i<data.foreinList.length;i++){
            vm.student_date.push(data.foreinList[i].year)
            vm.BKS_count.push(data.foreinList[i].count)
          }
          for(let j=0;j<data.localList.length;j++){
            vm.LXS_count.push(data.localList[j].count)
          }
          for(let k=0;k<data.graduateList.length;k++){
            vm.YJS_count.push(data.graduateList[k].count)
          }
          vm.echarts8()
        },function(err){
          console.log(err);
        })
      },

      //基本办学指标分析
      //教学仪器相关函数（第一个图）
      echarts9(){
        let echarts_9 = this.$echarts.init(document.getElementById("echarts_9"), 'customed');
        let option = {
          /*title: {
            text: '单位(万元)',
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
            data:['科研仪器价值']
          },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: this.teach_year
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: [
            {
              name:'科研仪器价值',
              type:'line',
              data:this.teach_money,
              markPoint: {
                data: [
                  {name: '周最低', value: 5,type:'max',
                    symbolSize:2,
                    label: {
                      normal: {
                        position: 'right',
                        formatter: '历史最高'
                      }
                    }

                  }
                ]
              }
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
          }
        };
        echarts_9.setOption(option)
      },
      teach_start_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.teach_end_time){
          if(this.teach_end_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.teach_start_time = ''
            return
          }else{
              this.$message.error('请选择结束时间！');
            vm.teach_start_time = val
          }
        }else{
          vm.teach_start_time = val
          vm.loading_ZCXQ = true
          vm.teach_fn(vm.teach_start_time,vm.teach_end_time)
        }

      },//选择开始和结束时间
      teach_end_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.teach_start_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.teach_end_time = ''
          return
        }else{
          if (this.teach_start_time == '') {
            this.$message.error('请选择开始时间！');
            return
          } else {
            vm.loading_ZCXQ = true
            vm.teach_end_time = val
            vm.teach_fn(vm.teach_start_time, vm.teach_end_time)
          }
        }

      },
      teach_fn(start,end){
        let vm = this
        //教学科研仪器分析
        vm.$axios.request("post","basicEducationalStandard/instrumentAnalyze",{
          startYear:start,endYear:end
        },function(data){
          vm.teach_year = []
          vm.teach_money = []
          for(let i = 0;i<data.result.length;i++){
            vm.teach_year.push(data.result[i].year)
            vm.teach_money.push(data.result[i].count)
          }
          vm.loading_ZCXQ = false
          vm.echarts9()
        },function(err){
          console.log(err);
        })
      },
      //检测办学指标
      look_school_change(val){},
      look_school_init(){
        let vm = this
        vm.$axios.request("post","BYAnalyze/check",{},function(data){
          console.log(data.result[0].value1)
          vm.listData.push({
            name:'生均占地面积',
            value:data.result[0].value1
          },{
            name:'生均宿舍面积',
            value:data.result[0].value2
          },{
            name:'专任教师',
            value:data.result[0].value3
          }/*,{
            name:'百名学生计算机台数',
            value:data.result[0].value4
          }*/,{
            name:'百名学生多媒体',
            value:data.result[0].value5
          },{
            name:'教学科研仪器总值',
            value:data.result[0].value6
          },{
            name:'生均图书',
            value:data.result[0].value7
          }/*,{
            name:'生均年进书量',
            value:data.result[0].value8
          }*/,{
            name:'研究生教师占专任教师',
            value:data.result[0].value9
          },)
        },function(err){
          console.log(err);
        })
      },



      KYRY_fn(){
        let vm = this
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: '40px',
            top: 'center',
            data: this.KYRY_name
          },
          series : [
            {
              name: '科研成果人员分类',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.KYRY_count,
              label: {
                normal: {
                  show: true,
                  formatter: '{b} : {c}'
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
        this.KYRY.setOption(option)
      },
      three_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.three_time = val
          vm.loading_KYRY = true
          vm.three_init_fn(vm.three_time,vm.KYRY_code)
        }
      },
      KYRY_Select_Change(val){
        let vm = this
        vm.KYRY_Select = val
        if(val == '单位'){
          vm.KYRY_code = '1'
        }else if(val == '学位'){
          vm.KYRY_code = '2'
        }else{
          vm.KYRY_code = '3'
        }
        vm.loading_KYRY = true+7
        vm.three_init_fn(vm.three_time,vm.KYRY_code)
      },
      three_init_fn(year,code){
        let vm = this
        vm.$axios.request("post","scientific/scientificUnit",{year:year,flag:code},function(data){
          vm.KYRY_name = []
          vm.KYRY_count = []
          for(let i = 0;i<data.result.length;i++){
            vm.KYRY_name.push(data.result[i].name)
            vm.KYRY_count.push({name:data.result[i].name,value:data.result[i].count})
          }
          vm.loading_KYRY = false
          vm.KYRY_fn()
        },function(err){
          console.log(err);
        })
      },
    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.KYRY = this.$echarts.init(document.getElementById("KYRY"), 'customed');
    },
    created(){
      window.scrollTo(0,0);
      let vm = this;
      vm.make_time()
      vm.look_school_init()
      /*vm.student_type_init('1')
      vm.student_type_list('1') */
      //教师人数初始化
      vm.$axios.request("post","staff/teachersCount",{flag:'0',year:vm.teachingTeam_time},function(data){
        for(var i = 0; i<data.result.length;i++){
          vm.teacher_num = data.result[i].count
        }
        vm.echarts1()
      },function(err){
        console.log(err);
      })

      //外聘教师人数初始化
      vm.$axios.request("post","externalTeachers/teacherSum",{flag:'0',year:vm.teachingTeam_time},function(data){
        for(var i = 0; i<data.results.length;i++){
          vm.yJ_num = data.results[i].count
        }
        vm.echarts2()
      },function(err){
        console.log(err);
      })
      //高层人数初始化
      vm.$axios.request("post","topTeacher/topTeachersCount",{flag:'0',year:vm.teachingTeam_time},function(data){
        for(var i = 0; i<data.result.length;i++){
          vm.height_num = data.result[i].count
        }
        vm.echarts3()
      },function(err){
        console.log(err);
      })


      //学生基本条件分析
      vm.student_fn(vm.echarts8_start_time,vm.echarts8_end_time)

      //教学科研仪器分析
      vm.teach_fn(vm.teach_start_time,vm.teach_end_time)

      //从浏览器session里边获取权限
      let jurisdiction = sessionStorage.getItem("jurisdiction")
      vm.jurisdiction = jurisdiction.split(",");

      vm.three_init_fn(vm.three_time,vm.KYRY_code)
    }
  }
</script>

<style>

</style>
