import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Alert, Stack, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { MuiFileInput } from "mui-file-input";
import { useTranslation, withTranslation } from "react-i18next";
import AuthContext from "../../../contexts/AuthProvider";

const Form = ({ t, formMethods, mutation }) => {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const onSubmit = (d) => {
    mutation.mutate({
      name: d.name,
      company: auth.company.id,
      geodata: d.geodata,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        sx={{
          sm: { minWidth: "350px" },
        }}
      >
        <TextField
          label={t("properties.create.labels.name")}
          {...register("name", {
            required: t("properties.create.errors.requiredName"),
          })}
          error={errors.name}
          helperText={errors.name?.message}
        />
        <Controller
          name="geodata"
          control={control}
          rules={{
            required: t("properties.create.errors.requiredGeodata"),
          }}
          render={({ field, fieldState }) => {
            return (
              <MuiFileInput
                {...field}
                label={t("properties.create.labels.geodata")}
                inputProps={{ accept: ".geojson" }}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            );
          }}
        />
        <Stack direction="row" justifyContent="center" gap={1}>
          <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
            {t("properties.create.goBackBtn")}
          </Button>
          <Button variant="contained" type="submit" data-testid="submit-btn">
            {t("properties.create.saveBtn")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export { Form };
export default withTranslation()(Form);
