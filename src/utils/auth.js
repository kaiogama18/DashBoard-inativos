import React, { useEffect } from "react";
import Router from "next/router";
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

// import Router from "next/dist/next-server/lib/router/router";

export const login = ({ token }) => {
    cookie.set("token", token, { expire: 1 });
    Router.push("/dash");
};
export const auth = ctx => {
  const { token } = nextCookie(ctx);

  if (!token) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { LOcation: "/login" });
      ctx.res.end();
    } else {
      Router.push("/login");
    }
  }
  return token;
};

export const logout = () => {
    cookie.remove("token");
    window.localStorage.setItem("logout", Date.now());
    Router.push("/login");
};

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const Wrapper = props => {
      if (event.key === "logout") {
        console.log("[Leprs] -- Desconectado!");
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);
      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.remove("logout");
      };
    }, []);
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, token };
  };
  return Wrapper;
};
