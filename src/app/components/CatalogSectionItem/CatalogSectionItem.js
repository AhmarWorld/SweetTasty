import Link from "next/link";
import "./CatalogSectionItem.css";

export default function CatalogSectionItem({id,img, name }) {
  return (
    <Link href={'/catalog/subcatalog/'+id} className="catalog-section-item">
      <img
        className="cat-item"
        // src={process.env.NEXT_PUBLIC_SERVER_URL + img}
        src="https://arbuz.kz/image/s3/arbuz-kz-products/file_name__daafaf07-b6ad-4462-bc58-a8f7655f4cf9-19367-001_jpg.jpg?w=720&h=720&_c=1719999319"
      />
      <p>{name}</p>
    </Link>
  );
}
