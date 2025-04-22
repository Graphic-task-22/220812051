import * as THREE from 'three';
import {createNoise2D} from 'simplex-noise';

const noise2D = createNoise2D();
const geometry = new THREE.PlaneGeometry(300, 300, 100, 100);

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color('orange'),
  wireframe: true,
});
const mount = new THREE.Mesh(geometry, material);
mount.rotateX(Math.PI / 2);

export default mount;

export function updatePosition() {
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);

    const z = noise2D(x / 150, y / 150) * 50;
    const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10;

    positions.setZ(i, z + sinNum);
  }
  positions.needsUpdate = true;
}