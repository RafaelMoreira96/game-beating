package server

import (
	"log"

	"github.com/RafaelMoreira96/game-beating-project/database"
	"github.com/RafaelMoreira96/game-beating-project/server/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/helmet"
)

func RunServer() {
	app := fiber.New()

	app.Use(helmet.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:4200",
		AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	app.Use(compress.New())

	database.Connect()
	routes.SetupRoutes(app)

	if err := app.Listen(":8000"); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
