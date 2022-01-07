package handlers

import (
	"context"
	"fmt"
	"strings"

	"github.com/vaibhav-0027/Grocerie/models"
	serverpb "github.com/vaibhav-0027/Grocerie/proto"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type ShopHandler interface {
	GetShopList(context.Context, *serverpb.GetShopListRequest) (*serverpb.GetShopListResponse, error)
	GetShopInfo(context.Context, *serverpb.GetShopInfoRequest) (*serverpb.GetShopInfoResponse, error)
	GetShopMenu(context.Context, *serverpb.GetShopMenuRequest) (*serverpb.GetShopMenuResponse, error)
}

type shopHandler struct{}

func NewShopHandler() ShopHandler {
	return &shopHandler{}
}

func (h *shopHandler) GetShopList(ctx context.Context, req *serverpb.GetShopListRequest) (*serverpb.GetShopListResponse, error) {
	fmt.Printf("GetShopList method was invoked by: %+v\n", req)

	list := []*models.Shop{}
	resp := repo.Find(&list)

	if resp.Error != nil {
		return nil, status.Errorf(
			codes.Internal,
			"Something went wrong! Please try again!",
		)
	}

	respList := []*serverpb.Shop{}

	for _, _shop := range list {

		// ? FOR SAVING TYPES
		// str := ""
		// for idx, element := range types {
		// 	str += element

		// 	if idx != len(types)-1 {
		// 		str += ","
		// 	}
		// }

		types := strings.Split(_shop.Types, ",")

		temp := &serverpb.Shop{
			Id:       _shop.ID.String(),
			Name:     _shop.Name,
			Locality: _shop.Locality,
			Types:    types,
		}

		respList = append(respList, temp)
	}

	return &serverpb.GetShopListResponse{
		Shops: respList,
	}, nil
}

func (h *shopHandler) GetShopInfo(ctx context.Context, req *serverpb.GetShopInfoRequest) (*serverpb.GetShopInfoResponse, error) {
	fmt.Printf("GetShopInfo method invoked by: %+v\n", req)

	shopId := req.GetShopId()
	shopInfo := &models.Shop{}

	resp := repo.Where("shop_id = ?", shopId).Find(&shopInfo)
	if resp.Error != nil {
		return nil, status.Errorf(
			codes.Internal,
			"Something went wrong! Please try again",
		)
	}

	return &serverpb.GetShopInfoResponse{
		Shop: &serverpb.Shop{
			Id:       shopInfo.ID.String(),
			Name:     shopInfo.Name,
			Locality: shopInfo.Locality,
			Types:    strings.Split(shopInfo.Types, ","),
		},
	}, nil
}

func (h *shopHandler) GetShopMenu(ctx context.Context, req *serverpb.GetShopMenuRequest) (*serverpb.GetShopMenuResponse, error) {
	fmt.Printf("GetShopMenu method invoked by: %+v\n", req)

	shopId := req.GetShopId()
	menuList := []*models.Menu{}

	resp := repo.Where("shop_id = ?", shopId).Find(&menuList)

	if resp.Error != nil {
		return nil, status.Errorf(
			codes.Internal,
			"Something went wrong! Please try again",
		)
	}

	respMenuList := []*serverpb.MenuItem{}

	for _, _menu := range menuList {
		temp := &serverpb.MenuItem{
			Id:         _menu.ID.String(),
			Name:       _menu.Name,
			Price:      _menu.Price,
			Category:   _menu.Category,
			BestSeller: _menu.Bestseller,
			Weight:     _menu.Weight,
			ShopId:     _menu.ShopId.String(),
		}

		respMenuList = append(respMenuList, temp)
	}

	return &serverpb.GetShopMenuResponse{
		Menu: respMenuList,
	}, nil
}
