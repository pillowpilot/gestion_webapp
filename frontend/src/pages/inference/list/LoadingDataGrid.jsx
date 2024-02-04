import { DataGrid } from "@mui/x-data-grid";

const LoadingDataGrid = ({ columns }) => {
  return (
    <DataGrid
      loading
      rows={[]}
      columns={columns}
      sx={{
        height: "500px",
      }}
    />
  );
};

export default LoadingDataGrid;
