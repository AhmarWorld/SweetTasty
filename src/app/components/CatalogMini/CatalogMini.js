import CatalogCarousel from '../CatalogCarousel/CatalogCarousel'
import './CatalogMini.css'

function CatalogMini({ badge, productsList, headingText }) {
    return (
        <div className='catalog-mini'>
            <h3 style={{ marginBottom: 10 }}>{badge?.name || headingText}</h3>
            <CatalogCarousel badgeId={badge?.id} productsList={productsList} />
        </div>
    )
}

export default CatalogMini