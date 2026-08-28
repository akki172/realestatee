import { Link } from "react-router-dom";
import "../css/PropertyCard.css";

function PropertyCard({ property }) {
  return (
    <div className="property-card">

      {/* Image */}
      <div className="property-card-img-wrap">
        <img
          className="property-card-img"
          src={
            property.imageUrl ||
            `https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80`
          }
          alt={property.title}
        />
        <span className="property-card-type">{property.propertyType}</span>
      </div>

      {/* Body */}
      <div className="property-card-body">
        <h2 className="property-card-title">{property.title}</h2>
        <p className="property-card-location">📍 {property.city}</p>

        <div className="property-card-meta">
          <span>🛏 {property.bedrooms} Beds</span>
          <span>🚿 {property.bathrooms} Baths</span>
          <span>📐 {property.area} sq.ft</span>
        </div>

        <div className="property-card-footer">
          <p className="property-card-price">
            ₹ {property.price.toLocaleString("en-IN")}
          </p>
          <Link to={`/property/${property.id}`}>
            <button className="details-btn">View Details</button>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default PropertyCard;