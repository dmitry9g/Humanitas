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
        vote.sexuality * 0.4 +
        vote.emotionality * 0.3 +
        vote.tactility * 0.2 +
        vote.sociability * 0.1,
      "Нимфетка":
        vote.sexuality * 0.3 +
        vote.emotionality * 0.3 +
        vote.sociability * 0.2 +
        vote.decisiveness * 0.2,
      "Дерзкая рокерша":
        vote.intellect * 0.4 +
        vote.emotionality * 0.2 +
        vote.sociability * 0.2 +
        vote.decisiveness * 0.2,
    };

    const maxScore = Math.max(...Object.values(scores));
    return Object.keys(scores).find((key) => scores[key] === maxScore);
  };

  const handleInputChange = (key, value) => {
    setUserVote((prev) => ({
      ...prev,
      [key]: parseInt(value),
    }));
  };

  const handleSubmitVote = () => {
    const userResult = determineType(userVote);
    setUserResult(userResult);

    const newVote = {
      ...userVote,
      type: userResult,
    };

    setVotes((prev) => [...prev, newVote]);
    setShowResults(true);
  };

  const calculateFinalResult = () => {
    if (votes.length === 0) return null;

    const counts = {
      "Секси кошка": 0,
      "Нимфетка": 0,
      "Дерзкая рокерша": 0,
    };

    votes.forEach((vote) => {
      counts[vote.type]++;
    });

    const maxCount = Math.max(...Object.values(counts));
    const finalTypes = Object.keys(counts).filter(
      (type) => counts[type] === maxCount
    );

    return finalTypes[0];
  };

  useEffect(() => {
    if (showResults && votes.length > 0) {
      const result = calculateFinalResult();
      setFinalResult(result);
    }
  }, [votes, showResults]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img
          src="/Андроид 2.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-snug text-center">
              Добро пожаловать в Humanitas Engineering
              <br />
              Создайте своего идеального партнёра
            </h1>
            <p className="text-lg text-gray-600">
              Выберите значения для каждого параметра от 1 до 10.
            </p>
          </div>

          <div className="space-y-6">
            {parameters.map((param) => (
              <div key={param.key} className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700">
                  {param.name}
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={userVote[param.key]}
                    onChange={(e) =>
                      handleInputChange(param.key, e.target.value)
                    }
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-xl font-medium text-gray-700 w-8">
                    {userVote[param.key]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {!showResults ? (
            <button
              onClick={handleSubmitVote}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 text-lg"
            >
              Отправить голос
            </button>
          ) : (
            <div className="mt-8 space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Ваш результат:
                </h3>
                <p className="text-2xl font-bold text-green-700">
                  {userResult}
                </p>
              </div>

              {finalResult && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Финальный результат:
                  </h3>
                  <p className="text-2xl font-bold text-blue-700">
                    {finalResult}
                  </p>
                  <p className="text-sm text-blue-600 mt-2">
                    Определено на основе голосов {votes.length} участников
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Голосование проходит анонимно</p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default App;
