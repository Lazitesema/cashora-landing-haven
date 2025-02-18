
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // We'll implement this with Supabase later
    console.log("Sign in attempt", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-br from-cashora-50/50 to-white -z-10" />
      <div className="max-w-md w-full mx-auto p-8">
        <div className="bg-white shadow-xl rounded-xl p-8 space-y-6 border border-gray-100 animate-fadeIn">
          <div className="text-center space-y-2">
            <Link
              to="/"
              className="text-2xl font-semibold text-cashora-600 inline-block mb-6"
            >
              Cashora
            </Link>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cashora-50 mb-4">
              <LogIn className="w-6 h-6 text-cashora-500" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
            <p className="text-gray-600">Sign in to continue to Cashora</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-cashora-500 text-white hover:bg-cashora-600"
            >
              Sign in
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account?</span>{" "}
            <Link
              to="/signup"
              className="text-cashora-600 hover:text-cashora-700 font-medium"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
