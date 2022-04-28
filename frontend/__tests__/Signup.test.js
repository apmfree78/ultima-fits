import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import Signup, { SIGNUP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';
// import SignUp from '../components/SignUp';

const me = fakeUser();
const password = 'wes';
const mocks = [
  // Mutations Mock
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password,
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  // Current user mock
  /*  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: me } },
  }, */
];

describe('<Signup/>', () => {
  it('renders and matches snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('it calls the mutation properly', async () => {
    const { container, debug } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    // Type into the boxes
    await userEvent.type(screen.getByPlaceholderText(/name/), me.name);
    await userEvent.type(screen.getByPlaceholderText(/email/), me.email);
    await userEvent.type(screen.getByPlaceholderText(/password/), password);
    // Click Submit Button
    await userEvent.clear(screen.getByText('Sign Up!'));
    await screen.findByText(`Signed up with ${me.email}`);
    debug();
  });
});
