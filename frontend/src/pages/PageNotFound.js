const PageNotFound = () => {
  return (
    <div className="grid place-content-center h-screen text-center">
      <h1 className="mb-4 text-9xl font-bold text-meta-8">404</h1>
      <p className="mb-4 text-3xl text-gray-600">
        Oops! Looks like you're lost.
      </p>
      <div className="animate-bounce">
        <svg
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <p className="mt-4 text-gray-600">
        Let's get you back to &nbsp;
        <a href="/" className="text-danger">
          Home
        </a>
        .
      </p>
    </div>
  );
};

export default PageNotFound;
