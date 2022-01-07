package handlers

import (
	"context"
	"fmt"
	"strings"

	uuid "github.com/satori/go.uuid"
	"github.com/vaibhav-0027/Grocerie/models"
	serverpb "github.com/vaibhav-0027/Grocerie/proto"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type OrderHandler interface {
	CreateNewOrder(context.Context, *serverpb.CreateNewOrderRequest) (*serverpb.CreateNewOrderResponse, error)
	GetPreviousOrders(context.Context, *serverpb.GetPreviousOrdersRequest) (*serverpb.GetPreviousOrdersResponse, error)
	UpdateOrder(context.Context, *serverpb.UpdateOrderRequest) (*serverpb.UpdateOrderResponse, error)
}

type orderHandler struct {
}

func NewOrderHandler() OrderHandler {
	return &orderHandler{}
}

func (h *orderHandler) CreateNewOrder(ctx context.Context, req *serverpb.CreateNewOrderRequest) (*serverpb.CreateNewOrderResponse, error) {
	fmt.Printf("CreateNewOrder method was invoked by: %+v\n", req)

	params := req.Order

	newOrder := &models.Order{
		UserId:         uuid.FromStringOrNil(params.GetUserId()),
		ShopId:         uuid.FromStringOrNil(params.GetShopId()),
		AddressId:      uuid.FromStringOrNil(params.GetAddressId()),
		TotalPrice:     params.GetTotalPrice(),
		TotalWeight:    params.GetTotalWeight(),
		Details:        params.OrderDetails,
		Status:         "Placed",
		DeliveryRating: 0,
		FoodRating:     0,
	}

	resp := repo.Create(&newOrder)
	if resp.Error != nil {
		fmt.Printf("Something went wrong while creating new order: %+v\n", resp.Error)

		return nil, status.Errorf(
			codes.Internal,
			"Something went wrong! Please try again!",
		)
	}

	return &serverpb.CreateNewOrderResponse{
		Order: &serverpb.Order{
			TotalPrice:     newOrder.TotalPrice,
			ShopId:         newOrder.ShopId.String(),
			DeliveryRating: newOrder.DeliveryRating,
			FoodRating:     newOrder.FoodRating,
			OrderDetails:   newOrder.Details,
			UserId:         newOrder.UserId.String(),
			Status:         newOrder.Status,
			TotalWeight:    newOrder.TotalWeight,
			AddressId:      newOrder.AddressId.String(),
		},
	}, nil
}

func (h *orderHandler) GetPreviousOrders(ctx context.Context, req *serverpb.GetPreviousOrdersRequest) (*serverpb.GetPreviousOrdersResponse, error) {
	fmt.Printf("GetPreviousOrders method was invoked by: %+v\n", req)

	userId := req.GetUserId()
	ordersList := []*models.Order{}

	resp := repo.Where("user_id = ?", userId).Find(&ordersList)
	if resp.Error != nil {
		fmt.Printf("Something went wrong: %+v\n", resp.Error)

		return nil, status.Errorf(
			codes.Internal,
			"Something went wrong! Please try again!",
		)
	}

	respList := []*serverpb.PreviousOrderDetails{}

	// TODO: optimize this method
	for _, _order := range ordersList {
		tempOrder := &serverpb.Order{
			Id:             _order.ID.String(),
			ShopId:         _order.ShopId.String(),
			UserId:         _order.UserId.String(),
			AddressId:      _order.AddressId.String(),
			TotalPrice:     _order.TotalPrice,
			DeliveryRating: _order.DeliveryRating,
			FoodRating:     _order.FoodRating,
			OrderDetails:   _order.Details,
			Status:         _order.Status,
		}

		tempShop := getShopInfo(_order.ShopId)

		tempItems := getOrderItems(_order.ShopId)

		temp := &serverpb.PreviousOrderDetails{
			OrderInfo: tempOrder,
			ShopInfo:  tempShop,
			ItemsInfo: tempItems,
		}

		respList = append(respList, temp)
	}

	return &serverpb.GetPreviousOrdersResponse{
		Orders: respList,
	}, nil
}

func (h *orderHandler) UpdateOrder(ctx context.Context, req *serverpb.UpdateOrderRequest) (*serverpb.UpdateOrderResponse, error) {
	fmt.Printf("UpdateOrder method was invoked by: %+v\n", req)

	orderId := req.GetOrder().GetId()
	updatedOrder := &models.Order{}

	resp := repo.Where("id = ?", orderId).Find(&updatedOrder)

	if resp.Error != nil {
		fmt.Printf("Something went wrong! %+v\n", resp.Error)

		return nil, status.Errorf(
			codes.NotFound,
			"Order does not exist",
		)
	}

	updatedOrder.DeliveryRating = req.GetOrder().GetDeliveryRating()
	updatedOrder.FoodRating = req.GetOrder().GetFoodRating()

	resp = repo.Save(&updatedOrder)

	if resp.Error != nil {
		return nil, status.Errorf(
			codes.Internal,
			"Could not update order! Please try again!",
		)
	}

	return &serverpb.UpdateOrderResponse{
		Order: &serverpb.Order{
			Id:             updatedOrder.ID.String(),
			UserId:         updatedOrder.UserId.String(),
			AddressId:      updatedOrder.AddressId.String(),
			ShopId:         updatedOrder.ShopId.String(),
			TotalPrice:     updatedOrder.TotalPrice,
			TotalWeight:    updatedOrder.TotalWeight,
			OrderDetails:   updatedOrder.Details,
			DeliveryRating: updatedOrder.DeliveryRating,
			FoodRating:     updatedOrder.FoodRating,
			Status:         updatedOrder.Status,
		},
	}, nil
}

func getShopInfo(shopId uuid.UUID) *serverpb.Shop {
	tempShopModel := &models.Shop{}
	resp := repo.Where("id = ?", shopId).Find(&tempShopModel)
	if resp.Error != nil {
		return nil
	}

	return &serverpb.Shop{
		Id:       tempShopModel.ID.String(),
		Name:     tempShopModel.Name,
		Locality: tempShopModel.Locality,
		Types:    strings.Split(tempShopModel.Types, ","),
	}
}

func getOrderItems(shopId uuid.UUID) []*serverpb.MenuItem {
	tempItemsModel := []*models.Menu{}
	resp := repo.Where("shop_id = ?", shopId).Find(&tempItemsModel)
	if resp.Error != nil {
		return []*serverpb.MenuItem{}
	}

	tempItems := []*serverpb.MenuItem{}

	for _, _currentItem := range tempItemsModel {
		temp := &serverpb.MenuItem{
			Id:     _currentItem.ID.String(),
			Name:   _currentItem.Name,
			Weight: _currentItem.Weight,
		}

		tempItems = append(tempItems, temp)
	}

	return tempItems
}
