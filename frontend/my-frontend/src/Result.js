import React from "react";
import { useLocation } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const { recommended_course, description } = location.state || {};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Recommended Course</h1>
      {recommended_course ? (
        <>
          <h2>{recommended_course}</h2>
          <p><strong>About the course:</strong> {description}</p>
        </>
      ) : (
        <p>No recommendation available</p>
      )}
    </div>
  );
}

export default Result;
