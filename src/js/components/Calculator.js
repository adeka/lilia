import React, { useEffect, Suspense } from "react";

import { useHistory } from "react-router-dom";

import { useRecoilValue, useRecoilState } from "recoil";
import { ageState, eggState, graphState, showResultState } from "JS/atoms";
import { userSelector } from "JS/selectors";

import { Layout, Input, Row, Col, Card, Spin } from "antd";
const { Content } = Layout;
const { Search } = Input;

import { Typography, Divider } from "antd";

const { Title, Paragraph, Text } = Typography;

import { Column, Line } from "@ant-design/charts";

import { Add, Delete, Egg, Literature } from "Icons";
import { Slider } from "antd";
import CountUp from "react-countup";
import GraphPlaceholder from "Assets/graph.png";
import { Select } from "antd";

const { Option } = Select;

import "Styles/calculator.scss";

const euploidMap = {
  36: 0.564,
  37: 0.486,
  38: 0.466,
  39: 0.44,
  40: 0.359,
  41: 0.327,
  42: 0.285,
  43: 0.206,
  44: 0.127
};

const pEuploid = age => {
  return age <= 35 ? 0.574 : euploidMap[age];
};

const pBlast = age => {
  return age < 36
    ? 0.95 * Math.exp(2.8043 - 0.1112 * age)
    : 0.85 * Math.exp(2.8043 - 0.1112 * age);
};

const pLiveBirth = (age, eggs) => {
  return 1 - Math.pow(1 - 0.6 * pEuploid(age) * pBlast(age), eggs);
};

const CalculatorIntro = () => {
  return (
    <div className="intro">
      <Typography>
        <Title>What are the odds?</Title>
        <p>
          Although no number of eggs can guarantee a live birth, we have
          developed a tool to give you insight into egg freezing success rates
          by proving data scientific literature. This calculator uses your age
          at egg retrieval and the number of mature eggs frozen to predict the
          probability of having at least one live birth.
        </p>
      </Typography>
    </div>
  );
};

const CalculatorInputs = () => {
  const [age, setAge] = useRecoilState(ageState);
  const [eggs, setEggs] = useRecoilState(eggState);
  return (
    <div className="inputs-wrapper">
      <div className="inputs">
        <Row>
          <Col span={21}>
            <Typography>
              <Title level={2}>
                Try it out — enter your age and number of eggs frozen{" "}
              </Title>
            </Typography>
          </Col>
        </Row>

        <div className="age-slider">
          <Row>
            <Col span={4}>
              <Title level={3}>Age</Title>
            </Col>
            <Col span={20}>
              <Slider
                value={age}
                min={24}
                max={44}
                onChange={value => setAge(value)}
                tooltipVisible
              />
            </Col>
          </Row>
        </div>
        <div className="egg-slider">
          <Row>
            <Col span={4}>
              <Title level={3}>Mature Eggs</Title>
            </Col>
            <Col span={20}>
              <Slider
                value={eggs}
                min={1}
                max={30}
                onChange={value => setEggs(value)}
                tooltipVisible
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

const LiveBirthResults = () => {
  const age = useRecoilValue(ageState);
  const eggs = useRecoilValue(eggState);

  return (
    <div className="results">
      <div className="egg-icon">{Egg}</div>
      <CountUp
        className="pLiveBirth"
        start={0}
        end={pLiveBirth(age, eggs) * 100}
        duration={1.5}
        separator=" "
        decimals={0}
        decimal="."
        prefix=""
        suffix=" %"
      />
      <Title level={3}>Probability of at least 1 live birth</Title>
    </div>
  );
};

const LiveBirthResultsChart = () => {
  const age = useRecoilValue(ageState);
  const eggs = useRecoilValue(eggState);
  const [graph, setGraph] = useRecoilState(graphState);

  let config = {
    data: []
  };

  let eggsData = [];
  for (let i = 0; i < 31; i++) {
    eggsData = [
      ...eggsData,
      {
        eggs: i,
        pLiveBirth: pLiveBirth(age, i) * 100
      }
    ];
  }

  const eggsConfig = {
    data: eggsData,
    xField: "eggs",
    yField: "pLiveBirth",
    columnStyle: {
      fill: "rgb(224, 164, 121)"
    },
    annotations: [
      {
        type: "region",
        start: xScale => {
          const ratio = xScale.ticks ? 1 / xScale.ticks.length : 1;
          const x = xScale.scale(eggs) - ratio / 2;
          return [`${x * 100}%`, "0%"];
        },
        end: xScale => {
          const ratio = xScale.ticks ? 1 / xScale.ticks.length : 1;
          const x = xScale.scale(eggs) + ratio / 2;
          return [`${x * 100}%`, "100%"];
        },
        style: {}
      },
      {
        type: "text",
        position: [eggs, "max"],
        content: "You",
        style: {
          textAlign: "center",
          position: "relative",
          top: "15px"
        }
      }
    ]
  };

  let ageData = [];
  for (let i = 24; i < 45; i++) {
    ageData = [
      ...ageData,
      {
        age: i,
        pLiveBirth: pLiveBirth(i, eggs) * 100
      }
    ];
  }

  const ageConfig = {
    data: ageData,
    xField: "age",
    yField: "pLiveBirth",
    columnStyle: {
      fill: "rgb(224, 164, 121)"
    },
    annotations: [
      {
        type: "region",
        start: xScale => {
          const ratio = xScale.ticks ? 1 / xScale.ticks.length : 1;
          const x = xScale.scale(age) - ratio / 2;
          return [`${x * 100}%`, "0%"];
        },
        end: xScale => {
          const ratio = xScale.ticks ? 1 / xScale.ticks.length : 1;
          const x = xScale.scale(age) + ratio / 2;
          return [`${x * 100}%`, "100%"];
        },
        style: {}
      },
      {
        type: "text",
        position: [age, "max"],
        content: "You",
        style: {
          textAlign: "center",
          position: "relative",
          top: "15px"
        }
      }
    ]
  };

  return (
    <div className="results-chart">
      {graph == "eggs" && <Column {...eggsConfig} />}
      {graph == "age" && <Column {...ageConfig} />}
      <div className="graph-select">
        {" "}
        <Select
          defaultValue="eggs"
          style={{ width: 240 }}
          onChange={value => {
            setGraph(value);
          }}
        >
          <Option value="eggs">Number of mature eggs</Option>
          <Option value="age">Age</Option>
        </Select>
      </div>
    </div>
  );
};

const CalculatorLiterature = () => {
  return (
    <div className="literature-wrapper">
      <div className="literature">
        <Typography>
          <Title level={2}>Literature</Title>
          <p>
            This calculator was built by referencing an evidence based
            predictive model developed by the following scientific literature:
          </p>

          <Row className="literature-card">
            <Col span={3}>
              <div className="literature-icon">{Literature}</div>
            </Col>
            <Col span={21}>
              <Title level={3}>
                Predicting the likelihood of live birth for elective oocyte
                cryopreservation: a counseling tool for physicians and patients
              </Title>

              <a href="https://academic.oup.com/humrep/article/32/4/853/2968357">
                https://academic.oup.com/humrep/article/32/4/853/2968357
              </a>
            </Col>
          </Row>
        </Typography>
      </div>
    </div>
  );
};

const Calculator = () => {
  const [showResults, setShowResults] = useRecoilState(showResultState);

  return (
    <>
      <CalculatorIntro />
      <CalculatorInputs />
      <div className="show-results">
        {showResults && (
          <>
            <LiveBirthResults />
            <LiveBirthResultsChart />
          </>
        )}
        {!showResults && (
          <div className="results-button-wrapper">
            <button
              className="see-results-button"
              onClick={() => {
                setShowResults(true);
              }}
            >
              See Results
            </button>
            <img className="graph-placeholder" src={GraphPlaceholder} />
          </div>
        )}
      </div>
      <CalculatorLiterature />
    </>
  );
};

export default Calculator;
