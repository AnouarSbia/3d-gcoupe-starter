import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./style.css";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

// const texture = new THREE.TextureLoader().load("a1.jpg");
// texture.colorSpace = THREE.SRGBColorSpace;

// const geometry = new THREE.BoxGeometry(120, 120, 20);

// const material = new THREE.MeshBasicMaterial({ color: "white", map: texture });
// const cube = new THREE.Mesh(geometry, material);
const loader = new GLTFLoader();
loader.load(
  "residential_window.glb",
  function (gltf) {
    let startX = 0;
    const sword = gltf.scene; // sword 3D object is loaded
    sword.scale.set(100, 100, 100);
    sword.castShadow = true;
    sword.position.y = 4;
    startX += 100;
    sword.castShadow = true;

    document.addEventListener(
      "click",
      function (event) {
        // If the clicked element doesn't have the right selector, bail
        if (!event.target.matches(".click-me")) return;

        // Don't follow the link
        event.preventDefault();

        // Log the clicked element in the console
        const l = prompt("Largeur : ");
        const h = prompt("Hauteur :");
        if (!l || !h) return;
        const sword2 = gltf.scene.clone(); // sword 3D object is loaded
        sword2.scale.set(+l / 10, +h / 10, 100);
        sword2.position.y = 4;
        sword2.position.x = startX;
        startX += +l / 10;
        scene.add(sword2);
      },
      false
    );
    scene.add(sword);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

camera.position.z = 200;
const hemiLight = new THREE.AmbientLight("white", 10);
hemiLight.position.set(1, 1, 1);
scene.add(hemiLight);

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
