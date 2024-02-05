import { Box } from "@mui/material";
import { DataGrid, esES, enUS } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { DeleteInferenceDialog } from "../../../components/dialogs/DeleteInferenceDialog";
import { capitalizeEachWord } from "../../../utils/utils";

const InferencesDataGrid = ({
  columns,
  listInferences,
  deleteDialogOpen,
  setDeleteDialogOpen,
}) => {
  const { i18n } = useTranslation();

  const rows = listInferences.data.data.results.map((o) => ({
    id: o.id,
    user_name: o.user?.email,
    lot_name: o.lot_name,
    date: o.created_on,
    model: capitalizeEachWord(o.model), // TODO Move formatting into component
    task_id: o.task_id,
    status: capitalizeEachWord(o.status), // TODO Move formatting into component
    coords:
      o.latitude !== null && o.longitude != null
        ? { lat: o.latitude, lon: o.longitude }
        : null,
  }));

  console.log(columns);
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
        onAccept={() => setDeleteDialogOpen(false)}
        onReject={() => setDeleteDialogOpen(false)}
      />
    </Box>
  );
};

export { InferencesDataGrid };
