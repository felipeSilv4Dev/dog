import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";
import { UserContext } from "../../UserContext";
import styles from "./Login.module.css";
import NotFound from "../NotFound";
import Loading from "../Helper/Loading";

const Login = () => {
  const { login, data } = React.useContext(UserContext);

  if (login) {
    return <Navigate to="/conta" />;
  }

  if (data) return <Loading />;

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPasswordLost />} />
          <Route path="resetar" element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <iframe
        src="https://drive.google.com/file/d/1SDF-B5eKz3Zap-Ki10ipT717HJrwy-GA/preview"
        width="640"
        height="480"
        allow="autoplay"
      ></iframe>
    </section>
  );
};

export default Login;
