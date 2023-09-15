import { TNetwork } from '@/types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const NetworkItem: React.FC<{
  item: TNetwork;
  setItem: (item: TNetwork) => void;
  deleteItem: () => void;
}> = ({ item, setItem, deleteItem }) => {
  const [label, setLabel] = React.useState(item.label);
  const [url, setUrl] = React.useState(item.url);

  React.useEffect(() => {
    setLabel(item.label);
  }, [item.label]);

  React.useEffect(() => {
    setUrl(item.url);
  }, [item.url]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Network
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Label"
            variant="standard"
            fullWidth
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <TextField
            label="RPC URL"
            variant="standard"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setItem({ id: item.id, label, url })}>
          Save
        </Button>
        <Button size="small" color="error" onClick={() => deleteItem()}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default NetworkItem;
