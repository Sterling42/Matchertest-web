export interface User {
  wallet: string;
  username: string;
  pp: boolean;
  ts: boolean;
  swipes: number;
  totalSwipes: number;
  profile: {
    username: any;
    xp: number;
    rxp: number;
    achievements: { [key: string]: boolean };
  };
  opinions: {
    tendencies: { [key: string]: number };
  };
}