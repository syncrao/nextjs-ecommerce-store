"use client";

import { Plus } from "lucide-react";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  category?: string;
}

export default function ProductsTable() {
  const [records, setRecords] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setRecords);
  }, []);

  const paginatedRecords = records.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

 const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      credentials: "include", // important for next-auth cookies
    });

    const data = await res.json();

    if (res.status === 403) {
      alert("❌ Only admin can delete products");
      return;
    }

    if (!res.ok) {
      throw new Error(data?.error || "Delete failed");
    }

    // remove from UI
    setRecords((prev) => prev.filter((p) => p._id !== id));

    alert("✅ Product deleted successfully");
  } catch (err) {
    console.error(err);
    alert("❌ Error deleting product");
  }
};


  return (
    <div className="p-6">
      <h5 className="font-semibold">Products</h5>
      <div className="panel mt-6">
        <div className="flex md:items-center justify-between md:flex-row flex-col p-1 mb-4 gap-5">
          <div className="flex items-center flex-wrap">
            <Link href="/admin/products/new">
              <button className="btn btn-primary btn-sm m-1 flex items-center bg-blue-500 p-1 rounded text-white shadow shadow-black-50">
                <Plus className="inline h-5 w-5" /> Add New
              </button>
            </Link>
          </div>
        </div>

        <div className="datatables">
          <DataTable
            highlightOnHover
            horizontalSpacing="xs"
            verticalSpacing="sm"
            verticalAlign="center"
            records={paginatedRecords}
            totalRecords={records.length}
            recordsPerPage={PAGE_SIZE}
            onPageChange={(p) => setPage(p)}
            page={page}
            idAccessor="_id"
            columns={[
              { accessor: "name", title: "Product Name", sortable: true },
              { accessor: "price", title: "Price" },
              { accessor: "category", title: "Category" },
              {
                accessor: "actions",
                title: "Actions",
                titleClassName: "!text-center",
                render: (record) => (
                  <div className="flex items-center w-max mx-auto gap-2">
                    <Link href={`/admin/products/edit/${record._id}`}>
                      <button className="btn btn-sm btn-primary mr-2">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(record._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
