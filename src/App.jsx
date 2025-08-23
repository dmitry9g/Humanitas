import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [values, setValues] = useState({
    emotionality: 5,
    tactility: 5,
    sexuality: 5,
    intellect: 5,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key, value) => {
    setValues(prev => ({ ...prev, [key]: parseInt(value) }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Тут может быть отправка данных на сервер или сохранение в state
  };

  const parameters = [
    { label: 'Эмоциональность', key: 'emotionality' },
    { label: 'Тактильность', key: 'tactility' },
    { label: 'Сексуальность', key: 'sexuality' },
    { label: 'Интеллект', key: 'intellect' },
  ];

  return (
    <div className="vote-wrapper">
      <div className="vote-container">
        {!submitted ? (
          <>
            <h1>Собери своего андроида</h1>
            <p>Выберите значения для каждого параметра от 1 до 10.</p>

            {parameters.map(param => (
              <div className="slider-group" key={param.key}>
                <label htmlFor={param.key}>{param.label}</label>
                <input
                  type="range"
                  id={param.key}
                  min="1"
                  max="10"
                  value={values[param.key]}
                  onChange={e => handleChange(param.key, e.target.value)}
                />
                <span>{values[param.key]}</span>
              </div>
            ))}

            <button onClick={handleSubmit}>Отправить голос</button>
          </>
        ) : (
          <div className="thank-you">Спасибо за голосование!</div>
        )}
      </div>
    </div>
  );
};

export default App;
