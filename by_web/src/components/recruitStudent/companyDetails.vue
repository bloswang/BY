<template>
	<div class="w">
		 <el-breadcrumb separator=">" class="navigation">
		      <el-breadcrumb-item :to="{ path: '/' }">世界500强</el-breadcrumb-item>
		      <el-breadcrumb-item :to="{ path: 'T500' }">世界500强分析</el-breadcrumb-item>
		      <el-breadcrumb-item>国家详情</el-breadcrumb-item>
		  </el-breadcrumb>
		   <el-row type="flex" justify="space-around">
		      <el-col :span="12" class="ec_bg_left">
		          <h5 class="ec_h5">
				      分公司动态
				  </h5>
			        <div class="ec_height" id="policy">
			          <el-table :data="internationalList" style="width: 100%" >
			            <el-table-column prop="name" align="center" label="名称" class-name="elTableName">
			            </el-table-column>
			            <el-table-column prop="HQ" align="center" label="从事领域"  class-name="elTableName">
			            </el-table-column>
			            <el-table-column prop="business" align="center" label="电话" class-name="elTableName">
			            </el-table-column>
			          </el-table>
			        </div>
		      </el-col>
		      <el-col :span="12" class="ec_bg_left">
		          <h5 class="ec_h5">
				      企业动态
				  </h5>
			        <div class="ec_height" id="policy1">
			          <el-table :data="internationalList" style="width: 100%" :show-header=false align="center">
			            <el-table-column prop="name" label="企业名称" class-name="elTableName">
			            </el-table-column>
			            <el-table-column prop="HQ" label="总部"  class-name="elTableName">
			            </el-table-column>
			            <el-table-column prop="business" label="业务支撑"  class-name="elTableName">
			            </el-table-column>
			             <el-table-column prop="company" label="业务分公司"  class-name="elTableName">
			            </el-table-column>
			          </el-table>
			        </div>
		      </el-col>
		   </el-row>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				 internationalList: [{
			        name: "上海市普陀区金沙江路",
			        HQ: "2017-2-1",
			        business: "111",
			        company:['美国','法国','日本']
			      }, {
			       	name: "上海市普陀区金沙江路",
			        HQ: "2017-2-1",
			        business: "111",
			        company:['美国','法国','日本']
			      }]
			}
		},
		methods:{

		},

	}
</script>
<style  lang="scss">

</style>
