import React from "react";
import styles from "./TemplateBoxHeader.module.scss";
import TemplateNavbar from "./TemplateNavbar";

const TemplateBoxHeader = () => {
  return (
    <section className={styles["pr-box__header"]}>
      <div className="pr-container">
        <div className={styles["pr-header__content"]}>
          <img src="https://assets-global.website-files.com/60323d6e5881a62c5b5fd596/6316c7723c13eda78705db88_p-logo.svg"></img>
          <TemplateNavbar/>
        </div>
      </div>
    </section>
  );
};

export default TemplateBoxHeader;
