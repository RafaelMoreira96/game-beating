package models

import "github.com/RafaelMoreira96/game-beating-project/utils"

type Game struct {
	IdGame      uint       `gorm:"primaryKey" json:"id_game"`
	NameGame    string     `json:"name_game"`
	Developer   string     `json:"developer"`
	GenreID     uint       `json:"genre_id"`
	Genre       Genre      `gorm:"foreignKey:GenreID" json:"genre"`
	ConsoleID   uint       `json:"console_id"`
	Console     Console    `gorm:"foreignKey:ConsoleID" json:"console"`
	DateBeating utils.Date `json:"date_beating"`
	TimeBeating string     `json:"time_beating"`
	ReleaseYear string     `json:"release_year"`
	PlayerID    uint       `json:"player_id"`
	Player      Player     `gorm:"foreignKey:PlayerID" json:"player"`
}
