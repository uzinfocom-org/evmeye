import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Card, CardActionArea, Box, Typography } from '@mui/material';

const NetworkItemAdd: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <Card sx={{ height: '100%', border: '1px dashed grey' }} variant="outlined">
      <CardActionArea sx={{ height: '100%' }} onClick={() => onClick()}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <AddIcon fontSize="medium" />
          <Typography fontSize={20}>Add</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default NetworkItemAdd;
