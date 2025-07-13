import * as THREE from "three";

const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = -40;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("app"),
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Geometry & Material
//adding shapes from csv here, using a loop
//fetch shape_data.csv, then parse it into shape we can easily use(making it an array I think)
fetch("shape_data.csv")
  .then(res => res.text())
  .then(csvText => {
    const rows = csvText.trim().split("\n");
    const headers = rows[0].split(",");

    const shapeData = rows.slice(1).map(row => {
      const values = row.split(",");
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = isNaN(values[i]) ? values[i] : parseFloat(values[i]);
      });
      return obj;
    });
//a loop to grab the shapes and create them
    shapeData.forEach(({ geom, x, y, z }) => {
      let geometry;

      switch (geom.toLowerCase()) {
        case "cone":
          geometry = new THREE.ConeGeometry(1, 2, 16);
          break;
        case "box":
          geometry = new THREE.BoxGeometry(2, 2, 2);
          break;
        case "cylinder":
          geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
          break;
        default:
          console.warn(`Unknown shape: ${geom}`);
          return;
      }

      const material = new THREE.MeshStandardMaterial({
          color: 0xff9900,
          metalness: 0.3,
        roughness: 0.5,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      scene.add(mesh);
    });
  });



//cube
const cube = new THREE.BoxGeometry(1,2,2);
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  metalness: 0.5,
  roughness: 0.5,
});
const cubePlacement = new THREE.Mesh(cube, cubeMaterial);
cubePlacement.position.x = 1;
cubePlacement.position.y = 5;
scene.add(cubePlacement);

//doughnut
const torus = new THREE.TorusGeometry(2, 0.4, 16, 100);
const torusmaterial = new THREE.MeshStandardMaterial({
  color: 0xFFFF00, 
  metalness: 0,
  roughness: 0,
});
const torusPlacement = new THREE.Mesh(torus, torusmaterial);
torusPlacement.position.x = 4;
torusPlacement.position.y =1;
scene.add(torusPlacement);


//ball
const ball = new THREE.SphereGeometry(1, 15, 15)
const ballmaterial = new THREE.MeshStandardMaterial( {
  color: 0xFF00FF,
  metalness: 0, 
  roughness: 0,
});
const ballPlacement = new THREE.Mesh(ball, ballmaterial);
ballPlacement.position.x = 7;
ballPlacement.position.y = 1;
scene.add(ballPlacement);


//ambient light,  no light position since it's ambient
const ambientlight = new THREE.AmbientLight(0xffe5b4, .5);
scene.add(ambientlight);

renderer.render(scene, camera)


let zPos = -10;
//Animating rotating
function animate() {
  requestAnimationFrame(animate);
  cubePlacement.rotation.y += 0.01;
  cubePlacement.rotation.x += 0.01;

  ballPlacement.rotation.y += 0.01;
  ballPlacement.rotation.x += 0.01;


//animating the ball to go thru doughnut loop
  zPos += .05;
  ballPlacement.position.set(4, 1, zPos);
  //going back and forth
  if (zPos > 5) zPos = -5;

  controls.update();
  renderer.render(scene, camera)
}



//user controls: 
import { OrbitControls } from "three-stdlib";
const controls = new OrbitControls(camera, renderer.domElement);
animate();