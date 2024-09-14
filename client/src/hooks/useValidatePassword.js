import { useEffect, useState } from "react";

export default function useValidatePassword(password) {
  const initialState = {
    validated: false,
    message: "Password must be at least 6 characters long",
  };
  const [passwordError, setPasswordError] = useState(initialState);
  useEffect(() => {
    if (password.length >= 6) {
      setPasswordError({
        validated: true,
        message: "",
      });
    } else {
      setPasswordError(initialState);
    }
  }, [password]);
  return { passwordError };
}
