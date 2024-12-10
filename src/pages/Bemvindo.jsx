import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/bemVindo.module.css";
//import logo from "../assets/logo.png";
//import animation from "../assets/animação.gif"; 

function BemVindo() {
  useEffect(() => {
    document.title = "Bem-vindo ao ToDo list";
    document.body.classList.add(styles.bodyBemVindo);
    return () => {
      document.body.classList.remove(styles.bodyBemVindo);
    };
  }, []);

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Bem-vindo</h1>
      
      <Link to="/login" className={styles.link}>
        Login
        
      </Link>
      
      <Link to="/cadastro" className={styles.link}>
        Cadastro
      </Link>
    </div>
  );
}

export default BemVindo;




