import './Filter.css'
import { PiSlidersHorizontalFill } from "react-icons/pi";

export default function Filter({active,setActive}) {
  const onClick=()=>{
    setActive(!active)
  }
  return (
    <div onClick={onClick} className='filter-button'>
        <PiSlidersHorizontalFill size={24} />
        <span className='filter-button_text'>Фильтры</span>
    </div>
  )
}
