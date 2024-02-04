import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Stack, Paper, Typography, Button, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import bbox from "@turf/bbox";
import * as L from "leaflet";
import { MapContainer, TileLayer, Popup, GeoJSON } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Api } from "../../api/client";

const PageLayout = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Paper sx={{ p: 5 }}>
      <Stack
        gap={1}
        sx={{
          width: "100%",
          height: "calc(100vh - 210px)", // TODO Replace somehow magic number
        }}
      >
        <Typography variant="h4">{t("lots.map.header")}</Typography>
        {children}
        <Stack direction="row" justifyContent="center">
          <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
            {t("lots.map.goBackBtn")}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

const LoadingMapPage = () => {
  return (
    <PageLayout>
      <Skeleton variant="rectangular" width="100%" height="100%" />
    </PageLayout>
  );
};

const LotsMapPage = () => {
  const { id } = useParams();

  const retrieveLotQuery = useQuery(["lots", id], () => Api.retrieveLot(id));

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

  const [minX, minY, maxX, maxY] = bbox(geodataQuery.data);
  const mapBounds = new L.LatLngBounds([
    [minY, minX],
    [maxY, maxX],
  ]);

  return (
    <PageLayout>
      <MapContainer
        bounds={mapBounds}
        style={{
          flexGrow: 1,
          width: "100%",
        }}
      >
        <GeoJSON key="cuack" data={geodataQuery.data}>
          <Popup>Hi!</Popup>
        </GeoJSON>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </PageLayout>
  );
};

export default LotsMapPage;
