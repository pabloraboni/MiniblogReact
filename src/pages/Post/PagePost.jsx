import React, { useState, useEffect } from "react";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RiHeartLine, RiArrowLeftCircleLine, RiEditLine } from "react-icons/ri";

import styles from "./PagePost.module.scss";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";

const PagePost = () => {
  const { id } = useParams();

  const { document: post, loading, error } = useFetchDocument("posts", id);

  const [showAlert, setShowAlert] = useState();
  const [alert, setAlert] = useState();

  if (error) {
    setShowAlert(true);
    setAlert(error);
  }

  return (
    <>
      {post && (
        <div className={styles["pr-page__post"]}>
          <article className={styles["pr-box__post"]}>
            <img className={styles["pr-post__image"]} src={post.image}></img>
            <div className={styles["pr-post__descriptions"]}>
              <h1 className={styles["pr-post__name"]}>{post.title}</h1>
              <p className={styles["pr-post__description"]}>{post.body}</p>
              <div className={styles["pr-post__tags"]}>
                {post.tagsArray &&
                  post.tagsArray.map((tag, i) => <span key={i}>#{tag}</span>)}
              </div>
              <div className={styles["pr-post__footer"]}>
                <div className={styles["pr-post__stats"]}></div>
                <div className={styles["pr-post__buttons"]}>
                  <a className={styles["pr-button__icon"]}>
                    <RiHeartLine />
                  </a>
                </div>
              </div>
            </div>
          </article>
          <aside className={styles["pr-box__actions"]}>
            <Link to={`/posts/edit/${id}`} className="pr-button --outline --icon">
              <span>
                <RiEditLine />
              </span>
            </Link>
            <Link to="/" className="pr-button --outline --icon">
              <span>
                <RiArrowLeftCircleLine />
              </span>
            </Link>
          </aside>
        </div>
      )}
      {showAlert && (
        <Alert key={7} setIsOpen={showAlert}>
          <p className="--wd-100">{alert}</p>
        </Alert>
      )}
      {loading && <Loading key={8}></Loading>}
    </>
  );
};

export default PagePost;
