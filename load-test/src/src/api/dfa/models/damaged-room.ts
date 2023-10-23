/* tslint:disable */
/* eslint-disable */
import { RoomType } from './room-type';

/**
 * Damaged Room
 */
export interface DamagedRoom {
  applicationId?: string;
  deleteFlag?: boolean;
  description?: string;
  id?: null | string;
  otherRoomType?: null | string;
  roomType?: RoomType;
}
