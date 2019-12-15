const skipTests = false;

const runTests = async () => {
  try {
    const element = document.querySelector('#AppRoot > div');
    const expectation = /hello world/.test(element.innerHTML);

    if (!expectation) {
      throw Error;
    }
  } catch(error) {
    console.log(error.message);
    console.log('<< ERROR >>', error);
  }
};

setTimeout(async() => {
  if (!skipTests) {

    await runTests();

    console.log('Tests completed.');
  }
}, 2000);
