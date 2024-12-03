package controllers

import (
	"github.com/RafaelMoreira96/game-beating-project/database"
	"github.com/RafaelMoreira96/game-beating-project/models"
	"github.com/RafaelMoreira96/game-beating-project/utils"
	"github.com/gofiber/fiber/v2"
)

type User struct {
	Nickname string `json:"nickname"`
	Password string `json:"password"`
}

func LoginPlayer(c *fiber.Ctx) error {
	db := database.GetDatabase()
	var user User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error parsing user",
		})
	}

	if user.Nickname == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "insert a nickname",
		})
	}

	if user.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "insert a password",
		})
	}

	var player models.Player
	if err := db.Where("nickname = ?", user.Nickname).First(&player).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "user not found",
		})
	}

	if player.Password != user.Password {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid password",
		})
	}

	if player.IsActive != true {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "account deactivated",
		})
	}

	token, err := utils.GenerateJWT(player.IdPlayer, "player")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "error generating token",
		})
	}

	c.Set("Authorization", "Bearer "+token)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Login successful",
		"token":   token,
	})

}

func LoginAdmin(c *fiber.Ctx) error {
	db := database.GetDatabase()
	var user User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error parsing user",
		})
	}

	if user.Nickname == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "insert a nickname",
		})
	}

	if user.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "insert a password",
		})
	}

	var administrator models.Administrator
	if err := db.Where("nickname = ?", user.Nickname).First(&administrator).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "user not found",
		})
	}

	if administrator.Password != user.Password {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid password",
		})
	}

	if !administrator.IsActive {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "account deactivated",
		})
	}

	token, err := utils.GenerateJWT(administrator.IdAdministrator, "admin")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "error generating token",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"token": token,
	})
}
