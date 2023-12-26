import { Outlet } from "react-router-dom";

import Styles from "./index.module.css";
import { Header } from "antd/es/layout/layout";
import { Button, Col, Row } from "antd";
import { BookOutlined, LogoutOutlined } from "@ant-design/icons";
import { useUserContext } from "../context/usercontext";

export default function Layout() {
  const { isLoggedIn, setUser } = useUserContext();
  return (
    <div className={Styles["app-container"]}>
      <Header className={Styles["app-header"]}>
        <Row align="middle" gutter={20}>
          <Col>
            <BookOutlined className={Styles["app-icon"]} />
          </Col>
          <Col>
            <h1> Easy Generator Assessment</h1>
          </Col>
        </Row>
        {isLoggedIn && (
          <Button
            type={"default"}
            icon={<LogoutOutlined />}
            onClick={() => {
              setUser(null);
            }}
          >
            Logout
          </Button>
        )}
      </Header>
      <Outlet />
      <footer className={Styles["app-footer"]}>
        Powered By Candidate: Ashok Rajaekaran
      </footer>
    </div>
  );
}
