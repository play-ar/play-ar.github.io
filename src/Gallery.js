import React from 'react';
import GalleryItem from './GalleryItem';
import Button from '@material-ui/core/Button';

const styles = {
    container: {
        position: 'relative',
        height: '100%',
    },

    gallery: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '0.5rem 0.5rem 2.5rem 0.5rem',
        position: 'relative',
        overflowY: 'scroll',
        height: '100%',
    }
}
const defaultImages = [
    require('./assets/drawing1.png'),
    require('./assets/drawing2.png'),
    require('./assets/drawing3.png'),
    require('./assets/drawing4.png'),
    require('./assets/drawing5.png'),
    require('./assets/drawing6.png'),
    require('./assets/drawing7.png'),
];

const Gallery = ({ images = defaultImages, onClose, onSelected }) => (
    <div style={styles.container}>        
        <Button secondary fullWidth onClick={onClose}>
            Cancel
        </Button>
        <div style={styles.gallery}>        
            {images.map(image => <GalleryItem key={image} image={image} onSelected={onSelected} />)}
        </div>
    </div>
)

export default Gallery;