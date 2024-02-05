import React, { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, esES, enUS } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useQueryClient, useMutation } from "react-query";
import { Api } from "../../../api/client";
import { DataGridDetailsButton } from "../../../components/buttons/Buttons";
import {
  DateCell,
  CoordinateCell,
  StatusCell,
} from "../../../components/datagrid/Cells";
import { DeleteInferenceDialog } from "../../../components/dialogs/DeleteInferenceDialog";
import { capitalizeEachWord } from "../../../utils/utils";

const InferencesDataGrid = ({ listInferences }) => {
  const { t, i18n } = useTranslation();

  const [inferenceId, setInferenceId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const columns = [
    { field: "id", headerName: t("inferences.list.datagrid.id"), width: 35 },
    {
      field: "user_name",
      headerName: t("inferences.list.datagrid.user"),
      width: 200,
    },
    {
      field: "lot_name",
      headerName: t("inferences.list.datagrid.lot"),
      width: 150,
    },
    {
      field: "date",
      headerName: t("inferences.list.datagrid.date"),
      width: 170,
      renderCell: (params) => (
        <DateCell
          date={params.value}
          translationKey="inferences.list.datagrid.dateFormat"
        />
      ),
    },
    {
      field: "updated_on",
      headerName: t("inferences.list.datagrid.updatedOn"),
      width: 170,
      renderCell: (params) => (
        <DateCell
          date={params.value}
          translationKey="inferences.list.datagrid.updatedOnFormat"
        />
      ),
    },
    { field: "model", headerName: t("inferences.list.datagrid.model") },
    {
      field: "task_id",
      headerName: t("inferences.list.datagrid.taskId"),
      width: 150,
    },
    {
      field: "coords",
      headerName: t("inferences.list.datagrid.coordinates"),
      width: 150,
      renderCell: (params) => <CoordinateCell {...params.value} />,
    },
    {
      field: "status",
      headerName: t("inferences.list.datagrid.status"),
      width: 150,
      renderCell: (params) => <StatusCell status={params.value} />,
    },
    {
      field: "actionModify",
      headerName: t("inferences.list.datagrid.actions"),
      renderCell: (params) => (
        <>
          <DataGridDetailsButton id={params.id} icon={<SearchIcon />} />
          <IconButton
            variant="contained"
            color="primary"
            onClick={() => {
              setInferenceId(params.id);
              setDeleteDialogOpen(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = listInferences.data.data.results.map((o) => ({
    id: o.id,
    user_name: o.user?.email,
    lot_name: o.lot_name,
    date: o.created_on,
    updated_on: o.updated_on,
    model: capitalizeEachWord(o.model), // TODO Move formatting into component
    task_id: o.task_id,
    status: capitalizeEachWord(o.status), // TODO Move formatting into component
    coords:
      o.latitude !== null && o.longitude != null
        ? { lat: o.latitude, lon: o.longitude }
        : null,
  }));

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => Api.deleteInference(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["inferences"]);
      enqueueSnackbar(t("inferences.delete.successMsg"), {
        variant: "success",
      });
    },
    onError: (error) => {
      if (error.response) {
        const data = error.response.data;
        if (data.detail) enqueueSnackbar(data.detail, { variant: "error" });
      } else if (error.request) {
        enqueueSnackbar(t("errors.network.default"), { variant: "error" });
      } else {
        enqueueSnackbar(t("errors.unknown.default"), { variant: "error" });
      }
    },
  });

  return (
    <Box>
      <DataGrid
        pageSizeOptions={[10, 25, 50, 100]}
        rows={rows}
        columns={columns}
        localeText={
          i18n.language === "es"
            ? esES.components.MuiDataGrid.defaultProps.localeText
            : enUS.components.MuiDataGrid.defaultProps.localeText
        }
        sx={{
          height: "500px",
        }}
      />
      <DeleteInferenceDialog
        open={deleteDialogOpen}
        onAccept={() => {
          mutation.mutate(inferenceId);
          setInferenceId(null);
          setDeleteDialogOpen(false);
        }}
        onReject={() => {
          setDeleteDialogOpen(false);
        }}
      />
    </Box>
  );
};

export { InferencesDataGrid };
