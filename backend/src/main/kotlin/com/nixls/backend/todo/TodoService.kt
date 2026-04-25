package com.nixls.backend.todo

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.server.ResponseStatusException

@Service
class TodoService(
    private val todoRepository: TodoRepository,
) {
	@Transactional(readOnly = true)
    fun findAll(): List<TodoResponse> =
		todoRepository.findAll()
			.sortedBy { it.id }
			.map { it.toResponse() }

	@Transactional
    fun create(request: CreateTodoRequest): TodoResponse {
		val todo = Todo(
            text = request.text.trim(),
            day = request.day.trim(),
        )

		return todoRepository.save(todo).toResponse()
	}

	@Transactional
    fun update(id: Long, request: UpdateTodoRequest): TodoResponse {
		val todo = findTodo(id)
		todo.text = request.text.trim()

		return todo.toResponse()
	}

	@Transactional
    fun delete(id: Long) {
		if (!todoRepository.existsById(id)) {
			throw ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found")
		}

		todoRepository.deleteById(id)
	}

	private fun findTodo(id: Long): Todo =
		todoRepository.findById(id)
			.orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found") }

	private fun Todo.toResponse(): TodoResponse =
        TodoResponse(
            id = requireNotNull(id),
            text = text,
            day = day,
        )
}