import { defineConfig } from '@wagmi/cli'
import { actions, etherscan, react } from '@wagmi/cli/plugins';
import { goerli } from 'wagmi/chains'
import "dotenv/config"

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_KEY!,
      chainId: goerli.id,
      contracts: [
        {
          name: 'BokiPets',
          address: {
            [goerli.id]: process.env.VITE_APP_CONTRACT_ADDRESS! as `0x${string}`,
          },
        },
      ],
    }),
    react(),
    actions({
      readContract: true,
    }),
  ],
});
