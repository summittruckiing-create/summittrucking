import { Truck, MapPin, Shield, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Truck,
    title: "Safe & Timely Delivery",
    description: "Our fleet delivers your cargo safely and on schedule, every single time."
  },
  {
    icon: MapPin,
    title: "Nationwide Coverage",
    description: "From coast to coast, we provide comprehensive logistics across all 48 states."
  },
  {
    icon: Shield,
    title: "Experienced Drivers",
    description: "Our professional drivers bring years of expertise and commitment to safety."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service ensures you're never left without assistance."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're committed to excellence in every mile we travel
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-card border-2 border-primary/10 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
