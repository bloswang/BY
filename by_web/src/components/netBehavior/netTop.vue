<template>
  <div class="w">
    <el-breadcrumb separator=">" class="navigation">
      <el-breadcrumb-item :to="{ path: '/home/safety' }">上网行为</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/status' }">上网高峰分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row type="flex" justify="space-around">
      <el-col
        v-loading.body="loading"
        element-loading-text="拼命加载中"
        element-loading-customClass="loading"
        :span="24"
        class="ec_bg">
        <h5 class="ec_h5">
          全校高峰时间轴 单位(G)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="flow_height_time"
              type="date"
              format="yyyy-MM-dd"
              @change="flow_height_time_change"
              placeholder="选择时间">
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="netTop_echarts_1">
        </div>
      </el-col>
    </el-row>
      <el-row type="flex" justify="space-around">
      <el-col :span="24"
              v-loading.body="loading_FB"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg"
              style="margin-bottom: 0">
        <h5 class="ec_h5">
          网络应用使用分布 单位(万次)
          <div class="ec_h5_data">
            <el-radio-group v-model="radio" size="small" style="margin: -5px 20px 0 0;" @change="codeChange">
              <el-radio-button label="近一个月"></el-radio-button>
              <el-radio-button label="近三个月"></el-radio-button>
              <el-radio-button label="近半年"></el-radio-button>
            </el-radio-group>
          </div>
        </h5>
        <div style="height: 500px" id="app_FB"></div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24"
              v-loading.body="loading1"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg"
              style="margin-bottom: 0">
        <h5 class="ec_h5">
          各学院网络应用情况分布&nbsp;&nbsp;单位(万次)
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM"
              @change="people_time_change"
              v-model="people_time"
              type="month"
              placeholder='选择时间'>
            </el-date-picker>

            <el-select
              v-model="typeSelect1"
              placeholder="请选择"
              size="mini"
              class="major-select select_width"
              @change="typeChange1">
              <el-option
                v-for="(item,index) in typeList1"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </h5>
        <div class="big_height" id="school_app"></div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="24"
              v-loading.body="loading2"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg"
              style="margin-bottom: 0">
        <h5 class="ec_h5">
          中国本科生成绩与上网行为相关分析&nbsp;&nbsp;单位(万次)
          <div class="ec_h5_data">
            <el-radio-group v-model="result_list" size="small" style="margin: -5px 20px 0 0;" @change="result_Change">
              <el-radio-button label="60分以下"></el-radio-button>
              <el-radio-button label="60分-70分"></el-radio-button>
              <el-radio-button label="70分-80分"></el-radio-button>
              <el-radio-button label="80分-90分"></el-radio-button>
              <el-radio-button label="90分以上"></el-radio-button>
            </el-radio-group>
            <el-date-picker
              class="select_width"
              align="right"
              size='mini'
              format="yyyy-MM"
              @change="result_time_change"
              v-model="result_time"
              type="month"
              placeholder='选择时间'>
            </el-date-picker>
          </div>
        </h5>
        <div class="ec_height" id="result"></div>
      </el-col>
    </el-row>
    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24"
              v-loading.body="loading1"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg" style="padding-left: 0">
        <h5 class="ec_h5">
          <span style="padding-left: 20px">楼宇高峰</span>
          <div class="ec_h5_data">
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="map_start_time"
              type="date"
              format="yyyy-MM-dd"
              @change="map_start_time_change"
              placeholder="选择时间">
            </el-date-picker>
            至
            <el-date-picker
              class="select_width"
              size="mini"
              v-model="map_end_time"
              type="date"
              format="yyyy-MM-dd"
              @change="map_end_time_change"
              placeholder="选择时间">
            </el-date-picker>
            </div>
        </h5>
        <div class="map" id="netTop_echarts_3">
        </div>
      </el-col>
    </el-row>
    <el-row class="by_body_table_div">
      <el-col :span="24"
              v-loading.body="loading1"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading">
        <div class="grid-content bg-purple-dark">
          <template>
            <el-table
              fixed
              :data="tableData"
              height="500"
              style="width: 100%;height: 500px;margin-bottom: 50px"
              class="by_body_table" :border=false>
              <el-table-column prop="num" label="楼号" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              &lt;!&ndash;<el-table-column prop="num_c" label="楼层" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>&ndash;&gt;
              <el-table-column prop="peo_num" label="上网人数" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="peo_count" label="上网人次" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
              <el-table-column prop="peo_flow" label="上网流量" align="center" class-name="by_body_row" label-class-name="by_body_label">
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
  import AMap from 'AMap';
  import time from "../../config/timeFormat.js"
  export default{
    data () {
      return {
        loading:true,
        loading1:true,
        msg: '上网行为',
        teachingTeam_time:"",
        tableData: [],
        //第一个折线图
        flow_height_time:'2017-08-02',
        flow_time:[],
        flow_count:[],

        loading2:true,
        loading_FB:true,
        //应用分布
        FB_name:[],
        FB_count:[],
        //应用使用趋势
        radio: '近半年',
        code:'3',
        QS_name:[],
        QS_count:[],
        //应用使用人次分析
        people_time:'2017-11',
        typeSelect1:'高级翻译学院',
        typeList1:[
          '高级翻译学院',
          '外国语学院',
          '商学院',
          '汉语速成学院',
          '语言康复学院',
          '汉语进修学院',
          '语言科学院',
          '艺术学院',
          '汉语学院',
          '培训学院',
          '马克思主义学院',
          '人文学院',
          '信息科学学院',
          '网络教育学院',],
        RC_name:[],
        RC_count:[],
        //成绩应用分布
        result_DOM:'',
        result_time:'2017-11',
        result_list:'60分以下',
        show_list_name:[],
        show_list_count:[],
        show_color:'#C00BC0',
        //60
        list1_name:[],
        list1_count:[],
        //60-70
        list2_name:[],
        list2_count:[],
        //70-80
        list3_name:[],
        list3_count:[],
        //80-90
        list4_name:[],
        list4_count:[],
        //90
        list5_name:[],
        list5_count:[],

        /*netTop_echarts_1:'',
        map_start_time:'2017-07-05',
        map_end_time:'2017-07-06',
        map_data:[],*/

      }
    },
    components: {},
    methods: {
      make_time(){
        let vm  = this
        let dayTime = ''
        if(time.day < 10){
          dayTime = '0'+(time.day- 1)
        }else{
          dayTime = time.day - 1
        }
          vm.flow_height_time = time.year +'-'+time.month+'-'+ dayTime;
          vm.people_time= time.year +'-'+'01'
          vm.result_time= time.year +'-'+'01'
      },
      menu() {
        window.scrollTo(0,0);
      },
      echarts1(){
        let option = {
          tooltip: {
            position: 'top',
            formatter: function (params) {
              return '上网流量分布 : '
                +'<br/>'+ params.seriesName + ' : ' + params.value
                +'<br/>'+ '上网时间' + ' : ' + params.name
            }
          },
          dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 0, // 左边在 10% 的位置。
            end: 100 // 右边在 60% 的位置。
          }, { // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            start: 0, // 左边在 10% 的位置。
            end: 100 // 右边在 60% 的位置。
          }],
          toolbox: {
            feature: {
              dataView: {
                show: true,
                readOnly: false
              },
              magicType: {
                show: true,
                type: ['line', 'bar']
              },
              restore: {
                show: true
              },

            }
          },
          legend: {
            data: ['上网流量']
          },
          xAxis: [{
            type: 'category',
            data: this.flow_time
          }],
          yAxis: [{
            type: 'value',
            name: '上网流量分布',
            axisLabel: {
              formatter: '{value} '
            }
          }],
          series: [{
            name: '上网流量',
            type: 'bar',
            data: this.flow_count
          },
          ]
        };
        this.netTop_echarts_1.setOption(option)
      },
      //全校高峰
      flow_height_time_change(val){
        let vm = this
        vm.flow_height_time = val
        vm.date_height(vm.flow_height_time)
      },
      date_height(time){
        let vm = this
        vm.$axios.request("post","height/heightAnalysis", {date:time},function(data){
          vm.flow_time = []
          vm.flow_count = []
          for(let i=0;i<data.result.length;i++){
            vm.flow_time.push(data.result[i].min)
            vm.flow_count.push(parseInt(data.result[i].flow))
          }
          vm.$nextTick(function() {
            vm.loading = false
          })
          vm.echarts1()
        },function(err){
          console.log(err);
        })
      },

      //app_FB 应用程序分布
      app_FB_fn(){
        let app_FB = this.$echarts.init(document.getElementById('app_FB'), 'customed');
        let option = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:this.FB_name
          },
          series : [
            {
              name: '应用程序',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:this.FB_count,
              label: {
                normal: {
                  show: true,
                  formatter: '{b} : {c}  ({d}%)'
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        app_FB.setOption(option);
      },
      codeChange(label){
        var vm = this
        if(label == '近一个月'){
          vm.code = 1
        }else if(label == '近三个月'){
          vm.code = 2
        }else if(label == '近半年'){
          vm.code = 3
        }
        vm.loading_FB = true
        vm.app_FB_init(vm.code)
      },
      app_FB_init(flag){

        let vm = this
        vm.$axios.request("post","applicationTrend/appDis",{flag:flag},function(data){
          vm.FB_name = []
          vm.FB_count = []
          for(let i = 0;i<data.result.length;i++){
            vm.FB_name.push(data.result[i].urltype)
            vm.FB_count.push({name:data.result[i].urltype,value:data.result[i].count})
          }
          vm.$nextTick(function() {
            vm.loading_FB = false
          })
          vm.app_FB_fn()
        },function(err){
          console.log(err);
        })

      },

      //应用使用人次
      school_app_fn() {
        let school_app = this.$echarts.init(document.getElementById('school_app'), 'customed');
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: "{a} <br/>{b} : {c}"
          },
          legend: {
            data: ['应用人次分析']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            "axisLabel": {
              "interval": 0,
              formatter: '{value}',
            }
          },
          yAxis: {
            type: 'category',
            data: this.RC_name
          },
          series: [{
            name: '应用人次分析',
            type: 'bar',
            data: this.RC_count,
            label: {
              normal: {
                show: true,
                position: 'right',
                textStyle: {
                  color: 'white'
                }
              }
            }
          }]
        };
        school_app.setOption(option);
      },
      people_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.people_time = val
          vm.app_people_fn(vm.people_time,vm.typeSelect1)
        }

      },
      typeChange1(val){
        let vm = this
        vm.typeSelect1 = val
        vm.app_people_fn(vm.people_time,vm.typeSelect1)
      },
      app_people_fn(time,school){
        let vm  = this
        vm.$axios.request("post","applicationPerson/person", {
          date: time,
          name: school,},function(data){
          vm.RC_name = []
          vm.RC_count = []
          for(let i=0;i<data.result.length;i++){
            vm.RC_name.push(data.result[i].urltype)
            vm.RC_count.push(data.result[i].count)
          }
          vm.$nextTick(function() {
            vm.loading1 = false
          })
          vm.school_app_fn()
        },function(err){
          console.log(err);
        })
      },

      //成绩应用分布
      result_fn() {
        let option = {
          title: {
            text: this.result_list +'应用分布',
            textStyle: {
              fontSize: 16,
              color:this.show_color
            },
            left:'center',
            top:'5%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: this.show_list_name
          },
          series: [
            {
              name: '成绩应用分布',
              type: 'bar',
              data: this.show_list_count,
              itemStyle: {
                normal: {
                  color: this.show_color
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  textStyle: {
                    color: 'white'
                  }
                }
              }
            }
          ]
        };
        this.result_DOM.setOption(option);
      },
      result_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else{
          vm.result_time = val
          vm.result_send_fn(vm.result_time)
        }

      },
      result_Change(lable){
        let vm = this
        if(lable == '60分以下'){
          vm.show_list_name = vm.list1_name
          vm.show_list_count = vm.list1_count
          vm.show_color = '#C00BC0'
          vm.result_fn()
        }else if(lable == '60分-70分'){
          vm.show_list_name = vm.list2_name
          vm.show_list_count = vm.list2_count
          vm.show_color = '#51C025'
          vm.result_fn()
        }else if(lable == '70分-80分'){
          vm.show_list_name = vm.list3_name
          vm.show_list_count = vm.list3_count
          vm.show_color = '#69BDC0'
          vm.result_fn()
        }else if(lable == '80分-90分'){
          vm.show_list_name = vm.list4_name
          vm.show_list_count = vm.list4_count
          vm.show_color = '#B4C01C'
          vm.result_fn()
        }else{
          vm.show_list_name = vm.list5_name
          vm.show_list_count = vm.list5_count
          vm.show_color = '#C02E36'
          vm.result_fn()
        }
      },
      result_send_fn(year){
        let vm = this
        vm.$axios.request("post","appSpread/spread", {year:year},function(data){
          vm.show_list_name=[]
          vm.show_list_count=[]
          vm.list1_name=[]
          vm.list1_count=[]
          vm.list2_name=[]
          vm.list2_count=[]
          vm.list3_name=[]
          vm.list3_count=[]
          vm.list4_name=[]
          vm.list4_count=[]
          vm.list5_name=[]
          vm.list5_count=[]
          for(let i=0;i<data.result.length;i++){
            vm.show_list_name.push(data.result[i].urltype)
            vm.show_list_count.push(data.result[i].count)
            vm.list1_name.push(data.result[i].urltype)
            vm.list1_count.push(data.result[i].count)
          }
          for(let i=0;i<data.result1.length;i++){
            vm.list2_name.push(data.result1[i].urltype)
            vm.list2_count.push(data.result1[i].count)
          }
          for(let i=0;i<data.result2.length;i++){
            vm.list3_name.push(data.result2[i].urltype)
            vm.list3_count.push(data.result2[i].count)
          }
          for(let i=0;i<data.result3.length;i++){
            vm.list4_name.push(data.result3[i].urltype)
            vm.list4_count.push(data.result3[i].count)
          }
          for(let i=0;i<data.result4.length;i++){
            vm.list5_name.push(data.result4[i].urltype)
            vm.list5_count.push(data.result4[i].count)
          }
          vm.$nextTick(function() {
            vm.loading2 = false
          })
          vm.result_fn()
        },function(err){
          console.log(err);
        })

      }

      //地图相关函数以及时间插件
      /*loadmap(){
        let _this = this;
        _this.map = new AMap.Map('netTop_echarts_3', {
          //mapStyle: 'amap://styles/ac2f3dde93570da63a1a44b6ba4067ee',//灰色样式URL
          mapStyle: 'amap://styles/734fdf2b7510e4ac160db1d288eb8754',//黑色样式URL
          //mapStyle:'amap://styles/normal',
          zoom: 17,
          center: [116.346528,39.994522],
          resizeEnable:true,
        });
        /!*AMap.service(["AMap.PlaceSearch"], function() {
          var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 1,
            pageIndex: 1,
            city: "010", //城市
            map: _this.map//,
            //panel: "panel"
          });
          let name = []
          let school = ['北京语言大学图书馆','北京语言大学新综合楼','北京语言大学10号楼']
          for(let i=0;i<school.length;i++){
            //关键字查询
            placeSearch.search(school[i], function(status, result) {
              for(let j =0;j<result.poiList.pois.length;j++){
                if(result.poiList.pois[j].address ==school[i]){
                  console.log(result.poiList.pois[j].address)
                  name.push([result.poiList.pois[j].location.N,result.poiList.pois[j].location.Q])
                }
              }
            });
          }
          setTimeout(function(){
            console.log(name)
          },1000)
        });*!/
        AMap.plugin('AMap.PlaceSearch',function(){
          let placeSearch = new AMap.PlaceSearch({
            city:'010'
          })
          placeSearch.search('北京语言大学',function(status,data){
            _this.map.setFitView();
            _this.map.setZoom(17);
            _this.map.setLimitBounds(_this.map.getBounds())
            _this.map.setStatus({zoomEnable: true,dragEnable:true});
          })
        })

        let infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

        let hot = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
        let img_size = new AMap.Size(20,30)

        for (let i = 0, marker; i < _this.map_data.length; i++) {
          if(_this.map_data[i].num>1200){
            hot = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png'
            img_size = new AMap.Size(30,38)
          }else if(_this.map_data[i].num>1000){
            hot = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png'
            img_size = new AMap.Size(25,33)
          }else if(_this.map_data[i].num>800){
            hot = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
            img_size = new AMap.Size(20,28)
          }else if(_this.map_data[i].num>500){
            hot = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
            img_size = new AMap.Size(15,23)
          }else{
            hot = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
            img_size = new AMap.Size(10,18)
          }
          let marker = new AMap.Marker({
            position: [_this.map_data[i].value[0],_this.map_data[i].value[1]],
            map: _this.map,
            icon: new AMap.Icon({
            image: hot,
            size: new AMap.Size(60, 60),  //图标大小
            imageSize:img_size
          })

        });
          marker.content = _this.map_data[i].name +
            '<br/>'+'上网人数:'+_this.map_data[i].num +'人'+
            '<br/>'+'上网人次:'+_this.map_data[i].count+'次'+
            /!*'<br/>'+'楼层:'+_this.map_data[i].tier+*!/
            '<br/>'+'上网流量:'+_this.map_data[i].fldflow+'G';
          marker.on('click', markerClick);
          marker.emit('click', {target: marker});
        }
        function markerClick(e) {
          infoWindow.setContent(e.target.content);
          infoWindow.open(_this.map, e.target.getPosition());
        }
      },
      LY_height(start,end){
        let vm = this
        vm.$axios.request("post","height/buildingTop", {startDate:start,endDate:end},function(data){
          let x = ''
          let y = ''
          let lc = ''
          vm.map_data = []
          vm.tableData = []
          for(let i = 0;i<data.result.length;i++){
            if(data.result[i].coordinatel == null){
              x = '116.343557'*1
            }else if(data.result[i].coordinatel =='116.342695'){
              x = '116.342695'*1
            }else if(data.result[i].coordinatel =='116.315748'){
              x = '116.35035'*1
            }else if(data.result[i].coordinatel == 0){
              x = '116.34422'*1
            }else{
              x = data.result[i].coordinatel*1
            }

            if(data.result[i].coordinater == null){
              y = '39.993423' *1
            }else if(data.result[i].coordinater =='39.99427'){
              y = '39.99427' *1
            }else if(data.result[i].coordinater =='39.954872'){
              y = '39.99632' *1
            }else if(data.result[i].coordinater == 0){
              y = '39.993548'*1
            }else{
              y = data.result[i].coordinater *1
            }

            if(data.result[i].tier == 'null'){
              lc='-'
            }else{
              lc = data.result[i].tier
            }
           vm.map_data.push({
             name:data.result[i].buildingnum!='null'? data.result[i].buildingnum:'家属楼',
             value:[x,y],
             count:data.result[i].count,
             fldflow:data.result[i].fldflow,
             num:data.result[i].num,
             tier:lc
           })
            vm.tableData.push({
              num:data.result[i].buildingnum!=null? data.result[i].buildingnum:'未知',
              num_c:lc,
              peo_num:data.result[i].num,
              peo_count:data.result[i].count,
              peo_flow:data.result[i].fldflow,
            })
          }
          vm.$nextTick(function() {
            vm.loading1 = false
          })
          vm.loadmap()
        },function(err){
          console.log(err);
        })

      },
      map_start_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val >this.map_end_time){
          if(this.map_end_time!==''){
            this.$message.error('开始时间不能大于结束时间哦！');
            this.map_start_time = ''
            return
          }else{
            this.map_start_time = val
          }
        }else{
          vm.map_start_time = val
          vm.LY_height(vm.map_start_time,vm.map_end_time)
        }

      },
      map_end_time_change(val){
        let vm = this
        if(val == undefined){
          return
        }else if(val<this.map_start_time){
          this.$message.error('结束时间不能小于开始时间哦！');
          this.map_end_time = ''
          return
        }else{
          vm.map_end_time = val
          vm.LY_height(vm.map_start_time,vm.map_end_time)
        }

      },*/

    },
    mounted () {
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      this.netTop_echarts_1 = this.$echarts.init(document.getElementById("netTop_echarts_1"), 'customed');
      this.result_DOM = this.$echarts.init(document.getElementById('result'), 'customed');
      },
    created(){
      window.scrollTo(0,0);
      let vm = this
      vm.make_time()
      vm.date_height(vm.flow_height_time)
      vm.menu()
      vm.app_FB_init(vm.code)
      vm.app_people_fn(vm.people_time,vm.typeSelect1)
      vm.result_send_fn(vm.result_time)
      //vm.LY_height(vm.map_start_time,vm.map_end_time)
    }
  }
</script>

<style lang="scss">
  .big_height{
    height:800px;
  }
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
  .map{
    height: 600px;
  }
</style>
