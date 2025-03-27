import * as THREE from "three";
import { roughness } from "three/tsl";


var sphereGeometry=new THREE.SphereGeometry(30,30,30);

const texLoader = new THREE.TextureLoader();
const texture=texLoader.load("./src/assets/gross.jpg");
var sphereMaterial=new THREE.MeshStandardMaterial({  
    map:texture,
    roughness:0.2,//设置粗糙度
    metalness:0.1,//设置金属感
    emissive:new THREE.Color(0x000000),//设置发光颜色
    emissiveIntensity:0.1,//设置发光强度
    shininess:100,//设置镜面反射的光滑强度
});
var sphere=new THREE.Mesh(sphereGeometry,sphereMaterial);

sphere.position.set(0,30,0);
export default sphere;
