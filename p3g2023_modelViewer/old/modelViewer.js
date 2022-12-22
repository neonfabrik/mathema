let scene, camera, renderer;
let controls;

let vidElement, videoTexture;

//Get URL Query Parameter (i.e. http://example.com/?v=x.mp4)
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let vidSrc = params.v; 

//Set the video DOM Element src to the query
vidElement = document.getElementById("vidElement");
vidElement.src = vidSrc;
vidElement.controls = true;

//Scene setup
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(50, 2, 1, 1000);
renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("canvas")
});

// camera setup
camera.position.z = 30;

// orbit controls setup
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;

const directionalLight = new THREE.DirectionalLight( 0xffffff, 5.5 );
scene.add( directionalLight );

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );


//Create Video Texture from DOM Element.
videoTexture = new THREE.VideoTexture(vidElement);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBAFormat;
videoTexture.flipY = false;

//Load 3d-model
const loader = new THREE.GLTFLoader();
loader.load(
    'model_05.glb',
    function (gltf) {
        scene.add( gltf.scene );
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.asset; // Object

        //Replace the screen's emission map by video texture.
        scene.getObjectByName("Scene").getObjectByName("LED_R").material.emissiveMap = videoTexture;
    },
    // called while loading is progressing
    function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

        console.log( 'An error happened' );

    }
);


function render() {
    resizeCanvasToDisplaySize();
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  var URL = window.URL || window.webkitURL
  var displayMessage = function (message, isError) {
    var element = document.querySelector('#message')
    element.innerHTML = message
    element.className = isError ? 'error' : 'info'
  }

  var playSelectedFile = function (event) {
    var file = this.files[0];
    var type = file.type;
    var videoNode = document.getElementById("vidElement");
    var canPlay = videoNode.canPlayType(type);
    if (canPlay === '') canPlay = 'no';
    var message = 'Can play type "' + type + '": ' + canPlay;
    var isError = canPlay === 'no';
    displayMessage(message, isError);

    if (isError) {
      return
    }

    var fileURL = URL.createObjectURL(file)
    videoNode.src = fileURL
  }
  
  var inputNode = document.getElementById("fileSelector");
  inputNode.addEventListener('change', playSelectedFile, false);

render();

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
        // you must pass false here or three.js sadly fights the browser
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // update any render target sizes here
    }
}



