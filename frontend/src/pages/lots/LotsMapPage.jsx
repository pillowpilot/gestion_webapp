import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Paper, Typography, Button, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import bbox from "@turf/bbox";
import * as L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
// import geodata from "../../assets/map.json";
import { Api } from "../../api/client";

const LoadingMapPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Stack>
      <Typography variant="h4">{t("lots.map.header")}</Typography>
      <Stack direction="row" justifyContent="center">
        <Box>
          <Paper sx={{ p: 5 }}>
            <Stack gap={1} alignItems="center">
              <Skeleton variant="rectangular" width={500} height={500} />
              <Button
                variant="outlined"
                size="medium"
                onClick={() => navigate(-1)}
              >
                {t("lots.map.goBackBtn")}
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Stack>
  );
};

const LotsMapPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const retrieveLotQuery = useQuery(["lots", id], () =>
    Api.retrieveProperty(id)
  );

  const geodataQuery = useQuery(
    ["lots", id, "geodata"],
    () => fetch(retrieveLotQuery.data?.data?.geodata).then((res) => res.json()),
    {
      enabled: retrieveLotQuery.isSuccess,
    }
  );

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
  }, []);

  if (retrieveLotQuery.isLoading || geodataQuery.isLoading)
    return <LoadingMapPage />;

  console.log("property", retrieveLotQuery);
  console.log("geodata", geodataQuery);

  const [minX, minY, maxX, maxY] = bbox(geodataQuery.data);
  const mapBounds = new L.LatLngBounds([
    [minY, minX],
    [maxY, maxX],
  ]);
  console.log(mapBounds);

  return (
    <Stack spacing={10}>
      <Typography variant="h4">{t("lots.map.header")}</Typography>
      <Stack direction="row" justifyContent="center">
        <Box>
          <Paper sx={{ p: 5 }}>
            <Stack gap={1} alignItems="center">
              <MapContainer
                bounds={mapBounds}
                style={{ width: "1200px", height: "500px" }}
              >
                <GeoJSON key="cuack" data={geodataQuery.data}>
                  <Popup>Hi!</Popup>
                </GeoJSON>

                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
              <Button
                variant="outlined"
                size="medium"
                onClick={() => navigate(-1)}
              >
                {t("lots.map.goBackBtn")}
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LotsMapPage;
