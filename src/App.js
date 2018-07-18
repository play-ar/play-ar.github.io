import React, { Component } from 'react';
import FileSelection from './FileSelection';
import Sketch from './Sketch';

const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        fontFamily: "'Roboto', sans-serif",
    },
};

class App extends Component {
    state = {
        image: null,
    };

    handleFileSelected = ({ image, whiteImage, blackImage }) => {
        this.setState({ image, whiteImage, blackImage });
    }

    render() {
        const { image, whiteImage, blackImage } = this.state;

        return (
            <div style={styles.container}>
                {!image && <FileSelection onFileSelected={this.handleFileSelected} />}
                {image && <Sketch image={image} whiteImage={whiteImage} blackImage={blackImage} />}
            </div>
        )
    }
}

export default App;