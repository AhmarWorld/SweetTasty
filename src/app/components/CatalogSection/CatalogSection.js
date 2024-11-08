import CatalogSectionItem from "../CatalogSectionItem/CatalogSectionItem";
import "./CatalogSection.css";

export default function CatalogSection({ title, subCat }) {
  return (
    <section className="catalog-section">
      <h2>{title}</h2>
      <div className="catalog-section_list">
        {subCat?.map((cat) => (
          <CatalogSectionItem
            // img={cat.image}
            id={cat.id}
            img={
              "https://arbuz.kz/image/s3/arbuz-kz-products/file_name__daafaf07-b6ad-4462-bc58-a8f7655f4cf9-19367-001_jpg.jpg?w=720&h=720&_c=1719999319"
            }
            name={cat.name}
          />
        ))}
      </div>
    </section>
  );
}
