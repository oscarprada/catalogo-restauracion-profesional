import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function HomePage() {
  return (
    <Layout title="Inicio">

      <div className="welcome-card">

        <h2>Bienvenido</h2>

        <p>
          Sistema profesional para la gestión y publicación de catálogos
          de restauración ecológica.
        </p>

        <div className="button-group">

          <Link className="primary-button" to="/areas">
            Áreas Protegidas
          </Link>

        </div>

      </div>

    </Layout>
  );
}

export default HomePage;


