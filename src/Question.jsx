function Question({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;
  return (
    <div>
      <h4>{question.question}</h4>
      {question.options.map((option, index) => (
        <div key={option}>
          <button
            className={`btn btn-option 
              ${hasAnswered ? (answer === index ? "answer" : "") : ""} 
              ${
                hasAnswered
                  ? index === question.correctOption
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={hasAnswered}
          >
            {option}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Question;
