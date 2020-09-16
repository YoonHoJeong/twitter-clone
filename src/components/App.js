import React, { useState } from "react";
import Router from "./Router";
import { authService } from "firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Router isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
