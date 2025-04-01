import styles from "./TablePreview.module.scss";

export default function TablePreview({
  previewName,
  imgName,
}: {
  previewName: string;
  imgName: string;
}): JSX.Element {
  return (
    <div className={styles["table-preview"]}>
      <img
        src={`/${imgName}`}
        alt="planet icon"
        className={styles["table-preview-image"]}
      />
      <div className={styles["preview-name"]}>{previewName}</div>
    </div>
  );
}
