import {BtnAction} from '../enum/BtnAction.ts';

export interface TableButtonsProps {
  readonly callback: (action: BtnAction) => void;
}
