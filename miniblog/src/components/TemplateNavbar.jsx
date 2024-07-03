import React from 'react'
import styles from './TemplateNavbar.module.scss';
import { NavLink } from 'react-router-dom';

//icons
import { RiLogoutCircleLine } from "react-icons/ri";

//hooks
import { useAuthentication } from '../hooks/useAuthentication';

//contexts
import { useAuthValue } from '../context/AuthContext';

const TemplateNavbar = () => {

  const {user} = useAuthValue();

  const {logout} = useAuthentication();

  return (
    <nav className={styles["pr-box__menu"]}>
        <NavLink to="/" className={styles["pr-menu__item"]}>Home</NavLink>
        <NavLink to="/about" className={styles["pr-menu__item"]}>Sobre</NavLink>
        {
          !user && (
            <>
              <NavLink to="/login" className={styles["pr-menu__item"]}>Login</NavLink>
              <NavLink to="/register" className={styles["pr-menu__item"]}>Cadastrar</NavLink>
            </>
        )
        }
        {
          user && (
            <>
              <NavLink to="/dashboard" className={styles["pr-menu__item"]}>Dashboard</NavLink>
              <button onClick={logout} className={styles["pr-menu__item"]}><RiLogoutCircleLine/></button>
            </>
        )
        }
    </nav>
  )
}

export default TemplateNavbar