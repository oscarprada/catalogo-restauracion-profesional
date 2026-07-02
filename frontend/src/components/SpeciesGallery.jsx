import { useEffect, useState } from "react";
import { getSpeciesImages } from "../services/speciesImagesService";

function SpeciesGallery({ speciesId }) {

  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {

    async function loadImages() {

      try {

        const data = await getSpeciesImages(speciesId);

        setImages(data);

        if (data.length > 0) {
          setSelected(data[0]);
        }

      } catch (error) {

        console.error(error);

      }

    }

    loadImages();

  }, [speciesId]);

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
            src={selected.image_url}
            alt={selected.caption || "Imagen"}
          />

        </div>

        <div className="gallery-list">

          {images.map((image) => (

            <img
              key={image.id}
              src={image.image_url}
              alt={image.caption}
              className={
                selected?.id === image.id
                  ? "gallery-thumb active"
                  : "gallery-thumb"
              }
              onClick={() => setSelected(image)}
            />

          ))}

        </div>

      </div>

    </section>

  );

}

export default SpeciesGallery;
