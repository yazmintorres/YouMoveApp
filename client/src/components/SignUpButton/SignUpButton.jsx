import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="btn mt-1 drop-shadow-lg"
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            screen_hint: "signup",
          },
        })
      }
    >
      Sign Up Now!
    </button>
  );
};

export default SignupButton;
