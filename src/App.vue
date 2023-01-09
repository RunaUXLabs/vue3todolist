<template>
	<div id="app">
		<TodoHeader></TodoHeader>
		<TodoInput></TodoInput>
		<TodoList></TodoList>
		<TodoFooter></TodoFooter>
	</div>
</template>

<script>

export default {
    components: { TodoHeader, TodoInput, TodoList, TodoFooter }
};
import TodoHeader from '../components/TodoHeader.vue';
import TodoInput from '../components/TodoInput.vue';
import TodoList from '../components/TodoList.vue';
import TodoFooter from '../components/TodoFooter.vue';
</script>

<style>
</style>