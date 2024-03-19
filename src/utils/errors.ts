export const getErrorMessage = (errorCode: string): string => {
    let errorMessage = "An error occurred";
  
    switch (errorCode) {
      case "ACTION_REJECTED":
        errorMessage = "The action was rejected by user.";
        break;
      default:
        console.log('Error code not found : ', errorCode);
        errorMessage = "An error occurred. Please try again later.";
        break;
    }
  
    return errorMessage;
  };
  