import React from "react";
import { Typography, Paper, Stack, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Api } from "../../../api/client";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { LoadingLotForm } from "./LoadingForm";
import { LotForm } from "./Form";
import { lotsKeys } from "../queries";

const PageLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" justifyContent="center">
      <Box sx={{ width: 500 }}>
        <Paper sx={{ p: 5 }}>
          <Stack gap={5}>
            <Typography variant="h4">{t("lots.details.header")}</Typography>
            {children}
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
};

const manageErrorsFromQuery = (t, error, enqueueSnackbar) => {
  if (error.response) {
    enqueueSnackbar(error.response.data.detail, { variant: 'error'});
  } else if (error.request) {
    enqueueSnackbar(t("errors.network.default"), { variant: 'error'});
  } else {
    enqueueSnackbar(t("errors.unknown.default"), { variant: 'error'});
  }
};

const LotDetailsPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const formMethods = useForm();
  const { setError } = formMethods;

  const queryClient = useQueryClient();

  const listProperties = useQuery({
    queryKey: "properties",
    queryFn: () => Api.listProperties(),
    onError: (error) =>
      manageErrorsFromQuery(t, error, enqueueSnackbar),
  });

  const retrieveLot = useQuery({
    queryKey: lotsKeys.detail(id),
    queryFn: () => Api.retrieveLot(id),
    onError: (error) =>
      manageErrorsFromQuery(t, error, enqueueSnackbar),
  });

  const mutation = useMutation({
    mutationFn: (data) => Api.updateLot(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(lotsKeys.all);
      enqueueSnackbar(t("lots.details.updateSuccessMsg"), { variant: 'success'});
    },
    onError: (error) => {
      if (error.response) {
        const data = error.response.data;
        if (data.detail) enqueueSnackbar(data.detail, { variant: 'error'});
        if (data.name) setError("name", { type: "400", message: data.name });
      } else if (error.request) {
        enqueueSnackbar(t("errors.network.default"), { variant: 'error'});
      } else {
        enqueueSnackbar(t("errors.unknown.default"), { variant: 'error'});
      }
    },
  });

  if (retrieveLot.isSuccess && listProperties.isSuccess)
    return (
      <PageLayout>
        <LotForm
          propertiesData={listProperties.data.data?.results}
          data={retrieveLot.data.data}
          mutation={mutation}
          formMethods={formMethods}
        />
      </PageLayout>
    );

  return (
    <PageLayout>
      <LoadingLotForm />
    </PageLayout>
  );
};

export default LotDetailsPage;
