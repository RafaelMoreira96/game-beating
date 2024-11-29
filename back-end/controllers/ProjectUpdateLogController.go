package controllers

import (
	"github.com/RafaelMoreira96/game-beating-project/controllers/utils"
	"github.com/RafaelMoreira96/game-beating-project/database"
	"github.com/RafaelMoreira96/game-beating-project/models"
	"github.com/gofiber/fiber/v2"
)

func AddLog(c *fiber.Ctx) error {
	utils.GetAdminTokenInfos(c)
	db := database.GetDatabase()
	var log models.ProjectUpdateLog
	if err := c.BodyParser(&log); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error parsing log",
		})
	}

	if log.Description == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "insert a description",
		})
	}

	if log.Content == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "insert a content",
		})
	}

	log.AuthorID = c.Locals("userID").(uint)
	db.Create(&log)
	return c.Status(fiber.StatusCreated).JSON(log)
}

func DeleteLog(c *fiber.Ctx) error {
	utils.GetAdminTokenInfos(c)
	db := database.GetDatabase()
	var log models.ProjectUpdateLog

	if err := db.Where("id_project_update_log = ?", c.Params("id")).First(&log).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "log not found",
		})
	}

	db.Delete(&log)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "log deleted",
	})
}

func GetLogs(c *fiber.Ctx) error {
	db := database.GetDatabase()
	var logs []models.ProjectUpdateLog

	if err := db.Preload("Author").Find(&logs).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error into find logs",
		})
	}

	return c.Status(fiber.StatusOK).JSON(logs)
}
