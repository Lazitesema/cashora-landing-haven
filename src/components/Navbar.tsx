
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-semibold text-cashora-600 flex items-center gap-2"
          >
            Cashora
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/signin">
              <Button variant="ghost" className="text-cashora-600">
                Sign in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-cashora-500 text-white hover:bg-cashora-600">
                Create account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
