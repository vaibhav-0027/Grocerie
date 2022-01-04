package models

type Address struct {
	Base

	SavedAs      string
	OtherName    string
	HouseAddress string
	Area         string
	Landmark     string
	UserID       string
}
