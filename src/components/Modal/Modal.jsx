import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);    
  }
  
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
   if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  }

  render() {
    const {altName, imageURL}=this.props
    return createPortal (
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          <img src={imageURL} alt={altName} />
        </div>
      </div>,
      document.getElementById('modalRoot'),
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  altName: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
};

export default Modal;
