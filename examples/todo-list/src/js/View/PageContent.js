/*
 * PageContent
 * View
 */

const PageContent = state => `
  <section id="PageContent">
    ${state.route === '/todos' ? HomePage(state) : Error404Page(state)}
  </section>
`;
