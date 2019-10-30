import React from 'react';
import { DimSocket, D2Item } from 'app/inventory/item-types';
import Sheet from 'app/dim-ui/Sheet';
import { D2ManifestDefinitions } from 'app/destiny2/d2-definitions';
import {
  SocketPlugSources,
  TierType,
  DestinyInventoryItemDefinition,
  DestinyEnergyType
} from 'bungie-api-ts/destiny2';
import BungieImage, { bungieNetPath } from 'app/dim-ui/BungieImage';
import { RootState } from 'app/store/reducers';
import { storesSelector } from 'app/inventory/reducer';
import { DimStore } from 'app/inventory/store-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import styles from './SocketDetails.m.scss';
import { energyCapacityTypeNames } from './EnergyMeter';
import ElementIcon from 'app/inventory/ElementIcon';
import { compareBy } from 'app/utils/comparators';

interface ProvidedProps {
  item: D2Item;
  socket: DimSocket;
  onClose(): void;
}

interface StoreProps {
  defs: D2ManifestDefinitions;
  stores: DimStore[];
}

function mapStateToProps(state: RootState): StoreProps {
  return {
    defs: state.manifest.d2Manifest!,
    stores: storesSelector(state)
  };
}

type Props = ProvidedProps & StoreProps;

function SocketDetails({ defs, item, socket, stores, onClose }: Props) {
  const socketType = defs.SocketType.get(socket.socketDefinition.socketTypeHash);
  const socketCategory = defs.SocketCategory.get(socketType.socketCategoryHash);

  const energyType = item.energy && item.energy.energyType;
  const energyCapacityElement =
    (item.energy && energyCapacityTypeNames[item.energy.energyType]) || null;

  const sources: { [key: string]: number } = {};
  const modHashes = new Set<number>();
  if (
    socket.socketDefinition.plugSources & SocketPlugSources.ReusablePlugItems &&
    socket.socketDefinition.reusablePlugItems
  ) {
    for (const plugItem of socket.socketDefinition.reusablePlugItems) {
      modHashes.add(plugItem.plugItemHash);
      sources.ReusablePlugItems = (sources.ReusablePlugItems || 0) + 1;
    }
  }

  if (
    socket.socketDefinition.plugSources & SocketPlugSources.InventorySourced &&
    socketType.plugWhitelist
  ) {
    const plugWhitelist = new Set(socketType.plugWhitelist.map((e) => e.categoryHash));
    for (const store of stores) {
      for (const item of store.items) {
        const itemDef = defs.InventoryItem.get(item.hash);
        if (itemDef.plug && plugWhitelist.has(itemDef.plug.plugCategoryHash)) {
          modHashes.add(item.hash);
          sources.InventorySourced = (sources.InventorySourced || 0) + 1;
        }
      }
    }
  }

  if (socket.socketDefinition.reusablePlugSetHash) {
    for (const plugItem of defs.PlugSet.get(socket.socketDefinition.reusablePlugSetHash)
      .reusablePlugItems) {
      // TODO: Check against profile/character plug sets to see if they're unlocked
      modHashes.add(plugItem.plugItemHash);
      sources.reusablePlugSetHash = (sources.reusablePlugSetHash || 0) + 1;
    }
  }
  if (socket.socketDefinition.randomizedPlugSetHash) {
    for (const plugItem of defs.PlugSet.get(socket.socketDefinition.randomizedPlugSetHash)
      .reusablePlugItems) {
      // TODO: Check against profile/character plug sets to see if they're unlocked
      modHashes.add(plugItem.plugItemHash);
      sources.randomizedPlugSetHash = (sources.randomizedPlugSetHash || 0) + 1;
    }
  }

  const mods = Array.from(modHashes)
    .map((h) => defs.InventoryItem.get(h))
    .filter(
      (i) =>
        i.inventory.tierType !== TierType.Common &&
        i.tooltipStyle !== 'vendor_action' &&
        (i.plug.energyCost.energyType === energyType ||
          i.plug.energyCost.energyType === DestinyEnergyType.Any)
    )
    .sort(compareBy((i) => i.plug.energyCost.energyCost));

  const initialItem = defs.InventoryItem.get(socket.socketDefinition.singleInitialItemHash);
  const header = (
    <>
      <h1>
        {initialItem && <BungieImage src={initialItem.displayProperties.icon} />}
        <div className="energymeter-icon">
          {energyCapacityElement && <ElementIcon element={energyCapacityElement} />}
        </div>{' '}
        {socketCategory.displayProperties.name}
      </h1>
      {Object.entries(sources)
        .map((e) => e.join(': '))
        .join(', ')}
    </>
  );

  // TODO: use Mod display
  // TODO: create Mod component that works off an InventoryItem
  // TODO: make sure we're showing the right element affinity!
  // TODO: maybe show them like the perk browser, as a tile with names!
  const footer = (
    <div>
      {socket.plug && (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Mod itemDef={socket.plug.plugItem} defs={defs} />
          {socket.plug.plugItem.displayProperties.name}
          <br />
          TODO: stats (but only those that can modify), description, costs
        </div>
      )}
    </div>
  );

  console.log({ socket, socketType, socketCategory });
  return (
    <Sheet onClose={onClose} header={header} footer={footer}>
      <div className={clsx('sub-bucket', styles.modList)}>
        {mods.map((item) => (
          <Mod key={item.hash} itemDef={item} defs={defs} />
        ))}
      </div>
    </Sheet>
  );
}

export default connect<StoreProps>(mapStateToProps)(SocketDetails);

// TODO: use SVG!
function Mod({
  itemDef,
  defs
}: {
  itemDef: DestinyInventoryItemDefinition;
  defs: D2ManifestDefinitions;
}) {
  const energyType =
    itemDef &&
    itemDef.plug.energyCost &&
    itemDef.plug.energyCost.energyTypeHash &&
    defs.EnergyType.get(itemDef.plug.energyCost.energyTypeHash);
  const energyCostStat = energyType && defs.Stat.get(energyType.costStatHash);
  const costElementIcon = energyCostStat && energyCostStat.displayProperties.icon;

  return (
    <div className="item" title={itemDef.displayProperties.name}>
      <BungieImage className="item-img" src={itemDef.displayProperties.icon} />
      {costElementIcon && (
        <>
          <div
            style={{ backgroundImage: `url(${bungieNetPath(costElementIcon)}` }}
            className="energyCostOverlay"
          />
          <div className="energyCost">{itemDef.plug.energyCost.energyCost}</div>
        </>
      )}
    </div>
  );
}
