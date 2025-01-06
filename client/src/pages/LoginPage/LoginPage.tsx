import { useState } from "react";

export default function LoginPage() {
  const [value, setValue] = useState(10);

  return (
    <>
      <div>Текст</div>
      <div onClick={() => setValue(value + 1)}>{value}</div>
    </>
  );
}
