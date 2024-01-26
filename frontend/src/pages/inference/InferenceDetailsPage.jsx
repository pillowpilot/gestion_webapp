import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Image } from "mui-image";
import { Api } from "../../api/client";
import { useQuery } from "react-query";

const InferenceDetailsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const results = useQuery(["inferences", id], () => Api.retrieveInference(id));

  const [status, setStatus] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchInference = async () => {
      const data = (await Api.retrieveInference(id)).data;
      console.log(data);
      setStatus(data.status);
      setImageUrl(data.image);
    };
    try {
      fetchInference();
    } catch (err) {
      console.log(err);
    }
  });

  if (results.isLoading)
    <Stack direction="column" alignItems="center" gap={1}>
      <CircularProgress />
      <Button variant="outlined" size="medium" onClick={() => navigate(-1)}>
        {t("inferences.details.goBackBtn")}
      </Button>
    </Stack>;

  return (
    <Stack direction="row">
      <Box sx={{ flexGrow: 2 }}></Box>
      <Paper sx={{ p: 5, flexGrow: 3 }}>
        <Stack direction="column" gap={1}>
          <Stack direction="row" gap={1} flexWrap="wrap">
            <Stack sx={{flexGrow: 1}}> 
              <Typography variant="h5">Details</Typography>
              <Typography>Lorem ipsum dolor sit amet.</Typography>
              <Typography>Lorem ipsum dolor sit amet.</Typography>
              <Typography>Lorem ipsum dolor sit amet.</Typography>
              <Typography>Lorem ipsum dolor sit amet.</Typography>
              <Typography>Lorem ipsum dolor sit amet.</Typography>
              <Typography>Lorem ipsum dolor sit amet.</Typography>
            </Stack>
            <Stack  sx={{flexGrow: 1}}>
              <Typography variant="h5">Preview</Typography>
              <Image
                src={imageUrl}
                showLoading={true}
                sx={{
                  maxWidth: "600px",
                  maxHeight: "600px",
                }}
              />
            </Stack>
          </Stack>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => navigate(-1)}
            sx={{ alignSelf: "center" }}
          >
            {t("inferences.details.goBackBtn")}
          </Button>
        </Stack>
      </Paper>
      <Box sx={{ flexGrow: 2 }}></Box>
    </Stack>
  );
};

export default InferenceDetailsPage;
