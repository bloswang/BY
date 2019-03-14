<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control'}">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/control'}">就餐高峰期分析</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.$route.query.type}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          人员楼层分布&nbsp;&nbsp;(单位:人)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="eat_time_change"
              v-model="eat_start_time"
              type="date"
              placeholder='选择时间'>
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="seven"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" style="margin-bottom: 0">
        <div class="ec_h5_data">
          <el-select v-model="roomSelect" placeholder="请选择" size="mini" class="major-select" @change="roomChange">
            <el-option
              v-for="item in roomList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-date-picker
            class="select_width"
            align="right"
            size='mini'
            format="yyyy-MM-dd"
            @change="ST_time_change"
            v-model="ST_time"
            type="date"
            placeholder='选择时间'>
          </el-date-picker>
        </div>

      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          男女人数比例
        </h5>
        <div class="ec_height" id="one"></div>
      </el-col>
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          学历比例
        </h5>
        <div class="ec_height" id="two"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          洲际比例
        </h5>
        <div class="ec_height" id="three"></div>
      </el-col>
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          年龄比例
        </h5>
        <div class="ec_height" id="four"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          人员类别分布
        </h5>
        <div class="ec_height" id="five"></div>
      </el-col>
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          热门窗口TOP3
        </h5>
        <div class="ec_height" id="six"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          国内学生统计列表
        </h5>
        <table v-for="list in countryList">
          <tr>
            <td class="black">{{list.name}}</td>
          </tr>
          <tr>
            <td>{{list.value}}</td>
          </tr>
        </table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        flag:'1',
        roomSelect:'第一食堂',
        roomList:['第一食堂','第二食堂','第三食堂','租赁档口','风味档口'],
        ST_time:'2016-05-02',
        countryList:[],
        eat_start_time:'2016-05-02',
        LC_count:[],
        LC_name:[],
        sex:[],
        sex_num:[],
        XL_type:[],
        XL_count:[],
        ZJ_name:[],
        ZJ_count:[],
        age:[],
        age_count:[],
        LB_name:[],
        LB_count:[],
        TOP3_name:[],
        TOP3_count:[]
      }
    },
    methods:{
      menu() {
        window.scrollTo(0,0);
      },
      ST_time_change(val){
        if(val == undefined){
          return
        }else{
          this.ST_time = val
          this.all_JK_fn(this.ST_time,this.roomSelect)
        }

      },
      //选择食堂函数
      roomChange(val) {
        this.roomSelect = val
        this.all_JK_fn(this.ST_time,this.roomSelect)
      },
      all_JK_fn(time,ST){
        var vm = this
        //省份列表
        vm.$axios.request("post","repast/provinceCount",{flag:'3',date:time,name:ST},function(data){
          vm.countryList = []
          for(let i=0;i<data.results.length;i++){
            let SF = ''
            if(data.results[i].province =='null'||data.results[i].province ==null){
              SF = '未知'
            }else{
              SF = data.results[i].province
            }
            vm.countryList.push({name:SF,value:data.results[i].count+'人'})
          }
        },function(err){
          console.log(err);
        })
        //男女比例
        vm.$axios.request("post","repast/sexRatio",{flag:vm.flag,date:time,name:ST},function(data){
          vm.sex = []
          vm.sex_num = []
          for(var i=0;i<data.result.length;i++){
            let sex = data.result[i].sex
              if(sex =='0.0'){
                sex ='女'
              }else if(sex =='1.0'){
                sex ='男'
              }else{
                sex ='其他'
              }
              vm.sex.push(sex)
              vm.sex_num.push({name:sex,value:data.result[i].count})
          }
          vm.one_fn()
        },function(err){
          console.log(err);
        })

        //学历比例
        vm.$axios.request("post","repast/floorDocuments",{flag:vm.flag,date:time,name:ST},function(data){
          vm.XL_type=[]
          vm.XL_count=[]
          for(var i=0;i<data.result.length;i++){
            vm.XL_type.push(data.result[i].type)
            vm.XL_count.push({name:data.result[i].type,value:data.result[i].count})
          }
          vm.two_fn()
        },function(err){
          console.log(err);
        })

        //洲际比例
        vm.$axios.request("post","repast/continentRatio",{flag:vm.flag,date:time,name:ST},function(data){
          vm.ZJ_name=[]
          vm.ZJ_count =[]
          let ZJ = ''
          for(var i=0;i<data.result.length;i++){
            if(data.result[i].intercontinental == null ||data.result[i].intercontinental == 'null'){
              ZJ = '其他'
            }else{
              ZJ = data.result[i].intercontinental
            }
            vm.ZJ_name.push(ZJ)
            vm.ZJ_count.push({name:ZJ,value:data.result[i].count})
          }
          vm.three_fn()
        },function(err){
          console.log(err);
        })

        //年龄比例
        vm.$axios.request("post","repast/ageRatio",{flag:vm.flag,date:time,name:ST},function(data){
          vm.age=[]
          vm.age_count =[]
          for(var i=0;i<data.result.length;i++){
            vm.age.push(data.result[i].age+'岁')
            vm.age_count.push({name:data.result[i].age+'岁',value:data.result[i].count})
          }
          vm.four_fn()
        },function(err){
          console.log(err);
        })
        //人员类别分布
        vm.$axios.request("post","repast/categoryRatio",{flag:vm.flag,date:time,name:ST},function(data){
          vm.LB_name=[]
          vm.LB_count =[]
          for(var i=0;i<data.result.length;i++){
            vm.LB_name.push(data.result[i].type)
            vm.LB_count.push({name:data.result[i].type,value:data.result[i].count})
          }
          vm.five_fn()
        },function(err){
          console.log(err);
        })

        //top3分布
        vm.$axios.request("post","repast/windowTop3",{flag:vm.flag,date:time,name:ST},function(data){
          vm.TOP3_name=[]
          vm.TOP3_count =[]
          for(var i=0;i<data.result.length;i++){
            vm.TOP3_name.push(data.result[i].win)
            vm.TOP3_count.push(data.result[i].count)
          }
          vm.six_fn()
        },function(err){
          console.log(err);
        })
      },
      //第一个图开始时间
      eat_time_change(val){
        let vm = this;
        if(val == undefined){
          return
        }else{
          this.eat_start_time = val
          //人员楼层分布seven
          vm.$axios.request("post","repast/floorAnalyse",{flag:this.flag,date:this.eat_start_time},function(data){
            vm.LC_name = []
            vm.LC_count = []
            for(var i=0;i<data.result.length;i++){
              if(data.result[i].canteen !== '其他'){
                vm.LC_name.push(data.result[i].canteen)
                vm.LC_count.push(data.result[i].count)
              }
            }
            vm.seven_fn()
          },function(err){
            console.log(err);
          })
        }
      },

      //echart
      one_fn(){
        let one = this.$echarts.init(document.getElementById('one'), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: this.sex
          },
          series : [
            {
              name: '人员楼层分布',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.sex_num,
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
            }
          ]
        };

        one.setOption(option);
      },
      two_fn(){
        let two = this.$echarts.init(document.getElementById('two'), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: this.XL_type
          },
          series : [
            {
              name: '学历比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.XL_count,
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
            }
          ]
        };

        two.setOption(option);
      },
      three_fn(){
        let three = this.$echarts.init(document.getElementById('three'), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: this.ZJ_name
          },
          series : [
            {
              name: '洲际比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.ZJ_count,
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
            }
          ]
        };

        three.setOption(option);
      },
      four_fn(){
        let four = this.$echarts.init(document.getElementById('four'), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data:this.age
          },
          series : [
            {
              name: '年龄比例',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.age_count,
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
            }
          ]
        };

        four.setOption(option);
      },
      five_fn(){
        let five = this.$echarts.init(document.getElementById('five'), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data:this.LB_name
          },
          series : [
            {
              name: '人员类别分布',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.LB_count,
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
            }
          ]
        };
        five.setOption(option);
      },
      six_fn(){
        let six = this.$echarts.init(document.getElementById('six'), 'customed');
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
              data : this.TOP3_name,
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
              name:'TOP3',
              type:'bar',
              barWidth: '20%',
              data:this.TOP3_count
            }
          ]
        };

        six.setOption(option);
      },
      seven_fn(){
        let seven = this.$echarts.init(document.getElementById('seven'), 'customed');
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
              data : this.LC_name,
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
              name:'楼层分布',
              type:'bar',
              barWidth: '30%',
              data:this.LC_count
            }
          ]
        };

        seven.setOption(option);
      },
    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
    },
    created(){

      if(this.$route.query.type == '早餐'){
        this.flag = '1'
      }else if(this.$route.query.type == '午餐'){
        this.flag = '2'
      }else{
        this.flag = '3'
      }
      let vm = this;
      vm.menu()
      //人员楼层分布seven
      vm.$axios.request("post","repast/floorAnalyse",{flag:vm.flag,date:vm.eat_start_time},function(data){
        for(var i=0;i<data.result.length;i++){
          if(data.result[i].canteen !== '其他'){
            vm.LC_name.push(data.result[i].canteen)
            vm.LC_count.push(data.result[i].count)
          }

        }
        vm.seven_fn()
      },function(err){
        console.log(err);
      })
      this.all_JK_fn(this.ST_time,this.roomSelect)
    }
  }
</script>
<style lang="scss" scoped>
  table{
    float: left;
    td{
      text-align: center;
      height: 40px;
      width: 90px;
      border: 1px solid rgba(1,1,1,0.2);
    }
    .black{
      background: rgba(23,24,28,0.5);
    }
  }
</style>
