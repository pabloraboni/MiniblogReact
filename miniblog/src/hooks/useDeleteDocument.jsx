import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from 'firebase/firestore';

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {

    switch(action.type){
        case "LOADING":
            return {loading: true, error: null}
        case "DELETED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state;
    }

};

export const useDeleteDocument = (docCollection) => {


//   const [message, setMessage] = useState(null);

  const [response, dispatch] = useReducer(deleteReducer, initialState);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  function checkCancelBeforeDispath(action) {
    if (cancelled) {
      dispatch(action)
    }
  }

  const deleteDocument = async(id) => {

    checkCancelBeforeDispath({type: "LOADING"})

    try {
        
        const deleteDocument = await deleteDoc(doc(db, docCollection, id))

        checkCancelBeforeDispath({
            type: "DELETED_DOC",
            payload: deleteDocument,
        })

        // setMessage("Post excluído com sucesso!")

    } catch (error) {

        checkCancelBeforeDispath({
            type: "ERROR",
            payload: error.message,
        })

        //setMessage("Erro ao excluir o post, por favor tente mais tarde!")
        
    }

  }

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {deleteDocument, response}

};

