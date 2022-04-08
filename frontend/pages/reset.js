/* eslint-disable react/prop-types */
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>You must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <Reset token={query.token} />
    </div>
  );
}
