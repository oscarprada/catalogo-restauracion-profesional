import { Link } from "react-router-dom";

function ProtectedAreaCard({ area }) {
  return (
    <article className="area-card">

      <div className="area-banner">
        {area.banner_url ? (
          <img src={area.banner_url} alt={area.name} />
        ) : (
          <div className="area-banner-placeholder">
            Área Protegida
          </div>
        )}
      </div>

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

        <p className="area-description">
          {area.description}
        </p>

        <Link
          className="primary-button"
          to={`/areas/${area.id}`}
        >
          Explorar catálogo
        </Link>

      </div>

    </article>
  );
}

export default ProtectedAreaCard;
