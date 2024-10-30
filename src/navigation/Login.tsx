import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { LoginForm } from "../interfaces/auth";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import { SecureInput } from "../components/SecureInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { GoSignIn } from "react-icons/go";

interface LoginProps {}
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;
const demoEmail = "mymail@mail.com";
const demoPassword = "Password1@";
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
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loginForm] = useState<LoginForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (
    values: LoginForm,
    { setSubmitting }: FormikHelpers<LoginForm>
  ) => {
    try {
      if (values.email === demoEmail && values.password === demoPassword) {
        login();
      } else {
        setError("Credenciales inválidas");
      }
    } catch (error) {
      setError("Error al iniciar sesión");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    }
  }, [isAuthenticated]);
  return (
    <div className="login center-content">
      <Formik
        initialValues={loginForm}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="login-form ">
              <div className="mb">
                <label htmlFor="email">Correo Electrónico</label>
                <Field type="email" name="email" className="input" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="mb">
                <label htmlFor="password">Contraseña</label>

                <SecureInput name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <div className="mb">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>

                <SecureInput name="confirmPassword" />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                />
              </div>
              {error && <div>{error}</div>}
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-alt"
                >
                  Iniciar Sesión <GoSignIn size={20} />
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export { Login };
