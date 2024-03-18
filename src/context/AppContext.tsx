import {
  createContext,
  useContext,
  ReactNode,
  useState,
} from "react"

interface AppContextProps {
  isWaitingTxData: boolean
  setWaitingTxData: React.Dispatch<React.SetStateAction<boolean>>
  isTxInProgress: boolean
  setTxInProgress: React.Dispatch<React.SetStateAction<boolean>>
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isWaitingTxData, setWaitingTxData] = useState<AppContextProps["isWaitingTxData"]>(false);
  const [isTxInProgress, setTxInProgress] = useState<AppContextProps["isTxInProgress"]>(false);

  return (
    <AppContext.Provider
      value={{ isWaitingTxData, setWaitingTxData, isTxInProgress, setTxInProgress }}
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
