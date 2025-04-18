// config.js
// config.ts

// Define an interface for the structure of each endpoint object
interface ApiEndpoint {
  label: string;
  value: string;
}

// Apply the interface as the type for the array
const apiEndpoints: ApiEndpoint[] = [
  { label: 'Mainnet', value: 'https://main-a.rpc.agoric.net:443' },
  { label: 'Emerynet', value: 'https://emerynet.rpc.agoric.net:443' },
  { label: 'Devnet', value: 'https://devnet.rpc.agoric.net:443' },
  { label: 'Xnet', value: 'https://xnet.rpc.agoric.net:443' },
  { label: 'Ollinet', value: 'https://ollinet.rpc.agoric.net:443' },
  { label: 'Localhost', value: 'http://localhost:26657' },
];

export default apiEndpoints;
