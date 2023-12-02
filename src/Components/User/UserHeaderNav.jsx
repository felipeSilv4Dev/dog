import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Adicionar from "../../Assets/adicionar.svg?react";
import Estatisticas from "../../Assets/estatisticas.svg?react";
import MinhasFotos from "../../Assets/feed.svg?react";
import Sair from "../../Assets/sair.svg?react";
import styles from "./UserHeaderNav.module.css";
import UseMedia from "../../Hooks/UseMedia";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);

  const mobile = UseMedia("40rem");
  const [mobileMenu, setMobileMenu] = React.useState(null);

  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => {
            setMobileMenu(!mobileMenu);
          }}
        ></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/conta" end>
          <MinhasFotos /> {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <Estatisticas /> {mobile && "Estatísticas"}
        </NavLink>
        <NavLink to="/conta/postar">
          <Adicionar /> {mobile && "Adicionar Fotos"}
        </NavLink>
        <button
          onClick={() => {
            userLogout();
          }}
        >
          <Sair /> {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
