import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins';
import { mainnet } from 'wagmi/chains'
import "dotenv/config"

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_KEY!,
      chainId: mainnet.id,
      contracts: [
        {
          name: 'BokiPets',
          address: {
            [mainnet.id]: process.env.VITE_APP_CONTRACT_ADDRESS! as `0x${string}`,
          },
        },
      ],
    }),
    react(),
  ],
});
