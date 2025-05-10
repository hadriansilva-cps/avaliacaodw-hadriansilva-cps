import styles from './Navbar.module.css'
import { useAuthValue } from "../context/AuthContext";
import { NavLink } from "react-router-dom"

const Navbar = () => {
  const { user } = useAuthValue();
    return(
      <nav className={styles.Navbar}>
        <ul className={styles.links_list}>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.brand}>
            <span>life</span>
            </NavLink>
          </li>

          {!user && (
            <>
              <li>
                  <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : styles.link}>
                    Login
                  </NavLink>
              </li>
              <li>
                <NavLink to ="/register" className={({ isActive }) => isActive ? styles.active : styles.link}>                
                  Register
                </NavLink>
              </li>

            </>
          )}

         {user && (
          <>
           <li>
            <NavLink to="/dashboard" className={({ isActive}) => isActive ? styles.active : styles.link}>
                Dashboard
            </NavLink>
           </li>

           <li>
            <NavLink to="/create-post" className={({ isActive }) => isActive ? styles.active : styles.link}>
                Nova Postagem
            </NavLink>
           </li>

            <li>
              <button className={styles.exit}>Sair</button> 
            </li>

          </>
         )

         }
        </ul>

      </nav>
    )
  }

export default Navbar;