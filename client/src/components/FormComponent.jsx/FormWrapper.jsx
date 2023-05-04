import React from "react";

const FormWrapper = ({ children }) => {
  return <form className="flex flex-col gap-2">{children}</form>;
};

export default FormWrapper;
