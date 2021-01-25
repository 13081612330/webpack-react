import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import './index.less'
import $ from 'jquery'
import axios from 'axios'
import img44 from '@/accet/img/44.jpg'
import img46 from '@/accet/img/46.jpg'
import img47 from '@/accet/img/47.jpg'
import { submitPrj } from '@/api/demoApi'
import { cloneObject } from '@/util/utils'
import geoJson from './shandong'
// import echarts from 'echarts'
import * as echarts from 'echarts';

function Home(props) {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);
  const [datas, setDatas] = useState([{"name":"泰安市","value":44},{"name":"日照市","value":47},{"name":"枣庄市","value":50},{"name":"菏泽市","value":59},{"name":"德州市","value":73},{"name":"东营市","value":82},{"name":"聊城市","value":84},{"name":"临沂市","value":87},{"name":"滨州市","value":99},{"name":"威海市","value":104},{"name":"济宁市","value":141},{"name":"淄博市","value":207},{"name":"潍坊市","value":252},{"name":"烟台市","value":377},{"name":"青岛市","value":408},{"name":"济南市","value":588}]
  );
//   const [form] = Form.useForm();
  const [obj, setObj] = useState({
      user: 'pzh',
      age: '25',
      ai: {
          game: 'yxlm',
          sleep: 'sj'
      }
  })

  useEffect(() => {
      console.log(8888, datas)
    // form.setFieldsValue({
    //   username: 'Bamboo',
    // });
    const objClone = {}
    cloneObject(obj, objClone)
    getData()
    var imgs = document.querySelectorAll('img')
    // handleImg()
    // 页面尺寸改变时实时触发
    window.onresize = function() {
      // 重新定义瀑布流
      waterFall()
    }
    // 初始化
    window.onload = function(){
      // 实现瀑布流
      waterFall()
      // 懒加载
      lazyLoad(imgs);
    }

    window.onscroll =function(){
      lazyLoad(imgs);
    }
    console.log(8899, echarts, document.getElementById('mychart'))
     initChart()
  }, []);

  const waterFall = () => {
    var pageWidth = getClient().width-8;
    var columns = 4; //3列
    var itemWidth = parseInt(pageWidth/columns); //得到item的宽度
    $(".item").width(itemWidth); //设置到item的宽度

    var arr = [];

    $(".masonry .item").each(function(i){
        var height = $(this).find("img").height();
        var width = $(this).find("img").width();
        var bi = itemWidth/width; //获取缩小的比值
        var boxheight = parseInt(height*bi); //图片的高度*比值 = item的高度

        if (i < columns) {
            // 2- 确定第一行
            $(this).css({
                top:0,
                left:(itemWidth) * i
            });
            arr.push(boxheight);

        } else {
            // 其他行
            // 3- 找到数组中最小高度  和 它的索引
            var minHeight = arr[0];
            var index = 0;
            for (var j = 0; j < arr.length; j++) {
                if (minHeight > arr[j]) {
                    minHeight = arr[j];
                    index = j;
                }
            }
            // 4- 设置下一行的第一个盒子位置
            // top值就是最小列的高度
            $(this).css({
                top: arr[index],
                left: $(".masonry .item").eq(index).css("left")
            });

            // 5- 修改最小列的高度
            // 最小列的高度 = 当前自己的高度 + 拼接过来的高度
            arr[index] = arr[index] + boxheight;
        }
    });
  }
   //clientWidth 处理兼容性
  const getClient = () => {
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
  }

  const getInput = (state, action) => {
    // console.log(form.getFieldsValue('username'), form.getFieldsValue());
  }
  // 获取到浏览器顶部的距离
  const getTop = (e) => {
    return e.offsetTop;
  }

  const lazyLoad = (imgs) => {
    var h = window.innerHeight;
    //滚动区域高度
    var s = document.documentElement.scrollTop || document.body.scrollTop;
    for(var i=0;i<imgs.length;i++){
      //图片距离顶部的距离大于可视区域和滚动区域之和时懒加载
      if ((h+s)>getTop(imgs[i])) {
        // 真实情况是页面开始有2秒空白，所以使用setTimeout定时2s
        (function(i){
          setTimeout(function(){
            // 不加立即执行函数i会等于9
            // 隐形加载图片或其他资源，
            //创建一个临时图片，这个图片在内存中不会到页面上去。实现隐形加载
            var temp = new Image();
            temp.src = imgs[i].getAttribute('data-src');//只会请求一次
            // onload判断图片加载完毕，真是图片加载完毕，再赋值给dom节点
            temp.onload = function(){
              // 获取自定义属性data-src，用真图片替换假图片
              imgs[i].src = imgs[i].getAttribute('data-src')
            }
          },2000)
        })(i)
      }
    }
  }

  const initChart = () => {
    const myChart = echarts.init(document.getElementById('mychart'))
    echarts.registerMap('shandong', geoJson);
   
    const option ={
        title:{
            text: '山东省地图',
            top:'3%',
            left:'center',
            textStyle:{
              fontSize:20,
              fontWeight:600,
              color:'#222'
            }
        },
        tooltip:{
          trigger:'item',
          formatter: function (val) {
            return val.data.name + '人口数量: ' + val.data.value + '万'
          }
        },
        series:[{
          type: 'map',
          map:'shandong',
          roam:true,//开启地图缩放， 开启后在预览模式中有一点点卡，暂时还没找到解决办法
          geoIndex:0,
          label:{
            normal:{
                show:true,//显示省市标签
                textStyle:{color:"#222"}
            },
            emphasis:{
                show:true,//显示省市标签
                textStyle:{color:"#222"}
            }
          },
          itemStyle: {
              normal: {
                  borderWidth: .5,//区域边框宽度
                  borderColor: '#0550c3',//区域边框颜色
                  areaColor:"#57cfff",//区域颜色
              },
              emphasis: {
                 borderWidth: .95,//鼠标滑过区域，区域边框宽度
                 borderColor: '#fff',//鼠标滑过区域，区域边框颜色
                 areaColor:"#ff6511",//鼠标滑过区域背景色
                
              }
          },
          data: datas
        //   data: [//数据
        //     { name: '济南市', value: 1000 },
        //     { name: '青岛市', value: 10 },
        //     { name: '德州市', value: 20 },
        //     { name: '淄博市', value: 30 },
        //     { name: '潍坊市', value: 40 },
        //     { name: '日照市', value: 41 },
        //     { name: '济宁市', value: 15 },
        //     { name: '菏泽市', value: 25 },
        //     { name: '烟台市', value: 35 },
        //     { name: '威海市', value: 35 },
        //     { name: '泰安市', value: 35 },
        //     { name: '临沂市', value: 35 },
        //     { name: '枣庄市', value: 35 },
        //     { name: '滨州市', value: 35 },
        //     { name: '东营市', value: 35 },
        //     { name: '莱芜市', value: 35 },
        //     { name: '聊城市', value: 35 }
        //   ]
        }],
    }
     myChart.setOption(option);
  }

  const getData = () => {
// /pmp-plan-compile/plan/search/getCompanyPrjPlan
// /pmp-plan-compile/plAdjustAudit/qryApprStatus
    // axios.get('api/pmp-plan-compile/plAlpRptPlans/qrySelStorePrjListCity',{
    //     params:{
    //         search_text: '刘德华',cat: '1002'
    //     },
    //     headers: {
    //         'content-type': 'application/json;charset=UTF-8'
    //     }
    // })
    // .then( (res) => {
    //     console.log(999, res)
    // })
    const params = {
        appOrgNo: "40101005110000001",
        apprCode: "",
        blgOrgNo: "40101005110000001",
        planYear: "",
        prjName: "",
        prjSortCodeList: []
    }
   

    axios.post("http://192.168.100.143:8040/pmp-sfu-store/Search/getPlStoreAloneState",
        '40101005110000001'
      ,{
        headers:{
            'content-type': 'application/json;charset=UTF-8'
        }
      }).then(res=>{
        // console.log(999, res)
      }).catch(function (error) {
   
      })

      submitPrj(params).then( res => {
        //   console.log(8888, res)
      })
    //   axios.post("api/pmp-sfu-store/plStoreProvinceAlone/qryProvinceAlonePrjs",
    //     params
    //     ,{
    //         headers:{
    //             'content-type': 'application/json;charset=UTF-8'
    //         }
    //     }).then(res=>{
    //         console.log(999, res)
    //     }).catch(function (error) {
    
    //     })
  }


 

  
  return (
    <div>
      {/* <p>You clicked {count} times</p>
      <Button onClick={getInput()} type="primary" onClick={() => setCount(count + 1)}> Click me</Button>
      <Form form={form}>
        <Form.Item name="username" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
      </Form> */}

<div id="mychart"></div>
      
      <div className="masonry">
            {/* <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src={ img46 } alt="" />
            </div>
            <div className="item">
                <img className="lazy" src={ img44 } data-src="../accet/img/2.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src={ img47 } alt="" />
            </div> */}
            {/* <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/4.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/5.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/6.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/7.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/8.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" onerror = "javascript:this.src = '../accet/img/10.jpg'" data-src="../accet/img/10.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/10.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/11.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/12.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/13.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/14.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/15.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/16.jpeg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/17.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/18.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/19.jpg" alt="" />
            </div>

            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/20.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/21.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/22.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/22.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/24.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/25.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/26.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/27.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/27.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/29.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/30.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/31.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/32.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/33.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/34.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/35.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/36.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/37.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/38.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/39.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/40.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/41.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/42.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/43.jpg" alt="" />
            </div>
            <div className="item">
                <img className="lazy" src="../accet/img/1.jpg" data-src="../accet/img/44.jpg" alt="" />
            </div> */}
        </div>
    </div>
  );
}

export default Home
