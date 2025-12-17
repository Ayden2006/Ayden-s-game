// 3D Platformer: Unique Morphing Character on an Island
// Requires Three.js (add <script src="https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.min.js"></script> in your HTML)

let scene, camera, renderer, character, ground;
let keys = {};
let velocity = { x: 0, y: 0, z: 0 };
let canJump = false;

init();
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // sky blue

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 1, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Simple island ground
    ground = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 10, 1, 32),
        new THREE.MeshLambertMaterial({ color: 0x228B22 })
    );
    ground.position.y = -0.5;
    scene.add(ground);

    // Unique morphing character: orb with animated color (placeholder)
    character = new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 24, 24),
        new THREE.MeshPhongMaterial({ color: 0x00ffff, shininess: 100 })
    );
    character.position.set(0, 1, 0);
    scene.add(character);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Input listeners
    window.addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; });
    window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });
    window.addEventListener('resize', onWindowResize);
}

function animate() {
    requestAnimationFrame(animate);
    handleMovement();
    renderer.render(scene, camera);
}

function handleMovement() {
    // Basic left/right/forward/back movement
    let speed = 0.13;
    let moveX = 0, moveZ = 0;
    if (keys['arrowleft'] || keys['a']) moveX -= speed;
    if (keys['arrowright'] || keys['d']) moveX += speed;
    if (keys['arrowup'] || keys['w']) moveZ -= speed;
    if (keys['arrowdown'] || keys['s']) moveZ += speed;

    // Gravity
    velocity.y -= 0.025;
    character.position.x += moveX;
    character.position.z += moveZ;
    character.position.y += velocity.y;

    // Simple ground collision
    if (character.position.y < 1) {
        character.position.y = 1;
        velocity.y = 0;
        canJump = true;
    }

    // Jump
    if ((keys[' '] || keys['space']) && canJump) {
        velocity.y = 0.32;
        canJump = false;
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
