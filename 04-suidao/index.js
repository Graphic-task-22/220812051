import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import tunnel, { updatePosition } from './tunnel.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000010);

scene.add(tunnel);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(450, 150, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// 光源
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(100, 200, 100);
scene.add(directionalLight);

// 控制器（如果自动相机运动，建议禁用）
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;  // 关闭手动控制

let i=0;
const curve = tunnel.geometry.parameters.path;
const tubePoints = curve.getPoints(500);// 曲线采样越多越平滑
function tubeanimate(){
  if(i<tubePoints.length-1){
    const point=tubePoints[i];
    const nextPoint = tubePoints[i + 1];

    camera.position.copy(point);
    camera.lookAt(nextPoint);
    i++;
  }
  else{
    i=0; // 循环播放
  }
  renderer.render(scene,camera);
  requestAnimationFrame(tubeanimate)
}
tubeanimate();
controls.addEventListener('change', () => {
  console.log(camera.position);
});