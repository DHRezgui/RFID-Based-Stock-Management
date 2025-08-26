export interface Product {
  id: number;
  productName: string;
  productCategory: string;
  productDescription: string;
  productPrice: number;
  epc: string;
  tagId: number;
}

// Fonction utilitaire pour récupérer le token et retourner l'header Authorization
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("http://localhost:8080/products", {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error loading products");
  return res.json();
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const res = await fetch(`http://localhost:8080/products/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Product not found");
  return res.json();
};

export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const res = await fetch("http://localhost:8080/products", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error creating product");
  return res.json();
};

export const deleteProduct = async (id: number): Promise<void> => {
  const res = await fetch(`http://localhost:8080/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error deleting product");
};

export const associateTagToProduct = async (productId: number, tagId: number): Promise<Product> => {
  const res = await fetch(`http://localhost:8080/products/${productId}/tag/${tagId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Error associating tag");
  return res.json();
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const res = await fetch(`http://localhost:8080/products/${product.id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error updating product");
  return res.json();
};
