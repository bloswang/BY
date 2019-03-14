<template>
    <div class="w">
      <el-breadcrumb separator=">" class="navigation">
        <el-breadcrumb-item :to="{ path: '/home/school' }">北语校情</el-breadcrumb-item>
        <el-breadcrumb-item>学生基本情况详情</el-breadcrumb-item>
      </el-breadcrumb>


      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg">
          <el-tabs  v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="本科生" name="first">
          <!--本科生历年招生趋势-->
          <el-row type="flex" justify="space-around">
            <el-col :span="24" class="ec_bg">
              <h5 class="ec_h5">
                本科生历年招生趋势
                <div class="ec_h5_data">
                  <el-date-picker
                    class="select_width"
                    size="mini"
                    v-model="student_start_time"
                    type="year"
                    format="yyyy"
                    @change="student_start_time_change"
                    placeholder="选择时间">
                  </el-date-picker>
                  至
                  <el-date-picker
                    class="select_width"
                    size="mini"
                    v-model="student_end_time"
                    type="year"
                    format="yyyy"
                    @change="student_end_time_change"
                    placeholder="选择时间">
                  </el-date-picker>
                </div>

              </h5>
              <div class="ec_height" id="student_B">
              </div>
            </el-col>
          </el-row>
          <!--本科生历年补助趋势-->
          <el-row type="flex" justify="space-around">
            <el-col :span="24" class="ec_bg">
              <h5 class="ec_h5">
                本科生历年补助趋势
                <div class="ec_h5_data">
                  <el-date-picker
                    class="select_width"
                    size="mini"
                    v-model="money_start_time"
                    type="year"
                    format="yyyy"
                    @change="money_start_time_change"
                    placeholder="选择时间">
                  </el-date-picker>
                  至
                  <el-date-picker
                    class="select_width"
                    size="mini"
                    v-model="money_end_time"
                    type="year"
                    format="yyyy"
                    @change="money_end_time_change"
                    placeholder="选择时间">
                  </el-date-picker>
                  <el-select
                    v-model="majorSelect2"
                    placeholder="请选择"
                    size="mini"
                    class="major-select"
                    @change="majorChange2">
                    <el-option
                      v-for="item in majorList2"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-select
                    v-model="moneySelect"
                    style="margin-right: 0"
                    placeholder="请选择"
                    size="mini"
                    class="major-select"
                    @change="moneySelectChange">
                    <el-option
                      v-for="item in moneyList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
              </h5>
              <div class="ec_height" id="money_B">
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around" style="margin-top: -10px">
            <el-col :span="24" class="ec_bg">
              <div class="tab_warPer" style="margin-bottom: 20px">
                <table class="table table_four">
                  <tr>
                    <td class="black">专业</td>
                  </tr>
                  <tr>
                    <td>{{majorSelect2}}</td>
                  </tr>
                </table>
                <table class="table table_four">
                  <tr>
                    <td class="black">总金额</td>
                  </tr>
                  <tr>
                    <td>{{sum_money}}元</td>
                  </tr>
                </table>
                <table class="table table_four">
                  <tr>
                    <td class="black ">总人数</td>
                  </tr>
                  <tr>
                    <td>{{sum_count}}人</td>
                  </tr>
                </table>
                <table class="table table_four">
                  <tr>
                    <td class="black">{{moneySelect}}</td>
                  </tr>
                  <tr>
                    <td><a href="javascript:;" @click="open_money" class="blue">查看获奖人员</a></td>
                  </tr>
                </table>
                <el-dialog
                  title='获奖人员列表'
                  :visible.sync="dialogVisible"
                  width="60%"
                  :before-close="handleClose">
                  <div class="ec_height" id="policy">
                    <el-table
                      v-loading="loading1"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)"
                      :data="student_money_Data"
                      style="width: 100%">
                      <el-table-column prop="name" align="center"  label="姓名" class-name="elTableName">
                      </el-table-column>
                      <el-table-column prop="sex" align="center" label="性别" class-name="elTableName">
                      </el-table-column>
                      <el-table-column prop="age" align="center" label="年龄" class-name="elTableName">
                      </el-table-column>
                      <el-table-column prop="money" align="center" label="获奖金额" class-name="elTableName">
                      </el-table-column>
                      <el-table-column prop="time" align="center" label="获奖时间" class-name="elTableName">
                      </el-table-column>
                      <el-table-column prop="school" align="center" width="200" label="学院" class-name="elTableName">
                      </el-table-column>
                      <el-table-column prop="major" align="center" width="200" label="专业" class-name="elTableName">
                      </el-table-column>
                      <el-table-column prop="place" align="center" label="地区" class-name="elTableName">
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="block"  style="width:300px;margin:0 auto;margin-top: 50px">
                    <el-pagination
                      @size-change="handleSizeChange1"
                      @current-change="handleCurrentChange1"
                      :current-page.sync= pageNum1
                      :page-size= size1
                      layout="total, prev, pager, next"
                      :total=total_count1>
                    </el-pagination>
                  </div>
                  <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="money_close_btn">确 定</el-button>
              </span>
                </el-dialog>
              </div>
            </el-col>
          </el-row>
          <!--本科生历年考研趋势-->
          <el-row type="flex" justify="space-around">
            <el-col :span="24" class="ec_bg">
              <h5 class="ec_h5">
                本科生毕业去向详情
                <div class="ec_h5_data">
                  <el-date-picker
                    class="select_width"
                    size="mini"
                    v-model="up_start_time"
                    type="year"
                    format="yyyy"
                    @change="up_start_time_change"
                    placeholder="选择时间">
                  </el-date-picker>
                  至
                  <el-date-picker
                    class="select_width"
                    size="mini"
                    v-model="up_end_time"
                    type="year"
                    format="yyyy"
                    @change="up_end_time_change"
                    placeholder="选择时间">
                  </el-date-picker>
                  <el-select
                    v-model="majorSelect3"
                    placeholder="请选择"
                    size="mini"
                    class="major-select"
                    @change="majorChange3">
                    <el-option
                      v-for="item in majorList3"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>

              </h5>
              <div class="ec_height" id="up_student">
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around" style="margin-top: -10px">
            <el-col :span="24" class="ec_bg">
              <div class="tab_warPer" style="margin-bottom: 50px">
                <table class="table table_ten" style="width: 14%">
                  <tr>
                    <td class="black">学院名称</td>
                  </tr>
                  <tr>
                    <td>
                      {{majorSelect3}}
                    </td>
                  </tr>
                </table>
                <table v-for="list in listData" class="table table_ten" style="width: 14%">
                  <tr>
                    <td class="black">{{list.name}}</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="javascript:;"class="blue" @click="openTable(list.name)">{{list.value}}</a>
                    </td>
                  </tr>
                </table>
                <el-dialog
                  :title='out_type'
                  :visible.sync="dialogVisible1"
                  width="75%"
                  :before-close="handleClose1">
                  <div class="ec_height" id="policy1">
                    <el-table
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)"
                      :data="studentData"
                      style="width: 100%">
                      <el-table-column prop="name" align="center" label="姓名" class-name="elTableName">
                      </el-table-column>
                      <el-table-column prop="sex" align="center" label="性别" class-name="elTableName">
                      </el-table-column>
                      <el-table-column prop="age" align="center" label="年龄" class-name="elTableName">
                      </el-table-column>
                      <el-table-column prop="time" align="center" label="毕业时间" class-name="elTableName">
                      </el-table-column>
                      <el-table-column prop="major" align="center" width="200"  label="专业" class-name="elTableName">
                      </el-table-column>
                      <el-table-column prop="school" align="center" width="200"  label="所在院校" class-name="elTableName">
                      </el-table-column>
                      <el-table-column prop="where" align="center" width="200"  label="毕业去向" class-name="elTableName">
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="block"  style="width:300px;margin:0 auto;margin-top: 50px">
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
                <el-button type="primary" @click="close_btn">确 定</el-button>
              </span>
                </el-dialog>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="港澳台学生" name="second">
          <el-row type="flex" justify="space-around">
            <el-col :span="24" class="ec_bg">
              <h5 class="ec_h5">
                港澳台历年招生趋势
                <div class="ec_h5_data">
                  <el-date-picker
                    class="select_width"
                    size="mini"
                    v-model="GAT_start_time"
                    type="year"
                    format="yyyy"
                    @change="GAT_start_time_change"
                    placeholder="选择时间">
                  </el-date-picker>
                  至
                  <el-date-picker
                    class="select_width"
                    size="mini"
                    v-model="GAT_end_time"
                    type="year"
                    format="yyyy"
                    @change="GAT_end_time_change"
                    placeholder="选择时间">
                  </el-date-picker>
                </div>
              </h5>
              <div class="ec_height" id="student_GAT">
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around" style="margin-top: -10px;">
            <el-col :span="24" class="ec_bg">
              <table v-for="list in GAT_list" class="table table_ten" style="width: 14%;">
                <tr>
                  <td class="black">{{list.name}}</td>
                </tr>
                <tr>
                  <td>{{list.value}}</td>
                </tr>
              </table>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-around">
            <el-col :span="12" class="ec_bg">
              <h5 class="ec_h5">
                男女比例
                <div class="ec_h5_data">
                  <el-date-picker
                    class="select_width"
                    size="mini"
                    v-model="GAT_sex_time"
                    type="year"
                    format="yyyy"
                    @change="GAT_sex_time_change"
                    placeholder="选择时间">
                  </el-date-picker>
                </div>
              </h5>
              <div class="ec_height" id="GAT_sex">
              </div>
            </el-col>
            <el-col :span="12" class="ec_bg">
              <h5 class="ec_h5">
                专业TOP5
                <div class="ec_h5_data">
                  <el-date-picker
                    class="select_width"
                    size="mini"
                    v-model="GAT_major_time"
                    type="year"
                    format="yyyy"
                    @change="GAT_major_time_change"
                    placeholder="选择时间">
                  </el-date-picker>
                </div>
              </h5>
              <div class="ec_height" id="GAT_major">
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
        </el-col>
      </el-row>
      <!--教学教风-->
      <!--<el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5">
            教风学风
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="jfxf_time"
                type="year"
                format="yyyy"
                @change="jfxf_time_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="tab_warPer" style="margin-bottom: 20px">
            <table class="table table_four" v-for="item in JFXF_list">
              <tr>
                <td class="black">{{item.name}}</td>
              </tr>
              <tr>
                <td>{{item.value}}</td>
              </tr>
            </table>
          </div>
        </el-col>
      </el-row>-->
      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5">
            学生管理人员
          </h5>
          <div class="ec_height" id="positive">
            <el-table
              v-loading="loading_GL"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"

              :data="XSGL_list"
              align="center"
              style="width: 100%;overflow: auto"
              :show-header='true'>
              <el-table-column prop="name" label="姓名"  class-name="elTableName">
              </el-table-column>
              <el-table-column prop="six" label="性别"  class-name="elTableName">
              </el-table-column>
              <el-table-column prop="title" label="民族" class-name="elTableName">
              </el-table-column>
              <el-table-column prop="major" label="学位" class-name="elTableName">
              </el-table-column>
              <el-table-column prop="school" label="学院"  class-name="elTableName">
              </el-table-column>
              <el-table-column prop="time" label="来校日期" class-name="elTableName">
              </el-table-column>
            </el-table>
          </div>
          <div class="block"  style="width:300px;margin: 30px auto;">
            <el-pagination
              @size-change="handleSizeChange_GL"
              @current-change="handleCurrentChange_GL"
              :current-page.sync= pageNum_GL
              :page-size= size_GL
              layout="total, prev, pager, next"
              :total=total_count_GL>
            </el-pagination>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5">
            师生比例分析
            <div class="ec_h5_data" style="float: right;">
              <el-date-picker
                class="select_width"
                align="right"
                size='mini'
                type="year"
                format="yyyy"
                v-model="S_T_time"
                @change="S_T_time_change"
                placeholder="选择年">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="teacher_student">
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5">
            学生专业分析
            <div class="ec_h5_data" style="width: 55%">
              <el-radio-group v-model="student_type" @change="student_change" size="small" style="margin: 0 auto">
                <el-radio-button label="本科生"></el-radio-button>
                <el-radio-button label="研究生"></el-radio-button>
                <el-radio-button label="留学生"></el-radio-button>
              </el-radio-group>
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
      </el-row>
    </div>
</template>

<script>
  import time from '../../config/timeFormat'
    export default {
      data() {
        return {
          activeName: 'first',
///////////////////////////////////////////////////////////////////////////////////////////////
          student_start_time:'2007',
          student_end_time:'2017',
          student_date:[],
          BKS_count:[],
          //本科生历年补助趋势
          money_start_time:'2008',
          money_end_time:'2017',
          majorSelect2:'全部',
          majorSelect2_code:'',
          majorList2:[
            '全部',
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
          moneySelect:'奖学金',
          money_code:'1',
          moneyList:['奖学金','助学金','贷款','困难补助'],
          dialogVisible:false,
          student_money_Data: [],
          sum_count:0,
          sum_money:0,
          pageNum1:1,
          size1:8,
          total_count1:0,
          loading1:true,

///////////////////////////////////////////////////////////////////////////////////////////////

          //本科生毕业去向详情
          up_start_time:'2011',
          up_end_time:'2017',
          majorSelect3:'全部',
          majorSelect3_code:'',
          majorList3:['全部'],
          dialogVisible1:false,
          listData: [],
          studentData: [],
          out_type:'',
          up_time:[],
          up_count:[],
          out_count:[],
          nb_count:[],
          list_code:'1',
          pageNum:1,
          size:8,
          total_count:0,
          loading:true,
///////////////////////////////////////////////////////////////
          //港澳台数据
          GAT_start_time:'2007',
          GAT_end_time:'2017',
          GAT_list:[],
          GAT_year:[],
          GAT_count:[],

          GAT_sex_time:'2017',
          GAT_sex_type:[],
          GAT_sex_count:[],

          GAT_major_time:'2017',
          GAT_major_type:[],
          GAT_major_count:[],


          jfxf_time:'',
          JFXF_list:[
            {name:'学校集体荣誉',value:'10个'},
            {name:'优秀班级',value:'25个'},
            {name:'优秀本科生',value:'100个'},
          ],

          //学生管理人员
          loading_GL:true,
          pageNum_GL:1,
          size_GL:8,
          total_count_GL:0,
          XSGL_list:[],
          //师生比例
          sum:0,
          school_count:[],
          teacher_count:[],
          student_count:[],
          S_T_time:'2017',

          //学生专业分析
          student_type:'本科生',
          student_table:[],
          student_type_data:[],
          link_data:[]
        };


      },
      methods: {
        make_time(){
          let vm = this
          vm.student_start_time = time.year - 10 + ''
          vm.student_end_time = time.year
          vm.money_start_time = time.year - 10 + ''
          vm.money_end_time = time.year
          vm.up_start_time = time.year - 5 + ''
          vm.up_end_time = time.year
          vm.GAT_start_time = time.year - 10 + ''
          vm.GAT_end_time = time.year
          vm.GAT_sex_time = time.year + ''
          vm.GAT_major_time = time.year  + ''
          vm.S_T_time = time.year
        },
        handleClick(tab) {
          let vm = this
          //港澳台tab渲染
          if(tab.index ==1){
            /*let student_GAT = document.getElementById('student_GAT')
            student_GAT.style.height = '400px'*/
            setTimeout(function(){
              vm.GAT_init_fn(vm.GAT_start_time,vm.GAT_end_time)
              vm.GAT_sex_fn(vm.GAT_sex_time)
              vm.GAT_major_fn(vm.GAT_major_time)
            },10)

          }
        },
        /*动态获取下拉菜单*/
        make_select(){
          let vm = this
          vm.$axios.request("post","staff/branches",{flag:'1'},function(data){
            for(let i=0;i<data.result.length;i++){
              vm.majorList3.push(data.result[i].branch)
            }
          },function(err){
            console.log(err);
          })
        },
//////////////////////////本科学生相关函数//////////////////////////////////////////////
        //本科生历年招生人数趋势相关函数
        student_B_fn(){
          let student_B = this.$echarts.init(document.getElementById('student_B'), 'customed');
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
              data: ['本科生人数']
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
              name: '本科生人数',
              type: 'line',
              stack: '总量',
              data: this.BKS_count
            }],
            label: {
              normal: {
                show: true,
                position:'right',
              },
            },
          };
          student_B.setOption(option);
        },
        student_start_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else if(val >this.student_end_time){
            if(this.student_end_time!==''){
              this.$message.error('开始时间不能大于结束时间哦！');
              this.student_start_time = ''
              return
            }else{
              this.$message.error('请选择结束时间！');
              this.student_start_time = val
            }
          }else{
            vm.student_start_time = val
            vm.student_init_fn(vm.student_start_time,vm.student_end_time)
          }

        },
        student_end_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else if(val<this.student_start_time){
            this.$message.error('结束时间不能小于开始时间哦！');
            this.student_end_time = ''
            return
          }else {
            if (this.student_start_time == '') {
              this.$message.error('请选择开始时间！');
              return
            } else {
              vm.student_end_time = val
              vm.student_init_fn(vm.student_start_time, vm.student_end_time)
            }
          }
        },
        student_init_fn(start,end){
          let vm = this
          //学生基本条件分析
          vm.$axios.request("post","StudentAnalyze/studentCondition",{
            startYear:start,
            endYear:end},function(data){
            vm.student_date=[]
            vm.BKS_count=[]
            for(let i=0;i<data.foreinList.length;i++){
              vm.student_date.push(data.foreinList[i].year)
              vm.BKS_count.push(data.foreinList[i].count)
            }
            vm.student_B_fn()
          },function(err){
            console.log(err);
          })
        },


///////////////////////////////////////////////////////////////////////////////////////////////
        //本科生历年奖学金人数趋势相关函数
        money_B_fn(){
          let money_B = this.$echarts.init(document.getElementById('money_B'), 'customed');
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
              data: ['获奖人数趋势']
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
              data: this.money_time
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: '获奖人数趋势',
              type: 'line',
              stack: '总量',
              data: this.money_count
            }],
            label: {
              normal: {
                show: true,
                position:'right',
              },
            },
          };
          money_B.setOption(option);
        },
        money_start_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else if(val >this.money_end_time){
            if(this.money_end_time!==''){
              this.$message.error('开始时间不能大于结束时间哦！');
              this.money_start_time = ''
              return
            }else{
              this.$message.error('请选择结束时间！');
              this.money_start_time = val
            }
          }else{
            if(vm.majorSelect2 =='全部'){
              vm.majorSelect2_code = ''
            }else{
              vm.majorSelect2_code = vm.majorSelect2
            }
            vm.money_start_time = val
            vm.money_fn(vm.money_start_time,vm.money_end_time,vm.majorSelect2_code,vm.money_code)
          }

        },
        money_end_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else if(val<this.money_start_time){
            this.$message.error('结束时间不能小于开始时间哦！');
            this.money_end_time = ''
            return
          }else {
            if (this.money_start_time == '') {
              this.$message.error('请选择开始时间！');
              return
            } else {
              vm.money_end_time = val
              if (vm.majorSelect2 == '全部') {
                vm.majorSelect2_code = ''
              } else {
                vm.majorSelect2_code = vm.majorSelect2
              }
              vm.money_fn(vm.money_start_time, vm.money_end_time, vm.majorSelect2_code, vm.money_code)
            }
          }
        },
        majorChange2(val){
          let vm = this
          vm.majorSelect2 = val
          if(vm.majorSelect2 =='全部'){
            vm.majorSelect2_code = ''
          }else{
            vm.majorSelect2_code = vm.majorSelect2
          }
          vm.money_fn(vm.money_start_time,vm.money_end_time,vm.majorSelect2_code,vm.money_code)
        },
        moneySelectChange(val){
          let vm = this
          vm.moneySelect = val
          if(val =='奖学金'){
            vm.money_code = '1'
          }else if(val =='助学金'){
            vm.money_code = '2'
          }else if(val =='困难补助'){
            vm.money_code = '3'
          }else{
            vm.money_code = '4'
          }
          if(vm.majorSelect2 =='全部'){
            vm.majorSelect2_code = ''
          }else{
            vm.majorSelect2_code = vm.majorSelect2
          }
          vm.money_fn(vm.money_start_time,vm.money_end_time,vm.majorSelect2_code,vm.money_code)
        },
        money_fn(start,end,school,flag){
          let vm = this
          //历年奖学金趋势
          vm.$axios.request("post","StudentAnalyze/subsidyTrend", {
            startYear :start,
            endYear:end,
            specialty:school,
            flag:flag},function(data){
            vm.money_time = []
            vm.money_count = []
            vm.sum_count = 0
            vm.sum_money = 0
            for(let i=0;i<data.result.length;i++){
              vm.sum_count += parseInt(data.result[i].count)
              vm.sum_money += parseInt(data.result[i].sum)
              vm.money_time.push(data.result[i].year+'年')
              vm.money_count.push(data.result[i].count)
            }
            vm.money_B_fn()
          },function(err){
            console.log(err);
          })
        },

        handleClose(done) {
          this.dialogVisible = false
          this.pageNum1 = 1
          this.loading1 = true
        },
        money_close_btn(){
          this.dialogVisible = false
          this.pageNum1 = 1
          this.loading1 = true
        },
        open_money(){
          let vm = this
          vm.dialogVisible=true
          if(vm.majorSelect2 =='全部'){
            vm.majorSelect2_code = ''
          }else{
            vm.majorSelect2_code = vm.majorSelect2
          }
          vm.money_list_fn(vm.money_code,vm.money_start_time,vm.money_end_time,vm.majorSelect2_code,vm.pageNum1,vm.size1)
        },
        handleSizeChange1(val) {
          var vm = this
          vm.loading1 = true
          vm.pageNum1 = val
          if(vm.majorSelect2 =='全部'){
            vm.majorSelect2_code = ''
          }else{
            vm.majorSelect2_code = vm.majorSelect2
          }
          vm.money_list_fn(vm.money_code,vm.money_start_time,vm.money_end_time,vm.majorSelect2_code,vm.pageNum1,vm.size1)
        },
        handleCurrentChange1(val) {
          var vm = this
          vm.loading1 = true
          vm.pageNum1 = val
          if(vm.majorSelect2 =='全部'){
            vm.majorSelect2_code = ''
          }else{
            vm.majorSelect2_code = vm.majorSelect2
          }
          vm.money_list_fn(vm.money_code,vm.money_start_time,vm.money_end_time,vm.majorSelect2_code,vm.pageNum1,vm.size1)
        },
        money_list_fn(flag,start,end,specialty,page,size){
          let vm = this
          vm.$axios.request("post","StudentAnalyze/subsidytList", {
            flag:flag,
            startYear :start,
            endYear:end,
            specialty:specialty,
            page:page,
            pageSize:size,
          },function(data){
            vm.student_money_Data = []
            vm.total_count1 = parseInt(data.totalCount)
            let name =''
            let sex = ''
            let age = ''
            let time = ''
            let major = ''
            let school = ''
            let place = ''
            let money = ''
            for(let i=0;i<data.result.length;i++){
              if(data.result[i].name =='null'){
                name = '未知'
              }else{
                name = data.result[i].name
              }

              if(data.result[i].sex =='null'){
                sex = '未知'
              }else{
                sex = data.result[i].sex
              }

              if(data.result[i].age =='null'){
                age = '未知'
              }else{
                age = data.result[i].age
              }

              if(data.result[i].year =='null'){
                time = '未知'
              }else{
                time = data.result[i].year
              }

              if(data.result[i].specialty =='null'){
                major = '未知'
              }else{
                major = data.result[i].specialty
              }

              if(data.result[i].academy =='null'){
                school = '未知'
              }else{
                school = data.result[i].academy
              }

              if(data.result[i].whereabouts =='null'){
                place = '未知'
              }else{
                place = data.result[i].whereabouts
              }

              if(data.result[i].money =='null'){
                money = '未知'
              }else{
                money = data.result[i].money
              }
              vm.student_money_Data.push({
                name : name,
                sex : sex,
                age : age,
                time : time ,
                major : major,
                school : school ,
                place : place,
                money:money
              })
            }
            vm.$nextTick(function() {
              vm.loading1 = false
            })
          },function(err){
            console.log(err);
          })
        },

///////////////////////////////////////////////////////////////////////////////////////////////
        //本科生历年考研人数趋势相关函数
        up_student_fn(){
          let up_student = this.$echarts.init(document.getElementById('up_student'), 'customed');
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
              data: ['考研趋势','就业趋势','出国趋势']
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
              data: this.up_time
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: '考研趋势',
              type: 'line',
              stack: '总量',
              data: this.up_count
            },
              {
                name: '就业趋势',
                type: 'line',
                stack: '总量1',
                data: this.nb_count
              },
              {
                name: '出国趋势',
                type: 'line',
                stack: '总量2',
                data: this.out_count
              }],
            label: {
              normal: {
                show: true,
                position:'right',
              },
            },
          };
          up_student.setOption(option);
        },
        up_start_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else if(val >this.up_end_time){
            if(this.up_end_time!==''){
              this.$message.error('开始时间不能大于结束时间哦！');
              this.up_start_time = ''
              return
            }else{
              this.$message.error('请选择结束时间！');
              this.up_start_time = val
            }
          }else{
            vm.up_start_time = val
            if(vm.majorSelect3 =='全部'){
              vm.majorSelect3_code = ''
            }else{
              vm.majorSelect3_code = vm.majorSelect3
            }
            vm.up_fn(vm.up_start_time,vm.up_end_time,vm.majorSelect3_code,vm.list_code)
          }

        },
        up_end_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else if(val<this.up_start_time){
            this.$message.error('结束时间不能小于开始时间哦！');
            this.up_end_time = ''
            return
          }else {
            if (this.up_start_time == '') {
              this.$message.error('请选择开始时间！');
              return
            } else {
              vm.up_end_time = val
              if (vm.majorSelect3 == '全部') {
                vm.majorSelect3_code = ''
              } else {
                vm.majorSelect3_code = vm.majorSelect3
              }
              vm.up_fn(vm.up_start_time, vm.up_end_time, vm.majorSelect3_code, vm.list_code)
            }
          }
        },
        majorChange3(val){
          let vm = this
          vm.majorSelect3 = val
          if(vm.majorSelect3 =='全部'){
            vm.majorSelect3_code = ''
          }else{
            vm.majorSelect3_code = vm.majorSelect3
          }
          vm.up_fn(vm.up_start_time,vm.up_end_time,vm.majorSelect3_code,vm.list_code)
        },
        up_fn(start,end,school){
          let vm = this
          //历年考研趋势
          let school_code = ''
          if(school =='全部'){
            school_code=''
          }else{
            school_code = school
          }
          vm.$axios.request("post","StudentAnalyze/graduateTrend", {
            startYear :start,
            endYear:end,
            academy:school_code},function(data){
            vm.up_time = []
            vm.up_count = []
            for(let i=0;i<data.result.length;i++){
              vm.up_time.push(data.result[i].year+'年')
              vm.up_count.push(data.result[i].count)
            }
            vm.up_student_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","StudentAnalyze/graduateTrend", {
            startYear :start,
            endYear:end,
            academy:school_code,
            whereabouts:'出国'},function(data){
            vm.out_count = []
            for(let i=0;i<data.result.length;i++){
              vm.out_count.push(data.result[i].count)
            }
            vm.up_student_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","StudentAnalyze/graduateTrend", {
            startYear :start,
            endYear:end,
            academy:school_code,
            whereabouts:'就业'},function(data){
            vm.nb_count = []
            for(let i=0;i<data.result.length;i++){
              vm.nb_count.push(data.result[i].count)
            }
            vm.up_student_fn()
          },function(err){
            console.log(err);
          })
          //就业方向列表
          vm.$axios.request("post","StudentAnalyze/employmentDis", {
            startYear :start,
            endYear:end,
            academy:school_code},function(data){
            vm.listData = []
            let place = ''
            for(let i=0;i<data.result.length;i++){
              if(data.result[i].whereabouts == null){
                place = '未知'
              }else{
                place = data.result[i].whereabouts
              }
              vm.listData.push({
                name:place,
                value:place = data.result[i].count + '人'
              })
            }
          },function(err){
            console.log(err);
          })
        },
        //考研列表
        handleClose1(done){
          this.dialogVisible1 = false
          this.pageNum = 1
          this.loading = true
        },
        close_btn(){
          this.dialogVisible1 = false
          this.pageNum = 1
          this.loading = true
        },
        openTable(val){
          this.dialogVisible1 = true
          this.out_type = val +'人员列表'
          if(val =='考研'){
            this.list_code ='1'
          }else if(val =='出国'){
            this.list_code ='2'
          }else if(val =='就业'){
            this.list_code ='3'
          }else{
            this.list_code =''
          }
          this.student_list_fn(this.list_code,this.up_start_time,this.up_end_time,this.majorSelect3_code,this.pageNum,this.size)
        },
        student_list_fn(flag,start,end,school,page,size){
          let vm = this
          let school_code = ''
          if(school =='全部'){
            school_code=''
          }else{
            school_code = school
          }
          vm.$axios.request("post","StudentAnalyze/employmenStudenttList", {
            flag:flag,
            startYear :start,
            endYear:end,
            academy:school_code,
            page:page,
            pageSize:size,
          },function(data){
            vm.studentData = []
            vm.total_count = parseInt(data.totalCount)
            let name =''
            let sex = ''
            let age = ''
            let time = ''
            let major = ''
            let school = ''
            let where = ''

            for(let i=0;i<data.result.length;i++){
              if(data.result[i].name =='null'){
                name = '未知'
              }else{
                name = data.result[i].name
              }

              if(data.result[i].sex =='null'){
                sex = '未知'
              }else{
                sex = data.result[i].sex
              }

              if(data.result[i].age =='null'){
                age = '未知'
              }else{
                age = data.result[i].age
              }

              if(data.result[i].year =='null'){
                time = '未知'
              }else{
                time = data.result[i].year
              }

              if(data.result[i].specialty =='null'){
                major = '未知'
              }else{
                major = data.result[i].specialty
              }

              if(data.result[i].academy =='null'){
                school = '未知'
              }else{
                school = data.result[i].academy
              }

              if(data.result[i].whereabouts =='null'){
                where = '未知'
              }else{
                where = data.result[i].whereabouts
              }
              vm.studentData.push({
                name : name,
                sex : sex,
                age : age,
                time : time ,
                major : major,
                school : school ,
                where : where,
              })
            }
            vm.$nextTick(function() {
              vm.loading = false
            })
          },function(err){
            console.log(err);
          })
        },
        handleSizeChange(val) {
          var vm = this
          vm.loading = true
          vm.pageNum = val
          this.student_list_fn(this.list_code,this.up_start_time,this.up_end_time,this.majorSelect3_code,this.pageNum,this.size)
        },
        handleCurrentChange(val) {
          var vm = this
          vm.loading = true
          vm.pageNum = val
          this.student_list_fn(this.list_code,this.up_start_time,this.up_end_time,this.majorSelect3_code,this.pageNum,this.size)
        },
/////////////////////////////////////////////////////////////////////////////////////////////
        //港澳台相关函数---历史招生人数
        student_GAT_fn(){
          let student_GAT = this.$echarts.init(document.getElementById('student_GAT'), 'customed');
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
              data: ['招生人数']
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
              data: this.GAT_year
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: '招生人数',
              type: 'line',
              stack: '总量',
              data: this.GAT_count
            }],
            label: {
              normal: {
                show: true,
                position:'top',
              },
            },
          };
          student_GAT.setOption(option);
        },
        GAT_start_time_change(val){
          let vm = this
          if(val ==undefined){
            return
          }else if(val >this.GAT_end_time){
            if(this.GAT_end_time!==''){
              this.$message.error('开始时间不能大于结束时间哦！');
              this.GAT_start_time = ''
              return
            }else{
              this.$message.error('请选择结束时间！');
              this.GAT_start_time = val
            }
          }else{
            vm.GAT_start_time = val
            vm.GAT_init_fn(vm.GAT_start_time,vm.GAT_end_time)
          }

        },
        GAT_end_time_change(val){
          let vm = this
          if(val ==undefined){
            return
          }else if(val<this.GAT_start_time){
            this.$message.error('结束时间不能小于开始时间哦！');
            this.GAT_end_time = ''
            return
          }else {
            if (this.GAT_start_time == '') {
              this.$message.error('请选择开始时间！');
              return
            } else {
              vm.GAT_end_time = val
              vm.GAT_init_fn(vm.GAT_start_time, vm.GAT_end_time)
            }
          }
        },
        GAT_init_fn(start,end){
          let vm = this
          //港澳台招生趋势
          vm.$axios.request("post","StudentAnalyze/GATTrends", {
            startYear :start,
            endYear:end,},function(data){
            vm.GAT_list = []
            vm.GAT_year = []
            vm.GAT_count = []
            for(let i=0;i<data.result.length;i++){
              vm.GAT_year.push(data.result[i].year)
              vm.GAT_count.push(data.result[i].count)
              vm.GAT_list.push({
                name:data.result[i].year + '年',
                value:data.result[i].count + '人'
              })
            }
            vm.student_GAT_fn()
          },function(err){
            console.log(err);
          })
        },

        //港澳台男女比例
        GAT_sex_init_fn(){
          let GAT_sex = this.$echarts.init(document.getElementById('GAT_sex'), 'customed');
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
              data: this.GAT_sex_type
            },
            series : [
              {
                name: '人数',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:this.GAT_sex_count,
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

          GAT_sex.setOption(option);
        },
        GAT_sex_time_change(val){
          let vm = this
          if(val ==undefined){
            return
          }else{
            vm.GAT_sex_time = val
            vm.GAT_sex_fn(vm.GAT_sex_time)
          }
        },
        GAT_sex_fn(year){
          let vm = this
          //港澳台招生男女比例
          vm.$axios.request("post","StudentAnalyze/GATSex", {year:year},function(data){
            vm.GAT_sex_type = []
            vm.GAT_sex_count = []
            for(let i=0;i<data.result.length;i++){
              vm.GAT_sex_type.push(data.result[i].sex)
              vm.GAT_sex_count.push({
                name:data.result[i].sex,
                value:data.result[i].count
              })
            }
            vm.GAT_sex_init_fn()
          },function(err){
            console.log(err);
          })
        },

        //港澳台专业比例
        GAT_major_init_fn(){
          let GAT_major = this.$echarts.init(document.getElementById('GAT_major'), 'customed');
          let option = {
            color:['#A9FBBA'],
            title: {
              text: '单位(人)',
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
              boundaryGap: [0, 0.01],
              "axisLabel": {
                "interval": 0,
                formatter: '{value}',
              }
            },
            yAxis: {
              type: 'category',
              data: this.GAT_major_type
            },
            series: [{
              name: '专业分布',
              type: 'bar',
              data: this.GAT_major_count
            }],
            label: {
              normal: {
                show: true,
                position:'right',
              },
            },
          };
          GAT_major.setOption(option);
        },
        GAT_major_time_change(val){
          let vm = this
          if(val ==undefined){
            return
          }else{
            vm.GAT_major_time = val
            vm.GAT_major_fn(vm.GAT_major_time)
          }

        },
        GAT_major_fn(year){
          let vm = this
          //港澳台招生专业比例
          vm.$axios.request("post","StudentAnalyze/GATTop5", {year:year},function(data){
            vm.GAT_major_type = []
            vm.GAT_major_count = []
            for(let i = data.result.length-1 ; i >= 0; i--){
              vm.GAT_major_type.push(data.result[i].major)
              vm.GAT_major_count.push(data.result[i].count)
            }
            vm.GAT_major_init_fn()
          },function(err){
            console.log(err);
          })
        },


        //教风学风
        jfxf_time_change(val){

        },
        //学生管理人员列表
        XSGL_init(page,size){
          let vm = this
          vm.$axios.request("post","StudentAnalyze/counsellor", {page:page,pageSize:size},function(data){
            vm.total_count_GL = parseInt(data.totalCount)
            vm.XSGL_list = []
            for(let i = 0;i<data.result.length;i++){
              vm.XSGL_list.push({
                name:data.result[i].xm,
                six:data.result[i].xb,
                time:data.result[i].lxny,
                title:data.result[i].mz,
                major:data.result[i].xwmc,
                school:data.result[i].szdw
              },)
            }
            vm.$nextTick(function() {
              vm.loading_GL = false
            })
          },function(err){
            console.log(err);
          })
        },
        handleSizeChange_GL(val) {
          var vm = this
          vm.pageNum_GL = val
          vm.loading_GL = true
          vm.XSGL_init(vm.pageNum_GL,vm.size_GL)
        },
        handleCurrentChange_GL(val) {
          var vm = this
          vm.pageNum_GL = val
          vm.loading_GL = true
          vm.XSGL_init(vm.pageNum_GL,vm.size_GL)
        },

        //师生比例相关函数
        teacher_student_echart(){
          let teacher_student = this.$echarts.init(document.getElementById("teacher_student"), 'customed');
          var colors = ['#04aec7', '#675bba'];
          var option = {
            color: colors,
            tooltip: {
              trigger: 'axis',
              axisPointer: {type: 'cross'}
            },
            toolbox: {
              x:'88%',
              feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true},

              }
            },
            legend: {
              data:['教师','学生']
            },
            xAxis: [
              {
                type: 'category',
                axisTick: {
                  alignWithLabel: true
                },
                data: this.school_count,
                axisLabel: {
                  interval:0,
                  rotate:-30
                },
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '学生',
                position: 'right',
                axisLine: {
                  lineStyle: {
                    color: colors[1]
                  }
                },
                axisLabel: {
                  formatter: '{value}'
                }
              },
              {
                type: 'value',
                name: '教师',
                min: 0,
                max: 500,
                position: 'left',
                axisLine: {
                  lineStyle: {
                    color: colors[0]
                  }
                },
                axisLabel: {
                  formatter: '{value}'
                }
              }
            ],
            series: [
              {
                name:'教师',
                type:'bar',
                barWidth: 20,
                barGap:0,//柱间距离
                yAxisIndex: 1,
                data:this.teacher_count
              },{
                name:'学生',
                type:'bar',
                barWidth: 20,
                barGap:0,//柱间距离
                data:this.student_count
              },
            ],
            label: {
              normal: {
                show: true,
                position:'top',
              },
            },
          };
          teacher_student.setOption(option)
        },
        teacher_student_init(time){
          let vm = this
          vm.$axios.request("post","softPower/eacherpupilRatio",{year:time},function(data){
            vm.school_count = []
            vm.teacher_count = []
            vm.student_count = []
            for(let i=0;i<data.teacher.length;i++){
              vm.school_count.push(data.teacher[i].xy)
              vm.teacher_count.push(data.teacher[i].count)
            }
            for(let i=0;i<data.student.length;i++){
              vm.student_count.push(data.student[i].count)
            }
            vm.teacher_student_echart()
          },function(err){
            console.log(err);
          })
        },
        S_T_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.S_T_time = val
            vm.teacher_student_init(vm.S_T_time)
          }
        },

        //本科生，留学生，研究生 与专业关系图。
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
        },
      },
      mounted(){
        //echarts主题
        this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      },
      created() {
        window.scrollTo(0,0);
        let vm = this;
        vm.make_time()
        vm.make_select()
        vm.up_fn(vm.up_start_time,vm.up_end_time,vm.majorSelect3_code)
        vm.money_fn(vm.money_start_time,vm.money_end_time,vm.majorSelect2_code,vm.money_code)
        vm.student_init_fn(vm.student_start_time,vm.student_end_time)
        vm.XSGL_init(vm.pageNum_GL,vm.size_GL)
        vm.teacher_student_init(vm.S_T_time)
        vm.student_type_init('1')
        vm.student_type_list('1')
        }
    }
</script>

<style lang="scss" scoped>
    .table_four{
      width: 24%;
      td{
        width: 25%;
      }
    }
  .table_ten{
    width: 10%;
  }
</style>
