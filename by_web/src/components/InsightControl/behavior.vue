<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/control' }">一卡通大数据</el-breadcrumb-item>
      <el-breadcrumb-item>疑似孤僻人群分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          疑似孤僻人群分析列表&nbsp;&nbsp;({{GP_Select}})
          <el-select v-model="GP_Select"
                     placeholder="请选择"
                     size="mini"
                     class="major-select"
                     @change="countryChange">
            <el-option
              v-for="item in GP_List"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </h5>

      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" style="margin-top: -10px">
      <el-col :span="24" class="ec_bg">
        <div  id="policy">
          <el-table :data="listData_GP"
                    v-loading="loading_GP"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    style = 'width:98%'>
            <el-table-column prop="name" align="center" label="姓名" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="sex" align="center" label="性别" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="age" align="center" label="年龄" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="city" align="center" :label="place_GP" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="mejor" align="center" label="专业" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="school" align="center" label="学院" class-name="elTableName">
            </el-table-column>
          </el-table>
        </div>
        <div class="block"  style="width:300px;margin:20px auto">
          <el-pagination
            @size-change="handleSizeChange_GP"
            @current-change="handleCurrentChange_GP"
            :current-page.sync= pageNum_GP
            :page-size= size_GP
            layout="total, prev, pager, next"
            :total=total_count_GP>
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        loading_GP:true,
        listData_GP: [],
        pageNum_GP:1,
        size_GP:10,
        total_count_GP:0,
        GP_Select:'本科生',
        code_GP:'2',
        GP_List:['本科生','国际生'],
        place_GP:'地区'
      }
    },
    methods:{
      handleSizeChange_GP(val) {
        vm.loading_GP = true
        var vm = this
        vm.pageNum_GP = val
        console.log(val)
        vm.$axios.request("post", "health/mentalHealth", {flag:vm.code_GP,page:vm.pageNum_GP,pageSize:'10'}, function(data) {
          vm.total_count_GP = data.totalCount
          vm.listData_GP =[]
          for(let i = 0;i<data.result.length;i++){
            let sex = ''
            let mejor = ''
            if(data.result[i].sex!== '男'&& data.result[i].sex!=='女'){
              sex = '未知'
            }else{
              sex = data.result[i].sex
            }
            if(data.result[i].a_zszyzw =='null'){
              mejor = '未知'
            }else{
              mejor = data.result[i].a_zszyzw
            }
            vm.listData_GP.push({
              name:data.result[i].name,
              sex: sex,
              age:data.result[i].age,
              school: data.result[i].a_zxxxdw,
              mejor: mejor,
              city: data.result[i].a_gj})
          }
          vm.$nextTick(function() {
            vm.loading_GP = false
          })
        }, function(err) {
          console.log(err);
        })
      },
      handleCurrentChange_GP(val) {
        var vm = this
        vm.loading_GP = true
        vm.pageNum_GP = val
        vm.$axios.request("post", "health/mentalHealth", {flag:vm.code_GP,page:vm.pageNum_GP,pageSize:'10'}, function(data) {
          vm.total_count_GP = data.totalCount
          vm.listData_GP =[]
          for(let i = 0;i<data.result.length;i++){
            let sex = ''
            let mejor = ''
            if(data.result[i].sex!== '男'&& data.result[i].sex!=='女'){
              sex = '未知'
            }else{
              sex = data.result[i].sex
            }
            if(data.result[i].a_zszyzw =='null'){
              mejor = '未知'
            }else{
              mejor = data.result[i].a_zszyzw
            }
            vm.listData_GP.push({
              name:data.result[i].name,
              sex: sex,
              age:data.result[i].age,
              school: data.result[i].a_zxxxdw,
              mejor: mejor,
              city: data.result[i].a_gj})
          }
          vm.$nextTick(function() {
            vm.loading_GP = false
          })
        }, function(err) {
          console.log(err);
        })
      },
      countryChange(val){
        let vm = this
        vm.loading_GP = true
        vm.pageNum_GP = 1
        vm.GP_Select = val
        if(val =='本科生'){
          vm.place_GP = '地区'
          vm.code_GP = '2'
        }else{
          vm.place_GP = '国家'
          vm.code_GP = '1'
        }
        vm.$axios.request("post", "health/mentalHealth", {flag:vm.code_GP,page:vm.pageNum_GP,pageSize:'10'}, function(data) {
          vm.total_count_GP = data.totalCount
          vm.listData_GP =[]
          console.log(data)
          for(let i = 0;i<data.result.length;i++){
            let sex = ''
            let mejor = ''
            if(data.result[i].sex!== '男'&& data.result[i].sex!=='女'){
              sex = '未知'
            }else{
              sex = data.result[i].sex
            }
            if(data.result[i].a_zszyzw =='null'){
              mejor = '未知'
            }else{
              mejor = data.result[i].a_zszyzw
            }
            vm.listData_GP.push({
              name:data.result[i].name,
              sex: sex,
              age:data.result[i].age,
              school: data.result[i].a_zxxxdw,
              mejor: mejor,
              city: data.result[i].a_gj})
          }
          vm.$nextTick(function() {
            vm.loading_GP = false
          })
        }, function(err) {
          console.log(err);
        })
      }

    },
    created(){
      let vm = this
      vm.$axios.request("post", "health/mentalHealth", {flag:vm.code_GP,page:vm.pageNum_GP,pageSize:'10'}, function(data) {
        vm.total_count_GP = data.totalCount
        console.log(data)
        for(let i = 0;i<data.result.length;i++){
          let sex = ''
          let mejor = ''
          if(data.result[i].sex!== '男'&& data.result[i].sex!=='女'){
            sex = '未知'
          }else{
            sex = data.result[i].sex
          }
          if(data.result[i].a_zszyzw =='null'){
            mejor = '未知'
          }else{
            mejor = data.result[i].a_zszyzw
          }
          vm.listData_GP.push({
            name:data.result[i].name,
            sex: sex,
            age:data.result[i].age,
            school: data.result[i].a_zxxxdw,
            mejor: mejor,
            city: data.result[i].a_gj})
        }
        vm.$nextTick(function() {
          vm.loading_GP = false
        })
      }, function(err) {
        console.log(err);
      })
    }
  }
</script>

<style>
  .el-table .elTableName{
    border:none;
  }

</style>
