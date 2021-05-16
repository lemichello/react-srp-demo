import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import {
  derivePrivateKey,
  deriveVerifier,
  generateSalt,
} from "secure-remote-password/client";

export const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signUp = async () => {
    const salt = generateSalt();
    const privateKey = derivePrivateKey(salt, email, password);
    const verifier = deriveVerifier(privateKey);

    await axios.post("http://localhost:3000/api/users/register", {
      email,
      salt,
      verifier,
    });

    history.push("/login");
  };

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
      <button disabled={!email.length || !password.length} onClick={signUp}>
        Sign up
      </button>
    </div>
  );
};
