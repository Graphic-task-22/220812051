import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import mesh, { updatePosition } from './mesh.js';

const scene = new THREE.Scene();

scene.add(mesh);

const axesHelper = new THREE.AxesHelper(200);
// scene.add(axesHelper);

const width = window.innerWidth;
const height = window.innerHeight;
//  添加光照
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // 更亮环境光
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00ffff, 2, 3000); // 青蓝点光
pointLight.position.set(200, 300, 400);
scene.add(pointLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(100, 200, 100);
scene.add(dirLight);

// 创建相机
const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
camera.position.set(450, 150, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

function render() {
    updatePosition();
    mesh.rotateZ(0.003);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

controls.addEventListener('change', () => {
    console.log(camera.position);
});