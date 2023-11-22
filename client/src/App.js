import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./component/Chat";
import ChatRoomSelection from "./component/ChatRoomSelection";
import UserContextProvider from "./context/UserContextProvider";

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
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
};

export default App;
