import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Alert,
  Stack,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { MuiFileInput } from 'mui-file-input'
import { useTranslation, withTranslation } from "react-i18next";


const FormErrorMessage = ({ flag, msg }) =>
  flag ? <Alert severity="error">{msg}</Alert> : <></>;

const SuccessfullSubmitMessage = ({ flag }) => {
  const { t } = useTranslation();
  if (!flag) return <></>;
  return (
    <Alert severity="success">{t("properties.create.createSuccessMsg")}</Alert>
  );
};

const Form = ({ t, formMethods, onSubmitHandler }) => {
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
          sm: {minWidth: "350px",}
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
          render={({field, fieldState}) => {
            console.log("field", field);
            console.log("fieldState", fieldState);
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
        <SuccessfullSubmitMessage flag={isSubmitSuccessful} />
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
