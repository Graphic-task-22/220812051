import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
//1.如果方的话，100，100修改成300，300,增加细数数量
const geometry = new THREE.PlaneGeometry(3000, 3000, 300, 300);

const noise2D = createNoise2D();

export function updatePosition() {
  const positions = geometry.attributes.position;
  const colors=[];//添加颜色数组
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);

    const z = noise2D(x / 300, y / 300) * 50;
    const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10;

    const finalZ = z + sinNum; // ✅ 这里定义了 finalZ

    positions.setZ(i, finalZ);

    //设置颜色
    const color=new THREE.Color();
    color.setHSL(0.6, 1.0, THREE.MathUtils.clamp((finalZ + 50) / 100, 0, 1));
    colors.push(color.r, color.g, color.b);
  }
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  positions.needsUpdate = true;
}
//2.改材质从 MeshBasicMaterial 替换成 MeshStandardMaterial（支持光照、反射等）跟真实,并开启顶点颜色，渐变，
const material = new THREE.MeshStandardMaterial({
  //color: new THREE.Color('orange'),
  //wireframe: true,
  vertexColors: true, // 顶点颜色生效
  wireframe: false,//网格去掉
  flatShading: false,//3.产生光滑过渡效果，去掉棱角
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-Math.PI / 2);
console.log(mesh);

export default mesh;
