import Link from "next/link";
import "./CatalogSectionItem.css";

export default function CatalogSectionItem({id,img, name }) {
  return (
    <Link href={'/catalog/subcatalog/'+id} className="catalog-section-item">
      <img
        className="cat-item"
        // src={process.env.NEXT_PUBLIC_SERVER_URL + img}
        src={img}
      />
      <p>{name}</p>
    </Link>
  );
}
