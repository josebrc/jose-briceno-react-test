import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import React from "react";
import { User as UserInterface } from "../../interfaces/user";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";

interface UserProps {}

const UserSchema = Yup.object().shape({
  fullName: Yup.string().required("Campo requerido"),
  email: Yup.string().email("Email invalido").required("Campo requerido"),
});

const User: React.FC<UserProps> = ({}) => {
  const { user, updateUser } = useAuth();

  const handleSubmitUser = (
    values: UserInterface,
    { setSubmitting }: FormikHelpers<UserInterface>
  ) => {
    try {
      updateUser(values);
      alert("Usuario actualizado");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="w-full flex justify-center">
      {user && (
        <Formik
          initialValues={user}
          onSubmit={handleSubmitUser}
          validationSchema={UserSchema}
        >
          {({ isSubmitting }) => {
            return (
              <Form className="login-form ">
                <div className="mb">
                  <label htmlFor="fullName">Full Name</label>
                  <Field type="text" name="fullName" className="input" />
                  <ErrorMessage name="fullName" component="div" />
                </div>
                <div className="mb">
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" className="input" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-alt"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
};

export { User };
