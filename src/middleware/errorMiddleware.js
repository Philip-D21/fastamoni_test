const handleNotFound = (req, res, next) => {
    res.status(404).json({ error: 'Not found' });
  };
  
  const handleErrors = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  };
  
  export default { handleNotFound, handleErrors };