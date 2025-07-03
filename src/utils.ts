export const getBlockExplorerUrl = (endpoint: string, blockHeight: number): string => {
  // Extract network prefix from RPC endpoint
  const match = endpoint.match(/https:\/\/(.*?)\.rpc\.agoric\.net/);
  if (match) {
    const networkPrefix = match[1];
    // Special case for mainnet which uses 'followmain' in explorer
    const explorerPrefix = networkPrefix.startsWith('main') ? 'followmain' : networkPrefix;
    return `https://${explorerPrefix}.explorer.agoric.net/agoric/block/${blockHeight}`;
  }
  return '';
};

/**
 * Get the network color based on the API endpoint
 * Each network has a distinctive color to help users identify which network they're using
 */
export const getNetworkColor = (endpoint: string): string => {
  // Extract network identifier from endpoint
  if (endpoint.includes('main-a.rpc.agoric.net')) {
    return '#BB2D40'; // Agoric red for mainnet (production)
  }
  if (endpoint.includes('emerynet.rpc.agoric.net')) {
    return '#2E7D32'; // Green for emerynet (emerald)
  }
  if (endpoint.includes('devnet.rpc.agoric.net')) {
    return '#F57C00'; // Orange for devnet (development)
  }
  if (endpoint.includes('xnet.rpc.agoric.net')) {
    return '#1976D2'; // Blue for xnet
  }
  if (endpoint.includes('ollinet.rpc.agoric.net')) {
    return '#D32F2F'; // Red for ollinet
  }
  if (endpoint.includes('localhost')) {
    return '#616161'; // Gray for localhost
  }
  
  // Default fallback color
  return '#BB2D40';
};