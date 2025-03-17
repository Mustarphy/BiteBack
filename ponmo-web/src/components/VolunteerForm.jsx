import { useState } from "react";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch("http://localhost:5000/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMessage(result.error || "Failed to send message.");
      }
    } catch (error) {
      setResponseMessage("Error sending message.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-orange-600">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-orange-700 opacity-50"></div>

      {/* Container */}
      <div className="relative z-10 flex max-w-5xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/tapWater1.jpg')" }}></div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-8 bg-orange-500 text-white">
          <h2 className="text-3xl font-bold mb-4">Be a Volunteer</h2>
          {responseMessage && <p className="text-green-200 mb-2">{responseMessage}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-white bg-transparent text-white placeholder-white rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-white bg-transparent text-white placeholder-white rounded-md"
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-white bg-transparent text-white placeholder-white rounded-md"
              rows="4"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full p-3 bg-white text-orange-600 font-bold rounded-md hover:bg-gray-200 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VolunteerForm;
