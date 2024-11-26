package models

// AccessType struct
type AccessType int

const (
	Admin AccessType = iota // 0
)

func (a AccessType) String() string {
	return [...]string{"Admin", "Manager"}[a]
}

// Administrator struct
type Administrator struct {
	IdAdministrator uint       `gorm:"primaryKey" json:"id_administrator"`
	Name            string     `json:"name"`
	Email           string     `json:"email"`
	Nickname        string     `json:"nickname"`
	Password        string     `json:"password"`
	AccessType      AccessType `json:"access_type"`
	IsActive        bool       `json:"is_active"`
}
