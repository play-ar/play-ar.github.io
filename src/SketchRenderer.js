import React, {
  Component
} from 'react'
import { initializeArToolkit, getMarker } from './utils/arToolkit';
import initializeRenderer from './utils/initializeRenderer';
import detectEdge from './utils/detectEdge';

/* global THREE */
const { Scene, Camera, Group, PlaneGeometry, Texture, MeshBasicMaterial, DoubleSide, Mesh } = THREE;

export default class SketchRenderer extends Component {
  componentDidMount() {
    const {
      onMarkerFound,
      image,
      opacity,

      rotation,
      coordX,
      coordZ,
      scaleX,
      scaleY,
    } = this.props;

    // Create WebGL renderer
    const renderer = this.renderer = initializeRenderer(this.canvas);

    // Create WebGL scene
    const scene = new Scene();

    // Create WebGL camera
    const camera = new Camera();    
    scene.add(camera);

    // Create WebGL marker
    const markerRoot = new Group();
    scene.add(markerRoot);

    // Create an array for functions to be executed by frame
    const onRenderFcts = [];

    // Create arToolKitContext instance
    const arToolkitContext = initializeArToolkit(this.renderer, camera, onRenderFcts);

    // Create arToolkitControls instance
    const marker = getMarker(arToolkitContext, markerRoot);

    // Bind event listener to the parent
    marker.addEventListener('markerFound', onMarkerFound);

    // start a plane
    const geometry = new PlaneGeometry(1, 1, 1);

    // provide texture
    const texture = new Texture(image);
    texture.needsUpdate = true;

    // create material
    this.material = new MeshBasicMaterial({
      map: texture,
      opacity,
      side: DoubleSide,
      transparent: true,
    });

    // create mesh
    this.mesh = new Mesh(geometry, this.material);
    
    // To have the image in front of us
    this.mesh.rotation.x = - Math.PI / 2;

    // user preference
    this.mesh.rotation.z = rotation;
    this.mesh.position.x = coordX;
    this.mesh.position.z = coordZ;
    this.mesh.scale.x = scaleX;
    this.mesh.scale.y = scaleY;

    // displace the unage at hiro marker
    markerRoot.add(this.mesh);

    // at each frame render, update the scene
    onRenderFcts.push(function(){
      renderer.render(scene, camera);
    });

    // rendering loop
    let lastTimeMsec = null;
    function animate(nowMsec) {
      // keep looping
      requestAnimationFrame(animate);
      // measure time
      lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
      const deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
      lastTimeMsec = nowMsec;
      // call all registered update functions
      onRenderFcts.forEach(onRenderFct => {
          onRenderFct(deltaMsec / 1000, nowMsec / 1000);
      });
    }

    requestAnimationFrame(animate);
  }

  componentWillUnmount() {
    this.renderer.dispose()
  }

  componentDidUpdate() {
    // user preference
    const { coordX, coordZ, scaleX, scaleY, rotation } = this.props;

    this.mesh.position.x = coordX;
    this.mesh.position.z = coordZ;
    this.mesh.scale.x = scaleX;
    this.mesh.scale.y = scaleY;
    this.mesh.rotation.z = rotation;
    this.mesh.needsUpdate = true;

    const { blackImage, image } = this.props;
    const { opacity, isDetectingEdge, blur, lowTreshold, highTreshold } = this.props;

    // We added a way for Trinity to enable edge detection
    if (isDetectingEdge) {
      this.material.opacity = 1;
      const alphaImage = detectEdge(image, { blur, lowTreshold, highTreshold });
      const alphaTexture = new Texture(alphaImage);
      alphaTexture.needsUpdate = true;
      this.material.alphaMap = alphaTexture;
      this.material.map.image = blackImage;
      this.material.map.needsUpdate = true;
    } else {
      this.material.opacity = opacity;
      this.material.alphaMap = null;
      const texture = new Texture(image);
      texture.needsUpdate = true;
      this.material.map = texture;
    }
    this.material.needsUpdate = true;
  }

  render() {
    return ( 
      <canvas ref={canvas => this.canvas = canvas}></canvas>
    )
  }
}