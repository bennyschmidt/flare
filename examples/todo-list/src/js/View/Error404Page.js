/*
 * Error404Page
 * View
 */

const Error404Page = state => `
  <section id="Error404Page">
    <h3>404</h3>
    <p>The page you requested cannot be found.</p>
    ${console.log(state) ? '' : ''}
  </section>
`;
