package handlers

import (
	"context"

	serverpb "github.com/vaibhav-0027/Grocerie/proto"
)

type AddressHandler interface {
	GetUserAddress(context.Context, *serverpb.GetUserAddressRequest) (*serverpb.GetUserAddressResponse, error)
	AddNewAddress(context.Context, *serverpb.AddNewAddressRequest) (*serverpb.AddNewAddressResponse, error)
	UpdateAddress(context.Context, *serverpb.UpdateAddressRequest) (*serverpb.UpdateAddressResponse, error)
	DeleteAddress(context.Context, *serverpb.DeleteAddressRequest) (*serverpb.DeleteAddressResponse, error)
}

type addressHandler struct {
}

func NewAddressHandler() AddressHandler {
	return &addressHandler{}
}

func (h *addressHandler) GetUserAddress(ctx context.Context, req *serverpb.GetUserAddressRequest) (*serverpb.GetUserAddressResponse, error) {

	return nil, nil
}

func (h *addressHandler) AddNewAddress(ctx context.Context, req *serverpb.AddNewAddressRequest) (*serverpb.AddNewAddressResponse, error) {

	return nil, nil
}

func (h *addressHandler) UpdateAddress(ctx context.Context, req *serverpb.UpdateAddressRequest) (*serverpb.UpdateAddressResponse, error) {

	return nil, nil
}

func (h *addressHandler) DeleteAddress(ctx context.Context, req *serverpb.DeleteAddressRequest) (*serverpb.DeleteAddressResponse, error) {
	return nil, nil
}
