import DateCounter from "./DateCounter.jsx";
import Header from "./Header.jsx";
import MainSection from "./MainSection.jsx";
import { useEffect, useReducer } from "react";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import Ready from "./Ready.jsx";
import Question from "./Question.jsx";
import NextQuestion from "./NextQuestion.jsx";
import Progress from "./Progress.jsx";
import Finished from "./Finished.jsx";
import Timer from "./Timer.jsx";
import data from "../data/questions.json";
function reducer(state, action) {
  switch (action.type) {
    case "dataLoaded":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        secRemaining: action.payload.length * 30,
      };
    case "dataError":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secRemaining: state.secRemaining - 1,
        status: state.secRemaining === 0 ? "finished" : state.status,
      };
    default:
      return state;
  }
}
const initialState = {
  questions: [],
  // loading ,ready,error,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secRemaining: null,
};
function App() {
  const [{ questions, status, index, answer, points, secRemaining }, dispatch] =
    useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: "dataLoaded", payload: data.json() });
  }, []);
  console.log(data.questions);
  // useEffect(() => {
  //   fetch("http://localhost:3001/questions")
  //     .then((response) => response.json())
  //     .then((data) => dispatch({ type: "dataLoaded", payload: data }));
  // }, []);
  const numQuestions = questions.length;
  return (
    <div className="app">
      <Header />
      <MainSection>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {(status === "ready" || status === "restart") && (
          <Ready numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={questions.reduce(
                (total, question) => total + question.points,
                0
              )}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <footer>
              <Timer secRemaining={secRemaining} dispatch={dispatch} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            points={points}
            dispatch={dispatch}
            totalPoints={questions.reduce(
              (total, question) => total + question.points,
              0
            )}
          />
        )}
      </MainSection>
    </div>
  );
}

export default App;
