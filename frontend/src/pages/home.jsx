import Hero from "../components/hero";
import LatestCollection from "../components/latestCollection";
import BestSeller from "../components/bestSeller";
import OurPolicy from "../components/ourPolicy";
import NewsLetterBox from "../components/newsLetterBox";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
