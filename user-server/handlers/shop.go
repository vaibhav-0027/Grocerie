package handlers

import (
	"context"

	serverpb "github.com/vaibhav-0027/Grocerie/proto"
)

type ShopHandler interface {
	GetShopList(context.Context, *serverpb.GetShopListRequest) (*serverpb.GetShopListResponse, error)
	GetShopMenu(context.Context, *serverpb.GetShopMenuRequest) (*serverpb.GetShopMenuResponse, error)
}

type shopHandler struct{}

func NewShopHandler() ShopHandler {
	return &shopHandler{}
}

func (h *shopHandler) GetShopList(context.Context, *serverpb.GetShopListRequest) (*serverpb.GetShopListResponse, error) {
	return nil, nil
}

func (h *shopHandler) GetShopMenu(context.Context, *serverpb.GetShopMenuRequest) (*serverpb.GetShopMenuResponse, error) {
	return nil, nil
}
