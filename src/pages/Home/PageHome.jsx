import React from "react";
import styles from "./PageHome.module.scss";
import { Post } from "../../components/Post";

import Alert from "../../components/Alert";
import Loading from "../../components/Loading";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const PageHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();
  const [query, setQuery] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(query){
      navigate(`/search?q=${query}`);
    }
  };

  const { documents: posts, loading, error } = useFetchDocuments("posts");

  if (error) {
    setIsOpen(true);
    setAlert(error);
  }

  return (
    <>
      <div className={styles["pr-page__home"]}>
        <form className="--wd-100" onSubmit={handleSubmit}>
          <div className="--wd-100 --frow-center --fgap-10 pr-box__form">
            <label className="pr-box__input --flex-1">
              <input
                name="search"
                required
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Buscar Post"
              />
            </label>
            <input
              type="submit"
              className="pr-button --outline"
              value="Buscar"
            />
          </div>
        </form>

        <div className={styles["pr-grid__posts"]}>
          {posts &&
            posts.map((post) => (
              <Post key={post.id} post={post} />
            ))
            }
        </div>

        {posts && posts.length === 0 && (
          <div className="--wd-100 --f-center --fgap-20">
            <p>Ainda não há posts cadastrados!</p>
            <Link to="/posts/create" className="pr-button">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
      {isOpen && (
        <Alert key={7} setIsOpen={setIsOpen}>
          <p className="--wd-100">{alert}</p>
        </Alert>
      )}
      {loading && <Loading key={8}></Loading>}
    </>
  );
};

export default PageHome;
