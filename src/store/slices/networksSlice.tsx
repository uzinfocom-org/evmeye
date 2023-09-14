import { NetworkSchema, TNetwork } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { Middleware, PayloadAction } from '@reduxjs/toolkit';

export interface NetworksState {
  networks: TNetwork[];
}

const initialState: NetworksState = {
  networks: [],
};

export const networksSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {
    initNetwork: (state) => {
      const lsNetworks = localStorage.getItem('settings.networks');

      if (!lsNetworks) return;

      try {
        const jsonParsed = JSON.parse(lsNetworks);
        const zodParsed = NetworkSchema.array().parse(jsonParsed);
        state.networks = zodParsed;
      } catch (e) {
        state.networks = [];
      }
    },
    addNetwork: (state) => {
      state.networks.push({
        label: '',
        url: '',
      });
    },
    editNetwork: (
      state,
      { payload }: PayloadAction<{ index: number; item: TNetwork }>,
    ) => {
      state.networks = state.networks.map((item, index) =>
        payload.index == index ? payload.item : item,
      );
    },
    deleteNetwork: (state, { payload }: PayloadAction<{ index: number }>) => {
      state.networks = state.networks.filter((_, index) => payload.index != index);
    },
  },
});

export const NETWORKS_ACTIONS = networksSlice.actions;

export default networksSlice.reducer;

export const networksMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    let state = getState();
    next(action);
    state = getState();

    if (
      ['networks/addNetwork', 'networks/editNetwork', 'networks/deleteNetwork'].includes(
        action.type,
      )
    ) {
      localStorage.setItem('settings.networks', JSON.stringify(state.networks.networks));
    }
  };
