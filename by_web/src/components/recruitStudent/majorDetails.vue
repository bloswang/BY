<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/student' }">招生洞察</el-breadcrumb-item>
      <el-breadcrumb-item>留学生专业人数分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around" style="margin-bottom: -10px">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          留学生专业人数分析
             <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="year"
                type="year"
                format="yyyy"
                @change="year_change"
                placeholder="开始时间">
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
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg_left">
        <h5 class="ec_h5">
	        学生分类
	      </h5>
        <div class="ec_height" id="studentClassify">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg_right">
        <h5 class="ec_h5">
          各专业人数对比
	      </h5>
        <div class="ec_height" id="systmeClassify">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg_left">
        <h5 class="ec_h5">
	        年龄段分析
	      </h5>
        <div class="ec_height" id="ageGroup">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg_right">
        <h5 class="ec_h5">
	        洲际分布
	        </h5>
        <div class="ec_height" id="stateDistribute">
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import time from "../../config/timeFormat.js"
import {formatDate} from "../../config/formatDate.js"
export default {
  data() {
    return {
      studentClassify_data: [],
      stateDistribute_data: [],
      year:'2017',
      majorSelect: '汉语言',
      majorList: [],

      //年龄
      ageGroupData:[],
      //学制分类
      student_type:[],
      student_count:[]
    }
  },
  methods: {
    menu() {
      window.scrollTo(0,0);
    },

    studentClassify(data) {
      var XS_type=[]
      for(var i=0;i<data.length;i++){
        XS_type.push(data[i].name)
      }
      let myChart = this.$echarts.init(document.getElementById('studentClassify'), 'customed');
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
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: 'center',
          itemWidth: 14,
          itemHeight: 14,
          align: 'left',
          data:XS_type,
          textStyle: {
            color: '#fff'
          }
        },
        series: [{
          name: '学生分类',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: data,
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
    systmeClassify() {
      let myChart = this.$echarts.init(document.getElementById('systmeClassify'), 'customed');
      let option = {
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x : 'center',
          y : 'top',
          data:this.student_type
        },

        calculable : true,
        series : [
          {
            name:'专业占比',
            type:'pie',
            radius : [0, 110],
            center : ['50%', '50%'],
            roseType : 'area',
            data:this.student_count,
            label: {
              normal: {
                formatter: '{b}\n{d}%'
              },

            },
          }
        ]
      };
      myChart.setOption(option);
    },
    //年龄
    ageGroup() {
      var age = []
      for(var i=0;i<this.ageGroupData.length;i++){
        age.push(this.ageGroupData[i].name)
      }
      let myChart = this.$echarts.init(document.getElementById('ageGroup'), 'customed');
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
          formatter: "{a} <br/>{b}: {c} ({d}%)",

        },
        legend: {
          x: 'center',
          itemWidth: 14,
          itemHeight: 14,
          align: 'left',
          data:age,
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name:'年龄段分析',
            type:'pie',
            radius: ['42%', '55%'],
            label: {
              normal: {
                formatter: '{b}\n{d}%'
              },

            },
            data:this.ageGroupData
          }
        ]
      };
      myChart.setOption(option);
    },
    stateDistribute(data) {
    	var name = []
      for(var i=0; i<data.length;i++){
    	  name.push(data[i].name)
      }
      let myChart = this.$echarts.init(document.getElementById('stateDistribute'), 'customed');
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
          formatter: "<br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: 'center',
          data: name
        },
        series: [{
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data:data,
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


    all_fn_init(year,major){
      let vm = this;
      //年龄段分析
      this.$axios.request("post", "/recruit/countByAge",{year:year,specialty:major}, function(data) {
        vm.ageGroupData = []
        for (let i = 0; i < data.result.length; i++) {
          vm.ageGroupData.push({ value: data.result[i].count, name: data.result[i].nld });
        }
        vm.$nextTick(function() {
          vm.ageGroup();
        })
      }, function(err) {
        console.log(err);
      });

      this.$axios.request("post","/recruit/yearContinent",{year:year,specialty:major},function(data){
        vm.stateDistribute_data = [];
        for (var i = 0; i < data.result.length; i++) {
          vm.stateDistribute_data.push({name:data.result[i].continent,value:data.result[i].count});
        }
        vm.stateDistribute(vm.stateDistribute_data);
      },function(err){
        console.log(err);
      })

      vm.$axios.request("post", "/recruit/findByStudentType", { year: year, specialty:major}, function(data) {
        vm.studentClassify_data = [];
        for (let i = 0; i < data.result.length; i++) {
          vm.studentClassify_data.push({ name: data.result[i].type_name, value: data.result[i].count })
        }
        vm.studentClassify(vm.studentClassify_data);
      }, function(err) {
        console.log(err);
      })

      this.$axios.request('post', "/recruit/findBySystem",{year:year}, function(data) {
        let year = ''
        vm.student_type = []
        vm.student_count = []
        for (let i = 0; i < data.result.length; i++) {
          vm.student_type.push(data.result[i].zy);
          vm.student_count.push({name:data.result[i].zy,value:data.result[i].count});
        }
        vm.$nextTick(function() {
          vm.systmeClassify();
        })
      }, function(err) {
        console.log(err);
      })
    },
    year_change(val){
      let vm = this
      if(val == undefined){
        return
      }else{
        vm.year = val
        vm.all_fn_init(vm.year,vm.majorSelect)
      }
    },
    majorChange(val){
      let vm = this
      vm.all_fn_init(vm.year,vm.majorSelect)
    }
  },
  mounted() {
    //echarts主题
    this.$echarts.registerTheme('customed', this.$store.state.echartsData);
  },
  created() {
    let vm = this;
    vm.menu()
    vm.year = time.year
    //获取专业
    vm.majorList = [];
    vm.$axios.request("post", "/recruit/findAllSpecialty",{}, function(data) {
      for (let i = 0; i < data.specialtyList.length; i++) {
        vm.$nextTick(function() {
          vm.majorList.push({ value: data.specialtyList[i].specialty, label: data.specialtyList[i].specialty });
        })
      }
    }, function(err) {
      console.log(err);
    })

    vm.all_fn_init(vm.year,vm.majorSelect)

  },

}

</script>
<style>


</style>
