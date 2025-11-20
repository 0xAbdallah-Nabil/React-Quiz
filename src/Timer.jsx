import { useEffect } from "react";
function Timer({ dispatch, secRemaining }) {
  const hours = Math.floor(secRemaining / 3600);
  const min = Math.floor((secRemaining % 3600) / 60);
  const sec = secRemaining % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div className="timer">{`
      ${hours.toString().padStart(2, "0")}:
    ${min.toString().padStart(2, "0")}:
      ${sec.toString().padStart(2, "0")}`}</div>
  );
}

export default Timer;
