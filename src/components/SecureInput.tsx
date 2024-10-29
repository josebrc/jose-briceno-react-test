import { Field } from "formik";
import React, { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";

interface SecureInputProps {
  name: string;
}

const SecureInput: React.FC<SecureInputProps> = ({ name }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Field
        type={show ? "text" : "password"}
        name={name}
        className="border p-2 w-full"
      />
      <div>
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
