import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Stack,
  Alert,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { MuiFileInput } from "mui-file-input";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Api } from "../../api/client";

const FormErrorMessage = ({ flag, msg }) =>
  flag ? <Alert severity="error">{msg}</Alert> : <></>;

const SuccessfullSubmitMessage = ({ flag }) => {
  const { t } = useTranslation();
  if (!flag) return <></>;
  return (
    <Alert severity="success">{t("properties.create.createSuccessMsg")}</Alert>
  );
};

const InferenceForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formMethods = useForm();
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitSuccessful },
  } = formMethods;

  const listLotsQuery = useQuery("lots", Api.listLots);

  const onSubmitHandler = async (data) => {
    try {
      await Api.createInference({
        image: data.image,
        model: data.model,
        lot: data.lot,
      });
    } catch (err) {
      const errorsData = err.response.data;
      if (errorsData.detail)
        setError("root.serverError", {
          type: "400",
          message: errorsData.detail,
        });
      if (errorsData.model)
        setError("model", { type: "400", message: errorsData.model });
      if (errorsData.lot)
        setError("lot", { type: "400", message: errorsData.lot });
      if (errorsData.image)
        setError("image", { type: "400", message: errorsData.image });
    }
  };

  if (listLotsQuery.isLoading) return <p>Loading...</p>;
  if (listLotsQuery.isError) return <p>Error :(</p>;

  const lots = listLotsQuery.data.data.results;
  return (
    <Paper
      sx={{
        padding: 5,
      }}
    >
      <Stack spacing={5}>
        <Typography variant="h4">{t("inferences.create.header")}</Typography>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Stack spacing={5}>
            <TextField
              select
              label={t("inferences.create.labels.inferenceModel")}
              {...register("model", { required: "model required" })}
              error={errors.model}
              helperText={errors.model?.message}
              defaultValue={"leaves"}
            >
              <MenuItem value={"leaves"}>
                {t("inferences.create.options.leavesDiseases")}
              </MenuItem>
              <MenuItem value={"fruits"}>
                {t("inferences.create.options.fruitsDiseases")}
              </MenuItem>
              <MenuItem value={"tree_counting"}>
                {t("inferences.create.options.treeCounting")}
              </MenuItem>
            </TextField>

            <TextField
              select
              label={t("inferences.create.labels.lot")}
              {...register("lot", {
                required: "inferences.create.errors.requiredLot",
              })}
              error={errors.lot}
              helperText={errors.lot?.message}
              defaultValue={lots[0].id}
            >
              {lots.map((lot) => (
                <MenuItem key={lot.id} value={lot.id}>
                  {lot.name}
                </MenuItem>
              ))}
            </TextField>

            <Controller
              name="image"
              control={control}
              rules={{
                required: t("inferences.create.errors.requiredImage"),
              }}
              render={({ field, fieldState }) => {
                console.log("field", field);
                console.log("fieldState", fieldState);
                return (
                  <MuiFileInput
                    {...field}
                    label={t("inferences.create.labels.inputImage")}
                    inputProps={{ accept: "image/*" }}
                    error={fieldState.invalid}
                    helperText={
                      fieldState.invalid ? fieldState.error?.message : ""
                    }
                  />
                );
              }}
            />

            <FormErrorMessage
              flag={errors.root?.serverError}
              msg={errors.root?.serverError?.message}
            />

            <SuccessfullSubmitMessage flag={isSubmitSuccessful} />

            <Stack direction="row" justifyContent="center" gap={1}>
              <Button
                variant="outlined"
                size="medium"
                onClick={() => navigate(-1)}
              >
                {t("inferences.create.goBackBtn")}
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="medium"
                endIcon={<SendIcon />}
              >
                {t("inferences.create.inferBtn")}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
};

const InferenceFormPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={0} md={3} />
      <Grid item xs={12} md={6}>
        <InferenceForm />
      </Grid>
      <Grid item xs={0} md={3} />
    </Grid>
  );
};

export default InferenceFormPage;
