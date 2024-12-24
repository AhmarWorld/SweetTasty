import './Footer.css';
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";


function Footer() {
  return (
    <footer>
        {/* <img src='https://arbuz.kz/static/platform/frontend/assets/banners/landing/arbuz-logo.png?v2' /> */}
        <p className='footer-head' >
            Телефон доставки: <br/>
            г. Астана: <br/>
            <a href="tel:+77059260000" >+7 (705) 926 00 00</a><br/>
            <a href="tel:+77059260001" >+7 (705) 926 00 00</a><br/>
        </p>
        <p className='footer-head_email' >help@marketly.kz</p>
        <table>
           <tr>
            <td>Доставка</td>
            <td>Акции</td>
            <td>Рекламодателям</td>
           </tr>
           <tr>
            <td>Подписка Friends</td>
            <td>Вакансии</td>
           </tr>
           <tr>
            <td>FAQ</td>
            <td>О нас</td>
           </tr>
        </table>
        <div className='footer-icons'>
          <FaSquareFacebook size={45} />
          <FaSquareInstagram size={45} />
          <FaSquareWhatsapp size={45} />
        </div>
    </footer> 
  )
}

export default Footer