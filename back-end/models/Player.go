package models

type Player struct {
	IdPlayer     uint   `gorm:"primaryKey" json:"id_player"`
	NamePlayer   string `json:"name_player"`
	Email        string `json:"email"`
	Nickname     string `json:"nickname"`
	Password     string `json:"password"`
	RegisterDate string `json:"register_date"`
}
