import React, { useState } from 'react';

const questions = [
  {
    q: "Which law states that energy cannot be created or destroyed?",
    options: [
      "Newton's First Law",
      "The First Law of Thermodynamics",
      "Ohm's Law",
      "Law of Supply and Demand"
    ],
    answer: 1
  },
  {
    q: "Which of these is NOT a form of energy?",
    options: [
      "Mechanical",
      "Chemical",
      "Magical",
      "Thermal"
    ],
    answer: 2
  },
  {
    q: "What is the main function of the electric grid?",
    options: [
      "Store energy underground",
      "Transmit and distribute electricity",
      "Create new energy",
      "Convert energy to food"
    ],
    answer: 1
  }
];

export default function QuizWeek1() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  function handleAnswer(idx) {
    if (idx === questions[step].answer) setScore(score + 1);
    if (step < questions.length - 1) setStep(step + 1);
    else setShowResult(true);
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow mt-8">
      {!showResult ? (
        <>
          <h2 className="text-lg font-semibold mb-4">Quick Quiz</h2>
          <p className="mb-2">{questions[step].q}</p>
          <div className="space-y-2">
            {questions[step].options.map((opt, i) => (
              <button
                key={i}
                className="w-full py-2 px-4 bg-blue-100 rounded hover:bg-blue-200 focus:outline-none"
                onClick={() => handleAnswer(i)}
                aria-label={opt}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-2">Quiz Complete!</h2>
          <p>Your score: {score} / {questions.length}</p>
          <p className="mt-2">{score === questions.length ? "You’re an energy hero!" : "Review the lessons and try again!"}</p>
        </div>
      )}
    </div>
  );
}
