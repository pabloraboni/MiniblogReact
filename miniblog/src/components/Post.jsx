import React from "react";
import styles from "./Post.module.scss";

import { Link } from "react-router-dom";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";

export const Post = ({ post }) => {

  const imageStyle = {
    backgroundImage: `url("${post.image}")`,
  };

  return (
    <>
      <article className={styles["pr-box__post"]}>
        <div className={styles["pr-post__image"]} style={imageStyle}></div>
        <div className={styles["pr-post__descriptions"]}>
          <h1 className={styles["pr-post__name"]}>{post.title}</h1>
          <p className={styles["pr-post__description"]}>{post.body}</p>
          <div className={styles["pr-post__tags"]}>
            {post.tagsArray && post.tagsArray.map((tag, i) => (
                <span key={i}>#{tag}</span>
              ))
            }
          </div>
        </div>
        <div className={styles["pr-post__footer"]}>
          <div className={styles["pr-post__stats"]}></div>
          <div className={styles["pr-post__buttons"]}>
            <a className={styles["pr-button__icon"]}><RiHeartLine /></a>
            <Link to={`/posts/${post.id}`} className="pr-button --outline">Ler post</Link>
          </div>
        </div>
      </article>
    </>
  );
};
