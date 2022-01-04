package models

// TODO: change mobile number to int64 after changing authentication
type User struct {
	Base

	FirebaseId string
	Name       string
	Mobile     string
}
