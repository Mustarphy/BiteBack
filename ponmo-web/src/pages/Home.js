import Categories from "../components/Categories";
import DiscountBanners from "../components/DiscountBanner";
import HeroSection from "../components/HeroSection";
import ProductList from "../components/ProductList";

function Home() {
    return (
      <div className="mt-10">
         {/* Hero Section */}
        <HeroSection></HeroSection>
  
        {/* Featured Products */}
        <section className="py-16">
          <DiscountBanners></DiscountBanners>
          {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
            {/* <h2 className="text-3xl font-bold text-center mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"> */}
              {/* Add product cards here */}
            {/* </div>
          </div> */}
         
        </section>
  
        {/* Categories */}
        <section className="py-16">
           <Categories></Categories>
        </section>

        <div>
          <ProductList></ProductList>
        </div>

      </div>
    );
  }
  
  export default Home; 