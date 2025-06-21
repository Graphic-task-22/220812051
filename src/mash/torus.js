import * as THREE from "three";

var torusGeometry=new THREE.TorusGeometry(20,10,20);
var torusMaterial=new THREE.MeshPhongMaterial({
    color:0xfffff0,
    opacity:0.8,
    transparent:true,
});
var torus=new THREE.Mesh(torusGeometry,torusMaterial);

torus.position.set(-50,50,-50);
export default torus;
