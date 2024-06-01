import LeftSidebar from "../components/LeftSidebar";
import React, { useEffect, useState } from "react";


import RightSidebar from "../components/RightSidebar";
import styled from "@emotion/styled";

function Layout({ children }) {
  const LayoutWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
  `;
  return (
    <>
      <LayoutWrapper>
        <LeftSidebar />
        {children}
        <RightSidebar />
      </LayoutWrapper>
    </>
  );
}

export default Layout;
