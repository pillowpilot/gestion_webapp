import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridDetailsButton } from "../../components/buttons/Buttons";
import { Api } from "../../api/client";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

const LotsDataGrid = () => {
  const { t } = useTranslation();

  const columns = [
    { field: "id", headerName: t("lots.list.datagrid.id") },
    { field: "name", headerName: t("lots.list.datagrid.name"), width: 250 },
    {
      field: "property",
      headerName: t("lots.list.datagrid.property"),
      width: 250,
    },
    {
      field: "created_on",
      headerName: t("lots.list.datagrid.date"),
      width: 250,
    },
    {
      field: "actions",
      headerName: t("lots.list.datagrid.actions"),
      renderCell: (params) => <DataGridDetailsButton id={params.id} />,
    },
  ];

  const [lots, setLots] = useState([]);

  const formatDate = (d) =>
    d.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const listLots = useQuery("lots", Api.listLots);

  if (listLots.isLoading) return (
    <Box>
      <DataGrid
        loading
        rows={[]}
        columns={columns}
        sx={{
          height: "500px",
        }}
      />
    </Box>
  );

  if (listLots.isError) {
    const errorCode = listLots?.error?.code;
    switch(errorCode){
      case "ERR_NETWORK":
        return <Typography>{t("errors.network.default")}</Typography>
      default:
        return <Typography>Error: {listLots?.error?.response?.data?.detail}</Typography>
    }
  }

  const rows = listLots?.data?.data?.results?.map((o) => ({
    id: o.id,
    name: o.name,
    property: o.parcel_name,
    created_on: formatDate(new Date(o.created_on)),
  }));

  return (
    <Box>
      <DataGrid
        checkboxSelection
        pageSizeOptions={[10, 25, 50, 100]}
        rows={rows}
        columns={columns}
        sx={{
          height: "500px",
        }}
      />
    </Box>
  );
};

const Actions = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`new`}
        sx={{
          marginTop: 2,
        }}
      >
        {t("lots.list.newBtn")}
      </Button>
    </Box>
  );
};

const LotsPage = () => {
  const { t } = useTranslation();

  return (
    <Paper
      sx={{
        padding: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4">{t("lots.list.header")}</Typography>
      <LotsDataGrid />
      <Actions />
    </Paper>
  );
};

export default LotsPage;
