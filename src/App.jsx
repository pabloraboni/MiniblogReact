import "./App.scss";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged} from "firebase/auth";//Mapeia autenticação do usuário (se foi feita com sucesso)

//components
import TemplateBoxHeader from "./components/TemplateBoxHeader";
import TemplateBoxFooter from "./components/TemplateBoxFooter";
import Loading from "./components/Loading";

//contexts
import { AuthContextProvider } from "./context/AuthContext";

//hooks
import { useAuthentication } from "./hooks/useAuthentication";

function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();
  const loadingUser = user === undefined;

  useEffect(() => {

    onAuthStateChanged(auth, (user) => { 
      setUser(user)
    })

  },[auth])


  return (
    <>
      <AuthContextProvider value={{user}}>
        <TemplateBoxHeader />
        <div className="pr-container">
          <Outlet />
        </div>
        <TemplateBoxFooter />
      </AuthContextProvider>
      {
        loadingUser && (
          <Loading key={1}/>
        )
      }
    </>
  );
}

export default App;
