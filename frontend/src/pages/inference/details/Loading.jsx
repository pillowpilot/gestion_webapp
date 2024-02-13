import React from "react";
import { Stack, Skeleton } from "@mui/material";

const LoadingDetails = () => {
  return (
    <Stack gap={2}>
      <Skeleton variant="rounded" height="25px" />
      <Skeleton variant="rounded" height="25px" />
      <Skeleton variant="rounded" height="25px" />
      <Skeleton variant="rounded" height="25px" />
      <Skeleton variant="rounded" height="25px" />
    </Stack>
  );
};

const LoadingPreview = () => {
  return (
    <Skeleton
      variant="rounded"
      width="100%"
      height="100%"
      sx={{ minHeight: { xs: "150px", md: "300px", lg: "400px" } }}
    />
  );
};

export { LoadingDetails, LoadingPreview };
