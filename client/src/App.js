import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./component/Chat";
import ChatRoomSelection from "./component/ChatRoomSelection";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ChatRoomSelection />,
    },
    {
      path: "/chat",
      element: <Chat />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
