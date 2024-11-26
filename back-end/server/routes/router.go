package routes

import (
	"github.com/RafaelMoreira96/game-beating-project/controllers"
	"github.com/RafaelMoreira96/game-beating-project/utils"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	// Login route method
	app.Post("api/v1/login", controllers.Login)

	/* Security JWT implements */
	app.Use(utils.JWTMiddleware)

	// Manufacturer routes methods
	app.Post("api/v1/manufacturer", controllers.AddManufacturer)
	app.Get("api/v1/manufacturer/list", controllers.ListAllManufacturers)
	app.Get("api/v1/manufacturer/:id", controllers.ViewManufacturer)
	app.Get("api/v1/manufacturer/list/deactivated", controllers.ListDeactivateManufacturers)
	app.Delete("api/v1/manufacturer/:id", controllers.DeleteManufacturer)
	app.Put("api/v1/manufacturer/:id", controllers.UpdateManufacturer)
	app.Put("api/v1/manufacturer/activate/:id", controllers.ReactivateManufacturer)

	// Console routes methods
	app.Post("/api/v1/console", controllers.AddConsole)
	app.Get("/api/v1/console/list", controllers.GetConsoles)
	app.Get("/api/v1/console/deactivated_list", controllers.GetInactiveConsoles)
	app.Get("/api/v1/console/:id", controllers.ViewConsole)
	app.Delete("/api/v1/console/:id", controllers.DeleteConsole)
	app.Put("/api/v1/console/:id", controllers.UpdateConsole)
	app.Put("/api/v1/console/activate/:id", controllers.ReactivateConsole)

	// Genre routes methods
	app.Post("/api/v1/genre", controllers.AddGenre)
	app.Get("/api/v1/genre/list", controllers.ListAllGenres)
	app.Get("/api/v1/genre/list/deactivated", controllers.ListDeactivateGenres)
	app.Get("/api/v1/genre/:id", controllers.ViewGenre)
	app.Delete("/api/v1/genre/:id", controllers.DeleteGenre)
	app.Put("/api/v1/genre/:id", controllers.UpdateGenre)
	app.Put("/api/v1/genre/activate/:id", controllers.ReactivateGenre)

	// Player routes methods
	app.Post("/api/v1/player", controllers.AddPlayer)
	app.Get("/api/v1/player/:id", controllers.ViewPlayer)
	app.Delete("/api/v1/player/:id", controllers.DeletePlayer)

	// Game routes methods
	app.Post("/api/v1/game", controllers.AddGame)
	app.Get("/api/v1/game/:id_player/list_beaten", controllers.GetBeatenList)
	app.Delete("/api/v1/game/:id_player/delete_beaten/:id_game", controllers.DeleteGame)
}
