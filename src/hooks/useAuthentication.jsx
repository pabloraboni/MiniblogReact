import { db } from "../firebase/config";
import { useNavigate } from 'react-router-dom';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import React, { useEffect, useState } from "react";

export const useAuthentication = () => {

  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup
  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //register
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setMessage(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setMessage("Usuário cadastrado com sucesso");
      setLoading(false);
      return user;
      
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      if (error.message.includes("Password")) {
        setMessage("A senha precisa ter pelo menos 6 caracteres.");
      } else if (error.message.includes("email-already")) {
        setMessage("E-mail já cadastrado.");
      } else {
        setMessage(
          "Ocorreu um erro, por favor tende mais tarde." + error.message
        );
      }

      setLoading(false);

    }
  
  };

  //lougout
  const logout = () =>{
    checkIfIsCancelled();
    signOut(auth);
    navigate("/");
  }

  //login
  const login = async (data) =>{
    checkIfIsCancelled();
    setLoading(true);
    setMessage(false);

    try {

      await signInWithEmailAndPassword(auth, data.email, data.password);
      setMessage("Login efetuado com sucesso");
      setLoading(false);
      return user;

    } catch (error) {
      
      if (error.message.includes("user-not-found")) {
        setMessage("Usuário não encontrado!");
      } else if (error.message.includes("invalid-credential")) {
        setMessage("Senha incorreta!");
      } else if (error.message.includes("invalid-email")) {
        setMessage("Informe um e-mail válido!");
      } else {
        setMessage(
          "Ocorreu um erro, por favor tende mais tarde." + error.message
        );
      }

      setLoading(false);

    }
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, createUser, message, loading, logout, login };
};
