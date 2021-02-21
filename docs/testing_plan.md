# SOEN-390 Testing Plan

## Testing the Server

### -- Goal --

Our goal for testing our server side code was to achieve the 50% coverage on our controller classes. We also wanted to ensure that the tests were ran in the pipeline and the coverage requirements were met before being able to merge a pull request. Example tests can be found under `server/tests/unit`. We have also added a few integration tests for the UserController under `server/tests/integration` which will be discussed further down in this document.

### -- Libraries Used --

 - [Mocha](https://mochajs.org/) (test framework)
 - [Sinon](https://sinonjs.org/) (Mocking library)
 - [Chai](https://www.chaijs.com/) (Assertion Library)
 - [Istanbul](https://istanbul.js.org/) (Coverage Library)
 - [Supertest](https://github.com/visionmedia/supertest) (API Integration test library)

#### Why we used these libraries:

To test our controllers which are written in Typescript, we selected [Mocha](https://mochajs.org/) as our test framework. Mocha is open-source, extremely popular and offers extensive documentation and community support which made setting up our test environment easy. It also makes asynchronous testing simple which is a necessity for our application. We then selected [Sinon](https://sinonjs.org/) and [Chai](https://www.chaijs.com/) for all our mocking and assertion needs respectively. Again these are both open-source massively popular frameworks that are used in industry for stubs and assertions. Lastly we went with [Istanbul](https://istanbul.js.org/) which is a code coverage library that integrates with our testing framework, Mocha. It is highly configurable and can be used to output coverage reports or to block deployments which do not meet coverage requirements. We decided to use supertest as it makes integration testing our api easy by simply creating a new instance of our application and passing it to the library to make HTTP requests and assertions.

Configuration file is found here `/server/.nycrc`

### -- Unit Tests --

Our main concern was to cover every controller with unit tests, meaning than any external calls leaving a controller file were stubbed/mocked. This ensures our classes are tested in complete isolation. Here is an example of a unit test:

```js
describe('login endpoint', () => {
    it('returns a user with a 200 status when service layer returns a user', async () => {
      const mockRequest = {
        body: mockUser,
      } as Request;

      const configStub = sandbox.stub(config, 'get').returns(false);
      const userServiceStub = sandbox.stub(userService, 'loginUser').returns(mockUser);

      const response = await controller.login(mockRequest);

      sinon.assert.calledOnce(userServiceStub);
      sinon.assert.calledOnce(configStub);
      expect(response).to.be.an.instanceof(results.JsonResult);
      expect(response.json).to.deep.equal({ user: mockUser, jwt: '' });
      expect(response.statusCode).to.equal(200);
    });
});
```

As you can see from this example, we are using sinon.sandbox to stub the 2 external calls to config.get() and userService.loginUser() to allow full isolation of our controller. The actual call to the controller is made in the middle then the last 5 lines of this unit test are the assertions. This will be the general format for all of our unit tests moving forward.


### -- Integration Tests --

We have currently implemented only happy path integration tests for all endpoints within the UserController. Happy path is referring to only the success scenario where our endpoints return a 200 status code. Moving forward, we will follow the structure of the first integration test implemented an apply it to all our controllers. The minimum tests we will aim for will be to test the happy paths of all our endpoints. We will also start to test error scenarios and fully test our database error handling. An example of an integration test:

```js
describe('POST /user/login', () => {
    it('returns a 200 with user when proper password and email match in db', async () => {
      const res = await supertest(app.server).post('/user/login').send({
        email: postBody.email,
        password: postBody.password,
      });
      delete res.body.user.id;

      expect(res.body).to.deep.equal({
        jwt: '',
        user: expectedUserRes,
      });
      expect(res.status).to.be.equal(200);
    });
  });
```

The first call in this test is made using supertest().post().send() which allows us to test a post request all the way down to our database. The last 2 lines in this test are the assertions made on the response from the api call. We will keep this format for our future integration tests.
### -- Pipeline --

Lastly we implemented a CI pipeline using Github Actions, which protects our develop (main) branch by running the tests in the pipeline to ensure that coverage is met and that no unwanted bugs are introduced in these files. We targeted coverage on our controller classes and set the branch, line, function and statement coverage to 50% for a pull request to be merged. We have also added the integration tests as a passing step however we are not expecting any coverage goals for this step.

# Moving Forward

## -- UI Testing --

Moving forward we plan on implementing different forms of tests for our UI.

### Libraries

There are different libraries we could use. We can keep the same libraries we have chosen above to test our UI as well however for the sake of learning different libraries we will choose a different testing stack. 



- [Jest](https://jestjs.io/en/) (All in one testing framework)
- [Enzyme](https://enzymejs.github.io/enzyme/) (Javascript testing utility for components)

We went with these 2 libraries as they provide everything we need to test our UI and they are extremely popular which will allow us to setup test quickly.

The different forms of testing we will use are the following:

### Snapshot Testing

Snapshot testing is extremely useful for catching unintended or unexpected changes in your UI. Essentially you store a "snapshot" or dump of the React tree of your component in a file and then you assert that the component matches that dump in a test. This means that any change to a component will be caught in the snapshot test. This is a an easy way to catch any changes that should not make it to production. If your changes are intended, the you update the snapshot in your files so that the test passes and you can then commit those changes for your team to review.

### Unit Testing

We will implement unit tests for our pure javascript functions and files in the same way that we would unit test our controllers for example. 

Example unit test taken from Jest docs:

```js
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### React Component Render Testing

This will be the last form of testing we will integrate into our testing flow. Component testing involves rendering a React component and asserting against the rendered React component. We will utilize Enzyme to traverse and pick out elements of the DOM to test on. This will be extremely useful to ensure that our components render with the expected behavior. We can also simulate events in these tests, for example button clicks on input changes.

Example taken from Enzyme docs:

```js
it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
```
