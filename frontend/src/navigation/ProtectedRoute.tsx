import React, { useEffect, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../utils/UserProvider";

const ProtectedRoute = ({ children }: { children: ReactElement }): ReactElement => {
  const { email } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  return email ? children : <div>Loading...</div>;
};

export default ProtectedRoute;