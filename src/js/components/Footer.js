import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { userState } from "JS/atoms";

import { Layout, Menu, Avatar, Dropdown } from "antd";

import Logo from "Assets/lilia-light.png";
import "Styles/header.scss";

const AppFooter = props => {
  const history = useHistory();

  return (
    <div className="footer-wrapper">
      <div className="footer">
        <div>You’re a woman if you say you’re a woman</div>
        <div>
          While Lilia’s tests only work for people with ovaries, we recognize,
          love, and support anyone who identifies as a woman
        </div>
        <hr />
        <a href="https://www.hellolilia.com/">
          <img className="logo" src={Logo}></img>
        </a>
      </div>
    </div>
  );
};

export default AppFooter;
