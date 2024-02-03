import { useState } from "react";
import { Box, IconButton, Button, Chip, Paper, Typography, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import Dms from "geodesy/dms";
import { DataGridDetailsButton } from "../../components/buttons/Buttons";
import { DeleteInferenceDialog } from "../../components/dialogs/DeleteInferenceDialog";
import { Api } from "../../api/client";

const InferencesDataGrid = () => {
  const { t } = useTranslation();
  const tx = (s) => t(`inferences.list.datagrid.${s}`);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const columns = [
    { field: "id", headerName: tx("id"), width: 35 },
    { field: "user_name", headerName: tx("user"), width: 200 },
    { field: "lot_name", headerName: tx("lot"), width: 150 },
    { field: "date", headerName: tx("date"), width: 170 },
    { field: "model", headerName: tx("model") },
    { field: "task_id", headerName: tx("taskId"), width: 150 },
    {
      field: "coords",
      headerName: tx("coordinates"),
      width: 150,
      renderCell: (params) => {
        const noCoordsComponent = <span>No data</span>;
        if (params.value === null) return noCoordsComponent;

        const { lat, lon } = params.value;
        if (lat === null || lon === null) return noCoordsComponent;

        return (
          <Stack>
            <Typography variant="body">{Dms.toLat(lat, "dms", 2)}</Typography>
            <Typography variant="body">{Dms.toLon(lon, "dms", 2)}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "status",
      headerName: tx("status"),
      width: 150,
      renderCell: (params) => {
        const getColors = (st) => {
          switch (st) {
            case "Completed":
              return { color: "#0d6832", backgroundColor: "#d6f0e0" };
            case "Pending":
            case "Running":
              return { color: "#73510d", backgroundColor: "#fbf0da" };
            default:
              return { color: "white", backgroundColor: "red" };
          }
        };
        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              ...getColors(params.value),
              width: "100px",
              fontWeight: "bold",
            }}
          />
        );
      },
    },
    {
      field: "actionModify",
      headerName: tx("actions"),
      renderCell: (params) => <>
        <DataGridDetailsButton id={params.id} icon={<SearchIcon />}/>
        <IconButton variant="contained" color="primary" onClick={()=>setDeleteDialogOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </>
    },
  ];

  const capitalizeEachWord = (s) =>
    s
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // List Inferences Query
  const listInferences = useQuery("inferences", Api.listInferences);

  if (listInferences.isLoading) return (
    <Box>
      <DataGrid
        loading
        rows={[]}
        columns={columns}
        sx={{
          height: "500px",
        }}
      />
    </Box>
  );

  if (listInferences.isError) {
    const errorCode = listInferences?.error?.code;
    switch(errorCode){
      case "ERR_NETWORK":
        return <Typography>{t("errors.network.default")}</Typography>;
      default:
        return <Typography>Error: {listInferences?.error?.response?.data?.detail}</Typography>
    }
  }

  const rows = listInferences.data.data.results.map((o) => ({
    id: o.id,
    user_name: o.user?.email,
    lot_name: o.lot_name,
    date: t("inferences.list.datagrid.dateFormat", {
      val: new Date(o.created_on),
      formatParams: {
        val: {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
        },
      },
    }),
    model: capitalizeEachWord(o.model),
    task_id: o.task_id,
    status: capitalizeEachWord(o.status),
    coords:
      o.latitude !== null && o.longitude != null
        ? { lat: o.latitude, lon: o.longitude }
        : null,
  }));
  console.log(rows);

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
      <DeleteInferenceDialog open={deleteDialogOpen} onAccept={()=>setDeleteDialogOpen(false)} onReject={()=>setDeleteDialogOpen(false)} />
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
