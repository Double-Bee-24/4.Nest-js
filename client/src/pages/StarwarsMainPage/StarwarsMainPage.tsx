import { Link } from "react-router-dom";
import styles from "./StarwarsMainPage.module.scss";
import TablePreview from "../../components/TablePreview/TablePreview";

export default function StarwarsMainPage(): JSX.Element {
  const tablePreviewNames = [
    "Films",
    "People",
    "Planets",
    "Species",
    "Starships",
    "Vehicles",
  ];

  const tablePreviews = tablePreviewNames.map((item, index) => (
    <Link
      key={index}
      to={`/table/${item.toLowerCase()}`} // Формуємо шлях для таблиці
      className={styles["table-link"]}
    >
      <TablePreview previewName={item} />
    </Link>
  ));

  return <div className={styles["table-preview-wrapper"]}>{tablePreviews}</div>;
}
