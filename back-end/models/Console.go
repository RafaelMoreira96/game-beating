package models

import (
	"time"

	"github.com/go-playground/validator/v10"
)

type Console struct {
	IdConsole      uint         `gorm:"primaryKey" json:"id_console"`
	NameConsole    string       `json:"name_console"`
	ManufacturerID uint         `json:"manufacturer_id"`
	Manufacturer   Manufacturer `gorm:"foreignKey:ManufacturerID" json:"-"`
	ReleaseDate    string       `json:"release_date"`
	IsActive       bool         `json:"is_active"`
	CreatedAt      time.Time    `json:"created_at"`
	UpdatedAt      time.Time    `json:"updated_at"`
}

func (console *Console) Validate() error {
	validate := validator.New()
	return validate.Struct(console)
}
