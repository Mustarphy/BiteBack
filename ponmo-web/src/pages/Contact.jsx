import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    department: "Business Department",
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
      setFormData({ name: "", email: "", message: "",  department: "" });
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
    <div className="">
        <div className=" ">

        <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/contact.jpg" // Replace with the actual image path
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Text Content */}
      <div className="relative text-center text-white z-10">
        <h2 className="text-3xl md:text-5xl font-bold">CONTACT US</h2>
        <p className="mt-2 text-lg md:text-xl">
          Our team is always ready to assist you on anything
        </p>
      </div>
    </section>

        </div>
    <div className="flex flex-col lg:flex-row bg-[#0E2A47] text-white p-6 lg:p-12 rounded-3xl max-w-6xl mx-auto shadow-xl space-y-6 lg:space-y-0 lg:space-x-6 m-10">
      {/* Left Section - Contact Form */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold">
          Get in <span className="text-green-500">touch</span> with us
        </h2>
        {responseMessage && <p className="text-green-200 mb-2">{responseMessage}</p>}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name (*)"
              className="p-3 rounded-lg bg-white text-black w-full"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email (*)"
              className="p-3 rounded-lg bg-white text-black w-full"
              required
            />
          </div>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="p-3 rounded-lg bg-white text-black w-full"
          />

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white text-black w-full"
          >
            <option>Business Department</option>
            <option>Customer Support</option>
            <option>Technical Support</option>
          </select>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Question"
            className="p-3 rounded-lg bg-white text-black w-full h-32 resize-none"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition"
            disabled={loading}
          >
           {loading ? "Sending..." : "Send Now"}
          </button>
        </form>
      </div>

          {/* Right Section - Leaflet Map */}
          <div className="flex-1">
        <MapContainer
          center={[7.145244, 	3.327695]} // New York City Coordinates
          zoom={13}
          className="w-full h-80 lg:h-full rounded-xl shadow-lg z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[7.145244, 3.327695]}>
            <Popup>We are here! Visit us anytime.</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
</div>
  );
};


export default ContactForm;
