import { Box, Button, Paper, Typography, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { Api } from "../../../api/client";
import {
  DataGridDetailsButton,
  DataGridMapButton,
} from "../../../components/buttons/Buttons";
import { DateCell } from "../../../components/datagrid/Cells";
import { LoadingDataGrid } from "./Loading";
import { PropertiesDataGrid } from "./DataGrid";
import { queryKeys } from "../queries";

const PageLayout = ({ children }) => {
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
      {children}
      <Actions />
    </Paper>
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

const manageErrorsFromQuery = (t, error, enqueueSnackbar) => {
  if (error.response) {
    enqueueSnackbar(error.response.data.detail, { variant: "error" });
  } else if (error.request) {
    enqueueSnackbar(t("errors.network.default"), { variant: "error" });
  } else {
    enqueueSnackbar(t("errors.unknown.default"), { variant: "error" });
  }
};

const PropertiesPage = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const listProperties = useQuery({
    queryKey: queryKeys.all,
    queryFn: Api.listProperties,
    onError: (error) => manageErrorsFromQuery(t, error, enqueueSnackbar),
  });

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

  if (listProperties.isSuccess)
    return (
      <PageLayout>
        <PropertiesDataGrid columns={columns} listProperties={listProperties} />
      </PageLayout>
    );

  return (
    <PageLayout>
        <LoadingDataGrid columns={columns} />
      </PageLayout>
  );
};

export default PropertiesPage;
