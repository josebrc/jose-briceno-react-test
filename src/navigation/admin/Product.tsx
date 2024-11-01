import React, { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useParams } from "react-router-dom";
import { Product as ProductInterface } from "../../interfaces/products";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateProduct } from "../../services/products";

const ProductSchema = Yup.object().shape({
  title: Yup.string().required("El título es obligatorio"),
  description: Yup.string().required("La descripción es obligatoria"),
  category: Yup.string().required("La categoría es obligatoria"),
  price: Yup.number()
    .required("El precio es obligatorio")
    .positive("El precio debe ser mayor a 0"),
});

interface ProductProps {}

const Product: React.FC<ProductProps> = ({}) => {
  const { getProductById, editProduct } = useProducts();
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductInterface | undefined>(
    undefined
  );

  useEffect(() => {
    if (!productId) return;
    const response = getProductById(Number(productId));
    console.log("🚀 ~ useEffect ~ response:", response);
    if (response) setProduct(response);
  }, [productId]);

  const handleSubmit = async (values: ProductInterface) => {
    try {
      const updatedProduct = { ...product, ...values };
      editProduct(updatedProduct); // Llamada a la función para editar el producto
      await updateProduct(updatedProduct); // Llamada a la función para editar el producto
      alert("Producto actualizado con éxito");
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };

  return (
    <div className="form-product">
      <h1>Editar Producto</h1>
      <Formik
        initialValues={{
          id: product?.id ?? 0,
          title: product?.title ?? "",
          description: product?.description ?? "",
          category: product?.category ?? "",
          price: product?.price ?? 0,
          image: product?.image ?? "",
          rating: product?.rating ?? {
            rate: 0,
            count: 0,
          },
        }}
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
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
export { Product };
