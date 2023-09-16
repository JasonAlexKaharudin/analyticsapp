import { query, validationResult } from 'express-validator'

const validateStartDate = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('startDate must be a valid ISO8601 date'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg)
      return res.status(422).json({ error: errorMessages })
    }
    next()
  }
]

export default validateStartDate
