[pyramid]: assets/pyramid.png

# Chapter 3: The Front End Testing Pyramid

The front-end test pyramid is a representation of how a front end test suite should be structured. The ideal test suite is comprised of unit tests, some snapshot tests, and a few end to end (e2e) tests.

![pyramid]

This is a revamped version of Martin Fowler's testing pyramid, specific for front-end applications.

## Unit tests

The first tests we’ll write are unit tests. In the front-end test pyramid, the bulk of our tests are unit tests. We have a lot of them because they are fast and granular. We will know in a few seconds if a test has failed after modifying our code, and why. Unit tests are good to check the fine details of how our application works.

Remember: the most part of the tests of your application should be unit tests, as they give you quick feedback when something is not working as expected.

## Snapshot tests

Snapshot tests are tests that take a picture of your rendered component and compare it with a previous picture of your component.

The best way to write snapshot tests in JavaScript is with Jest.

Instead of taking a picture of the rendered component, Jest takes a snapshot of the rendered component markup. This makes Jest snapshot tests much faster than traditional snapshot tests.

Snapshot tests are a way of checking nothing has changed about the style or markup of a component:

* If the snapshot tests pass, we know our code change didn’t affect the display of our components.
* If the tests fail, then we know that we did affect the render of the components and can check manually that the style is still correct.

You should have at least 1 snapshot test per component. A typical snapshot test renders the component with some state to check it renders correctly.

## E2E tests

End to end (e2e) tests are high-level tests. They perform the same actions as we would if we tested an App manually.

These tests tell us that our units are working together correctly. It gives us high confidence that the main functionality of the app is working.

You should have at least one or two end to end tests that test multiple components connected together.

## Source

This is a summary of the article [The Front-End Test Pyramid: How to Rethink Your Testing](https://www.freecodecamp.org/news/the-front-end-test-pyramid-rethink-your-testing-3b343c2bca51/) by Edd Yerburgh. If you want to know more about this topic, visit this article to find more information.

Continue to [Chapter 4: Unit and Snapshot testing with Jest](../chapter-4-unit-and-snapshot-testing-with-jest).
