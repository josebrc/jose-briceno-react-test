import { Field } from "formik";
import React, { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";

interface SecureInputProps {
  name: string;
}

const SecureInput: React.FC<SecureInputProps> = ({ name }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="secure-input">
      <Field type={show ? "text" : "password"} name={name} className="" />
      <div className="icon">
        {show ? (
          <GoEyeClosed onClick={() => setShow(!show)} />
        ) : (
          <GoEye onClick={() => setShow(!show)} />
        )}
      </div>
    </div>
  );
};
export { SecureInput };
