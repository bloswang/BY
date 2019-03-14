<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/student' }">500强企业</el-breadcrumb-item>
      <el-breadcrumb-item>500强分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
          <h5 class="ec_h5">
		        国内500强企业Top10
		      </h5>
        <div id="policy">
          <el-table :data="inlandList" style="width: 100%" >
            <el-table-column prop="num" label="排名" width="80" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="name"  label="企业名称" height ="50px" width="280" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="HQ" label="总部" width="180" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="business" label="业务支撑"  class-name="elTableName">
            </el-table-column>
             <el-table-column prop="company" label="业务分公司" width="300" class-name="elTableName">
            </el-table-column>


          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
         <h5 class="ec_h5">
		      国际500强企业Top10
		     </h5>
        <div id="policy2">
          <el-table :data="internationalList" style="width: 100%" >
            <el-table-column prop="num" label="排名" width="80" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="name"  label="企业名称" height ="50px" width="280" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="HQ" label="总部" width="180" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="business" label="业务支撑"  class-name="elTableName">
            </el-table-column>
            <el-table-column prop="company" label="业务分公司" width="300" class-name="elTableName">
            </el-table-column>

          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {

      inlandList: [],

      internationalList: []
    }
  },
   methods:{
     menu() {
       window.scrollTo(0,0);
     },
    	changeCompany(item){
         //console.log(item);
          this.$router.push({path:"companyDetails",query:{company:item}})
      }
   },
  created() {
    this.menu()
    let vm = this
    //国内五百强分布
    vm.$axios.request("post","enterprise/domesticTop10",{},function(data){
      console.log(data)
      for(let i= 0;i<data.result.length;i++){
        vm.inlandList.push({
          name:data.result[i].companyname,
          HQ:data.result[i].headoffice,
          business: data.result[i].business,
          company:data.result[i].branchoffice,
          num:data.result[i].ranking

        })
      }
    },function(err){
      console.log(err);
    })

    //国际五百强分布
    vm.$axios.request("post","enterprise/internationalTop10",{},function(data){
      for(let i= 0;i<data.result.length;i++){
        vm.internationalList.push({
          name:data.result[i].companyname,
          HQ:data.result[i].headoffice,
          business: data.result[i].business,
          company:data.result[i].branchoffice,
          num:data.result[i].ranking

        })
      }
    },function(err){
      console.log(err);
    })

  }
}

</script>
<style lang="scss">

</style>
