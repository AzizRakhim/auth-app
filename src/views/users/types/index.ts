export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  name: NameType;
  address: AddressType;
  phone: string;
}

type NameType = {
  firstname: string;
  lastname: string;
};

type AddressType = {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: GeolocationType;
};

type GeolocationType = {
  lat: string;
  long: string;
};

export type UserFormType = Omit<IUser, "phone"> & {
  phone: {
    countryCode: number;
    areaCode: string;
    phoneNumber: string;
    isoCode: string;
  };
  confirm: string;
};
