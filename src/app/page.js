import Carousel from "./components/Carousel/Carousel";
import CatalogMini from "./components/CatalogMini/CatalogMini";
import DailyItem from "./components/DailyItem/DailyItem";
import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer.js";
import HotOffers from "./components/HotOffers/HotOffers";

export default function Home() {
  return (
    <main>
      <Carousel />
      <Search placeholder={"Искать в SweetTasty"} />
      <HotOffers/>
      <div className="main-catalog">
        <CatalogMini text={"Первая покупка с выгодой"} />
        <DailyItem/>
        <Footer />
      </div>
    </main>
  );
}
