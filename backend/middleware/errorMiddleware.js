const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404); // set the status code
  next(error) // pass this to the error handler
}

const errorHandler = (err, req, res, next) => { // error first to overwrite default error handler
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode; // sometimes we might get a 200 response even though its an error (server error 500: fall back default.)
  res.status(statusCode); // reset it 
  res.json({
      message: err.message,
      stack: process.env.NODE_ENV == 'production' ? null : err.stack // we only need the stack trace in dev mode
  })

}
export { notFound, errorHandler }