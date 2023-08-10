// console.log("Three Object Here", THREE);
// Scene
const scene = new THREE.Scene(); // create the scene

// Camera
const camera = new THREE.PerspectiveCamera(
    75, // Field of View
    window.innerWidth / window.innerHeight, // Aspect Ratio
    1, // near clipping plane
    1000 // far clipping plane
);
scene.add(camera);
camera.position.z = 5; // move the camera back 5 units

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true}); // for smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1); // background color
document.body.appendChild(renderer.domElement); // add the renderer to our html

// Let there be the Light!
// Ambient Light
let ambientLight = new THREE.AmbientLight(0x101010, 1.0); //color, intensity, dinstance, decay
ambientLight.position = camera.position; // Light follows camera 
scene.add(ambientLight); 

// Directional Light
let sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); // color, intensity
sunLight.position.y = 15;
scene.add(sunLight);

const geometry = new THREE.BoxGeometry(1, 1, 1) // BoxGeometry is the shape of the object
const material = new THREE.MeshBasicMaterial({color: 'blue'}); // color of the object
const cube = new THREE.Mesh(geometry, material); // create cube with geometry and material
scene.add(cube);

// Controls
// Event Listener for when we press the keys
document.addEventListener("keydown", onKeyDown, false);

// Texture of floor
let floorTexture = new THREE.TextureLoader().load('img/Floor.jpg');

// Create the floor plane. 
let planeGeometry = new THREE.PlaneBufferGeometry(50, 50); // BoxGeometry is the shape of the object
let planeMaterial = new THREE.MeshBasicMaterial({
    map: floorTexture,
    side: THREE.DoubleSide,
});

let floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(floorPlane);

// function when a key is pressed, execute this function
function onKeyDown(event){
    let keycode = event.which;

    // right arrow key
    if(keycode === 39){
        camera.translateX(-0.05);
    }
    // left arrow key
    else if(keycode === 37){
        camera.translateX(0.05);
    }
    // up arrow key
    else if(keycode === 38){
        camera.translateY(-0.05);
    }
    // down arrow key
    else if(keycode === 40){
        camera.translateY(0.05);
    }
}

let render = function() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // Render
    renderer.render(scene, camera); // render the scene

    requestAnimationFrame(render);
};

render();

