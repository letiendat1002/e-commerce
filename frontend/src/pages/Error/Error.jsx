import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="not-found">
      <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>Page Not Found </p>
      <p>
        {/* <i>{error.statusText || error.message}</i> */}
      </p>
    </div>
  );
}