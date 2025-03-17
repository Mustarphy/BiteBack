const donations = [
    {
      id: 1,
      name: "Ivan Jacobson",
      amount: 300,
      cause: "Children Needs Food",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Ivan Jacobson",
      amount: 150,
      cause: "Children Needs Food",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "Ivan Jacobson",
      amount: 250,
      cause: "Children Needs Food",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];
  
  export default function LatestDonations() {
    return (
      <section className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">LATEST DONATIONS</h2>
        <p className="text-gray-500 mb-8">
          Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {donations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white shadow-md rounded-lg p-6 w-80 text-center"
            >
              <img
                src={donation.image}
                alt={donation.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold">{donation.name}</h3>
              <p className="text-gray-400 text-sm">Donated Just now</p>
              <p className="mt-2 text-lg">
                Donated <span className="text-green-500 font-semibold">${donation.amount}</span> for
              </p>
              <p className="text-orange-500 font-semibold cursor-pointer">{donation.cause}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  