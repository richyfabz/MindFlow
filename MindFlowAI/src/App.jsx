import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [name, setName] = useLocalStorage("username", "");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>MindFlow AI</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />

      <p>Hello, {name}</p>
    </div>
  );
}

export default App;