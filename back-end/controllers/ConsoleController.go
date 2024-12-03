package controllers

import (
	"github.com/RafaelMoreira96/game-beating-project/controllers/utils"
	"github.com/RafaelMoreira96/game-beating-project/database"
	"github.com/RafaelMoreira96/game-beating-project/models"
	"github.com/gofiber/fiber/v2"
)

func AddConsole(c *fiber.Ctx) error {
	utils.GetAdminTokenInfos(c)
	db := database.GetDatabase()
	var console models.Console
	console.IsActive = true

	if err := c.BodyParser(&console); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error parsing console",
		})
	}

	if console.ManufacturerID == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Manufacturer ID not found",
		})
	}

	var manufacturer models.Manufacturer
	if err := db.Where("id_manufacturer = ?", console.ManufacturerID).First(&manufacturer).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "manufacturer not found: " + err.Error(),
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

func GetConsoles(c *fiber.Ctx) error {
	db := database.GetDatabase()
	var consoles []models.Console

	if err := db.Preload("Manufacturer").Where("is_active = true").Find(&consoles).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error into find consoles",
		})
	}

	return c.Status(fiber.StatusOK).JSON(consoles)
}

func GetInactiveConsoles(c *fiber.Ctx) error {
	utils.GetAdminTokenInfos(c)
	db := database.GetDatabase()
	var consoles []models.Console

	if err := db.Preload("Manufacturer").Where("is_active = false").Find(&consoles).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error into find consoles",
		})
	}

	return c.Status(fiber.StatusOK).JSON(consoles)
}

func ViewConsole(c *fiber.Ctx) error {
	db := database.GetDatabase()
	var console models.Console

	if err := db.Preload("Manufacturer").Where("id_console = ? ", c.Params("id")).First(&console).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "ID not found" + c.Params("id"),
		})
	}

	return c.Status(fiber.StatusOK).JSON(console)
}

func UpdateConsole(c *fiber.Ctx) error {
	utils.GetAdminTokenInfos(c)
	db := database.GetDatabase()
	var console models.Console

	if err := db.Where("id_console = ?", c.Params("id")).First(&console).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "console not found",
		})
	}

	var updatedConsole models.Console
	if err := c.BodyParser(&updatedConsole); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error parsing console",
		})
	}

	if console.NameConsole != updatedConsole.NameConsole {
		var temporaryConsole models.Console
		if err := db.Where("name_console = ? AND id_console = ?", updatedConsole.NameConsole, c.Params("id")).First(&temporaryConsole).Error; err == nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "console already exists",
			})
		}
	}

	console.NameConsole = updatedConsole.NameConsole
	console.IsActive = updatedConsole.IsActive
	console.Manufacturer = updatedConsole.Manufacturer
	console.ReleaseDate = updatedConsole.ReleaseDate

	if err := db.Save(&console).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error updating manufacturer: " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(console)
}

func DeleteConsole(c *fiber.Ctx) error {
	utils.GetAdminTokenInfos(c)
	db := database.GetDatabase()
	var console models.Console

	if err := db.Where("id_console = ?", c.Params("id")).First(&console).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "console not found. ID: " + c.Params("id"),
		})
	}

	console.IsActive = false
	if err := db.Save(&console).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error: " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "console deleted",
	})
}

func ReactivateConsole(c *fiber.Ctx) error {
	utils.GetAdminTokenInfos(c)
	db := database.GetDatabase()
	var console models.Console

	if err := db.Where("id_console = ?", c.Params("id")).First(&console).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "console not found. ID: " + c.Params("id"),
		})
	}

	console.IsActive = true
	if err := db.Save(&console).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error: " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(console)
}
