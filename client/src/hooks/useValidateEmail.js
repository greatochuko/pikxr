import { useEffect, useState } from "react";
import { validateEmail } from "../services/authServices";

export default function useValidateEmail(email) {
  const [emailError, setEmailError] = useState({ validated: false, error: "" });

  useEffect(() => {
    setEmailError({ validated: false, error: "" });
    const controller = new AbortController();
    const signal = controller.signal;
    async function validateEmailInput() {
      try {
        const { userExists } = await validateEmail(email, signal);
        setEmailError({
          validated: !userExists,
          error: userExists ? "Email in use" : "",
        });
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
      }
    }
    if (!email) {
      setEmailError((curr) => {
        return { ...curr, message: "" };
      });
      return;
    }
    if (!email.includes("@") || !email.includes(".com")) {
      setEmailError((curr) => {
        return { ...curr, message: "Enter a valid email" };
      });
      return;
    }
    validateEmailInput();
    return () => {
      controller.abort();
    };
  }, [email, setEmailError]);
  return { emailError };
}
