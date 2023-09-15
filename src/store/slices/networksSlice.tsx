import { NetworkSchema, TNetwork } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export interface NetworksState {
  networks: TNetwork[];
  selected: string | null;
}

const initialState: NetworksState = {
  networks: [],
  selected: null,
};

export const networksSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {
    init: (state) => {
      (() => {
        const lsNetworks = localStorage.getItem('settings.networks');

        if (lsNetworks == undefined) return;

        try {
          const jsonParsed = JSON.parse(lsNetworks);
          const zodParsed = NetworkSchema.array().parse(jsonParsed);
          state.networks = zodParsed;
        } catch (e) {
          state.networks = [];
        }
      })();

      (() => {
        const lsNetwork = localStorage.getItem('settings.selected');

        if (lsNetwork == undefined) return;

        try {
          const zodParsed = z.string().uuid().parse(lsNetwork);
          state.selected = zodParsed;
        } catch (e) {
          state.selected = null;
        }
      })();
    },
    addNetwork: (state) => {
      state.networks.push({
        id: uuidv4(),
        label: '',
        url: '',
      });
    },
    editNetwork: (state, { payload }: PayloadAction<{ network: TNetwork }>) => {
      state.networks = state.networks.map((n) =>
        n.id == payload.network.id ? payload.network : n,
      );
    },
    deleteNetwork: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.networks = state.networks.filter((n) => n.id != payload.id);

      if (!state.networks.find((n) => n.id == state.selected)) {
        state.selected = null;
      }
    },
    selectNetwork: (state, { payload }: PayloadAction<{ id: string | null }>) => {
      state.selected = payload.id;
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

    if (['networks/selectNetwork', 'networks/deleteNetwork'].includes(action.type)) {
      localStorage.setItem('settings.selected', state.networks.selected);
    }
  };
