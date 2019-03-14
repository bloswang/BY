<template>
  <div class="by_top">
    <el-row type="flex" class="row-bg w toper" justify="space-around">
      <el-col :span="5" style="background-color: rgba(31, 32, 36,0.2)">
        <div class="grid-content bg-purple by_top_logo">
        	<img src="../../assets/img/logo.png" height="41" width="41" alt="">
        	<h5>北京语言大学数据分析平台</h5>
        </div>
      </el-col>
      <el-col :span="17">
        <!--<div class="grid-content bg-purple-light by_top_list">
        	<ul>
        		<li>
        			<router-link to='/home/userlist'>用户管理</router-link>
        		</li>
        		<li>
        			<router-link to="/home/student">招生洞察</router-link>
        		</li>
        		<li>
        			<router-link to="/home/school">北语校情</router-link>
        		</li>
        		<li>
        			<router-link to="/home/control">管理洞察</router-link>
        		</li>
            <li>
              <router-link to="/home/safety">上网行为</router-link>
            </li>
        		<li>
        			<router-link to="/home/beiyu">星光北语</router-link>
        		</li>
            <li>
              <a href="http://guanjia.junquan.com.cn/login/auth/external?phone=bjyydx&token=8226876f5d1bc48dae9cd7fb4d25e643&time=1507710562" target="_blank">校园舆情</a>
            </li>
        	</ul>
        </div>-->
        <el-menu theme="dark" style="background-color: rgba(31, 32, 36,0.2)" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" v-show="showList.f1" @click="skip('userlist')">
            <router-link to='/home/userlist'>用户管理</router-link>
          </el-menu-item>
          <el-submenu v-show="showList.f2" index="2">
             <template slot="title">
               招生洞察
               <!--<router-link to='/home/student'>招生洞察</router-link>-->
             </template>
            <!--线上项目开启权限控制的菜单-->
            <el-menu-item
            v-for="(item,index) in student"
            key = 'index'
            :index = item.sort
            @click="skip(item.url)">
            {{item.mname}}
            </el-menu-item>
            <!--本地项目写死的菜单-->
            <!--<el-menu-item index="2-1" @click="skip('student')">招生洞察首页</el-menu-item>
            <el-menu-item index="2-2" @click="skip('schoolDate')">校内数据分析</el-menu-item>
            <el-menu-item index="2-3" @click="skip('comeDate')">来华留学生分析</el-menu-item>
            <el-menu-item index="2-4" @click="skip('oneAndOne')">一带一路国家详情</el-menu-item>
            <el-menu-item index="2-5" @click="skip('source')">留学生招生渠道分析</el-menu-item>
            <el-menu-item index="2-6" @click="skip('browse')" >高校留学生招生分析</el-menu-item>
            <el-menu-item index="2-7" @click="skip('T500')">500强企业详情</el-menu-item>
            <el-menu-item index="2-8" @click="skip('majorDetails')">留学生专业人数分析</el-menu-item>-->
          </el-submenu>
          <el-submenu v-show="showList.f3" index="3">
            <template slot="title">
              北语校情
              <!--<router-link to="/home/school">北语校情</router-link>-->
            </template>
            <!--线上项目开启权限控制的菜单-->
            <el-menu-item
              v-for="(item,index) in school"
              key = 'index'
              :index = item.sort
              @click="skip(item.url)">
              {{item.mname}}
            </el-menu-item>

            <!--本地项目写死的菜单-->
            <!--<el-menu-item index="3-1" @click="skip('school')">北语校情首页</el-menu-item>
            <el-menu-item index="3-2" @click="skip('teacher_num')">教职工人数详情</el-menu-item>
            <el-menu-item index="3-3" @click="skip('out_num')">外聘教师人数详情</el-menu-item>
            <el-menu-item index="3-4" @click="skip('height_num')">教授人数详情</el-menu-item>
            <el-menu-item index="3-5" @click="skip('teach')">教学条件分析详情</el-menu-item>
            <el-menu-item index="3-6" @click="skip('teach2')">学生用房详情</el-menu-item>
            <el-menu-item index="3-7" @click="skip('student_TJ')">学生基本条件详情</el-menu-item>
            <el-menu-item index="3-8" @click="skip('made_teach')">基本办学指标详情</el-menu-item>-->
          </el-submenu>
          <el-submenu v-show="showList.f4" index="4">
            <template slot="title">
              一卡通大数据
              <!--<router-link to="/home/control">管理洞察</router-link>-->
            </template>
            <!--线上项目开启权限控制的菜单-->
            <el-menu-item
              v-for="(item,index) in control"
              key = 'index'
              :index = item.sort
              @click="skip(item.url)">
              {{item.mname}}
            </el-menu-item>

            <!--本地项目写死的菜单-->
            <!--<el-menu-item index="4-1" @click="skip('control')">一卡通大数据首页</el-menu-item>
            <el-menu-item index="4-2" @click="skip('oneCard')">一卡通总体消费分析</el-menu-item>
            <el-menu-item index="4-3" @click="skip('shitang')">食堂消费分析</el-menu-item>
            <el-menu-item index="4-4" @click="skip('chaoshi')">超市消费分析</el-menu-item>
            <el-menu-item index="4-5" @click="skip('xizao')">洗浴消费分析</el-menu-item>
            <el-menu-item index="4-7" @click="skip('eat_type')">就餐高峰期分析</el-menu-item>
            <el-menu-item index="4-10" @click="skip('chongzhi')">充值行为分析</el-menu-item>-->
          </el-submenu>
          <el-submenu v-show="showList.f5" index="5">
            <template slot="title">
              上网行为
              <!--<router-link to="/home/safety">上网行为</router-link>-->
            </template>
            <!--线上项目开启权限控制的菜单-->
            <el-menu-item
              v-for="(item,index) in safety"
              key = 'index'
              :index = item.sort
              @click="skip(item.url)">
              {{item.mname}}
            </el-menu-item>

            <!--本地项目写死的菜单-->
            <!--<el-menu-item index="5-1" @click="skip('safety')">上网行为首页</el-menu-item>
            <el-menu-item index="5-2" @click="skip('safe_num')">上网人数分析</el-menu-item>
            <el-menu-item index="5-3" @click="skip('safe_flow')">上网流量分析</el-menu-item>
            <el-menu-item index="5-4" @click="skip('safe_time')">上网时长分析</el-menu-item>
            <el-menu-item index="5-5" @click="skip('safe_hot')">上网高峰分析</el-menu-item>
            <el-menu-item index="5-6" @click="skip('safe_app')">网络应用分析</el-menu-item>-->
          </el-submenu>
          <el-menu-item v-show="showList.f6" index="6"  @click="skip('beiyu')">
            <router-link to="/home/beiyu">星光北语</router-link>
          </el-menu-item>
          <el-menu-item  index="7"  @click="skip('yichang')">
            <router-link to="/home/yichang">异常行为</router-link>
          </el-menu-item>
          <el-menu-item v-show="showList.f8" index="8">
            <a href="http://guanjia.junquan.com.cn/login/auth/external?phone=bjyydx&time=1539581961&token=a5a9ebabe7c50853cd5a16db1ef86f4c" target="_blank">校园舆情</a>
          </el-menu-item>
        </el-menu>


      </el-col>
      <el-col :span="2" style="background-color: rgba(31, 32, 36,0.2)">
        <div class="out">
          <a href="#" @click="out">
            <span class="out_img"></span>
            <span class="out_text">退出登陆</span>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '6',
      showList:{
        f1:'f1',
        f2:'f2',
        f3:'f3',
        f4:'f4',
        f5:'f5',
        f6:'f6',
        f7:'f7',
        f8:'f8',
        },
      showCode:{
        f2:'f2',
      },
      student:[],
      school:[],
      control:[],
      safety:[],
      jurisdiction:[]
    }

  },
  methods: {
   handleSelect(key, keyPath) {
     this.activeIndex = key
     sessionStorage.setItem("key",key)
   },
   skip(link) {
     switch (link) {
       case 'userlist':
         this.$router.push('/home/userlist')
         break;
       //招生洞察跳转
       case 'student':
         this.$router.push('/home/student')
         break;
       case 'oneAndOne':
         this.$router.push('/home/student/OneAndOne')
         break;
       case 'browse':
         this.$router.push('/home/student/browseDetails')
         break;
       case 'source':
         this.$router.push({path:'/home/student/studentOriginArea',query: { year: this.origin_student}})
         break;
       case 'T500':
         this.$router.push('/home/student/T500')
         break;
       case 'majorDetails':
         this.$router.push({ path: '/home/student/majorDetails', query: { year: '2017', major: '汉语言' } });
         break;
       case 'schoolDate':
         this.$router.push('/home/student/schoolDate');
         break;
       case 'comeDate':
         this.$router.push('/home/student/comeDate');
         break;

      //北语校情跳转
       case 'school':
         this.$router.push('/home/school')
         break;
       case 'teacher_num':
         this.$router.push('/home/school/teacher')
         break;
       case 'out_num':
         this.$router.push('/home/school/goreignTeacher')
         break;
       case 'height_num':
         this.$router.push('/home/school/heightPeople')
         break;
       case 'teach':
         this.$router.push('/home/school/teacher_TJ')
         break;
       case 'teach2':
         this.$router.push('/home/school/teacher_TJ2')
         break;
       case 'student_TJ':
         this.$router.push('/home/school/student_TJ')
         break;
       case 'teacher_ZB':
         this.$router.push('/home/school/teacher_ZB')
         break;
       case 'teacher_RSL':
         this.$router.push('/home/school/teacher_RSL')
         break;

       //管理洞察
       case 'control':
         this.$router.push('/home/control')
         break;
       case 'oneCard':
         this.$router.push('/home/control/oneCard')
         break;
       case 'shitang':
         this.$router.push({path:"/home/control/consumerShitang", query: {name: '食堂总消费'}})
         break;
       case 'chaoshi':
         this.$router.push({path:"/home/control/consumerChaoshi", query: {name: '超市总消费'}})
         break;
       case 'xizao':
         this.$router.push({path:"/home/control/consumerXizao", query: {name: '洗浴总消费'}})
         break;
       case 'zong':
         this.$router.push('/home/control/eat')
         break;
       case 'eat_type':
         this.$router.push({path:'/home/control/eat_type',query:{type:'早餐'}})
         break;
       /*case 'zao':
         this.$router.push({path:'/home/control/eat_type_zao',query:{type:'早餐'}})
         break;
       case 'zhong':
         this.$router.push({path:'/home/control/eat_type_wu',query:{type:'午餐'}})
         break;
       case 'wan':
         this.$router.push({path:'/home/control/eat_type_wan',query:{type:'晚餐'}})
         break;*/
       case 'chongzhi':
         this.$router.push('/home/control/payWay')
         break;

       //上网行为
       case 'safety':
         this.$router.push('/home/safety')
         break;
       case 'safe_num':
         this.$router.push('/home/netBehavior')
         break;
       case 'safe_flow':
         this.$router.push('/home/netFlow')
         break;
       case 'safe_time':
         this.$router.push('/home/timeLength')
         break;
       case 'safe_hot':
         this.$router.push('/home/netTop')
         break;
       case 'safe_app':
         this.$router.push('/home/app_page')
         break;
       case 'safe_pay':
         this.$router.push('/home/netPay')
         break;
       case 'beiyu':
         this.$router.push('/home/beiyu')
         break;
       case 'yichang':
         this.$router.push('/home/yichang')
         break;
     }
   },
   out(){
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("Firefox") !== -1
        || userAgent.indexOf("Chrome") !== -1) {
        open(location, '_self').close();
        window.location.href = "http://ehall.blcu.edu.cn/new/indexblcu.html";
      } else {
        open(location, '_self').close();
      }
    }
 },
  mounted(){
    let vm = this
  },
  created(){
    let vm = this
    let url = window.location.href
    let url_str = url.split("#")[1]
    this.url = url_str
    if(url_str == '/home/student'){
      vm.showCode.f2 = 'f2'
    }else if(url_str == '/home/school'){
      vm.showCode.f2 = 'f3'
    }else if(url_str == '/home/control'){
      vm.showCode.f2 = 'f4'
    }else if(url_str == '/home/safety'){
      vm.showCode.f2 = 'f5'
    }else if(url_str == '/home/beiyu'){
      vm.showCode.f2 = 'f6'
    }else if(url_str == '/home/yichang'){
      vm.showCode.f2 = 'f7'
    }

    let key = sessionStorage.getItem("key")
    if(key == null||key == 'null'){
      if(url_str == '/home/student'){
        vm.activeIndex = '2-1'
      }else if(url_str == '/home/school'){
        vm.activeIndex = '3-1'
      }else if(url_str == '/home/control'){
        vm.activeIndex = '4-1'
      }else if(url_str == '/home/safety'){
        vm.activeIndex = '5-1'
      }else if(url_str == '/home/beiyu'){
        vm.activeIndex = '6'
      }else if(url_str == '/home/yichang'){
        vm.activeIndex = '7'
      }
    }else{
      vm.activeIndex = key
    }
    //权限设置开启
    vm.$axios.request("post","user/getJurisdiction",{},function(data){
      vm.showList = data.result
      if(
        vm.showCode.f2 == data.result.f1||
        vm.showCode.f2 == data.result.f2||
        vm.showCode.f2 == data.result.f3||
        vm.showCode.f2 == data.result.f4||
        vm.showCode.f2 == data.result.f5||
        vm.showCode.f2 == data.result.f6||
        vm.showCode.f2 == data.result.f7
      ){
        window.location=" http://data.blcu.edu.cn/mis-web/#" + url_str
      }else{
        window.location=" http://data.blcu.edu.cn/mis-web/#/home/beiyu"
      }
    },function(err){
      console.log(err);
    })
    //动态加载头部导航栏菜单
    vm.$axios.request("post","user/getSecondJurisdiction",{uid:'0002'},function(data){
      vm.student = data.student
      vm.school = data.school
      vm.control = data.control
      vm.safety = data.safety
      for(let i=0;i<data.student.length;i++){
        vm.jurisdiction.push(data.student[i].url)
      }
      for(let i=0;i<data.school.length;i++){
        vm.jurisdiction.push(data.school[i].url)
      }
      for(let i=0;i<data.control.length;i++){
        vm.jurisdiction.push(data.control[i].url)
      }
      for(let i=0;i<data.safety.length;i++){
        vm.jurisdiction.push(data.safety[i].url)
      }
      sessionStorage.setItem("jurisdiction",vm.jurisdiction)
    },function(err){
      console.log(err);
    })

  },
  watch:{
    "$store.state.active_index":function(){
      this.activeIndex = this.$store.state.active_index
      sessionStorage.setItem("key",this.activeIndex)
    }
  }
}

</script>
<style scoped lang="scss">
  .toper{
    width: 100%;
    z-index: 100;
    background-color: rgba(31, 32, 36,0.2);
    //background-color: #212226;
  }
.by_top{
	height: 60px;
  min-width: 1200px;
  background-color: rgba(31, 32, 36,0.2);
	//background-color: #212226;
  margin-bottom: 20px;
}
.by_top_logo{
	padding-left: 80px;
	position: relative;
	img{
		position: absolute;
		left: 20px;
		top: 10px;
	}
	h5{
		line-height: 60px;
		color: #FFF;
		font-size: 15px;
	}
}
.by_top_list{
	li{
		float: left;
		a{
			line-height: 60px;
			height: 60px;
			display: inline-block;
			color: #fff;
			font-size: 14px;
			padding: 0 17px;
		}
	}
}
.by_top_login{
	a{
		line-height: 60px;
		margin-left: 10px;
	}
}
.out{
  margin-top: 20px;
  position: relative;

  a{
    height: 20px;
    font-size: 14px;
    color: white;
    margin-top: -5px;
    position: relative;
    .out_img{
      display: inline-block;
      width: 20px;
      height: 20px;
      background-image: url("../../assets/img/account.png");
      background-size: 100% 100%;
    }
    .out_text{
      width: 60px;
      height:20px;
      position: absolute;
      top: -3px;
      left:22px;
    }
  }
  a:hover{
    color: red;
  }
  a:hover .out_img{
    width: 20px;
    height: 20px;
    background-image: url("../../assets/img/red.png");
    background-size: 100% 100%;
  }
}
/*.router-link-active{
	border-bottom: 3px solid #04aec7;
	background-color: #18191d;
}*/
</style>
