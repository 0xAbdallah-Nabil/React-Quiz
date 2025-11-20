function Ready({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Ready to start the quiz?</h2>
      <h3> {numQuestions} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch(
            { type: "start" }
)
        }
      >
        lets start
      </button>
    </div>
  );
}

export default Ready;
