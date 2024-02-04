import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Typography,
  Button,
  Paper,
  Stack,
  TextField,
  MenuItem,
  Alert,
  Skeleton,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Api } from "../../api/client";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";

const FeedbackAlert = ({ mutation }) => {
  const { t } = useTranslation();
  if (mutation.isSuccess)
    return (
      <Alert severity="success">{t("lots.details.updateSuccessMsg")}</Alert>
    );

  if (mutation.isError) {
    const errorCode = mutation?.error?.code;
    if (errorCode === "ERR_NETWORK")
      return <Alert severity="error">{t("errors.network.default")}</Alert>;

    const errorMsg = mutation?.error?.response?.data?.detail;
    return (
      <Alert severity="error">
        {errorMsg ? errorMsg : t("lots.details.updateErrorMsg")}
      </Alert>
    );
  }
};

const LoadingLotForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Stack spacing={5}>
      <Skeleton variant="rounded" width={420} height={60} />
      <Skeleton variant="rounded" width={420} height={60} />
      <Stack direction="row" justifyContent="center" gap={1}>
        <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
          {t("lots.details.goBackBtn")}
        </Button>
        <Button disabled type="submit" variant="contained">
          {t("lots.details.saveBtn")}
        </Button>
      </Stack>
    </Stack>
  );
};

const LotForm = ({ propertiesData, data, mutation }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentPropertyId, setCurrentPropertyId] = useState(data?.parcel);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data.name,
      propertyName: data.parcel_name,
    },
  });

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
          error={errors.name}
          helperText={errors.name?.message}
        />
        <Controller
          name="property"
          control={control}
          defaultValue={currentPropertyId}
          render={({ field }) => (
            <TextField
              select
              {...field}
              label={t("lots.details.labels.property")}
            >
              {propertiesData.map((o) => (
                <MenuItem key={o.id} value={o.id}>{`${o.name}`}</MenuItem>
              ))}
            </TextField>
          )}
        ></Controller>
        <FeedbackAlert mutation={mutation} />
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

const LotDetailsPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const listProperties = useQuery("properties", () => Api.listProperties());
  const retrieveLot = useQuery(["lots", id], () => Api.retrieveLot(id));
  const mutation = useMutation({
    mutationFn: (data) => Api.updateLot(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["lots"]);
    },
  });

  if (retrieveLot.isLoading || listProperties.isLoading)
    return (
      <Stack spacing={10}>
        <Stack direction="row" justifyContent="center">
          <Box sx={{ width: 500 }}>
            <Paper sx={{ p: 5 }}>
              <Stack gap={5}>
                <Typography variant="h4">{t("lots.details.header")}</Typography>
                <LoadingLotForm />
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Stack>
    );

  // TODO Add error handling

  return (
    <Stack spacing={10}>
      <Stack direction="row" justifyContent="center">
        <Box sx={{ width: 500 }}>
          <Paper sx={{ p: 5 }}>
            <Stack gap={5}>
              <Typography variant="h4">{t("lots.details.header")}</Typography>
              <LotForm
                propertiesData={listProperties.data?.data?.results}
                data={retrieveLot.data?.data}
                mutation={mutation}
              />
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LotDetailsPage;
