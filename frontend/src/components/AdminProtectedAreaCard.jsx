import PrimaryButton from "./PrimaryButton";

function AdminProtectedAreaCard({ area }) {

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

          <PrimaryButton>

            Abrir

          </PrimaryButton>

          <PrimaryButton>

            Editar

          </PrimaryButton>

          <PrimaryButton>

            Eliminar

          </PrimaryButton>

        </div>

      </div>

    </article>

  );

}

export default AdminProtectedAreaCard;

