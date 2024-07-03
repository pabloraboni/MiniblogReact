import React, { useState } from 'react'
import styles from './Alert.module.scss' 


const Alert = ({children, setIsOpen}) => {
  return (
    <>
      <div className={styles["pr-alert__component"]}>
        <div className={styles["pr-alert__content"]}>
          <span className={styles["pr-alert__icon"]}></span>
          <div className={styles["pr-alert__p"]}>{children}</div>
          <a className={styles["pr-alert__close"]} onClick={() => setIsOpen(false)}></a>
        </div>
      </div>
    </>
  )
}

export default Alert