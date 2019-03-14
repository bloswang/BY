<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/school' }">北语校情</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/school' }">实验技术人员人数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="by_body_table_div">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <template>
            <el-table :data="tableData" style="width: 100%" class="by_body_table" :border=false>
              <el-table-column prop="name" label="姓名" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="gender" label="性别" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="section" label="学院" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="duty" label="职称" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="order" label="学位" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="age" label="入职时间" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
            </el-table>
          </template>
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
              size="mini"
              v-model="teachingTeam_time"
              type="month"
              format="yyyy-MM"
              @change="echarts1_datePicker"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="echarts_2">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          年龄比例
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="teachingTeam_time"
              type="month"
              format="yyyy-MM"
              @change="echarts1_datePicker"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="echarts_3">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          职称比例
          <div class="ec_h5_data">
            <el-date-picker
              size="mini"
              class="select_width"
              v-model="teachingTeam_time"
              type="month"
              format="yyyy-MM"
              @change="echarts1_datePicker"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="echarts_4">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          学院比例
          <div class="ec_h5_data">
            <el-date-picker
              size="mini"
              class="select_width"
              v-model="teachingTeam_time"
              type="month"
              format="yyyy-MM"
              @change="echarts1_datePicker"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="echarts_5">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          实验技术人员分布
          <div class="ec_h5_data">
            <el-date-picker
              size="mini"
              class="select_width"
              v-model="teachingTeam_time"
              type="month"
              format="yyyy-MM"
              @change="echarts1_datePicker"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="echarts_6">
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<style lang="scss">
  .by_body_table {
    border: 0;
    td {
      border-bottom: 1px solid #2e2e30;
    }
    &::before {
      height: 0;
    }
    &::after {
      width: 0;
    }
  }

  .by_body_el_input {
    >.el-input__inner {
      background-color: #1f2024;
      color: #a2a3ab;
    }
  }

  .by_body_table th {
    background-color: #252629;
    border: 0;
    &.is-leaf {
      border-bottom: 1px solid #2e2e30;
    }
    .by_body_label {
      background-color: #252629;
      color: #a2a3ab;
      text-align: center;
    }
  }

  .by_body_row {
    background-color: #1f2024;
    color: #a2a3ab;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #252629;
  }

  .by_body_add {
    padding: 30px 50px;
    background-color: #1f2024;
    .el-dialog__header {
      text-align: center;
      .el-dialog__title {
        color: #04aec7;
      }
    }
    .form_bottom{
      text-align: center;
      .el-form-item__content{
        margin: 0 !important;
      }
    }
    .el-checkbox+.el-checkbox{
      margin-left: 0;
    }
    .el-checkbox{
      margin-right: 15px;
    }
  }

</style>
<script>
  /**
   * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
   * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
   * import loginButton from './components/loginButton.vue';
   */
  export default{
    data () {
      return {
        msg: '上网行为',
        teachingTeam_time:"",
        tableData: [{
          order: '1',
          name: '王小虎',
          age: '12',
          gender: '女',
          section: 'web',
          duty: '开发',
        }]
      }
    },
    components: {},
    methods: {
      echarts1_datePicker(val){

      },
      echarts2(){
        let echarts_2 = this.$echarts.init(document.getElementById("echarts_2"), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: ['男','女']
          },
          series : [
            {
              name: '男女比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:335, name:'男'},
                {value:310, name:'女'},
              ],
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
        echarts_2.setOption(option)
      },
      echarts3(){
        let echarts_3 = this.$echarts.init(document.getElementById("echarts_3"), 'customed');
        let option = {
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['20-30岁', '30-40岁', '40-50岁', '50-60岁', '60-70岁', '70-80岁', '80-90岁'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'年龄比例',
              type:'bar',
              barWidth: '60%',
              data:[10, 52, 200, 334, 390, 330, 220]
            }
          ]
        };

        echarts_3.setOption(option)
      },
      echarts4(){
        let echarts_4 = this.$echarts.init(document.getElementById("echarts_4"), 'customed');
        let option = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data:['职称']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'value'
            }
          ],
          yAxis : [
            {
              type : 'category',
              axisTick : {show: false},
              data : ['三级教师','二级教师','一级教师','副教授','教授','辅导员','代课老师']
            }
          ],
          series : [
            {
              name:'职称',
              type:'bar',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data:[200, 170, 240, 244, 200, 220, 210]
            }
          ]
        };
        echarts_4.setOption(option)
      },
      echarts5(){
        let echarts_5 = this.$echarts.init(document.getElementById("echarts_5"), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: ['本科','研究生','博士','博士后']
          },
          series : [
            {
              name: '学位分布',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:335, name:'本科'},
                {value:310, name:'研究生'},
                {value:234, name:'博士'},
                {value:135, name:'博士后'},
              ],
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
        echarts_5.setOption(option)
      },
      echarts6(){
        let echarts_6 = this.$echarts.init(document.getElementById("echarts_6"), 'customed');
        let option = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['本年度教师人数']
          },

          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','20010','20011','20012','20013']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: [
            {
              name:'本年度教师人数',
              type:'line',
              data:[1123, 1232, 1414, 2525, 1452, 2869, 2785,1123, 1232, 1414, 2525, 1452, 4541, 2785],
              markPoint: {
                data: [
                  {name: '周最低', value: 5,type:'max',
                    symbolSize:2,
                    label: {
                      normal: {
                        position: 'top',
                        formatter: '历史最高人数'
                      }
                    }

                  }
                ]
              }
            }
          ]
        };
        echarts_6.setOption(option)
      }
    },
    mounted () {
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.echarts2()
      this.echarts3()
      this.echarts4()
      this.echarts5()
      this.echarts6()
    }
  }
</script>


