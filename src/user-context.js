import { createContext } from "react";

const UserContext = createContext({
  user: { accessToken: null },
  setUser: () => {},
});

export default UserContext;
