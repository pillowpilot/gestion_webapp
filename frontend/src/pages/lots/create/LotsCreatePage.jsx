import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Api } from "../../../api/client";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { useQueryClient, useQuery, useMutation } from "react-query";

import LoadingForm from "./LoadingForm";
import Form from "./Form";
import { lotsKeys } from "../queries";

const PageLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={10}>
      <Stack direction="row" justifyContent="center">
        <Paper sx={{ p: 5 }}>
          <Stack gap={5}>
            <Typography variant="h4">{t("lots.create.header")}</Typography>
            {children}
          </Stack>
        </Paper>
      </Stack>
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

const NewLotPage = () => {
  const { t } = useTranslation();
  const formMethods = useForm();
  const { setError } = formMethods;
  const { enqueueSnackbar } = useSnackbar();

  const listPropertiesQuery = useQuery({
    queryKey: ["properties"],
    queryFn: Api.listProperties,
    onError: (error) => {
      manageErrorsFromQuery(t, error, enqueueSnackbar);
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: Api.createLot,
    onSuccess: () => {
      queryClient.invalidateQueries(lotsKeys.all);
      enqueueSnackbar(t("lots.create.createSuccessMsg"), {
        variant: "success",
      });
    },
    onError: (error) => {
      if (error.response) {
        const data = error.response.data;
        if (data.detail) enqueueSnackbar(data.detail, { variant: "error" });
        if (data.name) setError("name", { type: "400", message: data.name });
        if (data.parcel)
          setError("parcel", { type: "400", message: data.parcel });
        if (data.geodata)
          setError("geodata", { type: "400", message: data.geodata });
      } else if (error.request) {
        enqueueSnackbar(t("errors.network.default"), { variant: "error" });
      } else {
        enqueueSnackbar(t("errors.unknown.default"), { variant: "error" });
      }
    },
  });

  if (listPropertiesQuery.isSuccess)
    return (
      <PageLayout>
        <Form
          t={t}
          properties={listPropertiesQuery.data?.data?.results}
          formMethods={formMethods}
          mutation={mutation}
        />
      </PageLayout>
    );

  return (
    <PageLayout>
      <LoadingForm t={t} />
    </PageLayout>
  );
};

export default NewLotPage;
