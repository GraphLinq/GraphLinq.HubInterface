export const getErrorMessage = (error: any): string => {
  let errorMessage = "An error occurred";

  switch (error.code) {
    case "ACTION_REJECTED":
      errorMessage = "The action was rejected by user.";
      break;
    default:
      console.log("Error code not found : ", error);
      errorMessage = `An error occurred : ${error.code}.`;
      break;
  }

  return errorMessage;
};
