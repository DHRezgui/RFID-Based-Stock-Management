"use client";

import { useEffect, useState } from "react";
import TableTemplate from "../Table/template";
import styles from "./page.module.css";
import Image from "next/image";
import {
  fetchProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../api/productService";
import { fetchAvailableTags } from "../api/tagService";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  epc: string;
  tagId: number;
}

interface Tag {
  id: number;
  epc: string;
  readerName: string;
}

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const [newProduct, setNewProduct] = useState<Omit<Product, "id"> & { price: string }>({
    name: "",
    category: "",
    description: "",
    price: "",
    epc: "",
    tagId: 0,
  });

  const loadProducts = () => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        const transformedData = data.map((item: any) => ({
          id: item.id,
          name: item.productName,
          category: item.productCategory,
          description: item.productDescription,
          price: String(item.productPrice),
          epc: item.epc,
          tagId: item.tagId,
        }));
        setProducts(transformedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const loadTags = async () => {
    try {
      const data = await fetchAvailableTags();
      setAvailableTags(data);
    } catch (err) {
      console.error("Error loading tags :", err);
    }
  };

  useEffect(() => {
    loadProducts();
    loadTags();
  }, []);

  const isPriceValid = () => {
    const val = parseFloat(newProduct.price);
    return !isNaN(val) && val >= 0;
  };

  const handleCreateProduct = async () => {
    if (!isPriceValid()) return;
    try {
      const dto = {
        id: null,
        productName: newProduct.name,
        productCategory: newProduct.category,
        productDescription: newProduct.description,
        productPrice: parseFloat(newProduct.price),
        epc: newProduct.epc,
        tagId: newProduct.tagId,
      };
      await createProduct(dto);
      resetForm();
      loadProducts();
      loadTags();
    } catch (err: any) {
      if (err.message.includes("409")) {
        alert("This tag is already associated with another product");
      } else {
        alert("Error while creating : " + err.message);
      }
    }
  };

  const handleUpdateProduct = async () => {
    if (!isPriceValid() || selectedProductId === null) return;
    try {
      const dto = {
        id: selectedProductId,
        productName: newProduct.name,
        productCategory: newProduct.category,
        productDescription: newProduct.description,
        productPrice: parseFloat(newProduct.price),
        epc: newProduct.epc,
        tagId: newProduct.tagId,
      };
      await updateProduct(dto);
      resetForm();
      loadProducts();
      loadTags();
    } catch (err: any) {
      if (err.message.includes("409")) {
        alert("This tag is already associated with another product");
      } else {
        alert("Error while updating : " + err.message);
      }
    }
  };

  const resetForm = () => {
    setFormMode("create");
    setSelectedProductId(null);
    setNewProduct({
      name: "",
      category: "",
      description: "",
      price: "",
      epc: "",
      tagId: 0,
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      loadProducts();
      loadTags();
    } catch (err) {
      console.error("Deletion error :", err);
    }
  };

  const handleEditProduct = (product: Product) => {
    setFormMode("edit");
    setSelectedProductId(product.id);
    setNewProduct({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      epc: product.epc,
      tagId: product.tagId,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const actionColumn = {
    name: "Actions",
    cell: (row: Product) => (
      <>
        <button className="btn btn-outline-success btn-sm me-2" onClick={() => handleEditProduct(row)}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
          Delete
        </button>
      </>
    ),
  };

  // Comptage du stock avec normalisation
  const productStock = products.reduce<Record<string, { name: string; count: number }>>(
    (acc, product) => {
      const normalizedName = product.name.trim().toLowerCase();
      if (!acc[normalizedName]) {
        acc[normalizedName] = { name: product.name.trim(), count: 0 };
      }
      acc[normalizedName].count += 1;
      return acc;
    },
    {}
  );

  return (
    <div className={styles.page}>
      <div className={`container-fluid text-center border border-black rounded-bottom-4 d-flex justify-between align-items-center px-4 py-2 ${styles.header}`}>
        <a href="https://www.uptech.com.tn" target="_blank" rel="noopener noreferrer">
          <Image src="/assets/logo1.png" alt="UPtech Logo" width={40} height={40} />
        </a>
        <h1 className="m-0 flex-grow-1 text-center">Products</h1>
        <a href="/" className="text-decoration-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#A8BFA0" className="bi bi-house-door" viewBox="0 0 16 16">
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0L1 7.793V14.5A1.5 1.5 0 0 0 2.5 16h4a.5.5 0 0 0 .5-.5V11a1 1 0 0 1 2 0v4.5a.5.5 0 0 0 .5.5h4A1.5 1.5 0 0 0 15 14.5V7.793l-6.646-6.647z" />
            <path d="M13 2.5V6l1 1V2.5a.5.5 0 0 0-1 0z" />
          </svg>
        </a>
      </div>

      <div className="container mt-4 mx-auto">
        <h4 className="text-center">{formMode === "create" ? "Add a Product" : "Edit Product"}</h4>
        <div className="row mb-4">
          {/* Form inputs */}
          <div className="col">
            <input type="text" className="form-control" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          </div>
          <div className="col">
            <input type="number" className="form-control" placeholder="Price" value={newProduct.price} onChange={(e) => { const val = e.target.value; if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) setNewProduct({ ...newProduct, price: val }); }} min="0" step="0.01" />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="EPC" value={newProduct.epc} onChange={(e) => setNewProduct({ ...newProduct, epc: e.target.value })} />
          </div>
          <div className="col">
            <select className="form-control custom-focus" value={newProduct.tagId} onChange={(e) => setNewProduct({ ...newProduct, tagId: parseInt(e.target.value) })}>
              <option value={0}>- Select a tag -</option>
              {availableTags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.epc} - {tag.readerName}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            {formMode === "create" ? (
              <button className="btn btn-success" onClick={handleCreateProduct} disabled={!isPriceValid() || !newProduct.name || !newProduct.category}>ADD</button>
            ) : (
              <>
                <button className="btn btn-warning me-2 mb-1" onClick={handleUpdateProduct} disabled={!isPriceValid() || !newProduct.name || !newProduct.category}>UPDATE</button>
                <button className="btn btn-secondary me-2" onClick={resetForm}>CANCEL</button>
              </>
            )}
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <TableTemplate<Product> data={products} searchKey="name" title="List of Products" columnKeys={["name", "category", "description", "price", "epc", "tagId"]} actionColumn={actionColumn} />

            <div className="container mt-4">
              <h4 className="text-center">Stock Summary</h4>
              <div className="row">
                {Object.values(productStock).map((item) => (
                  <div key={item.name} className="col-md-3 mb-2">
                    <div className="p-2 border rounded bg-light">
                      <strong>{item.name}</strong>: <span style={{ color: "pink" }}>{item.count}</span> in stock
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
