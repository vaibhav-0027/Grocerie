package handlers

import (
	"context"
	"fmt"

	"github.com/vaibhav-0027/Grocerie/models"
	serverpb "github.com/vaibhav-0027/Grocerie/proto"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type UserHandler interface {
	RegisterUser(context.Context, *serverpb.RegisterUserRequest) (*serverpb.RegisterUserResponse, error)
	GetUserDetails(context.Context, *serverpb.GetUserDetailsRequest) (*serverpb.GetUserDetailsResponse, error)
	UpdateUserDetails(context.Context, *serverpb.UpdateUserDetailsRequest) (*serverpb.UpdateUserDetailsResponse, error)
}

type userHandler struct {
}

func NewUserHandler() UserHandler {
	return &userHandler{}
}

func (h *userHandler) RegisterUser(ctx context.Context, req *serverpb.RegisterUserRequest) (*serverpb.RegisterUserResponse, error) {
	fmt.Printf("RegisterUser method invoked for: %+v", req)

	// Fetch info for new user
	firebaseId := req.GetFirebaseId()
	mobile := req.GetMobile()
	name := req.GetName()

	// Check if user already exists using firebase id
	tempUser := &models.User{}

	resp := repo.Where("firebase_id = ?", firebaseId).Find(&tempUser)

	if resp.RowsAffected == 1 {
		return nil, status.Errorf(
			codes.AlreadyExists,
			"User already exists! Please Login instead!",
		)
	}

	newUser := &models.User{
		FirebaseId: firebaseId,
		Name:       name,
		Mobile:     mobile,
	}

	resp = repo.Create(&newUser)
	if resp.Error != nil {
		fmt.Printf("something went wrong while creating%+v\n", resp.Error)

		return nil, status.Errorf(
			codes.Internal,
			"Something went wrong! Please try again!",
		)
	}

	return &serverpb.RegisterUserResponse{
		Status: "OK",
	}, nil
}

func (h *userHandler) GetUserDetails(ctx context.Context, req *serverpb.GetUserDetailsRequest) (*serverpb.GetUserDetailsResponse, error) {
	fmt.Printf("GetUserDetails method was invoked for: %+v\n", req)

	// Fetch info for getting user details
	firebaseId := req.GetFirebaseId()
	tempUser := &models.User{}

	resp := repo.Where("firebase_id = ?", firebaseId).Find(&tempUser)

	if resp.RowsAffected == 0 {
		return nil, status.Errorf(
			codes.NotFound,
			"User not found",
		)
	}

	return &serverpb.GetUserDetailsResponse{
		Id:     tempUser.Base.ID.String(),
		Name:   tempUser.Name,
		Mobile: tempUser.Mobile,
	}, nil
}

func (h *userHandler) UpdateUserDetails(ctx context.Context, req *serverpb.UpdateUserDetailsRequest) (*serverpb.UpdateUserDetailsResponse, error) {
	fmt.Printf("UpdateUserDetails method was invoked for: %+v\n", req)

	newName := req.GetName()
	userId := req.GetId()

	updatedUser := &models.User{}

	resp := repo.First(&updatedUser, userId)

	if resp.RowsAffected == 0 {
		return nil, status.Errorf(
			codes.NotFound,
			"User not found in database",
		)
	}

	updatedUser.Name = newName
	resp = repo.Save(&updatedUser)

	if resp.Error != nil {
		return nil, status.Errorf(
			codes.Internal,
			"Could not udpate user details! Please try again!",
		)
	}

	return &serverpb.UpdateUserDetailsResponse{
		Status: "OK",
	}, nil
}
