import { NetworkSchema, TNetwork } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

export interface NetworksState {
  networks: TNetwork[];
  selected: number | null;
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
          const zodParsed = z.coerce
            .number()
            .gte(0)
            .lt(state.networks.length)
            .parse(lsNetwork);

          state.selected = zodParsed;
        } catch (e) {
          state.selected = null;
        }
      })();
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

      if ((state.selected ?? 0) >= state.networks.length) {
        state.selected = null;
      }
    },
    selectNetwork: (state, { payload }: PayloadAction<{ index: number | null }>) => {
      state.selected = payload.index;
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
