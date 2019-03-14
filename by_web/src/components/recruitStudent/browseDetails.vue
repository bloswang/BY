<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/student' }">招生洞察</el-breadcrumb-item>
      <el-breadcrumb-item>高校留学生招生分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg_left">
        <h5 class="ec_h5">
          各高校国际生分布列表
          <!--<span style="margin-left: 35%;color: darkred;">仅2011年-2015年数据</span>-->
          <el-button type="primary" @click="export2Excel(list1)">导出数据</el-button>
          <el-select v-model="citySelect" placeholder="请选择" size="mini" class="major-select" @change="cityChange">
            <el-option
              v-for="item in cityList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-date-picker
            class="major-data select_width"
            align="right"
            size='mini'
            format="yyyy"
            @change="come_year_change"
            v-model="come_year"
            type="year"
            placeholder="选择年">
          </el-date-picker>
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
            <el-table-column prop="year" label="时间"  class-name="elTableName"></el-table-column>
            <el-table-column prop="one" label="城市"  class-name="elTableName"></el-table-column>
            <el-table-column prop="two" label="学校"  class-name="elTableName"></el-table-column>
            <el-table-column prop="three" label="招生人数"  class-name="elTableName"></el-table-column>
            <el-table-column prop="four" label="学历生"  class-name="elTableName"></el-table-column>
            <el-table-column prop="five" label="非学历生"  class-name="elTableName"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        	<h5 class="ec_h5">
            各高校招生人数Top15
            <!--<span style="margin-left: 35%;color: darkred;">仅2011年-2015年数据</span>-->
            <el-date-picker
              class="major-data select_width"
              align="right"
              size='mini'
              format="yyyy"
              @change="school_year_change"
              v-model="school_year"
              type="year"
              placeholder="选择年">
            </el-date-picker>
	        </h5>
        <div class="ec_height" id="collegesDistribute">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        	<h5 class="ec_h5">
            各高校学费分析
	        </h5>
        <div class="ec_height" id="collegesTuitionDistribute">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        	<h5 class="ec_h5">
            各高校专业分析
	        </h5>
        <div class="ec_height" id="majorDistribute">
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading1:false,
      list1:[],
      start1_time:'2011',
      end1_time:'2015',
      name1:[],
      count1:[],
      citySelect:'北京市',
      cityList:[],
      come_year:'2011',
      school_year:'2011'
    }
  },
  methods: {
    menu() {
      window.scrollTo(0,0);
    },
    //各高校招生人数Top15
    collegesDistribute(data) {
      let myChart = this.$echarts.init(document.getElementById('collegesDistribute'), 'customed');
      let option = {
        title: {
          text: '单位(人)',
          textStyle: {
            fontSize: 14,
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
          bottom: '12%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: data.university,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval:0,
            rotate:-30
          },
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          type: 'bar',
          barWidth: '60%',
          data: data.total,
          label:{
            normal:{
              show:true
            }
          },
        }]
      };
      myChart.setOption(option);
    },
    school_year_change(val){
      let vm = this
      if(val == undefined){
        return
      }else{
        vm.school_year = val
        vm.collegesDistribute_init(vm.school_year)
      }
    },
    collegesDistribute_init(year){
      let vm = this
      vm.$axios.request("post","/analyzeColleges/collegesDistribute",{year:year},function(data){
        let distribute = {university:[],total:[]};
        for (let i = 0; i < data.collegesList.length; i++) {
          distribute.university.push(data.collegesList[i].university)
          distribute.total.push(data.collegesList[i].total)
        }
        vm.collegesDistribute(distribute);
      },function(err){
        console.log(err);
      })
    },
    //各高校学费分析
    collegesTuitionDistribute(data) {
      let myChart = this.$echarts.init(document.getElementById('collegesTuitionDistribute'), 'customed');
      let option = {
        title: {
          text: '单位(元)',
          textStyle: {
            fontSize: 14,
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
          data: ['学费']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '12%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: data.name,
          axisLabel: {
            interval:0,
            rotate:-30
          },
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
           name: '学费',
            type: 'line',
            data: data.charge,
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
    },
    //各高校专业分析
    majorDistribute(data) {
      let myChart = this.$echarts.init(document.getElementById('majorDistribute'), 'customed');
      let option = {
        title: {
          text: '单位(个)',
          textStyle: {
            fontSize: 14,
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
          data: ['专业数'],
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '12%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval:0,
            rotate:-30
          },
          data: data.name
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
            name: '专业数',
            type: 'line',
            data: data.major,
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
    },


    cityChange(val){
      let vm = this
      vm.citySelect = val
      this.one_init_fn(this.citySelect)
    },
    //获取数据方法（校内）
    one_init_fn(item,year){
      let vm  = this
      //全国不同省份数据列表
      vm.$axios.request("post","OBOR/OBORToCity",{city:item,year:year},function(data){
        vm.list1 = []
        for(let i=0;i<data.result.length;i++){
          vm.list1.push({
            year:data.result[i].year+'年',
            one:data.result[i].area,
            two:data.result[i].university,
            three:data.result[i].total+ '人',
            four:data.result[i].degree!== 'null' ? data.result[i].degree + '人' : '0人',
            five:data.result[i].nodegree !== 'null' ? data.result[i].nodegree + '人' : '0人',
          })
        }
      },function(err){
        console.log(err);
      })
    },
    come_year_change(val){
      let vm = this
      if(val == undefined){
        return
      }else{
        this.come_year = val
        this.one_init_fn(this.citySelect,this.come_year)
      }
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
    }
  },
  mounted() {
    //echarts主题
    this.$echarts.registerTheme('customed', this.$store.state.echartsData);
  },
  created() {
    let vm = this;
    vm.menu();
    vm.collegesDistribute_init(vm.school_year)
    vm.$axios.request("post","/analyzeColleges/collegesTuitionDis",{},function(data){
      //console.log(data);
      let tuition = {name:[],charge:[]};
      for (let i = 0; i < data.tuitionList.length; i++) {
          tuition.name.push(data.tuitionList[i].name)
          tuition.charge.push(data.tuitionList[i].charge)
      }
      vm.collegesTuitionDistribute(tuition);
    },function(err){
      console.log(err);
    })
    vm.$axios.request("post","/analyzeColleges/collegesSpecialtyCount",{},function(data){
      //console.log(data);
      let majorNum = {name:[],major:[]};
      for (let i = 0; i < data.specialtyList.length; i++) {
          majorNum.name.push(data.specialtyList[i].name)
          majorNum.major.push(data.specialtyList[i].major)
      }
      vm.majorDistribute(majorNum);
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
    this.one_init_fn(this.citySelect,this.come_year)
  }
}

</script>
<style lang="scss">


</style>
