
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    dateOfBirth: undefined as Date | undefined,
    placeOfBirth: "",
    residence: "",
    nationality: "",
  });
  const [idCard, setIdCard] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // We'll implement this with Supabase later
    console.log("Sign up attempt", { ...formData, idCard });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdCard(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-br from-cashora-50/50 to-white -z-10" />
      <div className="max-w-2xl w-full mx-auto p-8">
        <div className="bg-white shadow-xl rounded-xl p-8 space-y-6 border border-gray-100 animate-fadeIn">
          <div className="text-center space-y-2">
            <Link
              to="/"
              className="text-2xl font-semibold text-cashora-600 inline-block mb-6"
            >
              Cashora
            </Link>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cashora-50 mb-4">
              <UserPlus className="w-6 h-6 text-cashora-500" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Create your account
            </h1>
            <p className="text-gray-600">
              Fill in your information to get started with Cashora
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Date of birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dateOfBirth && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfBirth ? (
                        format(formData.dateOfBirth, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dateOfBirth}
                      onSelect={(date) =>
                        setFormData((prev) => ({ ...prev, dateOfBirth: date }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="placeOfBirth">Place of birth</Label>
                <Input
                  id="placeOfBirth"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="residence">Residence</Label>
                <Input
                  id="residence"
                  name="residence"
                  value={formData.residence}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idCard">ID Card</Label>
                <Input
                  id="idCard"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-cashora-500 text-white hover:bg-cashora-600"
            >
              Create account
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>{" "}
            <Link
              to="/signin"
              className="text-cashora-600 hover:text-cashora-700 font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
