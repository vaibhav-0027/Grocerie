package handlers

import (
	"log"

	"github.com/jinzhu/gorm"
	"github.com/vaibhav-0027/Grocerie/db"
)

var repo *gorm.DB = db.DB()

func init() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
}
