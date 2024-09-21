import React, { useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, GetProgramAccountsFilter, ParsedAccountData } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import styles from '../styles/Profile.module.css';
import tokenData from './tokens.json'; // Import the tokens.json file

interface TokenData {
  address: string;
  created_at: string;
  daily_volume: number | null;
  decimals: number;
  extensions: Record<string, any>;
  freeze_authority: string | null;
  logoURI: string;
  mint_authority: string | null;
  minted_at: string | null;
  name: string;
  permanent_delegate: string | null;
  symbol: string;
  tags: string[];
}

interface TokenInfo {
  name: string;
  symbol: string;
  mintAddress: string;
  decimals: number;
  logoUrl: string;
  verified: boolean;
}

const Profile: React.FC = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [tokens, setTokens] = useState<{ balance: number, info: TokenInfo }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tokenMap, setTokenMap] = useState<Record<string, TokenInfo>>({});

  useEffect(() => {
    // Create a token map from the JSON file
    const tokenMap = (tokenData as TokenData[]).reduce((map: Record<string, TokenInfo>, item: TokenData) => {
      map[item.address] = {
        name: item.name,
        symbol: item.symbol,
        mintAddress: item.address,
        decimals: item.decimals,
        logoUrl: item.logoURI,
        verified: item.tags && item.tags.includes('verified'),
      };
      return map;
    }, {});
    console.log('Token map:', tokenMap); // Debugging statement
    setTokenMap(tokenMap);
  }, []);

  useEffect(() => {
    const fetchTokens = async () => {
      if (publicKey) {
        try {
          console.log('Fetching tokens for publicKey:', publicKey.toBase58());

          // Verify connection by fetching wallet balance
          const balance = await connection.getBalance(publicKey);
          console.log('Wallet balance:', balance);

          const filters: GetProgramAccountsFilter[] = [
            {
              dataSize: 165, // size of token account
            },
            {
              memcmp: {
                offset: 32, // location of the owner public key
                bytes: publicKey.toBase58(), // base58 encoded string of the public key
              },
            },
          ];

          const tokenAccounts = await connection.getParsedProgramAccounts(
            TOKEN_PROGRAM_ID,
            { filters: filters }
          );

          console.log('Token accounts fetched:', tokenAccounts);

          const mintAddresses = tokenAccounts.map(accountInfo => {
            const accountData = accountInfo.account.data;
            if ('parsed' in accountData) {
              const parsedInfo = (accountData as ParsedAccountData).parsed.info;
              return parsedInfo.mint;
            }
            return null;
          }).filter(mintAddress => mintAddress !== null) as string[];

          console.log('Mint addresses:', mintAddresses);

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
                console.log(`Token found: ${tokenBalance} ${tokenInfo.symbol}`); // Debugging statement
                return { balance: tokenBalance, info: tokenInfo };
              }
            }
            return null;
          }).filter(token => token !== null) as { balance: number, info: TokenInfo }[];

          console.log('Fetched tokens:', fetchedTokens);

          setTokens(fetchedTokens);
        } catch (error) {
          console.error('Error fetching tokens:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('No public key found');
        setLoading(false);
      }
    };

    fetchTokens();
  }, [publicKey, connection, tokenMap]);

  return (
    <div className={styles.Profile}>
      <div className={styles.ProfileHeader}>Profile Page</div>
      <div className={styles.ProfileContainer}>
        <div className={styles.ProfileInfo}>
          <div
            className={styles.ProfilePicture}
            style={{ backgroundImage: 'url(/path/to/profile-picture.jpg)' }}
          ></div>
          <div className={styles.LevelXPBar}>
            <div className={styles.Level}>Level: 10</div>
            <div className={styles.XPBar}>
              <div className={styles.XPBarFill} style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default Profile;