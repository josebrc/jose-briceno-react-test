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
    <div>
      {user && (
        <Formik
          initialValues={user}
          onSubmit={handleSubmitUser}
          validationSchema={UserSchema}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <div>
                  <label htmlFor="fullName">Full Name</label>
                  <Field type="text" name="fullName" />
                  <ErrorMessage name="fullName" component="div" />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
};

export { User };
