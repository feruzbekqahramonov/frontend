import React from "react";
import styled from "@emotion/styled";
import Main from "../components/Main";
import HomeHeader from "../components/HomeHeader";
function Home() {
  const HomeWrapper = styled.div`
    width: 60%;
    min-height: 100vh;
    background-color: #121212;
  `;
  return (
    <HomeWrapper>
      <HomeHeader></HomeHeader>
      <Main></Main>
    </HomeWrapper>
  );
}

export default Home;
