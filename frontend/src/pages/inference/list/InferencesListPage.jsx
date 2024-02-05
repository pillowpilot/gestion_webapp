import React, { useState } from "react";
import { Button, Paper, Typography, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Api } from "../../../api/client";
import LoadingDataGrid from "./LoadingDataGrid";

import { buildDataGridColumns } from "./columnsSpecifications";
import { InferencesDataGrid } from "./DataGrid";

const PageLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Paper sx={{ p: 5 }}>
      <Stack gap={2}>
        <Typography variant="h4">{t("inferences.list.header")}</Typography>
        {children}
        <Actions />
      </Stack>
    </Paper>
  );
};

const Actions = () => {
  const { t } = useTranslation();
  return (
    <Stack direction="row">
      <Button variant="contained" color="primary" component={Link} to={`new`}>
        {t("inferences.list.newBtn")}
      </Button>
    </Stack>
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

const InferencesListPage = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const columns = buildDataGridColumns(t, setDeleteDialogOpen);
  const listInferences = useQuery({
    queryKey: ["inferences"],
    queryFn: Api.listInferences,
    onError: (error) => {
      manageErrorsFromQuery(t, error, enqueueSnackbar);
    }
  });

  if (listInferences.isSuccess)
    return (
      <PageLayout>
        <InferencesDataGrid
          columns={columns}
          listInferences={listInferences}
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
        />
      </PageLayout>
    );

  return (
    <PageLayout>
      <LoadingDataGrid columns={columns} />
    </PageLayout>
  );
};

export default InferencesListPage;
