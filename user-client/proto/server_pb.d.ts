import * as jspb from 'google-protobuf'



export class Address extends jspb.Message {
  getId(): string;
  setId(value: string): Address;

  getSavedas(): string;
  setSavedas(value: string): Address;

  getOthername(): string;
  setOthername(value: string): Address;

  getHouseaddress(): string;
  setHouseaddress(value: string): Address;

  getArea(): string;
  setArea(value: string): Address;

  getLandmark(): string;
  setLandmark(value: string): Address;

  getUserid(): string;
  setUserid(value: string): Address;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Address.AsObject;
  static toObject(includeInstance: boolean, msg: Address): Address.AsObject;
  static serializeBinaryToWriter(message: Address, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Address;
  static deserializeBinaryFromReader(message: Address, reader: jspb.BinaryReader): Address;
}

export namespace Address {
  export type AsObject = {
    id: string,
    savedas: string,
    othername: string,
    houseaddress: string,
    area: string,
    landmark: string,
    userid: string,
  }
}

export class Shop extends jspb.Message {
  getId(): string;
  setId(value: string): Shop;

  getName(): string;
  setName(value: string): Shop;

  getLocality(): string;
  setLocality(value: string): Shop;

  getTypesList(): Array<string>;
  setTypesList(value: Array<string>): Shop;
  clearTypesList(): Shop;
  addTypes(value: string, index?: number): Shop;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Shop.AsObject;
  static toObject(includeInstance: boolean, msg: Shop): Shop.AsObject;
  static serializeBinaryToWriter(message: Shop, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Shop;
  static deserializeBinaryFromReader(message: Shop, reader: jspb.BinaryReader): Shop;
}

export namespace Shop {
  export type AsObject = {
    id: string,
    name: string,
    locality: string,
    typesList: Array<string>,
  }
}

export class MenuItem extends jspb.Message {
  getId(): string;
  setId(value: string): MenuItem;

  getName(): string;
  setName(value: string): MenuItem;

  getPrice(): number;
  setPrice(value: number): MenuItem;

  getCategory(): string;
  setCategory(value: string): MenuItem;

  getBestseller(): boolean;
  setBestseller(value: boolean): MenuItem;

  getWeight(): number;
  setWeight(value: number): MenuItem;

  getShopid(): string;
  setShopid(value: string): MenuItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MenuItem.AsObject;
  static toObject(includeInstance: boolean, msg: MenuItem): MenuItem.AsObject;
  static serializeBinaryToWriter(message: MenuItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MenuItem;
  static deserializeBinaryFromReader(message: MenuItem, reader: jspb.BinaryReader): MenuItem;
}

export namespace MenuItem {
  export type AsObject = {
    id: string,
    name: string,
    price: number,
    category: string,
    bestseller: boolean,
    weight: number,
    shopid: string,
  }
}

export class Order extends jspb.Message {
  getTotalprice(): number;
  setTotalprice(value: number): Order;

  getShopid(): string;
  setShopid(value: string): Order;

  getDeliveryrating(): number;
  setDeliveryrating(value: number): Order;

  getFoodrating(): number;
  setFoodrating(value: number): Order;

  getOrderdetails(): string;
  setOrderdetails(value: string): Order;

  getUserid(): string;
  setUserid(value: string): Order;

  getStatus(): string;
  setStatus(value: string): Order;

  getTotalweight(): number;
  setTotalweight(value: number): Order;

  getAddressid(): string;
  setAddressid(value: string): Order;

  getId(): string;
  setId(value: string): Order;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Order.AsObject;
  static toObject(includeInstance: boolean, msg: Order): Order.AsObject;
  static serializeBinaryToWriter(message: Order, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Order;
  static deserializeBinaryFromReader(message: Order, reader: jspb.BinaryReader): Order;
}

export namespace Order {
  export type AsObject = {
    totalprice: number,
    shopid: string,
    deliveryrating: number,
    foodrating: number,
    orderdetails: string,
    userid: string,
    status: string,
    totalweight: number,
    addressid: string,
    id: string,
  }
}

export class PreviousOrderDetails extends jspb.Message {
  getOrderinfo(): Order | undefined;
  setOrderinfo(value?: Order): PreviousOrderDetails;
  hasOrderinfo(): boolean;
  clearOrderinfo(): PreviousOrderDetails;

  getShopinfo(): Shop | undefined;
  setShopinfo(value?: Shop): PreviousOrderDetails;
  hasShopinfo(): boolean;
  clearShopinfo(): PreviousOrderDetails;

  getItemsinfoList(): Array<MenuItem>;
  setItemsinfoList(value: Array<MenuItem>): PreviousOrderDetails;
  clearItemsinfoList(): PreviousOrderDetails;
  addItemsinfo(value?: MenuItem, index?: number): MenuItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PreviousOrderDetails.AsObject;
  static toObject(includeInstance: boolean, msg: PreviousOrderDetails): PreviousOrderDetails.AsObject;
  static serializeBinaryToWriter(message: PreviousOrderDetails, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PreviousOrderDetails;
  static deserializeBinaryFromReader(message: PreviousOrderDetails, reader: jspb.BinaryReader): PreviousOrderDetails;
}

export namespace PreviousOrderDetails {
  export type AsObject = {
    orderinfo?: Order.AsObject,
    shopinfo?: Shop.AsObject,
    itemsinfoList: Array<MenuItem.AsObject>,
  }
}

export class RegisterUserRequest extends jspb.Message {
  getMobile(): string;
  setMobile(value: string): RegisterUserRequest;

  getName(): string;
  setName(value: string): RegisterUserRequest;

  getFirebaseId(): string;
  setFirebaseId(value: string): RegisterUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterUserRequest): RegisterUserRequest.AsObject;
  static serializeBinaryToWriter(message: RegisterUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterUserRequest;
  static deserializeBinaryFromReader(message: RegisterUserRequest, reader: jspb.BinaryReader): RegisterUserRequest;
}

export namespace RegisterUserRequest {
  export type AsObject = {
    mobile: string,
    name: string,
    firebaseId: string,
  }
}

export class RegisterUserResponse extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): RegisterUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterUserResponse): RegisterUserResponse.AsObject;
  static serializeBinaryToWriter(message: RegisterUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterUserResponse;
  static deserializeBinaryFromReader(message: RegisterUserResponse, reader: jspb.BinaryReader): RegisterUserResponse;
}

export namespace RegisterUserResponse {
  export type AsObject = {
    status: string,
  }
}

export class GetUserDetailsRequest extends jspb.Message {
  getFirebaseId(): string;
  setFirebaseId(value: string): GetUserDetailsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserDetailsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserDetailsRequest): GetUserDetailsRequest.AsObject;
  static serializeBinaryToWriter(message: GetUserDetailsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserDetailsRequest;
  static deserializeBinaryFromReader(message: GetUserDetailsRequest, reader: jspb.BinaryReader): GetUserDetailsRequest;
}

export namespace GetUserDetailsRequest {
  export type AsObject = {
    firebaseId: string,
  }
}

export class GetUserDetailsResponse extends jspb.Message {
  getId(): string;
  setId(value: string): GetUserDetailsResponse;

  getName(): string;
  setName(value: string): GetUserDetailsResponse;

  getMobile(): string;
  setMobile(value: string): GetUserDetailsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserDetailsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserDetailsResponse): GetUserDetailsResponse.AsObject;
  static serializeBinaryToWriter(message: GetUserDetailsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserDetailsResponse;
  static deserializeBinaryFromReader(message: GetUserDetailsResponse, reader: jspb.BinaryReader): GetUserDetailsResponse;
}

export namespace GetUserDetailsResponse {
  export type AsObject = {
    id: string,
    name: string,
    mobile: string,
  }
}

export class UpdateUserDetailsRequest extends jspb.Message {
  getId(): string;
  setId(value: string): UpdateUserDetailsRequest;

  getName(): string;
  setName(value: string): UpdateUserDetailsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUserDetailsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUserDetailsRequest): UpdateUserDetailsRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateUserDetailsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUserDetailsRequest;
  static deserializeBinaryFromReader(message: UpdateUserDetailsRequest, reader: jspb.BinaryReader): UpdateUserDetailsRequest;
}

export namespace UpdateUserDetailsRequest {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class UpdateUserDetailsResponse extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): UpdateUserDetailsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUserDetailsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUserDetailsResponse): UpdateUserDetailsResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateUserDetailsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUserDetailsResponse;
  static deserializeBinaryFromReader(message: UpdateUserDetailsResponse, reader: jspb.BinaryReader): UpdateUserDetailsResponse;
}

export namespace UpdateUserDetailsResponse {
  export type AsObject = {
    status: string,
  }
}

export class GetUserAddressRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): GetUserAddressRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserAddressRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserAddressRequest): GetUserAddressRequest.AsObject;
  static serializeBinaryToWriter(message: GetUserAddressRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserAddressRequest;
  static deserializeBinaryFromReader(message: GetUserAddressRequest, reader: jspb.BinaryReader): GetUserAddressRequest;
}

export namespace GetUserAddressRequest {
  export type AsObject = {
    userid: string,
  }
}

export class GetUserAddressResponse extends jspb.Message {
  getAddressList(): Array<Address>;
  setAddressList(value: Array<Address>): GetUserAddressResponse;
  clearAddressList(): GetUserAddressResponse;
  addAddress(value?: Address, index?: number): Address;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserAddressResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserAddressResponse): GetUserAddressResponse.AsObject;
  static serializeBinaryToWriter(message: GetUserAddressResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserAddressResponse;
  static deserializeBinaryFromReader(message: GetUserAddressResponse, reader: jspb.BinaryReader): GetUserAddressResponse;
}

export namespace GetUserAddressResponse {
  export type AsObject = {
    addressList: Array<Address.AsObject>,
  }
}

export class AddNewAddressRequest extends jspb.Message {
  getAddress(): Address | undefined;
  setAddress(value?: Address): AddNewAddressRequest;
  hasAddress(): boolean;
  clearAddress(): AddNewAddressRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddNewAddressRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddNewAddressRequest): AddNewAddressRequest.AsObject;
  static serializeBinaryToWriter(message: AddNewAddressRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddNewAddressRequest;
  static deserializeBinaryFromReader(message: AddNewAddressRequest, reader: jspb.BinaryReader): AddNewAddressRequest;
}

export namespace AddNewAddressRequest {
  export type AsObject = {
    address?: Address.AsObject,
  }
}

export class AddNewAddressResponse extends jspb.Message {
  getAddress(): Address | undefined;
  setAddress(value?: Address): AddNewAddressResponse;
  hasAddress(): boolean;
  clearAddress(): AddNewAddressResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddNewAddressResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddNewAddressResponse): AddNewAddressResponse.AsObject;
  static serializeBinaryToWriter(message: AddNewAddressResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddNewAddressResponse;
  static deserializeBinaryFromReader(message: AddNewAddressResponse, reader: jspb.BinaryReader): AddNewAddressResponse;
}

export namespace AddNewAddressResponse {
  export type AsObject = {
    address?: Address.AsObject,
  }
}

export class UpdateAddressRequest extends jspb.Message {
  getAddress(): Address | undefined;
  setAddress(value?: Address): UpdateAddressRequest;
  hasAddress(): boolean;
  clearAddress(): UpdateAddressRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateAddressRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateAddressRequest): UpdateAddressRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateAddressRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateAddressRequest;
  static deserializeBinaryFromReader(message: UpdateAddressRequest, reader: jspb.BinaryReader): UpdateAddressRequest;
}

export namespace UpdateAddressRequest {
  export type AsObject = {
    address?: Address.AsObject,
  }
}

export class UpdateAddressResponse extends jspb.Message {
  getAddress(): Address | undefined;
  setAddress(value?: Address): UpdateAddressResponse;
  hasAddress(): boolean;
  clearAddress(): UpdateAddressResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateAddressResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateAddressResponse): UpdateAddressResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateAddressResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateAddressResponse;
  static deserializeBinaryFromReader(message: UpdateAddressResponse, reader: jspb.BinaryReader): UpdateAddressResponse;
}

export namespace UpdateAddressResponse {
  export type AsObject = {
    address?: Address.AsObject,
  }
}

export class DeleteAddressRequest extends jspb.Message {
  getAddressid(): string;
  setAddressid(value: string): DeleteAddressRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAddressRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAddressRequest): DeleteAddressRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteAddressRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAddressRequest;
  static deserializeBinaryFromReader(message: DeleteAddressRequest, reader: jspb.BinaryReader): DeleteAddressRequest;
}

export namespace DeleteAddressRequest {
  export type AsObject = {
    addressid: string,
  }
}

export class DeleteAddressResponse extends jspb.Message {
  getStatus(): string;
  setStatus(value: string): DeleteAddressResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteAddressResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteAddressResponse): DeleteAddressResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteAddressResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteAddressResponse;
  static deserializeBinaryFromReader(message: DeleteAddressResponse, reader: jspb.BinaryReader): DeleteAddressResponse;
}

export namespace DeleteAddressResponse {
  export type AsObject = {
    status: string,
  }
}

export class GetShopListRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetShopListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetShopListRequest): GetShopListRequest.AsObject;
  static serializeBinaryToWriter(message: GetShopListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetShopListRequest;
  static deserializeBinaryFromReader(message: GetShopListRequest, reader: jspb.BinaryReader): GetShopListRequest;
}

export namespace GetShopListRequest {
  export type AsObject = {
  }
}

export class GetShopListResponse extends jspb.Message {
  getShopsList(): Array<Shop>;
  setShopsList(value: Array<Shop>): GetShopListResponse;
  clearShopsList(): GetShopListResponse;
  addShops(value?: Shop, index?: number): Shop;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetShopListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetShopListResponse): GetShopListResponse.AsObject;
  static serializeBinaryToWriter(message: GetShopListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetShopListResponse;
  static deserializeBinaryFromReader(message: GetShopListResponse, reader: jspb.BinaryReader): GetShopListResponse;
}

export namespace GetShopListResponse {
  export type AsObject = {
    shopsList: Array<Shop.AsObject>,
  }
}

export class GetShopInfoRequest extends jspb.Message {
  getShopid(): string;
  setShopid(value: string): GetShopInfoRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetShopInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetShopInfoRequest): GetShopInfoRequest.AsObject;
  static serializeBinaryToWriter(message: GetShopInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetShopInfoRequest;
  static deserializeBinaryFromReader(message: GetShopInfoRequest, reader: jspb.BinaryReader): GetShopInfoRequest;
}

export namespace GetShopInfoRequest {
  export type AsObject = {
    shopid: string,
  }
}

export class GetShopInfoResponse extends jspb.Message {
  getShop(): Shop | undefined;
  setShop(value?: Shop): GetShopInfoResponse;
  hasShop(): boolean;
  clearShop(): GetShopInfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetShopInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetShopInfoResponse): GetShopInfoResponse.AsObject;
  static serializeBinaryToWriter(message: GetShopInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetShopInfoResponse;
  static deserializeBinaryFromReader(message: GetShopInfoResponse, reader: jspb.BinaryReader): GetShopInfoResponse;
}

export namespace GetShopInfoResponse {
  export type AsObject = {
    shop?: Shop.AsObject,
  }
}

export class GetShopMenuRequest extends jspb.Message {
  getShopid(): string;
  setShopid(value: string): GetShopMenuRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetShopMenuRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetShopMenuRequest): GetShopMenuRequest.AsObject;
  static serializeBinaryToWriter(message: GetShopMenuRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetShopMenuRequest;
  static deserializeBinaryFromReader(message: GetShopMenuRequest, reader: jspb.BinaryReader): GetShopMenuRequest;
}

export namespace GetShopMenuRequest {
  export type AsObject = {
    shopid: string,
  }
}

export class GetShopMenuResponse extends jspb.Message {
  getMenuList(): Array<MenuItem>;
  setMenuList(value: Array<MenuItem>): GetShopMenuResponse;
  clearMenuList(): GetShopMenuResponse;
  addMenu(value?: MenuItem, index?: number): MenuItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetShopMenuResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetShopMenuResponse): GetShopMenuResponse.AsObject;
  static serializeBinaryToWriter(message: GetShopMenuResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetShopMenuResponse;
  static deserializeBinaryFromReader(message: GetShopMenuResponse, reader: jspb.BinaryReader): GetShopMenuResponse;
}

export namespace GetShopMenuResponse {
  export type AsObject = {
    menuList: Array<MenuItem.AsObject>,
  }
}

export class CreateNewOrderRequest extends jspb.Message {
  getOrder(): Order | undefined;
  setOrder(value?: Order): CreateNewOrderRequest;
  hasOrder(): boolean;
  clearOrder(): CreateNewOrderRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateNewOrderRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateNewOrderRequest): CreateNewOrderRequest.AsObject;
  static serializeBinaryToWriter(message: CreateNewOrderRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateNewOrderRequest;
  static deserializeBinaryFromReader(message: CreateNewOrderRequest, reader: jspb.BinaryReader): CreateNewOrderRequest;
}

export namespace CreateNewOrderRequest {
  export type AsObject = {
    order?: Order.AsObject,
  }
}

export class CreateNewOrderResponse extends jspb.Message {
  getOrder(): Order | undefined;
  setOrder(value?: Order): CreateNewOrderResponse;
  hasOrder(): boolean;
  clearOrder(): CreateNewOrderResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateNewOrderResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateNewOrderResponse): CreateNewOrderResponse.AsObject;
  static serializeBinaryToWriter(message: CreateNewOrderResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateNewOrderResponse;
  static deserializeBinaryFromReader(message: CreateNewOrderResponse, reader: jspb.BinaryReader): CreateNewOrderResponse;
}

export namespace CreateNewOrderResponse {
  export type AsObject = {
    order?: Order.AsObject,
  }
}

export class GetPreviousOrdersRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): GetPreviousOrdersRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPreviousOrdersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPreviousOrdersRequest): GetPreviousOrdersRequest.AsObject;
  static serializeBinaryToWriter(message: GetPreviousOrdersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPreviousOrdersRequest;
  static deserializeBinaryFromReader(message: GetPreviousOrdersRequest, reader: jspb.BinaryReader): GetPreviousOrdersRequest;
}

export namespace GetPreviousOrdersRequest {
  export type AsObject = {
    userid: string,
  }
}

export class GetPreviousOrdersResponse extends jspb.Message {
  getOrdersList(): Array<PreviousOrderDetails>;
  setOrdersList(value: Array<PreviousOrderDetails>): GetPreviousOrdersResponse;
  clearOrdersList(): GetPreviousOrdersResponse;
  addOrders(value?: PreviousOrderDetails, index?: number): PreviousOrderDetails;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPreviousOrdersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetPreviousOrdersResponse): GetPreviousOrdersResponse.AsObject;
  static serializeBinaryToWriter(message: GetPreviousOrdersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPreviousOrdersResponse;
  static deserializeBinaryFromReader(message: GetPreviousOrdersResponse, reader: jspb.BinaryReader): GetPreviousOrdersResponse;
}

export namespace GetPreviousOrdersResponse {
  export type AsObject = {
    ordersList: Array<PreviousOrderDetails.AsObject>,
  }
}

export class UpdateOrderRequest extends jspb.Message {
  getOrder(): Order | undefined;
  setOrder(value?: Order): UpdateOrderRequest;
  hasOrder(): boolean;
  clearOrder(): UpdateOrderRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateOrderRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateOrderRequest): UpdateOrderRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateOrderRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateOrderRequest;
  static deserializeBinaryFromReader(message: UpdateOrderRequest, reader: jspb.BinaryReader): UpdateOrderRequest;
}

export namespace UpdateOrderRequest {
  export type AsObject = {
    order?: Order.AsObject,
  }
}

export class UpdateOrderResponse extends jspb.Message {
  getOrder(): Order | undefined;
  setOrder(value?: Order): UpdateOrderResponse;
  hasOrder(): boolean;
  clearOrder(): UpdateOrderResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateOrderResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateOrderResponse): UpdateOrderResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateOrderResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateOrderResponse;
  static deserializeBinaryFromReader(message: UpdateOrderResponse, reader: jspb.BinaryReader): UpdateOrderResponse;
}

export namespace UpdateOrderResponse {
  export type AsObject = {
    order?: Order.AsObject,
  }
}

