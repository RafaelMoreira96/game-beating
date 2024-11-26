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

	// Manufacturer routes methods
	app.Post("api/v1/manufacturer", controllers.AddManufacturer)
	app.Get("api/v1/manufacturer/list", controllers.ListAllManufacturers)
	app.Get("api/v1/manufacturer/:id", controllers.ViewManufacturer)
	app.Get("api/v1/manufacturer/deactivated_list", controllers.ListDeactivateManufacturers)
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

}
