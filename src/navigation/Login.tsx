import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { LoginForm } from "../interfaces/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAuth } from "../hooks/useAuth";
import { SecureInput } from "../components/SecureInput";
import { useNavigate } from "react-router-dom";

interface LoginProps {}
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(12, "La contraseña no puede tener más de 12 caracteres")
    .matches(
      passwordRules,
      "La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (@$!%*?&)"
    )
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("La confirmación de contraseña es obligatoria"),
});

const Login: React.FC<LoginProps> = ({}) => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loginForm] = useState<LoginForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = () => login();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    }
  }, [isAuthenticated]);
  return (
    <div>
      <Formik
        initialValues={loginForm}
        validationSchema={loginSchema}
        onSubmit={() => {
          handleSubmit();
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <div>
                <label htmlFor="email">Correo Electrónico</label>
                <Field
                  type="email"
                  name="email"
                  className="border p-2 w-full"
                />
                <ErrorMessage name="email" component="div" className="" />
              </div>

              <div>
                <label htmlFor="password">Contraseña</label>

                <SecureInput name="password" />
                <ErrorMessage name="password" component="div" className="" />
              </div>

              <div>
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>

                <SecureInput name="confirmPassword" />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className=""
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Iniciar Sesión
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export { Login };
