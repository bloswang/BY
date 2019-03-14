<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/' }">生源动态</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: 'studentOriginArea'}">生源动态分析</el-breadcrumb-item>
      <el-breadcrumb-item>{{city}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
			企业政策
		</h5>
        <div class="ec_height" id="policy">
          <el-table :data="listData" style="width: 100%">
            <el-table-column prop="recruit" align="center" label="招生处" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="recruitNum" align="center" label="招生数量" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="cooperative" align="center" label="合作企业" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="people" align="center" label="负责人" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="phone" align="center" label="电话" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="mailbox" align="center" label="邮箱" class-name="elTableName">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg_left">
        <h5 class="ec_h5">
	        年龄段分析
	    </h5>
        <div class="ec_height" id="ageBracket">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg_right">
        <h5 class="ec_h5">
	        类别比例分析
	    </h5>
        <div class="ec_height" id="category">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
	        招生趋势
	    </h5>
        <div class="ec_height" id="trend">
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
      listData: [{
        recruit: "北京语言大学",
        recruitNum: "2017",
        cooperative: "清华大学",
        people: "张三",
        phone: "17600113369",
        mailbox: "29988076@qq.com"
      }, {
        recruit: "北京语言大学",
        recruitNum: "2017",
        cooperative: "清华大学",
        people: "张三",
        phone: "17600113369",
        mailbox: "29988076@qq.com"
      }]
    }
  },
  methods: {
    ageBracket() {
      let myChart = this.$echarts.init(document.getElementById('ageBracket'), 'customed');
      let option = {
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
    category() {
      let myChart = this.$echarts.init(document.getElementById('category'), 'customed');
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {

          x: 'center',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }]
      };
      myChart.setOption(option);
    },
    trend() {
      let myChart = this.$echarts.init(document.getElementById('trend'), 'customed');
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
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
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
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    //echarts主题
    this.$echarts.registerTheme('customed', this.$store.state.echartsData);
    this.ageBracket();
    this.category();
    this.trend();
  },
  created() {
    let vm = this;
    console.log(vm.$route);
    vm.city = vm.$route.query.city;
  },
}

</script>
