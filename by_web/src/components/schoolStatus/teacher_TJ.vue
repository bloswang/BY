<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/school' }">北语校情</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/school' }">教学条件分析详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="by_body_table_div">
      <el-col :span="24"  class="ec_bg">
        <h5 class="ec_h5">
          教学用房详情
          <el-select
            v-model="typeSelect2"
            placeholder="请选择"
            size="mini"
            class="major-select select_width"
            @change="typeChange2">
            <el-option
              v-for="(item,index) in typeList2"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </h5>
        <div class="grid-content bg-purple-dark">
          <template>
            <el-table
              v-loading="loading2"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              :data="tableData2"
              style="width: 100%"
              class="by_body_table"
              :border=false>
              <el-table-column prop="order" label="建筑物编号" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="big_name" label="教学楼名称" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="name" label="教室名称" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="use" label="教室用途" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="ks_num" label="考试人数" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="sum_num" label="座位数" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="block"  style="width:300px;margin:20px auto">
          <el-pagination
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page.sync= pageNum2
            :page-size= size2
            layout="total, prev, pager, next"
            :total=total_count2>
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-row class="by_body_table_div">
      <el-col :span="24"  class="ec_bg">
        <h5 class="ec_h5">
          校园网建设新增设备
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="netMake"
              type="year"
              format="yyyy"
              @change="netMake_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="tab_warPer" style="margin-bottom: 50px">
          <table v-for="list in listData" class="table table_ten" style="width: 33%">
            <tr>
              <td class="black">{{list.name}}</td>
            </tr>
            <tr>
              <td>
                {{list.value}}
              </td>
            </tr>
          </table>
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
        loading2:true,
        typeSelect2:'专用教室',
        typeList2:['计算机机房','实验室','专用教室','语音室','多媒体教室'],
        tableData2: [],
        pageNum2:1,
        size2:8,
        total_count2:0,
        netMake:'2017',
        listData:[]

      }
    },
    components: {},
    methods: {
      handleSizeChange2(val) {
        var vm = this
        vm.loading2 = true
        vm.pageNum2 = val
        this.teach_init_fn(this.pageNum2,this.size2,this.typeSelect2)
      },
      handleCurrentChange2(val) {
        var vm = this
        vm.loading2 = true
        vm.pageNum2 = val
        this.teach_init_fn(this.pageNum2,this.size2,this.typeSelect2)
      },
      typeChange2(val){
        let  vm = this
        vm.pageNum2 = 1
        vm.typeSelect2 = val
        vm.loading2 = true
        this.teach_init_fn(this.pageNum2,this.size2,this.typeSelect2)
      },
      teach_init_fn(page,size,use){
        let vm = this
        vm.$axios.request("post","teachConditionAnalyze/classRoomList", {
          page:page,
          pageSize:size,
          use:use
        },function(data){
          vm.tableData2 = []
          vm.total_count2 = parseInt(data.totalCount)
          console.log(data)
          for(let i=0;i<data.result.length;i++){
            vm.tableData2.push({
              order:data.result[i].jzwbh,
              name:data.result[i].name,
              big_name:data.result[i].jxlmc,
              use:data.result[i].use=='null'?'未知':data.result[i].use,
              ks_num:parseInt(data.result[i].ksrs),
              sum_num:parseInt(data.result[i].skrs),
            })
          }
          vm.$nextTick(function() {
            vm.loading2 = false
          })
        },function(err){
          console.log(err);
        })
      },

      //校园网建设新增设备
      netMake_change(val){
        let vm =  this
        if(val == undefined){
          return
        }else{
          vm.netMake = val
          this.netMake_init(this.netMake)
        }

      },
      netMake_init(year){
        let vm = this
        vm.$axios.request("post","BYAnalyze/schoolNetwork", {year:year},function(data){
          vm.listData = []
          for(let i=0;i<data.result.length;i++){
            if(data.result[i].name!=='其他'){
              vm.listData.push(
             {
                name:data.result[i].name,
                value:parseInt(data.result[i].numbers)+'台'
              },
            )
            }

          }
        },function(err){
          console.log(err);
        })
      }
    },
    mounted () {
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
    },
    created(){
      window.scrollTo(0,0);
      this.teach_init_fn(this.pageNum2,this.size2,this.typeSelect2)
      this.netMake_init(this.netMake)
    }

  }
</script>


