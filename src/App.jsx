import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [votes, setVotes] = useState([]);
  const [userVote, setUserVote] = useState({
    emotionality: 5,
    tactility: 7,
    sexuality: 4,
    intellect: 9,
    sociability: 5,
    decisiveness: 6,
  });
  const [showResults, setShowResults] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [userResult, setUserResult] = useState(null);

  const parameters = [
    { name: "Эмоциональность", key: "emotionality" },
    { name: "Тактильность", key: "tactility" },
    { name: "Сексуальность", key: "sexuality" },
    { name: "Интеллект", key: "intellect" },
    { name: "Общительность", key: "sociability" },
    { name: "Решительность", key: "decisiveness" },
  ];

  const determineType = (vote) => {
    const scores = {
      "Секси кошка":
        vote.sexuality * 0.6 +
        vote.decisiveness * 0.3 +
        vote.tactility * 0.5 +
        vote.sociability * 0.3,
      "Нимфетка":
        vote.sexuality * 0.5 +
        vote.emotionality * 0.7 +
        vote.sociability * 0.6 +
        vote.tactility * 0.5,
      "Дерзкая рокерша":
        vote.intellect * 0.3 +
        vote.emotionality * 0.3 +
        vote.sociability * 0.6 +
        vote.decisiveness * 0.5,
    };
    const max = Math.max(...Object.values(scores));
    return Object.keys(scores).find((k) => scores[k] === max);
  };

  const handleInputChange = (key, value) => {
    setUserVote((prev) => ({ ...prev, [key]: parseInt(value) }));
  };

  const handleSubmitVote = () => {
    const result = determineType(userVote);
    setUserResult(result);
    setVotes((prev) => [...prev, { ...userVote, type: result }]);
    setShowResults(true);
  };

  const calculateFinalResult = () => {
    if (votes.length === 0) return null;
    const counts = { "Секси кошка": 0, "Нимфетка": 0, "Дерзкая рокерша": 0 };
    votes.forEach((v) => (counts[v.type] += 1));
    const max = Math.max(...Object.values(counts));
    return Object.keys(counts).find((k) => counts[k] === max);
  };

  useEffect(() => {
    if (showResults && votes.length > 0) {
      setFinalResult(calculateFinalResult());
    }
  }, [votes, showResults]);

  return (
    <div className="page-bg" style={{ backgroundImage: "url('/Андроид 2.png')" }}>
      <div className="wrap">
        <div className="card">
          <div className="card-header">
            <h1 className="title">
              Добро пожаловать в Humanitas Engineering
              <br />
              <span className="subtitle">Создайте своего идеального партнёра</span>
            </h1>
            <p className="lead">Выберите значения для каждого параметра от 1 до 10.</p>
          </div>

          <div className="sliders">
            {parameters.map((p) => (
              <div key={p.key} className="slider-row">
                <label className="slider-label" htmlFor={p.key}>{p.name}</label>
                <div className="slider-control">
                  <input
                    id={p.key}
                    type="range"
                    min="1"
                    max="10"
                    value={userVote[p.key]}
                    onChange={(e) => handleInputChange(p.key, e.target.value)}
                  />
                  <span className="slider-value">{userVote[p.key]}</span>
                </div>
              </div>
            ))}
          </div>

          {!showResults ? (
            <button className="submit-btn" onClick={handleSubmitVote}>
              Отправить голос
            </button>
          ) : (
            <div className="results">
              <div className="result-box green">
                <h3>Ваш результат:</h3>
                <p className="result-text">{userResult}</p>
              </div>
              {finalResult && (
                <div className="result-box blue">
                  <h3>Финальный результат:</h3>
                  <p className="result-text">{finalResult}</p>
                  <p className="muted">Определено на основе голосов {votes.length} участников</p>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="footnote">Голосование проходит анонимно</p>
      </div>
    </div>
  );
};

export default App;

