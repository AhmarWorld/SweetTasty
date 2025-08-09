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
          <a href="tel:+77023953078" >+7 702 395 30 78</a><br/>
          г. Астана<br/>
        </p>
        <p className='footer-head_email'>marketlykz@mail.ru</p>
        <table>
          <tr>
            <td>Доставка</td>
          </tr>
          <tr>
            <td>О нас</td>
          </tr>
        </table>
        <div className='footer-icons'>
          <FaSquareInstagram size={45} onClick={() => window.open("https://www.instagram.com/marketly.ast?igsh=MWdza3BqaGQ4YXJ1cw==")} />
          <FaSquareWhatsapp size={45} onClick={() => window.open("https://wa.me/+77023953078")} />
        </div>
    </footer> 
  )
}

export default Footer