<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/student' }">生源动态</el-breadcrumb-item>
      <el-breadcrumb-item>一带一路</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg_left" >
        <h5 class="ec_h5"><img src="../../assets/img/student_1.png" height="26" width="26" alt="">一带一路</h5>
        <div style="height:700px;overflow: hidden;" id="studentDistribute">
          <iframe src="https://ydyl.tianditu.gov.cn" id="ydyl" width="100%" height="100%" frameborder="0" style="margin-top: -70px"></iframe>
        </div>
        <div id="ydylDate" v-show="has_data"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
       <ul class="ec_h5 spread">
         <li>洲际分布:</li>
         <li v-for="(spr,index) in spread" >
           <a href="javascript:;" class="ec_h5 spread" :class="{'active':index==keyCode}" @click="changeCode(index)">{{spr}}</a>
         </li>
       </ul>

        <ul class="ec_h5 spread">
          <li>沿途国家:</li>
          <li v-for="(cou,index) in country">
            <a href="javascript:;"
               class="blue"
               :class="{'active':index==cityCode}"
               @click="search_country(cou,index)">{{cou}}</a>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
        <h5 class="ec_h5">
          历史留学生招生人数&nbsp;&nbsp;&nbsp;&nbsp;单位(人)
          <el-button size="mini" style="margin-right: 10px" @click="return_year">返回查看总招生人数</el-button>
          <div class="ec_h5_data">
            <el-date-picker
              size="mini"
              v-model="year_start"
              class="select_width"
              type="year"
              format="yyyy"
              @change="history_year_start"
              placeholder="开始时间">
            </el-date-picker>
            至
            <el-date-picker
              size="mini"
              class="select_width"
              @change="history_year_end"
              format="yyyy"
              v-model="year_end"
              type="year"
              placeholder="结束时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="history">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="8" class="ec_bg_right">
        <h5 class="ec_h5">
          洲际分布
          <div class="ec_h5_data">
            <el-date-picker
              size="mini"
              class="select_width"
              @change="zj_change"
              format="yyyy"
              v-model="zjfb"
              type="year"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="passive1">
        </div>
      </el-col>
      <el-col :span="8" class="ec_bg_right">
        <h5 class="ec_h5">
          学历生比例
          <div class="ec_h5_data">
            <el-date-picker
              size="mini"
              class="select_width"
              @change="xls_change"
              format="yyyy"
              v-model="xlsbl"
              type="year"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="passive2">

        </div>
      </el-col>
      <el-col :span="8" class="ec_bg_right">
        <h5 class="ec_h5">
          男女比例
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="people_date_start"
              type="month"
              format="yyyy-MM"
              @change="people_change_start"
              placeholder="开始时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              @change="people_change_end"
              format="yyyy-MM"
              v-model="people_date_end"
              type="month"
              placeholder="结束时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="peopleScale">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          专业比例
         <div class="ec_h5_data">
           <el-date-picker
             size="mini"
             class="select_width"
             v-model="major_start"
             type="year"
             format="yyyy"
             @change="major_change_start"
             placeholder="开始时间">
           </el-date-picker>
           至
           <el-date-picker
             size="mini"
             class="select_width"
             @change="major_change_end"
             format="yyyy"
             v-model="major_end"
             type="year"
             placeholder="结束时间">
           </el-date-picker>
           <el-select v-model="majorSelect" placeholder="请选择" size="mini" class="major-select" @change="majorChange">
             <el-option
               v-for="item in majorList"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
         </div>
        </h5>
        <div class="ec_height" id="trend">
        </div>
      </el-col>
    </el-row>
   <!-- <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg_left">
        <h5 class="ec_h5">
          历年来华留学生列表
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
        <div class="ec_height" id="positive">
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
    </el-row>-->

    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          历年来华国际生趋势
        </h5>
        <div class="ec_height" id="GJSQS">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg_left">
        <h5 class="ec_h5">
          全国不同城市国际生分布
          <div class="ec_h5_data">
            <el-select v-model="citySelect" placeholder="请选择" size="mini" class="major-select" @change="cityChange">
              <el-option
                v-for="item in cityList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </h5>
        <div class="ec_height" id="positive1">
          <el-table :data="city_data" align="center" height="400" style="width: 100%" :show-header='true'>
            <el-table-column prop="continent" label="年份" class-name="elTableName"></el-table-column>
            <el-table-column prop="country" label="城市"  class-name="elTableName"></el-table-column>
            <el-table-column prop="total" label="学校"  class-name="elTableName"></el-table-column>
            <el-table-column prop="count" label="招生人数"  class-name="elTableName"></el-table-column>
            <el-table-column prop="xls" label="学历生"  class-name="elTableName"></el-table-column>
            <el-table-column prop="fxls" label="非学历生"  class-name="elTableName"></el-table-column>
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
    </el-row>-->
  </div>
</template>

<script>
  require('echarts/map/js/world.js');
  require('echarts-wordcloud');
  import time from '../../config/timeFormat'
  import ecartsData from "../../config/echartsData.js"
  import nameMap from "../../config/worldDate.js"
  import { formatDate } from "../../config/formatDate.js"

  export default {
      data(){
        return{
          loading:true,
          has_data:false,
          //历年来华留学生趋势选择框
          /*continentSelect:'亚洲',
          continentList:['亚洲','欧洲','非洲'],
          come_time:'2015',
          student_abroad: [],*/
          //历年来华留学生洲际分布
          zjfb:'2017',
          zjfb_name:[],
          zjfb_value:[],
          //历年来华留学生比例分布
          xlsbl:'2017',
          xlsbl_name:['学历生','非学历生'],
          xlsbl_value:[],
          //初始化洲际选择
          spread:['全部','亚洲','欧洲','非洲'],
          country:[],
          keyCode:0,
          cityCode:10000,
          //来华人趋势列表

          historyNum:[],
          year_start: '2002',
          year_end: '2017',

          //历史留学生
          start_time: '2002',
          end_time: '2017',
          select_city:'',
          history_year:[],
          history_count:[],
          //洲际分布
          Continent:[],
          Continent_count:[],
          Continent_start:'2002-6',
          Continent_end:'2017-6',
          //男女比例
          people_date_start:'2002-6',
          people_date_end:'2017-6',
          sex:[],
          sex_count:[],
          //专业比例
          majorSelect: '',
          value: "",
          majorList: [],
          major_start:'2002',
          major_end:'2017',
          major_year:[],
          major_count:[],
          sourceData: {
            mapData:[],
            areaList: [],
            areaListBarY: [],
            areaListBarS: [],
            stateList: [],
            peopleScale: [],
            T500List: { name: [], val: [] },
            historyContrast: { signedList: [], recruitList: [], month: [] },
            overseasStudent: {},
            major_obj: { month: [], count: [] },
            browseObj: { contry_count: [], conut: [], name: [] },
            testList:[],
          },

          /*citySelect:'北京市',
          cityList:[],
          city_data:[],
          GJS_time:[],
          GJS_count:[],
          pageNum:1,
          size:10,
          total_count:0,*/
        }
      },
      methods: {
        make_time(){
          let vm = this
          vm.zjfb= time.year,
          vm.xlsbl= time.year,
          vm.year_start= time.year - 10 + '',
          vm.year_end= time.year,
          vm.start_time= time.year - 10 + '',
          vm.end_time= time.year,
          vm.Continent_start= time.year +'-'+ '01',
          vm.Continent_end= time.year +'-'+ time.month,
          vm.people_date_start = time.year +'-'+ '01',
          vm.people_date_end = time.year +'-'+ time.month,
          vm.major_start = time.year - 10 + '',
          vm.major_end = time.year,
          vm.distribute_start = time.year + "-01";
          vm.distribute_end = time.year + "-" + time.month;
          vm.people_start = time.year + "-01";
          vm.people_end = time.year + "-" + time.month;
        },
        //点击国家产看此国家的历史招生人数
        search_country(cou,index){
          let vm = this
          vm.cityCode =index
          vm.select_city = cou
          vm.time_change(this.year_start,this.year_end,vm.select_city)
        },
        return_year(){
          this.cityCode = 10000
          this.select_city = ''
          this.time_change(this.year_start,this.year_end,this.select_city)
        },
        //历年来华留学生的洲际分布
        zj_change(val){
          if(val == undefined){
            return
          }else{
            this.zjfb = val
            this.zj_fn(this.zjfb)
          }

        },
        zj_fn(year){
          let vm = this
          this.$axios.request("post","/OBOR/OBORTendencyContinent",{year:year},function(data){
            let result = data.result
            vm.zjfb_name=[]
            vm.zjfb_value=[]
            for(let i=0;i<result.length;i++){
              vm.zjfb_name.push(result[i].continent)
              vm.zjfb_value.push({value:result[i].count,name:result[i].continent})
            }
            vm.positive()
          },function(err){
            console.log(err);
          })
        },

        //历年来华留学生的学历生分布
        xls_change(val){
          if(val == undefined){
            return
          }else{
            this.xlsbl = val
            this.xls_fn(this.xlsbl)
          }

        },
        xls_fn(year){
          let vm = this
          this.$axios.request("post","/OBOR/OBORDiplomaRatio",{year:year},function(data){
            let result = data.result
            vm.xlsbl_value = []
            for(let i=0;i<result.length;i++){
              vm.xlsbl_value.push({value:result[i].conut,name:'学历生'},{value:result[i].fconut,name:'非学历生'})
            }
            vm.passive()
          },function(err){
            console.log(err);
          })
        },
        //历年来华留学生数据列表
        /*continentChange(val){
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

        },*/
        //点击洲添加class
        changeCode(index){
          let vm = this;
          vm.keyCode = index
          let zhou = ''
          if(vm.spread[index] =='全部'){
            zhou=''
          }else{
            zhou =  vm.spread[index]
          }
          this.$axios.request("post", "/OBOR/OBORCountry", { continent:zhou}, function(data) {
            let result = data.result
            vm.country=[]
            for(let i=0;i<result.length;i++){
              vm.country.push(result[i].country)
            }
          }, function(err) {
            console.log(err);
          })
        },
        //历史招生人数开始时间结束时间变化
        history_year_start(val){
          if(val == undefined){
            return
          }else if(val >this.year_end){
            if(this.year_end!==''){
              this.$message.error('开始时间不能大于结束时间哦！');
              this.year_start = ''
              return
            }else{
              this.$message.error('请选择开始时间！');
              this.year_start = val
            }
          }else{
            this.year_start = val
            this.time_change(this.year_start,this.year_end,this.select_city)
          }

        },
        history_year_end(val){
          if(val == undefined){
            return
          }else if(val<this.year_start){
            this.$message.error('结束时间不能小于开始时间哦！');
            this.year_end = ''
            return
          }else {
            if (this.year_start == '') {
              this.$message.error('请选择开始时间！');
              return
            } else {
              this.year_end = val
              this.time_change(this.year_start, this.year_end, this.select_city)
            }
          }

        },

        //洲际分布开始时间结束时间变化
      /*  Continent_change_start(val){
          this.Continent_start = val
          this.Continent_change(this.Continent_start,this.Continent_end)
        },
        Continent_change_end(val){
          this.Continent_end = val
          this.Continent_change(this.Continent_start,this.Continent_end)
        },*/
        //男女比例人数开始时间结束时间变化
        people_change_start(val){
          if(val == undefined){
            return
          }else if(val >this.people_date_end){
            if(this.people_date_end!==''){
              this.$message.error('开始时间不能大于结束时间哦！');
              this.people_date_start = ''
              return
            }else{
              this.$message.error('请选择结束时间！');

              this.people_date_start = val
            }
          }else{
            this.people_date_start = val
            this.sex_change(this.people_date_start,this.people_date_end)
          }

        },
        people_change_end(val){
          if(val == undefined){
            return
          }else if(val<this.people_date_start){
            this.$message.error('结束时间不能小于开始时间哦！');
            this.people_date_end = ''
            return
          }else {
            if (this.people_date_start == '') {
              this.$message.error('请选择开始时间！');
              return
            } else {
              this.people_date_end = val
              this.sex_change(this.people_date_start, this.people_date_end)
            }
          }

        },
        //专业比例开始时间结束时间变化
        major_change_start(val){
          if(val == undefined){
            return
          }else if(val >this.major_end){
            if(this.major_end!==''){
              this.$message.error('开始时间不能大于结束时间哦！');
              this.major_start = ''
              return
            }else{
              this.$message.error('请选择结束时间！');
              this.major_start = val
            }
          }else{
            this.major_start = val
            this.all_majorChange(this.major_start,this.major_end,this.value)
          }

        },
        major_change_end(val){
          if(val == undefined){
            return
          }else if(val<this.major_start){
            this.$message.error('结束时间不能小于开始时间哦！');
            this.major_end = ''
            return
          }else {
            if (this.major_start == '') {
              this.$message.error('请选择开始时间！');
              return
            } else {
              this.major_end = val
              this.all_majorChange(this.major_start, this.major_end, this.value)
            }
          }

        },
        majorChange(val){
          if(val == undefined){
            return
          }else{
            this.value = val
            this.all_majorChange(this.major_start,this.major_end,this.value)
          }

        },

        //echarts调用函数
        history() {
          let vm = this;
          let myChart = this.$echarts.init(document.getElementById('history'), 'customed');
          let option = {
            title: {
                  text: '提示:点击国家可查看此国家的招生人数哦!',
              textStyle: {
                fontSize: 12,
                color:'red'
              },
              left:'80%',
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
              data: [this.select_city +'留学生人数']
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
              data: vm.history_year
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: this.select_city +'留学生人数',

              type: 'line',
              stack: '总量',
              data: vm.history_count
            }, ]
          };
          //myChart.showLoading();
          myChart.on('click', function(params) {
            //console.log(params.name);
            //vm.$router.push({ path: "studentSourceDetails", query: { name: params.name } });
          });
          vm.$nextTick(function() {
            vm.loading = false;
          })
          myChart.setOption(option);

        },
        //专业比例
        trend() {
          let myChart = this.$echarts.init(document.getElementById('trend'), 'customed');
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
              data: this.major_year
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: '专业比例',
              type: 'line',
              stack: '总量',
              data: this.major_count
            }
            ]
          };
          myChart.setOption(option);
        },
       /* Continent_distribute(data) {
          let myChart = this.$echarts.init(document.getElementById('timeLangth'), 'customed');
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
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {

              x: 'center',
              data: this.Continent
            },
            series: [{
              name: '洲际分布',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
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
              data: this.Continent_count
            }]
          };
          myChart.setOption(option);
        },*/
        peopleScale(data) {
          let myChart = this.$echarts.init(document.getElementById('peopleScale'), 'customed');
          let option = {
            title: {
              text: '单位(人)',
              textStyle: {
                fontSize: 12,
              },
              left:'80%',
              top:'5%'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              x: 'center',
              data: this.sex
            },
            series: [{
              name: '男女比例',
              type: 'pie',
              radius: ['40%', '60%'],
              avoidLabelOverlap: false,
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
              data: this.sex_count
            }]
          };
          myChart.setOption(option);
        },
        positive(){
          let myChart = this.$echarts.init(document.getElementById('passive1'), 'customed');
          let option = {
            title: {
              text: '单位(人)',
              textStyle: {
                fontSize: 12,
              },
              left:'80%',
              top:'5%'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {

              x: 'center',
              data: this.zjfb_name
            },
            series: [{
              name: '洲际分布',
              type: 'pie',
              radius: ['40%', '60%'],
              avoidLabelOverlap: false,
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
              data: this.zjfb_value
            }]
          };
          myChart.setOption(option);
        },
        passive(){
          let myChart = this.$echarts.init(document.getElementById('passive2'), 'customed');
          let option = {
            title: {
              text: '单位(人)',
              textStyle: {
                fontSize: 12,
              },
              left:'80%',
              top:'5%'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {

              x: 'center',
              data: this.xlsbl_name
            },
            series: [{
              name: '学历生分布',
              type: 'pie',
              radius: ['40%', '60%'],
              avoidLabelOverlap: false,
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
              data: this.xlsbl_value
            }]
          };
          myChart.setOption(option);
        },


        //历史招生人数
        time_change(start,end,city) {
          if(city =='全部'){
            city = ''
          }
          let vm = this
          this.$axios.request("post","/OBOR/OBORRecruit",{startyear:start,endyear :end,country:city},function(data){
            console.log(data)
            let result = data.result
            vm.history_year=[]
            vm.history_count = []
            for(let i=0;i<result.length;i++){
              vm.history_year.push(result[i].year)
              vm.history_count.push(result[i].count)
            }
            vm.history()
          },function(err){
            console.log(err);
          })


        },
        //洲际分布
        /*Continent_change(start,end){
          let vm = this
          this.$axios.request("post","/OBOR/OBORContinent",{startTime :start,endTime :end},function(data){
            let result = data.result
            vm.Continent=[]
            vm.Continent_count = []
            for(let i=0;i<result.length;i++){
              vm.Continent.push(result[i].continent)
              vm.Continent_count.push({value:result[i].count,name:result[i].continent})
            }
            vm.Continent_distribute()
          },function(err){
            console.log(err);
          })
        },*/
        //男女比例
        sex_change(start,end){
          let vm = this
          //男女比例
          this.$axios.request("post","/OBOR/OBORSex",{startTime :start,endTime :end},function(data){
            let result = data.result
            vm.sex=[]
            vm.sex_count=[]
            for(let i=0;i<result.length;i++){
              if(result[i].sex !=='null'){
                vm.sex.push(result[i].sex)
                vm.sex_count.push({value:result[i].count,name:result[i].sex})
              }
            }
            vm.peopleScale()
          },function(err){
            console.log(err);
          })

        },
        //专业比例
        all_majorChange(start,end,major){
          let vm = this
          this.$axios.request("post","/OBOR/OBORSpecialty",{startyear :start,endyear :end,specialty:major},function(data){
            let result = data.result
            vm.major_year=[]
            vm.major_count=[]
            for(let i=0;i<result.length;i++){
              vm.major_year.push(result[i].year)
              vm.major_count.push({value:result[i].count,name:result[i].year})
            }
            vm.trend()
          },function(err){
            console.log(err);
          })

        },

        //一代一路显示数据
        coutry_data(){
          var vm = this
          let ydylDate = this.$echarts.init(document.getElementById('ydylDate'), 'customed');
          let option = {
            color: ['#3398DB'],
            tooltip : {
              trigger: 'axis',
              axisPointer : { type : 'shadow',}
            },
            grid: {
              top:'10%',
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            xAxis : [
              {
                type : 'category',
                data : ['CVI', 'WI', 'THI', 'BI', 'BAI', 'WBPI', 'OMI'],
                axisTick: { //axisTick
                  inside:true,
                  alignWithLabel: true,//在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
                },

              }
            ],
            yAxis : [
              {
                type : 'value',
                splitLine:{  //坐标轴在 grid 区域中的分隔线；
                  show:true,
                  lineStyle:{ //分割线颜色，可设单个，也可以设置数组。
                    color:'rgba(204,204,204,0.5)',
                  },

                },
              }
            ],
            series : [
              {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[56, 22, 20, 34, 23, 30, 5]
              }
            ]
          };
          ydylDate.on('mouseover', function(params) {
            vm.has_data = true
          });

          ydylDate.setOption(option);
        },


        /*//国际生趋势以及列表
        GJSQS_fn(){
          let GJSQS = this.$echarts.init(document.getElementById('GJSQS'), 'customed');
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
              data: this.GJS_time
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: '专业比例',
              type: 'line',
              stack: '总量',
              data: this.GJS_count
            }
            ]
          };
          GJSQS.setOption(option);
        },
        //不同省份学生列表
        cityChange(val){
          let vm = this
          vm.citySelect = val

        },
        city_list_data(item){
          //获取省份列表
          this.$axios.request("post","OBOR/OBORToCity",{city:item},function(data){
            console.log(data)
            for(let i=0;i<data.result.length;i++){
            }
          },function(err){
            console.log(err);
          })
        },
        //分页函数
        handleSizeChange(val) {
          var vm = this
          this.pageNum = val
        },
        handleCurrentChange(val) {
          var vm = this
          this.pageNum = val
        },*/

      },
      mounted(index) {
        //echarts主题
        this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      },
      created(index) {
        window.scrollTo(0,0);
        let vm = this
        vm.make_time()
        this.changeCode(index)
        let area = {};
        vm.areaList = [];
        vm.$axios.request("post", "/recruit/findTop10", {}, function(data) {
          //console.log(data);
          for (let i = 0; i < data.result.length; i++) {
            vm.sourceData.areaList.push({ name: data.result[i].country, value: data.result[i].count });
            vm.sourceData.areaListBarY.push(data.result[i].country);
            vm.sourceData.areaListBarS.push(parseInt(data.result[i].count));
            for (let prop in nameMap) {
              if(nameMap[prop] == data.result[i].country){
                vm.sourceData.mapData.push({name:prop,value:data.result[i].count});
              }
            }
          }
          //console.log( vm.sourceData.mapData);
          /*vm.$nextTick(function() {
            vm.studentDistribute(vm.sourceData.mapData);
          })*/
        }, function(err) {
          console.log(err);
          return false;
        });




        this.area = this.$route.query.name;
        //历史招生人数点开页面默认显示全部数据
        this.$axios.request("post","/OBOR/OBORRecruit",{startyear:vm.start_time,endyear :vm.end_time},function(data){
          let result = data.result
          for(let i=0;i<result.length;i++){
            vm.history_year.push(result[i].year)
            vm.history_count.push(result[i].count)
          }
          vm.history()
        },function(err){
          console.log(err);
        })

        /*//洲际分布，默认显示全部数据
        this.$axios.request("post","/OBOR/OBORContinent",{startTime :'2002-6',endTime  :'2017-6'},function(data){
          let result = data.result
          for(let i=0;i<result.length;i++){
            vm.Continent.push(result[i].continent)
            vm.Continent_count.push({value:result[i].count,name:result[i].continent})
          }
          vm.Continent_distribute()
        },function(err){
          console.log(err);
        })*/

        //男女比例
        this.$axios.request("post","/OBOR/OBORSex",{startTime :'2009-2'},function(data){
          let result = data.result
          vm.sex=[]
          vm.sex_count=[]
          for(let i=0;i<result.length;i++){
            vm.sex.push(result[i].sex)
            vm.sex_count.push({value:result[i].count,name:result[i].sex})
          }
          vm.peopleScale()
        },function(err){
          console.log(err);
        })

        //专业比例major
        this.$axios.request("post","/OBOR/OBORSpecialty",{startyear :'2002-2',endyear :'2017-2',specialty:'汉语言'},function(data){
          let result = data.result
          vm.major_year=[]
          vm.major_count=[]
          for(let i=0;i<result.length;i++){
            vm.major_year.push(result[i].year)
            vm.major_count.push({value:result[i].count,name:result[i].year})
          }
          vm.trend()
        },function(err){
          console.log(err);
        })

        //获取专业
        vm.majorList = [];
        vm.$axios.request("post", "/recruit/findAllSpecialty", "", function(data) {
          for (let i = 0; i < data.specialtyList.length; i++) {
            vm.$nextTick(function() {
              vm.majorList.push({ value: data.specialtyList[i].specialty, label: data.specialtyList[i].specialty });
            })
          }
        }, function(err) {
          console.log(err);
        })
        //初始化条件(可以不传)
        vm.majorSelect = "汉语言";

       /* //历年来华留学生列表
        this.$axios.request("post","/OBOR/OBORTendency",{continent:'',year:'2015'},function(data){
          let result = data.result
          for(let i=0;i<result.length;i++){
            vm.student_abroad.push({continent:result[i].continent,count:result[i].count,country:result[i].country,fxls:result[i].fxls,total:result[i].total,xls:result[i].xls,})
          }
        },function(err){
          console.log(err);
        })*/

        //历年来华留学生趋势之洲际分布，默认显示全部数据
        this.$axios.request("post","/OBOR/OBORTendencyContinent",{year:'2017'},function(data){
          let result = data.result
          for(let i=0;i<result.length;i++){
            vm.zjfb_name.push(result[i].continent)
            vm.zjfb_value.push({value:result[i].count,name:result[i].continent})
          }
          vm.positive()
        },function(err){
          console.log(err);
        })

        //历年来华留学生趋势之学历生比例，默认显示全部数据
        this.$axios.request("post","/OBOR/OBORDiplomaRatio",{year:'2017'},function(data){
          let result = data.result
          for(let i=0;i<result.length;i++){
            vm.xlsbl_value.push({value:result[i].conut,name:'学历生'},{value:result[i].fconut,name:'非学历生'})
          }
          vm.passive()
        },function(err){
          console.log(err);
        })

        /*//历年国际生趋势
        this.$axios.request("post","OBOR/OBORToChina",{},function(data){
          for(let i=0;i<data.result.length;i++){
            vm.GJS_time.push(data.result[i].year + '年')
            vm.GJS_count.push(parseInt(data.result[i].count))
          }
          vm.GJSQS_fn()
        },function(err){
          console.log(err);
        })

        //获取省份列表
        this.$axios.request("post","OBOR/OBORToCityAll",{},function(data){
          for(let i=0;i<data.result.length;i++){
            vm.cityList.push(data.result[i].area)
          }
        },function(err){
          console.log(err);
        })
        this.city_list_data(this.citySelect)*/
      },
    }
</script>

<style lang="scss" scoped>
  .spread{
    overflow: hidden;
    li{
      margin: 0 10px;
      float: left;
    }
  }
  .active{
    color: red;
  }
  .major-select {
    width: 130px;
  }

  #ydylDate{
    width: 400px;
    height: 250px;
    position: absolute;
    top: 150px;
    right: 20px;
  }

</style>
