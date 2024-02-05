import React from "react";
import { Button, Stack, TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const LotForm = ({ data, propertiesData, mutation, formMethods }) => {
  const { t } = useTranslation();
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
      parcel: d.property,
    });
  };

  /*
  To justify InputLabelProps={{ shrink: true }}
  See: https://stackoverflow.com/a/76688881
  */

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "100%",
      }}
    >
      <Stack spacing={5}>
        <TextField
          {...register("name", {
            required: t("lots.details.errors.requiredName"),
          })}
          label={t("lots.details.labels.name")}
          InputLabelProps={{ shrink: true }}
          defaultValue={data.name}
          error={errors.name}
          helperText={errors.name?.message}
        />
        <Controller
          name="property"
          control={control}
          defaultValue={data.parcel}
          render={({ field }) => {
            return (
              <TextField
                select
                {...field}
                label={t("lots.details.labels.property")}
                defaultValue={`${field.value}`}
              >
                {propertiesData.map((o) => (
                  <MenuItem key={o.id} value={o.id}>{`${o.name}`}</MenuItem>
                ))}
              </TextField>
            );
          }}
        ></Controller>
        <Stack direction="row" justifyContent="center" gap={1}>
          <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
            {t("lots.details.goBackBtn")}
          </Button>
          <Button type="submit" variant="contained">
            {t("lots.details.saveBtn")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export { LotForm };
