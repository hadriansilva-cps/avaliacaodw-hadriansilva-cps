import { useState } from "react";
import { useFetchDocument } from "../hooks/useFetchDocument";

const ExampleComponent = () => {
  const [docId] = useState("id-do-documento"); 
  const { document, loading, error } = useFetchDocument(docId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Documento:</h1>
      <p>{document ? document.nomeDoCampo : "Documento não encontrado"}</p>
    </div>
  );
};

export default ExampleComponent;