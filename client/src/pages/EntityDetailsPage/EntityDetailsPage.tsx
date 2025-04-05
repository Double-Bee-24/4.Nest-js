import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { getEntityConfig } from "../../utils/table-config";
import "./EntityDetailsPage.scss";
import { fromCamelToHumanCase } from "../../utils/string-utils";
import { getImageUploadConfig } from "../../utils/image-upload-config";
import { TableName } from "../../types/table.type";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_BASE_API_URL;

export default function EntityDetailsPage(): JSX.Element {
  const { id, tableName } = useParams<{ id: string; tableName: TableName }>();
  if (!tableName || !id) {
    throw new Error("Table name incorrect or not found");
  }

  const [entityDetails, setEntityDetails] = useState<{
    name?: string;
    title?: string;
    description: string;
  }>({
    description: "No description available",
  });
  const [imageSrc, setImageSrc] = useState(`${apiUrl}${tableName}/image/${id}`);

  useEffect(() => {
    (async function () {
      const tableConfig = getEntityConfig();

      const getData = tableConfig[tableName];

      const data = await getData(Number(id));
      if (data) {
        setEntityDetails(data);
      }
    })();
  }, []);

  const excludedKeys = ["created", "edited", "id", "avatar"];

  const listItems = entityDetails
    ? Object.entries(entityDetails)
        .filter(([key]) => !excludedKeys.includes(key))
        .map(([key, value]) => {
          const formattedKey = fromCamelToHumanCase(key);

          return (
            <li key={key}>
              <strong>{formattedKey}:</strong> {value}
            </li>
          );
        })
    : [];

  const entityName =
    entityDetails.title !== "Unknown Title"
      ? entityDetails.title
      : entityDetails.name;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUploadConfig = getImageUploadConfig();
    const imageUploadFunction = imageUploadConfig[tableName];

    const file = e.target.files?.[0];

    if (!file) {
      console.error("Error during file choosing");
      return;
    }

    await imageUploadFunction(Number(id), file);
    setImageSrc(`${apiUrl}${tableName}/image/${id}?timestamp=${Date.now()}`);
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
              <img src={imageSrc} className="avatar" />
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
