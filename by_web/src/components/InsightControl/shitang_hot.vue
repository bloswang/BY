<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/control/consumerShitang' }">一卡通食堂消费分析</el-breadcrumb-item>
      <el-breadcrumb-item>食堂周期热度</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg_left">
        <h5 class="ec_h5">
          食堂周期热度分析
          <div class="ec_h5_data">
            <el-select v-model="eatSelect" placeholder="请选择" size="mini" class="major-select" @change="eatChange">
              <el-option
                v-for="item in eatTypeList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-date-picker
              style="margin-right: 15px"
              class="select_width"
              size="mini"
              v-model="time"
              type="month"
              format="yyyy-MM"
              @change="time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg_left">
        <h5 class="ec_h5">
          年龄比例
        </h5>
        <div class="ec_height" id="ageBracket">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg_right">
        <h5 class="ec_h5">
          洲际比例
        </h5>
        <div class="ec_height" id="category">
        </div>
      </el-col>

    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg_left">
        <h5 class="ec_h5">
          男女比例
        </h5>
        <div class="ec_height" id="sex">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg_right">
        <h5 class="ec_h5">
          学院比例
        </h5>
        <div class="ec_height" id="school">
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg_left">
        <h5 class="ec_h5">
          国别比例
        </h5>
        <div class="ec_height" id="city">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg_right">
        <h5 class="ec_h5">
          成绩比例
        </h5>
        <div class="ec_height" id="result">
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
        city: "",
        eatSelect:'三餐',
        eatTypeList:['一餐','二餐','三餐'],
        time:'2017-01',
        countryList:[],
      }
    },
    methods: {
      //年龄比例
      ageBracket() {
        let myChart = this.$echarts.init(document.getElementById('ageBracket'), 'customed');
        let option = {
          title: {
            text: '单位(元)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {

            left: 'center',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
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
          }]
        };
        myChart.setOption(option);
      },
      //洲际比例
      category() {
        let myChart = this.$echarts.init(document.getElementById('category'), 'customed');
        let option = {
          title: {
            text: '单位(元)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {

            left: 'center',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
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
          }]
        };
        myChart.setOption(option);
      },
      //国别比例
      city_fn() {
        let city = this.$echarts.init(document.getElementById('city'), 'customed');
        let option = {
          title: {
            text: '单位(元)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {

            left: 'center',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
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
          }]
        };
        city.setOption(option);
      },
      //男女比例
      sex_fn() {
        let sex = this.$echarts.init(document.getElementById('sex'), 'customed');
        let option = {
          title: {
            text: '单位(元)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {

            left: 'center',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
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
          }]
        };
        sex.setOption(option);
      },
      //学院比例
      school_fn() {
        let school = this.$echarts.init(document.getElementById('school'), 'customed');
        let option = {
          title: {
            text: '单位(元)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {

            left: 'center',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
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
          }]
        };
        school.setOption(option);
      },
      //成绩比例
      result_fn() {
        let result = this.$echarts.init(document.getElementById('result'), 'customed');
        let option = {
          title: {
            text: '单位(元)',
            textStyle: {
              fontSize: 12,
            },
            left:'80%',
            top:'5%'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {

            left: 'center',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
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
          }]
        };
        result.setOption(option);
      },
      //时间变化函数
      time_change(val){
        let vm = this
        vm.time = val
      },
      eatChange(val){
        let vm = this
        vm.eatSelect = val
      }
    },
    mounted() {
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.ageBracket();
      this.category();
      this.city_fn();
      this.sex_fn();
      this.school_fn();
      this.result_fn();

    },
    created() {
      window.scrollTo(0,0);
      let vm = this;
    },
  }

</script>
