import React from "react";
import styles from "./PageDashboard.module.scss";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

//components
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";

//hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { RiDeleteBin6Line, RiEditLine, RiListView } from "react-icons/ri";

const PageDashboard = () => {
  
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState("");

  const { user } = useAuthValue();

  const { documents: posts, loading, error} = useFetchDocuments("posts", null, user.uid);
  const { deleteDocument, message } = useDeleteDocument("posts");

  if (error) {
    setShowAlert(true);
    setAlert(error);
  }

  return (
    <>
      <div className="pr-page__content">
        <div className={styles["pr-page__dashboard"]}>
          <div className={styles["pr-dashboard__content"]}>
            <div className="--wd-100 --frow-center">
              <h1 className="--flex-1">Dashboard</h1>
              <NavLink to="/posts/create" className="pr-button">
                Criar Post
              </NavLink>
            </div>
            <table className="pr-table --alignleft">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Título</th>
                  <th>Criado por</th>
                  <th style={{ width: "50px" }}></th>
                </tr>
              </thead>
              <tbody>
                {posts &&
                  posts.map((post, i) => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.createdBy}</td>
                      <td>
                        <div className="--wd-100 --frow-center --fgap-10">
                          <button
                            className="pr-button__table --negative"
                            onClick={() => deleteDocument(post.id)}
                          >
                            <span>
                              <RiDeleteBin6Line />
                            </span>
                          </button>
                          <Link
                            to={`/posts/edit/${post.id}`}
                            className="pr-button__table"
                          >
                            <RiEditLine />
                          </Link>
                          <Link
                            to={`/posts/${post.id}`}
                            className="pr-button__table"
                          >
                            <RiListView />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {loading && <Loading key={1}></Loading>}
      {showAlert && (
        <Alert key={7} setIsOpen={setShowAlert}>
          <p className="--wd-100">{alert}</p>
        </Alert>
      )}
    </>
  );
};

export default PageDashboard;
