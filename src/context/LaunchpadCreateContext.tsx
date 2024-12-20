import { createContext, useContext, ReactNode, useState } from "react";

type Steps = "infos" | "campaign" | "vesting" | "recap";

interface StepInfos {
  projectName: string;
  description: string;
  websiteLink: string;
  raiseToken: string;
  raiseTokenName: string;
  saleToken: string;
  saleTokenName: string;
}
interface StepCampaign {
  endTime: string;
  minimumGoal: number;
  maximumGoal: number;
  pricePerToken: number;
  poolFee: number;
  campaignType: "stealth" | "fair";
}
interface StepCampaign {
  vestingStartDate: string;
  vestingEndDate: string;
  vestingDuration: number;
  vestingDelta: number;
}

type FormData = StepInfos & StepCampaign & StepCampaign;

interface LaunchpadCreateContextProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  activeStep: Steps;
  setActiveStep: React.Dispatch<React.SetStateAction<Steps>>;
}

const LaunchpadCreateContext = createContext<
  LaunchpadCreateContextProps | undefined
>(undefined);

export const LaunchpadCreateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [formData, setFormData] = useState<
    LaunchpadCreateContextProps["formData"]
  >({
    // projectName: "",
    // description: "",
    // websiteLink: "",
    // raiseToken: "",
    // raiseTokenName: "TODO",
    // saleToken: "",
    // saleTokenName: "TODO",
    // endTime: "",
    // minimumGoal: 0,
    // maximumGoal: 0,
    // pricePerToken: 0,
    // poolFee: 0.3,
    // campaignType: "stealth",
    // vestingStartDate: "",
    // vestingEndDate: "",
    // vestingDuration: 0,
    // vestingDelta: 0,
    projectName: "To the Moon",
    description: "description",
    websiteLink: "https://graphlinq.io/",
    raiseToken: "0x1D3813e86293f7A70B5aaB881F6323C4Dff27D24",
    raiseTokenName: "GLQ",
    saleToken: "0x1D3816f86293f7A70B5baB882F6323D4Dff27D24",
    saleTokenName: "TOTO",
    endTime: "2024-12-20T13:43",
    minimumGoal: 1000,
    maximumGoal: 10000,
    pricePerToken: 2,
    poolFee: 0.3,
    campaignType: "stealth",
    vestingStartDate: "2024-12-13T13:43",
    vestingEndDate: "2024-12-20T13:43",
    vestingDuration: 360000,
    vestingDelta: 10000,
  });
  const [activeStep, setActiveStep] = useState<Steps>("recap");

  return (
    <LaunchpadCreateContext.Provider
      value={{ formData, setFormData, activeStep, setActiveStep }}
    >
      {children}
    </LaunchpadCreateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLaunchpadCreateContext = () => {
  const context = useContext(LaunchpadCreateContext);

  if (!context) {
    throw new Error(
      "useLaunchpadCreateContext must be used within an LaunchpadCreateContextProvider"
    );
  }

  return context;
};
