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
            img={process.env.NEXT_PUBLIC_SERVER_URL + cat.image}
            name={cat.name}
          />
        ))}
      </div>
    </section>
  );
}
