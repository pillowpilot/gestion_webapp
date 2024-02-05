import { Box } from "@mui/material";
import { DataGrid, esES, enUS } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import {
  DateCell,
  CoordinateCell,
  StatusCell,
} from "../../../components/datagrid/Cells";

const LoadingDataGrid = () => {
  const { t, i18n } = useTranslation();

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
    },
  ];

  return (
    <Box>
      <DataGrid
        loading
        rows={[]}
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
    </Box>
  );
};

export default LoadingDataGrid;
