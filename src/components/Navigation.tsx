import React from 'react';
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { NETWORKS_ACTIONS } from '@/store/slices/networksSlice';

type NavigationItem =
  | {
      type: 'link';
      label: string;
      icon: React.ReactNode;
      link: string;
    }
  | {
      type: 'divider';
    }
  | {
      type: 'subheader';
      label: string;
      inset?: boolean;
    };

const items: NavigationItem[] = [
  {
    type: 'link',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/',
  },
  { type: 'divider' },
  {
    type: 'subheader',
    label: 'Settings',
    inset: true,
  },
  {
    type: 'link',
    label: 'Scanner',
    icon: <ManageSearchIcon />,
    link: '/settings/scanner',
  },
];

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const networks = useAppSelector((state) => state.networks.networks);
  const selectedNetworkId = useAppSelector((state) => state.networks.selected);
  const dispatch = useAppDispatch();

  return (
    <List component="nav">
      <Box sx={{ px: 2, my: 1 }}>
        <Select
          fullWidth
          size="small"
          value={selectedNetworkId ?? ''}
          onChange={(e) =>
            dispatch(
              NETWORKS_ACTIONS.selectNetwork({ id: e.target.value as string | null }),
            )
          }
          renderValue={(id) => {
            if (id.length == 0) {
              return <em>Select network</em>;
            }

            const network = networks.find((n) => n.id == id);

            const label = network?.label ?? '';

            return label.length == 0 ? `Network` : label;
          }}
        >
          {networks.map((network) => (
            <MenuItem value={network.id} key={network.id}>
              {network.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {items.map((item, index) => {
        switch (item.type) {
          case 'link':
            return (
              <ListItemButton
                key={index}
                selected={location.pathname == item.link}
                onClick={() => navigate(item.link)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          case 'divider':
            return <Divider key={index} sx={{ my: 1 }} />;
          case 'subheader':
            return (
              <ListSubheader component="div" inset={item.inset} key={index}>
                {item.label}
              </ListSubheader>
            );
        }
      })}
    </List>
  );
};

export default Navigation;
