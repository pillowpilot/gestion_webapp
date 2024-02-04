import { Box, Button, Paper, Typography, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { Api } from "../../api/client";
import {
  DataGridDetailsButton,
  DataGridMapButton,
} from "../../components/buttons/Buttons";
import { DateCell } from "../../components/datagrid/Cells";

const PropertiesDataGrid = () => {
  const { t } = useTranslation();

  const columns = [
    { field: "id", headerName: t("properties.list.datagrid.id") },
    {
      field: "name",
      headerName: t("properties.list.datagrid.name"),
      width: 250,
    },
    {
      field: "company",
      headerName: t("properties.list.datagrid.company"),
      width: 250,
    },
    {
      field: "created_on",
      headerName: t("properties.list.datagrid.date"),
      width: 250,
      renderCell: (params) => (
        <DateCell
          date={params.value}
          translationKey="properties.list.datagrid.dateFormat"
        />
      ),
    },
    {
      field: "actions",
      headerName: t("properties.list.datagrid.actions"),
      renderCell: (params) => {
        return (
          <Stack direction="row">
            <DataGridDetailsButton id={params.id} />
            {params.row.geodata ? <DataGridMapButton id={params.id} /> : <></>}
          </Stack>
        );
      },
    },
  ];

  const listProperties = useQuery("properties", Api.listProperties);

  if (listProperties.isLoading)
    return (
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

  if (listProperties.isError) {
    const errorCode = listProperties?.error?.code;
    switch (errorCode) {
      case "ERR_NETWORK":
        return <Typography>{t("errors.network.default")}</Typography>;
      default:
        return (
          <Typography>
            Error: {listProperties?.error?.response?.data?.detail}
          </Typography>
        );
    }
  }

  const rows = listProperties?.data?.data?.results?.map((o) => ({
    id: o.id,
    name: o.name,
    company: o.company_name,
    geodata: o.geodata,
    created_on: o.created_on,
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
        {t("properties.list.newBtn")}
      </Button>
    </Box>
  );
};

const PropertiesPage = () => {
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
      <Typography variant="h4">{t("properties.list.header")}</Typography>
      <PropertiesDataGrid />
      <Actions />
    </Paper>
  );
};

export default PropertiesPage;
