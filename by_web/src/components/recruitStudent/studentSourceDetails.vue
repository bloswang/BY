<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/' }">生源动态</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: 'source' }">{{area}}</el-breadcrumb-item>
      <el-breadcrumb-item>人员分布</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
	         全年入学比例
	     </h5>
        <div class="ec_height" id="entrance">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg_left">
        <h5 class="ec_h5">
            男女比例
          </h5>
        <div class="ec_height" id="peopleScale">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg_right">
        <h5 class="ec_h5">
             专业比例
          </h5>
        <div class="ec_height" id="majorScale">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5">
             学生信息
          </h5>
        <div class="ec_height" id="studentInformation">
        	 <el-table align="center"  :data="tableData" style="width: 100%">
	            <el-table-column  class-name="elTableName" align="center" prop="name_English" label="英文姓名">
	            </el-table-column>
	            <el-table-column class-name="elTableName" align="center" prop="name_china" label="中文姓名" >
	            </el-table-column>
	            <el-table-column class-name="elTableName" align="center" prop="age" label="年龄">
	            </el-table-column>
	            <el-table-column class-name="elTableName" align="center" prop="gender" label="性别">
	            </el-table-column>
	            <el-table-column class-name="elTableName" align="center" prop="major" label="专业">
	            </el-table-column>
	            <el-table-column class-name="elTableName" align="center" prop="area" label="地区">
	            </el-table-column>
	            <el-table-column class-name="elTableName" align="center" prop="enrol" label="入学月份">
	            </el-table-column>
	             <el-table-column class-name="elTableName" align="center" prop="class" label="班级">
	            </el-table-column>
	             <el-table-column class-name="elTableName" align="center" prop="grade" label="总成绩">
	            </el-table-column>
	             <el-table-column class-name="elTableName" align="center" prop="phone" label="电话">
	            </el-table-column>
	             <el-table-column class-name="elTableName" align="center" prop="mailbox" label="邮箱">
	            </el-table-column>
	          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss">


</style>
<script>
export default {
  data() {
    return {
      area: "",
      tableData: [{
        name_English: '王小虎',
        name_china: '王小虎',
        age: '男',
        gender: '11',
        major: 'web',
        area: 'beijing',
        enrol: '299076@qq.com',
        class:'3班',
        grade:11,
        phone:176002233,
        mailbox:'11900011@qq.com'
      }, {
        name_English: '河南',
        name_china: '王小虎',
        age: '上海市普陀区金沙江路 1518 弄',
        gender: '11',
        major: '张三',
        area: '13600113367',
        enrol: '299076@qq.com',
        class:'3班',
        grade:11,
        phone:176002233,
        mailbox:'11900011@qq.com'
      }],
    }
  },
  methods: {
    entrance() {
      let myChart = this.$echarts.init(document.getElementById('entrance'), 'customed');
      let option = {
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
          data: ['邮件营销']
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [120, 132, 101, 134, 90, 230, 210]
          },

        ]
      };
      myChart.setOption(option);
    },
    peopleScale() {
      let myChart = this.$echarts.init(document.getElementById('peopleScale'), 'customed');
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          x: 'center',
          data: ['nan', 'nv']
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: 'nan' },
            { value: 310, name: 'nv' },

          ]
        }]
      };
      myChart.setOption(option);
    },
    majorScale() {
      let myChart = this.$echarts.init(document.getElementById('majorScale'), 'customed');
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          x: 'center',
          data: ['nan', 'nv']
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: 'nan' },
            { value: 310, name: 'nv' },

          ]
        }]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    //echarts主题
    this.$echarts.registerTheme('customed', this.$store.state.echartsData);
    this.entrance();
    this.peopleScale();
    this.majorScale();
  },
  created() {
    this.area = this.$route.query.name;
    
  }
}

</script>
