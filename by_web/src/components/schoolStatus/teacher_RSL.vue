<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/school' }">北语校情</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/school' }">科研情况详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="科研项目" name="first">
            <el-row type="flex" justify="space-around">
              <el-col :span="12" class="ec_bg">
                <h5 class="ec_h5">
                  纵向项目分析
                  <div class="ec_h5_data">
                    <el-date-picker
                      class="select_width"
                      size="mini"
                      v-model="ZX_time"
                      type="year"
                      format="yyyy"
                      @change="ZX_time_change"
                      placeholder="选择时间">
                    </el-date-picker>
                    <el-select v-model="ZX_Select"  class="select_width" size="mini" @change="ZX_Select_Change">
                      <el-option
                        v-for="item in ZX_List"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </div>
                </h5>
                <div class="ec_height_Big" id="ZX">
                </div>
              </el-col>
              <el-col :span="12" class="ec_bg">
                <h5 class="ec_h5">
                  纵向项目等级分析
                  <div class="ec_h5_data">
                    <el-date-picker
                      class="select_width"
                      size="mini"
                      v-model="ZX1_time"
                      type="year"
                      format="yyyy"
                      @change="ZX1_time_change"
                      placeholder="选择时间">
                    </el-date-picker>
                  </div>
                </h5>
                <div class="ec_height_Big" id="ZX1">
                </div>
              </el-col>
            </el-row>
            <el-dialog
              :title='ZX1_listName'
              :visible.sync="dialogVisible_ZX1"
              width="30%"
              :before-close="handleClose_ZX1">
              <div id="ZX_list">
                <el-table
                  v-loading="loading_list_ZX1"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="listData_ZX1"
                  style="width: 100%">
                  <el-table-column prop="xmmc" align="center" width="200" label="项目名称" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="ryxm" align="center" label="负责人" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="lxrq" align="center" label="立项时间" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="xmfl" align="center" label="项目类别" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="xmzt" align="center" label="项目状态" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="pzjf" align="center"  label="批准经费(万)" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="ptjf" align="center"  label="配套经费(万)" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="wbjf" align="center"  label="外拨经费(万)" class-name="elTableName">
                  </el-table-column>
                </el-table>
              </div>
              <div class="block"  style="width:300px;margin:20px auto">
                <el-pagination
                  @size-change="handleSizeChange_ZX1"
                  @current-change="handleCurrentChange_ZX1"
                  :current-page.sync= pageNum_ZX1
                  :page-size= size_ZX1
                  layout="total, prev, pager, next"
                  :total=total_count_ZX1>
                </el-pagination>
              </div>
              <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close_list_btn_ZX1">确 定</el-button>
      </span>
            </el-dialog>
            <el-row type="flex" justify="space-around">
              <el-col :span="12" class="ec_bg">
                <h5 class="ec_h5">
                  校级项目分析
                  <div class="ec_h5_data">
                    <el-date-picker
                      class="select_width"
                      size="mini"
                      v-model="XJ_time"
                      type="year"
                      format="yyyy"
                      @change="XJ_time_change"
                      placeholder="选择时间">
                    </el-date-picker>
                    <el-select v-model="XJ_Select"  class="select_width" size="mini" @change="XJ_Select_Change">
                      <el-option
                        v-for="item in XJ_List"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </div>
                </h5>
                <div class="ec_height_Big" id="XJ">
                </div>
              </el-col>
              <el-col :span="12" class="ec_bg">
                <h5 class="ec_h5">
                  校级项目类别分析
                  <div class="ec_h5_data">
                    <el-date-picker
                      class="select_width"
                      size="mini"
                      v-model="XJ1_time"
                      type="year"
                      format="yyyy"
                      @change="XJ1_time_change"
                      placeholder="选择时间">
                    </el-date-picker>
                  </div>
                </h5>
                <div class="ec_height_Big" id="XJ1">
                </div>
              </el-col>
            </el-row>
            <el-dialog
              :title='XJ1_listName'
              :visible.sync="dialogVisible_XJ1"
              width="30%"
              :before-close="handleClose_XJ1">
              <div id="XJ_list">
                <el-table
                  v-loading="loading_list_XJ1"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="listData_XJ1"
                  style="width: 100%">
                  <el-table-column prop="xmmc" align="center" width="200" label="项目名称" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="ryxm" align="center" label="负责人" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="lxrq" align="center" label="立项时间" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="xmfl" align="center" label="项目类别" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="xmzt" align="center" label="项目状态" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="pzjf" align="center"  label="批准经费(万)" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="ptjf" align="center"  label="配套经费(万)" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="wbjf" align="center"  label="外拨经费(万)" class-name="elTableName">
                  </el-table-column>
                </el-table>
              </div>
              <div class="block"  style="width:300px;margin:20px auto">
                <el-pagination
                  @size-change="handleSizeChange_XJ1"
                  @current-change="handleCurrentChange_XJ1"
                  :current-page.sync= pageNum_XJ1
                  :page-size= size_XJ1
                  layout="total, prev, pager, next"
                  :total=total_count_XJ1>
                </el-pagination>
              </div>
              <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close_list_btn_XJ1">确 定</el-button>
      </span>
            </el-dialog>
            <el-row type="flex" justify="space-around">
              <el-col :span="24" class="ec_bg">
                <h5 class="ec_h5">
                  横向项目分析
                  <div class="ec_h5_data">
                    <el-date-picker
                      class="select_width"
                      size="mini"
                      v-model="HX_time"
                      type="year"
                      format="yyyy"
                      @change="HX_time_change"
                      placeholder="选择时间">
                    </el-date-picker>
                  </div>
                </h5>
                <el-table
                  v-loading="loading_list_HX"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="listData_HX"
                  style="width: 100%">
                  <el-table-column prop="xmmc" align="center" width="200" label="项目名称" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="ryxm" align="center" label="负责人" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="lxrq" align="center" label="立项时间" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="xmfl" align="center" label="合作单位" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="xmzt" align="center" label="项目状态" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="pzjf" align="center"  label="批准经费(万)" class-name="elTableName">
                  </el-table-column>
                </el-table>
                <div class="block"  style="width:300px;margin:20px auto">
                  <el-pagination
                    @size-change="handleSizeChange_HX"
                    @current-change="handleCurrentChange_HX"
                    :current-page.sync= pageNum_HX
                    :page-size= size_HX
                    layout="total, prev, pager, next"
                    :total=total_count_HX>
                  </el-pagination>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="科研成果" name="second">
            <!--论文-->
            <el-row type="flex" justify="space-around">
              <el-col :span="12" class="ec_bg">
                <h5 class="ec_h5">
                  论文分析
                  <div class="ec_h5_data">
                    <el-date-picker
                      class="select_width"
                      size="mini"
                      v-model="LW_time"
                      type="year"
                      format="yyyy"
                      @change="LW_time_change"
                      placeholder="选择时间">
                    </el-date-picker>

                    <el-select v-model="LW_Select"  class="select_width" size="mini" @change="LW_Select_Change">
                      <el-option
                        v-for="item in LW_List"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </div>
                </h5>
                <div class="ec_height_Big" id="LW">
                </div>
              </el-col>
              <el-col :span="12" class="ec_bg">
                <h5 class="ec_h5">
                  论文等级分析
                  <div class="ec_h5_data">
                    <el-date-picker
                      class="select_width"
                      size="mini"
                      v-model="LWDJ_time"
                      type="year"
                      format="yyyy"
                      @change="LWDJ_time_change"
                      placeholder="选择时间">
                    </el-date-picker>
                  </div>
                </h5>
                <div class="ec_height_Big" id="LW_1">
                </div>
              </el-col>
            </el-row>
            <el-dialog
              :title='lw_title'
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              <div id="policy">
                <el-table
                  v-loading="loading_list"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="listData"
                  style="width: 100%">
                  <el-table-column prop="name" align="center" label="论文名称" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="made" align="center" label="作者名称" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="fbkw" align="center" label="发表的刊物" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="fxfw" align="center" label="发行范围" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="time" align="center" label="发表时间" class-name="elTableName">
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
              <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close_list_btn">确 定</el-button>
      </span>
            </el-dialog>
            <!--著作-->
            <el-row type="flex" justify="space-around">
              <el-col :span="12" class="ec_bg">
                <h5 class="ec_h5">
                  著作分析
                  <div class="ec_h5_data">
                    <el-date-picker
                      class="select_width"
                      size="mini"
                      v-model="ZZ_time"
                      type="year"
                      format="yyyy"
                      @change="ZZ_time_change"
                      placeholder="选择时间">
                    </el-date-picker>

                    <el-select v-model="ZZ_Select"  class="select_width" size="mini" @change="ZZ_Select_Change">
                      <el-option
                        v-for="item in ZZ_List"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </div>
                </h5>
                <div class="ec_height_Big" id="ZZ">
                </div>
              </el-col>
              <el-col :span="12" class="ec_bg">
                <h5 class="ec_h5">
                  著作分类
                  <div class="ec_h5_data">
                    <el-date-picker
                      class="select_width"
                      size="mini"
                      v-model="ZZFL_time"
                      type="year"
                      format="yyyy"
                      @change="ZZFL_time_change"
                      placeholder="选择时间">
                    </el-date-picker>
                  </div>
                </h5>
                <div class="ec_height_Big" id="ZZ_1">
                </div>
              </el-col>
            </el-row>
            <el-dialog
              :title='lw_title1'
              :visible.sync="dialogVisible1"
              width="30%"
              :before-close="handleClose1">
              <div id="policy1">
                <el-table
                  v-loading="loading_list1"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="listData1"
                  style="width: 100%">
                  <el-table-column prop="zzmc" align="center" label="著作名称" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="zzlb" align="center" label="著作分类" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="dyzzxm" align="center" label="作者姓名" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="dyzzbh" align="center" label="作者编号" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="cbdw" align="center" label="出版社" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="sfycww" align="center" label="是否译成外文" class-name="elTableName">
                  </el-table-column>
                  <el-table-column prop="d_ymd" align="center" label="出版日期" class-name="elTableName">
                  </el-table-column>
                </el-table>
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
              <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close_list_btn1">确 定</el-button>
      </span>
            </el-dialog>
            <!--研究报告-->
            <el-row type="flex" justify="space-around">
              <el-col :span="24" class="ec_bg">
                <h5 class="ec_h5">
                  研究报告
                  <div class="ec_h5_data">
                    <el-date-picker
                      class="select_width"
                      size="mini"
                      v-model="BG_time"
                      type="year"
                      format="yyyy"
                      @change="BG_time_change"
                      placeholder="选择时间">
                    </el-date-picker>
                  </div>
                </h5>
                <div class="ec_height" id="BG">
                </div>
              </el-col>
            </el-row>
            <!--专利-->
            <el-row type="flex" justify="space-around">
              <el-col :span="24" class="ec_bg">
                <h5 class="ec_h5">
                  发明专利详情
                </h5>
                <div id="policy2">
                  <el-table
                    v-loading="loading_ZL"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="ZL_list"
                    style="width: 100%;">
                    <el-table-column prop="name" align="center" label="名称" class-name="elTableName">
                    </el-table-column>
                    <el-table-column prop="type" align="center" width="200" label="类型" class-name="elTableName">
                    </el-table-column>
                    <el-table-column prop="made" align="center" width="200" label="作者" class-name="elTableName">
                    </el-table-column>
                    <el-table-column prop="place" align="center" width="300"  label="单位" class-name="elTableName">
                    </el-table-column>
                    <el-table-column prop="time" align="center" width="300" label="时间" class-name="elTableName">
                    </el-table-column>
                  </el-table>
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
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import time from '../../config/timeFormat'
    export default {
      data(){
        return{
          activeName: 'first',
////////////////////tab1/////////////////////////////////////////////////////////////////////////

/*////////////////////纵向////////////////////*/
          ZX:'',
          ZX_time:'',
          ZX_Select:'职称',
          ZX_flag:'1',
          ZX_List:['职称','学位','单位'],
          ZX_name:[],
          ZX_count:[],
          /*纵向柱状图*/
          ZX1:'',
          ZX1_time:'',
          ZX1_name:[],
          ZX1_count:[],
          /*纵向弹出框*/
          ZX1_listName:'123',
          dialogVisible_ZX1: false,
          loading_list_ZX1:true,
          listData_ZX1: [],
          pageNum_ZX1:1,
          size_ZX1:8,
          total_count_ZX1:0,

/*////////////////////校级////////////////////*/
          XJ:'',
          XJ_time:'',
          XJ_Select:'职称',
          XJ_flag:'1',
          XJ_List:['职称','学位','单位'],
          XJ_name:[],
          XJ_count:[],
          /*校级柱状图*/
          XJ1:'',
          XJ1_time:'',
          XJ1_name:[],
          XJ1_count:[],
          /*校级弹出框*/
          XJ1_listName:'',
          dialogVisible_XJ1: false,
          loading_list_XJ1:true,
          listData_XJ1: [],
          pageNum_XJ1:1,
          size_XJ1:8,
          total_count_XJ1:0,

          /*横向项目分析*/
          HX_time:'',
          loading_list_HX:true,
          listData_HX: [],
          pageNum_HX:1,
          size_HX:8,
          total_count_HX:0,
////////////////////tab2/////////////////////////////////////////////////////////////////////////

/*////////////////////论文////////////////////*/
          LW:'',
          LW_time:'',
          LW_Select:'职称',
          LW_flag:'1',
          LW_List:['职称','学位','单位'],
          LW_name:[],
          LW_count:[],
          /*论文等级*/
          LW1:'',
          LWDJ_time:'',
          LWDJ_name:[],
          LWDJ_count:[],
          /*弹出框*/
          lw_title:'',
          dialogVisible: false,
          loading_list:true,
          listData: [],
          pageNum:1,
          size:8,
          total_count:0,

/*////////////////////著作////////////////////*/
          ZZ:'',
          ZZ_time:'',
          ZZ_Select:'职称',
          ZZ_flag:'1',
          ZZ_List:['职称','学位','单位'],
          ZZ_name:[],
          ZZ_count:[],
          /*著作分类*/
          ZZ1:'',
          ZZFL_time:'',
          ZZFL_name:[],
          ZZFL_count:[],
          /*著作弹出框*/
          lw_title1:'',
          dialogVisible1: false,
          loading_list1:true,
          listData1: [],
          pageNum1:1,
          size1:8,
          total_count1:0,

/*////////////////////研究报告////////////////////*/
          BG:'',
          BG_time:'',
          BG_name:[],
          BG_count:[],
          BG_count1:[],

/*////////////////////专利////////////////////*/
          loading_ZL:true,
          ZL_list:[],
          pageNum2:1,
          size2:8,
          total_count2:0,




        }
      },
      methods:{
        handleClick(tab, event) {
          let vm = this
          if(tab.name == 'second'){
            let LW = document.getElementById('LW')
            LW.style.height = '500px'
            setTimeout(function(){
              vm.LW_init_fn(vm.LW_time,vm.LW_flag)
            },10)

            let LW1 = document.getElementById('LW_1')
            LW1.style.height = '500px'
            setTimeout(function(){
              vm.LWDJ_init_fn(vm.LWDJ_time)
            },10)

            let ZZ = document.getElementById('ZZ')
            ZZ.style.height = '500px'
            setTimeout(function(){
              vm.ZZ_init_fn(vm.ZZ_time,vm.ZZ_flag)
            },10)

            let ZZ1 = document.getElementById('ZZ_1')
            ZZ1.style.height = '500px'
            setTimeout(function(){
              vm.ZZFL_init_fn(vm.ZZFL_time)
            },10)

            let BG = document.getElementById('BG')
            BG.style.height = '500px'
            setTimeout(function(){
              vm.BG_init_fn(vm.BG_time)
            },10)
            vm.ZL_init_fn(vm.pageNum2,vm.size2)
          }
        },
        time_init(){
          let vm = this
          let year = time.year -1 + ''
          vm.three_time = year
          vm.LW_time = year
          vm.ZZ_time = year
          vm.LWDJ_time = year
          vm.ZZFL_time = year
          vm.BG_time = year
          vm.HX_time = year
          vm.ZX_time = year
          vm.ZX1_time = year
          vm.XJ_time = year
          vm.XJ1_time = year
        },
////////////////////tab1/////////////////////////////////////////////////////////////////////////
/*////////////////////纵向////////////////////*/
        //纵向饼图
        ZX_fn(){
          let vm = this
          let option = {
            color:['#50fca8','#2196f3','#f53c61'],
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              x : 'center',
              y : 'top',
              data:this.ZX_name
            },
            calculable : true,
            series : [
              {
                name:'类别',
                type:'pie',
                radius : [30, 110],
                roseType : 'radius',
                startAngle:200,
                label: {
                  normal: {
                    show: true,
                    formatter: '{b} : {c}'
                  },
                  emphasis: {
                    show: true
                  }
                },
                data:this.ZX_count
              }
            ]
          };
          this.ZX.setOption(option)
        },
        ZX_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.ZX_time = val
            vm.ZX_init_fn(vm.ZX_time,vm.ZX_flag)
          }
        },
        ZX_Select_Change(val){
          let vm = this
          vm.ZX_Select = val
          if(val == '职称'){
            vm.ZX_flag = '1'
          }else if(val == '学位'){
            vm.ZX_flag = '2'
          }else if(val == '单位'){
            vm.ZX_flag = '3'
          }
          vm.ZX_init_fn(vm.ZX_time,vm.ZX_flag)
        },
        ZX_init_fn(time,flag){
          let vm = this
          vm.$axios.request("post","scientific/crosswiseProject",{year:time,flag:flag},function(data){
            vm.ZX_name = []
            vm.ZX_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.ZX_name.push(data.result[i].name)
              vm.ZX_count.push({name:data.result[i].name,value:data.result[i].count})
            }
            vm.ZX_fn()
          },function(err){
            console.log(err);
          })
        },
        //纵向柱状图
        ZX1_fn(){
          let vm = this
          let option = {
            title: {
              text: '点击柱状图查看项目明细',
              textStyle: {
                fontSize: 14,
                color:'red'
              },
              left:'65%',
              top:'5%'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '10%',
              containLabel: true
            },
            tooltip: {
              show: "true",
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            xAxis: {
              type: 'value',
              axisTick: {
                show: true
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#000',
                }
              },
              splitLine: {
                show: true
              },
            },
            yAxis: [{
              type: 'category',
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#000000',
                }
              },
              data: this.ZX1_name
            }

            ],
            series: [{
              name: '项目数量',
              type: 'bar',
              barWidth:'30',
              itemStyle: {
                normal: {
                  show: true,
                  color: '#0DFFC9',
                  barBorderRadius: 50,
                  borderWidth: 0,
                  borderColor: '#333',
                }
              },
              barGap: '0%',
              barCategoryGap: '50%',
              label: {
                normal: {
                  show: true,
                  position: 'right'
                }
              },
              data: this.ZX1_count
            }]
          };
          this.ZX1.setOption(option)
          this.ZX1.on('click',function(params){
            vm.ZX1_listName = params.name
            vm.dialogVisible_ZX1 = true
            vm.ZX_list(vm.ZX1_time,vm.ZX1_listName,vm.pageNum_ZX1,vm.size_ZX1)
          })
        },
        ZX1_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.ZX1_time = val
            vm.ZX1_init_fn(vm.ZX1_time)
          }
        },
        ZX1_init_fn(time){
          let vm = this
          vm.$axios.request("post","scientific/crosswiseProjectType",{year:time},function(data){
            vm.ZX1_name = []
            vm.ZX1_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.ZX1_name.push(data.result[i].xmjb)
              vm.ZX1_count.push(data.result[i].count)
            }
            vm.ZX1_fn()
          },function(err){
            console.log(err);
          })
        },

        /*纵向弹框*/
        ZX_list(year,level,page,pageSize){
          let vm = this
          vm.loading_list_ZX1 = true
          vm.$axios.request("post","scientific/crosswiseProjectList",{year:year,level:level,page:page,pageSize:pageSize},function(data){
            vm.listData_ZX1 = []
            vm.total_count_ZX1 = parseInt(data.totalCount)
            for(let i = 0;i<data.result.length;i++){
              vm.listData_ZX1.push({
                xmmc:data.result[i].xmmc,
                ryxm:data.result[i].ryxm,
                lxrq:data.result[i].lxrq,
                xmfl:data.result[i].xmfl,
                xmzt:data.result[i].xmzt,
                pzjf:data.result[i].pzjf,
                ptjf:data.result[i].ptjf,
                wbjf:data.result[i].wbjf,
              })
            }
            vm.loading_list_ZX1 = false
          },function(err){
            console.log(err);
          })
        },
        handleClose_ZX1(done) {
          this.pageNum_ZX1 = 1
          this.dialogVisible_ZX1 = false
        },
        close_list_btn_ZX1(){
          this.pageNum_ZX1 = 1
          this.dialogVisible_ZX1 = false
        },
        handleSizeChange_ZX1(val) {
          var vm = this
          vm.pageNum_ZX1 = val
          vm.ZX_list(vm.ZX1_time,vm.ZX1_listName,vm.pageNum_ZX1,vm.size_ZX1)
        },
        handleCurrentChange_ZX1(val) {
          var vm = this
          vm.pageNum_ZX1 = val
          vm.ZX_list(vm.ZX1_time,vm.ZX1_listName,vm.pageNum_ZX1,vm.size_ZX1)
        },
/*////////////////////校级////////////////////*/
        //校级饼图
        XJ_fn(){
          let vm = this
          let option = {
            color:['#50fca8','#2196f3','#f53c61'],
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              x : 'center',
              y : 'top',
              data:this.XJ_name
            },
            toolbox: {
              show : true,
              feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                  show: true,
                  type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
              }
            },
            calculable : true,
            series : [
              {
                name:'类别',
                type:'pie',
                radius : [30, 110],
                roseType : 'radius',
                startAngle:200,
                label: {
                  normal: {
                    show: true,
                    formatter: '{b} : {c}'
                  },
                  emphasis: {
                    show: true
                  }
                },
                data:this.XJ_count
              }
            ]
          };
          this.XJ.setOption(option)

        },
        XJ_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.XJ_time = val
            vm.XJ_init_fn(vm.XJ_time,vm.XJ_flag)
          }
        },
        XJ_Select_Change(val){
          let vm = this
          vm.XJ_Select = val
          if(val == '职称'){
            vm.XJ_flag = '1'
          }else if(val == '学位'){
            vm.XJ_flag = '2'
          }else if(val == '单位'){
            vm.XJ_flag = '3'
          }
          vm.XJ_init_fn(vm.XJ_time,vm.XJ_flag)
        },
        XJ_init_fn(time,flag){
          let vm = this
          vm.$axios.request("post","scientific/schoolProject",{year:time,flag:flag},function(data){
            vm.XJ_name = []
            vm.XJ_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.XJ_name.push(data.result[i].name)
              vm.XJ_count.push({name:data.result[i].name,value:data.result[i].count})
            }
            vm.XJ_fn()
          },function(err){
            console.log(err);
          })
        },
        //校级柱状图
        XJ1_fn(){
          let vm = this
          let option = {
            title: {
              text: '点击柱状图查看项目明细',
              textStyle: {
                fontSize: 14,
                color:'red'
              },
              left:'65%',
              top:'5%'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '10%',
              containLabel: true
            },
            tooltip: {
              show: "true",
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            xAxis: {
              type: 'value',
              axisTick: {
                show: true
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#000',
                }
              },
              splitLine: {
                show: true
              },
            },
            yAxis: [{
              type: 'category',
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#000000',
                }
              },
              data: this.XJ1_name
            }

            ],
            series: [{
              name: '项目数量',
              type: 'bar',
              itemStyle: {
                normal: {
                  show: true,
                  color: '#0DFFC9',
                  barBorderRadius: 50,
                  borderWidth: 0,
                  borderColor: '#333',
                }
              },
              barGap: '0%',
              barCategoryGap: '50%',
              label: {
                normal: {
                  show: true,
                  position: 'right'
                }
              },
              data: this.XJ1_count
            }]
          };
          this.XJ1.setOption(option)
          this.XJ1.on('click',function(params){
            vm.XJ1_listName = params.name
            vm.dialogVisible_XJ1 = true
            vm.XJ_list(vm.XJ1_time,vm.XJ1_listName,vm.pageNum_XJ1,vm.size_XJ1)
          })
        },
        XJ1_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.XJ1_time = val
            vm.XJ1_init_fn(vm.XJ1_time)
          }
        },
        XJ1_init_fn(time){
          let vm = this
          vm.$axios.request("post","scientific/schoolProjectType",{year:time},function(data){
            vm.XJ1_name = []
            vm.XJ1_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.XJ1_name.push(data.result[i].xmfl)
              vm.XJ1_count.push(data.result[i].count)
            }
            vm.XJ1_fn()
          },function(err){
            console.log(err);
          })
        },
        /*校级弹框*/
        XJ_list(year,level,page,pageSize){
          let vm = this
          vm.loading_list_XJ1 = true
          vm.$axios.request("post","scientific/schoolProjectList",{year:year,level:level,page:page,pageSize:pageSize},function(data){
            vm.listData_XJ1 = []
            vm.total_count_XJ1 = parseInt(data.totalCount)
            for(let i = 0;i<data.result.length;i++){
              vm.listData_XJ1.push({
                xmmc:data.result[i].xmmc,
                ryxm:data.result[i].ryxm,
                lxrq:data.result[i].lxrq,
                xmfl:data.result[i].xmfl=='null'?'未知':data.result[i].xmfl,
                xmzt:data.result[i].xmzt,
                pzjf:data.result[i].pzjf,
                ptjf:data.result[i].ptjf,
                wbjf:data.result[i].wbjf,
              })
            }
            vm.loading_list_XJ1 = false
          },function(err){
            console.log(err);
          })
        },
        handleClose_XJ1(done) {
          this.pageNum_XJ1 = 1
          this.dialogVisible_XJ1 = false
        },
        close_list_btn_XJ1(){
          this.pageNum_XJ1 = 1
          this.dialogVisible_XJ1 = false
        },
        handleSizeChange_XJ1(val) {
          var vm = this
          vm.pageNum_XJ1 = val
          vm.XJ_list(vm.XJ1_time,vm.XJ1_listName,vm.pageNum_XJ1,vm.size_XJ1)
        },
        handleCurrentChange_XJ1(val) {
          var vm = this
          vm.pageNum_XJ1 = val
          vm.XJ_list(vm.XJ1_time,vm.XJ1_listName,vm.pageNum_XJ1,vm.size_XJ1)
        },
/*////////////////////横向////////////////////*/
        HX_list(year,page,pageSize){
          let vm = this
          vm.loading_list_HX = true
          vm.$axios.request("post","scientific/lengthwaysProjectList",{year:year,page:page,pageSize:pageSize},function(data){
            vm.listData_HX = []
            vm.total_count_HX = parseInt(data.totalCount)
            for(let i = 0;i<data.result.length;i++){
              vm.listData_HX.push({
                xmmc:data.result[i].htmc,
                ryxm:data.result[i].ryxm,
                lxrq:data.result[i].qdrq,
                xmfl:data.result[i].jfmc,
                xmzt:data.result[i].htzt,
                pzjf:data.result[i].htjf,
              })
            }
            vm.loading_list_HX = false
          },function(err){
            console.log(err);
          })
        },
        HX_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.HX_time = val
            vm.HX_list(vm.HX_time,vm.pageNum_HX,vm.size_HX)
          }
        },
        handleSizeChange_HX(val) {
          var vm = this
          vm.pageNum_HX = val
          vm.HX_list(vm.HX_time,vm.pageNum_HX,vm.size_HX)
        },
        handleCurrentChange_HX(val) {
          var vm = this
          vm.pageNum_HX = val
          vm.HX_list(vm.HX_time,vm.pageNum_HX,vm.size_HX)
        },

////////////////////tab2//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /*论文*/
        LW_fn(){
          let vm = this
          let LW = this.$echarts.init(document.getElementById("LW"), 'customed');
          let option = {
            color:['#50fca8','#2196f3','#f53c61'],
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              x : 'center',
              y : 'top',
              data:this.LW_name
            },
            toolbox: {
              show : true,
              feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                  show: true,
                  type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
              }
            },
            calculable : true,
            series : [
              {
                name:'类别',
                type:'pie',
                radius : [30, 110],
                roseType : 'radius',
                startAngle:200,
                label: {
                  normal: {
                    show: true,
                    formatter: '{b} : {c}'
                  },
                  emphasis: {
                    show: true
                  }
                },
                data:this.LW_count
              }
            ]
          };
          LW.setOption(option)
        },
        LW_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.LW_time = val
            vm.LW_init_fn(vm.LW_time,vm.LW_flag)
          }
        },
        LW_Select_Change(val){
          let vm = this
          vm.LW_Select = val
          if(val == '职称'){
            vm.LW_flag = '1'
          }else if(val == '学位'){
            vm.LW_flag = '2'
          }else if(val == '单位'){
            vm.LW_flag = '3'
          }

          vm.LW_init_fn(vm.LW_time,vm.LW_flag)
        },
        LW_init_fn(time,flag){
          let vm = this
          vm.$axios.request("post","scientific/thesisCount",{year:time,flag:flag},function(data){
            vm.LW_name = []
            vm.LW_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.LW_name.push(data.result[i].name)
              vm.LW_count.push({name:data.result[i].name,value:data.result[i].count})
            }
            vm.LW_fn()
          },function(err){
            console.log(err);
          })
        },

        /*论文等级*/
        LW1_fn(){
          let vm = this
          let LW1 = this.$echarts.init(document.getElementById("LW_1"), 'customed');
          let option = {
            title: {
              text: '点击柱状图查看论文明细',
              textStyle: {
                fontSize: 14,
                color:'red'
              },
              left:'65%',
              top:'5%'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '10%',
              containLabel: true
            },
            tooltip: {
              show: "true",
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            xAxis: {
              type: 'value',
              axisTick: {
                show: true
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#000',
                }
              },
              splitLine: {
                show: true
              },
            },
            yAxis: [{
              type: 'category',
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#000000',
                }
              },
              data: this.LWDJ_name
            }

            ],
            series: [{
              name: '论文等级',
              type: 'bar',
              itemStyle: {
                normal: {
                  show: true,
                  color: '#0DFFC9',
                  barBorderRadius: 50,
                  borderWidth: 0,
                  borderColor: '#333',
                }
              },
              barGap: '0%',
              barCategoryGap: '50%',
              label: {
                normal: {
                  show: true,
                  position: 'right'
                }
              },
              data: this.LWDJ_count
            }]
          };
          LW1.setOption(option)
          LW1.on('click',function(params){
            vm.lw_title = params.name
            vm.loading_list = true
            vm.dialogVisible = true
            vm.LW_list(vm.LWDJ_time,vm.lw_title,vm.pageNum,vm.size)
          })
        },
        LWDJ_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.LWDJ_time = val
            vm.LWDJ_init_fn(vm.LWDJ_time)
          }
        },
        LWDJ_init_fn(time){
          let vm = this
          vm.$axios.request("post","scientific/thesisLevelCount",{year:time},function(data){
            vm.LWDJ_name = []
            vm.LWDJ_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.LWDJ_name.push(data.result[i].kwjb)
              vm.LWDJ_count.push(data.result[i].count)
            }
            vm.LW1_fn()
          },function(err){
            console.log(err);
          })
        },
        //论文详情列表
        LW_list(year,level,page,pageSize){
          let vm = this
          vm.$axios.request("post","scientific/thesisList",{year:year,level:level,page:page,pageSize:pageSize},function(data){
            vm.listData = []
            vm.total_count = parseInt(data.totalCount)
            for(let i = 0;i<data.result.length;i++){
              vm.listData.push({
                name:data.result[i].lwmc,
                made:data.result[i].dyzzxm,
                fbkw:data.result[i].lwjmc,
                fxfw:data.result[i].fbfw,
                time:data.result[i].d_ymd,
              })
            }
            vm.loading_list = false
          },function(err){
            console.log(err);
          })
        },
        //关闭列表X
        handleClose(done) {
          this.dialogVisible = false
          this.listData = []
        },
        //关闭列表(确定)
        close_list_btn(){
          this.dialogVisible = false
          this.listData = []
        },
        handleSizeChange(val) {
          var vm = this
          vm.loading_list = true
          vm.pageNum = val
          vm.LW_list(vm.LWDJ_time,vm.lw_title,vm.pageNum,vm.size)
        },
        handleCurrentChange(val) {
          var vm = this
          vm.loading_list = true
          vm.pageNum = val
          vm.LW_list(vm.LWDJ_time,vm.lw_title,vm.pageNum,vm.size)
        },

        /*著作*/
        ZZ_fn(){
          let vm = this
          let ZZ = this.$echarts.init(document.getElementById("ZZ"), 'customed');
          let option = {
            color:['#50fca8','#1BD6F3','#11A9F5'],
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              x : 'center',
              y : 'top',
              data:this.ZZ_name
            },
            toolbox: {
              show : true,
              feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                  show: true,
                  type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
              }
            },
            calculable : true,
            series : [
              {
                name:'类别',
                type:'pie',
                radius : [30, 110],
                startAngle:200,
                roseType : 'radius',label: {
                normal: {
                  show: true,
                  formatter: '{b} : {c}'
                },
                emphasis: {
                  show: true
                }
              },

                data:this.ZZ_count
              }
            ]
          };
          ZZ.setOption(option)
        },
        ZZ_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.ZZ_time = val
            vm.ZZ_init_fn(vm.ZZ_time,vm.ZZ_flag)
          }
        },
        ZZ_Select_Change(val){
          let vm = this
          vm.ZZ_Select = val
          if(val == '职称'){
            vm.ZZ_flag = '1'
          }else if(val == '学位'){
            vm.ZZ_flag = '2'
          }else if(val == '单位'){
            vm.ZZ_flag = '3'
          }
          vm.ZZ_init_fn(vm.ZZ_time,vm.ZZ_flag)
        },
        ZZ_init_fn(time,flag){
          let vm = this
          vm.$axios.request("post","scientific/titleCount",{year:time,flag:flag},function(data){
            vm.ZZ_name = []
            vm.ZZ_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.ZZ_name.push(data.result[i].name)
              vm.ZZ_count.push({name:data.result[i].name,value:data.result[i].count})
            }
            vm.ZZ_fn()
          },function(err){
            console.log(err);
          })
        },

        /*著作分类*/
        ZZ1_fn(){
          let vm = this
          let ZZ1 = this.$echarts.init(document.getElementById("ZZ_1"), 'customed');
          let option = {
            title: {
              text: '点击柱状图查看著作明细',
              textStyle: {
                fontSize: 14,
                color:'red'
              },
              left:'65%',
              top:'5%'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '10%',
              containLabel: true
            },

            tooltip: {
              show: "true",
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            xAxis: {
              type: 'value',
              axisTick: {
                show: true
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#000',
                }
              },
              splitLine: {
                show: true
              },
            },
            yAxis: [{
              type: 'category',
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#000000',
                }
              },

              data: this.ZZFL_name
            }

            ],
            series: [{
              name: '著作分类',
              type: 'bar',
              itemStyle: {
                normal: {
                  show: true,
                  color: '#11D4FF',
                  barBorderRadius: 50,
                  borderWidth: 0,
                  borderColor: '#333',
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'right'
                }
              },
              barGap: '0%',
              barCategoryGap: '50%',
              data: this.ZZFL_count
            }]
          };
          ZZ1.setOption(option)
          /*著作细节分类*/
          ZZ1.on('click',function(params){
            vm.lw_title1 = params.name
            vm.loading_list1 = true
            vm.dialogVisible1 = true
            vm.ZZ_list(vm.ZZFL_time,vm.lw_title1,vm.pageNum1,vm.size1)
          })
        },
        ZZFL_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.ZZFL_time = val
            vm.ZZFL_init_fn(vm.ZZFL_time)
          }
        },
        ZZFL_init_fn(time){
          let vm = this
          vm.$axios.request("post","scientific/monographClassify",{year:time},function(data){
            vm.ZZFL_name = []
            vm.ZZFL_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.ZZFL_name.push(data.result[i].classify)
              vm.ZZFL_count.push(data.result[i].count)
            }
            vm.ZZ1_fn()
          },function(err){
            console.log(err);
          })
        },
        //论文详情列表
        ZZ_list(year,level,page,pageSize){
          let vm = this
          vm.$axios.request("post","scientific/monographList",{year:year,level:level,page:page,pageSize:pageSize},function(data){
            vm.listData1 = []
            vm.total_count1 = parseInt(data.totalCount)
            for(let i = 0;i<data.result.length;i++){
              vm.listData1.push({
                zzmc:data.result[i].zzmc,
                zzlb:data.result[i].zzlb,
                dyzzxm:data.result[i].dyzzxm,
                dyzzbh:data.result[i].dyzzbh,
                cbdw:data.result[i].cbdw,
                sfycww:data.result[i].sfycww,
                d_ymd:data.result[i].d_ymd,
              })
            }
            vm.loading_list1 = false
          },function(err){
            console.log(err);
          })
        },
        //关闭列表X
        handleClose1(done) {
          this.dialogVisible1 = false
          this.listData1 = []
        },
        //关闭列表(确定)
        close_list_btn1(){
          this.dialogVisible1 = false
          this.listData1 = []
        },
        handleSizeChange1(val) {
          var vm = this
          vm.loading_list1 = true
          vm.pageNum1 = val
          vm.ZZ_list(vm.ZZFL_time,vm.lw_title1,vm.pageNum1,vm.size1)
        },
        handleCurrentChange1(val) {
          var vm = this
          vm.loading_list1 = true
          vm.pageNum1 = val
          vm.ZZ_list(vm.ZZFL_time,vm.lw_title1,vm.pageNum1,vm.size1)
        },

        /*研究报告*/
        BG_fn(){
          let vm = this
          let BG = this.$echarts.init(document.getElementById("BG"), 'customed');
          let option = {
            legend: {
              x : 'center',
              y : 'top',
              data:['采纳','未采纳']
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
                data : this.BG_name,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'采纳',
                type:'bar',
                data:this.BG_count
              },
              {
                name:'未采纳',
                type:'bar',
                data:this.BG_count1
              }
            ]
          };
          BG.setOption(option)
        },
        BG_time_change(val){
          let vm = this
          if(val == undefined){
            return
          }else{
            vm.BG_time = val
            vm.BG_init_fn(vm.BG_time)
          }
        },
        BG_init_fn(time){
          let vm = this
          vm.$axios.request("post","scientific/reportLevel",{year:time,flag:'是'},function(data){
            vm.BG_name = []
            vm.BG_count = []
            for(let i = 0;i<data.result.length;i++){
              vm.BG_name.push(data.result[i].cndx)
              vm.BG_count.push(data.result[i].count)
            }
            vm.BG_fn()
          },function(err){
            console.log(err);
          })
          vm.$axios.request("post","scientific/reportLevel",{year:time,flag:'否'},function(data){
            vm.BG_count1 = []
            for(let i = 0;i<data.result.length;i++){
              vm.BG_count1.push(data.result[i].count)
            }
            vm.BG_fn()
          },function(err){
            console.log(err);
          })
        },

        /*专利*/
        ZL_init_fn(page,pageSize){
          let vm = this
          vm.$axios.request("post","scientific/patentClassify",{page:page,pageSize:pageSize},function(data){
            vm.ZL_list = []
            vm.total_count2 = parseInt(data.totalCount)
            for(let i = 0;i<data.result.length;i++){
              vm.ZL_list.push({
                name:data.result[i].zlmc,
                type:data.result[i].zllx,
                made:data.result[i].dyzzxm,
                place:data.result[i].gzdw,
                time:data.result[i].sqrq,
              })
            }
            vm.loading_ZL = false
          },function(err){
            console.log(err);
          })
        },
        handleSizeChange2(val) {
          var vm = this
          vm.pageNum2 = val
          vm.loading_ZL = true
          vm.ZL_init_fn(vm.pageNum2,vm.size2)
        },
        handleCurrentChange2(val) {
          var vm = this
          vm.pageNum2 = val
          vm.loading_ZL = true
          vm.ZL_init_fn(vm.pageNum2,vm.size2)
        },

      },
      mounted(){
        this.$echarts.registerTheme('customed', this.$store.state.echartsData);
        this.ZX = this.$echarts.init(document.getElementById("ZX"), 'customed');
        this.ZX1 = this.$echarts.init(document.getElementById("ZX1"), 'customed');
        this.XJ = this.$echarts.init(document.getElementById("XJ"), 'customed');
        this.XJ1 = this.$echarts.init(document.getElementById("XJ1"), 'customed');
      },
      created(){
        window.scrollTo(0,0);
        let vm = this
        vm.time_init()
        vm.ZX_init_fn(vm.ZX_time,vm.ZX_flag)
        vm.ZX1_init_fn(vm.ZX1_time)
        vm.XJ_init_fn(vm.XJ_time,vm.XJ_flag)
        vm.XJ1_init_fn(vm.XJ1_time)
        vm.HX_list(vm.HX_time,vm.pageNum_HX,vm.size_HX)
      }
    }
</script>

<style>
    .ec_height_Big{
      height: 500px;
    }

</style>
