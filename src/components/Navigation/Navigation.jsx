import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const linkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink className={linkClass} to="/">
        Home
      </NavLink>
      <NavLink className={linkClass} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
}
