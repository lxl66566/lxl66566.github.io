import { TwoScoreItemType } from "./types";

export interface ComicItemType extends TwoScoreItemType {
  id: string;
  order?: number;
  info?: string;
  otherlink?: string;
  bak?: string;
}
