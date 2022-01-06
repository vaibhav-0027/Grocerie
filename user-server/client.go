package main

import (
	"context"
	"fmt"
	"log"

	serverpb "github.com/vaibhav-0027/Grocerie/proto"
	"google.golang.org/grpc"
)

func main() {
	// Create client for creating some shops and menu for the time being
	// var repo *gorm.DB = db.DB()

	opts := grpc.WithInsecure()
	// opts := insecure.NewCredentials()

	connection, err := grpc.Dial("localhost:8080", opts)
	if err != nil {
		log.Fatalf("Could not connect: %+v", err)
	}

	defer connection.Close()

	client := serverpb.NewServerpbClient(connection)

	resp, err := client.GetShopList(context.Background(), &serverpb.GetShopListRequest{})
	if err != nil {
		fmt.Printf("Something went wrong! %+v\n", err)
	}

	list := resp.GetShops()
	fmt.Println(list)

	// resp, err := client.
}
