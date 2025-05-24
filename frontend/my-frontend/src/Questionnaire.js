import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Questionnaire.css';


function Questionnaire() {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5000";

  useEffect(() => {
    document.title = "Questionnaire | Course Recommender";
    axios.get(${API_BASE_URL}/questions).then((response) => {
      setQuestions(response.data);
    });
  }, [API_BASE_URL]);

  const handleSubmit = () => {

    const unansweredCount = questions.length - Object.keys(responses).length;
    if (unansweredCount > 0) {
      alert(Please answer all ${questions.length} questions. You have ${unansweredCount} left.);
      return;
    }

    const answers = questions.map((q, index) => responses[index] || "");
    axios
      .post(${API_BASE_URL}/recommend, { responses: answers })
      .then((response) => {
        navigate("/result", {
          state: {
            recommended_course: response.data.recommended_course,
            description: response.data.description
          }
        });
      })
      .catch((error) => {
        console.error("Error submitting recommendation:", error);
        alert("Failed to fetch recommendation. Check backend.");
      });

  };

  return (
    <div className="container">
      <h1>Course Recommendation</h1>
      {questions.map((q, index) => (
        <div key={index} className="question-block">
          <p className="question-text">{q.question}</p>
          {q.options.map((option, i) => (
            <label key={i} className="option-label">
              <input
                type="radio"
                name={question-${index}}
                value={option}
                onChange={() => setResponses({ ...responses, [index]: option })}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="submit-btn">Submit</button>
    </div>
  );
};

export default Questionnaire;