package controllers

import (
	"github.com/RafaelMoreira96/game-beating-project/database"
	"github.com/RafaelMoreira96/game-beating-project/models"
	"github.com/gofiber/fiber/v2"
)

func AddManufacturer(c *fiber.Ctx) error {
	db := database.GetDatabase()
	var manufacturer models.Manufacturer
	manufacturer.IsActive = true

	if err := c.BodyParser(&manufacturer); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error parsing manufacturer: " + err.Error(),
		})
	}

	if manufacturer.NameManufacturer == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "insert a manufacturer name",
		})
	}

	if manufacturer.YearFounded == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "insert a valid release year",
		})
	}

	var manufacturerDB models.Manufacturer
	if err := db.Where("name_manufacturer = ?", manufacturer.NameManufacturer).First(&manufacturerDB).Error; err == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "manufacturer already exists",
		})
	}

	if err := db.Create(&manufacturer).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error creating manufacturer: " + err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(manufacturer)
}

func ListAllManufacturers(c *fiber.Ctx) error {
	db := database.GetDatabase()
	var manufacturers []models.Manufacturer

	if err := db.Where("is_active = true").Find(&manufacturers).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(manufacturers)
	}

	return c.Status(fiber.StatusOK).JSON(manufacturers)
}

func ViewManufacturer(c *fiber.Ctx) error {
	db := database.GetDatabase()
	var manufacturer models.Manufacturer

	if err := db.Where("id_manufacturer = ?", c.Params("id")).First(&manufacturer).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "manufacturer not found. ID: " + c.Params("id"),
		})
	}

	return c.Status(fiber.StatusOK).JSON(manufacturer)
}

func DeleteManufacturer(c *fiber.Ctx) error {

	return nil
}
