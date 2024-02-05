import { Box } from "@mui/material";
import { DataGrid, esES, enUS } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

const LoadingDataGrid = ({ columns }) => {
  const { i18n } = useTranslation();

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
