package com.nixls.backend.todo

import jakarta.validation.constraints.*


data class CreateTodoRequest(
    @field:NotBlank
    @field:Size(max = 255)
    val text: String,

    @field:NotBlank
    @field:Size(max = 64)
    val day: String,
)
