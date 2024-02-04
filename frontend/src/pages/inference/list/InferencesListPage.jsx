import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { DeleteInferenceDialog } from "../../../components/dialogs/DeleteInferenceDialog";
import { Api } from "../../../api/client";
import LoadingDataGrid from "./LoadingDataGrid";

import { buildDataGridColumns } from "./columnsSpecifications";
import { capitalizeEachWord } from "../../../utils/utils";


const InferencesDataGrid = () => {
  const { t } = useTranslation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const columns = buildDataGridColumns(t, setDeleteDialogOpen);

  const listInferences = useQuery("inferences", Api.listInferences);

  if (listInferences.isLoading)
    return (
      <Box>
        <LoadingDataGrid columns={columns} />
      </Box>
    );

  if (listInferences.isError) {
    const errorCode = listInferences?.error?.code;
    switch (errorCode) {
      case "ERR_NETWORK":
        return <Typography>{t("errors.network.default")}</Typography>;
      default:
        return (
          <Typography>
            Error: {listInferences?.error?.response?.data?.detail}
          </Typography>
        );
    }
  }

  const rows = listInferences.data.data.results.map((o) => ({
    id: o.id,
    user_name: o.user?.email,
    lot_name: o.lot_name,
    date: o.created_on,
    model: capitalizeEachWord(o.model),
    task_id: o.task_id,
    status: capitalizeEachWord(o.status),
    coords:
      o.latitude !== null && o.longitude != null
        ? { lat: o.latitude, lon: o.longitude }
        : null,
  }));

  return (
    <Box>
      <DataGrid
        pageSizeOptions={[10, 25, 50, 100]}
        rows={rows}
        columns={columns}
        sx={{
          height: "500px",
        }}
      />
      <DeleteInferenceDialog
        open={deleteDialogOpen}
        onAccept={() => setDeleteDialogOpen(false)}
        onReject={() => setDeleteDialogOpen(false)}
      />
    </Box>
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

const InferencesListPage = () => {
  const { t } = useTranslation();
  return (
    <Paper
      sx={{
        padding: 5,
      }}
    >
      <Stack gap={2}>
        <Typography variant="h4">{t("inferences.list.header")}</Typography>
        <InferencesDataGrid />
        <Actions />
      </Stack>
    </Paper>
  );
};

export default InferencesListPage;
