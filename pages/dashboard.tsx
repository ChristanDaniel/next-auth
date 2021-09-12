import { destroyCookie } from "nookies";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { AuthTokenError } from "../services/AuthTokenError";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);

  return <h1>dashboard: {user?.email}</h1>;
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    try {
      const response = await apiClient.get('/me');
    } catch (err) {
      destroyCookie(ctx, 'nextauth.token')
      destroyCookie(ctx, 'nextauth.refreshToken')

      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

  return {
    props: {},
  };
});
