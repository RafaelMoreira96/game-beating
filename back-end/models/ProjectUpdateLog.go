package models

import "time"

type ProjectUpdateLog struct {
	IDProjectUpdateLog uint          `gorm:"primaryKey" json:"id_project_update_log"`
	Description        string        `json:"description"`
	AuthorID           uint          `json:"author_id"`
	Author             Administrator `gorm:"foreignKey:AuthorID" json:"administrator"`
	Content            string        `json:"content"`
	CreatedAt          time.Time     `json:"created_at"`
	UpdatedAt          time.Time     `json:"updated_at"`
}
