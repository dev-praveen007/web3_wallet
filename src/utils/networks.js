

export const networks = {
    ETH: {
        id: 11155111,
        network: 'ETH',
        name: 'sepolia',
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        rpc: 'https://sepolia.infura.io/v3/50c7d1be83794ae0a3e74eab40b74373',
        blockExplorer: 'https://sepolia.etherscan.io',
    },
    BNB: {
        id: 97,
        network: 'BNB',
        name: 'Binance',
        nativeCurrency: { name: 'Binance', symbol: 'BNB', decimals: 18 },
        rpc: 'https://bsc-testnet-rpc.publicnode.com',
        blockExplorer: 'https://testnet.bscscan.com',
    },
    MATIC: {
        id: 80002,
        network: 'MATIC',
        name: 'Ploygon',
        nativeCurrency: { name: 'Polygon', symbol: 'MATIC', decimals: 18 },
        rpc: 'https://rpc-amoy.polygon.technology',
        blockExplorer: 'https://testnet.bscscan.com',
    },
}