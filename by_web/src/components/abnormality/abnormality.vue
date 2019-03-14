<template>
  <div class="w">
    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo"
             style="width: 36px; position: fixed;top: 300px; right:0;z-index: 10000;"
             theme="dark"
             :collapse="isCollapse">
      <a href="javascript:;" @click="mao(10)">
        <el-menu-item index="1">
          <img src="../../assets/img/student_1.png" height="20" width="20" alt="">
          <span slot="title">
            <a href="javascript:;" @click="mao(10)" style="color: white;font-size: 14px">疑似困难学生分析</a>
            </span>
        </el-menu-item>
      </a>
      <a href="javascript:;" @click="mao(1000)">
        <el-menu-item index="2">
          <img src="../../assets/img/student_02.png" height="26" width="26" alt="">
          <span slot="title">
            <a href="javascript:;" @click="mao(1000)" style="color: white;font-size: 14px">疑似沉迷网络学生分析</a>
          </span>
        </el-menu-item>
      </a>
      <a href="javascript:;" @click="mao(1600)">
        <el-menu-item index="3">
          <img src="../../assets/img/student_03.png" height="25" width="25" alt="">
          <span slot="title">
            <a href="javascript:;" @click="mao(1600)" style="color: white;font-size: 14px">疑似逃课学生分析</a>
          </span>
        </el-menu-item>
      </a>
      <a href="javascript:;" @click="mao(3500)">
        <el-menu-item index="4">
          <img src="../../assets/img/student_04.png" height="23" width="23" alt="">
          <span slot="title">
              <a href="javascript:;" @click="mao(3500)" style="color: white;font-size: 14px">疑似孤僻人员分析</a>
            </span>
        </el-menu-item>
      </a>
      <a href="javascript:;" @click="mao(3900)">
        <el-menu-item index="5">
          <img src="../../assets/img/student_05.png" height="25" width="25" alt="">
          <span slot="title">
              <a href="javascript:;" @click="mao(3900)" style="color: white;font-size: 14px">疑似早出晚归学生分析</a>
            </span>
        </el-menu-item>
      </a>
    </el-menu>
    <!--疑似困难学生分析-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" style="margin-bottom: 0">
        <h5 class="title" id="one">
          疑似困难学生分析
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
      <el-col :span="24" class="ec_bg_left" style="margin-right: 0;margin-bottom: 0">
        <div style="height: 450px;" id="positive2">
          <el-table :data="KN_goHome_list" align="center" style="width: 100%;overflow: auto" :show-header='true'>
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
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          男女比例
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy"
              @change="KN_sex_time_change"
              v-model="KN_sex_time"
              type="year"
              placeholder='选择时间'>
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="KN_sex"></div>
      </el-col>
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          学院比例
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy"
              @change="KN_XY_time_change"
              v-model="KN_XY_time"
              type="year"
              placeholder='选择时间'>
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="KN_XY"></div>
      </el-col>
    </el-row>


    <!--疑似沉迷网络学生分析-->
    <el-row type="flex" justify="space-around" style="margin-top: 20px;">
      <el-col :span="24" class="ec_bg_left" style="margin-right: 0; margin-bottom: 0">
        <h5 class="ec_h5" id="two">
          <span class="title">疑似沉迷网络学生列表</span>
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              v-model="start_time"
              @change="start_time_change"
              format="yyyy"
              type="year"
              placeholder="开始时间">
            </el-date-picker>
            <el-select
              v-model="majorSelect_CM"
              placeholder="请选择"
              size="mini"
              class="major-select"
              @change="CMChange">
              <el-option
                v-for="item in majorList_CM"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </h5>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg_left" style="margin-right: 0;">
        <div class="ec_height" id="positive1">
          <el-table
            v-loading="loading_chenmi"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="SW_list"
            align="center"
            style="width: 100%;overflow: auto"
            :show-header='true'>
            <el-table-column prop="name" label="姓名"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="age" label="年龄" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="title" label="学号" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="major" label="专业" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="school" label="学院"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="SW_je" label="上网金额"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="SW_ll" label="上网流量" class-name="elTableName">
            </el-table-column>
          </el-table>
        </div>
        <div class="block"  style="width:300px;margin:20px auto">
          <el-pagination
            @size-change="handleSizeChange_CM"
            @current-change="handleCurrentChange_CM"
            :current-page.sync= pageNum_chenmi
            :page-size= size_chenmi
            layout="total, prev, pager, next"
            :total=total_count_chenmi>
          </el-pagination>
        </div>
      </el-col>
    </el-row>


    <!--疑似逃课学生分析-->
    <el-row type="flex" justify="space-around" style="margin-top: 20px">
      <el-col :span="24" class="ec_bg_left" style="margin-bottom: 0;margin-right: 0">
        <h5 class="title" id="three">
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
            <el-table-column prop="country" width="150"  label="终端" class-name="elTableName">
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
        <div class="ec_height" id="XFJE"></div>
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
        <div class="ec_height" id="sex_TK"></div>
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
        <div class="ec_height" id="school_TK"></div>
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

    <!--疑似孤僻分析-->
    <el-row type="flex" justify="space-around" style="margin-top: 20px">
      <el-col :span="24" class="ec_bg">
        <h5 class="title" id="four">
          疑似孤僻人群分析列表
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="gp_time"
              type="year"
              format="yyyy"
              @change="gp_time_change"
              placeholder="选择时间">
            </el-date-picker>
            <el-select v-model="GP_Select"
                       placeholder="请选择"
                       size="mini"
                       class="major-select"
                       @change="countryChange">
              <el-option
                v-for="item in GP_List"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </h5>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: -10px">
      <el-col :span="24" class="ec_bg">
        <div  id="policy">
          <el-table :data="listData_GP"
                    v-loading="loading_GP"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    style = 'width:98%'>
            <el-table-column prop="name" align="center" label="姓名" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="sex" align="center" label="性别" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="age" align="center" label="年龄" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="city" align="center" label="地区" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="mejor" align="center" label="专业" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="school" align="center" label="学院" class-name="elTableName">
            </el-table-column>
          </el-table>
        </div>
        <div class="block"  style="width:300px;margin:20px auto">
          <el-pagination
            @size-change="handleSizeChange_GP"
            @current-change="handleCurrentChange_GP"
            :current-page.sync= pageNum_GP
            :page-size= size_GP
            layout="total, prev, pager, next"
            :total=total_count_GP>
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!--疑似晚归学生分析-->
    <el-row type="flex" justify="space-around" style="margin-top: 20px">
      <el-col :span="24" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5" id="five">
          <span class="title">疑似晚归学生分析</span>
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="list_time_ZCWG"
              type="month"
              format="yyyy-MM"
              @change="list_time_ZCWG_change"
              placeholder="选择时间">
            </el-date-picker>

            <el-select
              v-model="majorSelect_WG"
              placeholder="请选择"
              size="mini"
              class="major-select"
              @change="WGChange">
              <el-option
                v-for="item in majorList_WG"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
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
          晚归趋势: {{list_time_ZCWG}}月
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
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          晚归-专业比例TOP10: ( {{list_time_ZCWG}}月)
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
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          晚归-学院比例:({{list_time_ZCWG}}月)
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
  import time from '../../config/timeFormat'
  export default {
    data(){
      return{
        isCollapse: true,
        //////////////////////疑似困难学生分析////////////////////////////
        KN_goHome_list:[],
        KN_sex_time:'2017',
        KN_XY_time:'2017',
        student:'留学生长期生',
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
        student_list_time:'2017',

        //////////////////////疑似沉迷网络////////////////////////////
        loading_chenmi:true,
        majorSelect_CM: '全部',
        CM_code:'',
        majorList_CM: ['全部',],
        start_time:'2017',
        duration:'5',
        pageNum_chenmi:1,
        size_chenmi:8,
        total_count_chenmi:0,
        SW_list:[],

        //////////////////////疑似逃课////////////////////////////
        major_data:'2017-10',
        majorSelect_TK: '全部',
        TK_code:'',
        majorList_TK: [
          '全部',
          ],
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
        teacher_count:[],
        //////////////////////疑似孤僻///////////////////////////
        loading_GP:true,
        listData_GP: [],
        pageNum_GP:1,
        size_GP:10,
        total_count_GP:0,
        gp_time:'2018',
        GP_Select:'全部',
        gp_code:'',
        //code_GP:'2',
        GP_List:['全部'],
        //place_GP:'地区',
        /////////////////////////////早出晚归///////////////////////////////////////////////
        list_time_ZCWG:'2017-07',
        majorSelect_WG: '全部',
        WG_code:'',
        majorList_WG: ['全部'],
        goHome_list:[],
        pageNum_ZCWG:1,
        size_ZCWG:8,
        total_count_ZCWG:0,
        loading_ZCWG:true,
        ZCWGQS_time:[],
        ZCWGQS_count:[],
        ZCWGXL_time:[],
        ZCWGXL_count:[],
        ZCWGXY_time:[],
        ZCWGXY_count:[]
      }
    },
    methods:{
      mao(selector){
        window.scrollTo(0,selector);
      },
      menu() {
        window.scrollTo(0,0);
      },
      make_time(){
        let vm = this
        vm.KN_sex_time = time.year -1 + ''
        vm.gp_time = time.year -1 +''
        vm.KN_XY_time = time.year-1 + ''
        vm.student_list_time = time.year-1 + ''
        vm.start_time = time.year-1 + ''
        vm.major_data = time.year + '-' + time.month
        vm.TK_time = time.year + '-' + time.month
        vm.sex_time = time.year + '-' + time.month
        vm.ZJ_time = time.year + '-' + time.month
        vm.course_time = time.year + '-' + time.month
        vm.teacher_time = time.year + '-' + time.month
        vm.list_time_ZCWG = time.year + '-' + time.month
      },
      /////////////////////////////疑似困难学生分析///////////////////////////////////////////////

      //分页筛选条件不同时发送求情的方法
      FY_fn(time,num,size){
        var vm = this
        vm.$axios.request("post","difficultStudent/studentList",{
          year:time,
          page:num,
          pageSize:size},
          function(data){
          vm.KN_goHome_list = []
          vm.total_count = parseInt(data.totalCount)
          for(var i=0;i<data.result.length;i++){
            var native = ''
            if(data.result[i].native == 'null'){
              native = '未知'
            }else{
              native = data.result[i].native
            }
            vm.KN_goHome_list.push({
              branch:data.result[i].branch,
              cardno:parseInt(data.result[i].outid),
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
      //分页函数
      handleSizeChange(val) {
        var vm = this
        this.pageNum = val
        vm.FY_fn(vm.student_list_time,vm.pageNum,vm.size)
      },
      handleCurrentChange(val) {
        var vm = this
        this.pageNum = val
        vm.FY_fn(vm.student_list_time,vm.pageNum,vm.size)
      },
      student_list_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.student_list_time = val
          vm.FY_fn(vm.student_list_time,vm.pageNum,vm.size)
        }

      },

      //男女比例
      sex_fn(){
        let KN_sex = this.$echarts.init(document.getElementById('KN_sex'), 'customed');
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
              radius : ['40%', '55%'],
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
        KN_sex.setOption(option);
      },
      sex_circle_fn(year){
        var vm = this
        //男女比例
        vm.$axios.request("post","difficultStudent/sexDis",{
          year:year},function(data){
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
      KN_sex_time_change(val){
        if(val == undefined){
          return
        }else{
          this.KN_sex_time = val
          this.sex_circle_fn(this.KN_sex_time)
        }

      },
      //学院比例
      KN_XY_fn(){
        let KN_XY = this.$echarts.init(document.getElementById('KN_XY'), 'customed');
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
        KN_XY.setOption(option);
      },
      XY_circle_fn(year){
        var vm = this
        //洲际比例
        vm.$axios.request("post","difficultStudent/continentDis",{year:year},function(data){
          vm.ZJ_circle = []
          vm.ZJ_count = []
          for(var i=0;i<data.result.length;i++){
            vm.ZJ_circle.push(data.result[i].continent)
            vm.ZJ_count.push({name:data.result[i].continent,value:data.result[i].count})
          }
          vm.KN_XY_fn()
        },function(err){
          console.log(err);
        })
      },
      KN_XY_time_change(val){
        if(val == undefined){
          return
        }else{
          this.KN_XY_time = val
          this.XY_circle_fn(this.KN_XY_time)
        }

      },

      /////////////////////////////疑似沉迷网络学生分析///////////////////////////////////////////////

      //沉迷网络学生分析列表
      start_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.start_time = val
          vm.fn(vm.CM_code,vm.start_time,vm.pageNum_chenmi,vm.size_chenmi)
        }

      },
      CMChange(val) {
        var vm = this
        vm.majorSelect_CM = val
        if(val == '全部'){
          vm.CM_code = ''
        }else{
          vm.CM_code = val
        }
        vm.fn(vm.CM_code,vm.start_time,vm.pageNum_chenmi,vm.size_chenmi)
      },
      handleSizeChange_CM(val) {
        var vm = this
        vm.loading_chenmi = true
        vm.pageNum_chenmi = val
        vm.fn(vm.CM_code,vm.start_time,vm.pageNum_chenmi,vm.size_chenmi)
      },
      handleCurrentChange_CM(val) {
        var vm = this
        vm.loading_chenmi = true
        vm.pageNum_chenmi = val
        vm.fn(vm.CM_code,vm.start_time,vm.pageNum_chenmi,vm.size_chenmi)
      },
      fn(academy,year,page,size){
        let vm = this
        vm.loading_chenmi = true
        //沉迷网络
        vm.$axios.request("post","WallowNet/wallowNetList", {
          academy:academy,
          year:year,
          page:page,
          pageSize:size},function(data){
          vm.SW_list=[]
          vm.total_count_chenmi = parseInt(data.totalCount)
          let name = ''
          let age = ''
          let title = ''
          let major = ''
          let school = ''
          let SW_je = ''
          let SW_ll = ''
          for(let i=0;i<data.result.length;i++){
            if(data.result[i].xm =='null'){
              name = '未知'
            }else{
              name = data.result[i].xm
            }

            if(data.result[i].age =='null'){
              age = '未知'
            }else{
              age = data.result[i].age
            }

            if(data.result[i].xh =='null'){
              title = '未知'
            }else{
              title = data.result[i].xh
            }

            if(data.result[i].t_zydm =='null'){
              major = '未知'
            }else{
              major = data.result[i].t_zydm
            }

            if(data.result[i].t_dwdm =='null'){
              school = '未知'
            }else{
              school = data.result[i].t_dwdm
            }

            if(data.result[i].fldaveragemoney =='null'){
              SW_je = '未知'
            }else{
              SW_je = data.result[i].fldaveragemoney
              SW_je = SW_je.toFixed(2)
            }

            if(data.result[i].flduseflowaverage =='null'){
              SW_ll = '未知'
            }else{
              SW_ll = data.result[i].flduseflowaverage
              SW_ll = SW_ll.toFixed(2)
            }

            vm.SW_list.push({
              name : name,
              age : age,
              title : title,
              major : major,
              school : school,
              SW_je : SW_je,
              SW_ll : SW_ll,
            })
          }
          vm.$nextTick(function() {
            vm.loading_chenmi = false
          })
        },function(err){
          console.log(err);
        })
      },

      /////////////////////////////疑似逃课行为分析///////////////////////////////////////////////
      //逃课行为分析列表
      TKChange(val) {
        var vm = this
        vm.majorSelect_TK = val
        if(val == '全部'){
          vm.TK_code = ''
        }else{
          vm.TK_code = val
        }

        vm.TK_list_init_fn(vm.TK_code,vm.major_data,vm.pageNum_TK,vm.size_TK)
      },
      //逃课时间选择
      TK_change_year(val){
        var vm = this
        if(val == undefined){
          return
        }else{
          vm.major_data = val
          vm.TK_list_init_fn(vm.TK_code,vm.major_data,vm.pageNum_TK,vm.size_TK)
        }

      },
      handleSizeChange_TK(val) {
        var vm = this
        vm.loading = true
        vm.pageNum_TK = val
        vm.TK_list_init_fn(vm.TK_code,vm.major_data,vm.pageNum_TK,vm.size_TK)

      },
      handleCurrentChange_TK(val) {
        var vm = this
        vm.loading = true
        vm.pageNum_TK = val
        vm.TK_list_init_fn(vm.TK_code,vm.major_data,vm.pageNum_TK,vm.size_TK)
      },
      TK_list_init_fn(academy,date,page,pageSize){
        let vm = this
        //逃课列表初始化
        vm.$axios.request("post","skipClasses/taokeList",{
          academy:academy,
          date:date,
          page:page,
          pageSize:pageSize},function(data){
          console.log(data)
          vm.TK_list=[]
          vm.total_count_TK = parseInt(data.totalcount)
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
        let XFJE = this.$echarts.init(document.getElementById('XFJE'), 'customed');
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
        XFJE.setOption(option);
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
      sex_TK_fn() {
        let sex_TK = this.$echarts.init(document.getElementById('sex_TK'), 'customed');
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
              radius: ['40%', '55%'],
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
        sex_TK.setOption(option);
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
          vm.sex_TK_fn()
        },function(err){
          console.log(err);
        })
      },
      //洲际比例
      ZJ_fn() {
        let school_TK = this.$echarts.init(document.getElementById('school_TK'), 'customed');
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
        school_TK.setOption(option);
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
      },

      /////////////////////////////疑似孤僻学生分析///////////////////////////////////////////////
      handleSizeChange_GP(val) {
        vm.loading_GP = true
        var vm = this
        vm.pageNum_GP = val
        this.gp_init(vm.gp_code,vm.gp_time,vm.pageNum_GP)
      },
      handleCurrentChange_GP(val) {
        var vm = this
        vm.loading_GP = true
        vm.pageNum_GP = val
        this.gp_init(vm.gp_code,vm.gp_time,vm.pageNum_GP)
      },
      countryChange(val){
        let vm = this
        vm.loading_GP = true
        vm.pageNum_GP = 1
        vm.GP_Select = val
        if(val =='全部'){
          vm.gp_code = ''
        }else{
          vm.gp_code = val
        }
        this.gp_init(vm.gp_code,vm.gp_time,vm.pageNum_GP)
      },
      gp_time_change(val){
        let vm = this
        vm.loading_GP = true
        if(val == undefined){
          return
        }else{
          vm.gp_time = val
          this.gp_init(vm.gp_code,vm.gp_time,vm.pageNum_GP)
        }
      },
      gp_init(academic,year,page){
        let vm = this
        vm.$axios.request("post", "health/mentalHealth", {academic:academic,year:year,page:page,pageSize:'10'}, function(data) {
          vm.total_count_GP = data.totalCount
          vm.listData_GP =[]
          for(let i = 0;i<data.result.length;i++){
            let sex = ''
            let mejor = ''
            let city = ''
            if(data.result[i].sex!== '男'&& data.result[i].sex!=='女'){
              sex = '未知'
            }else{
              sex = data.result[i].sex
            }
            if(data.result[i].a_zszyzw =='null'){
              mejor = '未知'
            }else{
              mejor = data.result[i].a_zszyzw
            }
            if(data.result[i].a_gj =='null'){
              city = '未知'
            }else{
              city = data.result[i].a_gj
            }
            vm.listData_GP.push({
              name:data.result[i].name,
              sex: sex,
              age:data.result[i].age,
              school: data.result[i].a_zxxxdw,
              mejor: mejor,
              city: city
            })
          }
          vm.$nextTick(function() {
            vm.loading_GP = false
          })
        }, function(err) {
          console.log(err);
        })
      },
      /////////////////////////////早出晚归///////////////////////////////////////////////
      list_time_ZCWG_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.loading_ZCWG = true
          vm.list_time_ZCWG = val
          this.made_list_fn(this.WG_code,this.list_time_ZCWG,this.pageNum_ZCWG,this.size_ZCWG)
          this.home_fn(this.list_time_ZCWG)
          this.education_change_fn(this.list_time_ZCWG)
          this.college_change_fn(this.list_time_ZCWG)
        }

      },
      WGChange(val) {
        var vm = this
        vm.loading_ZCWG = true
        vm.majorSelect_WG = val
        if(val == '全部'){
          vm.WG_code = ''
        }else{
          vm.WG_code = val
        }
        this.made_list_fn(this.WG_code,this.list_time_ZCWG,this.pageNum_ZCWG,this.size_ZCWG)
      },
      //分页函数
      handleSizeChange_ZCWG(val) {
        var vm = this
        vm.loading_ZCWG = true
        vm.pageNum_ZCWG = val
        this.made_list_fn(this.WG_code,this.list_time_ZCWG,this.pageNum_ZCWG,this.size_ZCWG)
      },
      handleCurrentChange_ZCWG(val) {
        var vm = this
        vm.loading_ZCWG = true
        vm.pageNum_ZCWG = val
        this.made_list_fn(this.WG_code,this.list_time_ZCWG,this.pageNum_ZCWG,this.size_ZCWG)
      },
      made_list_fn(academy,month,page,pageSize){
        let vm = this
        vm.$axios.request("post","EarlyAndLate/stuList", {
          academy:academy,
          month:month,
          page:page,
          pageSize:pageSize,
        },function(data){
          console.log(data)
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
            data: ['晚归趋势']
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
            name: '晚归趋势',
            type: 'line',
            stack: '总量',
            data: this.ZCWGQS_count
          }]
        };
        home_time.setOption(option);
      },
      home_fn(time){
        let vm = this
        vm.$axios.request("post","EarlyAndLate/tendency", {
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
      education_change_fn(time){
        let vm = this
        vm.$axios.request("post","EarlyAndLate/specialtyDis", {
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
      college_change_fn(time){
        let vm = this
        vm.$axios.request("post","EarlyAndLate/academyDis", {
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
    },
    mounted(){
      let vm = this
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);

    },
    created(){
      var vm= this
      vm.make_time()
      vm.menu()
      /////////////////////////////疑似困难学生分析///////////////////////////////////////////////
      //男女比例
      this.sex_circle_fn(this.KN_sex_time)
      //洲际比例
      this.XY_circle_fn(this.KN_XY_time)
      vm.FY_fn(vm.student_list_time,vm.pageNum,vm.size)

      /////////////////////////////疑似沉迷网络学生分析///////////////////////////////////////////////
      vm.fn(vm.CM_code,vm.start_time,vm.pageNum_chenmi,vm.size_chenmi)

      /////////////////////////////疑似逃课分析///////////////////////////////////////////////
      this.TK_list_init_fn(this.TK_code,this.major_data,this.pageNum_TK,this.size_TK)
      this.Tk_QS_init_fn(this.TK_time)
      this.sex_init_fn(this.sex_time)
      this.course_init_fn(this.course_time)
      this.teacher_init_fn(this.teacher_time)
      this.ZJ_init_fn(this.ZJ_time)

      /////////////////////////////疑似孤僻分析///////////////////////////////////////////////
      this.gp_init(vm.gp_code,vm.gp_time,vm.pageNum_GP)
      /////////////////////////////早出晚归///////////////////////////////////////////////
      this.made_list_fn(this.WG_code,this.list_time_ZCWG,this.pageNum_ZCWG,this.size_ZCWG)
      this.home_fn(this.list_time_ZCWG)
      this.education_change_fn(this.list_time_ZCWG)
      this.college_change_fn(this.list_time_ZCWG)

      //////////////////////////////学院列表////////////////////////////
      vm.$axios.request("post", "staff/branches", {}, function(data) {
        vm.majorList_CM = ['全部']
        vm.majorList_TK = ['全部']
        vm.majorList_WG = ['全部']
        vm.GP_List = ['全部']
        for(let i=0;i<data.result.length;i++){
          vm.majorList_CM.push(data.result[i].branch)
          vm.majorList_TK.push(data.result[i].branch)
          vm.majorList_WG.push(data.result[i].branch)
          vm.GP_List.push(data.result[i].branch)
        }
      }, function(err) {
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
  .title{
    font-size: 18px;
    color: #62B7FD;
    margin: 20px 5px;
  }
</style>
