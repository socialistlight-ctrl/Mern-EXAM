import { NavLink } from "react-router-dom";

export default function TopBar() {
  const cls = ({ isActive }) => `tb-link${isActive ? " on" : ""}`;
  return (
    <header className="topbar">
      <div className="tb-logo">📝 Review Admin</div>
      <nav>
        <NavLink to="/" end className={cls}>Dashboard</NavLink>
        <NavLink to="/new" className={cls}>Add Feedback</NavLink>
      </nav>
    </header>
  );
}   