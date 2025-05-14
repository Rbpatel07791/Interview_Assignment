import { getAddress, createAddress } from "./address/address";
import { Address, Args, AddressInput } from "./address/types";

export const resolvers = {
  Query: {
    address: (parent: any, args: Args): Address => {
      return getAddress(parent, args);
    },
  },
  Mutation: {
    createAddress: (
      parent: any,
      args: { username: string; address: AddressInput }
    ) => {
      return createAddress(parent, args);
    },
  },
};
