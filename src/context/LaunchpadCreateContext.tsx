import {
  createContext,
  useContext,
  ReactNode,
  useState,
} from "react"

type Steps = 'infos' | 'campaign' | 'vesting' | 'recap';

interface StepInfos {
    projectName: string;
    description: string;
    websiteLink: string;
    raiseToken: string;
    saleToken: string;
  }

interface LaunchpadCreateContextProps {
  formData: StepInfos;
  setFormData: React.Dispatch<React.SetStateAction<StepInfos>>;
  activeStep: Steps;
    setActiveStep: React.Dispatch<React.SetStateAction<Steps>>;
}

const LaunchpadCreateContext = createContext<LaunchpadCreateContextProps | undefined>(undefined)

export const LaunchpadCreateContextProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<LaunchpadCreateContextProps["formData"]>({
    projectName: '',
    description: '',
    websiteLink: '',
    raiseToken: '',
    saleToken: '',
  });
  const [activeStep, setActiveStep] = useState<Steps>('infos');


  return (
    <LaunchpadCreateContext.Provider
      value={{ formData, setFormData, activeStep, setActiveStep }}
    >
      {children}
    </LaunchpadCreateContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLaunchpadCreateContext = () => {
  const context = useContext(LaunchpadCreateContext)

  if (!context) {
    throw new Error("useLaunchpadCreateContext must be used within an LaunchpadCreateContextProvider")
  }

  return context
}
