import React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { Api } from "../../../api/client";
import {
  DataGridDetailsButton,
  DataGridMapButton,
} from "../../../components/buttons/Buttons";
import { DateCell } from "../../../components/datagrid/Cells";
import { LoadingDataGrid } from "./Loading";
import { LotsDataGrid } from "./DataGrid";
import { lotsKeys } from "../queries";

const PageLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Paper sx={{ p: 5 }}>
      <Stack gap={2}>
        <Typography variant="h4">{t("lots.list.header")}</Typography>
        {children}
        <Actions />
      </Stack>
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
        {t("lots.list.newBtn")}
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

const LotsPage = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const listLots = useQuery({
    queryKey: lotsKeys.all,
    queryFn: Api.listLots,
    onError: (error) => manageErrorsFromQuery(t, error, enqueueSnackbar),
  });

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
      renderCell: (params) => (
        <DateCell
          date={params.value}
          translationKey="lots.list.datagrid.dateFormat"
        />
      ),
    },
    {
      field: "actions",
      headerName: t("lots.list.datagrid.actions"),
      renderCell: (params) => (
        <Stack direction="row">
          <DataGridDetailsButton id={params.id} />
          {params.row.geodata ? <DataGridMapButton id={params.id} /> : <></>}
        </Stack>
      ),
    },
  ];

  if (listLots.isSuccess)
    return (
      <PageLayout>
        <LotsDataGrid columns={columns} data={listLots.data} />
      </PageLayout>
    );

  return (
    <PageLayout>
      <LoadingDataGrid columns={columns} />
    </PageLayout>
  );
};

export default LotsPage;
