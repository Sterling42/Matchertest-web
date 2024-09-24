import React, { useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, GetProgramAccountsFilter, ParsedAccountData } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import styles from '../styles/Profile.module.css';
import tokenData from './tokens1.json';
import { TokenData, TokenInfo } from '../pages/api/interface/token';

const createTokenMap = (data: TokenData[]): Record<string, TokenInfo> => {
  return data.reduce((map: Record<string, TokenInfo>, item: TokenData) => {
    map[item.address] = {
      symbol: item.symbol,
      mintAddress: item.address,
      logoUrl: item.logoURI,
      verified: false,
    };
    return map;
  }, {});
};

const Tokens: React.FC = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [tokens, setTokens] = useState<{ balance: number, info: TokenInfo }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tokenMap, setTokenMap] = useState<Record<string, TokenInfo>>({});

  useEffect(() => {
    setTokenMap(createTokenMap(tokenData as TokenData[]));
  }, []);

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

          const accountInfos = await connection.getMultipleAccountsInfo(
            mintAddresses.map(address => new PublicKey(address))
          );

          const fetchedTokens = accountInfos.map((accountInfo, index) => {
            if (accountInfo) {
              const mintAddress = mintAddresses[index];
              const tokenInfo = tokenMap[mintAddress];
              const accountData = tokenAccounts[index].account.data;
              let tokenBalance = 0;
              if ('parsed' in accountData) {
                tokenBalance = accountData.parsed.info.tokenAmount.uiAmount;
              }
              if (tokenBalance > 0 && tokenInfo) {
                return { balance: tokenBalance, info: tokenInfo };
              }
            }
            return null;
          }).filter(token => token !== null) as { balance: number, info: TokenInfo }[];

          setTokens(fetchedTokens);
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
  }, [publicKey, connection, tokenMap]);

  return (
    <div className={styles.TokenList}>
      <h3>Tokens:</h3>
      {loading ? (
        <div>Loading tokens...</div>
      ) : tokens.length > 0 ? (
        <div className={styles.TokenGrid}>
          {tokens.map((token, index) => (
            <div key={index} className={styles.TokenListItem}>
              {token.info.logoUrl ? (
                <img
                  src={token.info.logoUrl}
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