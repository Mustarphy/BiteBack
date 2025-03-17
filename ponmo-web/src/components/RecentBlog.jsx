const newsArticles = [
    {
      id: 1,
      date: "Sept 10, 2018",
      author: "Admin",
      comments: 3,
      title: "Hurricane Irma has devastated Florida",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      image: "/event2.jpg",
    },
    {
      id: 2,
      date: "Sept 10, 2018",
      author: "Admin",
      comments: 3,
      title: "Hurricane Irma has devastated Florida",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      image: "/event4.jpg",
    },
    {
      id: 3,
      date: "Sept 10, 2018",
      author: "Admin",
      comments: 3,
      title: "Hurricane Irma has devastated Florida",
      description: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
      image: "/evente3.jpg",
    },
  ];
  
  export default function NewsCards() {
    return (
      <section className="text-center py-12">
        <h2 className="text-2xl font-bold mb-6">Recent from blog</h2>
        <p className="text-gray-500 mb-8">With your support, we can help more lives</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {newsArticles.map((article) => (
            <div key={article.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-56 object-cover" />
              <div className="p-6 text-left">
                <p className="text-gray-400 text-sm">{article.date} &nbsp; | &nbsp; {article.author} &nbsp; | &nbsp; 💬 {article.comments}</p>
                <h3 className="text-lg font-semibold mt-2">{article.title}</h3>
                <p className="text-gray-500 mt-2">{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  