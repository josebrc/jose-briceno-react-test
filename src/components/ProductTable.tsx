import React, { useEffect, useState } from "react";
import { usePagination } from "../hooks/usePagination";
import { useProducts } from "../hooks/useProducts";
import { GoChevronDown, GoPencil, GoTrash } from "react-icons/go";
import { Product } from "../interfaces/products";
import { RowProduct } from "./RowProduct";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";
import { destroyProduct } from "../services/products";

const MAX_VISIBLE_PAGES = 5;
type SortKey = keyof Product | "rating.rate";

const ProductTable: React.FC = () => {
  const { filteredProducts, loading, error, deleteProduct } = useProducts();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenDetails = () => setIsDetailsOpen(true);
  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setProduct(undefined);
  };

  const handleOpenConfirm = () => setIsConfirmOpen(true);
  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    setProduct(undefined);
  };

  const handleDelete = () => {
    if (!product) return;
    deleteProduct(product.id);
    destroyProduct(product.id);
    handleCloseConfirm();
    console.log("Producto eliminado");
  };

  useEffect(() => {
    const sortProducts = [...filteredProducts].sort((a, b) => {
      const valueA = getValue(a, sortKey);
      const valueB = getValue(b, sortKey);

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });

    setSortedProducts(sortProducts);
  }, [filteredProducts, sortKey, sortOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const getValue = (product: Product, key: SortKey): number | string =>
    key === "rating.rate"
      ? product.rating?.rate ?? 0
      : (product[key as keyof Product] as number | string);

  const { currentPageData, totalPages, currentPage, goToPage } = usePagination(
    sortedProducts,
    itemsPerPage
  );

  if (loading)
    return (
      <div className="center-content">
        <p className="color-primary">Cargando...</p>
      </div>
    );
  if (error) return;
  <div className="center-content">
    <p className="color-accent">{error}</p>
  </div>;

  const getVisiblePages = () => {
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + MAX_VISIBLE_PAGES - 1, totalPages);

    if (end - start < MAX_VISIBLE_PAGES - 1) {
      start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
    }

    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const visiblePages = [];
    if (start > 1) visiblePages.push("...");
    visiblePages.push(...pages);
    if (end < totalPages) visiblePages.push("...");
    return visiblePages;
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th onClick={() => handleSort("title")}>
              <div>
                Nombre <GoChevronDown className={`icon ${sortOrder}`} />
              </div>
            </th>
            <th onClick={() => handleSort("category")}>
              <div>
                Categoría <GoChevronDown className={`icon ${sortOrder}`} />
              </div>
            </th>
            <th onClick={() => handleSort("price")}>
              <div>
                Precio <GoChevronDown className={`icon ${sortOrder}`} />
              </div>
            </th>
            <th onClick={() => handleSort("rating.rate")}>
              <div>
                Rating <GoChevronDown className={`icon ${sortOrder}`} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((product, index) => (
            <RowProduct
              key={index}
              product={product}
              onClick={(p) => {
                setProduct(p);
                handleOpenDetails();
              }}
            />
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => typeof page === "number" && goToPage(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>

      <div className="items-per-page">
        <label htmlFor="itemsPerPage">Items por página</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => {
            goToPage(1);
            setItemsPerPage(Number(e.target.value));
          }}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {product && (
        <>
          {/* Modal de Detalles del Producto */}
          <Modal isOpen={isDetailsOpen} onClose={handleCloseDetails}>
            <div className="product-card">
              <div className="flex justify-between align-center">
                <h2>{product.title}</h2>
                <div className="category">{product.category}</div>
              </div>
              <img src={product.image} alt={product.title} />

              <p>{product.description}</p>
              <div className="flex justify-between align-center">
                <p className="price">${product.price}</p>

                {product.rating && (
                  <div>
                    <div className="">Rating</div>
                    <span>
                      {product.rating.rate} / 5 ({product.rating.count})
                    </span>
                  </div>
                )}
              </div>
              <div className="accion-container">
                <button
                  onClick={() => {
                    handleCloseDetails();
                    navigate(`/product/${product.id}`);
                  }}
                >
                  <div>Editar</div> <GoPencil size={20} fill="#5471d6" />
                </button>
                <button onClick={handleOpenConfirm}>
                  <div>Eliminar</div>
                  <GoTrash size={20} fill="tomato" />
                </button>
              </div>
            </div>
          </Modal>

          {/* Modal de Confirmación */}
          <Modal isOpen={isConfirmOpen} onClose={handleCloseConfirm}>
            <div className="confirm-modal">
              <h2>¿Estás seguro?</h2>
              <p>
                ¿Deseas eliminar el producto <strong>{product.title}</strong>?
              </p>
              <div className="accion-container">
                <button onClick={handleCloseConfirm}>Cancelar</button>
                <button onClick={handleDelete} style={{ color: "tomato" }}>
                  Eliminar
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export { ProductTable };
