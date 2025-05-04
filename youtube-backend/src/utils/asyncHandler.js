
export const asyncHandler = (requestHandler) => (req, res, next) => {
  return Promise.resolve(requestHandler(req, res, next)).catch(error => next(error))
}

// const handler = asyncHandler((req, res, next) => {
//   console.log("running", req, res, next)
// })

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message
//     })
//   }
// }

// const handler =  asyncHandler((req, res, next) => {

// })