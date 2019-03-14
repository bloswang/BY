<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/school' }">北语校情</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/school' }">外聘教师人数详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          外聘教师列表&nbsp;&nbsp;({{majorSelect}})&nbsp;&nbsp;&nbsp;&nbsp;(单位:人)
          <el-select
            v-model="majorSelect"
            placeholder="请选择"
            size="mini"
            class="major-select"
            @change="majorChange">
            <el-option
              v-for="item in majorList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-select
            v-model="tjSelect"
            placeholder="请选择"
            size="mini"
            class="major-select"
            @change="tjSelectChange">
            <el-option
              v-for="item in tjList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </h5>
        <div class="grid-content bg-purple-dark">
          <template>
            <el-table
              :data="tableData"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              style="width: 100%;height: 380px;"
              class="by_body_table"
              :border=false>
              <el-table-column prop="name" label="姓名" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="sex" label="性别" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="school" label="学院" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="order" label="学位" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="XW" label="职称" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
            </el-table>
          </template>
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

      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          外聘教师学院比例&nbsp;&nbsp;&nbsp;&nbsp;(单位:人)
          <el-select
            v-model="tjSelect1"
            placeholder="请选择"
            size="mini"
            class="major-select"
            @change="tjSelectChange1">
            <el-option
              v-for="item in tjList1"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </h5>
        <div class="big_height" id="echarts_3">
        </div>
      </el-col>
    </el-row>
    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          外聘人员男女比例&nbsp;&nbsp;({{majorSelect}})&nbsp;&nbsp;&nbsp;&nbsp;((单位:人))
        </h5>
        <div class="ec_height" id="echarts_2">
        </div>
      </el-col>
    </el-row>-->
    <!--<el-row type="flex" justify="space-around">
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          外聘人员职称比例

        </h5>
        <div class="ec_height" id="echarts_4">
        </div>
      </el-col>
      <el-col :span="12" class="ec_bg">
        <h5 class="ec_h5">
          外聘人员国别比例

        </h5>
        <div class="ec_height" id="echarts_5">
        </div>
      </el-col>
    </el-row>-->
    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          历史外聘人员趋势
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="history_teacher_time"
              type="year"
              format="yyyy"
              @change="history_teacher_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="echarts_6">
        </div>
      </el-col>
    </el-row>-->

  </div>
</template>
<style lang="scss">
  .big_height{
    height:600px;
  }
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

  /*.by_body_el_input {
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
  }*/
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
        tableData: [],
        loading:true,
        pageNum:1,
        size:8,
        total_count:0,
        majorSelect:'全部',
        code:'',
        majorList:['全部'],
        tjSelect:'在记录统计',
        tjList:['在记录统计','实时统计'],
        tjSelect1:'在记录统计',
        tjList1:['在记录统计','实时统计'],
        //学院比例
        teacher_title_name:[],
        teacher_title_count:[],
      }
    },
    components: {},
    methods: {
      menu() {
        window.scrollTo(0,0);
      },
      //外聘教师列表
      teacher_table(flag,academy,page,pageSize){
        let vm = this
        //教师列表
        vm.$axios.request("post","externalTeachers/teachersList",{
            flag:flag,
            academy:academy,
            page:page,
            pageSize:pageSize},function(data){
            vm.tableData = []
            vm.total_count = parseInt(data.totalCount)
            let name = ''
            let sex = ''
            let school = ''
            let order = ''
            let XW = ''
            let prrq = ''
            for(let i=0;i<data.result.length;i++){
              if(data.result[i].jsm =='null'){
                name = '未知'
              }else{
                name = data.result[i].jsm
              }

              if(data.result[i].xb =='null'){
                sex = '未知'
              }else{
                sex = data.result[i].xb
              }

              if(data.result[i].t_xsh =='null'){
                school = '未知'
              }else{
                school = data.result[i].t_xsh
              }

              if(data.result[i].t_xwdm =='null'){
                order = '未知'
              }else{
                order = data.result[i].t_xwdm
              }

              if(data.result[i].t_zcdm =='null'){
                XW = '未知'
              }else{
                XW = data.result[i].t_zcdm
              }

              if(data.result[i].prrq =='null'){
                prrq = '未知'
              }else{
                prrq = data.result[i].prrq
              }
              vm.tableData.push({
                name : name,
                sex : sex,
                school : school,
                order : order,
                XW : XW,
                prrq : prrq,
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
        vm.teacher_table(vm.tjSelect,vm.code,vm.pageNum,vm.size)
      },
      handleCurrentChange(val) {
        var vm = this
        vm.loading = true
        vm.pageNum = val
        vm.teacher_table(vm.tjSelect,vm.code,vm.pageNum,vm.size)
      },
      majorChange(val){
        let vm = this
        vm.majorSelect = val
        if(val =='全部'){
          vm.code = ''
        }else{
          vm.code = val
        }
        vm.pageNum = 1
        vm.teacher_table(vm.tjSelect,vm.code,vm.pageNum,vm.size)
      },
      tjSelectChange(val){
        let vm = this
        vm.tjSelect = val
        vm.teacher_table(vm.tjSelect,vm.code,vm.pageNum,vm.size)
      },
      //学院
      echarts3(){
        let echarts_3 = this.$echarts.init(document.getElementById("echarts_3"), 'customed');
        let option = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data:['外聘教师数量']
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
              data : this.teacher_title_name
            }
          ],
          series : [
            {
              name:'外聘教师数量',
              type:'bar',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data:this.teacher_title_count
            }
          ]
        };
        echarts_3.setOption(option)
      },
      teacher_title_fn(flag){
        let vm = this
        vm.$axios.request("post","externalTeachers/academyDis", {flag:flag},function(data){
          vm.teacher_title_name=[]
          vm.teacher_title_count=[]
          for(let i=0;i<data.results.length;i++){
            if(data.results[i].academy !=='null' && data.results[i].academy !==null){
              vm.teacher_title_name.push(data.results[i].academy)
              vm.teacher_title_count.push(data.results[i].count)
            }
          }
          vm.echarts3()
        },function(err){
          console.log(err);
        })
      },
      tjSelectChange1(val){
        let vm = this
        vm.tjSelect1 = val
        vm.teacher_title_fn(vm.tjSelect1)
      },
    },
    mounted () {
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.menu()
    },
    created(){
      let vm = this
      /*获取教师单位下拉菜单*/
      vm.$axios.request("post","staff/branches",{},function(data){
        for(let i=0;i<data.result.length;i++){
          vm.majorList.push(data.result[i].branch)
        }
      },function(err){
        console.log(err);
      })
      vm.teacher_table(vm.tjSelect,vm.code,vm.pageNum,vm.size)
      vm.teacher_title_fn(vm.tjSelect1)
    }
  }
</script>


