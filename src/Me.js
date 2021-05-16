import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "./user-context";

export const Me = () => {
  const { user } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function retrieveUserInfo() {
      const resp = await axios.get("http://localhost:3000/api/users/me", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });

      setUserInfo(resp.data.data);
    }

    retrieveUserInfo();
  }, [user.accessToken]);

  return <div>{JSON.stringify(userInfo)}</div>;
};
