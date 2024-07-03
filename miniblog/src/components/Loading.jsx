import React from "react";
import styles from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles["pr-box__loading"]}>
      <div className={styles["loadingio-spinner-pulse"]}>
        <div className={styles["ldio"]}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
