const AboutSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                About Our Company
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                With over 25 years in the logistics industry, we have built a reputation for delivering excellence across the nation. Our commitment to safety, reliability, and customer satisfaction has made us a trusted partner for businesses of all sizes.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We're more than just a trucking company – we're a team of dedicated professionals who take pride in keeping America moving. Join our growing family of drivers and be part of something bigger.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-black text-accent">25+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-accent">500+</div>
                  <div className="text-sm text-muted-foreground">Professional Drivers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-accent">48</div>
                  <div className="text-sm text-muted-foreground">States Covered</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Fleet of trucks at sunset"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-xl">
                <div className="text-2xl font-black">100%</div>
                <div className="text-sm">Safety Focused</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
