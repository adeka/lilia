import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { userState } from "JS/atoms";

import { Layout, Menu, Avatar, Dropdown } from "antd";
const { Header } = Layout;

import Logo from "Assets/lilia.png";
import "Styles/header.scss";

const AppHeader = props => {
  const history = useHistory();

  return (
    <Header className="header">
      <a href="https://www.hellolilia.com/">
        <img className="logo" src={Logo}></img>
      </a>
    </Header>
  );
};

export default AppHeader;
