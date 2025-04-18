import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import React, { type FC, useEffect, useRef, useState } from 'react';

// Define interfaces consistent with App.tsx
interface Item {
  name: string;
  isSelected: boolean;
}

interface Column {
  items: Item[];
  selected?: string; // Optional selected item name in the *next* column
}

// Define props interface
interface MillerColumnsProps {
  columns: Column[];
  onItemSelected: (itemName: string, columnIndex: number) => void;
}

const MillerColumns: FC<MillerColumnsProps> = ({ columns, onItemSelected }) => {
  // Type the state for filter texts
  const [filterTexts, setFilterTexts] = useState<string[]>(
    Array(columns.length).fill(''),
  );

  // Type the ref for debounce timeouts (NodeJS.Timeout for Node env, number for browser)
  const debounceTimeouts = useRef<(NodeJS.Timeout | number | null)[]>([]); // Use number for browser compatibility

  // Type the event and columnIndex parameter
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    columnIndex: number,
  ) => {
    const eventValue = e.target.value; // Capture value here
    const newFilterTexts = [...filterTexts];
    newFilterTexts[columnIndex] = eventValue;

    // Clear existing timeout if present
    const currentTimeout = debounceTimeouts.current[columnIndex];
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }

    // Set new timeout
    debounceTimeouts.current[columnIndex] = setTimeout(() => {
      // Update state using the captured value
      setFilterTexts((prevTexts) => {
        const updatedTexts = [...prevTexts];
        updatedTexts[columnIndex] = eventValue;
        return updatedTexts;
      });
    }, 300); // 300ms delay
  };

  // Ensure filterTexts array is updated when columns change length
  useEffect(() => {
    setFilterTexts((prevTexts) => {
      const newLength = columns.length;
      if (prevTexts.length === newLength) {
        return prevTexts; // No change needed
      }
      // Adjust length, preserving existing filters
      const newTexts = Array(newLength).fill('');
      for (let i = 0; i < Math.min(prevTexts.length, newLength); i++) {
        newTexts[i] = prevTexts[i];
      }
      return newTexts;
    });

    // Also clear timeouts when columns change to avoid memory leaks
    // or operating on stale indices
    debounceTimeouts.current.forEach((timeoutId) => {
      if (timeoutId) clearTimeout(timeoutId);
    });
    debounceTimeouts.current = Array(columns.length).fill(null);
  }, [columns]);

  // Type the column and columnIndex parameters in map
  // Note: The logic to pad with empty arrays seems incorrect for the Column type.
  // Assuming the goal is just to render the provided columns.
  // If padding is truly needed, the pushed elements should conform to Column interface.
  // const fullColumns = [...columns]; // This is typed as Column[]
  // while (fullColumns.length < 6) {
  //   fullColumns.push({ items: [] }); // Push valid Column objects if padding
  // }

  return (
    <Box
      display="flex"
      height="100%"
      width="100%"
      overflow="hidden"
      bgcolor="#f7f7f7"
      position="relative"
    >
      {/* Map directly over the columns prop */}
      {columns.map(
        (column: Column, columnIndex: number) =>
          // Check if column and column.items exist and have length
          column?.items?.length > 0 && (
            <List
              key={`column-${columnIndex}`} // Use a more specific key
              style={{
                minWidth: '200px',
                width: 'auto',
                overflowY: 'auto',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                minHeight: '350px',
                maxHeight: '350px',
                margin: '10px 5px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {column.items.length > 10 && (
                <Box
                  key={`input-container-${columnIndex}`}
                  sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    backgroundColor: '#ffffff',
                  }}
                >
                  <ListItem
                    key={`input-${columnIndex}`}
                    style={{ padding: '0px 16px' }}
                  >
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Search..."
                      fullWidth
                      margin="dense"
                      onChange={(e) => handleFilterChange(e, columnIndex)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '16px', // Rounded corners
                          '& .MuiOutlinedInput-input': {
                            fontSize: '0.75rem', // Increased font size
                            padding: '8px 14px', // Increased height
                          },
                        },
                      }}
                    />
                  </ListItem>
                </Box>
              )}
              {/* Type the item and itemIndex parameters in filter/map */}
              {column.items
                .filter((item: Item) =>
                  item.name
                    .toLowerCase()
                    // Ensure filterTexts[columnIndex] exists before calling toLowerCase()
                    .includes((filterTexts[columnIndex] ?? '').toLowerCase()),
                )
                .map((item: Item, itemIndex: number) => (
                  <ListItem
                    button
                    key={`${item.name}-${columnIndex}-${itemIndex}`} // More robust key
                    onClick={() => onItemSelected(item.name, columnIndex)}
                    selected={item.isSelected}
                    sx={{
                      // Prefer sx prop over style for MUI components
                      backgroundColor: item.isSelected
                        ? '#F7A1A7'
                        : 'transparent',
                      padding: '0px 16px', // Keep padding if specific override needed
                      // Example of hover effect using sx
                      '&:hover': {
                        backgroundColor: item.isSelected
                          ? '#F7A1A7'
                          : '#f0f0f0', // Keep selection color or use light gray
                      },
                    }}
                  >
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
            </List>
          ),
      )}
    </Box>
  );
};

export default MillerColumns;
