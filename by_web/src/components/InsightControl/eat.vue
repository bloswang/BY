<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item>就餐高峰期分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" style="margin-bottom: 0">
        <div class="ec_h5" style="height: 30px;">
          <p style="font-weight: bold">食堂实到与历史平均对比</p>
        </div>
        <div class="ec_h5_data">
          <el-select  v-model="eatSelect" placeholder="选择用餐时间" size="mini" class="select_width" @change="eatChange">
            <el-option
              v-for="(item,index) in eatTime"
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
            @change="time_change"
            v-model="time"
            type="date"
            placeholder='选择时间'>
          </el-date-picker>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          第一食堂
        </h5>
        <div class="ec_height" id="one"></div>
      </el-col>
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          第二食堂
        </h5>
        <div class="ec_height" id="two"></div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          第三食堂
        </h5>
        <div class="ec_height" id="three"></div>
      </el-col>
      <el-col :span="12" class="ec_bg" style="margin-bottom: 0">
        <h5 class="ec_h5">
          租赁档口
        </h5>
        <div class="ec_height" id="four"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        flag:'0',
        eatSelect:'早餐',
        eatTime:['早餐','午餐','晚餐'],
        time:'2017-05-21',
        one_count:[],
        two_count:[],
        three_count:[],
        four_count:[],
      }
    },
    methods:{
      menu() {
        window.scrollTo(0,0);
      },
      //选择时间的函数
      time_change(val){
        if(val == undefined){
          return
        }else{
          this.time = val
          this.all(this.flag,this.time)
        }

      },
      //选择用餐时间的函数
      eatChange(val){
        if(this.eatSelect =='早餐'){
          this.flag='0'
        }else if(this.eatSelect =='午餐'){
          this.flag='1'
        }else{
          this.flag='2'
        }
        this.all(this.flag,this.time)
      },

      all(flag,time){
        var vm = this
        //1食堂
        vm.$axios.request("post","card/predictRepastCount",{flag:flag,date:time,canteen:'第一食堂'},function(data){
          vm.one_count = []
          vm.one_count.push({name:'实到人数',value:Math.round(data.dayCount)},{name:'应到人数',value:Math.round(data.monthAvg)})
          vm.one_fn()
        },function(err){
          console.log(err);
        })
        //2食堂
        vm.$axios.request("post","card/predictRepastCount",{flag:flag,date:time,canteen:'第二食堂'},function(data){
          vm.two_count=[]
          vm.two_count.push({name:'实到人数',value:Math.round(data.dayCount)},{name:'应到人数',value:Math.round(data.monthAvg)})
          vm.two_fn()
        },function(err){
          console.log(err);
        })
        //3食堂
        vm.$axios.request("post","card/predictRepastCount",{flag:flag,date:time,canteen:'第三食堂'},function(data){
          vm.three_count=[]
          vm.three_count.push({name:'实到人数',value:Math.round(data.dayCount)},{name:'应到人数',value:Math.round(data.monthAvg)})
          vm.three_fn()
        },function(err){
          console.log(err);
        })
        //4食堂
        vm.$axios.request("post","card/predictRepastCount",{flag:flag,date:time,canteen:'租赁档口'},function(data){
          vm.four_count=[]
          vm.four_count.push({name:'实到人数',value:Math.round(data.dayCount)},{name:'应到人数',value:Math.round(data.monthAvg)})
          vm.four_fn()
        },function(err){
          console.log(err);
        })
      },
      one_fn(){
        let one = this.$echarts.init(document.getElementById('one'), 'customed');
        let option = {
          title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },
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
              data :['历史平均人数', '实到人数'],
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
              name:'第一食堂',
              type:'bar',
              barWidth: '30%',
              data:this.one_count,
              itemStyle: {
                //通常情况下：
                normal:{
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params){
                    var colorList = ['#3398DB','#0EDB08'];
                    return colorList[params.dataIndex];
                  }
                },
                //鼠标悬停时：
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
          title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },
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
              data :['历史平均人数', '实到人数'],
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
              name:'第二食堂',
              type:'bar',
              barWidth: '30%',
              data:this.two_count,
              itemStyle: {
                //通常情况下：
                normal:{
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params){
                    var colorList = ['#3398DB','#0EDB08'];
                    return colorList[params.dataIndex];
                  }
                },
                //鼠标悬停时：
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
          title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },
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
              data :['历史平均人数', '实到人数'],
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
              name:'第三食堂',
              type:'bar',
              barWidth: '30%',
              data:this.three_count,
              itemStyle: {
                //通常情况下：
                normal:{
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params){
                    var colorList = ['#3398DB','#0EDB08'];
                    return colorList[params.dataIndex];
                  }
                },
                //鼠标悬停时：
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
          title: {
            text: '单位(人)',
            textStyle: {
              fontSize: 12,
            },
            left:'90%',
            top:'5%'
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow' ,
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
              data :['历史平均人数', '实到人数'],
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
              name:'租凭档口',
              type:'bar',
              barWidth: '30%',
              data:this.four_count,
              itemStyle: {
                //通常情况下：
                normal:{
                  //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params){
                    var colorList = ['#3398DB','#0EDB08'];
                    return colorList[params.dataIndex];
                  }
                },
                //鼠标悬停时：
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
    },
    mounted(){
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
    },
    created(){
      var vm = this
      //1食堂
      vm.menu()
      vm.$axios.request("post","card/predictRepastCount",{flag:vm.flag,date:vm.time,canteen:'第一食堂'},function(data){
        vm.one_count.push(Math.round(data.monthAvg),Math.round(data.dayCount))
        vm.one_fn()
      },function(err){
        console.log(err);
      })
      //2食堂
      vm.$axios.request("post","card/predictRepastCount",{flag:vm.flag,date:vm.time,canteen:'第二食堂'},function(data){
        vm.two_count.push(Math.round(data.monthAvg),Math.round(data.dayCount))
        vm.two_fn()
      },function(err){
        console.log(err);
      })
      //3食堂
      vm.$axios.request("post","card/predictRepastCount",{flag:vm.flag,date:vm.time,canteen:'第三食堂'},function(data){
        vm.three_count.push(Math.round(data.monthAvg),Math.round(data.dayCount))
        vm.three_fn()
      },function(err){
        console.log(err);
      })
      //4食堂
      vm.$axios.request("post","card/predictRepastCount",{flag:vm.flag,date:vm.time,canteen:'租赁档口'},function(data){
        vm.four_count.push(Math.round(data.monthAvg),Math.round(data.dayCount))
        vm.four_fn()
      },function(err){
        console.log(err);
      })
    }
  }
</script>

<style>

</style>
