import React from 'react';
import { Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useLocation, useNavigate } from 'react-router-dom';

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

  return (
    <List component="nav">
      {items.map((item, index) => {
        switch (item.type) {
          case 'link':
            return (
              <ListItemButton
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
