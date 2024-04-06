import { ChevronLeft, ChevronRight, Search, ShoppingCart } from "lucide-react";

const Navbar = () => {
  // Array of navigation items
  const navItems = [
    { label: "Category" },
    { label: "Sale" },
    { label: "Clearance" },
    { label: "New stock" },
    { label: "Trending" },
  ];

  return (
    <>
      {/* Header Section */}
      <nav className="p-6">
        {/* Top Navigation */}
        <div className="flex items-center justify-end space-x-3">
          <p className="text-sm">Help</p>
          <p className="text-sm">Orders & Return</p>
          <p className="text-sm font-medium">Hi, John</p>
        </div>
        {/* Main Navigation */}
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Ecommerce</h1>
          <div className="flex items-center space-x-12 text-lg font-semibold">
            {/* Mapping over the navItems array */}
            {navItems.map((item, index) => (
              <div key={index}>{item.label}</div>
            ))}
          </div>
          <div className="flex items-center space-x-9">
            <Search className="h-5 w-5" />
            <ShoppingCart className="h-5 w-5" />
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="flex items-center justify-center space-x-5 bg-zinc-100 p-2">
        <ChevronLeft className="h-5 w-5" />
        <p className="text-sm font-medium md:text-base">
          Get 10% off on business sign up
        </p>
        <ChevronRight className="h-5 w-5" />
      </div>
    </>
  );
};

export default Navbar;
