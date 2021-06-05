import React, { useReducer } from "react";
import { AuthContext } from "./auth/AuthContext";
import { authReducer } from "./auth/authReducer";
import { AppRouter } from "./routers/AppRouter";

const init = () => {
    return JSON.parse(localStorage.getItem('user')) || {logged: false}
}

export const HeroesApp = () => {
    const [user, dispatch] = useReducer(authReducer, {}, init); // init es el valor inicial que tomará la app cuando se ejecute y busque en el localStoge, luego ese valor será asginado como valor en nuestra app

// la propiedad de value es la que se va a promover através de todo el árbol que esté colgando de nuevo Provider
  return (
    <AuthContext.Provider value={{user, dispatch}}> 
      <AppRouter />
    </AuthContext.Provider>
  );
};
