import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FilterEnum } from '../../@types/filter';

export type Order = {
  id: string;
  patrimony: string;
  description: string;
  status: FilterEnum;
  solution?: string;
  when?: string;
  created_At: FirebaseFirestoreTypes.Timestamp;
  closed_At?: FirebaseFirestoreTypes.Timestamp;
};
