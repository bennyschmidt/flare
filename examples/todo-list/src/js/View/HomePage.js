/*
 * HomePage
 * View
 */

const HomePage = state => {

  /*
   * Events
   */

  events.addTodo = title => {
    state.todos.push({
      isCompleted: false,
      title
    });

    setState(state, {
      route: '/todos',
      todos: state.todos
    });
  };

  events.removeTodo = i => {
    state.todos.splice(i, 1);

    setState(state);
  };

  events.selectTodo = i => {
    state.selectedTodo = state.todos[i];

    setState(state);
  };

  events.toggleTodo = i => {
    state.todos.splice(i, 1, {
      isComplete: !state.todos[i].isComplete,
      title: state.todos[i].title
    });

    setState(state, {
      route: '/todos',
      todos: state.todos
    });
  };

  /*
   * Markup
   */

  return `
    <section id="HomePage">
      <div id="todos">
        <ul>
          ${
            state.todos.map((t, i) => `
              <li>
                <input type="checkbox" ${t.isComplete ? 'checked=checked' : ''} onchange="events.toggleTodo(${i})">
                  <span onclick="events.selectTodo(${i})">${t.title}</span>
                </input>
              </li>
            `).join('')
          }
        </ul>
      </div>
      <div id="todo">
        <p>
          Description:
        </p>
        <p>
          ${state.selectedTodo.title}
        </p>
        <p>
          Status:
        </p>
        <p class="${state.selectedTodo.isComplete ? 'success' : 'urgent'}">
          ${state.selectedTodo.isComplete ? '' : 'Not '}
          Completed
        </p>
      </div>
    </section>
  `
};
