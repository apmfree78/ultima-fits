import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Router } from 'next/router';
import { configure } from 'nprogress';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refetch currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
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
      <h2>Sign Up</h2>
      <Error error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please go ahead and sign in
          </p>
        )}
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
}
