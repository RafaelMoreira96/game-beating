package controllers

import (
	"github.com/RafaelMoreira96/game-beating-project/controllers/utils"
	"github.com/RafaelMoreira96/game-beating-project/database"
	"github.com/RafaelMoreira96/game-beating-project/models"
	"github.com/gofiber/fiber/v2"
)

func AddGenre(c *fiber.Ctx) error {
	utils.GetAdminTokenInfos(c)
	db := database.GetDatabase()
	var genre models.Genre
	genre.IsActive = true

	if err := c.BodyParser(&genre); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error parsing genre: " + err.Error(),
		})
	}

	if genre.NameGenre == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "insert a genre name",
		})
	}

	var genreDB models.Genre
	if err := db.Where("name_genre = ?", genre.NameGenre).First(&genreDB).Error; err == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "genre already exists",
		})
	}

	if err := db.Create(&genre).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error creating genre: " + err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(genre)
}

func ListAllGenres(c *fiber.Ctx) error {
	utils.GetAdminTokenInfos(c)
	db := database.GetDatabase()
	var genres []models.Genre

	if err := db.Where("is_active = true").Find(&genres).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(genres)
	}

	return c.Status(fiber.StatusOK).JSON(genres)
}

func ListDeactivateGenres(c *fiber.Ctx) error {
	utils.GetAdminTokenInfos(c)
	db := database.GetDatabase()
	var genres []models.Genre

	if err := db.Where("is_active = false").Find(&genres).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(genres)
	}

	return c.Status(fiber.StatusOK).JSON(genres)
}

func ViewGenre(c *fiber.Ctx) error {
	utils.GetAdminTokenInfos(c)
	db := database.GetDatabase()
	var genre models.Genre

	if err := db.Where("id_genre = ?", c.Params("id")).First(&genre).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "genre not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(genre)
}

func UpdateGenre(c *fiber.Ctx) error {
	utils.GetAdminTokenInfos(c)
	db := database.GetDatabase()
	var genre models.Genre

	if err := db.Where("id_genre = ?", c.Params("id")).First(&genre).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "genre not found",
		})
	}

	if err := c.BodyParser(&genre); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error parsing genre: " + err.Error(),
		})
	}

	if err := db.Save(&genre).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error updating genre: " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(genre)
}

func ReactivateGenre(c *fiber.Ctx) error {
	utils.GetAdminTokenInfos(c)
	db := database.GetDatabase()
	var genre models.Genre

	if err := db.Where("id_genre = ?", c.Params("id")).First(&genre).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "genre not found",
		})
	}

	if genre.IsActive {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "genre already activated",
		})
	}

	genre.IsActive = true

	if err := db.Save(&genre).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error reactivating genre: " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(genre)
}

func DeleteGenre(c *fiber.Ctx) error {
	utils.GetAdminTokenInfos(c)
	db := database.GetDatabase()
	var genre models.Genre

	if err := db.Where("id_genre = ?", c.Params("id")).First(&genre).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "genre not found",
		})
	}

	genre.IsActive = false
	if err := db.Save(&genre).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error deleting genre: " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "genre deleted",
	})
}
