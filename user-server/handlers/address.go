package handlers

import (
	"context"
	"fmt"

	"github.com/vaibhav-0027/Grocerie/models"
	serverpb "github.com/vaibhav-0027/Grocerie/proto"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
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
	fmt.Printf("GetUserAddress method was invoked by: %+v\n", req)

	userId := req.GetUserId()
	list := []*models.Address{}

	resp := repo.Where("user_id = ?", userId).Find(&list)
	if resp.Error != nil {
		fmt.Printf("Something went wrong %+v\n", resp.Error)

		return nil, status.Errorf(
			codes.Internal,
			"Internal error occured!",
		)
	}

	respList := []*serverpb.Address{}

	for _, _address := range list {
		temp := &serverpb.Address{
			Id:           _address.ID.String(),
			SavedAs:      _address.SavedAs,
			OtherName:    _address.OtherName,
			HouseAddress: _address.HouseAddress,
			Area:         _address.Area,
			Landmark:     _address.Landmark,
			UserId:       _address.UserID,
		}

		respList = append(respList, temp)
	}

	return &serverpb.GetUserAddressResponse{
		Address: respList,
	}, nil
}

func (h *addressHandler) AddNewAddress(ctx context.Context, req *serverpb.AddNewAddressRequest) (*serverpb.AddNewAddressResponse, error) {
	fmt.Printf("AddNewAddress method was invoked by: %+v\n", req)

	params := req.GetAddress()

	newAddress := &models.Address{
		SavedAs:      params.GetSavedAs(),
		OtherName:    params.GetOtherName(),
		HouseAddress: params.GetHouseAddress(),
		Area:         params.GetArea(),
		Landmark:     params.GetLandmark(),
		UserID:       params.GetUserId(),
	}

	resp := repo.Create(&newAddress)
	if resp.Error != nil {
		fmt.Printf("Something went wrong while creating new address: %+v\n", resp.Error)

		return nil, status.Errorf(
			codes.Internal,
			"Something went wrong! Please try again!",
		)
	}

	return &serverpb.AddNewAddressResponse{
		Address: &serverpb.Address{
			Id:           newAddress.Base.ID.String(),
			SavedAs:      newAddress.SavedAs,
			OtherName:    newAddress.SavedAs,
			HouseAddress: newAddress.HouseAddress,
			Area:         newAddress.Area,
			Landmark:     newAddress.Landmark,
		},
	}, nil
}

func (h *addressHandler) UpdateAddress(ctx context.Context, req *serverpb.UpdateAddressRequest) (*serverpb.UpdateAddressResponse, error) {
	fmt.Printf("UpdateAddress method was invoked by: %+v\n", req)

	addressId := req.GetAddress().GetId()
	updatedAddress := &models.Address{}

	resp := repo.Where("id = ?", addressId).Find(&updatedAddress)

	if resp.RowsAffected == 0 {
		fmt.Printf("Something went wrong while fetching address: %+v\n", resp.Error)

		return nil, status.Errorf(
			codes.NotFound,
			"Address not found",
		)
	}

	updatedAddress.Area = req.GetAddress().GetArea()
	updatedAddress.HouseAddress = req.GetAddress().GetHouseAddress()
	updatedAddress.Landmark = req.GetAddress().GetLandmark()
	updatedAddress.OtherName = req.GetAddress().OtherName
	updatedAddress.SavedAs = req.GetAddress().GetSavedAs()

	resp = repo.Save(&updatedAddress)

	if resp.Error != nil {
		return nil, status.Errorf(
			codes.Internal,
			"Could not update address! Please try again!",
		)
	}

	return &serverpb.UpdateAddressResponse{
		Address: &serverpb.Address{
			Id:           updatedAddress.ID.String(),
			SavedAs:      updatedAddress.SavedAs,
			OtherName:    updatedAddress.OtherName,
			HouseAddress: updatedAddress.HouseAddress,
			Area:         updatedAddress.Area,
			Landmark:     updatedAddress.Landmark,
			UserId:       updatedAddress.UserID,
		},
	}, nil
}

func (h *addressHandler) DeleteAddress(ctx context.Context, req *serverpb.DeleteAddressRequest) (*serverpb.DeleteAddressResponse, error) {
	fmt.Printf("DeleteAddress method was invoked by: %+v\n", req)

	addressId := req.GetAddressId()

	// resp := repo.Delete(&models.Address{}, addressId)
	resp := repo.Where("id = ?", addressId).Delete(&models.Address{})

	if resp.RowsAffected == 0 {
		fmt.Printf("Something went wrong while deleting: %+v\n", resp.Error)

		return nil, status.Errorf(
			codes.NotFound,
			"No address found! Please try again!",
		)
	}

	return &serverpb.DeleteAddressResponse{
		Status: "OK",
	}, nil
}
