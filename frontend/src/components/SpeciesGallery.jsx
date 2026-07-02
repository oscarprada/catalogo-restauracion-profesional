import { useEffect, useState } from "react";

import { getSpeciesImages } from "../services/speciesImagesService";
import { deleteSpeciesImage } from "../services/speciesImagesApi";

function SpeciesGallery({ speciesId }) {

  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  async function loadImages() {

    try {

      const data = await getSpeciesImages(speciesId);

      setImages(data);

      if (data.length > 0) {
        setSelected(data[0]);
      } else {
        setSelected(null);
      }

    } catch (error) {

      console.error(error);

    }

  }

  useEffect(() => {
    loadImages();
  }, [speciesId]);

  async function removeImage(imageId) {

    if (!window.confirm("¿Eliminar esta imagen?")) {
      return;
    }

    try {

      await deleteSpeciesImage(imageId);

      await loadImages();

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  }

  if (images.length === 0) {

    return (

      <section>

        <h2>Galería</h2>

        <p>No existen imágenes registradas.</p>

      </section>

    );

  }

  return (

    <section>

      <h2>Galería</h2>

      <div className="gallery">

        <div className="gallery-main">

          <img
            src={`http://localhost:3000${selected.image_url}`}
            alt={selected.caption || ""}
          />

        </div>

        <div className="gallery-list">

          {images.map((image) => (

            <div
              key={image.id}
              className="gallery-item"
            >

              <img
                src={`http://localhost:3000${image.image_url}`}
                alt={image.caption}
                className={
                  selected?.id === image.id
                    ? "gallery-thumb active"
                    : "gallery-thumb"
                }
                onClick={() => setSelected(image)}
              />

              <button
                onClick={() => removeImage(image.id)}
              >
                🗑 Eliminar
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default SpeciesGallery;

