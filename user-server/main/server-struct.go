package main

import (
	"context"
	"fmt"

	serverpb "github.com/vaibhav-0027/Grocerie/proto"
)

type server struct{}

// User related requests
func (*server) RegisterUser(ctx context.Context, req *serverpb.RegisterUserRequest) (*serverpb.RegisterUserResponse, error) {
	return userHandler.RegisterUser(ctx, req)
}
func (*server) GetUserDetails(ctx context.Context, req *serverpb.GetUserDetailsRequest) (*serverpb.GetUserDetailsResponse, error) {
	return userHandler.GetUserDetails(ctx, req)
}
func (*server) UpdateUserDetails(ctx context.Context, req *serverpb.UpdateUserDetailsRequest) (*serverpb.UpdateUserDetailsResponse, error) {
	return userHandler.UpdateUserDetails(ctx, req)
}

// Address related requests
func (*server) GetUserAddress(ctx context.Context, req *serverpb.GetUserAddressRequest) (*serverpb.GetUserAddressResponse, error) {
	return addressHandler.GetUserAddress(ctx, req)
}
func (*server) AddNewAddress(ctx context.Context, req *serverpb.AddNewAddressRequest) (*serverpb.AddNewAddressResponse, error) {
	return addressHandler.AddNewAddress(ctx, req)
}
func (*server) UpdateAddress(ctx context.Context, req *serverpb.UpdateAddressRequest) (*serverpb.UpdateAddressResponse, error) {
	fmt.Println("server-struct update address")
	return addressHandler.UpdateAddress(ctx, req)
}
func (*server) DeleteAddress(ctx context.Context, req *serverpb.DeleteAddressRequest) (*serverpb.DeleteAddressResponse, error) {
	return addressHandler.DeleteAddress(ctx, req)
}

// Shop related requests
func (*server) GetShopList(ctx context.Context, req *serverpb.GetShopListRequest) (*serverpb.GetShopListResponse, error) {
	return shopHandler.GetShopList(ctx, req)
}
func (*server) GetShopMenu(ctx context.Context, req *serverpb.GetShopMenuRequest) (*serverpb.GetShopMenuResponse, error) {
	return shopHandler.GetShopMenu(ctx, req)
}

// Order related requests
func (*server) CreateNewOrder(ctx context.Context, req *serverpb.CreateNewOrderRequest) (*serverpb.CreateNewOrderResponse, error) {
	return orderHandler.CreateNewOrder(ctx, req)
}
func (*server) GetPreviousOrders(ctx context.Context, req *serverpb.GetPreviousOrdersRequest) (*serverpb.GetPreviousOrdersResponse, error) {
	return orderHandler.GetPreviousOrders(ctx, req)
}
