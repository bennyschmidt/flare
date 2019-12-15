/*
 * NavBar
 * View
 */

const NavBar = state => `
  <header id="NavBar">
    <h2>
      Todo List
    </h2>
    <nav>
      <button onclick="navigate('/todos')" class="no-appearance${state.route === '/todos' ? ' active' : ''}">
        Home
      </button>
    </nav>
  </header>
`;
