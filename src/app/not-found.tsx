const NotFound = () => {
  let value = null;

  if (typeof window !== 'undefined') {
      value = localStorage.getItem('key');
  }

  return (
      <div>
          <h1>404 - Page Not Found</h1>
          {value && <p>LocalStorage Value: {value}</p>}
      </div>
  );
};

export default NotFound;