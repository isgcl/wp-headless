
import { useRouteError } from "react-router-dom";

function ErrorPage () { // react router hata sayfası klasik function olarak girilmeli, class kabul etmiyor!
    const error = useRouteError();
    return (
      <div className="error-page">
        <h2>Ooops! An error occured!</h2>
        <p>
            <i>{error.statusText || error.message}</i>
        </p>
        </div>
    )
}
export default ErrorPage