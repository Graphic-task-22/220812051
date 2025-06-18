import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import snowflakes from './sprite.js';

const scene = new THREE.Scene();

 //将雪花添加到场景中
 snowflakes.forEach(snowflake => {
  scene.add(snowflake);
});

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
camera.position.set(40, 40, 30);
camera.lookAt(0, 0, 0);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// 控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => {
    // console.log(camera.position); // 调试时可用，完成后注释
});

// 雪花动画更新
function updateSnowflakes() {
    snowflakes.forEach(snowflake => {
        snowflake.position.y -= Math.random() * 0.1;
        snowflake.position.x += (Math.random() - 0.5) * 0.05;
        snowflake.position.z += (Math.random() - 0.5) * 0.05;

        if (snowflake.position.y < 0) {
            snowflake.position.y = Math.random() * 50 + 10;
            snowflake.position.x = (Math.random() - 0.5) * 100;
            snowflake.position.z = (Math.random() - 0.5) * 100;
        }
    });
}

// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    updateSnowflakes();
    renderer.render(scene, camera);
}

animate();

// 自适应窗口大小
window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
});
