export const UserMainInfo = async () => {
  const response = await fetch('http://backend:8080/');
  const json = await response.json()

  return <div className="h-80">
    User info
    {JSON.stringify(json)}
  </div>;
};

