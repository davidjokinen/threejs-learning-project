import * as THREE from 'three';
import {OrbitControls} from './libs/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const loadManager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(loadManager);

function createUVScaler(count) {
  const scale = 1/count;
  return function(faceVertexUvs, _x, _y, _face) {
    
    let x = _x * scale + 0;
    let y = -_y * scale + 1 - scale;
    
    const min = 0;
    const max = min + scale;

    const face = ~~(_face*2) || 0;

    faceVertexUvs[ 0 ][ face ][ 0 ].set( min + x, max + y); // upper left quarter
    faceVertexUvs[ 0 ][ face ][ 1 ].set( min + x, min + y);
    faceVertexUvs[ 0 ][ face ][ 2 ].set( max + x, max + y);

    faceVertexUvs[ 0 ][ face + 1 ][ 0 ].set( min + x, min + y);
    faceVertexUvs[ 0 ][ face + 1 ][ 1 ].set( max + x, min + y);
    faceVertexUvs[ 0 ][ face + 1 ][ 2 ].set( max + x, max + y);
  }
}
const setUVs = createUVScaler(10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement );
controls.target.set(0, 0, 0);
controls.update();

const materials = [
  new THREE.MeshBasicMaterial({map: loader.load('./resources/objects.png')}),
  new THREE.MeshBasicMaterial({map: loader.load('./resources/p1.png')}),
];

const color = 0xFFFFFF;
const intensity = 1;
const worldlight = new THREE.AmbientLight(color, 1);
// worldlight.position.set(0, 0, 2);
scene.add(worldlight);

// const color = 0xFFFFFF;
// const intensity = 1;
// const light = new THREE.DirectionalLight(color, intensity);
// light.position.set(0, 0, 2);
// scene.add(light);

const geometry = new THREE.BoxGeometry();
setUVs(geometry.faceVertexUvs, 4, 0);
setUVs(geometry.faceVertexUvs, 5, 0, 1);
setUVs(geometry.faceVertexUvs, 6, 0, 2);
setUVs(geometry.faceVertexUvs, 7, 0, 3);
setUVs(geometry.faceVertexUvs, 3, 0, 4);
setUVs(geometry.faceVertexUvs, 8, 0, 5);

let cube = null;

loader.load('./resources/objects.png', (texture) => {
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    // normalMap: texture,
  });
  cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, -2, 0);
  scene.add(cube);
});
const geometry2 = new THREE.PlaneGeometry( 5, 5 , 10, 10);
const geometry3 = new THREE.PlaneGeometry( 5, 5 );

const map = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,0],
  [0,0,0,1,0,0,0,0,1,0],
  [0,0,0,1,0,0,0,0,1,0],
  [0,0,0,1,2,1,3,3,1,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
]

for(let x=0;x<10;x++) {
  for(let y=0;y<10;y++) {
    const tile = map[y][x];
    switch (tile) {
      case 0:
        setUVs(geometry2.faceVertexUvs, 4, 0, x+y*10);
        break;
      case 1:
        setUVs(geometry2.faceVertexUvs, 2, 0, x+y*10);
        break;
      case 2:
        setUVs(geometry2.faceVertexUvs, 7, 0, x+y*10);
        break;
      case 3:
        setUVs(geometry2.faceVertexUvs, 8, 1, x+y*10);
        break;
    }
    
  }
}

loader.load('./resources/objects.png', (texture) => {
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  
  const material2 = new THREE.MeshPhongMaterial({
      // color: 0xffffFF, 
      // flatShading: true,
      side: THREE.DoubleSide,
      map: texture,
      // aoMapIntensity: .5,
      
    });
  material2.faceVertexUvs = material2.faceVertexUvs;
  const background = new THREE.Mesh( geometry2, material2 );
  background.position.set(0, 0, -2);
  scene.add( background );

  const background2 = new THREE.Mesh( geometry3, material2 );
  background2.position.set(-6, 0, -2);
  scene.add( background2 );
});

camera.position.z = 5;
let TIME = Date.now()
const animate = function () {
  TIME = Date.now()
  requestAnimationFrame( animate );
  if (cube) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }
  

  // light.intensity = Math.sin(TIME/1000)/3+.3;

  renderer.render( scene, camera );
};

animate();




