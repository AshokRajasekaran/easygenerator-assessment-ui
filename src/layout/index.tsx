import { Outlet } from "react-router-dom";

import Styles from './index.module.css';

export default function Layout() {
  return (
    <div className={Styles["app-container"]}>
      <header className={Styles["app-header"]}>Easy Generator Assessment</header>
      <Outlet />
      <footer className={Styles["app-footer"]}>Powered By Candidate: Ashok Rajaekaran</footer>
    </div>
  );
}
