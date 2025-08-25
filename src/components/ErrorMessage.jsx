function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3>Oops! Something went wrong</h3>
        <p>{message}</p>
        <small>Please check the city name and try again</small>
      </div>
    </div>
  );
}

export default ErrorMessage;