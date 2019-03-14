<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/student' }">生源动态</el-breadcrumb-item>
      <el-breadcrumb-item>留学生招生渠道分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
	        留学生招生网站访问次数&nbsp;&nbsp;&nbsp;&nbsp;单位(次)
          <el-button size="mini" style="margin-right: 10px" @click="return_year" v-show="isShow">返回当前年度</el-button>
	        <div class="ec_h5_data">
	            <el-date-picker
	              size="mini"
                class="select_width"
	              v-model="visitNumber_start"
	              type="year"
	              format="yyyy"
	              @change="visitNumber_change"
	              placeholder="选择年">
	             </el-date-picker>
	         </div>
	      </h5>
        <div class="ec_height" id="visitNumber">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
	        留学生招生网站访问分布
	          <div class="ec_h5_data">
	            <el-date-picker
	              size="mini"
                class="select_width"
	              v-model="overseasStudent_start"
	              type="year"
	              format="yyyy"
	              @change="overseasStudent_change"
	              placeholder="选择年">
	             </el-date-picker>
	          </div>
	      </h5>
        <div class="ec_height" id="overseasStudent">
        </div>
      </el-col>
    </el-row>
   <!-- <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
	        留学生招生人员分布Top10
	          <div class="ec_h5_data">
	            <el-date-picker
	              size="mini"
                class="select_width"
	              v-model="peopleTop10_start"
	              type="year"
	              format="yyyy"
	              @change="peopleTop10_change"
	              placeholder="选择年">
	             </el-date-picker>
	          </div>
	      </h5>
        <div class="ec_height" id="peopleTop10">
        </div>
      </el-col>
    </el-row>-->
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
	        孔子学院分布
	          <div class="ec_h5_data">
              <el-button type="primary"  @click="out_date" style="margin-left: 10px;">导出数据</el-button>
	            <el-date-picker
  	              size="mini"
  	              v-model="Confucius_start"
  	              type="year"
                  class="select_width"
  	              format="yyyy"
  	              @change="Confucius_change"
  	              placeholder="选择年">
	             </el-date-picker>
	          </div>
	        </h5>
        <div id="Confucius">
          <el-table align="center"  :data="tableData" style="width: 100%;height: 550px;">
            <el-table-column  class-name="elTableName" align="center" prop="city" label="国家" width="180">
            	 <template slot-scope="scope">
            		<span style="cursor: pointer" @click="cityDetails(scope.$index, scope.row)">{{scope.row.city}}</span>
			         </template>
            </el-table-column>
            <el-table-column class-name="elTableName" align="center" prop="name" label="学院" width="180">
            </el-table-column>
            <el-table-column class-name="elTableName" align="center" prop="address" label="合作机构">
            </el-table-column>
            <el-table-column class-name="elTableName" align="center" prop="people" label="负责人姓名">
            </el-table-column>
            <el-table-column class-name="elTableName" align="center" prop="phone" label="电话">
            </el-table-column>
            <el-table-column class-name="elTableName" align="center" prop="mailbox" label="邮箱">
            </el-table-column>
            <el-table-column class-name="elTableName" align="center" prop="runTime" label="启动日期">
            </el-table-column>
            <el-table-column class-name="elTableName" align="center" prop="yjdz" label="邮寄地址">
            </el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size=page_size
            layout="total, prev, pager, next"
            :total=all_count>
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import time from "../../config/timeFormat.js"
export default {
  data() {
    return {
      isShow:false,
      currentPage: 1,
      page_size:10,
      all_count:0,
      //留学生访问网站次数
      visitNumber_start: "2017",
      visitNumber_time:[],
      visitNumber_count:[],
      visitNumber_title:[],
      //留学生访问网站分布
      overseasStudent_start: "2017",
      overseasStudent_name:[],
      overseasStudent_count:[],
      overseasStudent_title:[],
      /*peopleTop10_start: "2017",*/
      Confucius_start: "2016",
      tableData: [],
      downLoadList:[],
    }
  },
  methods: {
    make_time(){
      let vm = this
      vm.visitNumber_start= time.year,
      vm.overseasStudent_start= time.year,
      vm.Confucius_start= time.year
    },

    return_year(){
      setTimeout(function(){
        vm.isShow = false
      },1000)
      let vm = this
      //留学生访问网站次数
      vm.$axios.request("post","studentsource/websiteVisitCount",{year:vm.visitNumber_start,flag:'0'},function(data){
        vm.visitNumber_title=[]
        vm.visitNumber_time = []
        vm.visitNumber_count = []
        for(let i=0;i<data.result.length;i++){
          vm.visitNumber_time.push(data.result[i].month+'月')
          vm.visitNumber_count.push(data.result[i].count)
        }
        let title = vm.visitNumber_start +'年留学生网站访问次数'
        vm.visitNumber_title.push(title)
        vm.visitNumber()
      },function(err){
        console.log(err);
      })

    },
    menu() {
      window.scrollTo(0,0);
    },

    //留学生访问网站次数
    visitNumber() {
      let vm = this
      let myChart = this.$echarts.init(document.getElementById('visitNumber'), 'customed');
      let option = {
        title: {
          text: '提示:点击月份时间点查看当月数据详情',
          textStyle: {
            fontSize: 12,
            color:'red'
          },
          left:'80%',
          top:'5%'
        },
        color:['#C932CF'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{a} <br/>{b} : {c}次"
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: vm.visitNumber_title
        },
        xAxis: [{
          type: 'category',
          data: vm.visitNumber_time,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: vm.visitNumber_title[0],
          type: 'line',
          barWidth: '60%',
          data: vm.visitNumber_count,
          label:{
            normal:{
              show:true,
              position:'top'
            }
          },
        }]
      };
      myChart.setOption(option);
      myChart.on('click',function(params){
        setTimeout(function(){
          vm.isShow = true
        },1000)
        let time = ''
        let flag = params.name
        let flag2 = params.name
        flag = flag.slice(1,2)
        flag2 = flag2.slice(2,3)
        if(flag =='号'||flag2 =='号'){
          return
        }else {
          if (parseInt(params.name) < 10) {
            time = vm.visitNumber_start + '-' + '0' + parseInt(params.name)
          } else {
            time = vm.visitNumber_start + '-' + parseInt(params.name)
          }
          //留学生访问次数按月查
          vm.$axios.request("post", "studentsource/websiteVisitCount", {date: time, flag: '1'}, function (data) {
            vm.visitNumber_title = []
            vm.visitNumber_time = []
            vm.visitNumber_count = []
            for (var i = 0; i < data.result.length; i++) {
              vm.visitNumber_time.push(data.result[i].day + '号')
              vm.visitNumber_count.push(data.result[i].count)
            }
            let title = vm.visitNumber_start + '-' + parseInt(params.name) + '月留学生网站访问次数'
            vm.visitNumber_title.push(title)
            vm.visitNumber();
          }, function (err) {
            console.log(err);
          })
        }
      })
    },
    visitNumber_change(val) {
      let vm = this
      if(val == undefined){
        return
      }else{
        vm.visitNumber_start = val
        //留学生访问网站次数
        vm.$axios.request("post","studentsource/websiteVisitCount",{year:vm.visitNumber_start,flag:'0'},function(data){
          vm.visitNumber_title=[]
          vm.visitNumber_time = []
          vm.visitNumber_count = []
          for(let i=0;i<data.result.length;i++){
            vm.visitNumber_time.push(data.result[i].month+'月')
            vm.visitNumber_count.push(data.result[i].count)
          }
          let title = vm.visitNumber_start +'年留学生网站访问次数'
          vm.visitNumber_title.push(title)
          vm.visitNumber()
        },function(err){
          console.log(err);
        })
      }

    },
    //留学生网站访问分布
    overseasStudent(){
      let vm =this
      let myChart = this.$echarts.init(document.getElementById('overseasStudent'), 'customed');
      let option = {
        title: {
          text: '单位(次)',
          textStyle: {
            fontSize: 12,
          },
          left:'90%',
          top:'5%'
        },
        color:['#64CF8F'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: "{a} <br/>{b} : {c}次"
        },
        legend: {
          data: vm.overseasStudent_title
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
          data: vm.overseasStudent_name
        },
        series: [{
          name: vm.overseasStudent_title[0],
          type: 'bar',
          data: vm.overseasStudent_count,
          label:{
            normal:{
              show:true,
            }
          },
        }]
      };

      myChart.setOption(option);
    },
    overseasStudent_change(val) {
      let vm = this
      if(val == undefined){
        return
      }else{
        vm.overseasStudent_start = val
        //留学生招生网站访问分布
        vm.$axios.request("post","studentsource/visitDistribute",{year:vm.overseasStudent_start,flag:'0'},function(data){
          vm.overseasStudent_name = []
          vm.overseasStudent_count = []
          vm.overseasStudent_title = []
          for(let i=0;i<data.result.length;i++){
            vm.overseasStudent_name.push(data.result[i].sitename)
            vm.overseasStudent_count.push(data.result[i].count)
          }
          let title = vm.overseasStudent_start +'年留学生网站访问分布'
          vm.overseasStudent_title.push(title)
          vm.overseasStudent()
        },function(err){
          console.log(err);
        })
      }


    },
    //留学生招生人数分布TOP10
    /*peopleTop10_template(time){
      let vm = this;
      vm.$axios.request("post","/studentsource/forenignStuDistribute10",{year: time },function(data){
       // console.log(data);
        let peopleTop10Obj = {contry:[],count:[]};
        for (let i = 0; i < data.result.length; i++) {
            peopleTop10Obj.contry.push(data.result[i].contry);
            peopleTop10Obj.count.push(data.result[i].count);
        }
       // console.log(peopleTop10Obj);
        vm.peopleTop10(peopleTop10Obj);
      },function(err){
        console.log(err);
      })
    },
    peopleTop10_change(val) {
       this.peopleTop10_template(val);
    },
    peopleTop10(data) {
      //console.log(data);
      let myChart = this.$echarts.init(document.getElementById('peopleTop10'), 'customed');
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
          data: ['国家']
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
          data: data.contry
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
            name: '国家',
            type: 'line',
            stack: '总量',
            //areaStyle: { normal: {} },
            data: data.count,
            label:{
              normal:{
                show:true,
                position:'top'
              }
            },
          },
        ]
      };
      myChart.setOption(option);
    },*/

    //孔子学院列表相关函数
    Confucius_table(time){
      let vm = this;
      var count = vm.currentPage.toString()
      var size = vm.page_size.toString()
      //生源地分布-孔子学院分布
      vm.$axios.request("post","/studentsource/confuciusDistribute",{year: time,page:count,pageSize:size},function(data){
        vm.tableData = []
        vm.all_count = parseInt(data.totalCount)
        for(var i=0;i<data.result.length;i++){
          let city = ''
          let name = ''
          let address = ''
          let runTime = ''
          let people = ''
          let phone = ''
          let mailbox = ''
          let yjdz = ''
          if(data.result[i].address =='null'){
            yjdz = '未知'
          }else{
            yjdz = data.result[i].address
          }
          if(data.result[i].cs =='null'){
            city = '未知'
          }else{
            city = data.result[i].cs
          }

          if(data.result[i].mc =='null'){
            name = '未知'
          }else{
            name = data.result[i].mc
          }

          if(data.result[i].hzjg =='null'){
            address = '未知'
          }else{
            address = data.result[i].hzjg
          }

          if(data.result[i].time =='null'){
            runTime = '未知'
          }else{
            runTime = data.result[i].time
          }
          if(data.result[i].people =='null'){
            people = '未知'
          }else{
            people = data.result[i].people
          }
          if(data.result[i].phone =='null'){
            phone = '未知'
          }else{
            phone = data.result[i].phone
          }
          if(data.result[i].email =='null'){
            mailbox = '未知'
          }else{
            mailbox = data.result[i].email
          }

          vm.tableData.push({
            city:city,
            name:name,
            address:address,
            runTime:runTime,
            people:people,
            phone:phone,
            mailbox:mailbox,
            yjdz:yjdz
          })
        }
      },function(err){
        console.log(err);
      })
    },
    Confucius_change(val) {
      this.Confucius_start = val
      this.currentPage = 1
      this.Confucius_table(this.Confucius_start);
    },
    cityDetails(index, row){
      //console.log(this.$route);
      //this.$router.push({path:'studentOriginAreaDetails',query:{city:row.city}})
    },
    //孔子学院分布分页
    handleSizeChange(val) {
      var vm = this
      vm.currentPage = val
      var count = vm.currentPage.toString()
      var size = vm.page_size.toString()
      //生源地分布-孔子学院分布
      vm.$axios.request("post","/studentsource/confuciusDistribute",{year: vm.Confucius_start,page:count,pageSize:size},function(data){
        vm.all_count = parseInt(data.totalCount)
        vm.tableData = []
        for(var i=0;i<data.result.length;i++){
          let city = ''
          let name = ''
          let address = ''
          let runTime = ''
          let people = ''
          let phone = ''
          let mailbox = ''
          if(data.result[i].cs =='null'){
            city = '未知'
          }else{
            city = data.result[i].cs
          }

          if(data.result[i].mc =='null'){
            name = '未知'
          }else{
            name = data.result[i].mc
          }

          if(data.result[i].hzjg =='null'){
            address = '未知'
          }else{
            address = data.result[i].hzjg
          }

          if(data.result[i].time =='null'){
            runTime = '未知'
          }else{
            runTime = data.result[i].time
          }
          if(data.result[i].people =='null'){
            people = '未知'
          }else{
            people = data.result[i].people
          }
          if(data.result[i].phone =='null'){
            phone = '未知'
          }else{
            phone = data.result[i].phone
          }
          if(data.result[i].email =='null'){
            mailbox = '未知'
          }else{
            mailbox = data.result[i].email
          }

          vm.tableData.push({
            city:city,
            name:name,
            address:address,
            runTime:runTime,
            people:people,
            phone:phone,
            mailbox:mailbox,
          })
        }

      },function(err){
        console.log(err);
      })
    },
    handleCurrentChange(val) {
      var vm = this
      vm.currentPage = val
      var count = vm.currentPage.toString()
      var size = vm.page_size.toString()
      //生源地分布-孔子学院分布
      vm.$axios.request("post","/studentsource/confuciusDistribute",{year: vm.Confucius_start,page:count,pageSize:size},function(data){
        vm.tableData = []
        for(var i=0;i<data.result.length;i++){
          let city = ''
          let name = ''
          let address = ''
          let runTime = ''
          let people = ''
          let phone = ''
          let mailbox = ''
          if(data.result[i].cs =='null'){
            city = '未知'
          }else{
            city = data.result[i].cs
          }

          if(data.result[i].mc =='null'){
            name = '未知'
          }else{
            name = data.result[i].mc
          }

          if(data.result[i].hzjg =='null'){
            address = '未知'
          }else{
            address = data.result[i].hzjg
          }

          if(data.result[i].time =='null'){
            runTime = '未知'
          }else{
            runTime = data.result[i].time
          }
          if(data.result[i].people =='null'){
            people = '未知'
          }else{
            people = data.result[i].people
          }
          if(data.result[i].phone =='null'){
            phone = '未知'
          }else{
            phone = data.result[i].phone
          }
          if(data.result[i].email =='null'){
            mailbox = '未知'
          }else{
            mailbox = data.result[i].email
          }

          vm.tableData.push({
            city:city,
            name:name,
            address:address,
            runTime:runTime,
            people:people,
            phone:phone,
            mailbox:mailbox,
          })
        }

      },function(err){
        console.log(err);
      })
    },
    downLoad_list_fn(){
      let vm = this
      vm.$axios.request("post","/studentsource/confuciusDistributeAll",{},function(data){
        for(var i=0;i<data.result.length;i++){
          let city = ''
          let name = ''
          let address = ''
          let runTime = ''
          let people = ''
          let phone = ''
          let mailbox = ''
          let yjdz = ''
          if(data.result[i].address =='null'){
            yjdz = '未知'
          }else{
            yjdz = data.result[i].address
          }
          if(data.result[i].cs =='null'){
            city = '未知'
          }else{
            city = data.result[i].cs
          }

          if(data.result[i].mc =='null'){
            name = '未知'
          }else{
            name = data.result[i].mc
          }

          if(data.result[i].hzjg =='null'){
            address = '未知'
          }else{
            address = data.result[i].hzjg
          }

          if(data.result[i].time =='null'){
            runTime = '未知'
          }else{
            runTime = data.result[i].time
          }
          if(data.result[i].people =='null'){
            people = '未知'
          }else{
            people = data.result[i].people
          }
          if(data.result[i].phone =='null'){
            phone = '未知'
          }else{
            phone = data.result[i].phone
          }
          if(data.result[i].email =='null'){
            mailbox = '未知'
          }else{
            mailbox = data.result[i].email
          }

          vm.downLoadList.push({
            city:city,
            name:name,
            address:address,
            runTime:runTime,
            people:people,
            phone:phone,
            mailbox:mailbox,
            yjdz:yjdz
          })

        }
      },function(err){
        console.log(err);
      })
    },


    out_date(){
      this.export2Excel(this.downLoadList)
    },
    //数据导出方法
    export2Excel(lister) {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../vendor/Export2Excel');
        const tHeader = ['国家','学院', '合作机构', '负责人姓名', '电话','邮箱','启动日期','邮寄地址']; //对应表格输出的title
        const filterVal = ['city','name', 'address', 'people', 'phone','mailbox', 'runTime','yjdz']; // 对应表格输出的数据
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
  },
  created() {
    let vm = this;
    vm.menu()
    vm.make_time()
    /*vm.peopleTop10_template(this.peopleTop10_start);*/
    vm.Confucius_table(vm.Confucius_start);

    //留学生访问网站次数
    vm.$axios.request("post","studentsource/websiteVisitCount",{year:vm.visitNumber_start,flag:'0'},function(data){
      for(let i=0;i<data.result.length;i++){
        vm.visitNumber_time.push(data.result[i].month+'月')
        vm.visitNumber_count.push(data.result[i].count)
      }
      let title = vm.visitNumber_start +'年留学生网站访问次数'
      vm.visitNumber_title.push(title)
      vm.visitNumber()
      },function(err){
        console.log(err);
    })

    //留学生招生网站访问分布
    vm.$axios.request("post","studentsource/visitDistribute",{year:vm.overseasStudent_start,flag:'0'},function(data){
      for(let i=0;i<data.result.length;i++){
        vm.overseasStudent_name.push(data.result[i].sitename)
        vm.overseasStudent_count.push(data.result[i].count)
      }
      let title = vm.overseasStudent_start +'年留学生网站访问分布'
      vm.overseasStudent_title.push(title)
      vm.overseasStudent()
    },function(err){
      console.log(err);
    })

    vm.downLoad_list_fn()
  }
}

</script>
<style lang="scss">
  .block{
    display: block;
    margin-left: 35%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .ec_h5 button{
    color:#1c8de0;
    border-color: #1c8de0;
  }

</style>
