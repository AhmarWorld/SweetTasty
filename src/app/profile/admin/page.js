import ProfileNavItem from "@/app/components/ProfileNavItem/ProfileNavItem";
import "./admin.css";
import Footer from "@/app/components/Footer/Footer";

function Admin() {
  

  return (
      <div className="profile-main">
        <h3 id="profile-admin_title" >Администратор</h3>
        <div className="profile-select">
          <ul>
            <ProfileNavItem href={"/profile/admin"} text={"Админ"} />
            <ProfileNavItem href={"/profile/admin/products"} text={"Продукты"} />
            <ProfileNavItem href={"/profile/admin/stats"} text={"Статистика"} />
          </ul>
        </div>
        <Footer />
      </div>
    )
}

export default Admin;
