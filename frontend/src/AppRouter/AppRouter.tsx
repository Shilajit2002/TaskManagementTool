import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
