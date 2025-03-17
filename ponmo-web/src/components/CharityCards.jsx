const CardSection = () => {
    const cards = [
      {
        id: "security",
        title: "Support",
        description: "We donate to orphanages to ensure every child's basic needs are met. By doing so, we help create a stable and healthy foundation for their physical and emotional well-being.",
        bgColor: "bg-orange-500",
        button: "Donate Now"
      },
      {
        id: "scalability",
        title: "Education",
        description: "Orphanages often serve as educational hubs. Our donations empower orphaned children with the knowledge and skills they need to build brighter futures for themselves.",
        bgColor: "bg-orange-400",
        button1: "Be a Volunteer"
      }
    ];
  
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-1 text-orange-700">Why Donate?</h2>
          <p className="text-xl text-center mb-1 " style={{fontFamily:'Verdana'}}>Join us in making a difference</p>
          <p className="text-sm text-center mb-8 " style={{fontFamily:'Verdana light'}}>By donating foodstuffs to charity, supporting orphanages and providing loving care to children in need.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <card>
            <div className="p-6 rounded-lg shadow-md bg-orange-700 text-left text-white">
                <h4 className="text-xl "> Served Over </h4>
                <h2 className="text-5xl mt-2">1,432,805</h2>
                <h4 className="text-xl mt-4 py-2 "> Children in 190 countries in the world </h4>
            </div>
            </card>

            {cards.map((card) => (
              <div
                key={card.id}
                id={card.id}
                className={`p-6 rounded-lg shadow-md text-left text-white ${card.bgColor}`}
              >
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="mt-2">{card.description}</p>
                <button className="mt-4 px-4 py-2 bg-white text-black rounded-lg shadow-md hover:bg-black hover:text-white transition">
                {card.button} {card.button1}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default CardSection;
  