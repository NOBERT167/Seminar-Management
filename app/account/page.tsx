// "use client";

// import { useAuth } from "../context/authcontext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import ProtectedRoute from "../Components/ProtectedRoute.";

// const AccountsPage = () => {
//   const { user, setUser } = useAuth();
//   const [formData, setFormData] = useState({
//     name: user?.Name || "",
//     email: user?.Email || "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (name: string, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async () => {
//     try {
//       setLoading(true);

//       // Call your API to update user details
//       const response = await fetch("/api/update-account", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           UUID: user?.UUID,
//           ...formData,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update account details.");
//       }

//       const updatedUser = await response.json();
//       setUser(updatedUser); // Update the user details in context
//       toast.success("Account details updated successfully!");
//     } catch (error: any) {
//       toast.error(error.message || "An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) {
//     return <p>Loading user details...</p>;
//   }

//   return (
//     <ProtectedRoute allowedRoles={["admin", "user"]}>
//       <div className="min-h-screen flex flex-col items-center justify-center bg-background">
//         <div className="max-w-md w-full bg-white shadow-md p-6 rounded-lg">
//           <h1 className="text-xl font-bold mb-4">My Account</h1>
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => handleInputChange("name", e.target.value)}
//               />
//             </div>
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//               />
//             </div>
//             <Button onClick={handleUpdate} disabled={loading}>
//               {loading ? "Updating..." : "Update"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// };

// export default AccountsPage;
