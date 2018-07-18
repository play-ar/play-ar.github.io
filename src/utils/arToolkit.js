import cameraData from '../assets/camera_para.dat';
import hiro from '../assets/patt.hiro';
/* globals THREEx */
const {
  ArToolkitSource,
  ArToolkitContext,
  ArMarkerControls,  
} = THREEx;

/**
 * Return an arToolkitContext instance
 * @param {Object} renderer WebGL renderer from three.js
 * @param {Object} camera camera object from three.js
 * @param {Array} onRenderFcts an array of functions to be executed by frame
 */
export const initializeArToolkit = (renderer, camera, onRenderFcts) => {
  ArToolkitContext.baseURL = '../';

  // handle arToolkitSource
  const arToolkitSource = new ArToolkitSource({ sourceType: 'webcam' });
  
  arToolkitSource.init(() => {
    arToolkitSource.onResizeElement(renderer.domElement);
  })

  window.addEventListener("resize", () => {
    arToolkitSource.onResizeElement(renderer.domElement);
  })

  // handle arToolkitContext
  const arToolkitContext = new ArToolkitContext({
		cameraParametersUrl: cameraData,
		detectionMode: 'mono',
  })
  
  arToolkitContext.init(() => {
    camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
  })

  onRenderFcts.push(() => {
		if( arToolkitSource.ready === false )	return
		arToolkitContext.update( arToolkitSource.domElement )
  })
  
  return arToolkitContext;
}

/**
 * Return an arToolkitControls instance
 * @param {Object} arToolkitContext an arToolkitContext instance
 * @param {Object} markerRoot a DOM element for the marker
 */
export const getMarker = (arToolkitContext, markerRoot) => {
  return new ArMarkerControls(arToolkitContext, markerRoot, {
    type : 'pattern',
    patternUrl: hiro,
  })
}



