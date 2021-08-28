import { IBranch } from './branch';

export interface ITreeElement {
  open: boolean
  items: IBranch[]
}

export interface ITree {
  [key: string]: ITreeElement
}
