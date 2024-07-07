import React from "react";
import styles from "./TemplateBoxFooter.module.scss";

const TemplateBoxFooter = () => {
  return (
    <section className={styles["pr-box__footer"]}>
      <div className="pr-container">
        <div className={styles["pr-footer__content"]}>
          <p>Desenvolvido por RABONI TECNOLOGIA® em 2024, todos os direitos reservados.</p>
          <img src="https://cdn.prod.website-files.com/634e134b3dc3760f4dc570ea/634e3fb6a99d54e3ff938064_p-icon.svg"></img>
        </div>
      </div>
    </section>
  );
};

export default TemplateBoxFooter;
