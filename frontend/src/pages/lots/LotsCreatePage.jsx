import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Paper,
  Stack,
  Typography,
  TextField,
  Select, Alert,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import AuthContext from "../../contexts/AuthProvider";
import { Api } from "../../api/client";
import { useTranslation } from "react-i18next";

const LotDataForm = ({
  register,
  handleSubmit,
  onSubmitHandler,
  availableProperties,
  feedback, setFeedback
}) => {
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
        {availableProperties?.length > 0 ? (
          <Select
            {...register("parcel")}
            required
            defaultValue={availableProperties[0].id}
          >
            {availableProperties?.map((property) => {
              return (
                <MenuItem value={property.id} key={property.id}>
                  {property.name}
                </MenuItem>
              );
            })}
          </Select>
        ) : (
          <span>Loading...</span>
        )}
        {(() => {
            if (feedback === null) return <></>;
            const alertSeverity = feedback.type;
            return <Alert severity={alertSeverity}>{feedback.message}</Alert>;
          })()}
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
  const { auth } = useContext(AuthContext);
  const [availableProperties, setAvailableProperties] = useState([]);
  const { register, handleSubmit } = useForm();

  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const data = (await Api.listProperties()).data?.results;
      console.log(data);
      setAvailableProperties(
        data.map((property) => ({
          id: property.id,
          name: property.name,
        }))
      );
    };

    try {
      fetchProperties();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onSubmitHandler = async (data) => {
    const name = data.name;
    console.log(data);
    try {
      const response = await Api.createLot({
        name: name,
        company: auth.company.id,
        parcel: data.parcel,
      });
      console.log(response);
      setFeedback({
        type: "success",
        message: t("lots.create.createSuccessMsg"),
      });
    } catch (err) {
      console.log(err);
      const errorMsg = err?.response?.data?.detail;
      setFeedback({
        type: "error",
        message: errorMsg ? errorMsg : t("lots.create.createErrorMsg"),
      });
    }
  };

  return (
    <Stack spacing={10}>
      <Typography variant="h4">{t("lots.create.header")}</Typography>
      <Stack direction="row" justifyContent="center">
        <Paper sx={{ p: 5 }}>
          <LotDataForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmitHandler={onSubmitHandler}
            availableProperties={availableProperties}
            feedback={feedback}
            setFeedback={setFeedback}
          />
        </Paper>
      </Stack>
    </Stack>
  );
};

export default NewLotPage;
