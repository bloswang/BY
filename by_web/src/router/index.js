import Vue from 'vue'
import Router from 'vue-router'
import userlist from '../components/user/userlist.vue'
import body from "../components/public/body.vue"
import receiveStudents from "../components/recruitStudent/student.vue"
import studentSource from "../components/recruitStudent/studentSource.vue"
import majorDetails from "../components/recruitStudent/majorDetails.vue"
import browseDetails from "../components/recruitStudent/browseDetails.vue"
import studentOriginArea from "../components/recruitStudent/studentOriginArea.vue"
import T500 from "../components/recruitStudent/T500.vue"
import studentOriginAreaDetails from "../components/recruitStudent/studentOriginAreaDetails.vue"
import studentSourceDetails from "../components/recruitStudent/studentSourceDetails.vue"
import companyDetails from "../components/recruitStudent/companyDetails.vue"
import OneAndOne from "../components/recruitStudent/OneAndOne.vue"
import notCome from "../components/recruitStudent/notCome.vue"
import schoolDate from "../components/recruitStudent/school_date.vue"
import comeDate from "../components/recruitStudent/come_date.vue"
//管理洞察组件
import InsightControl from '../components/InsightControl/InsightControl.vue'
import oneCard from  '../components/InsightControl/onecard.vue'
import oneCard_XZ from '../components/InsightControl/oneCard_XZ.vue'
import oneCard_GW from '../components/InsightControl/oneCard_GW.vue'
import oneCard_RD from '../components/InsightControl/oneCard_RD.vue'
import oneCard_ST from '../components/InsightControl/oneCard_ST.vue'
import oneCard_TSG from '../components/InsightControl/oneCard_TSG.vue'
import oneCard_DS from '../components/InsightControl/oneCard_DS.vue'
import oneCard_XY from '../components/InsightControl/oneCard_XY.vue'
import oneCard_BK from '../components/InsightControl/oneCard_BK.vue'

import eat from  '../components/InsightControl/eat.vue'
import consumerShitang from '../components/InsightControl/consumerShitang.vue'
import shitang_list from '../components/InsightControl/shitang_list.vue'
import shitang_hot from '../components/InsightControl/shitang_hot.vue'
import consumerChaoshi from '../components/InsightControl/consumerChaoshi.vue'
import consumerXizao from '../components/InsightControl/consumerXizao.vue'
import behavior from  '../components/InsightControl/behavior.vue'
import shilian from  '../components/InsightControl/shilian.vue'
import kunnan from  '../components/InsightControl/kunnan.vue'
import chenmi from  '../components/InsightControl/chenmi.vue'
import wangui from  '../components/InsightControl/wangui.vue'
import taoke from  '../components/InsightControl/taoke.vue'
import payWay from  '../components/InsightControl/payWay.vue'
import eat_type from  '../components/InsightControl/eat_type.vue'
import room_person_list from '../components/InsightControl/room_person_list.vue'
import eat_type_zao from  '../components/InsightControl/eat_type_zao.vue'
import eat_type_wu from  '../components/InsightControl/eat_type_wu.vue'
import eat_type_wan from  '../components/InsightControl/eat_type_wan.vue'

/**
 * 上网行为
 * safety
 */
import netBehavior from '../components/netBehavior/netBehavior.vue'
import netScale from '../components/netBehavior/netScale.vue'
import netFlow from '../components/netBehavior/netFlow.vue'
import timeLength from '../components/netBehavior/timeLength.vue'
import netTop from '../components/netBehavior/netTop.vue'
import app_page from '../components/netBehavior/app_page.vue'
import netPay from '../components/netBehavior/netPay.vue'
//北语校情组件
import school from '../components/schoolStatus/status.vue'
import artisan from '../components/schoolStatus/artisan.vue'
import goreignTeacher from '../components/schoolStatus/goreignTeacher.vue'
import heightPeople from '../components/schoolStatus/heightPeople.vue'
import teacher from '../components/schoolStatus/teacher.vue'
import teacher_TJ from '../components/schoolStatus/teacher_TJ.vue'
import teacher_TJ2 from '../components/schoolStatus/teacher_TJ2.vue'
import teacher_ZB from '../components/schoolStatus/teacher_ZB.vue'
import student_TJ from '../components/schoolStatus/student_TJ.vue'
import teacher_RSL from '../components/schoolStatus/teacher_RSL.vue'
//星光北语
import byStar from '../components/byStar/byStar.vue'
//异常行为
import yichang from '../components/abnormality/abnormality.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  //base: '/', //开发需要
  base: '/mis-web/', //打包需要
  routes: [{
      path: '/',
      name: '默认显示',
      redirect: '/home/beiyu'
    },
    {
      path: '/home',
      name: '主体',
      component:body,
      redirect:'/home/userlist',
      children: [{
        path: 'userlist',
        name: '用户管理',
        component: userlist
      },{
      	path: 'student',
      	name: '招生洞察',
      	component: receiveStudents
      },{
        path:'student/source',
        component: studentSource
      },{
        path:'student/OneAndOne',
        name:'一带一路',
        component: OneAndOne
      },{
        path:'student/majorDetails',
        name:'专业比例分析',
        component: majorDetails
      },{
        path:'student/browseDetails',
        name:'关注浏览',
        component: browseDetails
      },{
        path:'student/studentOriginArea',
        name:'生源动态',
        component: studentOriginArea
      },{
        path:'student/T500',
        name:'500强',
        component: T500
      },{
        path:'student/studentOriginAreaDetails',
        name:'孔子学院分析',
        component: studentOriginAreaDetails
      },{
          path:'student/notCome',
          name:'未到学生列表',
          component: notCome
        },{
        path:'student/studentSourceDetails',
        name:'人员分布详情',
        component: studentSourceDetails
      },{
        path:'student/companyDetails',
        name:'国家详情',
        component: companyDetails
      },{
        path:'student/schoolDate',
        name:'校内数据分析',
        component: schoolDate
      },
      {
        path:'student/comeDate',
        name:'来华留学生数据分析',
        component: comeDate
      },

        //管理洞察相关路由开始
        {
        path: 'control',
        name: '管理洞察',
        component: InsightControl
        },
        {
          path: 'control/oneCard',
          name: '一卡通消费',
          component: oneCard
        },
        {
          path: 'control/oneCard_XZ',
          name: '一卡通洗澡消费页',
          component: oneCard_XZ
        },
        {
          path: 'control/oneCard_ST',
          name: '一卡通食堂消费页',
          component: oneCard_ST
        },
        {
          path: 'control/oneCard_RD',
          name: '一卡通热点消费页',
          component: oneCard_RD
        },
        {
          path: 'control/oneCard_GW',
          name: '一卡通购物消费页',
          component: oneCard_GW
        },
        {
          path: 'control/oneCard_TSG',
          name: '一卡通图书馆消费页',
          component: oneCard_TSG
        },
        {
          path: 'control/oneCard_DS',
          name: '一卡通打水消费页',
          component: oneCard_DS
        },
        {
          path: 'control/oneCard_XY',
          name: '一卡通洗衣消费页',
          component: oneCard_XY
        },
        {
          path: 'control/oneCard_BK',
          name: '一卡通补卡消费页',
          component: oneCard_BK
        },
        {
          path: 'control/eat',
          name: '就餐高峰期详情',
          component: eat
        },
        {
          path: 'control/eat_type',
          name: '就餐早中晚详情',
          component: eat_type
        },
        //单独注册早中晚各自的路由是因为在头部导航栏点击的时候，使用同一个不在发送请求数据不会改变
        {
          path: 'control/eat_type_zao',
          name: '早餐',
          component: eat_type_zao
        },
        {
          path: 'control/eat_type_wu',
          name: '午餐',
          component: eat_type_wu
        },
        {
          path: 'control/eat_type_wan',
          name: '晚餐',
          component: eat_type_wan
        },

        {
          path: 'control/consumerShitang',
          name: '食堂总消费',
          component: consumerShitang,
        },
        {
          path: 'control/shitang_list',
          name: '食堂窗口总消费',
          component: shitang_list,
        },
        {
          path: 'control/shitang_hot',
          name: '食堂窗口消费热度',
          component: shitang_hot,
        },
        {
          path: 'control/room_person_list',
          name: '食堂总消费人员分布',
          component: room_person_list,
        },
        {
          path: 'control/consumerChaoshi',
          name: '超市总消费',
          component: consumerChaoshi
        },
        {
          path: 'control/consumerXizao',
          name: '洗澡总消费',
          component: consumerXizao
        },
        {
          path: 'control/behavior',
          name: '生活健康心里分析',
          component: behavior
        },
        {
          path: 'control/shilian',
          name: '失联学生分析',
          component: shilian
        },
        {
          path: 'control/taoke',
          name: '逃课网络分析',
          component: taoke
        },
        {
          path: 'control/kunnan',
          name: '困难学生分析',
          component: kunnan
        },
        {
          path: 'control/wangui',
          name: '早出晚归学生分析',
          component: wangui
        },
        {
          path: 'control/chenmi',
          name: '沉迷网络分析',
          component: chenmi
        },

        {
          path: 'control/payWay',
          name: '充值方式',
          component: payWay
        },

        //北语校情
        {
          path: 'school',
          name: '北语校情',
          component: school
        },
        {
          path: 'school/teacher',
          name: '教职工分析',
          component: teacher
        },
        {
          path: 'school/goreignTeacher',
          name: '外教分析',
          component: goreignTeacher
        },
        {
          path: 'school/heightPeople',
          name: '高层次人员分析',
          component: heightPeople
        },
        {
          path: 'school/artisan',
          name: '技术人员分析',
          component: artisan
        },
        {
          path: 'school/teacher_TJ',
          name: '教学条件分析',
          component: teacher_TJ
        },
        {
          path: 'school/teacher_TJ2',
          name: '学生用房分析',
          component: teacher_TJ2
        },
        {
          path: 'school/teacher_ZB',
          name: '基本办学指标',
          component: teacher_ZB
        },
        {
          path: 'school/teacher_RSL',
          name: '软实力',
          component: teacher_RSL
        }
        ,
        {
          path: 'school/student_TJ',
          name: '学生基本办学指标',
          component: student_TJ
        },

        /*上网行为*/
        {
          path: 'safety',
          name: '上网行为',
          component: netScale
        },{
          path: 'netBehavior',
          name: '上网人数分析',
          component: netBehavior
        },{
          path: 'netFlow',
          name: '上网流量分析',
          component: netFlow
        },{
          path: 'timeLength',
          name: '上网时长分析',
          component: timeLength
        },{
          path: 'netTop',
          name: '上网高峰分析',
          component: netTop
        },{
          path: 'app_page',
          name: '网络应用top10分析',
          component: app_page
        },{
          path: 'netPay',
          name: '上网费用分析',
          component: netPay
        },
        //北语星光
        {
          path: '/home/beiyu',
          name: '星光北语',
          component: byStar
        },
        //异常行为
        {
          path: '/home/yichang',
          name: '异常行为',
          component: yichang
        }
        ]
    }
  ]
})
