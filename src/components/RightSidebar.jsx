import React from "react";
import styled from "@emotion/styled";
import Union from "../assets/Union.svg";
import Union1 from "../assets/Union1.svg";
import Frame from "../assets/Frame.svg";
function RightSidebar() {
  const SidebarRight = styled.div`
    width: 300px;
    min-height: 100vh;
    background-color: black;
    color: #b3b3b3;
  `;
  return (
    <SidebarRight>
      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "#B3B3B3",
          paddingTop: "29px",
          paddingLeft: "20px",
          paddingRight: "20px",
          position: "fixed",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Friend Activity</h1>
          <div style={{ display: "flex", gap: "20px" }}>
            <img
              style={{ cursor: "pointer" }}
              className="w-[32px] h-[32px]"
              src={Union}
              alt=""
            />
            <img
              style={{ cursor: "pointer" }}
              className="w-[32px] h-[32px]"
              src={Union1}
              alt=""
            />
          </div>
        </div>
        <div style={{ marginTop: "15px" }}>
          <div>
            <p style={{ fontSize: "18px" }}>
              Let friends and followers on Spotify see what you’re listening to.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "17px",
            }}
          >
            <img width={162} src={Frame} alt="" />
            <img width={162} src={Frame} alt="" />
            <img width={162} src={Frame} alt="" />
          </div>
          <div>
            <p style={{ fontSize: "18px", marginTop: "15px" }}>
              Go to Settings {">"} Social and enable “Share my listening
              activity on Spotify.’ You can turn this off at any time.
            </p>
          </div>
        </div>
        <div style={{ marginTop: "25px" }}>
          <button className="btn bg-white p-3 w-[100%] text-black rounded-[40px] ">
            SETTINGS
          </button>
        </div>
      </div>
    </SidebarRight>
  );
}

export default RightSidebar;
