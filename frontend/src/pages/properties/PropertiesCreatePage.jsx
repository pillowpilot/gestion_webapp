import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Button, Paper, Alert, Stack, Typography, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import AuthContext from "../../contexts/AuthProvider";
import { Api } from "../../api/client";
import { useTranslation } from "react-i18next";

const PropertyDataForm = ({ register, handleSubmit, onSubmitHandler, feedback, setFeedback }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Stack
        spacing={3}
        sx={{
          minWidth: "350px",
        }}
      >
        <TextField required label="Name" {...register("name")} />
        {(() => {
            if (feedback === null) return <></>;
            const alertSeverity = feedback.type;
            return <Alert severity={alertSeverity}>{feedback.message}</Alert>;
          })()}
        <Stack direction="row" justifyContent="center" gap={1}>
          <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
            {t("properties.create.goBackBtn")}
          </Button>
          <Button variant="contained" type="submit">
            {t("properties.create.saveBtn")}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

const NewPropertyPage = () => {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const [feedback, setFeedback] = useState(null);

  const onSubmitHandler = async (data) => {
    const name = data.name;
    try {
      const response = await Api.createProperty({
        name: name,
        company: auth.company.id,
      });
      console.log(response);
      setFeedback({
        type: "success",
        message: t("properties.create.createSuccessMsg"),
      });
    } catch (err) {
      console.log(err);
      const errorMsg = err?.response?.data?.detail;
      setFeedback({
        type: "error",
        message: errorMsg ? errorMsg : t("properties.create.createErrorMsg"),
      });
    }
  };

  return (
    <Stack spacing={10}>
      <Typography variant="h4">{t("properties.create.header")}</Typography>
      <Stack direction="row" justifyContent="center">
        <Paper sx={{ p: 5 }}>
          <PropertyDataForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmitHandler={onSubmitHandler}
            feedback={feedback}
            setFeedback={setFeedback}
          />
        </Paper>
      </Stack>
    </Stack>
  );
};

export default NewPropertyPage;
