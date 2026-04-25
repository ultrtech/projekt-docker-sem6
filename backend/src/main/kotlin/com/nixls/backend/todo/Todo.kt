package com.nixls.backend.todo

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "todos")
class Todo(

	@Column(nullable = false, length = 255)
	var text: String,

	@Column(nullable = false, length = 64)
	var day: String,

) {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	var id: Long? = null
}