import { Link } from "react-router-dom";

import PrimaryButton from "./PrimaryButton";

function AdminProtectedAreaCard({ area, onDelete }) {

  return (

    <article className="area-card">

      <div className="area-content">

        <h3>{area.name}</h3>

        <p>
          <strong>Código:</strong> {area.code}
        </p>

        <p>
          <strong>Departamento:</strong> {area.department}
        </p>

        <p>
          <strong>Municipio:</strong> {area.municipality}
        </p>

        <div className="button-group">

          <Link to={`/admin/areas/${area.id}/edit`}>

            <PrimaryButton>

              Editar

            </PrimaryButton>

          </Link>

          <PrimaryButton
            onClick={() => onDelete(area)}
          >

            Eliminar

          </PrimaryButton>

        </div>

      </div>

    </article>

  );

}

export default AdminProtectedAreaCard;


