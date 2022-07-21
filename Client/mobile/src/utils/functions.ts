import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { format } from 'date-fns';

export const dateFormat = (timestamp: FirebaseFirestoreTypes.Timestamp) => {
  if (timestamp) {
    return format(timestamp.toDate(), "dd/MM/yy 'às' HH:mm:ss");
  }
};
