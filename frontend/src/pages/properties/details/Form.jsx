import React, { useContext } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthContext from "../../../contexts/AuthProvider";

const PropertyForm = ({ formMethods, data, mutation }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onSubmit = (d) => {
    mutation.mutate({
      name: d.name,
      company: auth.company?.id,
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
            required: t("properties.details.errors.requiredName"),
          })}
          label={t("properties.details.labels.name")}
          InputLabelProps={{ shrink: true }}
          defaultValue={data.name}
          error={errors.name}
          helperText={errors.name?.message}
        />
        <Stack direction="row" justifyContent="center" gap={1}>
          <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
            {t("properties.details.goBackBtn")}
          </Button>
          <Button type="submit" variant="contained">
            {t("properties.details.saveBtn")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export { PropertyForm };
