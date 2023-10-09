import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const UserContext = createContext();
let userId = localStorage.getItem("userId");
if (!userId) {
  userId = uuidv4();
  // Almacena el nuevo identificador único en el almacenamiento local
  localStorage.setItem("userId", userId);
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(userId);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
