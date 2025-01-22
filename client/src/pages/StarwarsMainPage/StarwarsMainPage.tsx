import { Link } from "react-router-dom";
import styles from "./StarwarsMainPage.module.scss";
import TablePreview from "../../components/TablePreview/TablePreview";
import Header from "../../components/Header/Header";

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
      to={`/table/${item.toLowerCase()}`}
      className={styles["table-link"]}
    >
      <TablePreview previewName={item} />
    </Link>
  ));

  return (
    <>
      <Header />
      <div className={styles["table-preview-wrapper"]}>{tablePreviews}</div>
    </>
  );
}
