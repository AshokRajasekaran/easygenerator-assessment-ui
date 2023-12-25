import { ConfigProvider } from "antd";
import React from "react";
import UsercContextProvider from "./usercontext";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: "red"
        },
      }}
    >
      <UsercContextProvider>{children}</UsercContextProvider>
    </ConfigProvider>
  );
}
