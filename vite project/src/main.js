import * as THREE from 'three';
//import sphere from "./mash/sphere";
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import sphere from './mash/sphere';
import torus from './mash/torus';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import { Color } from 'three';
import plane from "./mash/plane";
import snowflakes from './sprite/sprite';



let renderer,camera,scene,ambientLight,pointLight;//全局变量场景。相机，渲染器
function init(){
  //创建一个场景
   scene=new THREE.Scene();

   //添加sphere
  
  //scene.add(sphere);
   //scene.add(torus);
  //scene.add(plane);
 //将雪花添加到场景中
 snowflakes.forEach(snowflake => {
  scene.add(snowflake);
});


// //    // 点光源
pointLight = new THREE.PointLight(0xffffff,1);
scene.add(pointLight);
// pointLight.intensity = 1.0;//光照强度
 pointLight.decay = 0.0;//设置光源不随距离衰减
// //点光源位置
 pointLight.position.set(100, 100, 100);//点光源放在x轴上

//环境光
 ambientLight=new THREE.AmbientLight(0xffffff,0.5);
 scene.add(ambientLight);

  // 创建相机 使用的是 PerspectiveCamera（透视摄像机）
   camera = new THREE.PerspectiveCamera(75, // 视野角度（FOV）
  window.innerWidth / window.innerHeight, // 长宽比（aspect ratio）
  0.1, // 近截面（near）
  1000 // 远截面（far）
  );

  // 设置相机摆放的位置
  camera.position.set(10, 10, 10);
  // 设置相机看向的位置
  camera.lookAt(0,0,0);

  // WebGLRenderer 渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 获取你屏幕对应的设备像素比.devicePixelRatio告诉threejs,以免渲染模糊问题
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x2d2c2c, 1); //设置背景颜色
document.body.appendChild(renderer.domElement);
}

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  if(!renderer) return;
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
     renderer.render(scene, camera); 
    //没有动画的时候需要重新render
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
};

function initHepler(params){
   // 辅助坐标轴
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  // 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
renderer.render(scene, camera); //执行渲染操作
}); //监听鼠标、键盘事件

// 添加一个辅助网格地面 网格地面辅助观察GridHelper
const gridHelper = new THREE.GridHelper(300, 300, 0x004444, 0x004444);
  scene.add(gridHelper);
}



function initStata(){
  //创建stats对象
const stats = new Stats();
//stats.domElement:web页面上输出计算结果,一个div元素，
document.body.appendChild(stats.domElement);
// 渲染函数
function render() {
   //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
   stats.update();
   renderer.render(scene, camera);//执行渲染操作
   requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}
render();
}

function snowanimate(){
  requestAnimationFrame(snowanimate);
 // **让雪花飘落**
  snowflakes.forEach(snowflake => {
      snowflake.position.y -= Math.random() * 0.1; // 随机下降速度

      // 让雪花在水平方向上随机移动
      snowflake.position.x += (Math.random() - 0.5) * 0.05; // 随机左移或右移
      snowflake.position.z += (Math.random() - 0.5) * 0.05; // 随机前后移动

      // 当雪花掉落超出范围时，重新放置到顶部
      if (snowflake.position.y < 0) {
          snowflake.position.y = Math.random() * 10 + 5;
          snowflake.position.x = (Math.random() - 0.5) * 20;
          snowflake.position.z = (Math.random() - 0.5) * 20;
      }
  });
  renderer.render(scene, camera);
}

init();
initHepler();
initStata();
snowanimate();




// 存储默认值
const defaultValues = {
  spherePosition: { x: 0, y: 0, z: 0 },
  sphereMaterial: { color: '#ff0000', transparent: true, opacity: 1, emissive: '#fcfcfc' },
  ambientLight: { color: '#ffffff', intensity: 1 },
  pointLight: { color: '#ffffff', intensity: 1.66, position: { x: 27.6, y: 12.2, z: 23.4 } }
};
//gui控制面板
//10. gui.js 可以化改变三维场景参数 
const gui = new GUI();

// 添加重置按钮
const settings = {
  resetDefaults: function () {
      // 重置立方体位置
      sphere.position.set(defaultValues.spherePosition.x, defaultValues.spherePosition.y, defaultValues.spherePosition.z);
        
      // 重置材质
      sphere.material.color = new THREE.Color(defaultValues.sphereMaterial.color);
     // sphere.material.color.set(defaultValues.sphereMaterial.color); // 设置默认绿色
      sphere.material.transparent = defaultValues.sphereMaterial.transparent;
      sphere.material.opacity = defaultValues.sphereMaterial.opacity;
      sphere.material.emissive.set(defaultValues.sphereMaterial.emissive);
      
      // 重置光源
      ambientLight.color.set(defaultValues.ambientLight.color);
      ambientLight.intensity = defaultValues.ambientLight.intensity;
      pointLight.color.set(defaultValues.pointLight.color);
      pointLight.intensity = defaultValues.pointLight.intensity;
      pointLight.position.set(
          defaultValues.pointLight.position.x,
          defaultValues.pointLight.position.y,
          defaultValues.pointLight.position.z
      );
  }
};
gui.add(settings, 'resetDefaults').name('setDefaults');


const objFolder=gui.addFolder('物体');
const posFolder=objFolder.addFolder('位置');
posFolder.add(sphere.position,'x',-50,50).name('x坐标');
posFolder.add(sphere.position,'y',-50,50).name('y坐标');
posFolder.add(sphere.position,'z',-50,50).name('z坐标');

const matFolder=objFolder.addFolder('材质');
matFolder.addColor({color:'#ffffff'},'color').onChange(value=>{
  sphere.material.color.set(value);
}).name('颜色');
matFolder.add(sphere.material,'transparent').name('是否透明');
matFolder.add(sphere.material,'opacity',0,1).name('透明度');
matFolder.addColor({color:'#fcfcfc'},'color').onChange(value=>{
  sphere.material.emissive.set(value);
}).name('高光');

const lightFolder=gui.addFolder('光源');
const amFolder=lightFolder.addFolder('环境光');
amFolder.addColor({color:'#ffffff'},'color').onChange(value=>{
  ambientLight.color.set(value);
}).name('颜色');
amFolder.add(ambientLight,'intensity',0,3).name('强度');

const pointFolder=lightFolder.addFolder('点光源');
pointFolder.addColor({color:'#ffffff'},'color').onChange(value=>{
  pointLight.color.set(value);
}).name('颜色');
pointFolder.add(pointLight,'intensity',0,3).name('强度');
//pointFolder.add(pointLight,'intensity',0,3).name('强度');

const pointPosFolder = pointFolder.addFolder('位置');
pointPosFolder.add(pointLight.position, 'x', -50, 50).name('x坐标');
pointPosFolder.add(pointLight.position, 'y', -50, 50).name('y坐标');
pointPosFolder.add(pointLight.position, 'z', -50, 50).name('z坐标');

gui.add(settings, 'resetDefaults').name('clear');

 gui.close()
 gui.open()