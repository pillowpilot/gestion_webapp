import React from "react";
import { Box  } from "@mui/material";
import { DataGrid, esES, enUS } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

const Loading = () => {
  const { t, i18n } = useTranslation();

  const columns = [
    { field: "id", headerName: t("users.list.datagrid.id") },
    {
      field: "firstname",
      headerName: t("users.list.datagrid.name"),
      width: 250,
    },
    {
      field: "lastname",
      headerName: t("users.list.datagrid.lastname"),
      width: 200,
    },
    { field: "role", headerName: t("users.list.datagrid.role") },
    { field: "email", headerName: t("users.list.datagrid.email"), width: 200 },
    {
      field: "actions",
      headerName: t("users.list.datagrid.actions"),
    },
  ];

  return (
    <Box>
      <DataGrid
        loading
        pageSizeOptions={[10, 25, 50, 100]}
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

export { Loading };
