import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import Header from "../../components/Header/Header";
import { getEntityConfig } from "../../utils/table-config";
import "./EntityDetailsPage.scss";

export default function EntityDetailsPage(): JSX.Element {
  const { id, tableName } = useParams();

  if (!(tableName && id)) {
    throw new Error("Table name incorrect or not found");
  }

  const tableConfig = getEntityConfig();

  const getData = tableConfig[tableName];

  const defaultEntityDetails = {
    name: "Unknown Entity",
    title: "Unknown Title",
    description: "No description available",
  };

  const entityDetails =
    useFetch(() => getData(Number(id))) ?? defaultEntityDetails;

  const excludedKeys = ["created", "edited", "id", "avatar"];

  const listItems = entityDetails
    ? Object.entries(entityDetails)
        .filter(([key]) => !excludedKeys.includes(key))
        .map(([key, value]) => {
          return (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          );
        })
    : [];

  const entityName =
    "title" in entityDetails ? entityDetails.title : entityDetails.name;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <div className="entity-details-page">
        <div className="entity-details">
          <div className="image-container">
            <h2>{entityName}</h2>
            <div className="avatar-container">
              <img
                src={`http://localhost:3000/people/image/${id}`}
                className="avatar"
              />
              <form
                action=""
                onSubmit={handleSubmit}
                className="avatar-upload-form"
              >
                <label htmlFor="fileInput">Choose avatar</label>
                <input id="fileInput" type="file" onChange={handleFileChange} />
              </form>
            </div>
          </div>
          <ul>{listItems}</ul>
        </div>
      </div>
    </>
  );
}
