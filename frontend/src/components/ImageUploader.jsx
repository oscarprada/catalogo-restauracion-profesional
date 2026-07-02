import { useState } from "react";

function ImageUploader({ speciesId, onUpload }) {

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function uploadImage() {

    if (!file) return;

    try {

      setUploading(true);

      const formData = new FormData();

      formData.append("image", file);

      const response = await fetch(
        `http://localhost:3000/api/species/${speciesId}/images`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("No fue posible subir la imagen.");
      }

      setFile(null);

      if (onUpload) {
        onUpload();
      }

      alert("Imagen cargada correctamente.");

    } catch (error) {

      console.error(error);
      alert(error.message);

    } finally {

      setUploading(false);

    }

  }

  return (

    <section>

      <h2>Agregar imagen</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button
        onClick={uploadImage}
        disabled={uploading}
      >
        {uploading ? "Subiendo..." : "Subir imagen"}
      </button>

    </section>

  );

}

export default ImageUploader;
