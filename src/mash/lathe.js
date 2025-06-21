import * as THREE from "three";
import { color } from "three/tsl";
import { LineBasicMaterial } from "three/webgpu";

const points=[
    new THREE.Vector2(20,20),
    new THREE.Vector2(50,50),
    new THREE.Vector2(20,80),
    new THREE.Vector2(100,150),
]
const geometry=new THREE.LatheGeometry(points,18);
const material=new THREE.MeshBasicMaterial({
    color:'pink',
    side:THREE.DoubleSide,
});

const lathe=new THREE.Mesh(geometry,material);
const geometry2=new THREE.BufferGeometry();
geometry2.setFromPoints(points);
const material2=new THREE.PointsMaterial({
    color:new THREE.Color('blue'),
    size:10
});
const points2=new THREE.Points(geometry2,material2);
lathe.add(points2);

const line2=new THREE.Line(geometry2,new THREE.LineBasicMaterial(
    {
        color:'blue',
        linewidth:2,
    }
));
lathe.add(line2);
export default lathe;
