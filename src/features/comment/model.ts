import * as featureUser from "../user";
import * as featureLike from '../like';

export type Model = {
  id: string;
  author: featureUser.Model;
  message: string;
  likes: featureLike.Model;
  createdAt: string;
};

