function Finished({ points, totalPoints, dispatch }) {
  const percentage = Math.round((points / totalPoints) * 100);
  let emoji;
  if (percentage >= 100) emoji = "🥇";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 50) emoji = "🙂";
  else emoji = "😞";
  return (
    <>
      <p className="result">
        {emoji} you scored {points} out of {totalPoints} ({percentage}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default Finished;
