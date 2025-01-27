export const getErrorMessage = (error: any): string => {
  let errorMessage = "An error occurred.";

  switch (error.code) {
    case "ACTION_REJECTED":
      errorMessage = "The action was rejected by user.";
      break;
    case -32603:
      errorMessage = "Insufficent funds for gas + fees.";
      break;
    case "UNPREDICTABLE_GAS_LIMIT":
      console.log(error.message);
      if (error.message.includes("transfer amount exceeds balance")) {
        errorMessage = "Insufficient ERC20 balance.";
      }
      break;
    default:
      console.error("Error code not found : ", error);
      errorMessage = `An error occurred : ${error.code}.`;
      break;
  }

  return errorMessage;
};
