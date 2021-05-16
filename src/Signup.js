import { useState } from "react";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3>Signup</h3>
      <input
        type={"email"}
        placeholder={"email"}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      ></input>
      <input
        type={"password"}
        placeholder={"password"}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      ></input>
      <button disabled={!email.length || !password.length}>Sign up</button>
    </div>
  );
};
