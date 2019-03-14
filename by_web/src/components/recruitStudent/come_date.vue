<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/student' }">招生洞察</el-breadcrumb-item>
      <el-breadcrumb-item>来华留学生分析</el-breadcrumb-item>
    </el-breadcrumb>

    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane label="来华留学生数据总览" name="first">
        <el-row type="flex" justify="space-around">
          <el-col :span="24" class="ec_bg_left" >
            <h5 class="ec_h5">
              来华留学生数据总览趋势图
              <div class="ec_h5_data">
                <el-date-picker
                  class="major-data select_width"
                  align="right"
                  size='mini'
                  format="yyyy"
                  @change="end1_change"
                  v-model="end1_time"
                  type="year"
                  placeholder="选择年">
                </el-date-picker>
                <span style="float: right">至</span>
                <el-date-picker
                  class="major-data select_width"
                  align="right"
                  size='mini'
                  format="yyyy"
                  @change="start1_change"
                  v-model="start1_time"
                  type="year"
                  placeholder="选择年">
                </el-date-picker>

              </div>
            </h5>
            <div class="ec_height" id="school"></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="24" class="ec_bg_left">
            <h5 class="ec_h5">
              来华留学生数据列表
              <el-button type="primary" @click="export2Excel(list1)">导出数据</el-button>
            </h5>
            <div class="ec_height" id="positive">
              <el-table
                v-loading="loading1"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="list1"
                height="400"
                align="center"
                style="width: 100%;overflow: auto"
                :show-header='true'>
                <el-table-column prop="four" label="年份" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="one" label="总数" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="two" label="学历生" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="three" label="非学历生"  class-name="elTableName">
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="24" class="ec_bg_left">
            <h5 class="ec_h5">
              历年来华留学生列表
              <el-button type="primary" @click="export2Excel1(student_abroad)">导出数据</el-button>
              <div class="ec_h5_data">
                <el-date-picker
                  size="mini"
                  class="select_width"
                  @change="come_time_change"
                  format="yyyy"
                  v-model="come_time"
                  type="year"
                  placeholder="选择时间">
                </el-date-picker>
                <el-select v-model="continentSelect" placeholder="请选择" size="mini" class="major-select" @change="continentChange">
                  <el-option
                    v-for="item in continentList"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
            </h5>
            <div class="ec_height" id="positive1">
              <el-table :data="student_abroad" align="center" height="400" style="width: 100%" :show-header='true'>
                <el-table-column prop="continent" label="洲际" class-name="elTableName"></el-table-column>
                <el-table-column prop="country" label="国家名称"  class-name="elTableName"></el-table-column>
                <el-table-column prop="total" label="来华人数"  class-name="elTableName"></el-table-column>
                <el-table-column prop="count" label="来北语人数"  class-name="elTableName"></el-table-column>
                <el-table-column prop="xls" label="学历生"  class-name="elTableName"></el-table-column>
                <el-table-column prop="fxls" label="非学历生"  class-name="elTableName"></el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="五大洲数据分析" name="second">
        <el-row type="flex" justify="space-around">
          <el-col :span="24" class="ec_bg_left" >
            <h5 class="ec_h5">
              五大洲数据分析图表
              <div class="ec_h5_data">
                <el-date-picker
                  class="major-data select_width"
                  align="right"
                  size='mini'
                  format="yyyy"
                  @change="end2_change"
                  v-model="end2_time"
                  type="year"
                  placeholder="选择年">
                </el-date-picker>
                <span style="float: right">至</span>
                <el-date-picker
                  class="major-data select_width"
                  align="right"
                  size='mini'
                  format="yyyy"
                  @change="start2_change"
                  v-model="start2_time"
                  type="year"
                  placeholder="选择年">
                </el-date-picker>

              </div>
            </h5>
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-around">
          <el-col :span="12" class="ec_bg_left" >
            <h5 class="ec_h5">
              洲际分析
            </h5>
            <div class="ec_height" id="five_one"></div>
          </el-col>
          <el-col :span="12" class="ec_bg_left" >
            <h5 class="ec_h5">
              学历分析
              <el-select
                v-model="ZJ_Select"
                placeholder="请选择"
                size="mini"
                class="major-select select_width"
                @change="ZJ_Change">
                <el-option
                  v-for="(item,index) in ZJ_List"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </h5>
            <div class="ec_height" id="five_two"></div>
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-around">
          <el-col :span="24" class="ec_bg_left">
            <h5 class="ec_h5">
              五大洲数据分析列表
              <el-button type="primary" @click="export2Excel(list2)">导出数据</el-button>
            </h5>
            <div class="ec_height" id="positive2">
              <el-table
                v-loading="loading2"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="list2"
                height="400"
                align="center"
                style="width: 100%;overflow: auto"
                :show-header='true'>
                <el-table-column prop="four" label="洲际" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="one" label="总数" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="two" label="学历生" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="three" label="非学历生"  class-name="elTableName">
                </el-table-column>
              </el-table>
            </div>

          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="一带一路国家招生趋势" name="third">
        <el-row type="flex" justify="space-around">
          <el-col :span="24" class="ec_bg_left" >
            <h5 class="ec_h5">
              一带一路国家招生趋势
              <div class="ec_h5_data">

                <el-date-picker
                  class="major-data select_width"
                  align="right"
                  size='mini'
                  format="yyyy"
                  @change="end3_change"
                  v-model="end3_time"
                  type="year"
                  placeholder="选择年">
                </el-date-picker>
                <span style="float: right">至</span>
                <el-date-picker
                  class="major-data select_width"
                  align="right"
                  size='mini'
                  format="yyyy"
                  @change="start3_change"
                  v-model="start3_time"
                  type="year"
                  placeholder="选择年">
                </el-date-picker>
              </div>
            </h5>
            <div class="ec_height" id="oneAndOne"></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="24" class="ec_bg_left">
            <h5 class="ec_h5">
              一带一路数据分析列表
              <el-button type="primary" @click="export2Excel(list3)">导出数据</el-button>
            </h5>
            <div class="ec_height" id="positive3">
              <el-table
                v-loading="loading3"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="list3"
                height="400"
                align="center"
                style="width: 100%;overflow: auto"
                :show-header='true'>
                <el-table-column prop="four" label="国家" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="one" label="总数" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="two" label="学历生" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="three" label="非学历生"  class-name="elTableName">
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="阿拉伯数据分析" name="fourth">
        <el-row type="flex" justify="space-around">
          <el-col :span="24" class="ec_bg_left" >
            <h5 class="ec_h5">
              阿拉伯数据趋势图分析
              <div class="ec_h5_data">
                <el-date-picker
                  class="major-data select_width"
                  align="right"
                  size='mini'
                  format="yyyy"
                  @change="end4_change"
                  v-model="end4_time"
                  type="year"
                  placeholder="选择年">
                </el-date-picker>
                <span style="float: right">至</span>
                <el-date-picker
                  class="major-data select_width"
                  align="right"
                  size='mini'
                  format="yyyy"
                  @change="start4_change"
                  v-model="start4_time"
                  type="year"
                  placeholder="选择年">
                </el-date-picker>
              </div>
            </h5>
            <div class="ec_height" id="alb_date"></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="24" class="ec_bg_left">
            <h5 class="ec_h5">
              阿拉伯数据分析列表
              <el-button type="primary" @click="export2Excel(list4)">导出数据</el-button>
            </h5>
            <div class="ec_height" id="positive4">
              <el-table
                v-loading="loading4"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="list4"
                height="400"
                align="center"
                style="width: 100%;overflow: auto"
                :show-header='true'>
                <el-table-column prop="four" label="国家" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="one" label="总数" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="two" label="学历生" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="three" label="非学历生"  class-name="elTableName">
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="俄语国家数据分析" name="five">
        <el-row type="flex" justify="space-around">
          <el-col :span="24" class="ec_bg_left" >
            <h5 class="ec_h5">
              俄语国家数据趋势图分析
              <div class="ec_h5_data">
                <el-date-picker
                  class="major-data select_width"
                  align="right"
                  size='mini'
                  format="yyyy"
                  @change="end5_change"
                  v-model="end5_time"
                  type="year"
                  placeholder="选择年">
                </el-date-picker>
                <span style="float: right">至</span>
                <el-date-picker
                  class="major-data select_width"
                  align="right"
                  size='mini'
                  format="yyyy"
                  @change="start5_change"
                  v-model="start5_time"
                  type="year"
                  placeholder="选择年">
                </el-date-picker>
              </div>
            </h5>
            <div class="ec_height" id="els_date"></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="24" class="ec_bg_left">
            <h5 class="ec_h5">
              俄语国家数据分析列表
              <el-button type="primary" @click="export2Excel(list5)">导出数据</el-button>
            </h5>
            <div class="ec_height" id="positive5">
              <el-table
                v-loading="loading5"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="list5"
                height="400"
                align="center"
                style="width: 100%;overflow: auto"
                :show-header='true'>
                <el-table-column prop="four" label="国家" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="one" label="总数" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="two" label="学历生" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="three" label="非学历生"  class-name="elTableName">
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import time from '../../config/timeFormat'
  export default {
    data() {
      return {
        activeName: 'first',
        //校内数据
        loading1:false,
        list1:[],
        start1_time:'2011',
        end1_time:'2015',
        name1:[],
        count1:[],
        citySelect:'北京市',
        cityList:[],
        //历年来华留学生列表
        continentSelect:'亚洲',
        continentList:['亚洲','欧洲','非洲'],
        come_time:'2015',
        student_abroad: [],
        //五大洲
        loading2:false,
        list2:[],
        start2_time:'2011',
        end2_time:'2015',
        zj_name:[],
        zj_count:[],
        xz_name:[],
        xz_count:[],
        ZJ_Select:'全部',
        ZJ_code:'',
        ZJ_List:['全部','亚洲','欧洲','非洲','美洲','大洋洲',],
        //一带一路
        loading3:false,
        list3:[],
        start3_time:'2011',
        end3_time:'2015',
        name3:[],
        count3:[],

        //阿拉伯国家
        loading4:false,
        list4:[],
        start4_time:'2011',
        end4_time:'2015',
        name4:[],
        count4:[],

        //俄罗斯国家
        loading5:false,
        list5:[],
        start5_time:'2011',
        end5_time:'2015',
        name5:[],
        count5:[],

      };
    },
    methods: {
      menu() {
        window.scrollTo(0,0);
      },
      make_time(){
        let vm = this
        vm.start1_time = time.year-10 + ''
        vm.end1_time = time.year
        vm.start2_time = time.year-10 + ''
        vm.end2_time = time.year
        vm.start3_time = time.year-10 + ''
        vm.end3_time = time.year
        vm.start4_time = time.year-10 + ''
        vm.end4_time = time.year
        vm.start5_time = time.year-10 + ''
        vm.end5_time = time.year

      },
      handleClick(tab) {
        let vm = this
        //五大洲tab渲染
        if(tab.index ==1){
          let five_one = document.getElementById('five_one')
          five_one.style.height = '400px'
          setTimeout(function(){
            vm.two_init_fn(vm.start2_time,vm.end2_time)
          },10)

          let five_two = document.getElementById('five_two')
          five_two.style.height = '400px'
          setTimeout(function(){
            vm.two_init_fn(vm.start2_time,vm.end2_time,vm.ZJ_code)
          },10)
        }
        //一带一路tab渲染
        else if(tab.index ==2){
          let oneAndOne = document.getElementById('oneAndOne')
          oneAndOne.style.height = '400px'
          setTimeout(function(){
            vm.three_init_fn(vm.start3_time,vm.end3_time)
          },10)
        }
        //阿拉伯国家tab渲染
        else if(tab.index ==3){
          let alb_date = document.getElementById('alb_date')
          alb_date.style.height = '400px'
          setTimeout(function(){
            vm.four_init_fn(vm.start4_time,vm.end4_time)
          },10)
        }
        //俄罗斯语言tab渲染
        else if(tab.index ==4){
          let els_date = document.getElementById('els_date')
          els_date.style.height = '400px'
          setTimeout(function(){
            vm.five_init_fn(vm.start5_time,vm.end5_time)
          },10)
        }
      },

      //校内数据总览echarts
      school_fn() {
        let school = this.$echarts.init(document.getElementById('school'), 'customed');
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
            data: ['来华留学生人数']
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
            data: this.name1
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '来华留学生人数',
            type: 'line',
            stack: '总量',
            data:this.count1
          }]
        };
        school.setOption(option);
      },
      start1_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.end1_time){
          if(this.end1_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.start1_time = ''
            return
          }else{
            vm.start1_time = val
          }
        }else{
          vm.start1_time = val
          this.one_init_fn(this.start1_time,this.end1_time)
        }

      },
      end1_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.start1_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.end1_time = ''
          return
        }else{
          vm.end1_time = val
          this.one_init_fn(this.start1_time,this.end1_time)
        }

      },
      //来华留学生数据列表
      continentChange(val){
        if(val == undefined){
          return
        }else{
          this.continentSelect = val
          this.continentAndTime_change(this.continentSelect,this.come_time)
        }

      },
      come_time_change(val){
        if(val == undefined){
          return
        }else{
          this.come_time = val
          this.continentAndTime_change(this.continentSelect,this.come_time)
        }

      },
      continentAndTime_change(continent,year){
        //历年来华留学生趋势
        var vm = this
        this.$axios.request("post","/OBOR/OBORTendency",{continent:continent,year:year},function(data){
          let result = data.result
          vm.student_abroad=[]
          console.log(data)
          for(let i=0;i<result.length;i++){
            vm.student_abroad.push({continent:result[i].continent,count:result[i].count,country:result[i].country,fxls:result[i].fxls,total:result[i].total,xls:result[i].xls,})
          }
        },function(err){
          console.log(err);
        })

      },
      //获取数据方法（校内）
      one_init_fn(start,end){
        let vm  = this
        //来华留学生数据
        vm.$axios.request("post","SchoolOutDataAys/trend",{startyear:start, endyear:end},function(data){
          vm.name1 = []
          vm.count1 =[]
          for(let i=0;i<data.result.length;i++){
            vm.name1.push(data.result[i].year + '年')
            vm.count1.push(parseInt(data.result[i].count))
          }
          vm.school_fn()
        },function(err){
          console.log(err);
        })

        //全国不同省份数据列表
        vm.$axios.request("post","SchoolOutDataAys/overseasDetails",{startyear:start, endyear:end},function(data){
          vm.list1 = []
          for(let i=0;i<data.result.length;i++){
            vm.list1.push({
              four:data.result[i].year+'年',
              one:parseInt(data.result[i].count)+ '人',
              two:parseInt(data.result[i].xcount)+ '人',
              three:parseInt(data.result[i].fcount)+ '人',

            })
          }
        },function(err){
          console.log(err);
        })
      },

      //五大洲echarts
      five_one_fn() {
        let five_one = this.$echarts.init(document.getElementById('five_one'), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.zj_name
          },
          series : [
            {
              name: '洲际分布',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.zj_count,
              label: {
                normal: {
                  show: true,
                  formatter: '{b} {c}人'
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

        five_one.setOption(option);
      },
      five_two_fn() {
        let five_two = this.$echarts.init(document.getElementById('five_two'), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.xz_name
          },
          series : [
            {
              name: '学制分布',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.xz_count,
              label: {
                normal: {
                  show: true,
                  formatter: '{b} {c}人'
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

        five_two.setOption(option);
      },
      start2_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.end2_time){
          if(this.end2_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.start2_time = ''
            return
          }else{
            vm.start2_time = val
          }
        }else{
          vm.start2_time = val
          vm.two_init_fn(vm.start2_time,vm.end2_time,vm.ZJ_code)
        }

      },
      end2_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.start2_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.end2_time = ''
          return
        }else{
          vm.end2_time = val
          vm.two_init_fn(vm.start2_time,vm.end2_time,vm.ZJ_code)
        }

      },
      ZJ_Change(val){
        let vm = this
        vm.ZJ_Select = val
        if(val == '全部'){
          vm.ZJ_code =''
        }else{
          vm.ZJ_code =val
        }
        vm.two_init_fn(vm.start2_time,vm.end2_time,vm.ZJ_code)
      },
      //获取数据方法（五大洲）
      two_init_fn(start,end,flag){
        let vm  = this
        //z洲际分布
        vm.$axios.request("post","SchoolOutDataAys/continentDis",{startyear:start, endyear:end,},function(data){
          vm.zj_name = []
          vm.zj_count =[]
          for(let i=0;i<data.result.length;i++){
            vm.zj_name.push(data.result[i].zj)
            vm.zj_count.push({name:data.result[i].zj,value:parseInt(data.result[i].count)})
          }
          vm.five_one_fn()
        },function(err){
          console.log(err);
        })
        //学历分布
        vm.$axios.request("post","SchoolOutDataAys/educationtDis",{startyear:start, endyear:end,continent:flag},function(data){
          vm.xz_name = []
          vm.xz_count =[]
          for(let i=0;i<data.result.length;i++){
            vm.xz_name.push('学历生','非学历生')
            vm.xz_count.push({
              name:'学历生',
              value:parseInt(data.result[i].xcount)
            },{
              name:'非学历生',
              value:parseInt(data.result[i].fcount)
            })
          }
          vm.five_two_fn()
        },function(err){
          console.log(err);
        })
        //校内数据列表
        vm.$axios.request("post","SchoolOutDataAys/overseasDetails",{startyear:start, endyear:end,flag:'4'},function(data){
          vm.list2 = []
          for(let i=0;i<data.result.length;i++){
            vm.list2.push({
              one:parseInt(data.result[i].count)+ '人',
              two:parseInt(data.result[i].xcount)+ '人',
              three:parseInt(data.result[i].fcount)+ '人',
              four:data.result[i].zj,
            })
          }
        },function(err){
          console.log(err);
        })
      },

      //一带一路echarts
      oneAndOne_fn() {
        let oneAndOne = this.$echarts.init(document.getElementById('oneAndOne'), 'customed');
        let option = {
          /*title: {
            text: '单位(人数)',
            textStyle: {
              fontSize: 12,
            },
          },*/
          color: ['#801CDB'],
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
            data: ['国际生总数']
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
            data: this.name3
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '国际生总数',
            type: 'line',
            stack: '总量',
            data:this.count3
          }]
        };
        oneAndOne.setOption(option);
      },
      start3_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.end3_time){
          if(this.end3_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.start3_time = ''
            return
          }else{
            vm.start3_time = val
          }
        }else{
          vm.start3_time = val
          vm.three_init_fn(vm.start3_time,vm.end3_time)
        }
      },
      end3_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.start3_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.end3_time = ''
          return
        }else{
          vm.end3_time = val
          vm.three_init_fn(vm.start3_time,vm.end3_time)
        }

      },
      //获取数据方法（一带一路）
      three_init_fn(start,end){
        let vm  = this
        vm.$axios.request("post","SchoolOutDataAys/trend",{startyear:start, endyear:end,flag:'1'},function(data){
          vm.name3 = []
          vm.count3 =[]
          for(let i=0;i<data.result.length;i++){
            vm.name3.push(data.result[i].year + '年')
            vm.count3.push(parseInt(data.result[i].count))
          }
          vm.oneAndOne_fn()
        },function(err){
          console.log(err);
        })

        vm.$axios.request("post","SchoolOutDataAys/overseasDetails",{startyear:start, endyear:end,flag:'1'},function(data){
          vm.list3 = []
          for(let i=0;i<data.result.length;i++){
            vm.list3.push({
              one:parseInt(data.result[i].count)+ '人',
              two:parseInt(data.result[i].xcount)+ '人',
              three:parseInt(data.result[i].fcount)+ '人',
              four:data.result[i].country,
            })
          }
        },function(err){
          console.log(err);
        })
      },

      //阿拉伯国家echarts
      alb_date_fn() {
        let alb_date = this.$echarts.init(document.getElementById('alb_date'), 'customed');
        let option = {
          /*title: {
            text: '单位(人数)',
            textStyle: {
              fontSize: 12,
            },
          },*/
          color: ['#DB49A6'],
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
            data: ['国际生总数']
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
            data: this.name4
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '国际生总数',
            type: 'line',
            stack: '总量',
            data:this.count4
          }]
        };
        alb_date.setOption(option);
      },
      start4_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.end4_time){
          if(this.end4_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.start4_time = ''
            return
          }else{
            vm.start4_time = val
          }
        }else{
          vm.start4_time = val
          vm.four_init_fn(vm.start4_time,vm.end4_time)
        }

      },
      end4_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.start4_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.end4_time = ''
          return
        }else{
          vm.end4_time = val
          vm.four_init_fn(vm.start4_time,vm.end4_time)
        }

      },
      //获取数据方法（一带一路）
      four_init_fn(start,end){
        let vm  = this
        vm.$axios.request("post","SchoolOutDataAys/trend",{startyear:start, endyear:end,flag:'2'},function(data){
          vm.name4 = []
          vm.count4 =[]
          for(let i=0;i<data.result.length;i++){
            vm.name4.push(data.result[i].year + '年')
            vm.count4.push(parseInt(data.result[i].count))
          }
          vm.alb_date_fn()
        },function(err){
          console.log(err);
        })

        vm.$axios.request("post","SchoolOutDataAys/overseasDetails",{startyear:start, endyear:end,flag:'2'},function(data){
          vm.list4 = []
          for(let i=0;i<data.result.length;i++){
            vm.list4.push({
              one:parseInt(data.result[i].count)+ '人',
              two:parseInt(data.result[i].xcount)+ '人',
              three:parseInt(data.result[i].fcount)+ '人',
              four:data.result[i].country,
            })
          }
        },function(err){
          console.log(err);
        })
      },

      //俄罗斯语言echarts
      els_date_fn() {
        let els_date = this.$echarts.init(document.getElementById('els_date'), 'customed');
        let option = {
          /*title: {
            text: '单位(人数)',
            textStyle: {
              fontSize: 12,
            },
          },*/
          color: ['#05D4DB'],
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
            data: ['国际生总数']
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
            data: this.name5
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '国际生总数',
            type: 'line',
            stack: '总量',
            data:this.count5
          }]
        };
        els_date.setOption(option);
      },
      start5_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.end5_time){
          if(this.end5_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.start5_time = ''
            return
          }else{
            vm.start5_time = val
          }
        }else{
          vm.start5_time = val
          vm.five_init_fn(vm.start5_time,vm.end5_time)
        }

      },
      end5_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.start5_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.end5_time = ''
          return
        }else{
          vm.end5_time = val
          vm.five_init_fn(vm.start5_time,vm.end5_time)
        }

      },
      //获取数据方法（一带一路）
      five_init_fn(start,end){
        let vm  = this
        vm.$axios.request("post","SchoolOutDataAys/trend",{startyear:start, endyear:end,flag:'3'},function(data){
          vm.name5 = []
          vm.count5 =[]
          for(let i=0;i<data.result.length;i++){
            vm.name5.push(data.result[i].year + '年')
            vm.count5.push(parseInt(data.result[i].count))
          }
          vm.els_date_fn()
        },function(err){
          console.log(err);
        })

        vm.$axios.request("post","SchoolOutDataAys/overseasDetails",{startyear:start, endyear:end,flag:'3'},function(data){
          vm.list5 = []
          for(let i=0;i<data.result.length;i++){
            vm.list5.push({
              one:parseInt(data.result[i].count)+ '人',
              two:parseInt(data.result[i].xcount)+ '人',
              three:parseInt(data.result[i].fcount)+ '人',
              four:data.result[i].country,
            })
          }
        },function(err){
          console.log(err);
        })
      },


      //数据导出方法
      export2Excel(lister) {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../vendor/Export2Excel');
          const tHeader = ['', '总数', '学历生', '非学历生']; //对应表格输出的title
          const filterVal = ['four', 'one', 'two', 'three', ]; // 对应表格输出的数据
          const list = lister;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '数据分析列表excel'); //对应下载文件的名字
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },

      export2Excel1(lister) {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../vendor/Export2Excel');
          const tHeader = ['洲际', '国家名称', '来华人数', '来北语人数', '学历生', '非学历生']; //对应表格输出的title
          const filterVal = ['continent', 'country', 'total', 'count','xls', 'fxls', ]; // 对应表格输出的数据
          const list = lister;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '数据分析列表excel'); //对应下载文件的名字
        })
      },
      formatJson1(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);

    },
    created(){
      this.menu()
      this.make_time()
      this.one_init_fn(this.start1_time,this.end1_time)
      //获取省份列表
      let vm = this
      this.$axios.request("post","OBOR/OBORToCityAll",{},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.cityList.push(data.result[i].area)
        }
      },function(err){
        console.log(err);
      })
      //历年来华留学生列表
      this.$axios.request("post","/OBOR/OBORTendency",{continent:'',year:'2015'},function(data){
        let result = data.result
        for(let i=0;i<result.length;i++){
          vm.student_abroad.push({continent:result[i].continent,count:result[i].count,country:result[i].country,fxls:result[i].fxls,total:result[i].total,xls:result[i].xls,})
        }
      },function(err){
        console.log(err);
      })
    }
  }
</script>

<style>

</style>
