package models

import (
	"time"

	"github.com/RafaelMoreira96/game-beating-project/utils"
	"github.com/go-playground/validator/v10"
)

type Game struct {
	IdGame      uint       `gorm:"primaryKey" json:"id_game"`
	NameGame    string     `json:"name_game"`
	Developer   string     `json:"developer"`
	GenreID     uint       `json:"genre_id"`
	Genre       Genre      `gorm:"foreignKey:GenreID" json:"genre"`
	ConsoleID   uint       `json:"console_id"`
	Console     Console    `gorm:"foreignKey:ConsoleID" json:"console"`
	DateBeating utils.Date `json:"date_beating"`
	TimeBeating float64    `json:"time_beating"`
	ReleaseYear string     `json:"release_year"`
	PlayerID    uint       `json:"player_id"`
	Player      Player     `gorm:"foreignKey:PlayerID" json:"-"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}

func (game *Game) Validate() error {
	validate := validator.New()
	return validate.Struct(game)
}
