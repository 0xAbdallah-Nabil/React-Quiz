import img from "./assets/react.svg";
function Header() {
  return (
    <header className="app-header">
      <img src={img} alt="React logo" className="spinner" />
      <h1>The React Quiz</h1>
    </header>
  );
}

export default Header;
