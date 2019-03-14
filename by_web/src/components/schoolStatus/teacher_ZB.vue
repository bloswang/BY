<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/school' }">北语校情</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/school' }">学校资产详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          教学科研仪器分析
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
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="teach_end_time"
              type="year"
              format="yyyy"
              @change="teach_end_time_change"
              placeholder="结束时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="echarts_1">
        </div>
      </el-col>
    </el-row>-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          学院资产总额
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="school_money_time"
              type="year"
              format="yyyy"
              @change="school_money_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="school_money">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          各学院设备明细
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
            <el-table :data="tableData3" style="width: 100%" class="by_body_table" :border=false>
              <el-table-column prop="use_name" label="使用单位" width="100"  align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="yq_name" label="仪器名称" width="100"  align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="type" label="型号" width="180"  align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="guige" label="规格" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="unit" label="单价" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="made" label="厂家" width="100"  align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="made_time" label="出厂日期" width="150"  align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="use_time" label="购置日期" width="150"  align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="number" label="数量" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="use_type" label="使用状态"  align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="use_direction" label="使用方向" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="sum_money" label="总金额" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="block"  style="width:300px;margin:20px auto">
          <el-pagination
            @size-change="handleSizeChange3"
            @current-change="handleCurrentChange3"
            :current-page.sync= pageNum3
            :page-size= size3
            layout="total, prev, pager, next"
            :total=total_count3>
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          历年资产情况分布
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
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          各学院人均资产
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="avgprice_time"
              type="year"
              format="yyyy"
              @change="avgprice_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="tab_warPer" style="margin-bottom: 20px">
          <table class="table table_four" v-for="list in money_avg_data" >
            <tr>
              <td class="black" colspan="3">{{list.school}}</td>
            </tr>
            <tr>
              <td>教师人数</td>
              <td>学生人数</td>
              <td>平均资产</td>
            </tr>
            <tr>
              <td>{{list.teacher}}</td>
              <td>{{list.student}}</td>
              <td>{{list.avg}}</td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>

    <!--学生用房-->
    <el-row class="by_body_table_div">
      <el-col :span="24" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          中国学生宿舍占用情况
        </h5>
        <div class="ec_height" id="student_C"></div>
      </el-col>
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          中国学生宿舍详情&nbsp;&nbsp;({{total_count}}间)
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
        </h5>
        <div class="grid-content bg-purple-dark">
          <template>
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="tableData"
              style="width: 100%"
              class="by_body_table"
              :border=false>
              <el-table-column prop="use" label="房间用途" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="big_name" label="楼名" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="name" label="房间号" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="count" label="床位总数" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="use_count" label="已占用床位号" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="no_use" label="剩余床位数"   align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="block"  style="width:300px;margin:0 auto 20px">
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
    <el-row class="by_body_table_div">
      <el-col :span="24" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          留学生宿舍占用情况
        </h5>
        <div class="ec_height" id="student_L"></div>
      </el-col>
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          留学生宿舍详情&nbsp;&nbsp;({{total_count1}}间)
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
        </h5>
        <div class="grid-content bg-purple-dark">
          <template>
            <el-table
              v-loading="loading1"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="tableData1"
              style="width: 100%"
              class="by_body_table"
              :border=false>
              <el-table-column prop="room_type" label="房间类型" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="is_use" label="是否可用" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_number" label="房间号" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_c" label="楼层" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_name" label="楼名" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_sex" label="性别要求" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_footer" label="地上楼层" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_count" label="床位数" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_BZ" label="剩余床位" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_from" label="房间归属" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="block"  style="width:300px;margin:20px auto">
          <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page.sync= pageNum1
            :page-size= size1
            layout="total, prev, pager, next"
            :total=total_count1>
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--教学用房-->
    <el-row class="by_body_table_div">
      <el-col :span="24"  class="ec_bg">
        <h5 class="ec_h5">
          教学用房详情&nbsp;&nbsp;({{total_count2}}间)
          <el-select
            v-model="typeSelect2"
            placeholder="请选择"
            size="mini"
            class="major-select select_width"
            @change="typeChange2">
            <el-option
              v-for="(item,index) in typeList2"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </h5>
        <div class="grid-content bg-purple-dark">
          <template>
            <el-table
              v-loading="loading2"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="tableData2"
              style="width: 100%"
              class="by_body_table"
              :border=false>
              <el-table-column prop="order" label="建筑物编号" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="big_name" label="教学楼名称" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="name" label="教室名称" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="use" label="教室用途" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="ks_num" label="考试人数" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="sum_num" label="座位数" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="block"  style="width:300px;margin:20px auto">
          <el-pagination
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page.sync= pageNum2
            :page-size= size2
            layout="total, prev, pager, next"
            :total=total_count2>
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--校园网络建设-->

    <el-row type="flex" justify="space-around" >
      <el-col :span="24"  class="ec_bg">
        <h5 class="ec_h5">
          校园网络服务设备
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="netMake_S"
              type="year"
              format="yyyy"
              @change="netMake_S_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="netMake_N"
              type="year"
              format="yyyy"
              @change="netMake_N_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: -10px">
      <el-col :span="24"  class="ec_bg">
        <div class="ec_height" id="add_netMake">
        </div>
      </el-col>

    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: -10px">
      <el-col :span="12"  class="ec_bg">
        <h5 class="ec_h5">
          校园网络服务设备类别比例 ({{natMake_time}}年)
        </h5>
        <div class="ec_height" id="netMake">
        </div>
      </el-col>
      <el-col :span="12"  class="ec_bg">
        <h5 class="ec_h5">
          校园网络服务设备列表 ({{natMake_time}}年)
        </h5>
        <div class="tab_warPer" style="margin-bottom: 50px">
          <template>
            <el-table
              v-loading="loading2"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="tableData_list"
              style="width: 100%"
              height="400"
              class="by_body_table"
              :border=false>
              <el-table-column prop="name" label="设备名称" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="add" label="设备增量" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="all" label="设备总量" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around" >
      <el-col :span="24"  class="ec_bg">
        <h5 class="ec_h5">
          电教设备
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="netMake_S1"
              type="year"
              format="yyyy"
              @change="netMake_S1_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="netMake_N1"
              type="year"
              format="yyyy"
              @change="netMake_N1_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: -10px">
      <el-col :span="24"  class="ec_bg">
        <div class="ec_height" id="add_netMake1">
        </div>
      </el-col>

    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: -10px">
      <el-col :span="12"  class="ec_bg">
      <h5 class="ec_h5">
        电教设备类别比例 ({{natMake_time1}}年)
      </h5>
      <div class="ec_height" id="netMake1">
      </div>
    </el-col>
      <el-col :span="12"  class="ec_bg">
        <h5 class="ec_h5">
          电教设备列表({{natMake_time1}}年)
        </h5>
        <div class="tab_warPer" style="margin-bottom: 50px">
          <template>
            <el-table
              v-loading="loading2"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="tableData_list1"
              height="400"
              style="width: 100%"
              class="by_body_table"
              :border=false>
              <el-table-column prop="name" label="设备名称" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="add" label="设备增量" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="all" label="设备总量" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-col>
    </el-row>

    <!--图书馆信息-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          图书馆馆藏图书数量与类别分析 (共:{{sum}}本)
        </h5>
        <div style="height: 500px;" id="book">
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          图书馆图书分析<!--({{TS_start_time}}至{{TS_end_time}})-->
          <div class="ec_h5_data" style="float: right;">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              type="date"
              format="yyyy-MM-dd"
              v-model="TS_start_time"
              @change="TS_start_time_change"
              placeholder="选择年">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              type="date"
              format="yyyy-MM-dd"
              v-model="TS_end_time"
              @change="TS_end_time_change"
              placeholder="选择年">
            </el-date-picker>
          </div>
        </h5>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: -10px">
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          馆藏最多分类图书TOP5
        </h5>
        <div style="height: 300px;" id="TS_msg">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          借阅最多读者TOP5
        </h5>
        <div style="height: 300px;"  id="TS_person">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg">
        <h5 class="ec_h5">
          借阅最多图书TOP5
        </h5>
        <div style="height: 300px;"  id="TS_look">
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
        //教学科研仪器分析
        /*teach_start_time:'2010',
        teach_end_time:'2017',
        teach_year:[],
        teach_money:[],*/
        //学院资产分析
        sum:0,
        school_money_time:'2017',
        school_name:[],
        school_sum:[],

        teachingTeam_time:"",
        teacher_time:'2016',
        schoolSelect1:'商学院',
        schoolList1:[
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
        schoolSelect:'商学院',
        schoolList:[
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
        pageNum3:1,
        size3:10,
        total_count3:0,
        tableData3:[],
        //历史教师人数趋势
        history_start_time:'2000',
        history_end_time:'2017',
        history_name:[],
        history_num:[],

        avgprice_time:'2017',
        money_avg_data:[],

        //学生用房
        //本科学生用房
        loading:true,
        typeSelect:'全部',
        typeSelect_code:'',
        //本科生用房下拉菜单
        typeList:['全部'],
        tableData: [],
        pageNum:1,
        size:8,
        total_count:0,
        B_sum_room:[],
        B_use_room:[],
        B_room_name:[],

        //留学生用房
        loading1:true,
        typeSelect1:'全部',
        typeSelect_code1:'',
        //留学生房间下拉菜单
        typeList1:['全部'],
        tableData1: [],
        pageNum1:1,
        size1:8,
        total_count1:0,
        L_sum_room:[],
        L_use_room:[],
        L_room_name:[],
        //教学用房
        loading2:true,
        typeSelect2:'全部',
        typeSelect_code2:'',
        typeList2:['全部','计算机房','实验室','专用教室','语音室','多媒体教室'],
        tableData2: [],
        pageNum2:1,
        size2:8,
        total_count2:0,

        //校园网建设
        netMake_S:'2010',
        netMake_N:'2018',
        timeList:[],
        sumList:[],
        oldList:[],
        newList:[],
        listData:[],
        natMake_time:'2017',
        natMake_name:[],
        natMake_count:[],
        tableData_list:[],


        //电教仪器
        netMake_S1:'2010',
        netMake_N1:'2018',
        timeList1:[],
        sumList1:[],
        oldList1:[],
        newList1:[],
        natMake_time1:'2017',
        listData1:[],
        natMake_name1:[],
        natMake_count1:[],
        tableData_list1:[],

        //馆藏图书分类
        book_type:[],
        book_count:[],
        //图书馆图书分析
        TS_start_time:'2017-01-01',
        TS_end_time:'2017-10-01',
        read_name:[],
        read_count:[],
        msg_name:[],
        msg_count:[],
        borrow_name:[],
        borrow_count:[],
      }
    },
    components: {},
    methods: {
      make_time(){
        let vm = this
          vm.school_money_time = time.year
          vm.teacher_time = time.year
          vm.history_start_time = time.year - 10 + ''
          vm.history_end_time = time.year
          vm.avgprice_time = time.year
          vm.netMake_S = time.year - 10 + ''
          vm.netMake_N = time.year
          vm.natMake_time = time.year
          vm.netMake_S1 = time.year - 10 + ''
          vm.netMake_N1 = time.year
          vm.natMake_time1 = time.year
          vm.TS_start_time = time.year + '-' + time.month + '-' + '01'
          vm.TS_end_time = time.year + '-' + time.month + '-' + time.day
      },
     //学院资产总额
      school_money(){
        let school_money = this.$echarts.init(document.getElementById("school_money"), 'customed');
        let option = {
          title: {
            text: '单位(万元)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['总资产']
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
            data: this.school_name
          },
          series: [
            {
              name: '总资产',
              type: 'bar',
              data: this.school_sum,
              label:{
                normal:{
                  show: true,
                  position: 'right'}
              },
            }
          ]
        };
        school_money.setOption(option)
      },
      school_money_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.school_money_time = val
          vm.school_sum_money(vm.school_money_time)
        }

      },
      school_sum_money(time){
        let vm = this
        //学院资产比例分析
        vm.$axios.request("post","basicEducationalStandard/branchAssetAnalyze",{year:time},function(data){
          vm.school_name = []
          vm.school_sum = []
          for(let i = 0;i<data.result.length;i++){
            vm.school_name.push(data.result[i].branch)
            vm.school_sum.push(data.result[i].sum)
          }
          vm.school_money()
        },function(err){
          console.log(err);
        })
      },

      //各学院设备明细
      //时间
      teacher_time_change(val){
        var vm = this
        if(val == undefined){
          return
        }else{
          this.teacher_time = val
          vm.all_fn(vm.teacher_time,vm.schoolSelect,vm.pageNum3,vm.size3)
        }

      },
      //学院
      schoolChange(val){
        var vm = this
        this.schoolSelect = val
        vm.all_fn(vm.teacher_time,vm.schoolSelect,vm.pageNum3,vm.size3)
      },
      //分页函数
      handleSizeChange3(val) {
        var vm = this
        this.pageNum3 = val
        vm.all_fn(vm.teacher_time,vm.schoolSelect,vm.pageNum3,vm.size3)
      },
      handleCurrentChange3(val) {
        var vm = this
        this.pageNum3 = val
        vm.all_fn(vm.teacher_time,vm.schoolSelect,vm.pageNum3,vm.size3)
      },
      all_fn(year,branch,page,pageSize){
        var vm= this
        //初始化教学设备明细
        vm.$axios.request("post","basicEducationalStandard/equipmentDetail",{year:year,branch:branch,page:page,pageSize:pageSize},function(data){
          vm.total_count3 = parseInt(data.totalCount)
          vm.tableData3 = []
          for(var i=0;i<data.result.length;i++){
            vm.tableData3.push({
              use_name: data.result[i].receive_unit_name,
              yq_name: data.result[i].name,
              type: data.result[i].model,
              guige: data.result[i].format,
              unit: data.result[i].unit_price,
              made: data.result[i].manufactor,
              made_time: data.result[i].factory_date,
              use_time: data.result[i].purchase_date,
              number: data.result[i].numbers,
              use_type: data.result[i].status,
              use_direction: data.result[i].use_direction,
              sum_money: data.result[i].total_price,
            })
          }

        },function(err){
          console.log(err);
        })
      },


      //历史资产趋势
      echarts6(){
        let echarts_6 = this.$echarts.init(document.getElementById("echarts_6"), 'customed');
        let option = {
          title: {
            text: '单位(万元)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['学院历年资产趋势']
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
              name:'学院历年资产趋势',
              type:'line',
              data:this.history_num,
              markPoint: {
                data: [
                  {name: '周最低', value: 5,type:'max',
                    symbolSize:2,
                    label: {
                      normal: {
                        position: 'top',
                        formatter: '历史最高资产'
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
          return
        }else if(val >this.history_end_time){
          if(this.history_end_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.history_start_time = ''
            return
          }else{
            vm.$message.error('请选择结束时间！');
            this.history_start_time = val
          }
        }else{
          vm.history_start_time = val
          vm.history_fn(vm.history_start_time,vm.history_end_time,vm.schoolSelect1)
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
          if (vm.history_start_time == '') {
            vm.$message.error('请选择开始时间！');
            return
          } else {
            vm.history_end_time = val
            vm.history_fn(vm.history_start_time, vm.history_end_time, vm.schoolSelect1)
          }
        }
      },

      //学院
      schoolChange1(val){
        var vm = this
        this.schoolSelect1 = val
        vm.history_fn(vm.history_start_time,vm.history_end_time,vm.schoolSelect1)
      },
      history_fn(start,end,school){
        let vm = this
        //历史学院资产趋势
        vm.$axios.request("post","basicEducationalStandard/assetTrend",{startYear:start,endYear:end,branch:school},function(data){
          vm.history_name = []
          vm.history_num = []
          for(let i = 0;i<data.result.length;i++){
            vm.history_name.push(data.result[i].year)
            vm.history_num.push(data.result[i].totalprice)
          }
          vm.echarts6()
        },function(err){
          console.log(err);
        })
      },

      avgprice_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.avgprice_time = val
          vm.avgprive_fn(vm.avgprice_time)
        }

      },
      avgprive_fn(time){
        let vm = this
        //学院资产比例分析
        vm.$axios.request("post","basicEducationalStandard/average",{year:time},function(data){
          vm.money_avg_data = []
          for(let i = 0;i<data.result.length;i++){
            vm.money_avg_data.push({
              school:data.result[i].branch,
              teacher:data.result[i].tcount == undefined?'-':data.result[i].tcount+'人',
              student:data.result[i].scount == undefined?'-':data.result[i].scount+'人',
              avg:parseInt(data.result[i].avg)+'元'
            })
          }
        },function(err){
          console.log(err);
        })
      },


      /*本科生和留学生列表下拉菜单获取*/
      made_B_and_L_select(){
        let vm = this
        vm.$axios.request("post","teachConditionAnalyze/dormitoryBuildingList",{flag:'1'},function(data){
          vm.typeList = ['全部']
          for(let i=0;i<data.result.length;i++){
            vm.typeList.push(data.result[i].building)
          }
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","teachConditionAnalyze/dormitoryBuildingList",{flag:'2'},function(data){
          vm.typeList1 = ['全部']
          for(let i=0;i<data.result.length;i++){
            vm.typeList1.push(data.result[i].building)
          }
        },function(err){
          console.log(err);
        })
      },
      //学生用房
      student_C_fn(){
        let student_C = this.$echarts.init(document.getElementById("student_C"), 'customed');
        let option = {
            tooltip: {
              show: "true",
              trigger: 'item',
              backgroundColor: 'rgba(0,0,0,0.7)', // 背景
              padding: [8, 10], //内边距
              extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
              formatter: function(params) {
                if (params.seriesName == "总床位") {
                  return params.name + ' ： 共 ' + params.value + ' 个床位';
                }else{
                  return params.name + ' ： 占用 ' + params.value + ' 个床位';
                }
              },

            },
            grid: {
              borderWidth: 0,
              textStyle: {
                color: "#fff"
              }
            },
            xAxis: [{
              type: 'category',
              axisTick: {
                show: false
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#fff"
                }
              },
              axisLabel: {
                inside: false,
                textStyle: {
                  color: '#fff',
                  fontWeight: 'normal',
                  fontSize: '12',
                },
              },
              data: this.B_room_name,
            }, {
              type: 'category',
              axisLabel: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#fff"
                }
              },
              data: this.B_room_name,
            }],
            yAxis: {
              type: 'value',
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#fff"
                }
              },
              splitLine: {
                show: false,
              },
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontWeight: 'normal',
                  fontSize: '12',
                },
                formatter: '{value}',
              },
            },
            series: [{
              name: '占用床位',
              type: 'bar',
              itemStyle: {
                normal: {
                  show: true,
                  color:'#06C6FF',
                  barBorderRadius: 10,
                  borderWidth: 0,
                },
                emphasis: {
                  shadowBlur: 15,
                  shadowColor: 'rgba(1,1, 1, 0.7)'
                }
              },
              label:{
                normal:{
                  show: true,
                  position: 'insideTop',
                }
              },
              zlevel: 2,
              barWidth: '20%',
              data:  this.B_use_room,
            },
              {
                name: '总床位',
                type: 'bar',
                xAxisIndex: 1,
                zlevel: 1,
                itemStyle: {
                  normal: {
                    color: '#CBCECC',
                    borderWidth: 0,
                    shadowBlur: {
                      shadowColor: 'rgba(1,1, 1, 0.7)',
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowOffsetY: 2,
                    },
                  }
                },
                label:{
                  normal:{
                    show: true,
                    position: 'top'
                  }
                },
                barWidth: '30%',
                data:this.B_sum_room
              }
            ]
          }
        student_C.setOption(option)
      },
      student_C_init(){
        let vm = this
        vm.$axios.request("post","teachConditionAnalyze/localDormitoryOccupy",{},function(data){
          vm.B_sum_room = []
          vm.B_use_room = []
          vm.B_room_name = []
          for(let i = 0;i<data.result.length;i++){
            vm.B_sum_room.push(data.result[i].bedcount)
            vm.B_use_room.push(data.result[i].occupybedsum)
            vm.B_room_name.push(data.result[i].building)
          }
          vm.student_C_fn()
        },function(err){
          console.log(err);
        })
      },
      handleSizeChange(val) {
        var vm = this
        vm.loading = true
        vm.pageNum = val
        this.student_L_init_fn(this.pageNum,this.size,this.typeSelect_code)
      },
      handleCurrentChange(val) {
        var vm = this
        vm.loading = true
        vm.pageNum = val
        this.student_L_init_fn(this.pageNum,this.size,this.typeSelect_code)
      },
      typeChange(val){
        let  vm = this
        vm.pageNum = 1
        if(val == '全部'){
          vm.typeSelect_code = ''
          vm.typeSelect = val
        }else{
          vm.typeSelect_code = val
          vm.typeSelect = val
        }
        vm.loading = true
        this.student_L_init_fn(this.pageNum,this.size,this.typeSelect_code)
      },
      student_L_init_fn(page,size,use){
        let vm = this
        vm.$axios.request("post","teachConditionAnalyze/localDormitoryList", {
          page:page,
          pageSize:size,
          building:use
        },function(data){
          vm.tableData = []
          vm.total_count = parseInt(data.totalCount)
          for(let i=0;i<data.result.length;i++){
            vm.tableData.push({
              use:data.result[i].remark,
              name:data.result[i].room,
              big_name:data.result[i].building,
              count:data.result[i].bed_count=='null'?'未知':data.result[i].bed_count,
              use_count:data.result[i].occupy_bed=='null'?'0':data.result[i].occupy_bed,
              no_use:data.result[i].surplus_bed_sum,
            })
          }
          vm.$nextTick(function() {
            vm.loading = false
          })
        },function(err){
          console.log(err);
        })
      },
      //留学生用房
      student_L_fn(){
        let student_L = this.$echarts.init(document.getElementById("student_L"), 'customed');
        let option = {
          tooltip: {
            show: "true",
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0.7)', // 背景
            padding: [8, 10], //内边距
            extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
            formatter: function(params) {
              if (params.seriesName == "总床位") {
                return params.name + ' ： 共 ' + params.value + ' 个床位';
              }else{
                return params.name + ' ： 占用 ' + params.value + ' 个床位';
              }
            },

          },
          grid: {
            borderWidth: 0,
            textStyle: {
              color: "#fff"
            }
          },
          xAxis: [{
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: '12',
              },
            },
            data: this.L_room_name,
          }, {
            type: 'category',
            axisLabel: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff"
              }
            },
            data: this.L_room_name,
          }],
          yAxis: {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff"
              }
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: '12',
              },
              formatter: '{value}',
            },
          },
          series: [{
            name: '占用床位',
            type: 'bar',
            itemStyle: {
              normal: {
                show: true,
                color:'#0DFFBA',
                barBorderRadius: 10,
                borderWidth: 0,
              },
              emphasis: {
                shadowBlur: 15,
                shadowColor: 'rgba(1,1, 1, 0.7)'
              }
            },
            label:{
              normal:{
                show: true,
                position: 'insideTop',
              }
            },
            zlevel: 2,
            barWidth: '20%',
            data:  this.L_use_room,
          },
            {
              name: '总床位',
              type: 'bar',
              xAxisIndex: 1,
              zlevel: 1,
              itemStyle: {
                normal: {
                  color: '#CBCECC',
                  borderWidth: 0,
                  shadowBlur: {
                    shadowColor: 'rgba(1,1, 1, 0.7)',
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 2,
                  },
                }
              },
              label:{
                normal:{
                  show: true,
                  position: 'top'
                }
              },
              barWidth: '30%',
              data:this.L_sum_room
            }
          ]
        }
        student_L.setOption(option)
      },
      student_L_init(){
        let vm = this
        vm.$axios.request("post","teachConditionAnalyze/foreinDormitoryOccupy",{},function(data){
          vm.L_sum_room = []
          vm.L_use_room = []
          vm.L_room_name = []
          for(let i = 0;i<data.result.length;i++){
            vm.L_sum_room.push(data.result[i].bedcount)
            vm.L_use_room.push(data.result[i].occupybedsum)
            vm.L_room_name.push(data.result[i].building)
          }
          vm.student_L_fn()
        },function(err){
          console.log(err);
        })
      },
      handleSizeChange1(val) {
        var vm = this
        vm.loading1 = true
        vm.pageNum1 = val
        vm.student_L_init_fn1(vm.pageNum1,vm.size1,vm.typeSelect_code1)
      },
      handleCurrentChange1(val) {
        var vm = this
        vm.loading1 = true
        vm.pageNum1 = val
        vm.student_L_init_fn1(vm.pageNum1,vm.size1,vm.typeSelect_code1)
      },
      typeChange1(val){
        let  vm = this
        vm.pageNum1 = 1
        if(val == '全部'){
          vm.typeSelect_code1 = ''
          vm.typeSelect1 = val
        }else{
          vm.typeSelect_code1 = val
          vm.typeSelect1 = val
        }
        vm.loading1 = true
        vm.student_L_init_fn1(vm.pageNum1,vm.size1,vm.typeSelect_code1)
      },
      student_L_init_fn1(page,size,use){
        let vm = this
        vm.$axios.request("post","teachConditionAnalyze/foreinDormitoryList", {
          page:page,
          pageSize:size,
          building:use
        },function(data){
          vm.tableData1 = []
          vm.total_count1 = parseInt(data.totalCount)
          for(let i=0;i<data.result.length;i++){
            vm.tableData1.push({
              room_type:data.result[i].fjlxmc,
              is_use:data.result[i].sfky,
              room_number:data.result[i].fjh,
              room_c:data.result[i].lc=='null'?'未知':data.result[i].lc,
              room_name:data.result[i].sslmc=='null'?'未知':data.result[i].sslmc,
              room_sex:data.result[i].xbmc=='null'?'未知':data.result[i].xbmc,
              room_BZ:data.result[i].occupybed=='null'?'无':data.result[i].occupybed,
              room_footer:data.result[i].dslc=='null'?'未知':data.result[i].dslc,
              room_count:data.result[i].cws=='null'?'未知':data.result[i].cws,
              room_from:data.result[i].fjgs=='null'?'0':data.result[i].fjgs,
            })
          }
          vm.$nextTick(function() {
            vm.loading1 = false
          })
        },function(err){
          console.log(err);
        })
      },

      //教学用房
      handleSizeChange2(val) {
        var vm = this
        vm.loading2 = true
        vm.pageNum2 = val
        this.teach_init_fn(this.pageNum2,this.size2,this.typeSelect_code2)
      },
      handleCurrentChange2(val) {
        var vm = this
        vm.loading2 = true
        vm.pageNum2 = val
        this.teach_init_fn(this.pageNum2,this.size2,this.typeSelect_code2)
      },
      typeChange2(val){
        let  vm = this
        vm.pageNum2 = 1
        if(val == '全部'){
          vm.typeSelect_code2 = ''
          vm.typeSelect2 = val
        }else{
          vm.typeSelect_code2 = val
          vm.typeSelect2 = val
        }
        vm.loading2 = true
        this.teach_init_fn(this.pageNum2,this.size2,this.typeSelect_code2)
      },
      teach_init_fn(page,size,use){
        let vm = this
        vm.$axios.request("post","teachConditionAnalyze/classRoomList", {
          page:page,
          pageSize:size,
          use:use
        },function(data){
          vm.tableData2 = []
          vm.total_count2 = parseInt(data.totalCount)
          for(let i=0;i<data.result.length;i++){
            vm.tableData2.push({
              order:data.result[i].jzwbh,
              name:data.result[i].name,
              big_name:data.result[i].jxlmc,
              use:data.result[i].use=='null'?'未知':data.result[i].use,
              ks_num:parseInt(data.result[i].ksrs),
              sum_num:parseInt(data.result[i].skrs),
            })
          }
          vm.$nextTick(function() {
            vm.loading2 = false
          })
        },function(err){
          console.log(err);
        })
      },

      //校园网建设新增设备
      netMake_fn(){
        let netMake = this.$echarts.init(document.getElementById("netMake"), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            show:false,
            orient: 'vertical',
            left: 'left',
            data: this.natMake_name
          },
          series : [
            {
              name: '设备名称',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.natMake_count,
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
        netMake.setOption(option)
      },
      add_netMake_fn(){
        let vm = this
        let add_netMake = this.$echarts.init(document.getElementById("add_netMake"), 'customed');
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              textStyle: {
                color: "#fff"
              }
            },
          },
          legend: {
            data: ['原有设备数', '新增设备数', '总设备数']
          },
          calculable: true,
          xAxis: [{
            type: "category",
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0,

            },
            data: this.timeList,
          }],
          yAxis: [{
            type: "value",
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,

            },
            splitArea: {
              show: false
            },

          }],
          "series": [{
            "name": "原有设备数",
            "type": "bar",
            "stack": "总量",
            "barMaxWidth": 35,
            "barGap": "10%",
            "data":this.oldList,
          },
            {
              "name": "新增设备数",
              "type": "bar",
              "stack": "总量",
              "data": this.newList
            }, {
              "name": "总设备数",
              "type": "line",
              "stack": "总量",
              symbolSize:10,
              symbol:'circle',
              "data":this.sumList
            },
          ]
        }
        add_netMake.setOption(option)
        add_netMake.on('click',function(params){
          vm.natMake_time = params.name
          vm.netMake_init(vm.natMake_time)
        })
      },
      netMake_init(year){
        let vm = this
        vm.$axios.request("post","BYAnalyze/schoolNetwork", {year:year},function(data){
          vm.natMake_name = []
          vm.natMake_count = []
          for(let i=0;i<data.result.length;i++){
            if(data.result[i].name!=='其他'){
              vm.natMake_name.push(data.result[i].name)
              vm.natMake_count.push({
                name:data.result[i].name,
                value:data.result[i].numbers
              })
            }
          }
          vm.netMake_fn()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","BYAnalyze/equipmentList", {year:year},function(data){
          vm.tableData_list = []
          for(let i = 0; i<data.result.length; i++){
            vm.tableData_list.push({
              name:data.result[i].name,
              all:data.result[i].count,
              add:data.result[i].newcount
            })
          }
        },function(err){
          console.log(err);
        })
      },
      add_netMake_init(start,end){
        let vm = this
        vm.$axios.request("post","BYAnalyze/equipmentTrend", {startYear:start,endYear:end},function(data){
          vm.timeList = []
          vm.sumList = []
          vm.oldList = []
          vm.newList = []
          for(let i=0;i<data.totalList.length;i++){
             vm.timeList.push(data.totalList[i].year)
            vm.sumList.push(data.totalList[i].numbers)
          }
          for(let j=0;j<data.upList.length;j++){
            vm.newList.push(data.upList[j].numbers)
          }
          for(let k=0;k<data.oldList.length;k++){
            vm.oldList.push(data.oldList[k].numbers)
          }
          vm.add_netMake_fn()
      })
      },
      netMake_S_change(val){
        let vm =  this
        if(val == undefined){
          return
        }else if(val >this.netMake_N){
          if(this.netMake_N!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.netMake_S = ''
            return
          }else{
            this.netMake_S = val
          }
        }else{
          vm.netMake_S = val
          this.add_netMake_init(this.netMake_S,this.netMake_N)
        }

      },
      netMake_N_change(val){
        let vm =  this
        if(val == undefined){
          return
        }else if(val<this.netMake_S){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.netMake_N = ''
          return
        }else{
          vm.netMake_N = val
          vm.natMake_time = val
          this.netMake_init(this.netMake_N)
          this.add_netMake_init(this.netMake_S,this.netMake_N)
        }


      },

      //校园电教设备
      netMake_fn1(){
        let netMake1 = this.$echarts.init(document.getElementById("netMake1"), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            show:false,
            orient: 'vertical',
            left: 'left',
            data: this.natMake_name1
          },
          series : [
            {
              name: '设备名称',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.natMake_count1,
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
        netMake1.setOption(option)
      },
      add_netMake_fn1(){
        let vm = this
        let add_netMake1 = this.$echarts.init(document.getElementById("add_netMake1"), 'customed');
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              textStyle: {
                color: "#fff"
              }
            },
          },
          legend: {
            data: ['原有设备数', '新增设备数', '总设备数']
          },
          calculable: true,
          xAxis: [{
            type: "category",
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0,

            },
            data: this.timeList1,
          }],
          yAxis: [{
            type: "value",
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,

            },
            splitArea: {
              show: false
            },

          }],
          "series": [{
            "name": "原有设备数",
            "type": "bar",
            "stack": "总量",
            "barMaxWidth": 35,
            "barGap": "10%",
            "data":this.oldList1,
          },
            {
              "name": "新增设备数",
              "type": "bar",
              "stack": "总量",
              "data": this.newList1
            }, {
              "name": "总设备数",
              "type": "line",
              "stack": "总量",
              symbolSize:10,
              symbol:'circle',
              "data":this.sumList1
            },
          ]
        }
        add_netMake1.setOption(option)
        add_netMake1.on('click',function(params){
          vm.natMake_time1 = params.name
          vm.netMake_init1(vm.natMake_time1)
        })
      },
      netMake_init1(year){
        let vm = this
        vm.$axios.request("post","BYAnalyze/electrifiedEDUClassify", {year:year},function(data){
          vm.natMake_name1 = []
          vm.natMake_count1 = []
          for(let i=0;i<data.result.length;i++){
            if(data.result[i].name!=='其他'){
              vm.natMake_name1.push(data.result[i].name)
              vm.natMake_count1.push({
                name:data.result[i].name,
                value:data.result[i].numbers
              })
            }
          }
          vm.netMake_fn1()
        },function(err){
          console.log(err);
        })
        vm.$axios.request("post","BYAnalyze/electrifiedEDUList", {year:year},function(data){
          vm.tableData_list1 = []
          for(let i = 0; i<data.result.length; i++){
            vm.tableData_list1.push({
              name:data.result[i].name,
              all:data.result[i].count,
              add:data.result[i].newcount
            })
          }
        },function(err){
          console.log(err);
        })

      },
      add_netMake_init1(start,end){
        let vm = this
        vm.$axios.request("post","BYAnalyze/electrifiedEDUTrend", {startYear:start,endYear:end},function(data){
          vm.timeList1 = []
          vm.sumList1 = []
          vm.oldList1 = []
          vm.newList1 = []
          for(let i=0;i<data.totalList.length;i++){
            vm.timeList1.push(data.totalList[i].year)
            vm.sumList1.push(data.totalList[i].numbers)
          }
          for(let j=0;j<data.upList.length;j++){
            vm.newList1.push(data.upList[j].numbers)
          }
          for(let k=0;k<data.oldList.length;k++){
            vm.oldList1.push(data.oldList[k].numbers)
          }
          vm.add_netMake_fn1()
        })
      },
      netMake_S1_change(val){
        let vm =  this
        if(val == undefined){
          return
        }else if(val >this.netMake_N1){
          if(this.netMake_N1!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.netMake_S1 = ''
            return
          }else{
            this.netMake_S1 = val
          }
        }else{
          vm.netMake_S1 = val
          this.add_netMake_init1(this.netMake_S1,this.netMake_N1)
        }

      },
      netMake_N1_change(val){
        let vm =  this
        if(val == undefined){
          return
        }else if(val<this.netMake_S1){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.netMake_N1 = ''
          return
        }else{
          vm.netMake_N1 = val
          vm.natMake_time1 = val
          this.netMake_init1(this.netMake_N1)
          this.add_netMake_init1(this.netMake_S1,this.netMake_N1)
        }


      },


      //馆藏图书分类
      book_init_fn(){
        let vm = this
        vm.$axios.request("post","softPower/bookKindAnalyze",{},function(data){
          for(let i=0;i<data.result.length;i++){
            vm.book_type.push(data.result[i].type)
            vm.sum += parseInt(data.result[i].count)
            vm.book_count.push({
              name:data.result[i].type,
              value:data.result[i].count
            })
          }
          vm.book_echart()
        },function(err){
          console.log(err);
        })
      },
      book_echart(){
        let book = this.$echarts.init(document.getElementById("book"), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            itemGap:12,
            data: this.book_type
          },
          series : [
            {
              name: '图书类别',
              type: 'pie',
              radius : '55%',
              center: ['50%', '65%'],
              data:this.book_count,
              label: {
                normal: {
                  formatter: '{b}:{c}本'
                },

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
        book.setOption(option)
      },
      //图书馆图书信息分析
      //图书信息
      TS_msg_fn(){
        let TS_msg = this.$echarts.init(document.getElementById('TS_msg'), 'customed');
        let option = {
          color:['#A9FBBA'],
          title: {
            text: '单位(本)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}本"
          },
          legend: {
            data: ['图书类别']
          },
          grid: {
            left: '3%',
            right: '10%',
            bottom: '10%',
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
            data: this.msg_name
          },
          series: [{
            name: '图书类别',
            type: 'bar',
            barWidth:15,
            data: this.msg_count,
            label:{
              normal:{
                show: true,
                position: 'right'
              }
            },
          }]
        };
        TS_msg.setOption(option);
      },
      //图书读者
      TS_person_fn(){
        let TS_person = this.$echarts.init(document.getElementById('TS_person'), 'customed');
        let option = {
          color:['#A9FBBA'],
          title: {
            text: '单位(本)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}本"
          },
          legend: {
            data: ['图书读者']
          },
          grid: {
            left: '3%',
            right: '10%',
            bottom: '10%',
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
            data: this.read_name
          },
          series: [{
            name: '图书读者',
            type: 'bar',
            barWidth:15,
            data: this.read_count,
            label:{
              normal:{
                show: true,
                position: 'right'}
            },
          }]
        };
        TS_person.setOption(option);
      },
      //图书借阅
      TS_look_fn(){
        let TS_look = this.$echarts.init(document.getElementById('TS_look'), 'customed');
        let option = {
          color:['#A9FBBA'],
          title: {
            text: '单位(次)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}本"
          },
          legend: {
            data: ['借阅书籍']
          },
          grid: {
            left: '3%',
            right: '10%',
            bottom: '10%',
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
            data: this.borrow_name
          },
          series: [{
            name: '借阅书籍',
            type: 'bar',
            barWidth:15,
            data: this.borrow_count,
            label:{
              normal:{
                show: true,
                position: 'right'}
            },
          }]
        };
        TS_look.setOption(option);
      },
      //初始化数据展现
      TS_init_fn(start,end){
        var vm = this
        //获取图书读者
        vm.$axios.request("post","oneCard/bookReaderTop5",{startYear:start,endYear:end},function(data){
          vm.read_name = []
          vm.read_count = []
          for(var i=data.result.length-1;i>=0;i--){
            vm.read_name.push(data.result[i].dzxm)
            vm.read_count.push(data.result[i].count)
          }
          vm.TS_person_fn()
        },function(err){
          console.log(err);
        })
        //获取图书借阅
        vm.$axios.request("post","oneCard/borrowBookTop5",{startYear:start,endYear:end},function(data){
          vm.borrow_name = []
          vm.borrow_count = []
          for(var i=data.result.length-1;i>=0;i--){
            vm.borrow_name.push(data.result[i].tm)
            vm.borrow_count.push(data.result[i].count)
          }
          vm.TS_look_fn()
        },function(err){
          console.log(err);
        })

        //获取图书信息
        vm.$axios.request("post","oneCard/bookMessageTop5",{startYear:start,endYear:end},function(data){
          vm.msg_name = []
          vm.msg_count = []
          for(var i=data.result.length-1;i>=0;i--){
            vm.msg_name.push(data.result[i].tm)
            vm.msg_count.push(data.result[i].count)
          }
          vm.TS_msg_fn()
        },function(err){
          console.log(err);
        })
      },
      //时间变化
      TS_start_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.TS_end_time){
          if(this.TS_end_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.TS_start_time = ''
            return
          }else{
            vm.$message.error('请选择结束时间！');
            this.TS_start_time = val
          }
        }else{
          vm.TS_start_time = val
          vm.TS_init_fn(vm.TS_start_time,vm.TS_end_time)
        }
      },
      TS_end_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.TS_start_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.TS_end_time = ''
          return
        }else {
          if (vm.TS_start_time == '') {
            vm.$message.error('请选择开始时间！');
            return
          } else {
            vm.TS_end_time = val
            vm.TS_init_fn(vm.TS_start_time,vm.TS_end_time)
          }
        }

      },
    },
    mounted () {
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.student_L_fn()
    },
    created(){
      window.scrollTo(0,0);
      let vm = this;
      vm.make_time()
      /*//教学科研仪器分析
      vm.$axios.request("post","basicEducationalStandard/instrumentAnalyze",{},function(data){
        for(let i = 0;i<data.result.length;i++){
          vm.teach_year.push(data.result[i].year)
          vm.teach_money.push(data.result[i].money)
        }
        vm.echarts1()
      },function(err){
        console.log(err);
      })*/
      //学院人均资产列表
      vm.avgprive_fn(vm.avgprice_time)

      //学院资产比例分析
      vm.$axios.request("post","basicEducationalStandard/branchAssetAnalyze",{year:vm.school_money_time},function(data){
        for(let i = 0;i<data.result.length;i++){
          vm.school_name.push(data.result[i].branch)
          vm.school_sum.push(data.result[i].sum)
        }
        vm.school_money()
      },function(err){
        console.log(err);
      })


      //初始化教学设备明细
      vm.$axios.request("post","basicEducationalStandard/equipmentDetail",{year:vm.teacher_time,branch:vm.schoolSelect,page:vm.pageNum3,pageSize:vm.size3},function(data){
        vm.total_count3 = parseInt(data.totalCount)
        for(var i=0;i<data.result.length;i++){
          vm.tableData3.push({
            use_name: data.result[i].receive_unit_name,
            yq_name: data.result[i].name,
            type: data.result[i].model,
            guige: data.result[i].format,
            unit: data.result[i].unit_price,
            made: data.result[i].manufactor,
            made_time: data.result[i].factory_date,
            use_time: data.result[i].purchase_date,
            number: data.result[i].numbers,
            use_type: data.result[i].status,
            use_direction: data.result[i].use_direction,
            sum_money: data.result[i].total_price,
          })
        }
      },function(err){
        console.log(err);
      })

      //历年资产趋势
      vm.history_fn(vm.history_start_time,vm.history_end_time,vm.schoolSelect1)

      /*本科生和留学生列表下拉菜单获取*/
      this.made_B_and_L_select()

      //学生用房
      this.student_C_init()
      this.student_L_init_fn(this.pageNum,this.size,this.typeSelect_code)
      //留学生用房
      this.student_L_init()
      this.student_L_init_fn1(this.pageNum1,this.size1,this.typeSelect_code1)
      //教学用房
      this.teach_init_fn(this.pageNum2,this.size2,this.typeSelect_code2)
      //校园网建设设备
      this.netMake_init(this.netMake_N)
      this.add_netMake_init(this.netMake_S,this.netMake_N)

      //校园网电教设备
      this.netMake_init1(this.netMake_N1)
      this.add_netMake_init1(this.netMake_S1,this.netMake_N1)
      //图书馆信息
      vm.book_init_fn()
      vm.TS_init_fn(vm.TS_start_time,vm.TS_end_time)
    }

  }
</script>
<style lang="scss">

  .table_four{
    width: 24%;
    margin: 0.2%;
    td{
      width: 23%;
    }
  }

</style>
