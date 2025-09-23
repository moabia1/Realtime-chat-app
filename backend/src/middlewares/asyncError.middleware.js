export const asyncError = (func) => {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((err) => {
      console.log(err)
    })
  }
}