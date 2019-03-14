<template>
  <div class="w student">

    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo"
             style="width: 36px; position: fixed;top: 100px; right:0;z-index: 10000;"
             theme="dark"
             :collapse="isCollapse">
      <a href="javascript:;" @click="mao(40)">
        <el-menu-item index="1">
          <img src="../../assets/img/student_09.png" height="25" width="25" alt="">
          <span slot="title"><a style="color: white;font-size: 14px" href="javascript:;"  @click="mao(40)">历年留学生报到人数</a></span>
        </el-menu-item>
      </a>
      <a href="javascript:;" @click="mao(450)">
        <el-menu-item index="2">
          <img src="../../assets/img/student_1.png" height="20" width="20" alt="">
          <span slot="title">
          <a href="javascript:;"  @click="mao(450)" style="color: white;font-size: 14px">留学生生源分布</a>
        </span>
        </el-menu-item>
      </a>
      <a href="javascript:;" @click="mao(450)">
        <el-menu-item index="3">
          <img src="../../assets/img/student_02.png" height="26" width="26" alt="">
          <span slot="title">
          <a style="color: white;font-size: 14px" href="javascript:;" @click="mao(450)">TOP10</a>
        </span>
        </el-menu-item>
      </a>
      <a href="javascript:;" @click="mao(950)">
        <el-menu-item index="4">
          <img src="../../assets/img/student_03.png" height="25" width="25" alt="">
          <span slot="title">
          <a style="color: white;font-size: 14px" href="javascript:;" @click="mao(950)">留学生洲际分布</a>
        </span>
        </el-menu-item>
      </a>
      <a href="javascript:;" @click="mao(950)">
        <el-menu-item index="5">
          <img src="../../assets/img/student_04.png" height="23" width="23" alt="">
          <span slot="title"><a style="color: white;font-size: 14px" href="javascript:;" @click="mao(950)">留学生男女比例</a></span>
        </el-menu-item>
      </a>
      <a href="javascript:;" @click="mao(1450)">
        <el-menu-item index="6">
          <img src="../../assets/img/student_05.png" height="25" width="25" alt="">
          <span slot="title"><a style="color: white;font-size: 14px" href="javascript:;" @click="mao(1450)">高校留学生招生分析</a></span>
        </el-menu-item>
      </a>
      <a href="javascript:;" @click="mao(1850)">
        <el-menu-item index="7">
          <img src="../../assets/img/student_03.png" height="25" width="25" alt="">
          <span slot="title"><a style="color: white;font-size: 14px" href="javascript:;" @click="mao(1850)">留学生专业人数分析</a></span>
        </el-menu-item>
      </a>
      <a href="javascript:;" @click="mao(2450)">
        <el-menu-item index="8">
          <img src="../../assets/img/student_10.png" height="25" width="25" alt="">
          <span slot="title"><a style="color: white;font-size: 14px" href="javascript:;" @click="mao(2450)">历年招生报名人数与实际入学人数对比图</a></span>
        </el-menu-item>
      </a>
    </el-menu>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5">
          <img src="../../assets/img/student_09.png" height="25" width="25" alt="">
          历年留学生报到人数
          <el-button size="mini" v-show="history_flag" @click="back_data">返回历史人数</el-button>
        </h5>
        <div class="ec_height" id="overseasStudent">
        </div>
      </el-col>
    </el-row>
    <el-row class="student_select"  style="margin-top: -5px;">
      <el-col :span="3">
        <div class="grid-content bg-purple-dark">
          <template>
            <el-date-picker
              size="small"
              v-model="select_year"
              type="year"
              format="yyyy"
              @change="year_change"
              placeholder="请选择年份">
            </el-date-picker>
          </template>
        </div>
      </el-col>
      <el-col :span="5" :offset="1">
        <div class="grid-content bg-purple-dark">
          <el-input
            style="width: 230px"
            size="small"
            v-model="input"
            placeholder="请正确输入想查询的国家名称"
            icon="search"
            :on-icon-click="handleIconClick">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row class="student_item">
      <el-col :span="24">
        <ul class="student_item_ul">
          <li v-for="item in sourceData.areaListBarC">
            <router-link :to="{path:'student/source',query: {name: item,time:select_year}}">{{item}}</router-link>
          </li>
          <!--<li>
            <router-link :to="{path:'student/OneAndOne'}" class="ydyl">一带一路国家</router-link>
          </li>-->
        </ul>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg_left"
              v-loading.body="loading"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading">
        <h5 class="ec_h5">
          <img src="../../assets/img/student_1.png" height="26" width="26" alt="">
          {{show_year}}年留学生生源分布
        </h5>
        <div class="ec_height" id="studentDistribute"></div>
      </el-col>
      <el-col :span="12" class="ec_bg_right" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5">
          <img src="../../assets/img/student_02.png" height="26" width="26" alt="">
          {{show_year}}年留学生TOP10
        </h5>
        <div class="ec_height" id="studentTop10">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg_left" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5">
          <img src="../../assets/img/student_03.png" height="25" width="25" alt="">留学生洲际分布
          <div class="ec_h5_data">
              <el-date-picker
                size="mini"
                class="select_width"
                v-model="distribute_start"
                type="month"
                format="yyyy-MM"
                @change="distribute_change_start"
                placeholder="开始时间">
               </el-date-picker>
              至
               <el-date-picker
                size="mini"
                class="select_width"
                @change="distribute_change_end"
                format="yyyy-MM"
                v-model="distribute_end"
                type="month"
                placeholder="结束时间">
               </el-date-picker>
         </div>
        </h5>
        <div class="ec_height" id="distribute">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg_right" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5"><img src="../../assets/img/student_04.png" height="23" width="23" alt="">留学生男女比例
         <div class="ec_h5_data">
            <div>
               <el-date-picker
                size="mini"
                v-model="people_start"
                class="select_width"
                format="yyyy-MM"
                @change="people_change_start"
                type="month"
                placeholder="选择日期范围">
              </el-date-picker>
              至
              <el-date-picker
                size="mini"
                v-model="people_end"
                @change="people_change_end"
                class="select_width"
                format="yyyy-MM"
                type="month"
                placeholder="选择日期范围">
              </el-date-picker>
            </div>
         </div>
        </h5>
        <div class="ec_height" id="peopleScale">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5">
          <img src="../../assets/img/student_05.png" height="25" width="25" alt="">高校留学生招生分析
          <el-button size="mini" @click="skip('browse')">分析</el-button>
        </h5>
        <div class="ec_height" id="browse">
        </div>
      </el-col>
    </el-row>
    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5">
          <img src="../../assets/img/student_06.png" height="25" width="25" alt="">生源地新闻动态
            <el-button size="mini" @click="skip('source')">分析</el-button>
            <div class="ec_h5_data">
                 <el-date-picker
                    align="right"
                    size='mini'
                    format="yyyy"
                    class="select_width"
                    @change="source_change_year"
                    v-model="origin_student"
                    type="year"
                    placeholder="选择年">
                 </el-date-picker>
            </div>
        </h5>
        <div class="ec_height" id="source">
        </div>
      </el-col>
    </el-row>-->
    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5"><img src="../../assets/img/student_07.png" height="25" width="25" alt="">500强企业
      <el-button size="mini" @click="skip('T500')">分析</el-button>
        </h5>
        <div class="ec_height" id="T500">
        </div>
      </el-col>
    </el-row>-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5">
          <img src="../../assets/img/student_07.png" height="25" width="25" alt="">
          留学生专业人数分析
          <el-button size="mini" @click="skip('majorDetails')">分析</el-button>
          <el-select v-model="majorSelect" placeholder="请选择" size="mini" class="major-select" @change="majorChange">
            <el-option
              v-for="item in majorList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy"
              @change="major_change_year_S"
              v-model="major_S_data"
              type="year"
              placeholder="选择开始年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy"
              @change="major_change_year_N"
              v-model="major_N_data"
              type="year"
              placeholder="选择结束年">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="major">
        </div>
      </el-col>
      <!--<el-col :span="8" class="ec_bg_right">
        <h5 class="ec_h5"><img src="../../assets/img/student_07.png" height="25" width="25" alt="">热门话题</h5>
        <div class="ec_height" id="wordCloud">
        </div>
      </el-col>-->
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5"><img src="../../assets/img/student_10.png" height="25" width="25" alt="">
          历年招生报名人数与实际入学人数对比图 &nbsp;&nbsp;&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data">
            <el-date-picker
              size="mini"
              v-model="history_data"
              class="select_width"
              type="year"
              format="yyyy"
              @change="historyStudent_change"
              placeholder="选择年">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="historyStudent">
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :title='go_time_title'
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div id="policy">
        <el-table
          v-loading="loading_list"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :data="listData"
          style="width: 100%">
          <el-table-column prop="name" align="center" label="姓名" class-name="elTableName">
          </el-table-column>
          <el-table-column prop="sex" align="center" label="性别" class-name="elTableName">
          </el-table-column>
          <el-table-column prop="age" align="center" label="年龄" class-name="elTableName">
          </el-table-column>
          <el-table-column prop="phone" align="center" label="电话" class-name="elTableName">
          </el-table-column>
          <el-table-column prop="country" align="center" label="国家" class-name="elTableName">
          </el-table-column>
          <el-table-column prop="major" align="center" label="专业" class-name="elTableName">
          </el-table-column>
          <el-table-column prop="start" align="center" label="开课日期" class-name="elTableName">
          </el-table-column>
          <el-table-column prop="end" align="center" label="结业日期" class-name="elTableName">
          </el-table-column>
          <el-table-column prop="mail" align="center" label="邮箱" class-name="elTableName">
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
      <span slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="out_date">导出数据</el-button>
        <el-button type="primary" @click="close_list_btn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>

.student_select {
  margin-top: 20px;
  padding-top: 20px;
  //background-color: #1f2024;
  background-color: rgba(31, 32, 36, 0.7);
  padding-left: 30px;
}

.student_item {
  //padding-bottom: 20px;
}


.student_item_ul {
  background-color: rgba(31, 32, 36, 0.7);
  //background-color: #1f2024;
  height: 40px;
  padding: 0 15px;
  li {
    float: left;
    line-height: 40px;
    margin: 0 13px;
    a {
      color: #a2a3ab;
    }
    a:hover{
      color: red;
    }
    .ydyl{
      font-size: 18px;
      color: #fff;
    }
  }
}

.el-table .elTableName{
  border:none;
}


</style>

<script>
require('echarts/map/js/world.js');
var echarts = require('echarts');
require('echarts-wordcloud');
import ecartsData from "../../config/echartsData.js"
import nameMap from "../../config/worldDate.js"
import time from "../../config/timeFormat.js"
import { formatDate } from "../../config/formatDate.js"
export default {
  data() {
    return {
      history_flag :false,
      value9:'',
      listData: [],
      out_data:[],
      isCollapse: true,
      select_year:'2017',
      show_year:'2017',
      loading: true,
      origin_student: '',
      distribute_start: '',
      distribute_end: '',
      people_start: '',
      people_end: '',
      major_S_data: '2007',
      major_N_data:'2017',
      history_data: '',
      input: "",
      majorSelect: '',
      value: "",
      majorList: [],
      sourceData: {
        mapData:[],
        areaList: [],
        areaListBarY: [],
        areaListBarS: [],
        areaListBarC: [],
        stateList: [],
        peopleScale: [],
        T500List: { name: [], val: [] },
        historyContrast: { signedList: [], recruitList: [],chazhiList:[], month: [] },
        overseasStudent: {},
        major_obj: { month: [], count: [] ,count1:[]},
        browseObj: { contry_count: [], conut: [], name: [] },
        testList:[],
      },
      go_time:'',
      go_time_title:'',
      dialogVisible: false,
      pageNum:1,
      size:8,
      total_count:0,
      loading_list:true,
      S_flag:'',
      jurisdiction:[],
    }
  },
  methods: {
    mao(selector){
      window.scrollTo(0,selector );
    },
    open4() {
      this.$message.error('输入的国家有误，请重新输入');
    },

    menu() {
      window.scrollTo(0,0);
    },
    //历史留学生报到人数历史人数
    back_data(){
      var vm = this
      vm.history_flag = false
      vm.$axios.request("post", "/recruit/overYearsCountDocumentarily", {}, function(data) {
        vm.sourceData.overseasStudent.year = [];
        vm.sourceData.overseasStudent.count = [];
        for (let i = 0; i < data.result.length; i++) {
          vm.sourceData.overseasStudent.year.push(parseInt(data.result[i].year));
          vm.sourceData.overseasStudent.count.push(parseInt(data.result[i].count));
        }
        //console.log(vm.sourceData.overseasStudent);
        vm.overseasStudent(vm.sourceData.overseasStudent);
      }, function(err) {
        console.log(err);
      })
    },
    overseasStudent(data) {
      var vm = this
      let chart = this.$echarts.init(document.getElementById('overseasStudent'), 'customed');
      let option = {
        title: {
          text: '点击折点查看月度信息',
          textStyle: {
            fontSize: 12,
            color:'red'
          },
          left:'85%',
          top:'5%'
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
          data: data.year,
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          type: 'line',
          stack: '总量',
          data: data.count,
          label:{
            normal:{
              show:true
            }
          },
        }, ]
      };
      chart.on('click',function(params){
        //历年留学生报到人数
        var time = params.name
        if(parseInt(time)<2000){
          return
        }else{
          vm.history_flag = true
          vm.$axios.request("post", "/recruit/overYearsCountDocumentarily", {year:time}, function(data) {

            vm.sourceData.overseasStudent.year = [];
            vm.sourceData.overseasStudent.count = [];
            for (let i = 0; i < data.result.length; i++) {
              vm.sourceData.overseasStudent.year.push(parseInt(data.result[i].month) + '月');
              vm.sourceData.overseasStudent.count.push(parseInt(data.result[i].count));
            }
            //console.log(vm.sourceData.overseasStudent);
            vm.overseasStudent(vm.sourceData.overseasStudent);
          }, function(err) {
            console.log(err);
          })
        }
      })
      chart.setOption(option);
    },
    //历年招生人数，和未到人数对比
    historyStudent(data) {
      let vm = this
      let chart = this.$echarts.init(document.getElementById('historyStudent'), 'customed');
      let option = {
        title: {
          text: '提示:点击节点或柱状图显示未到人数列表',
          textStyle: {
            fontSize: 12,
            color:'red'
          },
          left:'80%',
          top:'5%'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['招生人数', '报到学生','未到人数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.month,
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '招生人数',
          type: 'line',
          data: data.recruitList,
        },
          {
            name: '报到学生',
            type: 'line',
            data: data.signedList,
          },
          {
            name: '未到人数',
            barWidth : 50,
            type: 'bar',
            data: data.chazhiList
          },
        ]
      };
      chart.setOption(option);
      chart.on('click',function(params){
        if(params.seriesName == '未到人数'){
          vm.go_time_title = params.name +params.seriesName
          vm.go_time = parseInt(params.name) + ''
          vm.dialogVisible = true
          vm.S_flag = '未到人数'
          vm.not_come_student(vm.history_data,vm.go_time,vm.pageNum,vm.size)
          vm.out_not_come_student(vm.history_data,vm.go_time,'-1','-1')
        }else if(params.seriesName == '招生人数'){
          vm.go_time_title = params.name +params.seriesName
          vm.go_time = parseInt(params.name) + ''
          vm.dialogVisible = true
          vm.S_flag = '招生人数'
          vm.zhaosheng_student(vm.history_data,vm.go_time,vm.pageNum,vm.size)
          vm.out_zhaosheng_student(vm.history_data,vm.go_time,'-1','-1')
        }else{
          vm.go_time_title = params.name +params.seriesName
          vm.go_time = parseInt(params.name) + ''
          vm.dialogVisible = true
          vm.S_flag = '报到人数'
          vm.come_student(vm.history_data,vm.go_time,vm.pageNum,vm.size)
          vm.out_come_student(vm.history_data,vm.go_time,'-1','-1')
        }
      })
    },

    //未到留学生列表
    not_come_student(year,month,page,size){
      let vm = this
      vm.$axios.request("post","recruit/getRecruitInfo", {
        year:year,
        month:month,
        page:page,
        pageSize:size
      },function(data){
        vm.listData = []
        vm.total_count = parseInt(data.totalCount)
        for(let i=0;i<data.result.length;i++){
          vm.listData.push({
            name:data.result[i].name!='null'?data.result[i].name:'未知',
            age:data.result[i].age!='null'?data.result[i].age:'未知',
            sex:data.result[i].sex!='null'?data.result[i].sex:'未知',
            phone:data.result[i].dh!='null'?data.result[i].dh:'未知',
            country:data.result[i].country!='null'?data.result[i].country:'未知',
            major:data.result[i].specialty!='null'?data.result[i].specialty:'未知',
            start:data.result[i].starttime!='null'?data.result[i].starttime:'未知',
            end:data.result[i].endtime!='null'?data.result[i].endtime:'未知',
            mail:data.result[i].email !='null'?data.result[i].email:'未知',
          })
        }
        vm.$nextTick(function() {
          vm.loading_list = false
        })
      },function(err){
        console.log(err);
      })

    },
    out_not_come_student(year,month,page,size){
      let vm = this
      vm.$axios.request("post","recruit/getRecruitInfo", {
        year:year,
        month:month,
        page:page,
        pageSize:size
      },function(data){
        vm.out_data = []
        for(let i=0;i<data.result.length;i++){
          vm.out_data.push({
            name:data.result[i].name!='null'?data.result[i].name:'未知',
            age:data.result[i].age!='null'?data.result[i].age:'未知',
            sex:data.result[i].sex!='null'?data.result[i].sex:'未知',
            phone:data.result[i].dh!='null'?data.result[i].dh:'未知',
            country:data.result[i].country!='null'?data.result[i].country:'未知',
            major:data.result[i].specialty!='null'?data.result[i].specialty:'未知',
            start:data.result[i].starttime!='null'?data.result[i].starttime:'未知',
            end:data.result[i].endtime!='null'?data.result[i].endtime:'未知',
            mail:data.result[i].email !='null'?data.result[i].email:'未知',
          })
        }
      },function(err){
        console.log(err);
      })

    },
    //招生人数列表
    zhaosheng_student(year,month,page,size){
      let vm = this
      vm.$axios.request("post","recruit/getRecruitInfo1", {
        year:year,
        month:month,
        page:page,
        pageSize:size
      },function(data){
        console.log(data)
        vm.listData = []
        vm.total_count = parseInt(data.totalCount)
        for(let i=0;i<data.result.length;i++){
          vm.listData.push({
            name:data.result[i].name!='null'?data.result[i].name:'未知',
            age:data.result[i].age!='null'?data.result[i].age:'未知',
            sex:data.result[i].sex!='null'?data.result[i].sex:'未知',
            phone:data.result[i].dh!='null'?data.result[i].dh:'未知',
            country:data.result[i].country!='null'?data.result[i].country:'未知',
            major:data.result[i].specialty!='null'?data.result[i].specialty:'未知',
            start:data.result[i].starttime!='null'?data.result[i].starttime:'未知',
            end:data.result[i].endtime!='null'?data.result[i].endtime:'未知',
            mail:data.result[i].email !='null'?data.result[i].email:'未知',
          })
        }
        vm.$nextTick(function() {
          vm.loading_list = false
        })
      },function(err){
        console.log(err);
      })

    },
    out_zhaosheng_student(year,month,page,size){
      let vm = this
      vm.$axios.request("post","recruit/getRecruitInfo1", {
        year:year,
        month:month,
        page:page,
        pageSize:size
      },function(data){
        vm.out_data = []
        for(let i=0;i<data.result.length;i++){
          vm.out_data.push({
            name:data.result[i].name!='null'?data.result[i].name:'未知',
            age:data.result[i].age!='null'?data.result[i].age:'未知',
            sex:data.result[i].sex!='null'?data.result[i].sex:'未知',
            phone:data.result[i].dh!='null'?data.result[i].dh:'未知',
            country:data.result[i].country!='null'?data.result[i].country:'未知',
            major:data.result[i].specialty!='null'?data.result[i].specialty:'未知',
            start:data.result[i].starttime!='null'?data.result[i].starttime:'未知',
            end:data.result[i].endtime!='null'?data.result[i].endtime:'未知',
            mail:data.result[i].email !='null'?data.result[i].email:'未知',
          })
        }
      },function(err){
        console.log(err);
      })

    },
    //实到人数列表
    come_student(year,month,page,size){
      let vm = this
      vm.$axios.request("post","recruit/getRecruitInfo2", {
        year:year,
        month:month,
        page:page,
        pageSize:size
      },function(data){
        vm.listData = []
        vm.total_count = parseInt(data.totalCount)
        for(let i=0;i<data.result.length;i++){
          vm.listData.push({
            name:data.result[i].name!='null'?data.result[i].name:'未知',
            age:data.result[i].age!='null'?data.result[i].age:'未知',
            sex:data.result[i].sex!='null'?data.result[i].sex:'未知',
            phone:data.result[i].dh!='null'?data.result[i].dh:'未知',
            country:data.result[i].country!='null'?data.result[i].country:'未知',
            major:data.result[i].specialty!='null'?data.result[i].specialty:'未知',
            start:data.result[i].starttime!='null'?data.result[i].starttime:'未知',
            end:data.result[i].endtime!='null'?data.result[i].endtime:'未知',
            mail:data.result[i].email !='null'?data.result[i].email:'未知',
          })
        }
        vm.$nextTick(function() {
          vm.loading_list = false
        })
      },function(err){
        console.log(err);
      })

    },
    out_come_student(year,month,page,size){
      let vm = this
      vm.$axios.request("post","recruit/getRecruitInfo2", {
        year:year,
        month:month,
        page:page,
        pageSize:size
      },function(data){
        vm.out_data = []
        for(let i=0;i<data.result.length;i++){
          vm.out_data.push({
            name:data.result[i].name!='null'?data.result[i].name:'未知',
            age:data.result[i].age!='null'?data.result[i].age:'未知',
            sex:data.result[i].sex!='null'?data.result[i].sex:'未知',
            phone:data.result[i].dh!='null'?data.result[i].dh:'未知',
            country:data.result[i].country!='null'?data.result[i].country:'未知',
            major:data.result[i].specialty!='null'?data.result[i].specialty:'未知',
            start:data.result[i].starttime!='null'?data.result[i].starttime:'未知',
            end:data.result[i].endtime!='null'?data.result[i].endtime:'未知',
            mail:data.result[i].email !='null'?data.result[i].email:'未知',
          })
        }
      },function(err){
        console.log(err);
      })

    },
    //弹出框数据导出
    out_date(){
      this.export2Excel(this.out_data)
    },

    handleSizeChange(val) {
      var vm = this
      vm.loading_list = true
      vm.pageNum = val
      if(vm.S_flag == '未到人数'){
        vm.not_come_student(vm.history_data,vm.go_time,vm.pageNum,vm.size)
      }else if(vm.S_flag == '招生人数'){
        vm.zhaosheng_student(vm.history_data,vm.go_time,vm.pageNum,vm.size)
      }else{
        vm.come_student(vm.history_data,vm.go_time,vm.pageNum,vm.size)
      }
    },
    handleCurrentChange(val) {
      var vm = this
      vm.loading_list = true
      vm.pageNum = val
      if(vm.S_flag == '未到人数'){
        vm.not_come_student(vm.history_data,vm.go_time,vm.pageNum,vm.size)
      }else if(vm.S_flag == '招生人数'){
        vm.zhaosheng_student(vm.history_data,vm.go_time,vm.pageNum,vm.size)
      }else{
        vm.come_student(vm.history_data,vm.go_time,vm.pageNum,vm.size)
      }
    },
    //关闭未到学生列表X
    handleClose(done) {
      this.dialogVisible = false
      this.listData = []
      this.loading_list = true
      this.pageNum=1
    },
    //关闭未到学生列表(确定)
    close_list_btn(){
      this.dialogVisible = false
      this.listData = []
      this.loading_list = true
      this.pageNum=1
    },

    handleIconClick(ev){
      var vm = this
      this.$router.push({path:'student/source',query: {name: vm.input,time:vm.select_year}})
      /*let look = vm.sourceData.areaListBarY.indexOf(vm.input)
      if(look =='-1'){
        this.open4()
        this.input=''
      }else{
        for(var i=0;i<vm.sourceData.areaListBarY.length;i++){
          if(vm.sourceData.areaListBarY[i] == vm.input){
            this.$router.push({path:'student/source',query: {name: vm.sourceData.areaListBarY[i]}})
            this.input=''
          }
        }
      }*/
    },
    year_change(val){
        let vm = this;
        vm.select_year = val
        vm.show_year = vm.select_year
        //留学生生源分布top10
        let area = {};
        vm.areaList = [];
        vm.sourceData.areaList=[];
        vm.sourceData.areaListBarY=[];
        vm.sourceData.areaListBarS=[];
        vm.sourceData.areaListBarC = []
        vm.sourceData.mapData=[];
        vm.$axios.request("post", "/recruit/findTop10", {year:val}, function(data) {
          for (let i = data.result.length-1 ; i >= 0; i--) {
            vm.sourceData.areaList.push({ name: data.result[i].country, value: data.result[i].count });
            vm.sourceData.areaListBarY.push(data.result[i].country);
            vm.sourceData.areaListBarC.push(data.result[i].country);
            vm.sourceData.areaListBarS.push(parseInt(data.result[i].count));
            for (let prop in nameMap) {
              if(nameMap[prop] == data.result[i].country){
                vm.sourceData.mapData.push({name:prop,value:data.result[i].count});
              }
            }
          }
          vm.sourceData.areaListBarC.reverse()
          //console.log( vm.sourceData.mapData);

          vm.$nextTick(function() {
            vm.loading = false;
            vm.studentDistribute(vm.sourceData.mapData);
            vm.studentTop10(vm.sourceData.areaListBarY, vm.sourceData.areaListBarS);
          })
        }, function(err) {
          console.log(err);
          return false;
        });
        vm.distribute_start = time.year + "-01";
        vm.distribute_end = time.year + "-" + time.month;
        vm.people_start = time.year + "-01";
        vm.people_end = time.year + "-" + time.month;
        vm.$nextTick(function() {
          vm.distributeGetData(vm.distribute_start, vm.distribute_end);
          vm.peopleScaleGetData(vm.people_start, vm.people_end);
        })

    },
    skip(link) {
      switch (link) {
        case 'majorDetails':
          for(let i=0;i<this.jurisdiction.length;i++){
            if(this.jurisdiction[i] == 'majorDetails'){
              let time = "";
              if (this.major_data.length != 4) {
                time = formatDate(this.major_data, "yyyy");
              } else {
                time = this.major_data;
              }
              this.$router.push({ path: 'student/majorDetails', query: { year: time, major: this.majorSelect } });
              this.$store.commit('change_active','2-8')
              return
            }
          }
          this.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
          break;
        case 'browse':
            for(let i=0;i<this.jurisdiction.length;i++){
              if(this.jurisdiction[i] == 'browse'){
                this.$router.push('student/browseDetails')
                this.$store.commit('change_active','2-6')
                return
              }
            }
          this.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
          break;
        case 'source':
          this.$router.push({path:'student/studentOriginArea',query: { year: this.origin_student}})
          break;
        case 'T500':
          for(let i=0;i<this.jurisdiction.length;i++){
            if(this.jurisdiction[i] == 'T500'){
              this.$router.push('student/T500')
              return
            }
          }
          this.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
          break;
      }
    },
    studentDistribute(data) {
      let chart = this.$echarts.init(document.getElementById('studentDistribute'), 'customed');
      let option = {
        title: {
          text: '留学生生源分布国家对比',
          textStyle: {
            fontSize: 12,
          },
        },
        visualMap: {
          min: 0,
          max: 800,
          realtime: true,
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          inRange:{
            color: ['yellow','red']
          },
          textStyle: {
            color: '#fff'
          }
        },
        series: [{
          type: 'map',
          mapType: 'world',
          label: {
            normal: {
              show: false,
              formatter: function(params) {
                return nameMap[params.name];
              }
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
          data: data
        }]
      };
      chart.setOption(option);
    },
    studentTop10(y, s) {
      let myChart = this.$echarts.init(document.getElementById('studentTop10'), 'customed');
      let option = {
        title: {
          text: '单位(人)',
          textStyle: {
            fontSize: 12,
          },
          left:'90%',
          top:'5%'
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        yAxis: [{
          type: 'category',
          data: y,
          axisTick: {
            alignWithLabel: true
          }
        }],
        xAxis: [{
          type: 'value'
        }],
        series: [{
          type: 'bar',
          barWidth: '60%',
          data: s,
          label:{
            normal:{
              show:true
            }
          },
        }]
      };
      myChart.setOption(option);
    },
    distribute(data)  {
      let myChart = this.$echarts.init(document.getElementById('distribute'), 'customed');
      let option = {
        title: {
          text: '单位(人)',
          textStyle: {
            fontSize: 12,
          },
          left:'90%',
            top:'5%'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)"
        },
        series: [{
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          label: {
            normal: {
              show: true,
              formatter: '{b} {d}%'
            },
            emphasis: {
              show: true
            }
          },
          data: data,
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
    peopleScale(data) {
      let myChart = this.$echarts.init(document.getElementById('peopleScale'), 'customed');
      let option = {
        title: {
          text: '单位(人)',
          textStyle: {
            fontSize: 12,
          },
          left:'90%',
            top:'5%'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [{
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '50%'],
            label: {
              normal: {
                show: true,
                formatter: '{b} {d}%'
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: data
          },

        ]
      };
      myChart.setOption(option);
    },
    browse(data) {
      //console.log(data);
      let myChart = this.$echarts.init(document.getElementById('browse'), 'customed');
      let option = {
        title: {
          text: '高校留学生人数与留学生来源国家数量对比',
          textStyle: {
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['国家个数', '留学生数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        xAxis: {
          type: 'category',
          data: data.name,
          axisLabel: {
            interval: 0,
            rotate: 6,
            showMaxLabel: true,
            align: 'center',
          },
        },
        series: [{
            name: '国家个数',
            type: 'bar',
            data: data.contry_count,
          },
          {
            name: '留学生数',
            type: 'bar',
            data: data.conut,
          }
        ]
      };
      myChart.setOption(option);
    },
    source(data) {
      let myChart = this.$echarts.init(document.getElementById('source'), 'customed');
      let option = {
        title: {
          text: '单位(条)',
          textStyle: {
            fontSize: 12,
          },
          left:'90%',
          top:'5%'
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
        legend: {
          data: ['正面', '负面', ]
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
          data: data.month
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name:"正面",
          type: 'line',

          data: data.positiveList
        }, {
          name:"负面",
          type: 'line',
          data: data.negativeList
        },]
      };
      myChart.setOption(option);
    },
    source_change(time) {
      let vm = this;
      vm.$axios.request("post", "/recruit/sourceTrends", { year: time }, function(data) {
      //   console.log(data);
        let sourceObj = { positiveList: [], negativeList: [], month: []};
        for (let i = 0; i < data.negativeList.length; i++) {
            sourceObj.month.push(data.negativeList[i].month+'月');
            sourceObj.negativeList.push(data.negativeList[i].count);
            sourceObj.positiveList.push(data.positiveList[i].count);
        }
         vm.source(sourceObj);
      }, function(err) {
        console.log(err);
      })

    },
    source_change_year(val) {
      if(val == undefined){
        return
      }else{
        this.origin_student = val;
        this.source_change(this.origin_student);
      }

    },
    T500(data) {
      let myChart = this.$echarts.init(document.getElementById('T500'), 'customed');
      let option = {
        title: {
          text: '单位(个)',
          textStyle: {
            fontSize: 12,
          },
          left:'90%',
          top:'5%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
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
          data: data.name,
          axisLabel: {
            interval: 0,
            rotate: 7,
            showMaxLabel: true,
            align: 'center',
          },
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: '子公司个数',
          type: 'bar',
          barWidth: '60%',
          data: data.val,
          label:{
            normal:{
              show:true
            }
          },
        }]
      };
      myChart.setOption(option);
    },
    major(data) {
      // console.log(data);
      let myChart = this.$echarts.init(document.getElementById('major'), 'customed');
      let option = {
        color: ['#00B6A4'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '28',
          left: '20%',
          right: '6%',
          bottom: '6%',
          containLabel: false
        },
        xAxis: [{
          type: 'value',
          position: 'top',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#9E9E9E',
              type: 'dashed',
              width: 1
            }
          },

        }],
        yAxis: [{
          type: 'category',
          data: data.month,
          axisTick: {
            show: false
          }
        },
        //辅助x轴
        {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: data.month
        }
        ],
        series: [{
          name: '招生总人数',
          type: 'bar',
          barWidth: 16,
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{c}',
            }
          },
          data: data.count
        },
          //背景
          {
            name: '本专业招生人数',
            type: 'bar',
            barWidth: 16,
            yAxisIndex: 1,
            label: {
              normal: {
                show: false,
              }
            },
            //颜色透明度data.count1
            itemStyle: {
              normal: {
                color: 'rgba(101, 101, 101,0.5)'
              }
            },
            //背景值
            data:data.count1
          },
        ]

      };
      myChart.setOption(option);
    },
    major_change(start,end,major) {
      let vm = this;
      this.sourceData.major_obj = { month: [], count: [] ,count1:[] };
      vm.$axios.request("post", "/recruit/findCountBySpecialty", {startTime: start,endTime:end, specialty: major }, function(data) {
        let month = ''
        let count = 0
        for (let i = 0; i < data.specialtyList.length; i++) {
          count = data.specialtyList[i].count1 / data.specialtyList[i].count * 100

          month = data.specialtyList[i].year + '年招生占比'+ count.toFixed(3) + '%'
          vm.sourceData.major_obj.month.push(month);
          vm.sourceData.major_obj.count.push(data.specialtyList[i].count);
          vm.sourceData.major_obj.count1.push(data.specialtyList[i].count1);
        }
        vm.major(vm.sourceData.major_obj)
      }, function(err) {
        console.log(err);
      })
    },
    majorChange(val) {
      let vm = this
      vm.majorSelect = val
      vm.major_change(vm.major_S_data, vm.major_N_data, vm.majorSelect);
    },
    major_change_year_S(val) {
      let vm = this
      if(val == undefined){
        return
      }else if(val >this.major_N_data){
        if(this.major_N_data!==''){
          this.$message.error('开始时间不能大于结束时间哦！');
          this.major_S_data = ''
          return
        }else{
          this.$message.error('请选择结束时间！');
          this.major_S_data = val
        }
      }else{
        this.major_S_data = val;
        vm.major_change(vm.major_S_data, vm.major_N_data, vm.majorSelect);
      }

    },
    major_change_year_N(val) {
      let vm = this
      if(val == undefined){
        return
      }else if(val<this.major_S_data){
        this.$message.error('结束时间不能小于开始时间哦！');
        this.major_N_data = ''
        return
      }else{
        if(this.major_S_data == ''){
          this.$message.error('请选择开始时间！');
          return
        }else {
          this.major_N_data = val;
          vm.major_change(vm.major_S_data, vm.major_N_data, vm.majorSelect);
        }
      }

    },
    /*word_Cloud(data) {
      var data = [
        {
          name: 'Sam S Club正面正面正面',
          value: 10000,
          category: '正面'
        }, {
          name: 'Macys中文',
          value: 6181,
          category: '负面'
        }, {
          name: 'Jurassic World',
          value: 4055,
          category: '负面'
        }, {
          name: 'Charter Communications',
          value: 2467,
          category: '正面'
        }, {
          name: 'Express',
          value: 1112,
          category: '正面'
        }, {
          name: 'Lena Dunham',
          value: 582,
          category: '负面'
        }, {
          name: 'Lewis Hamilton',
          value: 555,
          category: '正面'
        }, {
          name: 'KXAN',
          value: 550,
          category: '正面'
        }, {
          name: 'NCAA baseball tournament',
          value: 273,
          category: '正面'
        }, {
          name: 'Point Break',
          value: 865,
          category: '负面'
        },
        {
          name: 'Amy Schumer负面负面负面',
          value: 4386,
          category: '负面'
        }, {
          name: 'Chick Fil A',
          value: 2244,
          category: '负面'
        }, {
          name: 'Planet Fitness',
          value: 1898,
          category: '正面'
        }, {
          name: 'Pitch Perfect',
          value: 1484,
          category: '正面'
        }, {
          name: 'Home',
          value: 965,
          category: '负面'
        }, {
          name: 'Johnny Depp',
          value: 847,
          category: '正面'
        }, {
          name: 'Mary Ellen Mark',
          value: 1462,
          category: '负面'
        }, {
          name: 'Farrah Abraham',
          value: 566,
          category: '正面'
        }, {
          name: 'Rita Ora',
          value: 360,
          category: '正面'
        }, {
          name: 'Serena Williams',
          value: 2282,
          category: '负面'
        }
      ];
      let chart = this.$echarts.init(document.getElementById('wordCloud'), 'customed');
      chart.setOption({
        series: [{
          type: 'wordCloud',
          shape: 'circle',
          left: 'center',
          top: 'center',
          width: '90%',
          height: '90%',
          sizeRange: [12, 50],
          rotationRange: [0, 0],
          rotationStep: 45,
          gridSize: 8,
          drawOutOfBounds: false,
          textStyle: {
            normal: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              color: function (node) {
                var data = node.data;
                if(data.category == '正面'){
                  return 'rgba(' + [30, 144, 255, Math.random()].join(',') + ')';
                }else {
                  return 'rgba(' + [245, 85, 59, Math.random()].join(',') + ')';
                }
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: data
        }]
      });
    },*/



    distributeGetData(start, end) {
      let vm = this;
      //留学生洲际分布
      //distribute_start: '',
      //distribute_end: '',
      // console.log(time);
      vm.sourceData.stateList = [];
      vm.$axios.request("post", "/recruit/findByContinent", { startTime: start, endTime: end }, function(data) {
        //{ value: 335, name: '直接访问' },
        for (let i = 0; i < data.result.length; i++) {
          vm.sourceData.stateList.push({ name: data.result[i].continent, value: parseInt(data.result[i].count) });
        }
        //console.log(vm.sourceData.stateList);
        vm.$nextTick(vm.distribute(vm.sourceData.stateList));
      }, function(err) {
        console.log(err);
        return false;
      })
    },
    peopleScaleGetData(start, end) {
      let vm = this;
      vm.$axios.request("post", "/recruit/getBySex", { startTime: start, endTime: end }, function(data) {
        vm.sourceData.peopleScale = [];
        for (let i = 0; i < data.result.length; i++) {
          vm.sourceData.peopleScale.push({ name: data.result[i].sex, value: parseInt(data.result[i].count) });
        }
        vm.peopleScale(vm.sourceData.peopleScale)
      }, function(err) {
        console.log(err);
      })
    },
    distribute_change_start(val) {
      if(val == undefined){
        return
      }else if(val >this.distribute_end){
        if(this.distribute_end!==''){
          this.$message.error('开始时间不能大于结束时间哦！');
          this.distribute_start = ''
          return
        }else{
          this.$message.error('请选择结束时间！');
          this.distribute_start = val
        }
      }else{
        this.distribute_start = val;
        this.distributeGetData(this.distribute_start, this.distribute_end);
      }

    },
    distribute_change_end(val) {
      if(val == undefined){
        return
      }else if(val<this.distribute_start){
        this.$message.error('结束时间不能小于开始时间哦！');
        this.distribute_end = ''
        return
      }else{
        if(this.distribute_start == ''){
          this.$message.error('请选择开始时间！');
          return
        }else {
          this.distribute_end = val;
          this.distributeGetData(this.distribute_start, this.distribute_end);
        }
      }

    },
    historyStudent_change(year) {
      //console.log(year);
      let vm = this;
      vm.history_data = year
      vm.sourceData.historyContrast.month = [];
      vm.sourceData.historyContrast.signedList = [];
      vm.sourceData.historyContrast.recruitList = [];
      vm.sourceData.historyContrast.chazhiList = [];
      vm.$axios.request("post", "/recruit/signedAndFactContrast", { year: year }, function(data) {
        // console.log(data);
        for (let i = 0; i < data.recruitList.length; i++) {
          vm.sourceData.historyContrast.month.push(data.recruitList[i].month + "月");
          vm.sourceData.historyContrast.signedList.push(data.signedList[i].count);
          vm.sourceData.historyContrast.recruitList.push(data.recruitList[i].count);
          vm.sourceData.historyContrast.chazhiList.push((data.recruitList[i].count)-(data.signedList[i].count));
        }
        // console.log(vm.sourceData.historyContrast);
        vm.historyStudent(vm.sourceData.historyContrast);
      }, function(err) {
        console.log(err);
      })
    },
    people_change_start(val) {
      if(val == undefined){
        return
      }else if(val >this.people_end){
        if(this.people_end!==''){
          this.$message.error('开始时间不能大于结束时间哦！');
          this.people_start = ''
          return
        }else{
          this.$message.error('请选择开始时间！');
          this.people_start = val
        }
      }else{
        this.people_start = val;
        this.peopleScaleGetData(this.people_start, this.people_end);
      }

    },
    people_change_end(val) {
      if(val == undefined){
        return
      }else if(val<this.people_start){
        this.$message.error('结束时间不能小于开始时间哦！');
        this.people_end = ''
        return
      }else{
        if(this.people_start == ''){
          this.$message.error('请选择开始时间！');
          return
        }else {
          this.people_end = val;
          this.peopleScaleGetData(this.people_start, this.people_end);
        }
      }

    },


    //数据导出方法
    export2Excel(lister) {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../vendor/Export2Excel');
        const tHeader = ['姓名', '性别', '年龄', '电话','国家', '专业', '开课时间', '结业时间','邮箱']; //对应表格输出的title
        const filterVal = ['name', 'sex', 'age', 'phone','country', 'major', 'start', 'end','mail', ]; // 对应表格输出的数据
        const list = lister;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '数据分析列表excel'); //对应下载文件的名字
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  },
  created() {
    this.menu();
    let vm = this;
    vm.distribute_start = time.year + "-01";
    vm.distribute_end = time.year + "-" + time.month;
    vm.people_start = time.year + "-01";
    vm.people_end = time.year + "-" + time.month;
    vm.select_year = time.year
    vm.show_year = time.year
    vm.major_S_data = time.year-10 + ''
    vm.major_N_data = time.year
    vm.LS_year= time.year
    vm.$nextTick(function() {
      vm.distributeGetData(vm.distribute_start, vm.distribute_end);
      vm.peopleScaleGetData(vm.people_start, vm.people_end);
    })
    //留学生生源分布top10
    let area = {};
    vm.areaList = [];
    vm.$axios.request("post", "/recruit/findTop10", {year:time.year}, function(data) {
      for (let i = data.result.length-1 ; i >= 0; i--) {
        vm.sourceData.areaList.push({ name: data.result[i].country, value: data.result[i].count });
        vm.sourceData.areaListBarY.push(data.result[i].country);
        vm.sourceData.areaListBarC.push(data.result[i].country);
        vm.sourceData.areaListBarS.push(parseInt(data.result[i].count));
        for (let prop in nameMap) {
          if(nameMap[prop] == data.result[i].country){
              vm.sourceData.mapData.push({name:prop,value:data.result[i].count});
          }
        }
      }
      vm.sourceData.areaListBarC.reverse()
      vm.$nextTick(function() {
        vm.loading = false;
        vm.studentDistribute(vm.sourceData.mapData);
        vm.studentTop10(vm.sourceData.areaListBarY, vm.sourceData.areaListBarS);
      })
    }, function(err) {
      console.log(err);
      return false;
    });


    //top500
    //sourceData.T500List:{name:[],val:[]},
    //console.log(this.sourceData.T500List);
    /*vm.$axios.request("post", "/recruit/worldTop", "", function(data) {
      //console.log(data);
      for (let i = 0; i < data.result.length; i++) {
        vm.sourceData.T500List.name.push(data.result[i].enterprise);
        vm.sourceData.T500List.val.push(parseInt(data.result[i].count));
      }
      vm.$nextTick(function() {
        vm.loading = false;
        vm.T500(vm.sourceData.T500List);
      })
    }, function(err) {
      console.log(err);
    })*/
    //历年留学生报到人数
    vm.history_data = time.year;
    vm.$axios.request("post", "/recruit/overYearsCountDocumentarily", {}, function(data) {
      vm.sourceData.overseasStudent.year = [];
      vm.sourceData.overseasStudent.count = [];
      for (let i = 0; i < data.result.length; i++) {
        vm.sourceData.overseasStudent.year.push(parseInt(data.result[i].year));
        vm.sourceData.overseasStudent.count.push(parseInt(data.result[i].count));
      }
      //console.log(vm.sourceData.overseasStudent);
      vm.overseasStudent(vm.sourceData.overseasStudent);
    }, function(err) {
      console.log(err);
    })
    //历年招生报名人数与实际入学人数对比图
    vm.$nextTick(function() {
      vm.historyStudent_change(vm.history_data);
    })
    //获取专业
    vm.majorList = [];
    vm.$axios.request("post", "/recruit/findAllSpecialty", {}, function(data) {
      for (let i = 0; i < data.specialtyList.length; i++) {
        vm.$nextTick(function() {
          vm.majorList.push({ value: data.specialtyList[i].specialty, label: data.specialtyList[i].specialty });
        })
      }
    }, function(err) {
      console.log(err);
    })
    //初始化条件(可以不传)
    vm.major_data = time.year-1+'';
    vm.majorSelect = "汉语言";
    //专业比例
    vm.major_change(vm.major_S_data, vm.major_N_data, vm.majorSelect);

    //高校留学生招生分析
    //sourceData. browseObj:{contry_count:[],conut:[],name:[]};
    vm.$axios.request("post", "/recruit/attentionScan", {}, function(data) {
      //console.log(data);
      for (let i = 0; i < data.result.length; i++) {
        vm.sourceData.browseObj.contry_count.push(data.result[i].contry_count);
        vm.sourceData.browseObj.conut.push(data.result[i].conut);
        vm.sourceData.browseObj.name.push(data.result[i].name);
      }
      vm.$nextTick(function() {
        vm.browse(vm.sourceData.browseObj);
      })
    }, function(err) {
      console.log(err);
    })

    //生源地动态
    vm.origin_student = time.year;
    //vm.source_change(vm.origin_student);

    //从浏览器session里边获取权限
    let jurisdiction = sessionStorage.getItem("jurisdiction")
    vm.jurisdiction = jurisdiction.split(",");
  },
  mounted() {
    let vm = this;
    //echarts主题
    this.$echarts.registerTheme('customed', this.$store.state.echartsData);


  }
}
</script>
