import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

const styles = {
    button: {
        height: '10rem',
        width: '10rem',
        margin: '0.5rem 0',
    },
    image: {
        height: '9rem',
        width: '9rem',
        margin: '0.5rem',
    },
}
export default class GalleryItem extends Component {
    handleClick = () => {
        this.props.onSelected(this.props.image);
    }
    render() {
        const { image } = this.props;
        return (
            <Button style={styles.button} onClick={this.handleClick}>
                <img style={styles.image} src={image} alt="" />
            </Button>
        );
    }
}