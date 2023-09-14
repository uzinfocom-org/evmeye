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
  const selectedNetworkIndex = useAppSelector((state) => state.networks.selected);
  const dispatch = useAppDispatch();

  return (
    <List component="nav">
      <Box sx={{ px: 2, my: 1 }}>
        <Select
          fullWidth
          size="small"
          value={selectedNetworkIndex ?? -1}
          onChange={(e) =>
            dispatch(
              NETWORKS_ACTIONS.selectNetwork({ index: e.target.value as number | null }),
            )
          }
          renderValue={(index) => {
            if (index == -1) {
              return <em>Select network</em>;
            }

            return networks[index].label ?? `Network ${index + 1}`;
          }}
        >
          {networks.map((network, index) => (
            <MenuItem value={index} key={index}>
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
