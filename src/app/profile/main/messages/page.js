import "./messages.css";
import ProfileNavItem from "@/app/components/ProfileNavItem/ProfileNavItem";
import ProfileGeo from "@/app/components/ProfileGeo/ProfileGeo";
import Footer from "@/app/components/Footer/Footer";

export default function Messages() {
  return (
    <div className="messages-main">
      <ProfileGeo />
      <h3>Профиль</h3>
      <div className="profile-select">
        <ul>
          <ProfileNavItem href={"/profile/main"} text={"Профиль"} />
          <ProfileNavItem href={"/profile/main/messages"} text={"Сообщения"} />
          <ProfileNavItem href={"/profile/main/orders"} text={"Заказы"} />
          <ProfileNavItem
            href={"/profile/main/accounting"}
            text={"Бухгалтерия"}
          />
        </ul>
      </div>
      <Footer />
    </div>
  );
}
