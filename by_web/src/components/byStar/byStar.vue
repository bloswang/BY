<template>
  <div class="w">
    <el-row type="flex" justify="space-around">
      <el-col :span="24"
              v-loading.body="loading1"
              element-loading-text="拼命加载中"
              element-loading-customClass="loading"
              class="ec_bg" style="padding-left: 20px">
        <h5 class="ec_h5">
          <span >星光北语</span>
          <div class="ec_h5_data">
            <div class="pull-right" v-show="isMark">
              <el-button @click="searchMark" size="mini" class="ml10">查询</el-button>
              <el-date-picker
                style="float: right"
                class="select_width ml10"
                size="mini"
                v-model="map_start_time"
                type="date"
                format="yyyy-MM-dd"
                @change="map_start_time_change"
                placeholder="选择时间">
              </el-date-picker>
            </div>
            <div class="pull-right" v-show="isHot">
              <el-button @click="begin" size="mini" class="ml10">{{beginName}}</el-button>
              <el-select v-model="spaceTime" @change="spaceTimeChange" style="float: right" placeholder="请选择间隔时间" size="mini" class="ml10 select_width">
                <el-option
                  v-for="item in timeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button @click="searchHot" size="mini" class="ml10 mr100">查询</el-button>
              <el-date-picker
                style="float: right;width: 300px"
                class="ml10"
                size="mini"
                v-model="mapTime"
                type="datetimerange"
                range-separator="至"
                @change="map_time_change"
                placeholder="选择时间"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
          <div class="mark" v-show="isMark">
            <div class="red son"></div><div class="textSon redText">1000人以上</div>
            <div class="yellow son"></div><div class="textSon yellowText">500-1000人</div>
            <div class="green son"></div><div class="textSon greenText">500人以下</div>
          </div>
        </h5>
        <div class="input-card">
          <el-radio-group v-model="radio" size="medium" @change="mapTypeChange">
            <el-radio-button label="标注图" ></el-radio-button>
            <el-radio-button label="热力图"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="map" id="netTop_echarts_3"></div>
        <div v-show="isBegin" >
          <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"></el-progress>
          <div style="text-align: center">{{percentageTime}}</div>
        </div>

        <!--<el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="标注图" name="first">
            <el-row type="flex" justify="space-around">
              <el-col :span="24" class="ec_bg" style="padding-left: 20px">

                &lt;!&ndash;<div class="block">
                  <el-slider
                    v-model="value9"
                    @change="SJZ_change"
                    range
                    show-stops
                    height="20px"
                    :min="0"
                    :max="24">
                  </el-slider>
                </div>&ndash;&gt;

              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="热力图" name="second">
            <el-row type="flex" justify="space-around">
              <el-col :span="24" class="ec_bg" style="padding-left: 20px">
                <div class="map" id="container"></div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>-->
      </el-col>
    </el-row>
    <!--<el-row type="flex" justify="space-around">
      <el-col :span="24" class="ec_bg" style="padding-left: 20px">
        <div class="block">
          <span class="demonstration">默认</span>
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            @change="testTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
  import AMap from 'AMap';
  import time from '../../config/timeFormat'
  import mark_b from '../../assets/img/mark_b.png'
  import mark_r from '../../assets/img/mark_r.png'
  import mark_g from '../../assets/img/mark_g.png'
  import mark_y from '../../assets/img/mark_y.png'
  export default{
    data () {
      return {
        radio: '标注图',
        isMark:true,
        isHot:false,
        isBegin:false,
        activeName: 'first',
        loading:true,
        loading1:true,
        loading2:false,
        map_start_time:'',
        map_data:[],
        hot_data:[],
        value9: [],
        netTop_hot_echarts:'',
        hot_data_list:[
          [
            {
              name:"逸夫楼",
              value:["116.350208","39.994766"],
              mj:"4",
              ykt:"200",
              sw:"100",
              time:2017
            }
          ],
          [
            {
              name:"图书馆",
              value:["116.347624","39.995393"],
              mj:"4",
              ykt:"2200",
              sw:"1200",
              time:2018
            }
          ],
          [
            {
              name:"5号楼",
              value:["116.346221","39.994063"],
              mj:"4",
              ykt:"500",
              sw:"700",
              time:2019
            }
          ],
        ],
        beginFlag:true,
        beginName:'开始播放',
        xh:'',
        heatMap:'',
        heatItem:'',
        heatmapData:[],
        heatList:[],
        mapTime:[],
        timeOptions: [
          {
            value: '15',
            label: '15分钟'
          },
          {
            value: '30',
            label: '30分钟'
          },
          {
            value: '60',
            label: '1小时'
          },
          {
            value: '120',
            label: '2小时'
          },
        ],
        spaceTime: '15',
        percentage:0,
        percentageTime:'',



        value1:'',
      }
    },
    components: {},
    methods: {
      /*初始化时间*/
      make_time(){
        let vm = this
        let date = new Date();
        let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        vm.map_start_time = time.year+ '-' + time.month+ '-' + time.day
        vm.mapTime[0] = time.year+ '-' + time.month+ '-' + time.day + ' 00:00:00'
        vm.mapTime[1] = time.year+ '-' + time.month+ '-' + time.day + ' ' + h + ':' + m + ':' + s

      },

      //地图相关函数以及时间插件
      loadMsp(data){
        let _this = this;
        _this.map = new AMap.Map('netTop_echarts_3', {
          //mapStyle: 'amap://styles/ac2f3dde93570da63a1a44b6ba4067ee',//灰色样式URL
          mapStyle: 'amap://styles/734fdf2b7510e4ac160db1d288eb8754',//黑色样式URL
          //mapStyle:'amap://styles/normal',
          zoom: 17,
          center: [116.346528,39.994522],
          resizeEnable:true,
        });
        AMap.plugin('AMap.PlaceSearch',function(){
          let placeSearch = new AMap.PlaceSearch({
            city:'010'
          })
          placeSearch.search('北京语言大学',function(status,data){
            _this.map.setFitView();
            _this.map.setZoom(18);
            _this.map.setLimitBounds(_this.map.getBounds())
            _this.map.setStatus({zoomEnable: true,dragEnable:true});
          })
        })

        let infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

        let hot = mark_b
        let img_size = new AMap.Size(17,25)
        let markers = []
        for (let i = 0, marker; i < data.length; i++) {
          if(data[i].sw>1000){
            hot = mark_r
            img_size = new AMap.Size(17,25)

          }else if(data[i].sw>500){
            hot = mark_y
            img_size = new AMap.Size(17,25)
          }else{
            hot = mark_g
            img_size = new AMap.Size(17,25)
          }

          let marker = new AMap.Marker({
            position: [data[i].value[0],data[i].value[1]],
            map: _this.map,
            icon: new AMap.Icon({
              image: hot,
              size: new AMap.Size(60, 60),  //图标大小
              imageSize:img_size
            })
          });
          let sw = ''
          if(data[i].sw == undefined){
            sw = 0
          }else {
            sw = data[i].sw
          }
          let mj = ''
          if(data[i].mj == undefined){
            mj = 0
          }else {
            mj = data[i].mj
          }

          let ykt = ''
          if(data[i].ykt == undefined){
            ykt = 0
          }else {
            ykt = data[i].ykt
          }
          marker.content = data[i].name +
            '<br/>'+'上网人数:'+sw +'人'+
            '<br/>'+'门禁人数:'+mj+'人'+
            '<br/>'+'一卡通消费人数:'+ykt+'人';
          marker.on('click', markerClick);
          marker.emit('click', {target: marker});
          markers.push(marker)
        }
        //某一个锚点单独跳动
        /*for(let i = 0;i<markers.length;i++){
          console.log(markers[i].content.split("上网人数:")[2])
        }
        markers[3].setAnimation('AMAP_ANIMATION_BOUNCE');*/
        function markerClick(e) {
          infoWindow.setContent(e.target.content);
          infoWindow.open(_this.map, e.target.getPosition());
        }
      },

      /*热力图初始化*/
      hotMap(data){
        //let heatmapData = [{"lng":116.191031,"lat":39.988585,"count":10},{"lng":116.389275,"lat":39.925818,"count":11},{"lng":116.287444,"lat":39.810742,"count":12},{"lng":116.481707,"lat":39.940089,"count":13},{"lng":116.410588,"lat":39.880172,"count":14},{"lng":116.394816,"lat":39.91181,"count":15},{"lng":116.416002,"lat":39.952917,"count":16},{"lng":116.39671,"lat":39.924903,"count":17},{"lng":116.180816,"lat":39.957553,"count":18},{"lng":116.382035,"lat":39.874114,"count":19},{"lng":116.316648,"lat":39.914529,"count":20},{"lng":116.395803,"lat":39.908556,"count":21},{"lng":116.74553,"lat":39.875916,"count":22},{"lng":116.352289,"lat":39.916475,"count":23},{"lng":116.441548,"lat":39.878262,"count":24},{"lng":116.318947,"lat":39.942735,"count":25},{"lng":116.382585,"lat":39.941949,"count":26},{"lng":116.42042,"lat":39.884017,"count":27},{"lng":116.31744,"lat":39.892561,"count":28},{"lng":116.407059,"lat":39.912438,"count":29},{"lng":116.412351,"lat":39.888082,"count":30},{"lng":116.444341,"lat":39.915891,"count":31},{"lng":116.335385,"lat":39.741756,"count":32},{"lng":116.3926,"lat":40.008733,"count":33},{"lng":116.389731,"lat":39.92292,"count":34},]
        let vm = this
        this.heatMap = new AMap.Map("netTop_echarts_3", {
          mapStyle: 'amap://styles/734fdf2b7510e4ac160db1d288eb8754',//黑色样式URL
          center: [116.346528,39.994522],
          pitch: 50,
          zoom: 18,
          resizeEnable:true,
          viewMode: '3D'
        });
        if (!isSupportCanvas()) {
          alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
        }
        //判断浏览区是否支持canvas
        function isSupportCanvas() {
          var elem = document.createElement('canvas');
          return !!(elem.getContext && elem.getContext('2d'));
        }

        vm.hotMapInit(data)
      },

      /*热力图数据更新*/
      hotMapInit(data){
        let vm = this
        vm.heatmapData = []
        for(let i=0;i<data.length;i++){
          vm.heatmapData.push({
            "lng":data[i].value[0],
            "lat":data[i].value[1],
            "count":data[i].count == undefined?0:data[i].count
          })
        }
        vm.heatMap.plugin(["AMap.Heatmap"], function () {
          vm.heatItem && vm.heatItem.hide()
          vm.heatItem = new AMap.Heatmap(vm.heatMap, {
            radius: 100, //给定半径
            opacity: [0, 0.8],
          });
          vm.heatItem.setDataSet({
            data: vm.heatmapData,
            max: 300
          });
        });
      },

      /*获取标注图数据*/
      get_load_data(time){
        let vm = this
        vm.$axios.request("post","starlightBY/person", {date :time},function(data){
          let x = ''
          let y = ''
          vm.map_data = []
          for(let i= 0;i<data.infoo.length;i++){
            if(data.infoo[i].coordinatel == 'null'){
              x = '116.343557'*1
            }else if(data.infoo[i].coordinatel =='116.315748'){
              x = '116.35035'*1
            }else if(data.infoo[i].coordinatel == 0){
              x = '116.34422'*1
            }else{
              x = data.infoo[i].coordinatel*1
            }
            if(data.infoo[i].coordinater =='null'){
              y = '39.993423' *1
            }else if(data.infoo[i].coordinater =='39.954872'){
              y = '39.99632' *1
            }else if(data.infoo[i].coordinater == 0){
              y = '39.993548'*1
            }else{
              y = data.infoo[i].coordinater *1
            }
            vm.map_data.push({
              name:data.infoo[i].address_floorname == 'null'?'家属院':data.infoo[i].address_floorname,
              value:[x,y],
              mj:data.infoo[i].count1,
              ykt:data.infoo[i].count2,
              sw:data.infoo[i].count3,
            })
          }
          vm.$nextTick(function() {
            vm.loading1 = false
          })
          vm.loadMsp(vm.map_data)

        },function(err){
          console.log(err);
        })
      },

      /*获取热力图数据*/
      get_hot_data(start,end,interval,flag){
        let vm = this
        /*vm.$axios.request("post","starlightBY/person", {date :time},function(data){
          let x = ''
          let y = ''
          vm.hot_data = []
          for(let i= 0;i<data.infoo.length;i++){
            if(data.infoo[i].coordinatel == 'null'){
              x = '116.343557'*1
            }else if(data.infoo[i].coordinatel =='116.315748'){
              x = '116.35035'*1
            }else if(data.infoo[i].coordinatel == 0){
              x = '116.34422'*1
            }else{
              x = data.infoo[i].coordinatel*1
            }
            if(data.infoo[i].coordinater =='null'){
              y = '39.993423' *1
            }else if(data.infoo[i].coordinater =='39.954872'){
              y = '39.99632' *1
            }else if(data.infoo[i].coordinater == 0){
              y = '39.993548'*1
            }else{
              y = data.infoo[i].coordinater *1
            }
            vm.hot_data.push({
              name:data.infoo[i].address_floorname == 'null'?'家属院':data.infoo[i].address_floorname,
              value:[x,y],
              mj:data.infoo[i].count1,
              ykt:data.infoo[i].count2,
              sw:data.infoo[i].count3,
            })
          }
          vm.$nextTick(function() {
            vm.loading1 = false
          })
          vm.hotMap(vm.hot_data)
        },function(err){
          console.log(err);
        })*/
        vm.$axios.request("post","starlightBY/apVisitPerson", {startTime:start,endTime:end,interval:interval,flag:flag},function(data){
          vm.hot_data = []
          for(let i= 0;i<data.infoo.length;i++){
            vm.hot_data.push({
              name:data.infoo[i].name,
              value:data.infoo[i].value,
              count:data.infoo[i].count,
            })
          }
          vm.$nextTick(function() {
            vm.loading1 = false
          })
          vm.hotMap(vm.hot_data)
        },function(err){
          console.log(err);
        })
      },

      /*单个时间插件*/
      map_start_time_change(val){
        let vm = this
        vm.map_start_time = val
      },

      /*时间区间筛选插件*/
      map_time_change(val){
        if(val!==undefined){
          this.mapTime = val.split('至')
        }
      },

      /*标注图与热力图切换按钮事件*/
      mapTypeChange(val){
        let vm = this
        if(val == '标注图'){
          vm.isMark = true
          vm.isHot = false
          vm.isBegin = false
          vm.beginName = "开始播放"
          vm.beginFlag = true
          clearInterval(vm.xh)
          this.searchMark()
        }else{
          vm.isMark = false
          vm.isHot = true
          clearInterval(vm.xh)
          vm.searchHot()
        }
      },

      /*热力图选择播放的时间间隔*/
      spaceTimeChange(val){
        this.spaceTime = val
      },

      /*点击查询标注图，根据时间区间查询固定值*/
      searchMark(){
        let vm = this
        vm.beginName = "开始播放"
        vm.beginFlag = true
        vm.isBegin = false
        clearInterval(vm.xh)
        vm.loading1 = true
        vm.get_load_data(vm.map_start_time)

      },

      /*点击查询热力图，根据时间区间查询固定值*/
      searchHot(){
        let vm = this
        vm.beginName = "开始播放"
        vm.beginFlag = true
        vm.isBegin = false
        clearInterval(vm.xh)
        vm.loading1 = true
        vm.get_hot_data(vm.mapTime[0], vm.mapTime[1], vm.spaceTime, 0)
      },

      /*点击开始播放与暂停播放事件*/
      begin() {
        let vm = this
        vm.beginFlag = !vm.beginFlag

        if(vm.beginFlag){
          vm.beginName = "开始播放"
          vm.isBegin = false
          vm.percentage = 0
          clearInterval(vm.xh)
        }else{
          //vm.loading1 = true
          /*vm.$axios.request("post","starlightBY/apVisitPerson", {startTime:vm.mapTime[0],endTime:vm.mapTime[1],interval:vm.spaceTime,flag:'1'},function(data){
            vm.hot_data_list  =  data.infoo
            vm.$nextTick(function() {
              vm.loading1 = false
              vm.beginName = "结束播放"
              vm.xh = setInterval(function () {
                if(flag == vm.hot_data_list.length){
                  flag = 0
                }
                vm.hotMapInit(vm.hot_data_list[flag])
                vm.percentage = parseInt(((flag + 1) / vm.hot_data_list.length) * 100)
                vm.percentageTime = vm.hot_data_list[flag][0].time == "undefined"?'': vm.hot_data_list[flag][0].time
                flag++
              },2000)
            })
          },function(err){
            console.log(err);
          })*/
          vm.beginName = "结束播放"
          vm.isBegin = true
          let startDate = vm.mapTime[0]
          let endDate = vm.mapTime[1]
          let startDateM = vm.toCommon(startDate) //得到毫秒数
          let endDateM = vm.toCommon(endDate) //得到毫秒数

          let cha = endDateM - startDateM
          let space = (60000 * vm.spaceTime)
          let num = parseInt(cha/space)
          let eTime = ''
          let flag = 1
          vm.xh = setInterval(function () {
            if(flag > num){
              flag = 1
              vm.beginName = "开始播放"
              vm.isBegin = false
              clearInterval(vm.xh)
            }
            startDateM = startDateM + space
            eTime = startDateM + space
            let commonStart =  vm.toLocale(startDateM)
            let commonEnd = vm.toLocale(eTime)
            vm.$axios.request("post","starlightBY/apVisitPerson", {startTime:commonStart,endTime:commonEnd,interval:vm.spaceTime,flag:"0"},function(data){
              vm.hot_data = []
              for(let i= 0;i<data.infoo.length;i++){
                vm.hot_data.push({
                  name:data.infoo[i].name,
                  value:data.infoo[i].value,
                  count:data.infoo[i].count,
                  time:data.infoo[i].time
                })
              }
             /* vm.$nextTick(function() {
                vm.loading1 = false
              })*/
              vm.hotMapInit(vm.hot_data)
              vm.percentage = parseInt(flag/ num * 100)
              flag++
              /*console.log(vm.hot_data[0].time)*/
              vm.percentageTime =vm.hot_data[0].time
            },function(err){
              console.log(err);
            })
            //console.log(commonStart + "------" + commonEnd)
          },5000)
        }
      },


      testTime(val){
        let vm = this
        let time = val.split("至")
        let startDate = time[0]
        let endDate = time[1]
        let startDateM = this.toCommon(startDate) //得到毫秒数
        let endDateM = this.toCommon(endDate) //得到毫秒数

        let cha = endDateM - startDateM
        /*let num = parseInt(cha/900000)*/
        let eTime = ''
        let num = 10
        let flag = 1
        setInterval(function () {
          if(flag > num){
            flag = 1
          }
          startDateM = startDateM + 900000
          eTime = startDateM + 900000
          let commonStart =  vm.toLocale(startDateM)
          let commonEnd = vm.toLocale(eTime)
          console.log(commonStart + "------" + commonEnd)
          flag++
        },3000)

      },
      /*时间格式转化为毫秒*/
      toCommon(time){
        let date = time.replace(new RegExp("-","gm"),"/");
        return (new Date(date)).getTime();
      },
      /*毫秒转化为时间格式*/
      toLocale(time){
        Date.prototype.toLocaleString = function() {
          let month = this.getMonth()+ 1
          let day = this.getDate()
          let h = this.getHours()
          let m = this.getMinutes()
          let s = this.getSeconds()
          if(month < 10){
            month = 0 + "" + month
          }
          if(day < 10){
            day = 0 + "" + day
          }
          if(h < 10){
            h = 0 + "" + h
          }
          if(m < 10){
            m = 0 + "" + m
          }
          if(s < 10){
            s = 0 + "" + s
          }
          return this.getFullYear() + "-" + (month) + "-" + day + " " + h + ":" + m + ":" + s;
        };
        let unixTimestamp = new Date( time ) ;
        let commonTime = unixTimestamp.toLocaleString();
        return commonTime
      }
    },
    mounted () {
      this.$echarts.registerTheme('customed', this.$store.state.echartsData);
      //this.netTop_hot_echarts = this.$echarts.init(document.getElementById("netTop_hot_echarts"), 'customed');
      clearInterval(this.xh)
    },
    created(){
      let vm = this
      window.scrollTo(0,0);
      clearInterval(vm.xh)
      vm.make_time()
      vm.get_load_data(vm.map_start_time)
    },
    destroyed: function () {
      clearInterval(this.xh)
    },
  }
</script>

<style lang="scss">
  .pull-right{
    float: right;
  }
  .input-card{
    position: absolute;
    top: 50px;
    left: 50px;
    z-index: 1;
    button{
      padding: 5px 10px;
      border-radius: 10px;
    }
  }
  .ec_h5{
    position: relative;
  }
  .mark{
    width: 100px;
    height: 90px;
    position: absolute;
    right: 0;
    top: 100px;
    z-index: 1;
    .son{
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 5px;
    }
    .red{
      background: red;
      left: 0;
      top: 0;
    }
    .yellow{
      background: yellow;
      left: 0;
      top: 30px;
    }
    .green{
      background: #00B800;
      left: 0;
      top: 60px;
    }
    .textSon{
      font-size: 0.5rem;
      color: white;
      position: absolute;
      width: 75px;
      height: 30px;
      text-align: center;
      line-height: 20px;
    }
    .redText{
      color: red;
      left: 20px;
      top: 0;
    }
    .yellowText{
      color: yellow;
      left: 20px;
      top: 30px;
    }
    .greenText{
      color: #00B800;
      left: 20px;
      top: 60px;
    }
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

  .by_body_el_input {
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
  }

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
    height: 800px;
  }
  .ml10{
    margin-left: 10px;
  }
  .mr100{
    margin-right: 100px;
  }
</style>
