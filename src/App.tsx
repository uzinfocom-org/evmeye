import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from '@/router';
import { useAppDispatch } from '@/store/hooks';
import { NETWORKS_ACTIONS } from '@/store/slices/networksSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(NETWORKS_ACTIONS.init());
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
