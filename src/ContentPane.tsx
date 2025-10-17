import React, { useState, ChangeEvent } from 'react';
import { Box, Switch, FormControlLabel } from '@mui/material';
import ReactJson from 'react-json-view';
import { decodeValues } from './api.js';
import { getBlockExplorerUrl } from './utils';

interface ContentPaneProps {
  blockHeight: string | null; // Allow null for 'Latest'
  values: string[] | null; // Allow null if no values
  apiEndpoint: string;
}

const ContentPane: React.FC<ContentPaneProps> = ({ blockHeight, values, apiEndpoint }) => {
}) => {
  console.debug('ContentPane', { blockHeight, values });
  const [showRaw, setShowRaw] = useState(false);

  const handleToggleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShowRaw(event.target.checked);
  };

  if (!values) {
    return null; // Return null if values is null
  }

  // Safely parse JSON, handling potential errors
  const rawValues = values
    .map((v) => {
      try {
        return JSON.parse(v);
      } catch (e) {
        console.error('Failed to parse JSON string:', v, e);
        return { error: 'Invalid JSON', originalValue: v }; // Represent error state
      }
    })
    .filter((v) => v !== undefined); // Filter out undefined results from errors if needed

  // Decode only when needed, ensure values is not null
  const decodedValues = !showRaw ? decodeValues(values) : [];

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
        style={{ whiteSpace: 'pre-wrap' }}
      >
        Block: <tt>{blockHeight && blockHeight !== 'Latest' && getBlockExplorerUrl(apiEndpoint, parseInt(blockHeight)) ? (
          <a 
            href={getBlockExplorerUrl(apiEndpoint, parseInt(blockHeight))} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {blockHeight}
          </a>
        ) : (
          blockHeight || 'Latest'
        )}</tt>
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
          style={{ whiteSpace: 'pre-wrap' }}
        >
          <ReactJson
            src={rawValues}
            name={null}
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
            style={{ whiteSpace: 'pre-wrap' }}
          >
            <ReactJson
              src={v}
              name={null}
              collapsed={false}
              quotesOnKeys={false}
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
