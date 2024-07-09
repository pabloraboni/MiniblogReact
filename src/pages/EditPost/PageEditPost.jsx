import { Link, useNavigate } from "react-router-dom";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthValue } from "../../context/AuthContext";

import styles from "./PageEditPost.module.scss";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";

const PageEditPost = () => {
  const [showAlert, setShowAlert] = useState();
  const [alert, setAlert] = useState();
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [body, setBody] = useState();
  const [tags, setTags] = useState();

  const {id} = useParams();
  const {user} = useAuthValue(); 
  const { document: post, loading, error } = useFetchDocument("posts", id);
  const { updateDocument, response } = useUpdateDocument("posts");
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      setTags(post.tagsArray.join(", "));
    }
  }, [post]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert("");

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    try {
      new URL(image);
    } catch (error) {
      setAlert("A imagem preisa ser uma url");
    }

    if (response.error) {
      setAlert(response.error);
    }

    if ((!title, !image, !tags, !body)) {
      setAlert("Por favor preencha todos os campos");
    }

    if (alert) {
      setIsOpen(true);
      return;
    }

    const data = { title, image, body, tagsArray, uid: user.uid, createdBy: user.displayName, };

    updateDocument(id,data);

    console.log(id,data);

    navigate("/dashboard");

  };

  if (error) {
    setShowAlert(true);
    setAlert(error);
  }

  return (
    <>
      <div className={styles["pr-page__editPost"]}>
        {post && (
          <>
            <div className={styles["pr-editPost__content"]}>
              <h1>Editar Post</h1>
              <div className="--wd-100 --fcol --torowstart --fgap-20">
                <img src={image} />
                <form
                  className="--flex-1 pr-box__form --fcol --fgap-20"
                  onSubmit={handleSubmit}
                >
                  <label className="pr-box__input --legend-hide">
                    <span>Título</span>
                    <input
                      type="text"
                      name="name"
                      value={title || ""}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="Defina um título para o post"
                    />
                  </label>

                  <label className="pr-box__input --legend-hide">
                    <span>Imagem</span>
                    <input
                      type="text"
                      name="email"
                      value={image || ""}
                      onChange={(e) => setImage(e.target.value)}
                      required
                      placeholder="Url da imagem"
                    />
                  </label>

                  <label className="pr-box__input --legend-hide">
                    <span>Descrição</span>
                    <textarea
                      type="text"
                      name="password"
                      value={body || ""}
                      onChange={(e) => setBody(e.target.value)}
                      required
                      placeholder="Digite uma descrição para o post"
                    ></textarea>
                  </label>

                  <label className="pr-box__input --legend-hide">
                    <span>Tags</span>
                    <input
                      type="text"
                      name="confirmPassword"
                      value={tags || ""}
                      onChange={(e) => setTags(e.target.value)}
                      required
                      placeholder="Crie tags para o post (separadas por vírgula)"
                    />
                  </label>

                  <div className="--wd-100 --frow-centerend --fgap-20">
                    <Link to={"/dashboard"} className="pr-button --outline">
                      Cancelar
                    </Link>
                    <input
                      type="submit"
                      value="Cadastrar"
                      className="pr-button"
                    />
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
      {showAlert && (
        <Alert key={7} setIsOpen={showAlert}>
          <p className="--wd-100">{alert}</p>
        </Alert>
      )}
      {loading && <Loading key={8}></Loading>}
    </>
  );
};

export default PageEditPost;
