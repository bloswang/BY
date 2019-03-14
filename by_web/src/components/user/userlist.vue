<template>
  <div class="by_body w">

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户列表" name="first" class="ec_bg">
        <el-row class="by_body_input">
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              <el-input v-model="seek" placeholder="请输入要查询的姓名" icon="search" :on-icon-click="iconClick"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row class="by_body_table_div">
          <el-col :span="24">
            <div class="table_yh">
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
                  <el-table-column prop="name" label="姓名" align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column prop="sex" width="80" label="性别" align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column prop="number"  label="职工号" :show-overflow-tooltip=true align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column prop="pj" label="评级" align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column prop="zw" label="职位" align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column prop="school" label="所属学院" align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column prop="job_status" label="在职状态" align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column label="操作" width="100"  class-name="by_body_row" label-class-name="by_body_label">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="handleEdit(scope.row)">修改</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog
                  title="权限修改"
                  :visible.sync="centerDialogVisible"
                  width="20%"
                  center>
                  <p class="log_style">姓名:&nbsp;&nbsp;{{teacher_name}}</p>
                  <p class="log_style">学院:&nbsp;&nbsp;{{teacher_school}}</p>
                  <p class="log_style">
                    <!--<el-checkbox-group v-model="checkList" >
                      <el-checkbox v-for="list in show_list" :label="list.name" :key="list.name">{{list.name}}</el-checkbox>
                    </el-checkbox-group>-->
                    <el-tree
                      class="log_style"
                      :data="data2"
                      show-checkbox
                      node-key="mid"
                      ref="tree"
                      :props="defaultProps"
                      >
                    </el-tree>
                    <!--check-strictly-->
                    <!--<el-button @click="getCheckedKeys">通过 key 获取</el-button>
                    <el-button @click="getCheckedNodes">通过 node 获取</el-button>-->
                  </p>
                  <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
              </span>
                </el-dialog>
              </template>
            </div>
            <div class="block" style="width:300px;margin:50px auto">
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

      </el-tab-pane>
      <el-tab-pane label="菜单列表" name="second" class="ec_bg">
        <el-row class="by_body_input">
          <el-col :span="6">
            <div class="grid-content bg-purple-dark">
              <el-input v-model="menuName" placeholder="请输入要查询的菜单" icon="search" :on-icon-click="iconClick1"></el-input>
            </div>
          </el-col>
          <el-col :span="6" :offset="1">
            <div class="grid-content ">
              <el-button @click="add_menu">新增</el-button>
              <el-dialog title="新增菜单" :visible.sync="dialogVisible" size="small" :before-close="handleClose" custom-class="by_body_add">
                <el-form :model="ruleForm"  ref="ruleForm" label-width="120px" class="demo-ruleForm">
                  <el-form-item label="菜单名称" prop="name">
                    <el-input v-model="ruleForm.name" style="width: 300px"></el-input>
                  </el-form-item>
                  <el-form-item label="菜单URL" prop="url">
                    <el-input v-model="ruleForm.url" style="width: 300px"></el-input>
                  </el-form-item>
                  <el-form-item label="父级菜单" prop="P_name">
                    <!--<el-input v-model="ruleForm.P_name" style="width: 300px"></el-input>-->
                    <el-select v-model="ruleForm.P_name" placeholder="请选择" size="small" @change="parentChange">
                      <el-option
                        v-for="item in Pname_List"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="是否可用" prop="isUse">
                    <el-radio-group v-model="ruleForm.isUse">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item class="form_bottom">
                    <el-button type="primary" @click="submitForm(ruleForm)">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')" style="margin-left: 20px">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </div>
          </el-col>
        </el-row>
        <el-row class="by_body_table_div">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark" style="height: 400px;">
              <template>
                <el-table
                  v-loading="loading1"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :data="menuData"
                  style="width: 100%"
                  class="by_body_table"
                  :border=false>
                  <el-table-column prop="level"  label="菜单等级" :show-overflow-tooltip=true align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column prop="P_menuId"  label="父级ID" :show-overflow-tooltip=true align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column prop="menuId"  label="菜单ID" align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column prop="p_menuName" label="父级菜单名称" align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column prop="menuName" label="菜单名称" align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column prop="url" label="URL路径" align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column prop="isMake" label="是否可用" align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column prop="number" label="排序序号" align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column prop="has_child" label="是否有子菜单" align="center" class-name="by_body_row" label-class-name="by_body_label">
                  </el-table-column>
                  <el-table-column label="操作" width="100"  align="center" class-name="by_body_row" label-class-name="by_body_label">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="handleEdit1(scope.row)">修改</el-button>
                      <el-button type="text" style="color: red" size="small" @click="handleEdit2(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <el-dialog title="修改菜单" :visible.sync="upDateDialog" size="small" :before-close="upDateClose" custom-class="by_body_add">
                <el-form :model="ruleForm1"  ref="ruleForm" label-width="120px" class="demo-ruleForm">
                  <el-form-item label="菜单ID" prop="menuId">
                    <el-input v-model="ruleForm1.menuId " :disabled="true" style="width: 300px"></el-input>
                  </el-form-item>
                  <el-form-item label="菜单名称" prop="mname">
                    <el-input v-model="ruleForm1.mname" style="width: 300px"></el-input>
                  </el-form-item>
                  <el-form-item label="菜单URL" prop="url">
                    <el-input v-model="ruleForm1.url" style="width: 300px"></el-input>
                  </el-form-item>
                  <el-form-item label="菜单序号" prop="url">
                    <el-input v-model="ruleForm1.number" style="width: 300px"></el-input>
                  </el-form-item>
                  <el-form-item label="是否可用" prop="isUse">
                    <el-radio-group v-model="ruleForm1.isUse">
                      <el-radio label="是"></el-radio>
                      <el-radio label="否"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item class="form_bottom">
                    <el-button type="primary" @click="updatYeas(ruleForm1)">确定</el-button>
                    <el-button @click="updateNo(ruleForm1)" style="margin-left: 20px">取消</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </div>
            <div class="block"  style="width:300px;margin:50px auto">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList:['1','2','3'],
      Pname_List:[],
      Pname_List1:[],
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'mname'
      },
      activeName: 'first',
      ruleForm: {
        name:'',
        menu: '',
        P_name: '',
        leaf: '',
        limits: [],
        isUse: '',
        url: '',
        account:'',
        password:'',
      },
      ruleForm1: {},
      seek: "",
      dialogVisible: false,
      loading:true,
      tableData: [],
      pageNum:1,
      size:8,
      total_count:0,
      centerDialogVisible:false,
      teacher_name:'',
      teacher_school:'',
      checkList:[],
      show_list:[
        {name:'用户管理',value:'f1'},
        {name:'招生洞察',value:'f2'},
        {name:'北语校情',value:'f3'},
        {name:'一卡通大数据',value:'f4'},
        {name:'上网行为',value:'f5'},
        {name:'星光北语',value:'f6'},
        {name:'校园舆情',value:'f7'},
      ],
      teacher_id :'',
      ok:'',
      menuName:'',
      loading1:true,
      menuData: [],
      pageNum1:1,
      size1:8,
      total_count1:0,

      upDateDialog:false
    }
  },
  methods: {

    handleClick(tab, event) {
      //console.log(tab, event);
    },
    getCheckedKeys() {
      let vm  = this
      vm.centerDialogVisible = false
      let list = this.$refs.tree.getCheckedKeys()
      vm.checkList = []
      vm.ok = ''
      for(let i = 0;i<list.length;i++){
        vm.ok += list[i] +','
      }
      vm.$axios.request("post","user/alterJurisdiction", {uid:vm.teacher_id,mid:vm.ok},function(data){
        vm.$notify({
          title: '成功',
          message: '权限修改成功',
          type: 'success'
        });
      },function(err){
        console.log(err);
      })
    },
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },

    majorChange(val){
      console.log(val)
    },
    parentChange(val){
      console.log(val)
    },
    //获取菜单列表
    made_list(page,size,name){
      let vm = this
      vm.$axios.request("post","user/menuList", {page:page,pageSize:size,name:name},function(data){
        vm.total_count1 = parseInt(data.totalCount)
        vm.menuData = []
        let isMake = ''
        let has_child = ''

        for(let i=0;i<data.result.length;i++){
          if(data.result[i].available == '1'){
            isMake = '是'
          }else{
            isMake = '否'
          }
          if(data.result[i].leaf == '1'){
            has_child = '是'
          }else{
            has_child = '否'
          }
          vm.menuData.push({
            level:data.result[i].level == null ? '':data.result[i].level,
            menuId:data.result[i].mid == null ? '':data.result[i].mid,
            P_menuId:data.result[i].pid == null ? '':data.result[i].pid,
            menuName:data.result[i].mname == null ? '':data.result[i].mname,
            p_menuName:data.result[i].pname == null ? '':data.result[i].pname,
            url:data.result[i].url == null ? '':data.result[i].url,
            isMake:data.result[i].available == null ? '':isMake,
            number:data.result[i].sort == null ? '':data.result[i].sort,
            has_child:data.result[i].leaf == null ? '':has_child,
          })
        }
        vm.$nextTick(function() {
          vm.loading1 = false
        })
      },function(err){
        console.log(err);
      })
    },
    handleSizeChange1(val) {
      var vm = this
      vm.loading1 = true
      vm.pageNum1 = val
      vm.made_list(vm.pageNum1,vm.size1,vm.menuName)
    },
    handleCurrentChange1(val) {
      var vm = this
      vm.loading1 = true
      vm.pageNum1 = val
      vm.made_list(vm.pageNum1,vm.size1,vm.menuName)
    },
    iconClick1() {
      let vm = this
      vm.pageNum1 = 1
      vm.made_list(vm.pageNum1,vm.size1,vm.menuName)
    },
    //点击修改按钮，并且将这一行所有的信息，传递到dilog里边，进行操作。
    handleEdit1(row){
      let vm = this
      vm.ruleForm1 = {
        menuId:row.menuId,
        mname:row.menuName,
        url:row.url,
        number:row.number,
        isUse:row.isMake
      }
      vm.upDateDialog = true
    },
    //点击按钮删除这一行的信息
    handleEdit2(row){
      let vm = this
      vm.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(row.has_child == '是'){
          vm.$message.error('删除失败,此菜单含有子菜单');
        }else{
          vm.$axios.request("post","user/deleteMenu", {mid:row.menuId},function(data){
            if(data.status == '1'){
              vm.$message({
                message: '删除成功',
                type: 'success'
              });
              vm.made_list(vm.pageNum1,vm.size1,vm.menuName)
            }else{
              vm.$message.error('删除失败');
            }
          },function(err){
            console.log(err);
          })
        }

      }).catch(() => {
        vm.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //关闭dilog
    upDateClose(){
      this.upDateDialog = false
    },

    //点击确认按钮修改dialog里边的信息，并且通过接口吧数据传递给后台，更改数据库
    updatYeas(ruleForm1){
      let vm = this
      let flag = ''
      if(ruleForm1.isUse == '是'){
        flag = '1'
      }else if(ruleForm1.isUse == '否'){
        flag = '0'
      }
      vm.$axios.request("post","user/updateMenu", {
        mid:ruleForm1.menuId,
        mname:ruleForm1.mname,
        url:ruleForm1.url,
        sort:ruleForm1.number,
        available:flag,
      },function(data){
        if(ruleForm1.mid !=='' && ruleForm1.mname!==''&&ruleForm1.url!==''&&ruleForm1.isUse!==''&&ruleForm1.number!==''){
          if(data.status == '1'){
            vm.$message({
              message: '修改成功',
              type: 'success'
            });
            vm.upDateDialog = false
            vm.ruleForm1 = {}
            vm.made_list(vm.pageNum1,vm.size1,vm.menuName)
          }else{
            vm.$message.error('修改失败');
          }
        }else{
          vm.$message.error('输入内容不能为空');
        }
      },function(err){
        console.log(err);
      })
    },
    updateNo(ruleForm1){
      let vm = this
      vm.upDateDialog = false
      vm.ruleForm1 = {}
    },
    parentChange1(val){
      console.log(val)
    },
    //table教师页点击修改的函数，获取到教师名称，教师学院，和教师职工号
    handleEdit(row){
      let vm = this
      vm.teacher_name = row.name
      vm.teacher_school = row.school
      vm.teacher_id = row.number
      vm.centerDialogVisible = true
      vm.$axios.request("post","user/menuTree", {uid:vm.teacher_id},function(data){
        vm.checkList = []
        vm.data2 = []
        vm.data2 = data.result
        for(let i=0;i<data.have.length;i++){
          if(data.have[i]!=='f2'&&data.have[i]!=='f3'&&data.have[i]!=='f4'&&data.have[i]!=='f5')
          vm.checkList.push(data.have[i])
        }
        vm.$refs.tree.setCheckedKeys(vm.checkList,true)
        console.log(vm.checkList)
      },function(err){
        console.log(err);
      })
    },
    //打开dialog以后。获取到用户选择的权限。添加到一个列表
    ok_list(checkList){
      let vm  = this
      vm.centerDialogVisible = false
      vm.checkList = []
      vm.ok = ''
      for(let i=0;i<vm.show_list.length;i++){
        for(let j=0;j<checkList.length;j++){
          if(checkList[j]==vm.show_list[i].name){
            vm.ok += vm.show_list[i].value + ','
          }
        }

      }
      vm.$axios.request("post","user/alterJurisdiction", {uid:vm.teacher_id,mid:vm.ok},function(data){
        vm.$notify({
          title: '成功',
          message: '权限修改成功',
          type: 'success'
        });
      },function(err){
        console.log(err);
      })

    },
    //取消修改权限
    close(){
      this.centerDialogVisible = false
      this.checkList = []
    },
    //搜索查询按钮
    iconClick() {
      let vm = this
      vm.pageNum = 1
      vm.teacher_list_fn(vm.pageNum,vm.size,vm.seek)
    },

    add_menu(){
      let vm = this
      vm.dialogVisible = true
      vm.$axios.request("post","user/allMenu", {},function(data){
        for(let i = 0;i<data.result.length;i++){
          vm.Pname_List.push({
            name:data.result[i].mname,
            id:data.result[i].mid
          })
          vm.Pname_List1.push({
            name:data.result[i].mname,
            id:data.result[i].mid
          })
        }
      },function(err){
        console.log(err);
      })
    },
    submitForm(formName) {
      let vm = this
      let flag = ''
      if(formName.isUse == '是'){
        flag = '1'
      }else if(formName.isUse == '否'){
        flag = '0'
      }
      vm.$axios.request("post","user/addMenu", {
        pid:formName.P_name,
        mname:formName.name,
        url:formName.url,
        available:flag,
      },function(data){
        if(formName.P_name !=='' && formName.name!==''&&formName.url!==''&&formName.isUse!==''){
          if(data.status == '1'){
            vm.$message({
              message: '添加成功',
              type: 'success'
            });
            vm.made_list(vm.pageNum1,vm.size1,vm.menuName)
            vm.dialogVisible = false
            vm.ruleForm = {}
          }else{
            vm.$message.error('添加失败');
          }
        }else{
          vm.$message.error('输入内容不能为空');
        }

      },function(err){
        console.log(err);
      })
    },
    resetForm(formName) {
      let vm = this
      vm.ruleForm = {}
      this.$refs[formName].resetFields();
    },
    /*handleClick(index, row) {
      console.log(row, index);
    },*/

    handleClose(done) {
      let vm = this
      this.$confirm('确认关闭？')
        .then(_ => {
          vm.ruleForm = {}
          done();
        })
        .catch(_ => {});
    },
    teacher_list_fn(page,size,name){
      let vm = this
      vm.$axios.request("post","user/userList", {page:page,pageSize:size,name:name},function(data){
        vm.total_count = parseInt(data.totalCount)
        vm.tableData = []
        for(let i = 0;i<data.result.length;i++){
          vm.tableData.push({
            name:data.result[i].xm,
            sex:data.result[i].sex,
            pj:data.result[i].job ==null?'-':data.result[i].job,
            zw:data.result[i].dzzw==null?'-':data.result[i].dzzw,
            school:data.result[i].xy,
            job_status:data.result[i].zt,
            number:data.result[i].zgh,
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
      vm.teacher_list_fn(vm.pageNum,vm.size,vm.seek)
    },
    handleCurrentChange(val) {
      var vm = this
      vm.loading = true
      vm.pageNum = val
      vm.teacher_list_fn(vm.pageNum,vm.size,vm.seek)
    },
  },
  created(){
    let vm = this
    vm.teacher_list_fn(vm.pageNum,vm.size,vm.seek)
    vm.made_list(vm.pageNum1,vm.size1,vm.menuName)

  }
}



</script>
<style lang="scss" scoped>
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

.el-tree{
  background-color:#1f2024 ;
  border: 1px solid #1f2024;
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
.by_body_input {
  line-height: 100px;
  .el-input__inner {
    color: #fff;
  }
  .el-button {
    background-color: rgba(31,38,36,.5);
    color: #fff;
    margin-left: -20px;
  }
}

.delete {
  color: #fa346c;
}


.delete {
  color: #fa346c;
}

.by_body_table_div {
  margin-bottom: 30px;
}

.log_style{
  color: white;
  margin: 10px;
}

  .table_yh{
    margin-bottom: 50px;
  }

</style>
