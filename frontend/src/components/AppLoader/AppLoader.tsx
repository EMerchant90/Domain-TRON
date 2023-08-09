import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Loader.module.css'; // Style your loader component

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles["loader-container"]}>
      <div className={styles["loader"]}></div>
    </div>,
    document.body
  );
};

export default Loader;