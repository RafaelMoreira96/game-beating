package controllers

import (
	"github.com/RafaelMoreira96/game-beating-project/database"
	"github.com/RafaelMoreira96/game-beating-project/models"
	"github.com/gofiber/fiber/v2"
)

func AddAdministrator(c *fiber.Ctx) error {
	db := database.GetDatabase()
	var administrator models.Administrator

	if err := c.BodyParser(&administrator); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error parsing administrator",
		})
	}

	if administrator.Nickname == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "insert a nickname",
		})
	}

	if administrator.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "insert a password",
		})
	}

	var administratorDB models.Administrator
	if err := db.Where("nickname = ?", administrator.Nickname).First(&administratorDB).Error; err == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "administrator already exists",
		})
	}

	if err := db.Where("email = ?", administrator.Email).First(&administratorDB).Error; err == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "email already exists",
		})
	}

	administrator.IsActive = true
	if err := db.Create(&administrator).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error creating administrator",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(administrator)
}

func ViewAdministrator(c *fiber.Ctx) error {
	role := c.Locals("role").(string)
	if role != "admin" {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"message": "Access denied",
		})
	}

	adminID, ok := c.Locals("userID").(uint)
	if !ok {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error getting player id",
		})
	}

	db := database.GetDatabase()
	var administrator models.Administrator

	if err := db.Where("id_administrator = ?", adminID).First(&administrator).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "administrator not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(administrator)
}

func DeleteAdministrator(c *fiber.Ctx) error {
	role := c.Locals("role").(string)
	if role != "admin" {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"message": "Access denied",
		})
	}

	adminID, ok := c.Locals("userID").(uint)
	if !ok {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error getting player id",
		})
	}

	db := database.GetDatabase()
	var administrator models.Administrator

	if err := db.Where("id_administrator = ?", adminID).First(&administrator).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "administrator not found" + err.Error(),
		})
	}

	administrator.IsActive = false
	if err := db.Save(&administrator).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error deleting admin: " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "administrator deleted",
	})
}
