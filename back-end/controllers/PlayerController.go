package controllers

import (
	"github.com/RafaelMoreira96/game-beating-project/database"
	"github.com/RafaelMoreira96/game-beating-project/models"
	"github.com/gofiber/fiber/v2"
)

func AddPlayer(c *fiber.Ctx) error {
	db := database.GetDatabase()
	var player models.Player
	player.IsActive = true

	if err := c.BodyParser(&player); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error parsing player",
		})
	}

	if player.NamePlayer == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "insert a player name",
		})
	}

	var playerDB models.Player
	if err := db.Where("nickname = ?", player.Nickname).First(&playerDB).Error; err == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "nickname already exists",
		})
	}

	if err := db.Create(&player).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error creating player",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(player)
}

func ViewPlayer(c *fiber.Ctx) error {
	db := database.GetDatabase()
	var player models.Player

	if err := db.Where("id_player = ?", c.Params("id")).First(&player).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "player not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(player)
}

func DeletePlayer(c *fiber.Ctx) error {
	db := database.GetDatabase()
	var player models.Player

	if err := db.Where("id_player = ?", c.Params("id")).First(&player).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "player not found" + err.Error(),
		})
	}

	player.IsActive = false
	if err := db.Save(&player).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error deleting player: " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "player deleted",
	})
}
