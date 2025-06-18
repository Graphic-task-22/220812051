import * as THREE from "three";

//创建一个样条曲线
const curve=new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100,20,90),
    new THREE.Vector3(-40,80,100),
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(60,-60,0),
    new THREE.Vector3(100,-40,80),
    new THREE.Vector3(150,60,60),
    new THREE.Vector3(100,100,100),
    new THREE.Vector3(0,-80,0),
],true);

const geometry=new THREE.TubeGeometry(curve,100,10,20,true);

const loader=new THREE.TextureLoader();
const texture=loader.load('./src/shuidao3.png');

texture.wrapT = THREE.RepeatWrapping;
texture.wrapS=THREE.RepeatWrapping;

//THREE.SRGBColorSpace='srgb';//设置色彩逼真效果
texture.colorSpace=THREE.SRGBColorSpace;

texture.repeat.set(50, 1);
const material=new THREE.MeshLambertMaterial({
    //color:0xffff00,
        side:THREE.DoubleSide,
        map:texture,
        aoMap:texture
        //wireframe:true,
});
const tunnel=new THREE.Mesh(geometry,material);
// 如果你想加一个简单的动画更新函数（比如让纹理动起来）
export function updatePosition() {
  texture.offset.x -= 0.002; // 让纹理水平滚动，制造流水感
}

export default tunnel;