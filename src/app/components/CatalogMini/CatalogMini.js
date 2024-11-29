import CatalogCarousel from '../CatalogCarousel/CatalogCarousel'
import './CatalogMini.css'

function CatalogMini({ badge }) {
    return (
        <div className='catalog-mini'>
            <h3>{badge.name}</h3>
            <CatalogCarousel badgeId={badge.id} />
        </div>
    )
}

export default CatalogMini