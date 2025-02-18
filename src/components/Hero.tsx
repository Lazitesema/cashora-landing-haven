
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-cashora-50 to-white -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center space-y-8 animate-fadeIn">
          <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-cashora-100 text-cashora-800">
            Transform Your Financial Services
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
            Streamline Your Financial Operations with{" "}
            <span className="text-cashora-500">Cashora</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of financial management. Automate your workflows,
            gain valuable insights, and scale your operations effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/signup">
              <Button className="bg-cashora-500 text-white hover:bg-cashora-600 h-12 px-8 text-lg">
                Get Started
              </Button>
            </Link>
            <Link to="/signin">
              <Button
                variant="outline"
                className="border-cashora-200 text-cashora-600 hover:bg-cashora-50 h-12 px-8 text-lg"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
