package handlers

import (
	"context"

	serverpb "github.com/vaibhav-0027/Grocerie/proto"
)

type OrderHandler interface {
	CreateNewOrder(context.Context, *serverpb.CreateNewOrderRequest) (*serverpb.CreateNewOrderResponse, error)
	GetPreviousOrders(context.Context, *serverpb.GetPreviousOrdersRequest) (*serverpb.GetPreviousOrdersResponse, error)
}

type orderHandler struct {
}

func NewOrderHandler() OrderHandler {
	return &orderHandler{}
}

func (h *orderHandler) CreateNewOrder(context.Context, *serverpb.CreateNewOrderRequest) (*serverpb.CreateNewOrderResponse, error) {
	return nil, nil
}

func (h *orderHandler) GetPreviousOrders(context.Context, *serverpb.GetPreviousOrdersRequest) (*serverpb.GetPreviousOrdersResponse, error) {
	return nil, nil
}
