import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./core/components/DashboardLayout";
import LoginForm from "./auth/components/LoginForm";
import SignUpForm from "./auth/components/SignUpForm";
import LoadingScreen from "./auth/components/LoadingScreen";

function DashboardPage() {
  return <div>Welcome to the Dashboard!</div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/loading" element={<LoadingScreen />} />{" "}
        {/* ✅ add this */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
