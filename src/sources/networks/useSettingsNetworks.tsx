import { NetworkSchema, TNetwork } from '@/types';
import React from 'react';

export default function useSettingsNetworks() {
  const [loading, setLoading] = React.useState(true);
  const [networks, setNetworks] = React.useState<TNetwork[]>([]);

  React.useEffect(() => {
    const lsNetworks = localStorage.getItem('settings.networks');

    if (!lsNetworks) return;

    try {
      const jsonParsed = JSON.parse(lsNetworks);
      const zodParsed = NetworkSchema.array().parse(jsonParsed);
      setNetworks(zodParsed);
    } catch (e) {
      setNetworks([]);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    if (loading) return;
    localStorage.setItem('settings.networks', JSON.stringify(networks));
  }, [loading, networks]);

  const addNetwork = React.useCallback(
    () => setNetworks((networks) => [...networks, { label: '', url: '' }]),
    [setNetworks],
  );

  const editNetwork = React.useCallback(
    (index: number, item: TNetwork) =>
      setNetworks((networks) =>
        networks.map((arrItem, arrIndex) => (index == arrIndex ? item : arrItem)),
      ),
    [setNetworks],
  );

  const deleteNetwork = React.useCallback(
    (index: number) =>
      setNetworks((networks) => networks.filter((_, arrIndex) => index != arrIndex)),
    [setNetworks],
  );

  return { networks, addNetwork, editNetwork, deleteNetwork };
}
