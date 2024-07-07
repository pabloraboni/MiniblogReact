import React from 'react'
import styles from './PageLogin.module.scss'
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const PageLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState("");

  const {login, message, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert("");
    const user = {
      email, password
    }
    const res = await login(user);
    setIsOpen(true);
    setAlert(message);
  }

  useEffect(()=>{
    if(message){
      setAlert(message);
    }
  },[message])

  return (
    <>
      <div className={styles["pr-page__login"]}>

        <div className={styles["pr-login__content"]}>

          <h1>Login</h1>
          
          <form className="pr-box__form --fcol --fgap-20" onSubmit={handleSubmit}>

            <label className='pr-box__input --legend-hide'>
              <span>E-mail</span>
              <input type='text' name="email" onChange={(e) => setEmail(e.target.value)} required placeholder='Digite seu e-mail' />
            </label>

            <label className='pr-box__input --legend-hide'>
              <span>Senha</span>
              <input type='password' name="password" onChange={(e) => setPassword(e.target.value)} required placeholder='Digite a senha' />
            </label>

            <div className='--wd-100 --frow-centerend'>
              <input type='submit' value="Login" className='pr-button'/>
            </div>

          </form>

        </div>

      </div>
      {isOpen && (
        <Alert key={7} setIsOpen={setIsOpen}>
          <p className="--wd-100">{alert}</p>
        </Alert>
      )}
      {loading && <Loading key={8}></Loading>}
    </>
  )
}

export default PageLogin