package models

import uuid "github.com/satori/go.uuid"

type Address struct {
	Base

	SavedAs      string
	OtherName    string
	HouseAddress string
	Area         string
	Landmark     string
	UserID       uuid.UUID
}
