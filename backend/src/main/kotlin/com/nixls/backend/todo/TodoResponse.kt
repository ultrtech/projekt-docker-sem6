package com.nixls.backend.todo

data class TodoResponse(
    val id: Long,
    val text: String,
    val day: String,
)