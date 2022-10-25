import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./app.css";
import Lodder from "./components/Lodder/Lodder";
import { Usercontext } from "./context/context";
import Error from "./page/error/Error";
import Home from "./page/Home/Home";
import Auth from "./page/Auth/Auth";

function App() {
  const { lodder } = Usercontext();
  return (
    <div>
      <Router>
        {lodder === true ? <Lodder /> : ""}

        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
