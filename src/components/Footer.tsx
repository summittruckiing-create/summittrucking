import { Truck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Truck className="w-8 h-8" />
            <span className="text-xl font-bold">TransPro Logistics</span>
          </div>
          <p className="text-primary-foreground/70 text-sm text-center md:text-right">
            © {new Date().getFullYear()} TransPro Logistics. All rights reserved.<br />
            Reliable Transportation Solutions Nationwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
