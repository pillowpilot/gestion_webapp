import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Typography,
  Button,
  Paper,
  Select,
  Stack,
  TextField,
  MenuItem,
  Alert,
  Skeleton,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
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
    <Stack>
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
    </Stack>
  );
};

const LotForm = ({ propertiesData, data, mutation }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentPropertyId, setCurrentPropertyId] = useState(data?.parcel);

  const { register, handleSubmit } = useForm({
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
    <Stack>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
        }}
      >
        <Stack spacing={5}>
          <TextField
            {...register("name")}
            required
            label="Name"
            InputLabelProps={{ shrink: true }}
          />
          <Select
            {...register("property")}
            required
            defaultValue={currentPropertyId}
          >
            {propertiesData.map((o) => (
              <MenuItem key={o.id} value={o.id}>{`${o.name}`}</MenuItem>
            ))}
          </Select>
          <FeedbackAlert mutation={mutation} />
          <Stack direction="row" justifyContent="center" gap={1}>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => navigate(-1)}
            >
              {t("lots.details.goBackBtn")}
            </Button>
            <Button type="submit" variant="contained">
              {t("lots.details.saveBtn")}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
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
    }
  });

  if (retrieveLot.isLoading || listProperties.isLoading)
    return (
      <Stack spacing={10}>
        <Typography variant="h4">{t("lots.details.header")}</Typography>
        <Stack direction="row" justifyContent="center">
          <Box sx={{ width: 500 }}>
            <Paper sx={{ p: 5 }}>
              <LoadingLotForm />
            </Paper>
          </Box>
        </Stack>
      </Stack>
    );

  return (
    <Stack spacing={10}>
      <Typography variant="h4">{t("lots.details.header")}</Typography>
      <Stack direction="row" justifyContent="center">
        <Box sx={{ width: 500 }}>
          <Paper sx={{ p: 5 }}>
            <LotForm
              propertiesData={listProperties.data?.data?.results}
              data={retrieveLot.data?.data}
              mutation={mutation}
            />
          </Paper>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LotDetailsPage;
