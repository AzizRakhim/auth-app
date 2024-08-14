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
