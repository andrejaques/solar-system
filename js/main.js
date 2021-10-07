// get intern width and height
const W = window.innerWidth;
const H = window.innerHeight;

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 500000);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(W, H);
document.body.appendChild(renderer.domElement);

// Make Canvas Responsive
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight); // Update size
  camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
  camera.updateProjectionMatrix(); // Apply changes
});

// Stats Panel (ms, fps, mb)
const stat = new Stats();
stat.setMode(0);
stat.domElement.style.position = "absolute";
stat.domElement.style.left = "0px";
stat.domElement.style.top = "0px";
document.body.appendChild(stat.domElement);


// text
const debugText = document.createElement("div");
debugText.style.position = "absolute";
debugText.style.left = "15px";
debugText.style.bottom = "5px";
debugText.style.width = "auto";
debugText.style.height = "auto";
debugText.style.fontFamily = "Arial, sans-serif";
debugText.style.weight = "800";
debugText.style.fontSize = "calc(5px + 1vmin)";
debugText.style.color = "#FD9842";
debugText.style.cursor = "pointer";
debugText.onclick= () => window.open('https://github.com/andrejaques','mywindow');
document.body.appendChild(debugText);
debugText.innerHTML = "Solar System Project By Andre Jaques. | Scales (using Earth size as reference) ~=  Sizes: 1:1, Distances: 1:100, Translation Speed: 1:300.000 | Rotation Speed out of scale.";


// variables 
let sunLight, ambientLight, starLight, controls;
let sun, earth, saturn, saturnRings, jupiter, mars, uranus, mercury, venus, neptune, pluto;
let now = Date.now();

function init() {


  // ------ Set the camera position
  camera.position.set(100, 400, 7000);

  // ---- Lights
  // create a point light to the sun
  sunLight = new THREE.PointLight( 0xffffff, 1.5, 50000 );
  // set the sunLight position
  sunLight.position.set(0, 0, 0);

  // set the ambient sunLight 
  ambientLight = new THREE.AmbientLight( 0x404040, 0.4 );

  // add lights to scene
  scene.add(sunLight);
  scene.add(ambientLight);
  // the ambient light position does not matter.

  // add Skybox (background)
  scene.background = new THREE.Color(0x000000);
  const skyboxLoader = new THREE.CubeTextureLoader();
  const skyboxTexture = skyboxLoader.load([
      '/assets/skybox/space-xpos.jpg',
      '/assets/skybox/space-xneg.jpg',
      '/assets/skybox/space-ypos.jpg',
      '/assets/skybox/space-yneg.jpg',
      '/assets/skybox/space-zpos.jpg',
      '/assets/skybox/space-zneg.jpg',
  ]);
  scene.background = skyboxTexture;

  // --------- Create Sun

  // create sun sphere
  let geo = new THREE.SphereGeometry(1400, 50, 25);
  // apply texture to sun
  let mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: new THREE.TextureLoader().load("assets/textures/sun8kH.jpg"),
  });
  sun = new THREE.Mesh(geo, mat);
  // add sun to scene
  scene.add(sun);
  // when not specified, the initial position is 0, 0, 0;

  // -------   Create Earth

  // create earth sphere
  geo = new THREE.SphereGeometry(15, 30, 30);
  // create texture to earth
  mat = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("assets/textures/earth.jpeg"),
  });
  // apply the mesh surface in the material sphere
  earth = new THREE.Mesh(geo, mat);
  // applying to earth block light and cast shadow
  earth.castShadow = true;
  // applying to earth receive the shadow of others planets
  earth.receiveShadow = true;
  // add earth to scene
  scene.add(earth);
  // set the initial position of earth
  earth.position.x = 2915; // 1.5k + earth radius + sun radius // 1:100k (scale to real life) & 1:100 (scale to real life using the earth size as reference)

  // ------ Create Saturn Rings

  function createSaturnRings() {
    const texture = new THREE.TextureLoader().load(
      "assets/textures/saturnRing.png"
    );
    
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: false,
    });
    
    const geometry = new THREE.RingBufferGeometry(135, 260, 1000);

    saturnRings = new THREE.Mesh(geometry, material);
    saturnRings.position.x = 15820;
    saturnRings.rotation.x = 90;
    saturnRings.castShadow = true;
    saturnRings.receiveShadow = true;
    scene.add(saturnRings);
  }
  
  createSaturnRings();

  // ------- Create Saturn 

  geoSat = new THREE.SphereGeometry(120, 45, 60);
  matSat = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("assets/textures/saturn8K.jpg"),
  });
  saturn = new THREE.Mesh(geoSat, matSat);
  scene.add(saturn);
  saturn.position.x = 15820; // 14300 + sun radius + saturn radius

  // ------- Create Jupiter 

  geoSat = new THREE.SphereGeometry(145, 45, 60);
  matSat = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("assets/textures/jupiter8K.jpg"),
  });
  jupiter = new THREE.Mesh(geoSat, matSat);
  scene.add(jupiter);
  jupiter.position.x = 9345; // 7800 + sun radius + jupiter radius

  // ------- Create Mars 

  geoSat = new THREE.SphereGeometry(9, 45, 60);
  matSat = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("assets/textures/mars8K.jpg"),
  });
  mars = new THREE.Mesh(geoSat, matSat);
  scene.add(mars);
  mars.position.x = 3710; // 2300 + sun radius + mars radius

  // ------- Create Uranus 

  geoSat = new THREE.SphereGeometry(52, 45, 60);
  matSat = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("assets/textures/uranus2K.jpg"),
  });
  uranus = new THREE.Mesh(geoSat, matSat);
  scene.add(uranus);
  uranus.position.x = 30150; // 28700 + sun radius + uranus radius

  // ------- Create neptune 

  geoSat = new THREE.SphereGeometry(50, 45, 60);
  matSat = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("assets/textures/neptune2K.jpg"),
  });
  neptune = new THREE.Mesh(geoSat, matSat);
  scene.add(neptune);
  neptune.position.x = 46450; // 45000 + sun radius + neptune radius

  // ------- Create mercury 

  geoSat = new THREE.SphereGeometry(8, 45, 60);
  matSat = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("assets/textures/mercury2K.jpg"),
  });
  mercury = new THREE.Mesh(geoSat, matSat);
  scene.add(mercury);
  mercury.position.x = 1980; // 570 + sun radius + mercury radius

  // ------- Create venus 

  geoSat = new THREE.SphereGeometry(15, 45, 60);
  matSat = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("assets/textures/venus2K.jpg"),
  });
  venus = new THREE.Mesh(geoSat, matSat);
  scene.add(venus);
  venus.position.x = 2515; // 1100 + sun radius + venus radius


  // set the camera control
  controls = new THREE.TrackballControls(camera, renderer.domElement);
};

// starting everything - rendering and rerendering the scene
function render() {
  requestAnimationFrame(render);
  stat.begin();
  // getting the current hour
  now = Date.now();
  
  // Rotation Movement
  sun.rotation.y += 0.0035;
  earth.rotation.y += 0.01;
  saturn.rotation.y += 0.03;
  jupiter.rotation.y += 0.03;
  mars.rotation.y += 0.01;
  uranus.rotation.y += 0.015;
  neptune.rotation.y += 0.013;
  mercury.rotation.y += 0.0004;
  venus.rotation.y += 0.00005;

  // Translation Movement // speed scale 1:300k

  // applying translation to earth
  earth.position.x = 2915 * Math.cos(0.00005 * now); 
  earth.position.z = 2915 * Math.sin(0.00005 * now);
  // applying translation to saturn
  saturn.position.x = 15820 * Math.cos(0.0000017 * now);
  saturn.position.z = 15820 * Math.sin(0.0000017 * now);
  // applying translation to saturnRings
  saturnRings.position.x = 15820 * Math.cos(0.0000017 * now);
  saturnRings.position.z = 15820 * Math.sin(0.0000017 * now);
  // applying translation to jupiter
  jupiter.position.x = 9345 * Math.cos(0.0000042 * now);
  jupiter.position.z = 9345 * Math.sin(0.0000042 * now);
  // applying translation to mars
  mars.position.x = 3710 * Math.cos(0.00003 * now); 
  mars.position.z = 3710 * Math.sin(0.00003 * now);
  // applying translation to uranus
  uranus.position.x = 30150 * Math.cos(0.0000006 * now); 
  uranus.position.z = 30150 * Math.sin(0.0000006 * now);
  // applying translation to neptune
  neptune.position.x = 30150 * Math.cos(0.0000003 * now); 
  neptune.position.z = 30150 * Math.sin(0.0000003 * now);
  // applying translation to mercury
  mercury.position.x = 1980 * Math.cos(0.0002 * now); 
  mercury.position.z = 1980 * Math.sin(0.0002 * now);
  // applying translation to venus
  venus.position.x = 2515 * Math.cos(0.000065 * now); 
  venus.position.z = 2515 * Math.sin(0.000065 * now);

  // updating the constrols to each second.
  controls.update();

  stat.end();
  renderer.render(scene, camera);
};

init();
render();