// import React from "react";
// function App() {
//   return (
//     <div className="App">
//       <h1>Welcome to MindFlowAI</h1>
//       <p>Your AI-powered assistant for seamless workflow management.</p>
//     </div>
//   );
// }

// export default App;


import { useTheme } from "./context/themeContext";

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <button 
        onClick={toggleTheme}
        className="p-2 bg-gray-300 dark:bg-gray-700"
      >
        Toggle Theme
      </button>

      <h1 className="text-2xl mt-4">
        Current Mode: {isDarkMode ? "Dark" : "Light"}
      </h1>
    </div>
  );
}

export default App;

