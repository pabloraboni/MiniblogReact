import React from 'react'
import styles from './PageCreatePost.module.scss'
import { useNavigate } from 'react-router-dom';

import Alert from "../../components/Alert";
import Loading from "../../components/Loading";

import { useState, useEffect } from "react";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from '../../hooks/useInsertDocument';


const PageCreatePost = () => {

  const navigate = useNavigate();

  const {user} = useAuthValue();
  const {insertDocument, response} = useInsertDocument("posts");


  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert("");

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    try {     
      new URL (image);
    } catch (error) {
      setAlert("A imagem preisa ser uma url");
    }

    if(response.error){      
      setAlert(response.error)
    }

    if(!title, !image, !tags, !body){
      setAlert("Por favor preencha todos os campos");
    }

    if(alert){
      setIsOpen(true);
      return
    }

    insertDocument({
      title, image, body, tagsArray, uid: user.uid, createdBy: user.displayName
    })

    navigate("/");

  }

  // useEffect(()=>{
  //   if(message){
  //     setAlert(message);
  //   }
  // },[message])

  return (
    <>
      <div className={styles["pr-page__createPost"]}>
        <div className={styles["pr-createPost__content"]}>
          <h1>Criar Post</h1>
          <form className="pr-box__form --fcol --fgap-20" onSubmit={handleSubmit}>

            <label className="pr-box__input --legend-hide">
              <span>Título</span>
              <input type="text" name="name" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Defina um título para o post" />
            </label>

            <label className="pr-box__input --legend-hide">
              <span>Imagem</span>
              <input type="text" name="email" value={image} onChange={(e) => setImage(e.target.value)} required placeholder="Url da imagem" />
            </label>

            <label className="pr-box__input --legend-hide">
              <span>Descrição</span>
              <textarea type="text" name="password" value={body} onChange={(e) => setBody(e.target.value)} required placeholder="Digite uma descrição para o post"></textarea>
            </label>

            <label className="pr-box__input --legend-hide">
              <span>Tags</span>
              <input type="text" name="confirmPassword" value={tags} onChange={(e) => setTags(e.target.value)} required placeholder="Crie tags para o post (separadas por vírgula)" />
            </label>

            <div className="--wd-100 --frow-centerend --fgap-20">
              <input type="button" value="Cancelar" className="pr-button --outline" />
              <input type="submit" value="Cadastrar" className="pr-button" />
            </div>
          </form>
        </div>
      </div>
      {isOpen && (
        <Alert key={7} setIsOpen={setIsOpen}>
          <p className="--wd-100">{alert}</p>
        </Alert>
      )}
      {response.loading && <Loading key={8}></Loading>}
    </>
  )
}

export default PageCreatePost