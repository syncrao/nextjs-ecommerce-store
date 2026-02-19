






// "use client";

// import { useState } from "react";

// type ImageType = {
//   url: string;
//   public_id: string;
// };

// export default function UploadTest() {
//   const [images, setImages] = useState<ImageType[]>([]);
//   const [loading, setLoading] = useState(false);

//   async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
//     const files = e.target.files;
//     if (!files) return;

//     const formData = new FormData();
//     Array.from(files).forEach((file) => {
//       formData.append("files", file);
//     });

//     setLoading(true);

//     const res = await fetch("/api/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (Array.isArray(data)) {
//       setImages(
//         data.map((img) => ({
//           url: img.secure_url,
//           public_id: img.public_id,
//         }))
//       );
//     } else {
//       alert("Upload failed");
//     }
//   }

//   // ✅ Delete image
//   async function deleteImage(public_id: string) {
//     if (!confirm("Delete this image?")) return;
//     console.log(public_id)

//     const res = await fetch("/api/upload/delete", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ public_id }),
//     });



//     const data = await res.json();

//     if (data.success) {
//       setImages((prev) =>
//         prev.filter((img) => img.public_id !== public_id)
//       );
//     } else {
//       alert("Delete failed");
//     }
//   }

//   return (
//     <div className="p-10 space-y-6">
//       <h1 className="text-2xl font-bold">Multiple Image Upload</h1>

//       <input type="file" multiple onChange={uploadImages} />

//       {loading && <p>Uploading...</p>}

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {images.map((img) => (
//           <div key={img.public_id} className="relative">
//             <img src={img.url} className="rounded-xl" />
//             <p>{img.public_id}</p>

//             <button
//               onClick={() => deleteImage(img.public_id)}
//               className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
//             >
//               Delete
//             </button>

//             <p className="text-xs break-all">{img.url}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useState } from "react";

// export default function UploadTest() 
//   const [imageUrl, setImageUrl] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);

//     const res = await fetch("/api/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (data.secure_url) {
//       setImageUrl(data.secure_url);
//     } else {
//       alert("Upload failed");
//     }
//   }

//   return (
//     <div className="p-10 space-y-6">
//       <h1 className="text-2xl font-bold">Cloudinary Upload Test</h1>

//       <input type="file" onChange={uploadImage} />

//       {loading && <p>Uploading...</p>}

//       {imageUrl && (
//         <div className="space-y-4">
//           <p>Uploaded Image URL:</p>
//           <a href={imageUrl} target="_blank" className="text-blue-500 underline">
//             {imageUrl}
//           </a>

//           <img src={imageUrl} alt="uploaded" className="w-64 rounded-xl" />
//         </div>
//       )}
//     </div>
//   );
// }





"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Welcome {session.user?.email}</p>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <button onClick={() => signIn("google")}>
          Login with Google
        </button>
      )}
    </div>
  );
}
