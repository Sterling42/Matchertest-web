import React, { useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, GetProgramAccountsFilter, ParsedAccountData } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import styles from '../styles/Profile.module.css';

export interface TokenData {
  address: string;
  logoURI: string;
  symbol: string;
}

const Tokens: React.FC = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [tokens, setTokens] = useState<{ balance: number, info: TokenData }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTokens = async () => {
      if (publicKey) {
        try {
          const filters: GetProgramAccountsFilter[] = [
            { dataSize: 165 },
            { memcmp: { offset: 32, bytes: publicKey.toBase58() } },
          ];

          const tokenAccounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, { filters });
          const mintAddresses = tokenAccounts.map(accountInfo => {
            const accountData = accountInfo.account.data;
            if ('parsed' in accountData) {
              return (accountData as ParsedAccountData).parsed.info.mint;
            }
            return null;
          }).filter(mintAddress => mintAddress !== null) as string[];

          if (mintAddresses.length > 0) {
            const response = await fetch('/api/tokens', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ mintAddresses }),
            });
            const tokenData: TokenData[] = await response.json();

            const fetchedTokens = tokenAccounts.map((accountInfo, index) => {
              const accountData = accountInfo.account.data;
              let tokenBalance = 0;
              if ('parsed' in accountData) {
                tokenBalance = accountData.parsed.info.tokenAmount.uiAmount;
              }
              const mintAddress = mintAddresses[index];
              const tokenInfo = tokenData.find(token => token.address === mintAddress);
              if (tokenBalance > 0 && tokenInfo) {
                return { balance: tokenBalance, info: tokenInfo };
              }
              return null;
            }).filter(token => token !== null) as { balance: number, info: TokenData }[];

            setTokens(fetchedTokens);
          }
        } catch (error) {
          console.error('Error fetching tokens:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [publicKey, connection]);

  return (
    <div className={styles.TokenList}>
      <h3>Tokens:</h3>
      {loading ? (
        <div>Loading tokens...</div>
      ) : tokens.length > 0 ? (
        <div className={styles.TokenGrid}>
          {tokens.map((token, index) => (
            <div key={index} className={styles.TokenListItem}>
              {token.info.logoURI ? (
                <img
                  src={token.info.logoURI}
                  alt={token.info.symbol}
                  className={styles.TokenImage}
                  title={`${token.balance} ${token.info.symbol}`}
                />
              ) : (
                <div className={styles.EmptyTokenImage} title={`${token.balance} ${token.info.symbol}`}>
                  ?
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No tokens found</div>
      )}
    </div>
  );
};

export default Tokens;