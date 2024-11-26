package models

import (
	"time"

	"github.com/go-playground/validator/v10"
)

type Manufacturer struct {
	IdManufacturer   uint      `gorm:"primaryKey" json:"id_manufacturer"`
	NameManufacturer string    `json:"name_manufacturer"`
	YearFounded      int       `json:"year_founded"`
	IsActive         bool      `json:"is_active"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

func (manufacturer *Manufacturer) Validate() error {
	validate := validator.New()
	return validate.Struct(manufacturer)
}
