import React, { Component } from 'react';
import MarkerSearch from './MarkerSearch';
import SketchRenderer from './SketchRenderer';

class Sketch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          markerFound: false,

          opacity: 1,

          coordX: 0,
          coordZ: 0,
          scaleX: 2,
          scaleY: 2,
          rotation: 0,

          isDetectingEdge: false,
          blur: 2,
          lowTreshold: 50,
          highTreshold: 20,
        }
    }

    handleMarkerFound = () => {
      this.setState({ markerFound: true })
    }
    

    render() {
        const {
          markerFound,

          opacity,

          coordX,
          coordZ,
          scaleX,
          scaleY,
          rotation,

          isDetectingEdge,
          blur,
          lowTreshold,
          highTreshold,
        } = this.state;

        const {
          image,
          blackImage,
        } = this.props;

        return (
          <div>
            {!markerFound && <MarkerSearch/>}
            <SketchRenderer
              onMarkerFound={this.handleMarkerFound}

              image={image}
              blackImage={blackImage}
              opacity={opacity}

              coordX={coordX}
              coordZ={coordZ}
              scaleX={scaleX}
              scaleY={scaleY}
              rotation={rotation}

              isDetectingEdge={isDetectingEdge}
              blur={blur}
              lowTreshold={lowTreshold}
              highTreshold={highTreshold}
            />
          </div>
        )
    }
}

export default Sketch;