export interface User {
  wallet: string;
  username: string;
  pp: boolean;
  ts: boolean;
  swipes: number;
  totalSwipes: number;
  profile: {
    xp: number;
    rxp: number;
    achievements: { [key: string]: boolean };
  };
  opinions: {
    tendencies: { [key: string]: number };
  };
}