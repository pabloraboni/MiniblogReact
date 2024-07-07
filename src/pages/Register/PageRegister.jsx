import styles from "./PageRegister.module.scss";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const PageRegister = () => {

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmePassword] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState("");

  const {createUser, message, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert("");
    const user = {
      displayName, email, password
    }
    if(password !== confirmPassword){
      setIsOpen(true);
      setAlert("As senhas precisam ser iguais");
    }else{
      const res = await createUser(user);
      setIsOpen(true);
      setAlert(message);
      console.log(res);
    }
  }

  useEffect(()=>{
    if(message){
      setAlert(message);
    }
  },[message])

  return (
    <>
      <div className={styles["pr-page__register"]}>
        <div className={styles["pr-register__content"]}>
          <h1>Cadastre-se para postar</h1>
          <p>Crie seu usuário e compartilhe suas histórias</p>
          <form className="pr-box__form --fcol --fgap-20" onSubmit={handleSubmit}>

            <label className="pr-box__input --legend-hide">
              <span>Nome</span>
              <input type="text" name="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required placeholder="Digite seu nome" />
            </label>

            <label className="pr-box__input --legend-hide">
              <span>E-mail</span>
              <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Digite seu e-mail" />
            </label>

            <label className="pr-box__input --legend-hide">
              <span>Senha</span>
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Digite a senha" />
            </label>

            <label className="pr-box__input --legend-hide">
              <span>Confirmação de senha</span>
              <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmePassword(e.target.value)} required placeholder="Confirme a sua senha" />
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
      {loading && <Loading key={8}></Loading>}
    </>
  );
};

export default PageRegister;
