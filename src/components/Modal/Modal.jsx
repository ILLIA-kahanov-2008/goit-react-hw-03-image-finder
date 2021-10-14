// Описание компонента Modal При клике по элементу галереи должно открываться
// модальное окно с темным оверлеем и отображаться большая версия изображения.
// Модальное окно должно закрываться по нажатию клавиши ESC или по клику на
// оверлее.

// Внешний вид похож на функционал этого VanillaJS-плагина, только вместо белого
// модального окна рендерится изображение (в примере нажми Run). Анимацию делать не
// нужно!

import React from 'react';
import PropTypes from 'prop-types';

Modal.propTypes = {
  
};

function Modal(props) {
  return (
    <div className="Overlay">
  <div className="Modal">
    <img src="" alt="" />
  </div>
</div>
  );
}

export default Modal;

