import * as featureUser from '../user';

export type Model = {
  count: number;
  randomFiveLikers: featureUser.Model[];
  liked: boolean;
}
