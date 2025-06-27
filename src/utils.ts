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