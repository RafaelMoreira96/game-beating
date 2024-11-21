package routes

import (
	"github.com/RafaelMoreira96/game-beating-project/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	/* Security JWT implements
	* app.Use(utils.JWTMiddleware)
	*
	*
	 */

	// Console routes methods
	app.Post("/api/v1/console", controllers.AddConsole)

	// Manufacturer routes methods
	app.Post("api/v1/manufacturer", controllers.AddManufacturer)
	app.Get("api/v1/manufacturer/list", controllers.ListAllManufacturers)
	app.Get("api/v1/manufacturer/:id", controllers.ViewManufacturer)
}
