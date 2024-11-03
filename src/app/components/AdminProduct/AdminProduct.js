import "./AdminProduct.css";

export default function AdminProduct({ item }) {
  return (
    <div className="admin_product">
      <img
        className="admin_product-img"
        src="https://arbuz.kz/image/s3/arbuz-kz-products/302438-farsh_kazbeef_zeren_iz_govyadiny_70_30_ohl_1_kg_.png?w=720&h=720&_c=1727244986"
      />
      <div className="admin_product-name">{item.name}</div>
      <div className="admin_product-price">{item.price}</div>
    </div>
  );
}
