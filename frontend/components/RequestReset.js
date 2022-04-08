import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Router } from 'next/router';
import { configure } from 'nprogress';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refetch currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    const res = await signup().catch(console.error);
    console.log(res);
    resetForm();
    // send the email and pass to graphqlAPI
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <Error error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check Your email for a link!</p>
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

        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}
