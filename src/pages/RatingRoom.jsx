import * as React from "react";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

export default function RatingRoom() {
  return (
    <div className="flex flex-col gap-2">
      <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>
        <h1>Rating Room</h1>
      </Typography>
      <div style={{ height: 300, width: "100%" }}>
      </div>
    </div>
  );
}
