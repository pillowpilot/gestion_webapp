import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Api } from "../../../api/client";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

import LoadingForm from "./LoadingForm";
import Form from "./Form";

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

const NewLotPage = () => {
  const { t } = useTranslation();
  const formMethods = useForm();

  const listPropertiesQuery = useQuery("properties", Api.listProperties);

  if (listPropertiesQuery.isLoading)
    return (
      <PageLayout>
        <LoadingForm t={t} />
      </PageLayout>
    );

  // TODO Add if(listPropertiesQuery.isError)

  const { setError } = formMethods;
  const onSubmitHandler = async (data) => {
    const name = data.name;
    try {
      await Api.createLot({
        name: name,
        parcel: data.parcel,
        geodata: data.geodata,
      });
    } catch (err) {
      const errorsData = err.response.data;
      if (errorsData.detail)
        setError("root.serverError", {
          type: "400",
          message: errorsData.detail,
        });
      if (errorsData.name)
        setError("name", { type: "400", message: errorsData.name });
      if (errorsData.parcel)
        setError("parcel", { type: "400", message: errorsData.parcel });
      if (errorsData.geodata)
        setError("geodata", { type: "400", message: errorsData.geodata });
    }
  };

  return (
    <PageLayout>
      <Form
        properties={listPropertiesQuery.data?.data?.results}
        formMethods={formMethods}
        onSubmitHandler={onSubmitHandler}
      />
    </PageLayout>
  );
};

export default NewLotPage;
