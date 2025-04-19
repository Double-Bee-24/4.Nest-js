import { Link } from "react-router-dom";
import styles from "./StarwarsMainPage.module.scss";
import TablePreview from "../../components/TablePreview/TablePreview";
import Header from "../../components/Header/Header";
import { createPerson } from "../../services/peopleService";

export default function StarwarsMainPage(): JSX.Element {
  const tablePreviewNames = {
    Films: "jupiter.png",
    People: "mars.png",
    Planets: "planet.png",
    Species: "mercury.png",
    Starships: "green.png",
    Vehicles: "pluto.png",
  };

  const tablePreviews = Object.entries(tablePreviewNames).map(
    ([entityName, imgName], index) => (
      <Link
        key={index}
        to={`/table/${entityName.toLowerCase()}`}
        className={styles["table-link"]}
      >
        <TablePreview previewName={entityName} imgName={imgName} />
      </Link>
    )
  );

  return (
    <>
      <Header />
      <div className={styles["table-preview-wrapper"]}>{tablePreviews}</div>
      <button
        font-size="200"
        onClick={async () => {
          await createPerson();
        }}
      >
        Click me
      </button>
    </>
  );
}
