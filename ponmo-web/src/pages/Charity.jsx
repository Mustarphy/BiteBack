import { PlayIcon } from "@heroicons/react/24/outline";
import CardSection from "../components/CharityCards";
import FeatureCards from "../components/FeatureCard";
import DonationCarousel from "../components/DonateCard";
import LatestDonations from "../components/LatestDonation";
import ImageGallery from "../components/ImageGallery";
import NewsCards from "../components/RecentBlog";
import LatestNews from "../components/LatestNews";
import DonationEvents from "../components/DonationEvents";
import VolunteerForm from "../components/VolunteerForm";

const Hero = () => {
    return (
      <>
      {/* hero section */}
      <section
        className="mx-auto bg-transparent backdrop-filter backdrop-blur-md bg-center text-white py-20 w-full"
        style= {{ backgroundImage: "url('/Black.jpg' )"} }
      >
        <div className="bg-[#00000099]">
        <div className="container mx-auto px-6 text-center py-16 rounded-lg">
          <h1 className="text-4xl font-bold "  style= {{fontFamily: 'Garamond'}}>Support BiteBack Mission to Provide Fresh Food and Provisions to Motherless Children with Your Online Shopping.</h1>
          <p className="mt-4 text-lg">Our platform enables customers to contribute fresh food and provisions to less privileged children when checking out their orders.</p>
          <button className="mt-6 px-6 py-3 bg-none text-white border-white border-2 rounded-lg hover:bg-white hover:text-orange-500">
          <PlayIcon> </PlayIcon>Watch Video
          </button>
        </div>
        </div>
      </section>
      {/* hero section end */}

      {/* about section start*/}
      <main>
      <CardSection></CardSection>
     </main>
     <div>
      <FeatureCards></FeatureCards>
     </div>
     {/* Donate section start*/}
     <div>
      <div className= "text-center py-12 ">
        <h1 className="text-2xl  mb-2" style= {{fontFamily: 'Verdana'}}>We keep our word</h1>
        <p className="text-gray-500 mb-1">We have partnered with an orphanage with a proven track record of improving the lives of children living with special needs.</p>
      </div>
      <DonationCarousel></DonationCarousel>
     </div>
     <div>
      <LatestDonations></LatestDonations>
     </div>
     <div>
      <ImageGallery></ImageGallery>
     </div>
      <NewsCards></NewsCards>
      <div>
        <LatestNews></LatestNews>
      </div>
      <div>
        <DonationEvents></DonationEvents>
      </div>
      <div>
        <VolunteerForm></VolunteerForm>
      </div>
     </>
    );
  };
  
  export default Hero;
  