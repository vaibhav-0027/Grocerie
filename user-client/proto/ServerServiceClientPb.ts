/**
 * @fileoverview gRPC-Web generated client stub for serverpb
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as server_pb from './server_pb';


export class serverpbClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoRegisterUser = new grpcWeb.MethodDescriptor(
    '/serverpb.serverpb/RegisterUser',
    grpcWeb.MethodType.UNARY,
    server_pb.RegisterUserRequest,
    server_pb.RegisterUserResponse,
    (request: server_pb.RegisterUserRequest) => {
      return request.serializeBinary();
    },
    server_pb.RegisterUserResponse.deserializeBinary
  );

  registerUser(
    request: server_pb.RegisterUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<server_pb.RegisterUserResponse>;

  registerUser(
    request: server_pb.RegisterUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: server_pb.RegisterUserResponse) => void): grpcWeb.ClientReadableStream<server_pb.RegisterUserResponse>;

  registerUser(
    request: server_pb.RegisterUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: server_pb.RegisterUserResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/serverpb.serverpb/RegisterUser',
        request,
        metadata || {},
        this.methodInfoRegisterUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/serverpb.serverpb/RegisterUser',
    request,
    metadata || {},
    this.methodInfoRegisterUser);
  }

  methodInfoGetUserDetails = new grpcWeb.MethodDescriptor(
    '/serverpb.serverpb/GetUserDetails',
    grpcWeb.MethodType.UNARY,
    server_pb.GetUserDetailsRequest,
    server_pb.GetUserDetailsResponse,
    (request: server_pb.GetUserDetailsRequest) => {
      return request.serializeBinary();
    },
    server_pb.GetUserDetailsResponse.deserializeBinary
  );

  getUserDetails(
    request: server_pb.GetUserDetailsRequest,
    metadata: grpcWeb.Metadata | null): Promise<server_pb.GetUserDetailsResponse>;

  getUserDetails(
    request: server_pb.GetUserDetailsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: server_pb.GetUserDetailsResponse) => void): grpcWeb.ClientReadableStream<server_pb.GetUserDetailsResponse>;

  getUserDetails(
    request: server_pb.GetUserDetailsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: server_pb.GetUserDetailsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/serverpb.serverpb/GetUserDetails',
        request,
        metadata || {},
        this.methodInfoGetUserDetails,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/serverpb.serverpb/GetUserDetails',
    request,
    metadata || {},
    this.methodInfoGetUserDetails);
  }

  methodInfoUpdateUserDetails = new grpcWeb.MethodDescriptor(
    '/serverpb.serverpb/UpdateUserDetails',
    grpcWeb.MethodType.UNARY,
    server_pb.UpdateUserDetailsRequest,
    server_pb.UpdateUserDetailsResponse,
    (request: server_pb.UpdateUserDetailsRequest) => {
      return request.serializeBinary();
    },
    server_pb.UpdateUserDetailsResponse.deserializeBinary
  );

  updateUserDetails(
    request: server_pb.UpdateUserDetailsRequest,
    metadata: grpcWeb.Metadata | null): Promise<server_pb.UpdateUserDetailsResponse>;

  updateUserDetails(
    request: server_pb.UpdateUserDetailsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: server_pb.UpdateUserDetailsResponse) => void): grpcWeb.ClientReadableStream<server_pb.UpdateUserDetailsResponse>;

  updateUserDetails(
    request: server_pb.UpdateUserDetailsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: server_pb.UpdateUserDetailsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/serverpb.serverpb/UpdateUserDetails',
        request,
        metadata || {},
        this.methodInfoUpdateUserDetails,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/serverpb.serverpb/UpdateUserDetails',
    request,
    metadata || {},
    this.methodInfoUpdateUserDetails);
  }

  methodInfoGetUserAddress = new grpcWeb.MethodDescriptor(
    '/serverpb.serverpb/GetUserAddress',
    grpcWeb.MethodType.UNARY,
    server_pb.GetUserAddressRequest,
    server_pb.GetUserAddressResponse,
    (request: server_pb.GetUserAddressRequest) => {
      return request.serializeBinary();
    },
    server_pb.GetUserAddressResponse.deserializeBinary
  );

  getUserAddress(
    request: server_pb.GetUserAddressRequest,
    metadata: grpcWeb.Metadata | null): Promise<server_pb.GetUserAddressResponse>;

  getUserAddress(
    request: server_pb.GetUserAddressRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: server_pb.GetUserAddressResponse) => void): grpcWeb.ClientReadableStream<server_pb.GetUserAddressResponse>;

  getUserAddress(
    request: server_pb.GetUserAddressRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: server_pb.GetUserAddressResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/serverpb.serverpb/GetUserAddress',
        request,
        metadata || {},
        this.methodInfoGetUserAddress,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/serverpb.serverpb/GetUserAddress',
    request,
    metadata || {},
    this.methodInfoGetUserAddress);
  }

  methodInfoAddNewAddress = new grpcWeb.MethodDescriptor(
    '/serverpb.serverpb/AddNewAddress',
    grpcWeb.MethodType.UNARY,
    server_pb.AddNewAddressRequest,
    server_pb.AddNewAddressResponse,
    (request: server_pb.AddNewAddressRequest) => {
      return request.serializeBinary();
    },
    server_pb.AddNewAddressResponse.deserializeBinary
  );

  addNewAddress(
    request: server_pb.AddNewAddressRequest,
    metadata: grpcWeb.Metadata | null): Promise<server_pb.AddNewAddressResponse>;

  addNewAddress(
    request: server_pb.AddNewAddressRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: server_pb.AddNewAddressResponse) => void): grpcWeb.ClientReadableStream<server_pb.AddNewAddressResponse>;

  addNewAddress(
    request: server_pb.AddNewAddressRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: server_pb.AddNewAddressResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/serverpb.serverpb/AddNewAddress',
        request,
        metadata || {},
        this.methodInfoAddNewAddress,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/serverpb.serverpb/AddNewAddress',
    request,
    metadata || {},
    this.methodInfoAddNewAddress);
  }

  methodInfoUpdateAddress = new grpcWeb.MethodDescriptor(
    '/serverpb.serverpb/UpdateAddress',
    grpcWeb.MethodType.UNARY,
    server_pb.UpdateAddressRequest,
    server_pb.UpdateAddressResponse,
    (request: server_pb.UpdateAddressRequest) => {
      return request.serializeBinary();
    },
    server_pb.UpdateAddressResponse.deserializeBinary
  );

  updateAddress(
    request: server_pb.UpdateAddressRequest,
    metadata: grpcWeb.Metadata | null): Promise<server_pb.UpdateAddressResponse>;

  updateAddress(
    request: server_pb.UpdateAddressRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: server_pb.UpdateAddressResponse) => void): grpcWeb.ClientReadableStream<server_pb.UpdateAddressResponse>;

  updateAddress(
    request: server_pb.UpdateAddressRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: server_pb.UpdateAddressResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/serverpb.serverpb/UpdateAddress',
        request,
        metadata || {},
        this.methodInfoUpdateAddress,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/serverpb.serverpb/UpdateAddress',
    request,
    metadata || {},
    this.methodInfoUpdateAddress);
  }

  methodInfoDeleteAddress = new grpcWeb.MethodDescriptor(
    '/serverpb.serverpb/DeleteAddress',
    grpcWeb.MethodType.UNARY,
    server_pb.DeleteAddressRequest,
    server_pb.DeleteAddressResponse,
    (request: server_pb.DeleteAddressRequest) => {
      return request.serializeBinary();
    },
    server_pb.DeleteAddressResponse.deserializeBinary
  );

  deleteAddress(
    request: server_pb.DeleteAddressRequest,
    metadata: grpcWeb.Metadata | null): Promise<server_pb.DeleteAddressResponse>;

  deleteAddress(
    request: server_pb.DeleteAddressRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: server_pb.DeleteAddressResponse) => void): grpcWeb.ClientReadableStream<server_pb.DeleteAddressResponse>;

  deleteAddress(
    request: server_pb.DeleteAddressRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: server_pb.DeleteAddressResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/serverpb.serverpb/DeleteAddress',
        request,
        metadata || {},
        this.methodInfoDeleteAddress,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/serverpb.serverpb/DeleteAddress',
    request,
    metadata || {},
    this.methodInfoDeleteAddress);
  }

  methodInfoGetShopList = new grpcWeb.MethodDescriptor(
    '/serverpb.serverpb/GetShopList',
    grpcWeb.MethodType.UNARY,
    server_pb.GetShopListRequest,
    server_pb.GetShopListResponse,
    (request: server_pb.GetShopListRequest) => {
      return request.serializeBinary();
    },
    server_pb.GetShopListResponse.deserializeBinary
  );

  getShopList(
    request: server_pb.GetShopListRequest,
    metadata: grpcWeb.Metadata | null): Promise<server_pb.GetShopListResponse>;

  getShopList(
    request: server_pb.GetShopListRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: server_pb.GetShopListResponse) => void): grpcWeb.ClientReadableStream<server_pb.GetShopListResponse>;

  getShopList(
    request: server_pb.GetShopListRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: server_pb.GetShopListResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/serverpb.serverpb/GetShopList',
        request,
        metadata || {},
        this.methodInfoGetShopList,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/serverpb.serverpb/GetShopList',
    request,
    metadata || {},
    this.methodInfoGetShopList);
  }

  methodInfoGetShopMenu = new grpcWeb.MethodDescriptor(
    '/serverpb.serverpb/GetShopMenu',
    grpcWeb.MethodType.UNARY,
    server_pb.GetShopMenuRequest,
    server_pb.GetShopMenuResponse,
    (request: server_pb.GetShopMenuRequest) => {
      return request.serializeBinary();
    },
    server_pb.GetShopMenuResponse.deserializeBinary
  );

  getShopMenu(
    request: server_pb.GetShopMenuRequest,
    metadata: grpcWeb.Metadata | null): Promise<server_pb.GetShopMenuResponse>;

  getShopMenu(
    request: server_pb.GetShopMenuRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: server_pb.GetShopMenuResponse) => void): grpcWeb.ClientReadableStream<server_pb.GetShopMenuResponse>;

  getShopMenu(
    request: server_pb.GetShopMenuRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: server_pb.GetShopMenuResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/serverpb.serverpb/GetShopMenu',
        request,
        metadata || {},
        this.methodInfoGetShopMenu,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/serverpb.serverpb/GetShopMenu',
    request,
    metadata || {},
    this.methodInfoGetShopMenu);
  }

  methodInfoCreateNewOrder = new grpcWeb.MethodDescriptor(
    '/serverpb.serverpb/CreateNewOrder',
    grpcWeb.MethodType.UNARY,
    server_pb.CreateNewOrderRequest,
    server_pb.CreateNewOrderResponse,
    (request: server_pb.CreateNewOrderRequest) => {
      return request.serializeBinary();
    },
    server_pb.CreateNewOrderResponse.deserializeBinary
  );

  createNewOrder(
    request: server_pb.CreateNewOrderRequest,
    metadata: grpcWeb.Metadata | null): Promise<server_pb.CreateNewOrderResponse>;

  createNewOrder(
    request: server_pb.CreateNewOrderRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: server_pb.CreateNewOrderResponse) => void): grpcWeb.ClientReadableStream<server_pb.CreateNewOrderResponse>;

  createNewOrder(
    request: server_pb.CreateNewOrderRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: server_pb.CreateNewOrderResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/serverpb.serverpb/CreateNewOrder',
        request,
        metadata || {},
        this.methodInfoCreateNewOrder,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/serverpb.serverpb/CreateNewOrder',
    request,
    metadata || {},
    this.methodInfoCreateNewOrder);
  }

  methodInfoGetPreviousOrders = new grpcWeb.MethodDescriptor(
    '/serverpb.serverpb/GetPreviousOrders',
    grpcWeb.MethodType.UNARY,
    server_pb.GetPreviousOrdersRequest,
    server_pb.GetPreviousOrdersResponse,
    (request: server_pb.GetPreviousOrdersRequest) => {
      return request.serializeBinary();
    },
    server_pb.GetPreviousOrdersResponse.deserializeBinary
  );

  getPreviousOrders(
    request: server_pb.GetPreviousOrdersRequest,
    metadata: grpcWeb.Metadata | null): Promise<server_pb.GetPreviousOrdersResponse>;

  getPreviousOrders(
    request: server_pb.GetPreviousOrdersRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: server_pb.GetPreviousOrdersResponse) => void): grpcWeb.ClientReadableStream<server_pb.GetPreviousOrdersResponse>;

  getPreviousOrders(
    request: server_pb.GetPreviousOrdersRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: server_pb.GetPreviousOrdersResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/serverpb.serverpb/GetPreviousOrders',
        request,
        metadata || {},
        this.methodInfoGetPreviousOrders,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/serverpb.serverpb/GetPreviousOrders',
    request,
    metadata || {},
    this.methodInfoGetPreviousOrders);
  }

}

