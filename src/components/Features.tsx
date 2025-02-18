
import { CreditCard, DollarSign, Building, User } from "lucide-react";

const features = [
  {
    name: "Smart Financial Management",
    description:
      "Utilize advanced algorithms to optimize your financial operations and improve efficiency.",
    icon: DollarSign,
  },
  {
    name: "Secure Transactions",
    description:
      "Enterprise-grade security measures to protect your financial data and transactions.",
    icon: CreditCard,
  },
  {
    name: "Business Integration",
    description:
      "Seamlessly integrate with your existing business systems and workflows.",
    icon: Building,
  },
  {
    name: "Personalized Experience",
    description:
      "Tailored solutions that adapt to your specific business needs and requirements.",
    icon: User,
  },
];

export const Features = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Why Choose Cashora
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Experience the power of modern financial technology
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative group animate-fadeIn"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cashora-500 to-cashora-600 rounded-lg blur opacity-0 group-hover:opacity-10 transition duration-500" />
              <div className="relative p-6 bg-white border border-gray-100 rounded-lg shadow-sm transition duration-300 hover:shadow-md">
                <div className="w-12 h-12 rounded-lg bg-cashora-50 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-cashora-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
