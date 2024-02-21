import {
  createContext,
  useContext,
  ReactNode,
} from "react"

interface AppContextProps {
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {

  return (
    <AppContext.Provider
      value={{  }}
    >
      {children}
    </AppContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider")
  }

  return context
}
