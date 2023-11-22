import { expect, test } from 'vitest'

import * as chains from './index.js'

test('exports chains', () => {
  expect(Object.keys(chains)).toMatchInlineSnapshot(`
    [
      "arbitrum",
      "arbitrumGoerli",
      "arbitrumNova",
      "astar",
      "arbitrumSepolia",
      "astarZkatana",
      "aurora",
      "auroraTestnet",
      "avalanche",
      "avalancheFuji",
      "base",
      "baseGoerli",
      "baseSepolia",
      "bearNetworkChainMainnet",
      "bearNetworkChainTestnet",
      "boba",
      "bronos",
      "bronosTestnet",
      "bsc",
      "bscTestnet",
      "bxn",
      "bxnTestnet",
      "canto",
      "celo",
      "celoAlfajores",
      "chiliz",
      "celoCannoli",
      "classic",
      "confluxESpace",
      "coreDao",
      "cronos",
      "cronosTestnet",
      "crossbell",
      "dfk",
      "dogechain",
      "edgeware",
      "edgewareTestnet",
      "eos",
      "eosTestnet",
      "evmos",
      "evmosTestnet",
      "ekta",
      "ektaTestnet",
      "fantom",
      "fantomTestnet",
      "fibo",
      "filecoin",
      "filecoinCalibration",
      "filecoinHyperspace",
      "flare",
      "flareTestnet",
      "foundry",
      "fuse",
      "fuseSparknet",
      "iotex",
      "iotexTestnet",
      "gobi",
      "goerli",
      "gnosis",
      "gnosisChiado",
      "hardhat",
      "harmonyOne",
      "haqqMainnet",
      "haqqTestedge2",
      "holesky",
      "kava",
      "kavaTestnet",
      "klaytn",
      "klaytnBaobab",
      "kroma",
      "kromaSepolia",
      "linea",
      "lineaTestnet",
      "localhost",
      "lukso",
      "mainnet",
      "manta",
      "mantaTestnet",
      "mantle",
      "mantleTestnet",
      "meter",
      "meterTestnet",
      "metis",
      "metisGoerli",
      "mev",
      "mevTestnet",
      "modeTestnet",
      "moonbaseAlpha",
      "moonbeam",
      "moonbeamDev",
      "moonriver",
      "neonDevnet",
      "neonMainnet",
      "nexi",
      "nexilix",
      "oasys",
      "okc",
      "optimism",
      "optimismGoerli",
      "optimismSepolia",
      "opBNB",
      "opBNBTestnet",
      "plinga",
      "polygon",
      "polygonMumbai",
      "polygonZkEvmTestnet",
      "polygonZkEvm",
      "pulsechain",
      "pulsechainV4",
      "qMainnet",
      "qTestnet",
      "rollux",
      "rolluxTestnet",
      "ronin",
      "rootstock",
      "saigon",
      "scroll",
      "scrollSepolia",
      "scrollTestnet",
      "sepolia",
      "shimmer",
      "shimmerTestnet",
      "skaleBlockBrawlers",
      "skaleCalypso",
      "skaleCalypsoTestnet",
      "skaleChaosTestnet",
      "skaleCryptoBlades",
      "skaleCryptoColosseum",
      "skaleEuropa",
      "skaleEuropaTestnet",
      "skaleExorde",
      "skaleHumanProtocol",
      "skaleNebula",
      "skaleNebulaTestnet",
      "skaleRazor",
      "skaleTitan",
      "skaleTitanTestnet",
      "songbird",
      "songbirdTestnet",
      "spicy",
      "shardeumSphinx",
      "shibarium",
      "syscoin",
      "syscoinTestnet",
      "taraxa",
      "taikoJolnir",
      "taikoTestnetSepolia",
      "taraxaTestnet",
      "telos",
      "telosTestnet",
      "tenet",
      "thunderTestnet",
      "vechain",
      "wanchain",
      "wanchainTestnet",
      "xdc",
      "xdcTestnet",
      "zhejiang",
      "zkSync",
      "zkSyncTestnet",
      "zetachainAthensTestnet",
      "zora",
      "zoraSepolia",
      "zoraTestnet",
    ]
  `)
})
