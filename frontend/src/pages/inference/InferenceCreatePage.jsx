import { useState, useEffect, useContext } from "react";
import {
  Button,
  Grid,
  Input,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthContext from "../../contexts/AuthProvider";
import { Api } from "../../api/client";

const InferenceForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [feedback, setFeedback] = useState(null);
  const [availableLots, setAvailableLots] = useState([]);

  const { register, handleSubmit, reset } = useForm();
  const onSubmitHandler = async (data) => {
    const image = data.image[0];
    const model = data.model;
    const lot = data.lot;
    console.log(data);

    try {
      const response = await Api.createInference({
        image: image,
        model: model,
        lot: lot,
      });
      console.log(response);
      setFeedback({
        type: "success",
        message: t("inferences.create.successMsg"),
      });
    } catch (err) {
      const errorMsg = err?.response?.data?.detail;
      setFeedback({
        type: "error",
        message: errorMsg? errorMsg : t("inferences.create.errorMsg"),
      });
    }

    reset();
  };

  useEffect(() => {
    const fetchLots = async () => {
      const lots = (await Api.retrieveCompanyLots(auth.company.id)).data;
      console.log(lots);
      setAvailableLots(lots);
    };
    try {
      fetchLots();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <Paper
      sx={{
        padding: 5,
      }}
    >
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Stack spacing={5}>
          <Typography variant="h5">
            {t("inferences.create.labels.inferenceModel")}
          </Typography>
          <Select {...register("model")} required defaultValue={"leaves"}>
            <MenuItem value={"leaves"}>
              {t("inferences.create.options.leavesDiseases")}
            </MenuItem>
            <MenuItem value={"fruits"}>
              {t("inferences.create.options.fruitsDiseases")}
            </MenuItem>
            <MenuItem value={"tree_counting"}>
              {t("inferences.create.options.treeCounting")}
            </MenuItem>
          </Select>
          <Typography variant="h5">
            {t("inferences.create.labels.lot")}
          </Typography>
          {availableLots.length > 0 ? (
            <Select
              {...register("lot")}
              required
              defaultValue={availableLots[0].id}
            >
              {availableLots.map((lot) => {
                return (
                  <MenuItem value={lot.id} key={lot.id}>
                    {lot.name}
                  </MenuItem>
                );
              })}
            </Select>
          ) : (
            <span>Loading...</span>
          )}
          <Typography variant="h5">
            {t("inferences.create.labels.inputImage")}
          </Typography>
          <Input {...register("image")} required type="file" accept="image/*" />
          {(() => {
            if (feedback === null) return <></>;
            const alertSeverity = feedback.type;
            return <Alert severity={alertSeverity}>{feedback.message}</Alert>;
          })()}
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
