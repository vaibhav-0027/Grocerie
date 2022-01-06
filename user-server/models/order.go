package models

import uuid "github.com/satori/go.uuid"

type Order struct {
	Base

	TotalPrice     int32
	DeliveryRating int32
	TotalWeight    int32
	FoodRating     int32
	Status         string
	Details        string
	ShopId         uuid.UUID
	UserId         uuid.UUID
	AddressId      uuid.UUID
}
