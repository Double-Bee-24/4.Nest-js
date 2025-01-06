import styles from "./TablePreview.module.scss";

export default function TablePreview({
  previewName,
}: {
  previewName: string;
}): JSX.Element {
  return <div className={styles["table-preview"]}>{previewName}</div>;
}
