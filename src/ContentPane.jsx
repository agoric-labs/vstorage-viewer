import React from "react";
import { Box } from "@mui/material";
import ReactJson from "react-json-view";

/**
 * @param {object} props
 * @param {object} props.obj JSON-safe object
 */
const ContentPane = ({ obj }) => {
  return (
    <Box
      flex="1"
      bgcolor="#ffffff"
      borderRadius="8px"
      boxShadow="0 2px 4px rgba(0,0,0,0.5)"
      margin="10px"
      overflow="auto"
      padding={2}
      style={{ whiteSpace: "pre-wrap" }}
    >
      <ReactJson
        src={obj}
        theme="rjv-default"
        indentWidth={2}
        collapsed={false}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
      />
    </Box>
  );
};

export default ContentPane;
