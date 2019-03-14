<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/student' }">历年招生报名人数与实际入学人数对比</el-breadcrumb-item>
      <el-breadcrumb-item>未报到人数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg">
        <h5 class="ec_h5">
          未报到人数列表
        </h5>
        <div class="ec_height" id="policy">
          <el-table :data="listData" style="width: 100%">
            <el-table-column prop="recruit" align="center" label="招生处" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="recruitNum" align="center" label="招生数量" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="cooperative" align="center" label="合作企业" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="people" align="center" label="负责人" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="phone" align="center" label="电话" class-name="elTableName">
            </el-table-column>
            <el-table-column prop="mailbox" align="center" label="邮箱" class-name="elTableName">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss">


</style>
<script>
  export default {
    data() {
      return {
        city: "",
        listData: [{
          recruit: "北京语言大学",
          recruitNum: "2017",
          cooperative: "清华大学",
          people: "张三",
          phone: "17600113369",
          mailbox: "29988076@qq.com"
        }]
      }
    },
    methods: {


    },
    mounted() {
      //echarts主题
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
    },
    created() {
      window.scrollTo(0,0);
      let vm = this;
      console.log(vm.$router.query)
    },
  }

</script>
