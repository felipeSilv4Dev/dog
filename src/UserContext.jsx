import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, SetLogin] = React.useState(null);
  const [loading, SetLoading] = React.useState(false);
  const [error, SetError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(async () => {
    setData(null);
    SetError(null);
    SetLoading(false);
    SetLogin(false);
    window.localStorage.removeItem("token");
  }, []);

  const getUser = async (token) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();

    setData(json);
    SetLogin(true);
  };

  const userLogin = async (username, password) => {
    try {
      SetError(null);
      SetLoading(true);

      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`error: Senha ou Usuário inválido`);
      const { token } = await tokenRes.json();

      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("/conta");
    } catch (err) {
      SetError(err.message);
      SetLoading(false);
    } finally {
      SetLogin(false);
    }
  };

  React.useEffect(() => {
    const autoLogin = async () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          SetError(null);
          SetLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          SetLoading(false);
        }
      } else {
        SetLogin(false);
      }
    };
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, login, error, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
