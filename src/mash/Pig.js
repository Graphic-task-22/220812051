import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loaders=new GLTFLoader();
const mesh=new THREE.Group();

loaders.load('./src/gltf/RobotExpressive.gltf',function (gltf) {
    console.log('模型加载成功', gltf);
    mesh.add(gltf.scene);
   const mixer=new THREE.AnimationMixer(gltf.scene);
   const action=mixer.clipAction(gltf.animations[4]);
   action.play();
   function render(params){
    requestAnimationFrame(render);
    mixer.update(0.01);
   }
   render();
    //const obj = gltf.scene.getObjectByName('Cylinder');
    //obj.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  },
  function (xhr) {
    console.log('xhr', xhr);
    console.log((xhr.loaded / xhr.total) * 100 + '% 已加载');
  },
  // 加载失败后的回调函数（可选）
  function (error) {
    console.error('模型加载失败', error);
  }
);

export default xxx;

