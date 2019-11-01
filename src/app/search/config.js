module.exports = {
  junkItemTemplate: '<%= reason %> / Conflicts: <%= hasConflict %>',
  junkReasonTemplate: '<%= combo[0] %> / <%= combo[1] %> - <%= reason %> <%= conflicts %>',
  //items that should not be included as part of the analysis
  skipTags: ['junk'],
  //items that should not be shown as having junk perks
  ignoreTags: ['keep', 'favorite'],
  //set this to true to always keep unique armor items even if it's a year 1 item
  keepUniqueAlways: false,
  //unwanted individual single perks (any column)
  unwantedPerks: [
    'Arrow Scavenger',
    'Auto Rifle Reserves',
    'Auto Rifle Scavenger',
    'Bow Ammo Finder',
    'Bow Dexterity',
    'Bow Reloader',
    'Bow Reserves',
    'Fastball',
    'Fusion Rifle Reserves',
    'Fusion Rifle Scavenger',
    'Fusion Rifle Scavenger',
    'Grenade Launcher Dexterity',
    'Grenade Launcher Loader',
    'Grenade Launcher Reservers',
    'Grenade Launcher Scavenger',
    'Hand Cannon Loader',
    'Hand Cannon Reserves',
    'Hand Cannon Scavenger',
    'Hand Cannon Targeting',
    'Hands-On',
    'Impact Induction',
    'Invigoration',
    'Large Weapon Loader',
    'Light Arms Dexterity',
    'Light Arms Loader',
    'Light Reactor',
    'Linear fusion Rifle Reserves',
    'Linear fusion Rifle Scavenger',
    'Machine Gun Ammo Finder',
    'Machine Gun Dexterity',
    'Machine Gun Loader',
    'Machine Gun Reserves',
    'Machine Gun Scavenger',
    'Machine Gun Targeting',
    'Oversize Weapon Dexterity',
    'Power Dexterity',
    'Power Weapon Loader',
    'Precision Weapon Targeting',
    'Primary Ammo Finder',
    'Pulse Rifle Ammo Finder',
    'Pulse Rifle Loader',
    'Pulse Rifle Reserves',
    'Pulse Rifle Scavenger',
    'Pulse Rifle Targeting',
    'Remote Connnection',
    'Rifle Dexterity',
    'Rifle Loader',
    'Scatter Projectile Targeting',
    'Scout Rifle Dexterity',
    'Scout Rifle Loader',
    'Scout Rifle Reserves',
    'Scout Rifle Scavenger',
    'Scout Rifle Targeting',
    'Shotgun Ammo Finder',
    'Shotgun Dexterity',
    'Shotgun Loader',
    'Shotgun Reserves',
    'Shotgun Scavenger',
    'Shotgun Scavenger',
    'Shotgun Targeting',
    'Sidearm Dexterity',
    'Sidearm Loader',
    'Sidearm Reserves',
    'Sidearm Scavenger',
    'Sniper Rifle Dexterity',
    'Sniper Rifle Scavenger',
    'Sniper Rifle Targeting',
    'Submachine Gun Dexterity',
    'Submachine Gun Reserves',
    'Sword Scavenger',
    'Traction',
    'Unflinching Auto Rifle Aim',
    'Unflinching Bow Aim',
    'Unflinching Fusion Rifle Aim',
    'Unflinching Grenade Launcher Aim',
    'Unflinching Large Arms',
    'Unflinching Light Arms Aim',
    'Unflinching Power Aim',
    'Unflinching Pulse Rifle Aim',
    'Unflinching Rifle Aim',
    'Unflinching Sidearm Aim',
    'Unflinching Sniper Aim',
    'Unflinching Submachine Gun Aim'
  ],
  wantedPerkPairs: [],
  //unwanted combos (first column + second column)
  unwantedPerkPairs: [],
  // RL/LF/Sword Perk + non-matching RL/LF/Sword Perk
  // real example: LF loader + sword scavener
  uniqueWeaponSlots: ['Sword', 'Rocket', 'Linear', 'Machine'],

  // if you have the generic type you don't need the specific type (these generic are the same speed as the specific)
  genericEtsPerks: {
    // this applies to gauntlets, machine gun isn't specified but testing shows it has an improvement
    'Large Weapon': ['Rocket Launcher', 'Grenade Launcher', 'Shotgun', 'Machine Gun'],
    // these apply to both gauntlets and chests
    'Light Arms': ['Hand Cannon', 'Submachine Gun', 'Sidearm', 'Bow'],
    //these apply to gauntlets, chest and boots
    Rifle: [
      'Scout Rifle',
      'Auto Rifle',
      'Pulse Rifle',
      'Sniper Rifle',
      'Linear Fusion Rifle',
      'Fusion Rifle'
    ],
    // these apply to boots only
    'Oversize Weapon': ['Rocket Launcher', 'Grenade Launcher', 'Shotgun', 'Bow'],
    // these two apply to helmets only
    'Scatter Projectile': [
      'Auto Rifle',
      'Submachine Gun',
      'Pulse Rifle',
      'Sidearm',
      'Fusion Rifle'
    ],
    'Precision Weapon': [
      'Hand Cannon',
      'Scout Rifle',
      'Trace Rifle',
      'Bow',
      'Linear Fusion Rifle',
      'Sniper Rifle'
      //'Shotgun' applies to Slug Shotguns but that's only the Chaperone so Shotgun Targeting is still needed
    ]
  },
  //if you have for example: Light Arms/Large Weapon/Rifle Loader + Special Ammo Finder you don't need Kinetic Weapon Loader + Special Ammo Finder
  genericTypeEquivalents: {
    'Kinetic Weapon': {
      Helmet: ['Precision Weapon', 'Scatter Projectile'],
      Gauntlets: ['Rifle', 'Light Arms', 'Large Weapon'],
      'Chest Armor': ['Rifle', 'Light Arms'],
      Boots: ['Rifle', 'Light Arms', 'Oversize Weapon']
    },
    'Energy Weapon': {
      Helmet: ['Precision Weapon', 'Scatter Projectile'],
      Gauntlets: ['Rifle', 'Light Arms', 'Large Weapon'],
      'Chest Armor': ['Rifle', 'Light Arms'],
      Boots: ['Rifle', 'Light Arms', 'Oversize Weapon']
    },
    'Power Weapon': {
      Helmet: ['Precision Weapon'],
      Gauntlets: ['Rifle', 'Large Weapon'],
      'Chest Armor': ['Rifle'],
      Boots: ['Rifle', 'Oversize Weapon']
    }
  },
  // these use the term 'slightly' which indicates it's less effective than the fast generic versions as well as the specific weapon version
  genericTypeNames: {
    // this applies to chests only
    'Large Arms': ['Rocket Launcher', 'Grenade Launcher', 'Shotgun', 'Machine Gun'],
    'Kinetic Weapon': [
      'Scout Rifle', // Rifle
      'Auto Rifle', // Rifle
      'Pulse Rifle', // Rifle
      'Sniper Rifle', // Rifle
      'Shotgun', //Large Arms
      'Grenade Launcher', //Large Arms
      'Bow', //Light Arms
      'Hand Cannon', // Light Arms
      'Submachine Gun', // Light Arms
      'Sidearm' // Light Arms
    ],
    'Energy Weapon': [
      'Scout Rifle', // Rifle
      'Auto Rifle', // Rifle
      'Pulse Rifle', // Rifle
      'Sniper Rifle', // Rifle
      'Fusion Rifle', // Rifle
      'Shotgun', // Large Arms
      'Grenade Launcher', // Large Arms
      'Bow', //Light Arms
      'Hand Cannon', // Light Arms
      'Submachine Gun', // Light Arms
      'Sidearm' // Light Arms
    ],
    'Power Weapon': [
      'Sword',
      'Rocket Launcher', // Large Arms
      'Grenade Launcher', // Large Arms
      'Machine Gun', // Large Arms
      'Shotgun', // Large Arms
      'Linear Fusion Rifle', // Rifle
      'Sniper Rifle' //Rifle
    ]
  }
};
