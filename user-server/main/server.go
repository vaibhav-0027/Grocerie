package main

import (
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	_ "github.com/jinzhu/gorm/dialects/postgres"
	_ "github.com/lib/pq"
	"github.com/vaibhav-0027/Grocerie/db"
	"github.com/vaibhav-0027/Grocerie/handlers"
	serverpb "github.com/vaibhav-0027/Grocerie/proto"
	"google.golang.org/grpc"
)

var userHandler handlers.UserHandler
var addressHandler handlers.AddressHandler
var shopHandler handlers.ShopHandler
var orderHandler handlers.OrderHandler

func init() {
	userHandler = handlers.NewUserHandler()
	addressHandler = handlers.NewAddressHandler()
	shopHandler = handlers.NewShopHandler()
	orderHandler = handlers.NewOrderHandler()

	fmt.Println("Connecting to PostgreSQL...")

	fmt.Println("Connected to database successfully...")
}

func main() {
	// if we crash the go code, we get the file name and line number
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	listener, err := net.Listen("tcp", "0.0.0.0:8080")
	if err != nil {
		log.Fatalf("Failed to listen : %+v", err)
	}

	s := grpc.NewServer()
	serverpb.RegisterServerpbServer(s, &server{})

	go func() {
		fmt.Println("Starting server on port 8080...")

		if err := s.Serve(listener); err != nil {
			log.Fatalf("Failed to serve: %+v", err)
		}
	}()

	// wait for control c to exit
	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt)

	// Block until signal is received
	<-ch
	fmt.Println("Stopping the server...")
	s.Stop()

	fmt.Println("Closing the listener...")
	listener.Close()

	fmt.Println("Closing the postgres connection...")
	db.DB().Close()
}
