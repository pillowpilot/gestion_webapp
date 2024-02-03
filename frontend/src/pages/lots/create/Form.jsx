import React from "react";
import { Button, Stack, TextField, Alert, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { withTranslation } from 'react-i18next';
import { MuiFileInput } from 'mui-file-input';


const FormErrorMessage = ({ flag, msg }) =>
  flag ? <Alert severity="error">{msg}</Alert> : <></>;

const SuccessfullSubmitMessage = ({ t, flag }) => {
  if (!flag) return <></>;
  return (
    <Alert severity="success">{t("properties.create.createSuccessMsg")}</Alert>
  );
};

const Form = ({ t, properties, formMethods, onSubmitHandler }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
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
        <Controller 
          name="geodata"
          control={control}
          render={({field, fieldState}) => {
            return <MuiFileInput {...field} 
              label={t("properties.create.labels.geodata")}
              inputProps={{ accept: ".geojson" }}
              error={fieldState.invalid}
              helperText={fieldState.invalid? fieldState.error?.message : ""}
            />
          }}
        />
        <FormErrorMessage
          flag={errors.root?.serverError}
          msg={errors.root?.serverError?.message}
        />
        <SuccessfullSubmitMessage t={t} flag={isSubmitSuccessful} />
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

export { Form };
export default withTranslation()(Form);
