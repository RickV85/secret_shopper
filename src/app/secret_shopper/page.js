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

  const handleSubmit = async () => {
    // API call to post to api/send_email
    try {
      const res = await fetch("/api/send_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responses),
      });
      if (res.ok) {
        console.log(res);
        return res;
      } else {
        throw new Error(res);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        {/* Create reuseable components that render Yes/No, multiple choice questions, and text inputs
        then map over an array of questions/available responses with type to indicate which component to use */}
        {/* legend and fieldset for all questions */}
        <legend>Is this working?</legend>
        <fieldset>
          <input
            id="q1-yes"
            name="q1"
            value={"Yes"}
            type="radio"
            checked={responses["q1"] === "Yes"}
            onChange={handleInputChange}
          />
          <label htmlFor="yes">Yes</label>
          <input
            id="q1-no"
            name="q1"
            value={"No"}
            type="radio"
            checked={responses["q1"] === "No"}
            onChange={handleInputChange}
          />
          <label htmlFor="no">No</label>
        </fieldset>
        <button role="submit">Submit</button>
      </form>
    </main>
  );
}
