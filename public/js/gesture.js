/* globals Hammer */

$(function () {
  console.log("gesture.js");
  
  var model = document.querySelector("#model_yellow_ms");
  var modelEnv = document.querySelector("#model_env_yellow_ms");

  // window.panModel = function () {
  //   console.log('panModel');
  //   model.setAttribute("position", { x: 0.5, y: 0.5, z: 0.5 });
  // }
  
  var hammerDiv = document.querySelector("#hammer-div");
  var hammer = new Hammer(hammerDiv);
  
  
  hammer.get('pinch').set({ enable: true });
  hammer.get('rotate').set({ enable: true });
  hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
  
  hammer.on('panstart', handlePan);
  
  hammer.on('panmove', handlePan);
  
  hammer.on('pinchstart', handlePinch);
  
  hammer.on('pinch', handlePinch);
  
  hammer.on('rotatestart', handleRotate);
  
  hammer.on('rotatemove', handleRotate);

  var initialState = {
    position: {
      x: 0,
      z: 0,
    },
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    }
  }
  
  
  function handlePan(event) {
    if (event.type === 'panstart') {
      $.extend(initialState.position, modelEnv.getAttribute("position"))
    }

    var position = {
      x: initialState.position.x + event.deltaX / 200,
      z: initialState.position.z + event.deltaY / 200,
    }    
    modelEnv.setAttribute("position", position);
  }
  
  function handlePinch(event) {
    if (event.type === 'pinchstart') {
      $.extend(initialState.scale, model.getAttribute("scale"))
    }

    var scale = {
      x: initialState.scale.x * event.scale,
      y: initialState.scale.y * event.scale,
      z: initialState.scale.z * event.scale,
    }
    model.setAttribute("scale", scale);
  }
  
  function handleRotate(event) {
    if (event.type === 'rotatestart') {
      $.extend(initialState.rotation, model.getAttribute("rotation"));
      initialState.rotation.y = initialState.rotation.y + event.rotation;
    }

    console.log(event)

    var rotation = {
      x: initialState.rotation.x,
      y: initialState.rotation.y - event.rotation,
      z:  initialState.rotation.z,
    }
    model.setAttribute("rotation", rotation);
  }
})

