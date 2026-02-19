import Link from "next/link"


const Admin = () => {
  return (
    <div className="p-6">
      <h1>Admin</h1>
      <Link href="/admin/products">
        <button className="btn btn-primary">Manage Products</button>
      </Link>
    </div> 

  )
}

export default Admin