package handlers

import (
	"context"
	"fmt"

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
	list := []*models.Order{}

	resp := repo.Where("user_id = ?", userId).Find(&list)
	if resp.Error != nil {
		fmt.Printf("Something went wrong: %+v\n", resp.Error)

		return nil, status.Errorf(
			codes.Internal,
			"Something went wrong! Please try again!",
		)
	}

	respList := []*serverpb.Order{}

	for _, _order := range list {
		temp := &serverpb.Order{
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
