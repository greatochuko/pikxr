import { useEffect, useState } from "react";

export default function useValidateConfirmPassword(password, confirmPassword) {
  const initialState = {
    validated: false,
    message: "The passwords do not match",
  };
  const [confirmPasswordError, setConfirmPasswordError] =
    useState(initialState);
  useEffect(() => {
    if (confirmPassword === password) {
      setConfirmPasswordError({
        validated: true,
        message: "",
      });
    } else {
      setConfirmPasswordError({
        validated: false,
        message: "The passwords do not match",
      });
    }
  }, [password, confirmPassword]);
  return { confirmPasswordError };
}
