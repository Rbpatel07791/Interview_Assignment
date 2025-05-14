import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Addresses, Address, Args, AddressInput, MutationResponse } from "./types";
import { logger, LogLevel } from "../../utils";
import { GraphQLError } from "graphql";

const DATA_PATH = path.join(__dirname, "../../../data/addresses.json");

const getAddresses = (): Addresses => {
  try {
    const data = readFileSync(DATA_PATH, 'utf-8');
    const addresses = JSON.parse(data);

    // Ensure each address has a "state" field for backward compatibility
    Object.keys(addresses).forEach(username => {
      addresses[username] = {
        street: addresses[username].street || '',
        city: addresses[username].city || '',
        state: addresses[username].state || '',
        zipcode: addresses[username].zipcode || ''
      };
    });

    return addresses;
  } catch (error) {
    logger(LogLevel.ERROR, "getAddresses", "Failed to read addresses");
    throw new GraphQLError("Failed to read address data");
  }
};

export const getAddress = (_: any, args: Args): Address => {
  logger(LogLevel.INFO, "getAddress", `Looking up address for ${args.username}`);
  
  const addresses = getAddresses();
  const address = addresses[args.username];

  if (!address) {
    logger(LogLevel.ERROR, "getAddress", `No address found for ${args.username}`);
    throw new GraphQLError("No address found");
  }

  return address;
};

export const createAddress = (
  _: any,
  { username, address }: { username: string; address: AddressInput }
): MutationResponse => {
  logger(LogLevel.INFO, "createAddress", `Creating address for ${username}`);

  const addresses = getAddresses();

  if (addresses[username]) {
    logger(LogLevel.WARN, "createAddress", `Address exists for ${username}`);
    return {
      success: false,
      message: "Address already exists for this user"
    };
  }

  try {
    const newAddress: Address = {
      street: address.street || '',
      city: address.city || '',
      state: address.state || '',
      zipcode: address.zipcode || ''
    };

    writeFileSync(
      DATA_PATH,
      JSON.stringify({ ...addresses, [username]: newAddress }, null, 2)
    );

    logger(LogLevel.INFO, "createAddress", `Address created for ${username}`);
    return {
      success: true,
      message: "Address created successfully"
    };
  } catch (error) {
    logger(LogLevel.ERROR, "createAddress", `Failed to create address: ${error}`);
    return {
      success: false,
      message: "Failed to create address"
    };
  }
};
