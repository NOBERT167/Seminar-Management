"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  login,
  register,
  loginAdmin,
  registerAdmin,
} from "@/services/authenticationService";
import { loginProps, registrationProps, UserData } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "./context/authcontext";
import { DNA } from "react-loader-spinner";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [loading, setLoading] = useState(false);

  // const [userData, setUserData] = useState<UserData | null>(null);
  const { setUserData } = useAuth();

  const [loginData, setLoginData] = useState<Partial<loginProps>>({
    username: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState<Partial<registrationProps>>({
    username: "",
    password: "",
    email: "",
    name: "",
  });

  const { setRole: setAuthRole } = useAuth(); // Use Auth Context
  const router = useRouter();

  const handleInputChange = (name: string, value: string) => {
    if (activeTab === "login") {
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setRegisterData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (activeTab === "register") {
        if (
          !registerData.username ||
          !registerData.password ||
          !registerData.email ||
          !registerData.name
        ) {
          toast.error("All fields are required for registration!");
          return;
        }

        if (role === "admin") {
          await registerAdmin(registerData as registrationProps);
          toast.success("Admin registered successfully!");
        } else {
          await register(registerData as registrationProps);
          toast.success("User registered successfully!");
        }
        setActiveTab("login");
      } else {
        if (!loginData.username || !loginData.password) {
          toast.error("Username and password are required for login!");
          return;
        }

        if (role === "admin") {
          const response = await loginAdmin(loginData as loginProps);
          setLoading(true);
          setAuthRole("admin"); // Update role in Auth Context
          setUserData(response.data); // Store user data in context
          localStorage.setItem("userData", JSON.stringify(response.data)); // Optional: persist data
          toast.success("Admin logged in successfully!");
          console.log(response.data);
          document.cookie = `role=admin; path=/`; // Set role cookie
          router.push("/dashboard");
        } else {
          const response = await login(loginData as loginProps);
          setLoading(true);
          setAuthRole("user"); // Update role in Auth Context
          localStorage.setItem("userData", JSON.stringify(response.data)); // Optional: persist data
          setUserData(response.data); // Store user data in context
          toast.success("User logged in successfully!");
          document.cookie = `role=user; path=/`; // Set role cookie
          router.push("/register");
        }
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || // Backend-defined error message
        error?.message || // Axios or client-side error
        "An error occurred. Please try again."; // Fallback generic message

      console.error("Error:", errorMessage); // Log for debugging
      toast.error(errorMessage); // Show error to user
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex items-center justify-center">
            <DNA
              visible={true}
              height="100"
              width="100"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        </div>
      ) : (
        <Card className="w-full max-w-md bg-white dark:bg-gray-800/50">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-primary font-montserrat">
              {activeTab === "login" ? "Login" : "Register"}
            </CardTitle>
            <CardDescription className="text-center text-base font-inter">
              {activeTab === "login" ? "Welcome back!" : "Create an account."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "login" | "register")
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login" className="font-montserrat">
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="font-montserrat">
                  Register
                </TabsTrigger>
              </TabsList>

              <div className="mb-4 font-montserrat">
                <Select
                  value={role}
                  onValueChange={(value) => setRole(value as "user" | "admin")}
                >
                  <SelectTrigger>
                    <SelectValue
                      className="font-montserrat"
                      placeholder="Select Role"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="font-montserrat" value="user">
                      User
                    </SelectItem>
                    <SelectItem className="font-montserrat" value="admin">
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="register" className="font-montserrat">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={registerData.name || ""}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email || ""}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={
                      activeTab === "login"
                        ? loginData.username || ""
                        : registerData.username || ""
                    }
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                  />
                </div>
                <div className="font-montserrat">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={
                      activeTab === "login"
                        ? loginData.password || ""
                        : registerData.password || ""
                    }
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full font-montserrat text-white"
                >
                  {activeTab === "login" ? "Login" : "Register"}
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HomePage;
