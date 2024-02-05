import { Box } from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";

const LotsDataGrid = ({ data, columns, listLots }) => {
  const rows = data.data?.results?.map((o) => ({
    id: o.id,
    name: o.name,
    property: o.parcel_name,
    geodata: o.geodata,
    created_on: o.created_on,
  }));
  console.log(rows);

  return (
    <Box>
      <DataGrid
        pageSizeOptions={[10, 25, 50, 100]}
        rows={rows}
        columns={columns}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        sx={{
          height: "500px",
        }}
      />
    </Box>
  );
};

export { LotsDataGrid };
