import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGridDetailsButton } from "../../../components/buttons/Buttons";
import {
  DateCell,
  CoordinateCell,
  StatusCell,
} from "../../../components/datagrid/Cells";

const buildDataGridColumns = (t, setDeleteDialogOpen) => {
  return [
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
            onClick={() => setDeleteDialogOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
};

export { buildDataGridColumns };
