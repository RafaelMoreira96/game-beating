package models

type Genre struct {
	IdGenre   uint   `gorm:"primaryKey" json:"id_genre"`
	NameGenre string `json:"name_genre"`
}
