import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

import { routes } from "JS/routes";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import { Layout } from "antd";

import Calculator from "Components/Calculator";
import Header from "Components/Header";
import Footer from "Components/Footer";

const App = props => {
  return (
    <div className="app">
      <RecoilRoot>
        <Calculator />
      </RecoilRoot>
    </div>
  );
};

export default App;
