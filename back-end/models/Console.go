package models

type Console struct {
	IdConsole      uint         `gorm:"primaryKey" json:"id_console"`
	NameConsole    string       `json:"name_console"`
	ManufacturerID uint         `json:"manufacturer_id"`
	Manufacturer   Manufacturer `gorm:"foreignKey:ManufacturerID" json:"manufacturer"`
	ReleaseDate    string       `json:"release_date"`
}
