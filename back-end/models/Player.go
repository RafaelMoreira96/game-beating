package models

import (
	"time"

	"github.com/go-playground/validator/v10"
)

type Player struct {
	IdPlayer     uint      `gorm:"primaryKey" json:"id_player"`
	NamePlayer   string    `json:"name_player"`
	Email        string    `json:"email"`
	Nickname     string    `json:"nickname"`
	Password     string    `json:"password"`
	RegisterDate string    `json:"register_date"`
	IsActive     bool      `json:"is_active"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

func (player *Player) Validate() error {
	validate := validator.New()
	return validate.Struct(player)
}
