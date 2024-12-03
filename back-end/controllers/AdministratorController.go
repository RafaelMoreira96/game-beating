package controllers

import (
	"fmt"
	"strconv"

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
	// Verifica se o usuário tem permissão de administrador
	role, ok := c.Locals("role").(string)
	if !ok || role != "admin" {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"message": "Access denied",
		})
	}

	// Determina o ID do administrador a ser visualizado
	var adminID uint
	if idParam := c.Params("id"); idParam != "" {
		// Tenta converter o parâmetro "id" em uint
		id, err := strconv.ParseUint(idParam, 10, 64)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "Invalid ID format",
			})
		}
		adminID = uint(id)
	} else {
		// Se não há parâmetro "id", usa o adminID do contexto
		var ok bool
		adminID, ok = c.Locals("userID").(uint)
		if !ok {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "Administrator ID not found",
			})
		}
	}

	// Busca o administrador no banco de dados
	db := database.GetDatabase()
	var administrator models.Administrator

	if err := db.Where("id_administrator = ?", adminID).First(&administrator).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Administrator not found. ID: " + fmt.Sprint(adminID),
		})
	}

	return c.Status(fiber.StatusOK).JSON(administrator)
}

func ListAdministrators(c *fiber.Ctx) error {
	role := c.Locals("role").(string)
	if role != "admin" {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"message": "Access denied",
		})
	}

	db := database.GetDatabase()
	var administrators []models.Administrator

	if err := db.Where("is_active = true").Find(&administrators).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error getting administrators",
		})
	}

	return c.Status(fiber.StatusOK).JSON(administrators)
}

func CancelAdministratorAccount(c *fiber.Ctx) error {
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

func UpdateAdministrator(c *fiber.Ctx) error {
	role, ok := c.Locals("role").(string)
	if !ok || role != "admin" {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"message": "Access denied",
		})
	}

	// Determina o ID do administrador a ser atualizado
	var adminID uint
	if idParam := c.Params("id"); idParam != "" {
		// Tenta converter o parâmetro "id" em uint
		id, err := strconv.ParseUint(idParam, 10, 64)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "Invalid ID format",
			})
		}
		adminID = uint(id)
	} else {
		// Se não há parâmetro "id", usa o adminID do contexto
		var ok bool
		adminID, ok = c.Locals("userID").(uint)
		if !ok {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"message": "Administrator ID not found",
			})
		}
	}

	db := database.GetDatabase()
	var administrator models.Administrator

	// Busca o administrador com o ID determinado
	if err := db.Where("id_administrator = ?", adminID).First(&administrator).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Administrator not found. ID: " + fmt.Sprint(adminID),
		})
	}

	// Parseia o corpo da requisição para obter os dados atualizados
	var updatedAdministrator models.Administrator
	if err := c.BodyParser(&updatedAdministrator); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error parsing request body",
		})
	}

	// Verifica duplicidade no nome, excluindo o administrador atual
	if administrator.Name != updatedAdministrator.Name {
		var tempAdmin models.Administrator
		if err := db.Where("name = ? AND id_administrator != ?", updatedAdministrator.Name, adminID).First(&tempAdmin).Error; err == nil {
			return c.Status(fiber.StatusConflict).JSON(fiber.Map{
				"message": "Administrator with this name already exists",
			})
		}
	}

	// Atualiza os campos necessários
	administrator.Name = updatedAdministrator.Name
	administrator.Email = updatedAdministrator.Email
	administrator.Nickname = updatedAdministrator.Nickname
	administrator.Password = updatedAdministrator.Password

	/* // Hash da senha, se foi fornecida uma nova senha
	if updatedAdministrator.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(updatedAdministrator.Password), bcrypt.DefaultCost)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"message": "Error hashing password",
			})
		}
		administrator.Password = string(hashedPassword)
	} */

	// Salva as alterações no banco de dados
	if err := db.Save(&administrator).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error updating administrator: " + err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(administrator)
}
