import { FilterEnum } from './filter';

export type Order = {
  id: String;
  patrimony: String;
  when: String;
  status: FilterEnum;
};
