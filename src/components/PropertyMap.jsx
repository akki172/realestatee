import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    InfoWindow
} from "@vis.gl/react-google-maps";

function PropertyMap({ latitude, longitude, title }) {

    const [nearbyProperties, setNearbyProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] =
        useState(null);

    const lat = Number(latitude);
    const lng = Number(longitude);
    const navigate = useNavigate();

    useEffect(() => {

        if (
            !Number.isFinite(lat) ||
            !Number.isFinite(lng)
        ) {
            return;
        }

        loadNearbyProperties();

    }, [latitude, longitude]);


    const loadNearbyProperties = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/api/property/nearby",
                {
                    params: {
                        latitude: lat,
                        longitude: lng,
                        radiusKm: 10
                    },
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            console.log(
                "Nearby Properties:",
                response.data
            );

            setNearbyProperties(response.data);

        } catch (error) {

            console.error(
                "Nearby properties error:",
                error
            );

        }

    };


    if (
        !Number.isFinite(lat) ||
        !Number.isFinite(lng)
    ) {

        return (
            <div className="property-map-error">
                Property location is not available.
            </div>
        );

    }


    const position = {
        lat,
        lng
    };


    return (

        <div className="property-map-wrapper">

            <APIProvider
                apiKey={
                    import.meta.env
                        .VITE_GOOGLE_MAPS_API_KEY
                }
            >

                <Map
                    defaultCenter={position}
                    defaultZoom={13}
                    mapId="DEMO_MAP_ID"
                    gestureHandling="greedy"
                >

                    {/* CURRENT PROPERTY */}

                    <AdvancedMarker
                        position={position}
                        title={title}
                    />


                    {/* NEARBY PROPERTIES */}

                    {nearbyProperties.map(
                        (property) => {

                            const propertyPosition = {
                                lat: Number(
                                    property.latitude
                                ),
                                lng: Number(
                                    property.longitude
                                )
                            };


                            // Don't duplicate
                            // current property marker

                            if (
                                propertyPosition.lat === lat &&
                                propertyPosition.lng === lng
                            ) {
                                return null;
                            }


                            return (

                                <AdvancedMarker
    key={property.id}
    position={propertyPosition}
    title={property.title}
    onClick={() => {
        navigate(`/property/${property.id}`);
    }}
/>

                            );

                        }
                    )}


                    {/* PROPERTY INFO */}

                    {selectedProperty && (

                        <InfoWindow
                            position={{
                                lat: Number(
                                    selectedProperty.latitude
                                ),
                                lng: Number(
                                    selectedProperty.longitude
                                )
                            }}
                            onCloseClick={() =>
                                setSelectedProperty(null)
                            }
                        >

                            <div className="map-property-info">

                                <h3>
                                    {selectedProperty.title}
                                </h3>

                                <p>
                                    {selectedProperty.propertyType}
                                </p>

                                <strong>
                                    ₹{" "}
                                    {Number(
                                        selectedProperty.price || 0
                                    ).toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                                <p>
                                    📍{" "}
                                    {selectedProperty.city}
                                </p>

                            </div>

                        </InfoWindow>

                    )}

                </Map>

            </APIProvider>

        </div>

    );

}

export default PropertyMap;