<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/student' }">招生洞察首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{area}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          <el-input
            style="width: 230px"
            size="small"
            v-model="input"
            @keyup.enter.native = 'search_code()'
            placeholder="请正确输入想查询的国家名称"
            icon="search"
            :on-icon-click="handleIconClick">
          </el-input>
        </h5>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: -10px">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
            历年招生人数
          </h5>
        <div class="ec_height" id="history">
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
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg_left">
        <h5 class="ec_h5">
            学制比例-({{time}}年)
          </h5>
        <div class="ec_height" id="timeLangth">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg_right">
        <h5 class="ec_h5">
            男女比例-({{time}}年)
          </h5>
        <div class="ec_height" id="peopleScale">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
            学历生和非学历生趋势分析
          </h5>
        <div class="ec_height" id="trend">
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input:'',
      time:'',
      area: "",
      historyYears:[],
      historyCount:[],
      history_come_Count:[],
      not_come_count:[],
      timeLength:[],
      timeCount:[],
      sex:[],
      sexDate:[],
      DiplomaYear:[],
      Diploma:[],
      noDiploma:[],
      positive_list: [],
      passive_list:[],
      //存放echarts的dom
      history_dom:'',
      timeLangth_dom:'',
      peopleScale_dom:'',
      trend_dom:'',

      go_time:'',
      go_time_title:'',
      listData: [],
      out_data:[],
      dialogVisible: false,
      pageNum:1,
      size:8,
      total_count:0,
      loading_list:true,
      S_flag:'',
    }
  },
    methods: {
      //echarts图函数
      history() {
          let vm = this;
          let option = {
            title: {
              text: '点击柱状图查看列表',
              textStyle: {
                fontSize: 12,
                color:'red'
              },
              left:'85%',
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
              data: this.historyYears,
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              name: '招生人数',
              type: 'line',
              data: this.historyCount,
            },
              {
                name: '报到学生',
                type: 'line',
                data: this.history_come_Count,
              },
              {
                name: '未到人数',
                barWidth : 30,
                type: 'bar',
                data: this.not_come_count
              },
            ]
          };
          this.history_dom.setOption(option);
          this.history_dom.on('click',function(params){
          if(params.seriesName == '未到人数'){
            vm.go_time_title = params.name +params.seriesName
            vm.go_time = parseInt(params.name) + ''
            vm.dialogVisible = true
            vm.S_flag = '未到人数'
            vm.not_come_student(vm.area,vm.go_time,vm.pageNum,vm.size)
            vm.out_not_come_student(vm.area,vm.go_time,'-1','-1')
          }else if(params.seriesName == '招生人数'){
            vm.go_time_title = params.name +params.seriesName
            vm.go_time = parseInt(params.name) + ''
            vm.dialogVisible = true
            vm.S_flag = '招生人数'
            vm.zhaosheng_student(vm.area,vm.go_time,vm.pageNum,vm.size)
            vm.out_zhaosheng_student(vm.area,vm.go_time,'-1','-1')
          }else{
            vm.go_time_title = params.name +params.seriesName
            vm.go_time = parseInt(params.name) + ''
            vm.dialogVisible = true
            vm.S_flag = '报到人数'
            vm.come_student(vm.area,vm.go_time,vm.pageNum,vm.size)
            vm.out_come_student(vm.area,vm.go_time,'-1','-1')
          }
        })
      },
      //未到留学生列表
      not_come_student(country,year,page,size){
        let vm = this
        vm.$axios.request("post","sourceTrends/getRecruitInfoo", {
          country:country,
          year:year,
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
      out_not_come_student(country,year,page,size){
        let vm = this
        vm.$axios.request("post","sourceTrends/getRecruitInfoo", {
          country:country,
          year:year,
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
      zhaosheng_student(country,year,page,size){
        let vm = this
        vm.$axios.request("post","sourceTrends/getRecruitInfoo2", {
          country:country,
          year:year,
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
      out_zhaosheng_student(country,year,page,size){
        let vm = this
        vm.$axios.request("post","sourceTrends/getRecruitInfoo2", {
          country:country,
          year:year,
          page:page,
          pageSize:size
        },function(data){
          console.log(data)
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
      come_student(country,year,page,size){
        let vm = this
        vm.$axios.request("post","sourceTrends/getRecruitInfoo1", {
          country:country,
          year:year,
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
      out_come_student(country,year,page,size){
        let vm = this
        vm.$axios.request("post","sourceTrends/getRecruitInfoo1", {
          country:country,
          year:year,
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
          vm.not_come_student(vm.area,vm.go_time,vm.pageNum,vm.size)
        }else if(vm.S_flag == '招生人数'){
          vm.zhaosheng_student(vm.area,vm.go_time,vm.pageNum,vm.size)
        }else{
          vm.come_student(vm.area,vm.go_time,vm.pageNum,vm.size)
        }
      },
      handleCurrentChange(val) {
        var vm = this
        vm.loading_list = true
        vm.pageNum = val
        if(vm.S_flag == '未到人数'){
          vm.not_come_student(vm.area,vm.go_time,vm.pageNum,vm.size)
        }else if(vm.S_flag == '招生人数'){
          vm.zhaosheng_student(vm.area,vm.go_time,vm.pageNum,vm.size)
        }else{
          vm.come_student(vm.area,vm.go_time,vm.pageNum,vm.size)
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

      timeLangth(data) {
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
            formatter: "{a} <br/>{b}: {c} 人 ({d}%)"
          },
          legend: {
            x: 'center',
            data: this.timeLength
          },
          series: [{
            name: '学制比例',
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
            data: this.timeCount
          }]
        };
        this.timeLangth_dom.setOption(option);
      },
      peopleScale(data) {
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
            data: this.sex
          },
          series: [{
            name: '男女比例',
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
            data: this.sexDate
          }]
        };
        this.peopleScale_dom.setOption(option);
      },
      trend() {
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
          legend: {
            data: ['学历生', '非学历生']
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
            data: this.DiplomaYear
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '学历生',
            type: 'line',
            stack: '总量',
            data: this.Diploma
          },
            {
              name: '非学历生',
              type: 'line',
              stack: '总量',
              data: this.noDiploma
            }
          ]
        };
        this.trend_dom.setOption(option);
      },

      //echarts图请求数据渲染图表的函数
      all_chart_init(area,time){
        let vm =this
        //历史招生人数
        this.$axios.request("post","/sourceTrends/yearsCountByContry",{country: area},function(data){
          vm.historyYears =[]
          vm.historyCount = []
          vm.history_come_Count = []
          vm.not_come_count = []
          for(let i=0;i<data.result1.length;i++){
            vm.historyYears.push(data.result1[i].year)
            vm.historyCount.push(data.result1[i].count)
          }
          for(let i=0;i<data.result.length;i++){
            vm.history_come_Count.push(data.result[i].count)
          }
          for(let i=0;i<data.result2.length;i++){
            vm.not_come_count.push(data.result2[i].count)
          }
          vm.history()
        },function(err){
          console.log(err);
        })
        //学制比例
        this.$axios.request("post", "/sourceTrends/systemCountByContry", { country: area,year:time }, function(data) {
          var result = data.result
          vm.timeLength = []
          vm.timeCount = []
          let year = ''
          for(var i=0;i<result.length;i++){
            if(result[i].years == '0'){
              year = '短期生'
            }else{
              year = '长期生'
            }
            vm.timeLength.push(year)
            vm.timeCount.push({name:year,value:result[i].count})
          }
          vm.$nextTick(function() {
            vm.timeLangth();
          })
        }, function(err) {
          console.log(err);
        })
        //男女比例
        this.$axios.request("post", "/sourceTrends/sexCountByContry", { country: area,year:time }, function(data) {
          var result = data.result
          vm.sexDate = []
          vm.sex = []
          for(var i=0;i<result.length;i++){
            vm.sex.push(result[i].sex)
            if(result[i].sex !=='null'){
              vm.sexDate.push({name:result[i].sex,value:result[i].count})
            }
          }
          vm.$nextTick(function() {
            vm.peopleScale();
          })
        }, function(err) {
          console.log(err);
        })

        //非学历生趋势
        this.$axios.request("post", "/sourceTrends/nonDiplomaStudents", { country: area }, function(data) {
          var result = data.result
          vm.DiplomaYear = []
          vm.noDiploma = []
          for(var i=0;i<result.length;i++){
            vm.DiplomaYear.push(result[i].year)
            vm.noDiploma.push(result[i].count)
          }
          vm.trend()
        }, function(err) {
          console.log(err);
        })
        //学历生趋势
        this.$axios.request("post", "/sourceTrends/diplomaStudents", { country: area }, function(data) {
          var result = data.result
          vm.Diploma = []
          for(var i=0;i<result.length;i++){
            vm.Diploma.push(result[i].count)
          }
          vm.trend()
        }, function(err) {
          console.log(err);
        })


      },
      //点击放大镜根据国家查询
      handleIconClick(){
        let vm =this
        this.area = this.input
        vm.all_chart_init(this.area,this.time)
      },
      search_code(){
        let vm =this
        this.area = this.input
        vm.all_chart_init(this.area,this.time)
      },

      positive(){

      },
      passive(){

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
  mounted() {
    //echarts主题
    this.$echarts.registerTheme('customed', this.$store.state.echartsData);
    this.history_dom = this.$echarts.init(document.getElementById('history'), 'customed');
    this.timeLangth_dom = this.$echarts.init(document.getElementById('timeLangth'), 'customed');
    this.peopleScale_dom = this.$echarts.init(document.getElementById('peopleScale'), 'customed');
    this.trend_dom = this.$echarts.init(document.getElementById('trend'), 'customed');
  },
  created() {
    let vm = this;
    this.area = this.$route.query.name;
    this.time = this.$route.query.time;
    vm.all_chart_init(this.area,this.time)
  }
}

</script>
<style>


</style>
