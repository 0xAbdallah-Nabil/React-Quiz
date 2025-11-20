function Progress({ index, numQuestions, points, totalPoints, answer }) {
  return (
    <header className="progress">
      <progress
        value={index + Number(answer !== null)}
        max={numQuestions}
      ></progress>
      <p>
        <strong>{index + 1}</strong> / <strong>{numQuestions}</strong>
      </p>
      <p>
        <strong>{points}</strong> / <strong>{totalPoints}</strong>
      </p>
    </header>
  );
}

export default Progress;
