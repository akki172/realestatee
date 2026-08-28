import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { uploadImage } from "../services/cloudinaryService";
import "../css/AddProperty.css";

function AddProperty() {
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    sellerId:      Number(localStorage.getItem("userId")),
    title:         "",
    description:   "",
    listingType:   "SALE",
    propertyType:  "APARTMENT",
    price:         "",
    area:          "",
    bedrooms:      "",
    bathrooms:     "",
    balconies:     "",
    parking:       "",
    furnished:     "",
    floor:         "",
    totalFloors:   "",
    ageOfProperty: "",
    address:       "",
    city:          "",
    state:         "",
    pincode:       "",
    latitude:      "",
    longitude:     "",
  });

  const [images, setImages]               = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageUrl, setImageUrl]           = useState("");
  const [urlImages, setUrlImages]         = useState([]);
  const [isSubmitting, setIsSubmitting]   = useState(false);

  const handleChange = (e) =>
    setProperty({ ...property, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (i) => {
    setImages(images.filter((_, idx) => idx !== i));
    setImagePreviews(imagePreviews.filter((_, idx) => idx !== i));
  };

  const addImageUrl = () => {
    const url = imageUrl.trim();
    if (!url) return;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("Please enter a valid image URL."); return;
    }
    if (urlImages.includes(url)) { alert("URL already added."); return; }
    setUrlImages([...urlImages, url]);
    setImageUrl("");
  };

  const removeUrlImage = (i) =>
    setUrlImages(urlImages.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const token    = localStorage.getItem("token");
      const sellerId = Number(localStorage.getItem("userId"));
      if (!sellerId) { alert("Seller ID not found. Please login again."); return; }

      const uploadedUrls = [];
      for (const img of images) uploadedUrls.push(await uploadImage(img));

      const propertyData = {
        ...property,
        sellerId,
        price:         property.price         ? Number(property.price)         : null,
        area:          property.area           ? Number(property.area)          : null,
        bedrooms:      property.bedrooms       ? Number(property.bedrooms)      : null,
        bathrooms:     property.bathrooms      ? Number(property.bathrooms)     : null,
        balconies:     property.balconies      ? Number(property.balconies)     : null,
        parking:       property.parking        ? Number(property.parking)       : null,
        floor:         property.floor          ? Number(property.floor)         : null,
        totalFloors:   property.totalFloors    ? Number(property.totalFloors)   : null,
        ageOfProperty: property.ageOfProperty  ? Number(property.ageOfProperty) : null,
        latitude:      property.latitude       ? Number(property.latitude)      : null,
        longitude:     property.longitude      ? Number(property.longitude)     : null,
        imageUrls:     [...uploadedUrls, ...urlImages],
      };

      const response = await axios.post(
        "http://localhost:8080/api/property/add",
        propertyData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      alert(response.data || "Property Added Successfully");
      navigate("/seller/properties");
    } catch (error) {
      alert(error.response?.data?.message || error.response?.data || "Failed to add property.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-property-page">
      <div className="add-property-container">

        {/* Back */}
        <Link to="/seller/dashboard" className="add-property-back">
          ← Back to Dashboard
        </Link>

        {/* Heading */}
        <div className="add-property-heading">
          <span>Seller</span>
          <h1>Add New Property</h1>
        </div>

        <form className="property-form" onSubmit={handleSubmit}>

          {/* ── Listing basics ── */}
          <div className="form-section">
            <p className="form-section-title">Listing Details</p>
            <div className="form-grid">

              <div className="form-group">
                <label>Listing Type</label>
                <select name="listingType" value={property.listingType} onChange={handleChange} required>
                  <option value="SALE">Sell Property</option>
                  <option value="RENT">Rent Property</option>
                </select>
              </div>

              <div className="form-group">
                <label>Property Type</label>
                <select name="propertyType" value={property.propertyType} onChange={handleChange} required>
                  <option value="APARTMENT">Apartment</option>
                  <option value="VILLA">Villa</option>
                  <option value="HOUSE">House</option>
                  <option value="PLOT">Plot</option>
                </select>
              </div>

              <div className="form-group full">
                <label>Title</label>
                <input name="title" placeholder="e.g. Luxury 3BHK in Hyderabad" value={property.title} onChange={handleChange} required />
              </div>

              <div className="form-group full">
                <label>Description</label>
                <textarea name="description" placeholder="Describe the property…" value={property.description} onChange={handleChange} />
              </div>

            </div>
          </div>

          {/* ── Pricing & size ── */}
          <div className="form-section">
            <p className="form-section-title">Pricing & Size</p>
            <div className="form-grid">

              <div className="form-group">
                <label>{property.listingType === "RENT" ? "Monthly Rent (₹)" : "Property Price (₹)"}</label>
                <input name="price" type="number" placeholder="e.g. 4500000" value={property.price} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Area (sq.ft)</label>
                <input name="area" type="number" placeholder="e.g. 1200" value={property.area} onChange={handleChange} />
              </div>

            </div>
          </div>

          {/* ── Property specs ── */}
          <div className="form-section">
            <p className="form-section-title">Property Specs</p>
            <div className="form-grid three-col">

              <div className="form-group">
                <label>Bedrooms</label>
                <input name="bedrooms" type="number" placeholder="e.g. 3" value={property.bedrooms} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Bathrooms</label>
                <input name="bathrooms" type="number" placeholder="e.g. 2" value={property.bathrooms} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Balconies</label>
                <input name="balconies" type="number" placeholder="e.g. 1" value={property.balconies} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Parking</label>
                <input name="parking" type="number" placeholder="e.g. 1" value={property.parking} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Furnished</label>
                <input name="furnished" placeholder="e.g. Semi-Furnished" value={property.furnished} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Floor</label>
                <input name="floor" type="number" placeholder="e.g. 4" value={property.floor} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Total Floors</label>
                <input name="totalFloors" type="number" placeholder="e.g. 12" value={property.totalFloors} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Age of Property (yrs)</label>
                <input name="ageOfProperty" type="number" placeholder="e.g. 5" value={property.ageOfProperty} onChange={handleChange} />
              </div>

            </div>
          </div>

          {/* ── Location ── */}
          <div className="form-section">
            <p className="form-section-title">Location</p>
            <div className="form-grid">

              <div className="form-group full">
                <label>Address</label>
                <input name="address" placeholder="Street address" value={property.address} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>City</label>
                <input name="city" placeholder="e.g. Hyderabad" value={property.city} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>State</label>
                <input name="state" placeholder="e.g. Telangana" value={property.state} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Pincode</label>
                <input name="pincode" placeholder="e.g. 500001" value={property.pincode} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Latitude</label>
                <input name="latitude" placeholder="e.g. 17.3850" value={property.latitude} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Longitude</label>
                <input name="longitude" placeholder="e.g. 78.4867" value={property.longitude} onChange={handleChange} />
              </div>

            </div>
          </div>

          {/* ── Images ── */}
          <div className="image-upload-section">
            <p className="image-upload-label">Property Images</p>

            {/* File upload */}
            <div className="file-input-wrap">
              <label className="file-input-btn">
                📁 Choose Images
                <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: "none" }} />
              </label>
              <p className="image-upload-hint">Upload one or multiple images from your device.</p>
            </div>

            {imagePreviews.length > 0 && (
              <div className="image-preview-grid">
                {imagePreviews.map((preview, i) => (
                  <div className="image-preview" key={i}>
                    <img src={preview} alt={`Preview ${i + 1}`} />
                    <button type="button" onClick={() => removeImage(i)}>×</button>
                  </div>
                ))}
              </div>
            )}

            {/* URL input */}
            <div className="image-url-section">
              <label>Or Add Image URL</label>
              <div className="image-url-row">
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <button type="button" onClick={addImageUrl}>Add URL</button>
              </div>
            </div>

            {urlImages.length > 0 && (
              <div className="url-image-list">
                {urlImages.map((url, i) => (
                  <div className="url-image-item" key={i}>
                    <img src={url} alt={`URL ${i + 1}`} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    <span>Image {i + 1}</span>
                    <button type="button" onClick={() => removeUrlImage(i)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Uploading & Saving…" : "Save Property"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProperty;