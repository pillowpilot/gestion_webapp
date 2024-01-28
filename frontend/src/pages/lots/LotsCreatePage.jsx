import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Paper,
  Stack,
  Typography,
  TextField,
  Alert,
  MenuItem,
  Skeleton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Api } from "../../api/client";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

const FormErrorMessage = ({ flag, msg }) =>
  flag ? <Alert severity="error">{msg}</Alert> : <></>;

const SuccessfullSubmitMessage = ({ flag }) => {
  const { t } = useTranslation();
  if (!flag) return <></>;
  return (
    <Alert severity="success">{t("properties.create.createSuccessMsg")}</Alert>
  );
};

const LoadingForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Stack
      spacing={3}
      sx={{
        sm: { minWidth: "350px" },
      }}
    >
      <Skeleton variant="rounded" height={55} />
      <Skeleton variant="rounded" height={55} />
      <Stack direction="row" justifyContent="center" gap={1}>
        <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
          {t("lots.create.goBackBtn")}
        </Button>
        <Button variant="contained" type="submit">
          {t("lots.create.saveBtn")}
        </Button>
      </Stack>
    </Stack>
  );
};

const Form = ({ properties, formMethods, onSubmitHandler, feedback }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = formMethods;

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Stack
        spacing={3}
        sx={{
          md: {
            minWidth: "350px",
          },
        }}
      >
        <TextField
          label={t("lots.create.labels.name")}
          {...register("name", {
            required: t("lots.create.errors.requiredName"),
          })}
          error={errors.name}
          helperText={errors.name?.message}
        />
        {properties?.length > 0 ? (
          <TextField
            select
            label={t("lots.create.labels.property")}
            {...register("parcel", {
              required: t("lots.create.errors.requiredProperty"),
            })}
            defaultValue={properties[0].id}
            error={errors.parcel}
            helperText={errors.parcel?.message}
          >
            {properties?.map((property) => (
              <MenuItem key={property.id} value={property.id}>
                {property.name}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <Alert severity="info">
            {t("lots.create.errors.noPropertiesMsg")}
          </Alert>
        )}
        <FormErrorMessage
          flag={errors.root?.serverError}
          msg={errors.root?.serverError?.message}
        />
        <SuccessfullSubmitMessage flag={isSubmitSuccessful} />
        <Stack direction="row" justifyContent="center" gap={1}>
          <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
            {t("lots.create.goBackBtn")}
          </Button>
          <Button variant="contained" type="submit">
            {t("lots.create.saveBtn")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

const NewLotPage = () => {
  const { t } = useTranslation();
  const formMethods = useForm();

  const listPropertiesQuery = useQuery("properties", Api.listProperties);

  if (listPropertiesQuery.isLoading)
    return (
      <Stack spacing={10}>
        <Typography variant="h4">{t("lots.create.header")}</Typography>
        <Stack direction="row" justifyContent="center">
          <Paper sx={{ p: 5 }}>
            <LoadingForm />
          </Paper>
        </Stack>
      </Stack>
    );

  const { setError } = formMethods;
  const onSubmitHandler = async (data) => {
    const name = data.name;
    try {
      await Api.createLot({
        name: name,
        parcel: data.parcel,
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
    }
  };

  return (
    <Stack spacing={10}>
      <Typography variant="h4">{t("lots.create.header")}</Typography>
      <Stack direction="row" justifyContent="center">
        <Paper sx={{ p: 5 }}>
          <Form
            properties={listPropertiesQuery.data?.data?.results}
            formMethods={formMethods}
            onSubmitHandler={onSubmitHandler}
          />
        </Paper>
      </Stack>
    </Stack>
  );
};

export default NewLotPage;
