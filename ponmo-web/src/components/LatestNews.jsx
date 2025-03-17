import { useEffect, useState } from "react";

export default function LatestNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = () => {
      fetch("http://localhost:5000/api/news")
        .then((res) => res.json())
        .then((data) => setNews(data))
        .catch((err) => console.error("Error fetching news:", err));
    };
  
    fetchNews(); // Fetch initially
    const interval = setInterval(fetchNews, 60000); // Fetch every 60 seconds
  
    return () => clearInterval(interval); // Cleanup
  }, []);  

  return (
    <section className="text-center py-12">
      <h2 className="text-2xl font-bold mb-6">LATEST NEWS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length > 0 ? (
          news.slice(0, 3).map((article) => (
            <div key={article._id} className="bg-white shadow-md rounded-lg p-6">
              <img
                src={article.image || "https://via.placeholder.com/400"}
                alt={article.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-gray-500 text-sm">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-semibold mt-2 block"
              >
                Read More
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No news available at the moment.</p>
        )}
      </div>
    </section>
  );
}
