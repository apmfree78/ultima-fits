import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Router } from 'next/router';
import { configure } from 'nprogress';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data.redeemUserPasswordResetToken
    : undefined;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const res = await reset().catch(console.error);
    console.log(res);
    resetForm();
    // send the email and pass to graphqlAPI
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <Error error={error || successfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in with your new password!</p>
        )}

        <label htmlFor="email">
          Email
          <input
            required
            type="text"
            id="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            required
            type="password"
            id="password"
            name="password"
            placeholder="Your Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
