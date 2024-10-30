import React from "react";
import { useProducts } from "../../hooks/useProducts";

import { ProductFormValues } from "../../interfaces/products";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createProduct } from "../../services/products";
import { useNavigate } from "react-router-dom";
import { convertFileToBase64 } from "../../helpers";

const ProductSchema = Yup.object().shape({
  title: Yup.string().required("El título es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  category: Yup.string().required("La categoría es obligatoria"),
  price: Yup.number()
    .required("El precio es obligatorio")
    .positive("El precio debe ser mayor a 0"),
  image: Yup.string().required("La imagen es obligatoria"),
});

interface AddProductProps {}

const AddProduct: React.FC<AddProductProps> = ({}) => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const handleSubmit = async (values: ProductFormValues) => {
    try {
      const resp = await createProduct(values);
      if (resp) {
        addProduct(resp);
        alert("Producto actualizado con éxito");
        navigate("/products");
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };

  return (
    <div className="form-product">
      <h1>Crear Producto</h1>
      <Formik
        initialValues={{
          title: "",
          price: 0,
          description: "",
          category: "",
          image: "",
        }}
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div className="mb">
              <label htmlFor="image">Imagen</label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="input"
                onChange={async (
                  event: React.ChangeEvent<HTMLInputElement>
                ) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    const base64 = await convertFileToBase64(file);
                    console.log("🚀 ~ base64:", base64);
                    setFieldValue("image", base64);
                  }
                }}
              />
              <ErrorMessage name="image" component="div" className="error" />
            </div>
            <div className="mb">
              <label htmlFor="title">Título</label>
              <Field name="title" type="text" className="input" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div className="mb">
              <label htmlFor="description">Descripción</label>
              <Field name="description" as="textarea" className="input" />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
            </div>

            <div className="mb">
              <label htmlFor="category">Categoría</label>
              <Field name="category" type="text" className="input" />
              <ErrorMessage name="category" component="div" className="error" />
            </div>

            <div className="mb">
              <label htmlFor="price">Precio</label>
              <Field name="price" type="number" className="input" />
              <ErrorMessage name="price" component="div" className="error" />
            </div>

            <div className="w-full flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-alt"
              >
                {isSubmitting ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export { AddProduct };
