import { DollarSign, HandHeart, Handshake } from "lucide-react";

const FeatureCards = () => {
  const features = [
    {
      id: "donation",
      title: "Make Donation",
      description:
        "Your donation helps us provide essential support to orphanages and vulnerable children in our community.",
      icon: <HandHeart className="text-orange-500 w-12 h-12" />,
    },
    {
      id: "volunteer",
      title: "Become A Volunteer",
      description:
        "At BiteBack, we rely on the kindness and dedication of volunteers like you to help us make a difference in the lives of children in need.",
      icon: <Handshake className="text-orange-500 w-12 h-12" />,
    },
    {
      id: "sponsorship",
      title: "Sponsorship",
      description:
        "At BiteBack, we're dedicated to providing essential support to orphanages and vulnerable children. As a sponsor, you'll play a vital role in helping us achieve our mission.",
      icon: <DollarSign className="text-orange-500 w-12 h-12" />,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center">
              {feature.icon}
              <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
