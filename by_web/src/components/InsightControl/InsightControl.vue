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
            <a href="javascript:;" @click="mao(40)" style="color: white;font-size: 14px">一卡通总体消费分析</a>
            </span>
          </el-menu-item>
        </a>
        <a href="javascript:;" @click="mao(450)">
          <el-menu-item index="2">
            <img src="../../assets/img/student_02.png" height="26" width="26" alt="">
            <span slot="title">
            <a href="javascript:;" @click="mao(450)" style="color: white;font-size: 14px">消费行为分析</a>
          </span>
          </el-menu-item>
        </a>
        <a href="javascript:;" @click="mao(950)">
          <el-menu-item index="3">
            <img src="../../assets/img/student_03.png" height="25" width="25" alt="">
            <span slot="title">
            <a href="javascript:;" @click="mao(950)" style="color: white;font-size: 14px">就餐高峰分析</a>
          </span>
          </el-menu-item>
        </a>
        <a href="javascript:;" @click="mao(1350)">
          <el-menu-item index="4">
            <img src="../../assets/img/student_04.png" height="23" width="23" alt="">
            <span slot="title">
              <a href="javascript:;" @click="mao(1350)" style="color: white;font-size: 14px">充值行为分析</a>
            </span>
          </el-menu-item>
        </a>
        <a href="javascript:;" @click="mao(1850)">
          <el-menu-item index="5">
            <img src="../../assets/img/student_05.png" height="25" width="25" alt="">
            <span slot="title">
              <a href="javascript:;" @click="mao(1950)" style="color: white;font-size: 14px">新卡/补卡/换卡趋势</a>
            </span>
          </el-menu-item>
        </a>
      </el-menu>
      <el-breadcrumb separator=">" class="navigation">
        <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
          <h5 class="ec_h5">
            一卡通总体消费分析&nbsp;&nbsp;(单位:万元)
            <el-button size="mini" @click="skip('oneCard')">分析</el-button>
            <el-button size="mini" style="margin-right: 10px" @click="return_month" v-show="isShow">返回当前年度</el-button>
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                align="right"
                size='mini'
                format="yyyy"
                @change="oneCard_change_year"
                v-model="oneCard_select_year"
                type="year"
                placeholder="选择年">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="oneCard">
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg" style="margin-bottom: 0" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
          <h5 class="ec_h5">
            消费行为分析
            <div class="ec_h5_data">
              <el-date-picker
                align="right"
                size='mini'
                format="yyyy-MM-dd"
                class="select_width"
                @change="consumer_start"
                v-model="consumer_start_year"
                type="date"
                placeholder="开始时间">
              </el-date-picker>
              <el-date-picker
                align="right"
                class="select_width"
                size='mini'
                format="yyyy-MM-dd"
                @change="consumer_end"
                v-model="consumer_end_year"
                type="date"
                placeholder="结束时间">
              </el-date-picker>
            </div>
          </h5>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around">
        <el-col :span="8" class="ec_bg" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
          <div class="ec_height" id="shiTang">
          </div>
        </el-col>
        <el-col :span="8" class="ec_bg" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
          <div class="ec_height" id="xiZao">
          </div>
        </el-col>
        <el-col :span="8" class="ec_bg" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
          <div class="ec_height" id="chaoShi">
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around">
        <el-col :span="12" class="ec_bg"
                v-loading.body="loading"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading">
          <h5 class="ec_h5">
            食堂就餐人数实时分析&nbsp;&nbsp;(单位:人)
            <!--跳转按钮-->
            <el-button size="mini" @click="skip('eat')">分析</el-button>
            <div class="ec_h5_data">
              <el-date-picker
                align="right"
                class="select_width"
                size='mini'
                format="yyyy-MM-dd"
                @change="eat_start"
                v-model="eat_start_time"
                type="date"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="eat"></div>
        </el-col>
        <el-col :span="12" class="ec_bg"
                v-loading.body="loading"
                element-loading-text="拼命加载中"
                element-loading-customClass="loading">
          <h5 class="ec_h5">
            浴室洗浴人数实时分析&nbsp;&nbsp;(单位:人)
            <el-button size="mini" @click="skip('xizao')">分析</el-button>
            <div class="ec_h5_data">
              <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM-dd"
              @change="bath_time_change"
              v-model="bath_time"
              type="date"
              placeholder='选择时间'>
            </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="bath"></div>
        </el-col>
      </el-row>
      <!--异常行为分析暂时隐藏-->
      <!--<el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg" v-loading.body="loading" element-loading-text="拼命加载中" element-loading-customClass="loading">
          <h5 class="ec_h5">
            学生异常行为分析
          </h5>
          <div class="ec_height" id="behavior">
            <div class="box1" @click="skip('shenghuo')"><span>孤僻人群分析</span></div>
            <div class="box2" @click="skip('kunnan')"><span>困难学生分析</span></div>
            <div class="box3" @click="skip('wangui')"><span>早出晚归学生分析</span></div>
            &lt;!&ndash;<div class="box4" @click="skip('behavior')"><span>学生异常行为分析</span></div>&ndash;&gt;
            <div class="box5" @click="skip('shilian')"><span>失联学生分析</span></div>
            <div class="box6" @click="skip('chenmi')"><span>沉迷网络分析</span></div>
            <div class="box7" @click="skip('taoke')"><span>逃课行为分析</span></div>
          </div>
        </el-col>
      </el-row>-->

      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5">
            充值行为分析&nbsp;&nbsp;(单位:万元)
            <el-button size="mini" @click="skip('payWay')">分析</el-button>
            <div class="ec_h5_data">
              <el-date-picker
                class="select_width"
                align="right"
                size='mini'
                format="yyyy"
                @change="pay_start"
                v-model="pay_start_time"
                type="year"
                placeholder="选择时间">
              </el-date-picker>
            </div>
          </h5>
          <div class="ec_height" id="payWay">
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="ec_bg">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="新卡" name="first">
              <el-row type="flex" justify="space-around">
                <el-col :span="24" class="ec_bg">
                  <h5 class="ec_h5">
                    新卡趋势分布&nbsp;&nbsp;&nbsp;&nbsp;({{year_data}}年)
                    <el-button size="mini" @click="look_list_X">人员详情列表</el-button>
                    <div class="ec_h5_data" style="float: right; margin-left: 20px">
                      <el-date-picker
                        class="select_width"
                        align="right"
                        size='mini'
                        format="yyyy"
                        @change="year_data_change"
                        v-model="year_data"
                        type="year"
                        placeholder="选择年">
                      </el-date-picker>
                      <el-button size="mini" style="margin-left: 10px" @click="return_year" v-show="isShow0">返回月度</el-button>
                    </div>
                  </h5>
                  <div class="ec_height" id="chart_BK">
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-around" style="margin-top: -10px">
                <el-col :span="24" class="ec_bg" style="padding-bottom: 50px">
                  <div class="tab_warPer">
                    <div >
                      <table v-for="list in dataList" class="table_C">
                        <tr>
                          <td class="black">{{list.name}}</td>
                        </tr>
                        <tr>
                          <td>{{list.value}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="补卡" name="second">
              <el-row type="flex" justify="space-around">
                <el-col :span="24" class="ec_bg">
                  <h5 class="ec_h5">
                    补卡趋势分布&nbsp;&nbsp;&nbsp;&nbsp;({{year_data1}}年)
                    <el-button size="mini" @click="look_list_B">人员详情列表</el-button>
                    <div class="ec_h5_data" style="float: right; margin-left: 20px">
                      <el-date-picker
                        class="select_width"
                        align="right"
                        size='mini'
                        format="yyyy"
                        @change="year_data_change1"
                        v-model="year_data1"
                        type="year"
                        placeholder="选择年">
                      </el-date-picker>
                      <el-button size="mini" style="margin-left: 10px" @click="return_year1" v-show="isShow1">返回月度</el-button>
                    </div>
                  </h5>
                  <div class="ec_height" id="chart_BK1">
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-around" style="margin-top: -10px">
                <el-col :span="24" class="ec_bg" style="padding-bottom: 50px">
                  <div class="tab_warPer">
                    <div>
                      <p class="ec_h5">人工补卡趋势:</p>
                      <table v-for="list in dataList1" class="table_C">
                        <tr>
                          <td class="black">{{list.name}}</td>
                        </tr>
                        <tr>
                          <td>{{list.value}}</td>
                        </tr>
                      </table>
                    </div>
                    <div>
                      <p class="ec_h5">自助补卡趋势:</p>
                      <table v-for="list in dataList1_1" class="table_C">
                        <tr>
                          <td class="black">{{list.name}}</td>
                        </tr>
                        <tr>
                          <td>{{list.value}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="换卡" name="third">
              <el-row type="flex" justify="space-around">
                <el-col :span="24" class="ec_bg">
                  <h5 class="ec_h5">
                    换卡趋势分布&nbsp;&nbsp;&nbsp;&nbsp;({{year_data2}}年)
                    <el-button size="mini" @click="look_list_H">人员详情列表</el-button>
                    <div class="ec_h5_data" style="float: right; margin-left: 20px">
                      <el-date-picker
                        class="select_width"
                        align="right"
                        size='mini'
                        format="yyyy"
                        @change="year_data_change2"
                        v-model="year_data2"
                        type="year"
                        placeholder="选择年">
                      </el-date-picker>
                      <el-button size="mini" style="margin-left: 10px" @click="return_year2" v-show="isShow2">返回月度</el-button>
                    </div>
                  </h5>
                  <div class="ec_height" id="chart_BK2">
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-around" style="margin-top: -10px">
                <el-col :span="24" class="ec_bg" style="padding-bottom: 50px">
                  <div class="tab_warPer">
                    <div >
                      <table v-for="list in dataList2" class="table_C">
                        <tr>
                          <td class="black">{{list.name}}</td>
                        </tr>
                        <tr>
                          <td>{{list.value}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <h5 class="ec_h5">
          人员详情列表
        </h5>
        <div class="ec_height" id="positive">
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="people_list"
            style="width: 100%;overflow: auto"
            :show-header='true'>
            <el-table-column prop="name" label="姓名"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="sex" label="性别" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="s_type" label="卡类别"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="card" label="卡号"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="start_time" label="人员类别"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="cz_time" label="操作日期" class-name="elTableName">
            </el-table-column>
          </el-table>
        </div>
        <div class="block"  style="width:300px;margin:20px auto">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync= pageNum
            :page-size= size
            layout="total, prev, pager, next"
            :total=total_count>
          </el-pagination>
        </div>
      </el-dialog>


    </div>
</template>

<script>
  import time from '../../config/timeFormat'
    export default {
      data(){
        return{
          isShow:false,
          loading:true,
          isCollapse: true,
          oneCard_select_year:'2017',
          oneCard_all:[],
          oneCard_time:[],
          oneCart_title:[],
          consumer_start_year:'2017-01-01',
          consumer_end_year:'2017-12-30',
          pay_start_time:'2017',
          pay_data:{
            RG_count:[],
            RG_day:[],
            WS_count:[],
            WS_day:[],
            ZZ_count:[],
            ZZ_day:[],
            WX_count:[],
            ZFB_count:[]
          },
          //食堂就餐人数分析
          eat:'',
          eat_start_time:'2017-11-21',
          eat_room:['风味档口','租赁档口','教工餐厅','家属区食堂','清晏楼二层','清晏楼一层',],
          eat_time:[],
          eat_data:[],
          //洗浴人数分析
          bath:"",
          bath_time:'2017-11-21',
          bath_room:['学14楼','东浴室（女）','西浴室（男）','西浴室（女）'],
          bath_timer:[],
          bath_data:[],


////////////////////////////////////////////////////////////////////////
          shiTang_count:2354,
          chaoShi_count:1235,
          xiZao_count:1254,
          activeName: 'first',
//////////////////////趋势图相关新卡/////////////////////////
          isShow0:false,
          chart_BK:'',
          year_data:'2017',
          dataList:[],
          card_year:[],
          card_count:[],
//////////////////////趋势图相关补卡/////////////////////////
          isShow1:false,
          year_data1:'2017',
          dataList1:[],
          card_year1:[],
          card_count1:[],
          dataList1_1:[],
          card_year1_1:[],
          card_count1_1:[],
//////////////////////趋势图相关换卡/////////////////////////
          isShow2:false,
          year_data2:'2017',
          dataList2:[],
          card_year2:[],
          card_count2:[],
          jurisdiction:[],

          ///////////////////////详情列表相关相关/////////////////////////
          dialogVisible: false,
          flag2:'0',
          y:'2017',
          m:'',
          pageNum:1,
          size:8,
          total_count:0,
          people_list:[],
        }
      },
      methods:{
        mao(selector){
          window.scrollTo(0,selector );
        },
        menu() {
          window.scrollTo(0,0);
        },
        make_time(){
          let vm = this
          let dayTime = ''
          if(time.day < 10){
            dayTime = '0'+ time.day
          }else{
            dayTime = time.day
          }
          vm.oneCard_select_year = time.year
          vm.consumer_start_year = time.year + '-' + '01' +  '-' +'01'
          vm.consumer_end_year = time.year + '-' + time.month + '-' + dayTime
          vm.pay_start_time = time.year
          vm.eat_start_time = time.year + '-' + time.month + '-' + dayTime
          vm.bath_time = time.year + '-' + time.month + '-' + dayTime
          vm.year_data = time.year
          vm.year_data1 = time.year
          vm.year_data2 = time.year
          vm.y = time.year
        },
        eat_btn(code){
          for(let i=0;i<this.jurisdiction.length;i++){
            if(this.jurisdiction[i] == 'eat_type'){
              this.$router.push({path:'/home/control/eat_type',query:{type:code}})
              return
            }
          }
          this.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
          /*if(code =='早餐'){
            for(let i=0;i<this.jurisdiction.length;i++){
              if(this.jurisdiction[i] == 'zao'){
                this.$router.push({path:'/home/control/eat_type_zao',query:{type:'早餐'}})
                return
              }
            }
            this.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
          }else if(code =='午餐'){
            for(let i=0;i<this.jurisdiction.length;i++){
              if(this.jurisdiction[i] == 'zhong'){
                this.$router.push({path:'/home/control/eat_type_wu',query:{type:'午餐'}})
                return
              }
            }
            this.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
          }else{
            for(let i=0;i<this.jurisdiction.length;i++){
              if(this.jurisdiction[i] == 'wan'){
                this.$router.push({path:'/home/control/eat_type_wan',query:{type:'晚餐'}})
                return
              }
            }
            this.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
          }*/
        },
        //点击分析跳转
        skip(link) {
          switch (link) {
            case 'oneCard':
              for(let i=0;i<this.jurisdiction.length;i++){
                if(this.jurisdiction[i] == 'oneCard'){
                  this.$router.push('/home/control/oneCard')
                  this.$store.commit('change_active','4-2')
                  return
                }
              }
              this.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
              break;
            case 'eat':
              this.$store.commit('change_active','4-3')
              this.$router.push('/home/control/eat_type')
              break;
            case 'shenghuo':
              this.$router.push('/home/control/behavior')
              break;
            case 'kunnan':
              this.$router.push('/home/control/kunnan')
              break;
            case 'wangui':
              this.$router.push('/home/control/wangui')
              break;
            case 'shilian':
              this.$router.push('/home/control/shilian')
              break;
            case 'chenmi':
              this.$router.push('/home/control/chenmi')
              break;
            case 'taoke':
              this.$router.push('/home/control/taoke')
              break;
            case 'payWay':
              for(let i=0;i<this.jurisdiction.length;i++){
                if(this.jurisdiction[i] == 'chongzhi'){
                  this.$store.commit('change_active','4-5')
                  this.$router.push('/home/control/payWay')
                  return
                }
              }
              this.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
            break;
            case 'xizao':
              this.$store.commit('change_active','4-4')
              this.$router.push({path:"/home/control/consumerXizao", query: {name: '洗浴总消费'}})
              break;
          }
        },
        //时间控件选择
        //一卡通
        oneCard_change_year(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.oneCard_select_year = val
            //一卡通消费分析
            vm.$axios.request("post","oneCard/consumingBehavior",{year:vm.oneCard_select_year,flag:'0'},function(data){
              vm.oneCard_all = []
              vm.oneCard_time = []
              vm.oneCart_title = []
              for(var i=0;i<data.allConsume.length;i++){
                vm.oneCard_all.push(data.allConsume[i].count)
                vm.oneCard_time.push(data.allConsume[i].month+'月')
              }
              let title = vm.oneCard_select_year+'年消费分布'
              vm.oneCart_title.push(title)

              vm.oneCard();
            },function(err){
              console.log(err);
            })
          }

        },
        //消费行为开始时间
        return_month(){
          let vm = this
          setTimeout(function(){
            vm.isShow = false
          },1000)
          //一卡通消费分析
          vm.$axios.request("post","oneCard/consumingBehavior",{year:vm.oneCard_select_year,flag:'0'},function(data){
            vm.oneCard_all = []
            vm.oneCard_time = []
            vm.oneCart_title = []
            for(var i=0;i<data.allConsume.length;i++){
              vm.oneCard_all.push(data.allConsume[i].count)
              vm.oneCard_time.push(data.allConsume[i].month+'月')
            }
            let title = vm.oneCard_select_year+'年消费分布'
            vm.oneCart_title.push(title)
            vm.oneCard();
          },function(err){
            console.log(err);
          })
        },

        consumer_start(val){
          if(val == undefined){
            return
          }else if(val >this.consumer_end_year){
            if(this.consumer_end_year!==''){
              this.$message.error('开始时间不能大于结束时间哦！');
              this.consumer_start_year = ''
              return
            }else{
              this.$message.error('请选择结束时间！');
              this.consumer_start_year = val
            }
          }else{
            this.consumer_start_year = val
            this.consumer_time_change(this.consumer_start_year,this.consumer_end_year)
          }
        },
        //消费行为结束时间
        consumer_end(val){
          if(val == undefined){
            return
          }else if(val<this.consumer_start_year){
            this.$message.error('结束时间不能小于开始时间哦！');
            this.consumer_end_year = ''
            return
          }else{
            if(this.consumer_start_year == ''){
              this.$message.error('请选择开始时间！');
              return
            }else{
            this.consumer_end_year = val
            this.consumer_time_change(this.consumer_start_year,this.consumer_end_year)
          }
          }
        },
        //充值方式查询开始时间
        pay_start(val){
          if(val == undefined){
            return
          }else{
            this.pay_start_time = val
            this.pay_time_change(val)
          }

        },
        //充值时间发生变化后的函数
        pay_time_change(time){
          let vm = this;
          vm.pay_data.RG_count = [];
          vm.pay_data.RG_day=[];
          vm.pay_data.WS_count=[];
          vm.pay_data.WS_day=[];
          vm.pay_data.ZZ_count =[];
          vm.pay_data.ZZ_day = [];
          vm.pay_data.ZFB_count =[];
          vm.pay_data.WX_count =[];
          //充值行为分析
          //人工充值
          vm.$axios.request("post","recharge/rechargeAnalyse2",{year:vm.pay_start_time,flag:'0'},function(data){
            for(var i=0;i<data.CashRechargeList.length;i++){
              vm.pay_data.RG_count.push(data.CashRechargeList[i].count)
              vm.pay_data.RG_day.push(data.CashRechargeList[i].month +'月')
            }
            vm.payWay();
          },function(err){
            console.log(err);
          })

          //网上充值
          vm.$axios.request("post","recharge/rechargeAnalyse1",{year:vm.pay_start_time,flag:'0'},function(data){
            for(var j=0;j<data.NetRechargeList.length;j++){
              vm.pay_data.WS_count.push(data.NetRechargeList[j].count)
            }
            vm.payWay();
          },function(err){
            console.log(err);
          })

          //自助充值
          vm.$axios.request("post","recharge/rechargeAnalyse",{year:vm.pay_start_time,flag:'0'},function(data){
            for(var k=0;k<data.SelfRechargeList.length;k++){
              vm.pay_data.ZZ_count.push(data.SelfRechargeList[k].count)
            }
            vm.payWay();
          },function(err){
            console.log(err);
          })

          //支付宝充值
          vm.$axios.request("post","recharge/AlipayRecharge",{year:vm.pay_start_time,flag:'0'},function(data){
            for(var j=0;j<data.NetRechargeList.length;j++){
              vm.pay_data.ZFB_count.push(data.NetRechargeList[j].count)
            }
            vm.payWay();
          },function(err){
            console.log(err);
          })

          //微信充值
          vm.$axios.request("post","recharge/WxPayRecharge",{year:vm.pay_start_time,flag:'0'},function(data){
            for(var j=0;j<data.NetRechargeList.length;j++){
              vm.pay_data.WX_count.push(data.NetRechargeList[j].count)
            }
            vm.payWay();
          },function(err){
            console.log(err);
          })

        },

        //消费行为时间发生变化后的函数
        consumer_time_change(startTime,endTime){
          let vm = this;
          //食堂总消费
          vm.$axios.request("post","card/mealsConsume",{startTime:startTime,endTime:endTime},function(data){
            for(var i=0;i<data.result.length;i++){
              vm.shiTang_count = Math.round(data.result[i].charge)
            }
            vm.shiTang();
          },function(err){
            console.log(err);
          })
          //商户总消费
          vm.$axios.request("post","card/supermarketConsume",{startTime:startTime,endTime:endTime},function(data){
            for(var i=0;i<data.result.length;i++){
              vm.chaoShi_count = Math.round(data.result[i].charge)
            }
            vm.chaoShi();
          },function(err){
            console.log(err);
          })
          //洗浴总消费
          vm.$axios.request("post","card/balnealConsume",{startTime:startTime,endTime:endTime},function(data){
            for(var i=0;i<data.result.length;i++){
              vm.xiZao_count = Math.round(data.result[i].charge)
            }
            vm.xiZao();
          },function(err){
            console.log(err);
          })
        },

        //食堂就餐人数分析
        ST_eat_init_fn(){
          let model = {
            yCates: this.eat_room,
            xCates: this.eat_time,
            data: this.eat_data,
          };
          let data = model.data.map(function (item) {
            return [item[1], item[0], item[2] || '-'];
          });
          let option = {
            tooltip: {
              position: 'top',
              formatter: function (params) {
                return '就餐人数分析 : '+
                        '<br/>'+ params.seriesName + ' : ' + params.value[2]+
                        '<br/>'+ '就餐时间' + ' : ' + params.name
              }
            },
            animation: false,
            grid: {
              height: '60%',
              y: '10%'
            },
            xAxis: {
              type: 'category',
              data: model.xCates,
            },
            yAxis: {
              type: 'category',
              data: model.yCates
            },
            dataZoom: [
              {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 5,
                end: 20
              },
              {
                type: 'inside',
                xAxisIndex: [0],
                start: 30,
                end: 40
              }
            ],
            visualMap: {
              min: 0,
              max: 350,
              calculable: true,
              orient: 'horizontal',
              left: 'center',
              bottom: '10%',
              inRange: {
                color: ['#eee', '#DEDA14'],
              }
            },
            series: [{
              name: '就餐人数',
              type: 'heatmap',
              data: data,
              label: {
                normal: {
                  show: true,
                  color:"#9C9C9C"
                },

              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
              }
            }]
          };
          this.eat.setOption(option);
        },
        eat_start(val){
          if(val == undefined){
            return
          }else{
            this.eat_start_time = val
            this.eat_hot_init_fn(this.eat_start_time)
          }

        },
        eat_hot_init_fn(time){
          var vm = this
          vm.eat_time = []
          vm.eat_data = []
          vm.$axios.request("post","canteen/currentConsume",{canteenname:'清晏楼一层',currentTime :time},function(data){
            for(let i = 0;i < data.result.length;i++){
              vm.eat_time.push(data.result[i].continue)
              vm.eat_data.push([5 , i , data.result[i].count*1])
              console.log(data.result[i].continue)
            }
            vm.ST_eat_init_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","canteen/currentConsume",{canteenname:'清晏楼二层',currentTime :time},function(data){
            for(let i = 0;i < data.result.length;i++){
              vm.eat_data.push([4 , i , data.result[i].count*1])
            }
            vm.ST_eat_init_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","canteen/currentConsume",{canteenname:'家属区食堂',currentTime :time},function(data){
            for(let i = 0;i < data.result.length;i++){
              vm.eat_data.push([3 , i , data.result[i].count*1])
            }
            vm.ST_eat_init_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","canteen/currentConsume",{canteenname:'教工餐厅',currentTime :time},function(data){
            for(let i = 0;i < data.result.length;i++){
              vm.eat_data.push([2 , i , data.result[i].count*1])
            }
            vm.ST_eat_init_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","canteen/currentConsume",{canteenname:'租赁档口',currentTime :time},function(data){
            for(let i = 0;i < data.result.length;i++){
              vm.eat_data.push([1 , i , data.result[i].count*1])
            }
            vm.ST_eat_init_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","canteen/currentConsume",{canteenname:'风味档口',currentTime :time},function(data){
            for(let i = 0;i < data.result.length;i++){
              vm.eat_data.push([0 , i , data.result[i].count*1])
            }
            vm.ST_eat_init_fn()
          },function(err){
            console.log(err);
          })
        },


        //洗浴人数分析
        XY_bath_init_fn(){
          let model = {
            yCates: this.bath_room,
            xCates: this.bath_timer,
            data: this.bath_data
          };
          let data = model.data.map(function (item) {
            return [item[1], item[0], item[2] || '-'];
          });
          let option = {
            tooltip: {
              position: 'top',
              formatter: function (params) {
                return '洗浴人数分析 : '
                  +'<br/>'+ params.seriesName + ':' + params.value[2]
                  +'<br/>'+ '洗浴时间' + ' : ' + params.name
              }
            },
            animation: false,
            grid: {
              height: '60%',
              y: '10%',
              left:'20%'
            },
            xAxis: {
              type: 'category',
              data: model.xCates
            },
            yAxis: {
              type: 'category',
              data: model.yCates
            },
            dataZoom: [
              {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 5,
                end: 20
              },
              {
                type: 'inside',
                xAxisIndex: [0],
                start: 80,
                end: 90
              }
            ],
            visualMap: {
              min: 0,
              max: 50,
              calculable: true,
              orient: 'horizontal',
              left: 'center',
              bottom: '10%',
              inRange: {
                color: ['#eee', '#4285f4'],
              }
            },
            series: [{
              name: '洗浴人数',
              type: 'heatmap',
              data: data,
              label: {
                normal: {
                  show: true,
                  color:"#9C9C9C"
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
          };
          this.bath.setOption(option);
        },
        bath_time_change(val){
          if(val == undefined){
            return
          }else{
            this.bath_time = val
            this.bath_hot_init_fn(this.bath_time)
          }

        },
        bath_hot_init_fn(time){
          var vm = this
          vm.bath_timer = []
          vm.bath_data = []
          vm.$axios.request("post","oneCard/bathCurrentConsume",{bathPlace:'西浴室（女）',currentTime :time},function(data){
            for(let i = 0;i < data.result.length;i++){
              vm.bath_timer.push(data.result[i].continue)
              vm.bath_data.push([3 , i , data.result[i].count*1])
            }
            vm.XY_bath_init_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/bathCurrentConsume",{bathPlace:'西浴室（男）',currentTime :time},function(data){
            for(let i = 0;i < data.result.length;i++){
              vm.bath_data.push([2 , i , data.result[i].count*1])
            }
            vm.XY_bath_init_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/bathCurrentConsume",{bathPlace:'东浴室（女）',currentTime :time},function(data){
            for(let i = 0;i < data.result.length;i++){
              vm.bath_data.push([1 , i , data.result[i].count*1])
            }
            vm.XY_bath_init_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","oneCard/bathCurrentConsume",{bathPlace:'学14楼',currentTime :time},function(data){
            for(let i = 0;i < data.result.length;i++){
              vm.bath_data.push([0 , i , data.result[i].count*1])
            }
            vm.XY_bath_init_fn()
          },function(err){
            console.log(err);
          })
        },

        //echarts地图函数
        oneCard() {
          let vm = this;
          let oneCard = this.$echarts.init(document.getElementById('oneCard'), 'customed');
          let option = {
            title: {
              text: '提示:点击月份时间点查看当月数据详情',
              textStyle: {
                fontSize: 12,
                color:'#FE0F36'
              },
              left:'70%',
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
            toolbox: {
              show : true,
              feature : {
                dataView : {show: true, readOnly: true},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
              }
            },
            legend: {
              data: vm.oneCart_title
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
              data: this.oneCard_time
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: vm.oneCart_title[0],
              type: 'line',
              stack: '总量',
              data: this.oneCard_all
            }],
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: 'black'
                }
              }
            }
          };
          oneCard.on('click', function(params){
            setTimeout(function(){
              vm.isShow = true
            },1000)
            let time = ''
            let flag = params.name
            let flag2 = params.name
            flag = flag.slice(1,2)
            flag2 = flag2.slice(2,3)
            if(flag =='日'||flag2 =='日'){
              return
            }else{
              if(parseInt(params.name)<10){
                time = vm.oneCard_select_year +'-'+'0'+ parseInt(params.name)
              }else{
                time = vm.oneCard_select_year +'-' + parseInt(params.name)
              }
              //一卡通消费分析
              vm.$axios.request("post","oneCard/consumingBehavior",{month:time,flag:'1'},function(data){
                vm.oneCard_all = []
                vm.oneCard_time = []
                vm.oneCart_title = []
                for(var i=0;i<data.allConsume.length;i++){
                  vm.oneCard_all.push(data.allConsume[i].count)
                  vm.oneCard_time.push(data.allConsume[i].day +'日')
                }
                let title = vm.oneCard_select_year + '-'+parseInt(params.name)+ '月消费分布'
                vm.oneCart_title.push(title)
                vm.oneCard();
              },function(err){
                console.log(err);
              })
              return
            }
            return
          });
          oneCard.setOption(option);
          vm.$nextTick(function() {
            vm.loading = false;
          })
        },
        shiTang(){
          let vm = this;
          let shiTang = this.$echarts.init(document.getElementById('shiTang'), 'customed');
          let option = {
            tooltip : {

              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}万元"
            },
            legend: {
              orient: 'vertical',
              left: 'center',
              data: ['食堂总消费']
            },
            series : [
              {
                type: 'pie',
                name:'',
                radius : ['40%', '44%'],
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data:[
                  {
                    color:'#089fb7',
                    name:'食堂总消费',
                    value:vm.shiTang_count,
                    label: {
                      normal: {
                        formatter: "{b} : {c}万元",
                        textStyle: {
                          fontSize: 14
                        },
                        color:'#6AB73A'
                      }
                    },
                    itemStyle:{
                      normal:{color:'#6AB73A'}
                    }
                  },
                ]
              }
            ]
          };
          /*shiTang.on('click', function(params) {
            for(let i=0;i<vm.jurisdiction.length;i++){
              if(vm.jurisdiction[i] == 'shitang'){
                vm.$router.push({ path: "/home/control/consumerShitang", query: { name: params.name } });
                return
              }
            }
            vm.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');
          });*/
          shiTang.setOption(option);
        },
        chaoShi(){
          let vm = this;
          let chaoShi = this.$echarts.init(document.getElementById('chaoShi'), 'customed');
          let option = {
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}万元"
            },
            legend: {
              orient: 'vertical',
              left: 'center',
              data: ['商户总消费']
            },
            series : [
              {
                name:'',
                type: 'pie',
                radius : ['40%', '44%'],
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data:[
                  {
                    value:vm.chaoShi_count,
                    name:'商户总消费',
                    label: {
                      normal: {
                        formatter: "{b} : {c}万元",
                        textStyle: {
                          fontSize: 14
                        },
                        color:'#B72E98'
                      },
                    },
                    itemStyle:{
                      normal:{color:'#B72E98'}
                    }
                  },
                ]
              }
            ]
          };
          /*chaoShi.on('click', function(params) {
            for(let i=0;i<vm.jurisdiction.length;i++){
              if(vm.jurisdiction[i] == 'chaoshi'){
                vm.$router.push({ path: "/home/control/consumerChaoshi", query: { name: params.name } });
                return
              }
            }
            vm.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');

          });*/
          chaoShi.setOption(option);
        },
        xiZao(){
          let vm = this;
          let xiZao = this.$echarts.init(document.getElementById('xiZao'), 'customed');
          let option = {
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}万元"
            },
            legend: {
              orient: 'vertical',
              left: 'center',
              data: ['洗浴总消费']
            },
            series : [
              {
                name:'',
                type: 'pie',
                radius : ['40%', '44%'],
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data:[
                  {
                    value:vm.xiZao_count,
                    name:'洗浴总消费',
                    label: {
                      normal: {
                        formatter: "{b} : {c}万元",
                        textStyle: {
                          fontSize: 14
                        },
                        color:'#089fb7'
                      }
                    },
                    itemStyle:{
                      normal:{color:'#089fb7'}
                    }
                  },

                ]
              }
            ]
          };
          /*xiZao.on('click', function(params) {
            for(let i=0;i<vm.jurisdiction.length;i++){
              if(vm.jurisdiction[i] == 'xizao'){
                vm.$router.push({ path: "/home/control/consumerXizao", query: { name: params.name } });
                return
              }
            }
            vm.$message.error('你没有查看此页面的权限哦！想要查看去找管理员申请吧！');

          });*/
          xiZao.setOption(option);
        },
        payWay(){
          let vm = this;
          let payWay = this.$echarts.init(document.getElementById('payWay'), 'customed');
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
              data: ['人工现金充值','自助现金充值','银行卡充值','支付宝充值','微信充值']
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
              data: vm.pay_data.RG_day
            }],
            yAxis: [{
              interval:50,
              min:0,
              max:400
            }],
            series: [{
              name: '人工现金充值',
              type: 'line',
              stack: '总量1',
              itemStyle : {
                normal : {
                  color:'#00FF00',
                  lineStyle:{
                    color:'#00FF00'
                  }
                }
              },
              data: vm.pay_data.RG_count
            },{
              name: '自助现金充值',
              type: 'line',
              stack: '总量2',
              itemStyle : {
                normal : {
                  color:'#0F0CFF',
                  lineStyle:{
                    color:'#0F0CFF'
                  }
                }
              },
              data: vm.pay_data.ZZ_count
            }, {
              name: '银行卡充值',
              type: 'line',
              stack: '总量3',
              itemStyle : {
                normal : {
                  color:'#FF1929',
                  lineStyle:{
                    color:'#FF1929'
                  }
                }
              },
              data: vm.pay_data.WS_count
            },{
              name: '支付宝充值',
              type: 'line',
              stack: '总量4',
              itemStyle : {
                normal : {
                  color:'#FF13FC',
                  lineStyle:{
                    color:'#FF13FC'
                  }
                }
              },
              data: vm.pay_data.ZFB_count
            }, {
              name: '微信充值',
              type: 'line',
              stack: '总量5',
              itemStyle : {
                normal : {
                  color:'#07FFFF',
                  lineStyle:{
                    color:'#07FFFF'
                  }
                }
              },
              data: vm.pay_data.WX_count
            }],

          };
          /*myChart.on('click', function(params) {
            //console.log(params.name);
            vm.$router.push({ path: "studentSourceDetails", query: { name: params.name } });
          });*/
          payWay.setOption(option);
        },

        /////////////////////////////tab页//////////////////////////////////////////
        handleClick(tab) {
          let vm = this
          if(tab.index == '1'){
            let chart_BK1 = document.getElementById('chart_BK1')
            chart_BK1.style.height = '400px'
            setTimeout(function(){
              vm.BK_init_fn1('1',vm.year_data1)
            },10)
          }else if(tab.index == '2'){
            let chart_BK2 = document.getElementById('chart_BK2')
            chart_BK2.style.height = '400px'
            setTimeout(function(){
              vm.BK_init_fn2('2',vm.year_data2)
            },10)
          }
        },
        ////////////////新卡////////////////////
        year_data_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.year_data = val
            vm.y =  val
            vm.BK_init_fn('0',vm.year_data)
          }

        },
        chart_BK_fn(){
          let vm = this;
          let option = {
            title: {
              text: '提示:点击月份时间点查看当月数据详情',
              textStyle: {
                fontSize: 12,
                color:'#FE0F36'
              },
              left:'70%',
              top:'5%'
            },
            toolbox: {
              show : true,
              feature : {
                dataView : {show: true, readOnly: true},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
              }
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
              data: ['新卡趋势']
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
              data: vm.card_year
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: '新卡趋势',
              type: 'line',
              stack: '总量',
              data: vm.card_count
            },
            ],
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: 'black'
                }
              }
            }
          };
          this.chart_BK.setOption(option);
          this.chart_BK.on('click',function(params){
            vm.m = params.dataIndex+1
            setTimeout(function(){
              vm.isShow0 = true
            },1000)
            let month = ''
            let flag = params.name
            let flag2 = params.name
            flag = flag.slice(1,2)
            flag2 = flag2.slice(2,3)
            if(flag =='日'||flag2 =='日'){
              return
            }else {
              month = parseInt(params.name).toString()
              vm.$axios.request("post","oneCard/reissueCard",{flag:'0',year:vm.year_data,month:month},function(data){
                vm.card_year = []
                vm.card_count = []
                vm.dataList = []
                for(let i=0;i<data.result.length;i++){
                  vm.card_year.push(data.result[i].day +'日')
                  vm.card_count.push(data.result[i].count)
                  vm.dataList.push({
                    name:data.result[i].day +'日',
                    value:data.result[i].count+'人'
                  })
                }
                vm.chart_BK_fn()
              },function(err){
                console.log(err);
              })
            }
          })
        },
        BK_init_fn(flag,year){
          let vm = this
          vm.$axios.request("post","oneCard/reissueCard",{flag:flag,year:year},function(data){
            vm.card_year = []
            vm.card_count = []
            vm.dataList = []
            for(let i=0;i<data.result.length;i++){
              vm.card_year.push(data.result[i].month+'月')
              vm.card_count.push(data.result[i].count)
              vm.dataList.push({
                name:data.result[i].month+'月',
                value:data.result[i].count+'人'
              })
            }
            vm.chart_BK_fn()
          },function(err){
            console.log(err);
          })
        },
        return_year(){
          let vm = this
          setTimeout(function(){
            vm.isShow0 = false
          },1000)
          vm.m = ''
          vm.BK_init_fn('0',vm.year_data)
        },

        ////////////////补卡////////////////////
        year_data_change1(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.year_data1 = val
            vm.y =  val
            vm.BK_init_fn1('1',vm.year_data1)
          }

        },
        chart_BK_fn1(){
          let vm = this;
          let chart_BK1 = this.$echarts.init(document.getElementById('chart_BK1'), 'customed');
          let option = {
            title: {
              text: '提示:点击月份时间点查看当月数据详情',
              textStyle: {
                fontSize: 12,
                color:'#FE0F36'
              },
              left:'70%',
              top:'5%'
            },
            toolbox: {
              show : true,
              feature : {
                dataView : {show: true, readOnly: true},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
              }
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
              data: ['人工补卡','自助补卡']
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
              data: vm.card_year1_1
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: '人工补卡',
              type: 'line',
              stack: '总量',
              data: vm.card_count1
            },{
              name: '自助补卡',
              type: 'line',
              stack: '总量1',
              data: vm.card_count1_1
            },],
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: 'black'
                }
              }
            }
          };
          chart_BK1.setOption(option);
          chart_BK1.on('click',function(params){
            vm.m = params.dataIndex+1
            setTimeout(function(){
              vm.isShow1 = true
            },1000)
            let month = ''
            let flag = params.name
            let flag2 = params.name
            flag = flag.slice(1,2)
            flag2 = flag2.slice(2,3)
            if(flag =='日'||flag2 =='日'){
              return
            }else {
              month = parseInt(params.name).toString()
              vm.$axios.request("post","oneCard/reissueCard",{flag:'1',year:vm.year_data2,month:month,isSelf:'0'},function(data){
                vm.card_year1 = []
                vm.card_count1 = []
                vm.dataList1 = []
                for(let i=0;i<data.result.length;i++){
                  vm.card_year1.push(data.result[i].day +'日')
                  vm.card_count1.push(data.result[i].count)
                  vm.dataList1.push({
                    name:data.result[i].day +'日',
                    value:data.result[i].count+'人'
                  })
                }
                vm.chart_BK_fn1()
              },function(err){
                console.log(err);
              })
              vm.$axios.request("post","oneCard/reissueCard",{flag:'1',year:vm.year_data2,month:month,isSelf:'1'},function(data){
                vm.card_year1_1 = []
                vm.card_count1_1 = []
                vm.dataList1_1 = []
                for(let i=0;i<data.result.length;i++){
                  vm.card_year1_1.push(data.result[i].day +'日')
                  vm.card_count1_1.push(data.result[i].count)
                  vm.dataList1_1.push({
                    name:data.result[i].day +'日',
                    value:data.result[i].count+'人'
                  })
                }
                vm.chart_BK_fn1()
              },function(err){
                console.log(err);
              })
            }
          })
        },
        BK_init_fn1(flag,year){
          let vm = this
          vm.$axios.request("post","oneCard/reissueCard",{flag:flag,year:year,isSelf:'0'},function(data){
            vm.card_year1 = []
            vm.card_count1 = []
            vm.dataList1 = []
            for(let i=0;i<data.result.length;i++){
              vm.card_year1.push(data.result[i].month+'月')
              vm.card_count1.push(data.result[i].count)
              vm.dataList1.push({
                name:data.result[i].month+'月',
                value:data.result[i].count+'人'
              })
            }
            vm.chart_BK_fn1()
          },function(err){
            console.log(err);
          })

          vm.$axios.request("post","oneCard/reissueCard",{flag:flag,year:year,isSelf:'1'},function(data){
            vm.card_year1_1 = []
            vm.card_count1_1 = []
            vm.dataList1_1 = []
            for(let i=0;i<data.result.length;i++){
              vm.card_year1_1.push(data.result[i].month+'月')
              vm.card_count1_1.push(data.result[i].count)
              vm.dataList1_1.push({
                name:data.result[i].month+'月',
                value:data.result[i].count+'人'
              })
            }
            vm.chart_BK_fn1()
          },function(err){
            console.log(err);
          })
        },
        return_year1(){
          let vm = this
          setTimeout(function(){
            vm.isShow1 = false
          },1000)
          vm.m = ''
          vm.BK_init_fn1('1',vm.year_data1)
        },

        ////////////////换卡////////////////////
        year_data_change2(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.year_data2 = val
            vm.y =  val
            vm.BK_init_fn2('2',vm.year_data2)
          }

        },
        chart_BK_fn2(){
          let vm = this;
          let chart_BK2 = this.$echarts.init(document.getElementById('chart_BK2'), 'customed');
          let option = {
            title: {
              text: '提示:点击月份时间点查看当月数据详情',
              textStyle: {
                fontSize: 12,
                color:'#FE0F36'
              },
              left:'70%',
              top:'5%'
            },
            toolbox: {
              show : true,
              feature : {
                dataView : {show: true, readOnly: true},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
              }
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
              data: ['换卡趋势']
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
              data: vm.card_year2
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: '换卡趋势',
              type: 'line',
              stack: '总量',
              data: vm.card_count2
            },
            ],
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: 'black'
                }
              }
            }
          };
          chart_BK2.setOption(option);
          chart_BK2.on('click',function(params){
            vm.m = params.dataIndex+1
            setTimeout(function(){
              vm.isShow2 = true
            },1000)
            let month = ''
            let flag = params.name
            let flag2 = params.name
            flag = flag.slice(1,2)
            flag2 = flag2.slice(2,3)
            if(flag =='日'||flag2 =='日'){
              return
            }else {
              month = parseInt(params.name).toString()
              vm.$axios.request("post","oneCard/reissueCard",{flag:'2',year:vm.year_data2,month:month},function(data){
                vm.card_year2 = []
                vm.card_count2 = []
                vm.dataList2 = []
                for(let i=0;i<data.result.length;i++){
                  vm.card_year2.push(data.result[i].day +'日')
                  vm.card_count2.push(data.result[i].count)
                  vm.dataList2.push({
                    name:data.result[i].day +'日',
                    value:data.result[i].count+'人'
                  })
                }
                vm.chart_BK_fn2()
              },function(err){
                console.log(err);
              })
            }
          })
        },
        BK_init_fn2(flag,year){
          let vm = this
          vm.$axios.request("post","oneCard/reissueCard",{flag:flag,year:year},function(data){
            vm.card_year2 = []
            vm.card_count2 = []
            vm.dataList2 = []
            for(let i=0;i<data.result.length;i++){
              vm.card_year2.push(data.result[i].month+'月')
              vm.card_count2.push(data.result[i].count)
              vm.dataList2.push({
                name:data.result[i].month+'月',
                value:data.result[i].count+'人'
              })
            }
            vm.chart_BK_fn2()
          },function(err){
            console.log(err);
          })
        },
        return_year2(){
          let vm = this
          setTimeout(function(){
            vm.isShow2 = false
          },1000)
          vm.m = ''
          vm.BK_init_fn2('2',vm.year_data2)
        },


        ////////////////////人员分布列表//////////////////////
        /*按钮打开列表*/
        look_list_X(){
          this.dialogVisible = true
          let vm = this
          vm.loading = true
          vm.flag2 = '0'
          vm.BK_list_init_fn(vm.flag2,vm.y,vm.m,vm.pageNum,vm.size)
        },
        look_list_B(){
          this.dialogVisible = true
          let vm = this
          vm.loading = true
          vm.flag2 = '1'
          vm.BK_list_init_fn(vm.flag2,vm.y,vm.m,vm.pageNum,vm.size)
        },
        look_list_H(){
          this.dialogVisible = true
          let vm = this
          vm.loading = true
          vm.flag2 = '2'
          vm.BK_list_init_fn(vm.flag2,vm.y, vm.m, vm.pageNum,vm.size)
        },
        handleClose(done) {
          this.dialogVisible = false
          this.pageNum=1
          this.m = ''
          this.people_list = []
        },

        BK_list_init_fn(flag,year,month,page,pageSize){
          let vm = this
          vm.$axios.request("post","oneCard/reissueList",{
            flag:flag,
            year:year,
            month:month,
            page:page,
            pageSize:pageSize,
          },function(data){
            vm.people_list = []
            vm.total_count = parseInt(data.totalCount)
            for(let i=0;i<data.result.length;i++){
              vm.people_list.push({
                name:data.result[i].name =='null'?'-':data.result[i].name,
                sex:data.result[i].sex =='null'?'-':data.result[i].sex,
                s_type:data.result[i].type =='null'?'-':data.result[i].type,
                card:data.result[i].cardno =='null'?'-':data.result[i].cardno,
                start_time:data.result[i].rxrq =='null'?'-':data.result[i].rxrq,
                cz_time:data.result[i].opdt =='null'?'-':data.result[i].opdt
              })
            }
            vm.$nextTick(function() {
              vm.loading = false
            })
          },function(err){
            console.log(err);
          })
        },
        handleSizeChange(val) {
          var vm = this
          vm.loading = true
          vm.pageNum = val
          vm.BK_list_init_fn(vm.flag2,vm.y, vm.m, vm.pageNum,vm.size)
        },
        handleCurrentChange(val) {
          var vm = this
          vm.loading = true
          vm.pageNum = val
          vm.BK_list_init_fn(vm.flag2,vm.y, vm.m, vm.pageNum,vm.size)
        },
      },
      mounted(){
          //echarts主题
        this.$echarts.registerTheme('customed', this.$store.state.echartsData);
        this.chart_BK = this.$echarts.init(document.getElementById('chart_BK'), 'customed');
        this.eat = this.$echarts.init(document.getElementById('eat'), 'customed');
        this.bath = this.$echarts.init(document.getElementById('bath'), 'customed');
      },
      created() {

        let vm = this;
        vm.make_time()
        vm.menu()
        //一卡通消费分析
        vm.$axios.request("post","oneCard/consumingBehavior",{year:vm.oneCard_select_year,flag:'0'},function(data){
          for(var i=0;i<data.allConsume.length;i++){
            vm.oneCard_all.push(data.allConsume[i].count)
            vm.oneCard_time.push(data.allConsume[i].month+'月')
          }
          let title = vm.oneCard_select_year+'年消费分布'
          vm.oneCart_title.push(title)
          vm.oneCard();
        },function(err){
          console.log(err);
        })
          //食堂总消费
        vm.$axios.request("post","card/mealsConsume",{startTime:vm.consumer_start_year,endTime:vm.consumer_end_year},function(data){
          for(var i=0;i<data.result.length;i++){
            vm.shiTang_count = Math.round(data.result[i].charge)
          }
          vm.shiTang();
        },function(err){
          console.log(err);
        })

        //商户总消费
        vm.$axios.request("post","card/supermarketConsume",{startTime:vm.consumer_start_year,endTime:vm.consumer_end_year},function(data){
          for(var i=0;i<data.result.length;i++){
            vm.chaoShi_count = Math.round(data.result[i].charge)
          }
          vm.chaoShi();
        },function(err){
          console.log(err);
        })

        //洗浴总消费
        vm.$axios.request("post","card/balnealConsume",{startTime:vm.consumer_start_year,endTime:vm.consumer_end_year},function(data){
          for(var i=0;i<data.result.length;i++){
            vm.xiZao_count = Math.round(data.result[i].charge)
          }
          vm.xiZao();
        },function(err){
          console.log(err);
        })


       //就餐高峰期分析
        this.eat_hot_init_fn(this.eat_start_time)
      //食堂历史人数与实到人数对比
        this.bath_hot_init_fn(this.bath_time)
        //充值行为分析
        //人工充值
        vm.$axios.request("post","recharge/rechargeAnalyse2",{year:vm.pay_start_time,flag:'0'},function(data){
          for(var i=0;i<data.CashRechargeList.length;i++){
            vm.pay_data.RG_count.push(data.CashRechargeList[i].count)
            vm.pay_data.RG_day.push(data.CashRechargeList[i].month + '月')
          }
          vm.payWay();
        },function(err){
          console.log(err);
        })

        //自助充值
        vm.$axios.request("post","recharge/rechargeAnalyse",{year:vm.pay_start_time,flag:'0'},function(data){
          for(var k=0;k<data.SelfRechargeList.length;k++){
            vm.pay_data.ZZ_count.push(data.SelfRechargeList[k].count)
          }
          vm.payWay();
        },function(err){
          console.log(err);
        })

        //银行卡充值
        vm.$axios.request("post","recharge/rechargeAnalyse1",{year:vm.pay_start_time,flag:'0'},function(data){
          for(var j=0;j<data.NetRechargeList.length;j++){
            vm.pay_data.WS_count.push(data.NetRechargeList[j].count)
          }
          vm.payWay();
        },function(err){
          console.log(err);
        })
        //支付宝充值
        vm.$axios.request("post","recharge/AlipayRecharge",{year:vm.pay_start_time,flag:'0'},function(data){
          for(var j=0;j<data.NetRechargeList.length;j++){
            vm.pay_data.ZFB_count.push(data.NetRechargeList[j].count)
          }
          vm.payWay();
        },function(err){
          console.log(err);
        })

        //微信充值
        vm.$axios.request("post","recharge/WxPayRecharge",{year:vm.pay_start_time,flag:'0'},function(data){
          for(var j=0;j<data.NetRechargeList.length;j++){
            vm.pay_data.WX_count.push(data.NetRechargeList[j].count)
          }
          vm.payWay();
        },function(err){
          console.log(err);
        })


        //从浏览器session里边获取权限
        let jurisdiction = sessionStorage.getItem("jurisdiction")
        vm.jurisdiction = jurisdiction.split(",");


        //新卡补卡换卡
        vm.BK_init_fn('0',vm.year_data)
        //人员列表
        vm.BK_list_init_fn(vm.flag2,vm.start_time,vm.end_time,vm.pageNum,vm.size)
      }
    }
</script>

<style lang="scss" scoped>
  .eat:hover{
    transform: scale(1.1);
    transition: 0.2s;
  }
  .eat{
    transform: scale(1);
    transition: 0.2s;
    width: 90%;
    height:70%;
    margin:30px 6%;
    float: left;
    text-align: center;
    background: url("../../../src/assets/img/time_img.png") no-repeat center;
    .eat_time{
      display: block;
      color: #089fb7;
      font-size: 20px;
      padding-top: 100px;
    }
    .eat_place{
      display: block;
      margin-top: 50px;
      color: #999;
      font-size: 14px;
    }
    .eat_type{
      display: block;
      margin-top: 80px;
      color: #999;
      font-size: 14px;
    }
  }
  #behavior{
    position: relative;
    color: white;
    .box1{
      width: 200px;
      height: 200px;
      background: url("../../../src/assets/img/bing1.png") no-repeat center;
      background-size: 100% 100%;
      position: absolute;
      top: 30px;
      left:46%;
      text-align: center;
      line-height: 200px;
    }
    .box2{
      width: 130px;
      height: 130px;
      background: url("../../../src/assets/img/bing2.png") no-repeat center;
      background-size: 100% 100%;
      position: absolute;
      top: 80px;
      left:66%;
      text-align: center;
      line-height: 130px;
    }
    .box3{
      width: 130px;
      height: 130px;
      background: url("../../../src/assets/img/bing3.png") no-repeat center;
      background-size: 100% 100%;
      position: absolute;
      top: 199px;
      left:77%;
      text-align: center;
      line-height: 130px;
    }
    /*.box4{
      width: 150px;
      height: 150px;
      background: url("../../../src/assets/img/bing4.png") no-repeat center;
      background-size: 100% 100%;
      position: absolute;
      top: 80px;
      left:85%;
      text-align: center;
      line-height: 150px;
    }*/
    .box5{
      width: 100px;
      height: 100px;
      background: url("../../../src/assets/img/bing5.png") no-repeat center;
      background-size: 100% 100%;
      position: absolute;
      top: 200px;
      left:8%;
      text-align: center;
      line-height: 100px;
    }
    .box6{
      width: 120px;
      height: 120px;
      background: url("../../../src/assets/img/bing6.png") no-repeat center;
      background-size: 100% 100%;
      position: absolute;
      top: 80px;
      left:22%;
      text-align: center;
      line-height: 120px;
    }
    .box7{
      width: 150px;
      height: 150px;
      background: url("../../../src/assets/img/bing7.png") no-repeat center;
      background-size: 100% 100%;
      position: absolute;
      top: 200px;
      left:32%;
      text-align: center;
      line-height: 150px;
    }
    div{
      transition: 0.3s;
    }
    div:hover{
      transform: scale(1.1);
      transition: 0.3s;
    }

  }
  .table_C{
    display: inline-block;
    td{
      text-align: center;
      height: 25px;
      width: 65px;
      border: 1px solid rgba(250, 250, 250,0.3);
    }
    .black{
      background: rgba(23,24,28,0.5);
    }
  }
  .tab_F{
    overflow: hidden;
    text-align: center;
  }
</style>
