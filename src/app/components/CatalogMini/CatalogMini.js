import CatalogCarousel from '../CatalogCarousel/CatalogCarousel'
import './CatalogMini.css'

function CatalogMini({ text }) {
    return (
        <div className='catalog-mini'>
            <h3>{text}</h3>
            <CatalogCarousel />
        </div>
    )
}

export default CatalogMini