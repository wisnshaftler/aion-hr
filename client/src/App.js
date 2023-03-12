import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
// Importing the Bootstrap 5 CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const token = localStorage.getItem("token");
  if(!token || token == "") {
    return (
      <>
      <Navigate replace to="/login" />;
      </>
    );
  }
  return (
    <>
      <Navigate replace to="/dashboard" />;
    </>
  )
}

export default App;
