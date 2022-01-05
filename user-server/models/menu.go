package models

import uuid "github.com/satori/go.uuid"

type Menu struct {
	Base

	Name       string
	Price      int32
	Bestseller bool
	Weight     int32
	Category   string
	ShopId     uuid.UUID
}
