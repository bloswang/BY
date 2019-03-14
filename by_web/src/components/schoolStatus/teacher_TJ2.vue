<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/school' }">北语校情</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/school' }">学生用房详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="by_body_table_div">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          本科学生用房
          <el-select
            v-model="typeSelect"
            placeholder="请选择"
            size="mini"
            class="major-select select_width"
            @change="typeChange">
            <el-option
              v-for="(item,index) in typeList"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </h5>
        <div class="grid-content bg-purple-dark">
          <template>
            <el-table
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="tableData"
              style="width: 100%"
              class="by_body_table"
              :border=false>
              <el-table-column prop="use" label="房间用途" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="big_name" label="楼名" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="name" label="房间号" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="count" label="床位总数" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="use_count" label="已占用床位号" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="no_use" label="剩余床位数" align="center" class-name="by_body_row" label-class-name="by_body_label">
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
    <el-row class="by_body_table_div">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          留学生用房
          <el-select
            v-model="typeSelect1"
            placeholder="请选择"
            size="mini"
            class="major-select select_width"
            @change="typeChange1">
            <el-option
              v-for="(item,index) in typeList1"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </h5>
        <div class="grid-content bg-purple-dark">
          <template>
            <el-table
              v-loading="loading1"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="tableData1"
              style="width: 100%"
              class="by_body_table"
              :border=false>
              <el-table-column prop="room_type" label="房间类型" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="is_use" label="是否可用" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_number" label="房间号" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_c" label="楼层" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_name" label="楼名" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_sex" label="性别要求" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_BZ" label="备注" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_footer" label="地上楼层" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_place" label="宿舍区" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_count" label="床位数" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="room_from" label="房间归属" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="block"  style="width:300px;margin:20px auto">
          <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page.sync= pageNum1
            :page-size= size1
            layout="total, prev, pager, next"
            :total=total_count1>
          </el-pagination>
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
        //本科学生用房
        loading:true,
        typeSelect:'学2楼',
        typeList:['学2楼','学3楼','学5楼','学10楼','学11楼','学12楼','学13楼','学14楼','学15楼'],
        tableData: [],
        pageNum:1,
        size:8,
        total_count:0,
        //留学生用房
        loading1:true,
        typeSelect1:'学1楼',
        typeList1:['学1楼','学4楼','学6楼','学7楼','学8楼','学9楼','学16楼','学17楼','专家楼'],
        tableData1: [],
        pageNum1:1,
        size1:8,
        total_count1:0,
      }
    },
    components: {},
    methods: {
      handleSizeChange(val) {
        var vm = this
        vm.loading = true
        vm.pageNum = val
        this.student_L_init_fn(this.pageNum,this.size,this.typeSelect)
      },
      handleCurrentChange(val) {
        var vm = this
        vm.loading = true
        vm.pageNum = val
        this.student_L_init_fn(this.pageNum,this.size,this.typeSelect)
      },
      typeChange(val){
        let  vm = this
        vm.pageNum = 1
        vm.typeSelect = val
        vm.loading = true
        this.student_L_init_fn(this.pageNum,this.size,this.typeSelect)
      },
      student_L_init_fn(page,size,use){
        let vm = this
        vm.$axios.request("post","teachConditionAnalyze/localDormitoryList", {
          page:page,
          pageSize:size,
          building:use
        },function(data){
          vm.tableData = []
          vm.total_count = parseInt(data.totalCount)
          for(let i=0;i<data.result.length;i++){
            vm.tableData.push({
              use:data.result[i].remark,
              name:data.result[i].room,
              big_name:data.result[i].building,
              count:data.result[i].bed_count=='null'?'未知':data.result[i].bed_count,
              use_count:data.result[i].occupy_bed=='null'?'0':data.result[i].occupy_bed,
              no_use:data.result[i].surplus_bed_sum,
            })
          }
          vm.$nextTick(function() {
            vm.loading = false
          })
        },function(err){
          console.log(err);
        })
      },


      handleSizeChange1(val) {
        var vm = this
        vm.loading1 = true
        vm.pageNum1 = val
        vm.student_L_init_fn1(vm.pageNum1,vm.size1,vm.typeSelect1)
      },
      handleCurrentChange1(val) {
        var vm = this
        vm.loading1 = true
        vm.pageNum1 = val
        vm.student_L_init_fn1(vm.pageNum1,vm.size1,vm.typeSelect1)
      },
      typeChange1(val){
        let  vm = this
        vm.pageNum1 = 1
        vm.typeSelect1 = val
        vm.loading1 = true
        vm.student_L_init_fn1(vm.pageNum1,vm.size1,vm.typeSelect1)
      },
      student_L_init_fn1(page,size,use){
        let vm = this
        vm.$axios.request("post","teachConditionAnalyze/foreinDormitoryList", {
          page:page,
          pageSize:size,
          building:use
        },function(data){
          vm.tableData1 = []
          vm.total_count1 = parseInt(data.totalCount)
          for(let i=0;i<data.result.length;i++){
            vm.tableData1.push({
              room_type:data.result[i].fjlxmc,
              is_use:data.result[i].sfky,
              room_number:data.result[i].fjh,
              room_c:data.result[i].lc=='null'?'未知':data.result[i].lc,
              room_name:data.result[i].sslmc=='null'?'未知':data.result[i].sslmc,
              room_sex:data.result[i].xbmc,
              room_BZ:data.result[i].bz=='null'?'无':data.result[i].bz,
              room_footer:data.result[i].dslc,
              room_place:data.result[i].ssqmc,
              room_count:data.result[i].cws=='null'?'未知':data.result[i].cws,
              room_from:data.result[i].fjgs=='null'?'0':data.result[i].fjgs,
            })
          }
          vm.$nextTick(function() {
            vm.loading1 = false
          })
        },function(err){
          console.log(err);
        })
      },
    },
    mounted () {
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
    },
    created(){
      window.scrollTo(0,0);
      this.student_L_init_fn(this.pageNum,this.size,this.typeSelect)
      this.student_L_init_fn1(this.pageNum1,this.size1,this.typeSelect1)
    }

  }
</script>


