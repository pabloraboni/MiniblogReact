import React from "react";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";

import styles from "./PageSearch.module.scss";

import { Post } from "../../components/Post";

const PageSearch = () => {

  const query = useQuery();
  const search = query.get("q")

  const { documents: posts} = useFetchDocuments("posts", search);

  return (
    <>
      <div className={styles["pr-grid__posts"]}>
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </div>

      {posts && posts.length === 0 && (
        <div className="--wd-100 --f-center --fgap-20">
          <p>Não houver resultados para a seua busca!</p>
          <Link to="/" className="pr-button">Voltar</Link>
        </div>
      )}
    </>
  );
};

export default PageSearch;
