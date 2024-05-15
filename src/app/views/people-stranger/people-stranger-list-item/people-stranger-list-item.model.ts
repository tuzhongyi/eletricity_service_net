import { Stranger } from 'src/app/models/stranger.model';

export class StrangerModel extends Stranger {
  FacePicture?: string;
  FacePictureError = false;
}
export interface PeopleStrangerListItemOperable {
  close?: boolean;
  record?: boolean;
  enabled?: boolean;
}
