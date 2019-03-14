
<template>
    <div class="w">
      <el-menu default-active="1-4-1"
               class="el-menu-vertical-demo"
               style="width: 36px; position: fixed;top: 300px; right:0;z-index: 10000;"
               theme="dark"
               :collapse="isCollapse">
        <a href="javascript:;" @click="mao(40)">
          <el-menu-item index="1">
            <img src="../../assets/img/student_1.png" height="20" width="20" alt="">
            <span slot="title">
          <a href="javascript:;" @click="mao(40)" style="color: white;font-size: 14px">上网规模分析</a>
          </span>
          </el-menu-item>
        </a>
        <a href="javascript:;" @click="mao(450)">
          <el-menu-item index="2">
            <img src="../../assets/img/student_02.png" height="26" width="26" alt="">
            <span slot="title">
          <a href="javascript:;" @click="mao(450)" style="color: white;font-size: 14px">上网习惯分析</a>
        </span>
          </el-menu-item>
        </a>
        <a href="javascript:;" @click="mao(950)">
          <el-menu-item index="3">
            <img src="../../assets/img/student_03.png" height="25" width="25" alt="">
            <span slot="title">
          <a href="javascript:;" @click="mao(950)" style="color: white;font-size: 14px">网络应用分布</a>
        </span>
          </el-menu-item>
        </a>
      </el-menu>
      <el-breadcrumb separator=">" class="navigation">
        <el-breadcrumb-item :to="{ path: '/home/safety' }">上网行为</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg" >
          <h5 class="ec_h5">
            上网规模分析
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="SW_start_time"
                type="date"
                format="yyyy-MM-dd"
                @change="SW_start_time_change"
                placeholder="选择时间">
              </el-date-picker>
              至
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="SW_end_time"
                type="date"
                format="yyyy-MM-dd"
                @change="SW_end_time_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <el-col :span="8" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
            <div class="ec_height" id="netScale_echarts_1">
            </div>
          </el-col>
          <el-col :span="8" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
            <div class="ec_height" id="netScale_echarts_2">
            </div>
          </el-col>
          <el-col :span="8" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
            <div class="ec_height" id="netScale_echarts_3">
            </div>
          </el-col>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5">
            上网习惯分析
            <!--<div class="ec_h5_data">
              <el-date-picker
                size="mini"
                class="select_width"
                v-model="teachingTeam_time"
                type="month"
                format="yyyy-MM"
                @change="echarts1_datePicker"
                placeholder="选择时间">
              </el-date-picker>
            </div>-->
          </h5>
          <el-col :span="12" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
            <div class="ec_height" id="netScale_echarts_4">
            </div>
          </el-col>
          <el-col :span="12" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
            <div class="ec_height" id="netScale_echarts_5">
            </div>
          </el-col>
          <!--<el-col :span="6">
            <div class="ec_height" id="netScale_echarts_6">
            </div>
          </el-col>
          <el-col :span="6">
            <div class="ec_height" id="netScale_echarts_7">
            </div>
          </el-col>-->
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" >
        <el-col :span="24" class="ec_bg" style="margin-bottom: 50px">
          <h5 class="ec_h5">
            网络应用分布TOP10
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="app_start_time"
                type="date"
                format="yyyy-MM-dd"
                @change="app_start_time_change"
                placeholder="选择时间">
              </el-date-picker>
              至
              <el-date-picker
                class="select_width"
                size="mini"
                v-model="app_end_time"
                type="date"
                format="yyyy-MM-dd"
                @change="app_end_time_change"
                placeholder="选择时间">
              </el-date-picker>
              <!--<el-button size="mini" style="margin-left: 20px" @click="skip('app_page')">分析</el-button>-->
            </div>
            <div class="ec_height" id="positive" style="margin-top: 20px;margin-bottom: 50px">
              <el-table
                v-loading="loading1"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="app_list"
                align="center"
                style="width: 100%;overflow: auto ;margin-bottom: 50px"
                :show-header='true'>
                <el-table-column prop="top" width="80" label="排行"  class-name="elTableName">
                </el-table-column>
                <el-table-column prop="app_class" label="应用分布"  class-name="elTableName">
                </el-table-column>
                <el-table-column prop="num" label="使用人次" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="school" label="使用人数最多学院" class-name="elTableName">
                </el-table-column>
                <el-table-column prop="name" label="应用名称" class-name="elTableName">
                </el-table-column>
              </el-table>
            </div>
          </h5>
        </el-col>
      </el-row>
    </div>
</template>
<script>
    /**
     * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
     * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
     * import loginButton from './components/loginButton.vue';
     */
    import time from "../../config/timeFormat.js"
    export default{
        data () {
            return {
              loading:true,
              isCollapse: true,
              SW_start_time:'2017-08-01',
              SW_end_time:'2017-08-01',
              SW_number:'',
              SW_flower:'',
              SW_people:'',
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() < Date.now() - 8.64e7;
                }
              },
              msg: '上网行为',
              teachingTeam_time:"2017-01",
              net_time:'',

              //网络应用TOP10
              loading1:true,
              app_start_time:'2017-11-07',
              app_end_time:'2017-11-08',
              app_list:[],

              jurisdiction:[]
            }
        },
        components: {},
        methods: {
          mao(selector){
            window.scrollTo(0,selector );
          },
          make_time(){
            let vm  = this
              vm.SW_start_time= time.year +'-'+'01'+'-'+'01';
              vm.SW_end_time = time.year +'-'+time.month+'-'+ time.day;
              vm.teachingTeam_time = time.year +'-'+time.month
              vm.app_start_time= time.year +'-'+'01'+'-'+'01';
              vm.app_end_time = time.year +'-'+time.month+'-'+ time.day;
          },
          skip(link) {
            switch (link) {
              case 'app_page':
                for(let i=0;i<this.jurisdiction.length;i++){
                  if(this.jurisdiction[i] == 'safe_app'){
                    this.$store.commit('change_active','5-6')
                    this.$router.push('app_page')
                    return
                  }
                }
                this.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
                break;
            }
          },
          //上网时间第一排三个图的时间选择函数
          SW_start_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val >this.SW_end_time){
              if(this.SW_end_time!==''){
                this.$message.error('开始时间不能大于结束时间哦！');
                this.SW_start_time = ''
                return
              }else{
                this.SW_start_time = val
              }
            }else{
              vm.SW_start_time = val
              vm.SW_fn(vm.SW_start_time,vm.SW_end_time)
            }

          },
          SW_end_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val<this.SW_start_time){
              this.$message.error('结束时间不能小于开始时间哦！');
              this.SW_end_time = ''
              return
            }else{
              vm.SW_end_time = val
              vm.SW_fn(vm.SW_start_time,vm.SW_end_time)
            }

          },
          SW_fn(start,end){
            let vm = this
            //上网人数
            vm.$axios.request("post","number/personNumber",{startDate:start,endDate:end,flag:'1'},function(data){
              for(var i = 0; i<data.result.length;i++){
                vm.SW_number = data.result[i].count
              }
              vm.netScale_echarts1()
            },function(err){
              console.log(err);
            })
            //上网人次
            vm.$axios.request("post","Time/personTime",{startDate:start,endDate:end,flag:'1'},function(data){
              for(var i = 0; i<data.result.length;i++){
                vm.SW_people = data.result[i].count
              }
              vm.netScale_echarts2()
            },function(err){
              console.log(err);
            })

            //上网流量
            vm.$axios.request("post","flow/networkFlow",{startDate:start,endDate:end,flag:'1'},function(data){
              let flow = ''
              for(var i = 0; i<data.result.length;i++){
                if(data.result[i].flow ==null){
                  vm.SW_flower = 0
                }else{
                  vm.SW_flower = data.result[i].flow
                }

              }
              vm.netScale_echarts3()
            },function(err){
              console.log(err);
            })

          },
          netScale_echarts1(){
            let vm = this;
            let netScale_echarts_1 = this.$echarts.init(document.getElementById("netScale_echarts_1"));
            let option = {
              color:['#B73349'],
              title : {
                text: '点击图例分析上网人数',
                x:'center',
                textStyle: {
                  color:'#B73349'
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ['上网人数'],
                textStyle: {
                  color: '#B73349',
                }
              },
              series: [{
                name: '上网人数',
                type: 'pie',
                radius: ['50%', '60%'],
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data: [{
                  value: this.SW_number,
                  name: '上网人数',
                  label: {
                    normal: {
                      formatter: "{b} : {c}人 ",
                      textStyle: {
                        fontSize: 14
                      },
                      color:'#B73349'
                    }
                  },
                  itemStyle:{
                    normal:{color:'#B73349'}
                  }
                }]
              }]
            };
            netScale_echarts_1.setOption(option)
            netScale_echarts_1.on("click",function (param) {
              for(let i=0;i<vm.jurisdiction.length;i++){
                if(vm.jurisdiction[i] == 'safe_num'){
                  vm.$store.commit('change_active','5-2')
                  vm.$router.push({path:'netBehavior'})
                  return
                }
              }
              vm.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');

            })
            vm.$nextTick(function() {
              vm.loading = false;
            })
          },
          netScale_echarts2() {
            let vm =this
            let netScale_echarts_2 = this.$echarts.init(document.getElementById("netScale_echarts_2"));
            let option = {
              color:['#0B85B7'],
              title : {
                text: '上网人次分析',
                x:'center',
                textStyle: {
                  color:'#0B85B7'
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ['上网人次'],
                textStyle: {
                  color: '#0B85B7',
                }
              },
              series: [{
                name: '上网人次',
                type: 'pie',
                radius: ['50%', '60%'],
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data: [{
                  color:'#0B85B7',
                  value: this.SW_people,
                  name: '上网人次',
                  label: {
                    normal: {
                      formatter: "{b} : {c}万次",
                      textStyle: {
                        fontSize: 14
                      },
                      color:'#0B85B7'
                    }
                  },
                  itemStyle:{
                    normal:{color:'#0B85B7'}
                  }
                }]
              }]
            };
            netScale_echarts_2.setOption(option)
            netScale_echarts_2.on("click",function (param) {
              vm.$message({
                message: '没有更多内容了哦！',
                type: 'warning'
              });
            })
            this.$nextTick(function() {
              vm.loading = false;
            })
          },
          netScale_echarts3(){
            let vm = this;
            let netScale_echarts_3 = this.$echarts.init(document.getElementById("netScale_echarts_3"));
            let option = {
              color:['#6AB73A'],
              title : {
                text: '点击图例分析上网流量',
                x:'center',
                textStyle: {
                  color:'#6AB73A'
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ['上网流量'],
                textStyle: {
                  color: '#6AB73A',
                }
              },
              series: [{
                name: '上网流量',
                type: 'pie',
                radius: ['50%', '60%'],
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data: [{
                  color:'#6AB73A',
                  value: this.SW_flower,
                  name: '上网流量',
                  label: {
                    normal: {
                      formatter: "{b} : {c}TB",
                      textStyle: {
                        fontSize: 14
                      },
                      color:'#6AB73A'
                    }
                  },
                  itemStyle:{
                    normal:{color:'#6AB73A'}
                  }
                }]
              }]
            };
            netScale_echarts_3.setOption(option)
            netScale_echarts_3.on("click",function (param) {
              for(let i=0;i<vm.jurisdiction.length;i++){
                if(vm.jurisdiction[i] == 'safe_flow'){
                  vm.$store.commit('change_active','5-3')
                  vm.$router.push({path:'netFlow'})
                  return
                }
              }
              vm.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
            })
            vm.$nextTick(function() {
              vm.loading = false;
            })
          },
          netScale_echarts4(){
            let vm = this;
            let netScale_echarts_4 = this.$echarts.init(document.getElementById("netScale_echarts_4"), 'customed');
            let option = {
              color:['#3BB7AE'],
              title : {
                text: '上网时长分析',
                x:'center',
                textStyle: {
                  color:'#3BB7AE'
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a}"
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ['上网时长'],
                textStyle: {
                  color: '#3BB7AE',
                }
              },
              series: [{
                name: '上网时长',
                type: 'pie',
                radius: ['50%', '60%'],
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data: [{
                  color:'#3BB7AE',
                  value: 20,
                  name: '点击进入查看',
                  label: {
                    normal: {
                      formatter: "{b}",
                      textStyle: {
                        fontSize: 14
                      },
                      color:'#3BB7AE'
                    }
                  },
                  itemStyle:{
                    normal:{color:'#3BB7AE'}
                  }
                }]
              }]
            };
            netScale_echarts_4.setOption(option)
            netScale_echarts_4.on("click",function (param) {
              for(let i=0;i<vm.jurisdiction.length;i++){
                if(vm.jurisdiction[i] == 'safe_time'){
                  vm.$store.commit('change_active','5-4')
                  vm.$router.push({path:'timeLength'})
                  return
                }
              }
              vm.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');

            })
          },
          netScale_echarts5(){
            let vm = this
            let netScale_echarts_5 = this.$echarts.init(document.getElementById("netScale_echarts_5"), 'customed');
            let option = {
              color:['#A306B7'],
              title : {
                text: '上网高峰分析',
                x:'center',
                textStyle: {
                  color:'#A306B7'
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a}"
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ['上网高峰'],
                textStyle: {
                  color: '#A306B7',
                }
              },
              series: [{
                name: '上网高峰',
                type: 'pie',
                radius: ['50%', '60%'],
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data: [{
                  color:'#A306B7',
                  value: 20,
                  name: '点击进入查看',
                  label: {
                    normal: {
                      formatter: "{b}",
                      textStyle: {
                        fontSize: 14
                      },
                      color:'#A306B7'
                    }
                  },
                  itemStyle:{
                    normal:{color:'#A306B7'}
                  }
                }]
              }]
            };
            netScale_echarts_5.setOption(option)
            netScale_echarts_5.on("click",function (param) {
              for(let i=0;i<vm.jurisdiction.length;i++){
                if(vm.jurisdiction[i] == 'safe_hot'){
                  vm.$store.commit('change_active','5-5')
                  vm.$router.push({path:'netTop'})
                  return
                }
              }
              vm.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
            })
          },

          //网络应用分布列表
          app_start_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val >this.app_end_time){
              if(this.app_end_time!==''){
                this.$message.error('开始时间不能大于结束时间哦！');
                this.app_start_time = ''
                return
              }else{
                this.app_start_time = val
              }
            }else{
              vm.app_start_time = val
              vm.loading1 = true
              //网络应用TOP10应用分布函数
              this.net_list_fn(this.app_start_time,this.app_end_time)
            }

          },
          app_end_time_change(val){
            let vm = this
            if(val == undefined){
              return
            }else if(val<this.app_start_time){
              this.$message.error('结束时间不能小于开始时间哦！');
              this.app_end_time = ''
              return
            }else{
              vm.app_end_time = val
              vm.loading1 = true
              //网络应用TOP10应用分布函数
              this.net_list_fn(this.app_start_time,this.app_end_time)
            }

          },
          net_list_fn(start,end){
            let vm = this
            //网络应用分布列表
            vm.$axios.request("post","networkApplication/applicationTop10",{startDate:start, endDate:end},function(data){
              vm.app_list = []
              let top = 1
              for(let i=0;i<data.result.length;i++){
                let topS = top++
                vm.app_list.push({
                  top:topS,
                  name:data.result[i].urlname,
                  num:data.result[i].count,
                  school:data.result[i].xy,
                  app_class:data.result[i].urltype
                })
              }
              vm.$nextTick(function() {
                vm.loading1 = false
              })
            },function(err){
              console.log(err);
            })
          }
        },
        mounted () {
          this.$echarts.registerTheme('customed', this.$store.state.echartsData);
          this.netScale_echarts4()
          this.netScale_echarts5()
          /*this.netScale_echarts6()
          this.netScale_echarts7()*/
        },
      created(){
        window.scrollTo(0,0);
        let vm = this
        vm.make_time()
        vm.SW_fn(vm.SW_start_time,vm.SW_end_time)
        //网络应用TOP10应用分布函数
        this.net_list_fn(this.app_start_time,this.app_end_time)

        //从浏览器session里边获取权限
        let jurisdiction = sessionStorage.getItem("jurisdiction")
        vm.jurisdiction = jurisdiction.split(",");
        console.log(vm.jurisdiction )
      }
    }
</script>


