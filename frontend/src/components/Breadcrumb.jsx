import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb">

      {items.map((item, index) => (
        <span key={index}>

          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <strong>{item.label}</strong>
          )}

          {index < items.length - 1 && (
            <span className="separator">
              {" > "}
            </span>
          )}

        </span>
      ))}

    </nav>
  );
}

export default Breadcrumb;

