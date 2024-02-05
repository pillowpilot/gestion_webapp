import { Box } from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";

const LoadingDataGrid = ({ columns }) => {
  return (
    <Box>
      <DataGrid
        loading
        rows={[]}
        columns={columns}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        sx={{
          height: "500px",
        }}
      />
    </Box>
  );
};

export { LoadingDataGrid };
