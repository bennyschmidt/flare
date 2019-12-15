/*
 * AppViewContainer
 * ViewContainer
 */

class AppViewContainer extends ViewContainer {
  constructor() {
    super();

    this.state = {
      selectedTodo: {},
      todos: []
    };

    this.views = [
      NavBar,
      PageContent
    ];

    this.navigate('/todos');
  }

  didFetch(response, isError) {
    navigate('/todos');
  }

  didNavigate(response, isError) {
    const { route } = response;
    let state = {};

    if (isError && response.message) {
      console.warn(response.code, response.message);

      return response;
    }

    switch (route) {
      case '/todos':
        const { todos } = response;

        state = {
          route,

          selectedTodo: todos[0] || {},
          todos
        };

        break;
    }

    return this.setState(state);
  }
}
