import { Box } from "@mui/material";
import { DataGrid, esES, enUS } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

const PropertiesDataGrid = ({ columns, listProperties }) => {
  const { i18n } = useTranslation();

  const rows = listProperties?.data?.data?.results?.map((o) => ({
    id: o.id,
    name: o.name,
    company: o.company_name,
    geodata: o.geodata,
    created_on: o.created_on,
  }));

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
    </Box>
  );
};

export { PropertiesDataGrid };
