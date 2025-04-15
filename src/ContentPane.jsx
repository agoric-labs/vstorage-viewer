import React, { useState } from "react";
import { Box, Switch, FormControlLabel } from "@mui/material";
import ReactJson from "react-json-view";
import { decodeValues } from "./api.js";

/**
 * @param {object} props
 * @param {number} props.blockHeight
 * @param {string[]} props.values
 */
const ContentPane = ({ blockHeight, values }) => {
  console.debug("ContentPane", { blockHeight, values });
  const [showRaw, setShowRaw] = useState(false);

  const handleToggleChange = (event) => {
    setShowRaw(event.target.checked);
  };

  if (!values) {
    return null;
  }

  const rawValues = values.map(JSON.parse) ?? [];

  // Decode only when needed
  const decodedValues = !showRaw && decodeValues(values);

  return (
    <div>
      {/* Block Height Display */}
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
        Block: <tt>{blockHeight || "Latest"}</tt>
      </Box>

      {/* Toggle Switch */}
      <Box display="flex" justifyContent="flex-end" margin="10px 10px 0 10px">
        <FormControlLabel
          control={<Switch checked={showRaw} onChange={handleToggleChange} />}
          label="Raw"
        />
      </Box>

      {/* Data Display */}
      {showRaw ? (
        // Raw View
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
            src={rawValues}
            name={null}
            theme="rjv-default"
            indentWidth={2}
            collapsed={false}
            enableClipboard={true} // Enable clipboard for raw data
            displayObjectSize={true}
            displayDataTypes={true}
          />
        </Box>
      ) : (
        // Pretty (Decoded) View
        decodedValues.map((v, i) => (
          <Box
            key={i}
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
              src={v}
              name={null}
              theme="rjv-default"
              indentWidth={2}
              collapsed={false}
              enableClipboard={false}
              displayObjectSize={false}
              displayDataTypes={false}
            />
          </Box>
        ))
      )}
    </div>
  );
};

export default ContentPane;
