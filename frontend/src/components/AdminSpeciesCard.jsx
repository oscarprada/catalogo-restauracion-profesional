import { Link } from "react-router-dom";

import PrimaryButton from "./PrimaryButton";

function AdminSpeciesCard({ species, areaId, onDelete }) {

  return (

    <article className="area-card">

      <div className="area-content">

        <h3>{species.common_name}</h3>

        <p>
          <strong>Nombre científico:</strong><br />
          <em>{species.scientific_name}</em>
        </p>

        <p>
          <strong>Familia:</strong> {species.family || "-"}
        </p>

        <p>
          <strong>Ecosistema:</strong> {species.ecosystem || "-"}
        </p>

        <div className="button-group">

          <Link to={`/species/${species.id}`}>

            <PrimaryButton>

              Ver ficha

            </PrimaryButton>

          </Link>

          <Link
            to={`/admin/areas/${areaId}/species/${species.id}/edit`}
          >

            <PrimaryButton>

              Editar especie

            </PrimaryButton>

          </Link>

          <PrimaryButton
            onClick={() => onDelete(species)}
          >

            Eliminar especie

          </PrimaryButton>

        </div>

      </div>

    </article>

  );

}

export default AdminSpeciesCard;

