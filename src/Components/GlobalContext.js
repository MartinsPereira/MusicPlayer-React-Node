import React from 'react'

export const GlobalContext = React.createContext();

export const GlobalStorage = ({children}) => {
  const [menu, setMenu] = React.useState(false);

  return <GlobalContext.Provider value={{menu, setMenu}}>{children}</GlobalContext.Provider>
}