import * as THREE from "three";

// const points=[
//     new THREE.Vector2(-100,0,0),
//     new THREE.Vector2(-50,150,0),
//     new THREE.Vector2(0,0,50),
//     new THREE.Vector2(100,50,-50),
// ]

 const shape=new THREE.Shape();
shape.lineTo(100,0);
shape.lineTo(100,100);
shape.lineTo(0,100);

const path=new THREE.Path();
path.arc(50,50,20);
shape.holes.push(path);//圆孔

//创建一个几何体
const geometry=new THREE.ShapeGeometry(shape);
const material=new THREE.MeshLambertMaterial({
    color:'pink',
    side:THREE.DoubleSide,
});
const shpark=new THREE.Mesh(geometry,material);
export default shpark;
