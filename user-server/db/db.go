package db

import (
	"fmt"
	"log"
	"os"

	"github.com/jinzhu/gorm"
	"github.com/vaibhav-0027/Grocerie/models"

	_ "github.com/jinzhu/gorm/dialects/postgres"
	_ "github.com/lib/pq"
)

func DB() *gorm.DB {
	// Loading environment variables
	dialect := os.Getenv("DIALECT")
	host := os.Getenv("HOST")
	dbPort := os.Getenv("DBPORT")
	user := os.Getenv("USER")
	dbName := os.Getenv("NAME")
	password := os.Getenv("PASSWORD")

	// Database connection string
	dbURI := fmt.Sprintf(
		"host=%s user=%s dbname=%s sslmode=disable password=%s port=%s",
		host, user, dbName, password, dbPort,
	)

	// Opening connection to database
	db, err := gorm.Open(dialect, dbURI)
	if err != nil {
		log.Fatalf("Error occured while opening connection to database... %+v", err)
	}

	fmt.Println("Successfully connected to database...")

	// Close connection to database when the main function finishes
	// defer db.Close()

	db.LogMode(true)
	// Make migrations to the database if they have not already been created
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Address{})
	db.AutoMigrate(&models.Shop{})
	db.AutoMigrate(&models.Menu{})

	return db
}
