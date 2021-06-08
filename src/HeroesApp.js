import React, { useReducer, useEffect } from 'react'
import { AppRouter } from './routers/AppRouter'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'


const init = () => {
    return JSON.parse(localStorage.getItem('user')) || {logged: false}
}

export const HeroesApp = () => {
    const [user, dispatch] = useReducer(authReducer, {}, init); // init es el valor inicial que tomará la app cuando se ejecute y busque en el localStoge, luego ese valor será asginado como valor en nuestra app
// user es lo que retorna nuetra funcion reducer, en este caso es un objeto con varios atributos, logged y el payload que le enviamos
// la propiedad de value es la que se va a promover através de todo el árbol que esté colgando de nuevo Provider
    useEffect(() => {
      localStorage.setItem('user', JSON.stringify(user))
    }, [user])

  return (
    <AuthContext.Provider value={{user, dispatch}}> 
      <AppRouter />
    </AuthContext.Provider>
  )
}
