import React from "react";
import { Button, Stack, TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { withTranslation } from "react-i18next";
import { MuiFileInput } from "mui-file-input";

const Form = ({ t, properties, formMethods, mutation }) => {
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
      parcel: d.parcel,
      geodata: d.geodata,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Controller
          name="parcel"
          control={control}
          defaultValue={properties[0].id}
          render={({field}) => {
            return (
              <TextField
                select
                {...field}
                label={t("lots.create.labels.property")}
                defaultValue={`${field.value}`}
              >
                {properties?.map((o) => (
                  <MenuItem key={o.id} value={o.id}>
                    {o.name}
                  </MenuItem>
                ))}
              </TextField>
            );
          }}
        ></Controller>

        <Controller
          name="geodata"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <MuiFileInput
                {...field}
                label={t("properties.create.labels.geodata")}
                inputProps={{ accept: ".geojson" }}
                error={fieldState.invalid}
                helperText={fieldState.invalid ? fieldState.error?.message : ""}
              />
            );
          }}
        />
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
