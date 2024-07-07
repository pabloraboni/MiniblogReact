import React from "react";
import styles from './PageAbout.module.scss'

const PageAbout = () => {
  return (
    <div className="pr-page__content">
      <div className={styles["pr-page__about"]}>
        <div className={styles["pr-about__content"]}>
          <img src="https://cdn.prod.website-files.com/60323d6e5881a62c5b5fd596/6316cdb9196af5be080382c3_p-img.png" className={styles["pr-photo"]}/>
          <div className="--flex-1">
            <h1 className="--fcol --fgap-10">Pablo Rabôni</h1>
            <span>Desenvolvedor Front-end</span>
            <p>Nascido no interior de Minas Gerais, vivi em um vilarejo bem pequeno até os meus 18 anos. Em 2011 ingressei na faculdade de sistemas de Informação pela Universidade Católia de Brasília, e em 2015 consegui o meu diploma.</p>
            <p>Pouco antes da graduação eu já estagiava na área fazendo trabalhos relacionados a Web Designer, e ao longo dos anos e após o término da faculdade fui expandindo cada vez mais meus conhecimentos até que me identifiquei bastante com o front-end.</p>
            <p>Confesso que nunca foi um objetivo claro ser um front-end, mas com base no papel que desempenhava empresa na atual da época, fui pegando gosto pelo trabalho e hoje tento ao máximo aprimorar meus conhecimentos neste ramo.</p>
            <p>Hoje, tenho 7 anos de experiência na área, mas ainda estou em constante evolução, sempre atento às novas tendências do mercado front-end e inovações da tecnologia como um todo.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageAbout;
