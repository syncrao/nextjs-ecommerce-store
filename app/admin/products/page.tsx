import ProductForm from "@/components/admin/ProductForm"
import ProductsTable from "@/components/DataTable"


const Products = () => {
  console.log("Admin Products page rendered");
  return (
    <div>
     <h1>Products</h1>
           <ProductsTable />
    </div>
  )
}

export default Products