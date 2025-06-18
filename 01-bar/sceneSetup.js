// sceneSetup.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function initScene() {
  const container = document.body;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(100, 0, 300);
  camera.lookAt(50, 50, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 2.5);
  pointLight.position.set(150, 120, 100);
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0xffffff, 1.8);
  pointLight2.position.set(-100, 80, 80);
  scene.add(pointLight2);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  return { scene, camera, renderer, controls };
}