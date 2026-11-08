import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Home from "./Home";

export default function App() {
  // undefined — грузимся, null — не залогинен, object — есть сессия
  const [session, setSession] = useState(undefined);

  function handleSession(s) {
    setSession(s);
  }

  // Общий макет для залогиненного состояния: Header + место под страницы
  function Shell() {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return <Home />;
}
