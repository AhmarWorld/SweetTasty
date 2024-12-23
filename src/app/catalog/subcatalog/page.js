import Footer from "../../components/Footer/Footer";
import Search from "../../components/Search/Search";
import './subcatalog.css'

export default function Subcatalog() {
  return (
    <div className="main-subcatalog">
      <Search placeholder="Искать в Marketly" />

      <Footer />
    </div>
  )
}