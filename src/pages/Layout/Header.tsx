import { Link, useNavigate } from "react-router-dom";
import style from "./layout.module.css"

const Header = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }
  return (
    <header className={style.horizontal}>
      <h1>Todo App</h1>
      <nav>
        <ul className={style.horizontal}>
          <li className={style.link}>
            <Link to="/">Home</Link>
          </li>
          {token ? (
            <>
              <li className={style.link}>
                <Link to="/list">Todos →</Link>
              </li>
              <button onClick={logout}>logout</button>
            </>
          ) : (
            <>
              <li className={style.link}>
                <Link to="/login">Login</Link>
              </li>
              <li className={style.link}>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header