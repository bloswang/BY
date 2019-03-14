<template>
    <div>
      <el-row type="flex" justify="space-around">
        <el-col :span="4" class="ec_bg btn btn_to" v-for="(item,index) in luYou_List" key="index">
          <div :class="{'active':index == keyCode}"  @click="changeCode(index)">
            <router-link :to='"/home/control/"+item.value'>
              <img :src='"../../assets/img/btn"+(index+1)+".png"' alt="" class="btn_to">
            </router-link>
              <h5 class="btn_text">{{item.name}}</h5>
          </div>
        </el-col>
        <!--<el-col :span="4" class="ec_bg btn" key="index">
          <div>
            <router-link to="/home/control/oneCard_XZ">
              <img :src='"../../assets/img/btn2.png"' alt="" class="btn_to">
            </router-link>
            <h5 class="btn_text">洗澡</h5>
          </div>
        </el-col>
        <el-col :span="4" class="ec_bg btn" key="index">
          <div>
            <router-link to="/home/control/oneCard_ST">
              <img :src='"../../assets/img/btn3.png"' alt="" class="btn_to">
            </router-link>
            <h5 class="btn_text">食堂</h5>
          </div>
        </el-col>
        <el-col :span="4" class="ec_bg btn" key="index">
          <div>
            <router-link to="/home/control/oneCard_RD">
              <img :src='"../../assets/img/btn4.png"' alt="" class="btn_to">
            </router-link>
            <h5 class="btn_text">上网热点</h5>
          </div>
        </el-col>
        <el-col :span="4" class="ec_bg btn" key="index">
          <div>
            <router-link to="/home/control/oneCard_GW">
              <img :src='"../../assets/img/btn5.png"' alt="" class="btn_to">
            </router-link>
            <h5 class="btn_text">城市购物</h5>
          </div>
        </el-col>
        <el-col :span="4" class="ec_bg btn" key="index">
          <div>
            <router-link to="/home/control/oneCard_TSG">
              <img :src='"../../assets/img/btn6.png"' alt="" class="btn_to">
            </router-link>
            <h5 class="btn_text">图书馆</h5>
          </div>
        </el-col>-->
      </el-row>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          luYou_List:[
            {name:'总消费',value:'oneCard'},
            {name:'洗澡',value:'oneCard_XZ'},
            {name:'食堂',value:'oneCard_ST'},
            {name:'上网热点',value:'oneCard_RD'},
            {name:'城市购物',value:'oneCard_GW'},
            {name:'图书馆',value:'oneCard_TSG'},
            ],
          keyCode:0
        }
      },
      methods:{
        changeCode(index){
          this.keyCode = index
          console.log(this.keyCode)
        }
      }

    }
</script>

<style lang="scss" scoped>
  .btn{
    text-align: center;
  .btn_to{
    transform: scale(1);
    transition: 0.2s;
  }
  .btn_to:hover{
    transform: scale(1.2);
    transition: 0.2s;
  }
  }
  .btn_text{
    font-size: 16px;
    color:#04aec7 ;
    margin: 10px 0;
  }


</style>
