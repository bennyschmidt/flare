/*
 * AppViewContainer
 * ViewContainer
 */

class AppViewContainer extends ViewContainer {

  /*
   * AppViewContainer.constructor
   * Initialize app state and views
   */
  constructor() {
    // Set a root element (defaults to <body> if empty)
    super(document.querySelector('#AppRoot'));

    // Set a default app state
    this.state = {
      message: 'hello world'
    };

    // Set which views should be rendered on state changes
    this.views = [
      Main
    ];

    // Set the app state to trigger the initial render
    this.setState(this.state);
  }

  /*
   * AppViewContainer.didFetch
   * Automatically called after a global "fetch" is invoked in any view
   */
  didFetch(response, isError) {
    // Do stuff after fetching data
  }

  /*
   * AppViewContainer.didNavigate
   * Automatically called after a global "navigate" is invoked in any view
   */
  didNavigate(response, isError) {
    // Do stuff after navigating to a new page

    const { route } = response;
    let state = {};

    // Validate the response
    if (isError && response.message) {
      console.warn(response.code, response.message);

      return response;
    }

    // Filter the response by route
    switch (route) {
      case '/home':
        console.log(route, response);

        // Reduce the "/home" response to a valid state change
        state = {};

        break;

      case '/about':

        // Reduce the "/about" response to a valid state change
        state = {};

        break;

      case '/contact':

        // Reduce the "/contact" response to a valid state change
        state = {};

        break;
    }

    // Update the state
    return this.setState(state);
  }
}
