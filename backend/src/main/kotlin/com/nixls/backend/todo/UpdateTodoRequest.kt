package com.nixls.backend.todo

import jakarta.validation.constraints.*

data class UpdateTodoRequest(
    @field:NotBlank
    @field:Size(max = 255)
    val text: String,
)
