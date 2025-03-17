import React from "react";

const testimonials = [
  {
    name: "John Carter",
    role: "Businessman",
    image: "/whitegirlprofile.jpg", // Replace with actual image paths
    quote:
      "Love their organic high quality selections. Great customer service. Recommend to all my friends and family!",
  },
  {
    name: "Lisa Martines",
    role: "Housewife",
    image: "/profilePicsGirl.jpg",
    quote:
      "By far my favorite supermarket. Delicious smoothie and vegan cupcakes and plenty of healthy foods to choose from.",
  },
  {
    name: "Mike Nelson",
    role: "Web Developer",
    image: "/profilePics.jpg",
    quote:
      "Great delivery department. Very accommodating! Also, the re-sliced fruit cups are excellent.",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-green-100 py-16 px-6 md:px-20">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Supermarket automatic doors open for me
        </h2>
        <p className="text-gray-600 mt-2">
          A person buying ordinary products in a supermarket is in touch with his deepest emotions.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-green-500 text-white p-6 rounded-lg shadow-lg relative"
          >
            <p className="italic mb-4">"{testimonial.quote}"</p>
            {/* User Info */}
            <div className="flex items-center space-x-3 mt-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <div>
                <h4 className="font-bold">{testimonial.name}</h4>
                <p className="text-sm">{testimonial.role}</p>
              </div>
            </div>
            {/* Speech Bubble Tail */}
            <div className="absolute bottom-[-10px] left-6 w-6 h-6 bg-green-500 rotate-45"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
