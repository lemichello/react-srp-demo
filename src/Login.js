import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import {
  derivePrivateKey,
  deriveSession,
  generateEphemeral,
  verifySession,
} from "secure-remote-password/client";
import UserContext from "./user-context";

export const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const login = async () => {
    const challengeResp = await axios.post(
      "http://localhost:3000/api/auth/challenge",
      { email }
    );

    const clientEphemeral = generateEphemeral();
    const { salt, B } = challengeResp.data.data;
    const privateKey = derivePrivateKey(salt, email, password);
    const clientSession = deriveSession(
      clientEphemeral.secret,
      B,
      salt,
      email,
      privateKey
    );

    const authResp = await axios.post(
      "http://localhost:3000/api/auth/authenticate",
      {
        clientEphemeralPublic: clientEphemeral.public,
        clientProof: clientSession.proof,
        email,
      }
    );

    const { proof, accessToken } = authResp.data.data;

    verifySession(clientEphemeral.public, clientSession, proof);

    setUser({ accessToken });

    history.push("/me");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
      <button disabled={!email.length || !password.length} onClick={login}>
        Login
      </button>
    </div>
  );
};
