package controllers

import (
	"github.com/RafaelMoreira96/game-beating-project/database"
	"github.com/RafaelMoreira96/game-beating-project/models"
	"github.com/gofiber/fiber/v2"
)

func AddConsole(c *fiber.Ctx) error {
	db := database.GetDatabase()
	var console models.Console

	if err := c.BodyParser(&console); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error parsing console",
		})
	}

	var consoleDB models.Console
	if err := db.Where("name_console = ?", console.NameConsole).First(&consoleDB).Error; err == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "console already exists",
		})
	}

	if err := db.Create(&console).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error creating console",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(console)
}

/* func DeleteConsole(c *fiber.Ctx) error {

} */
