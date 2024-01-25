"use client";

import { useState } from "react";

export default function SecretShopper() {
  const [responses, setResponses] = useState({
    q1: "",
  });

  const handleInputChange = (e) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      <form onSubmit={"handleSubmit"}>
        {/* Create reuseable components that render Yes/No, multiple choice questions, and text inputs
        then map over an array of questions/available responses with type to inidicate which component to use */}
        {/* legend and fieldset for all questions */}
        <legend>Is this working?</legend>
        <fieldset>
          <input
            id="yes"
            name="q1"
            value={"Yes"}
            type="radio"
            checked={responses["q1"] === "Yes"}
            onChange={handleInputChange}
          />
          <label htmlFor="yes">Yes</label>
          <input
            id="no"
            name="q1"
            value={"No"}
            type="radio"
            checked={responses["q1"] === "No"}
            onChange={handleInputChange}
          />
          <label htmlFor="no">No</label>
        </fieldset>
      </form>
    </main>
  );
}
