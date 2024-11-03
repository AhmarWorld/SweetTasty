import DailyCard from '../DailyCard/DailyCard'
import './DailyItem.css'

function DailyItem() {
    return (
        <div className='daily-item'>
            <h3>Товар дня</h3>
            <DailyCard />
        </div>
    )
}

export default DailyItem