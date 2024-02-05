import React from "react";
import { Typography, Box, Paper, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { Api } from "../../../api/client";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { LoadingPropertyForm } from "./LoadingForm";
import { PropertyForm } from "./Form";
import { queryKeys } from "../queries";

const PageLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" justifyContent="center">
      <Box sx={{ width: 500 }}>
        <Paper sx={{ p: 5 }}>
          <Stack gap={5}>
            <Typography variant="h4">
              {t("properties.details.header")}
            </Typography>
            {children}
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
};

const manageErrorsFromQuery = (t, error, enqueueSnackbar) => {
  if (error.response) {
    enqueueSnackbar(error.response.data.detail, { variant: "error" });
  } else if (error.request) {
    enqueueSnackbar(t("errors.network.default"), { variant: "error" });
  } else {
    enqueueSnackbar(t("errors.unknown.default"), { variant: "error" });
  }
};

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const formMethods = useForm();
  const { setError } = formMethods;

  const queryClient = useQueryClient();
  const retrieveProperty = useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () => Api.retrieveProperty(id),
    onError: (error) => {
      manageErrorsFromQuery(t, error, enqueueSnackbar);
    },
  });
  const mutation = useMutation({
    mutationFn: (data) => Api.updateProperty(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.all);
      enqueueSnackbar(t("properties.details.updateSuccessMsg"), {
        variant: "success",
      });
    },
    onError: (error) => {
      if (error.response) {
        const data = error.response.data;
        if (data.detail) enqueueSnackbar(data.detail, { variant: "error" });
        if (data.name) setError("name", { type: "400", message: data.name });
      } else if (error.request) {
        enqueueSnackbar(t("errors.network.default"), { variant: "error" });
      } else {
        enqueueSnackbar(t("errors.unknown.default"), { variant: "error" });
      }
    },
  });

  if (retrieveProperty.isLoading)
    return (
      <PageLayout>
        <LoadingPropertyForm />
      </PageLayout>
    );

  return (
    <PageLayout>
      <PropertyForm
        data={retrieveProperty.data.data}
        mutation={mutation}
        formMethods={formMethods}
      />
    </PageLayout>
  );
};

export default PropertyDetailsPage;
