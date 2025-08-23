import React, { useState, useEffect } from "react";
import './App.css';

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
      "Секси кошка": vote.sexuality * 0.4 + vote.emotionality * 0.3 + vote.tactility * 0.2 + vote.sociability * 0.1,
      "Нимфетка": vote.sexuality * 0.3 + vote.emotionality * 0.3 + vote.sociability * 0.2 + vote.decisiveness * 0.2,
      "Дерзкая рокерша": vote.intellect * 0.4 + vote.emotionality * 0.2 + vote.sociability * 0.2 + vote.decisiveness * 0.2,
    };

    const maxScore = Math.max(...Object.values(scores));
    return Object.keys(scores).find(key => scores[key] === maxScore);
  };

  const handleInputChange = (key, value) => {
    setUserVote(prev => ({
      ...prev,
      [key]: parseInt(value)
    }));
  };

  const handleSubmitVote = () => {
    const userResult = determineType(userVote);
    setUserResult(userResult);

    const newVote = {
      ...userVote,
      type: userResult
    };

    setVotes(prev => [...prev, newVote]);
    setShowResults(true);
  };

  const calculateFinalResult = () => {
    if (votes.length === 0) return null;

    const counts = {
      "Секси кошка": 0,
      "Нимфетка": 0,
      "Дерзкая рокерша": 0
    };

    votes.forEach(vote => {
      counts[vote.type]++;
    });

    const maxCount = Math.max(...Object.values(counts));
    const finalTypes = Object.keys(counts).filter(type => counts[type] === maxCount);

    return finalTypes[0];
  };

  useEffect(() => {
    if (showResults && votes.length > 0) {
      const result = calculateFinalResult();
      setFinalResult(result);
    }
  }, [votes, showResults]);

  return (
    <div className="main-wrapper">
      {/* Фоновое изображение */}
      <div className="background-image">
        <img 
          src="/Андроид 2.png" 
          alt="Фон с андроидом" 
          className="background-img"
        />
      </div>

      <div className="content">
        <div className="card">
          <div className="header">
            <h1>Собери своего андроида</h1>
            <p>Выберите значения для каждого параметра от 1 до 10.</p>
          </div>

          <div className="sliders">
            {parameters.map((param) => (
              <div key={param.key} className="slider-group">
                <label>{param.name}</label>
                <div className="slider-row">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={userVote[param.key]}
                    onChange={(e) => handleInputChange(param.key, e.target.value)}
                  />
                  <span>{userVote[param.key]}</span>
                </div>
              </div>
            ))}
          </div>

          {!showResults ? (
            <button onClick={handleSubmitVote}>
              Отправить голос
            </button>
          ) : (
            <div className="results">
              <div className="result-box">
                <h3>Ваш результат:</h3>
                <p className="highlight">{userResult}</p>
              </div>

              {finalResult && (
                <div className="result-box">
                  <h3>Финальный результат:</h3>
                  <p className="highlight">{finalResult}</p>
                  <p className="note">
                    Определено на основе голосов {votes.length} участников
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <p className="footer-note">Голосование проходит анонимно</p>
      </div>
    </div>
  );
};

export default App;
