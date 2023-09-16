import { body, validationResult } from 'express-validator'

const createValidationMiddleware = (schema) => {
  let validationRules = []

  switch (schema) {
    case 'BrowserInfo':
      validationRules = [
        body('userID').isString(),
        body('userAgent').isString(),
        body('browserName').isString(),
        body('browserVersion').isString(),
        body('device').isString(),
        body('operatingSystem').isString(),
        body('timezone').isString(),
        body('language').isString(),
        body('timestamp').notEmpty().isISO8601()
      ]
      break
    case 'ButtonClick':
      validationRules = [
        body('userID').notEmpty().isString(),
        body('clicks').isArray(),
        body('clicks.*.buttonId').notEmpty().isString(),
        body('clicks.*.pageURL').notEmpty().isString(),
        body('clicks.*.timestamp').notEmpty().isISO8601()
      ]
      break
    case 'PageViewDuration':
      validationRules = [
        body('userID').notEmpty().isString(),
        body('pathURL').notEmpty().isString(),
        body('duration').notEmpty().isNumeric(),
        body('timestamp').notEmpty().isISO8601()
      ]
      break
    default:
      break
  }

  return [
    ...validationRules,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ 'Validation Error': errors.array() })
      }
      next()
    }
  ]
}

export default createValidationMiddleware
