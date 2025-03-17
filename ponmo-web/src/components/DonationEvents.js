const donationEvents = [
    {
      id: 1,
      date: "Sep. 10, 2018",
      admin: "Admin",
      comments: 3,
      title: "World Wide Donation",
      time: "10:30AM-03:30PM",
      venue: "Venue Main Campus",
      description:
        "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      image: "/event2.jpg",
    },
    {
      id: 2,
      date: "Sep. 10, 2018",
      admin: "Admin",
      comments: 3,
      title: "World Wide Donation",
      time: "10:30AM-03:30PM",
      venue: "Venue Main Campus",
      description:
        "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      image: "/event5.jpg",
    },
    {
      id: 3,
      date: "Sep. 10, 2018",
      admin: "Admin",
      comments: 3,
      title: "World Wide Donation",
      time: "10:30AM-03:30PM",
      venue: "Venue Main Campus",
      description:
        "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      image: "/event4.jpg",
    },
  ];
  
  export default function DonationEvents() {
    return (
      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">Upcoming Donation Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {donationEvents.map((event) => (
            <div key={event.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-6 text-left">
                <p className="text-gray-500 text-sm flex justify-between items-center">
                  <span>{event.date}</span>
                  <span>{event.admin}</span>
                  <span>💬 {event.comments}</span>
                </p>
                <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
                <p className="text-orange-500 text-sm flex items-center gap-2 mt-1">
                  ⏰ {event.time} 📍 {event.venue}
                </p>
                <p className="text-gray-600 mt-2">{event.description}</p>
                <a href="/" className="text-red-500 font-semibold mt-4 inline-block">
                  Join Event &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  