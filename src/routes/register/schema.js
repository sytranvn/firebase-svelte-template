import Joi from 'joi';
import { validatePassword, getAuth } from 'firebase/auth';
import { getApp } from 'firebase/app';

const schema = Joi.object({
  displayName: Joi.string().label("You Name")
    .min(3)
    .max(50)
    .required(),
  email: Joi.string().label("Email")
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().label("Password")
    .required()
    .custom(async (value, helper) => {
      const auth = getAuth(getApp())
      try {
        const passwordStatus = await validatePassword(auth, value)
        if (!passwordStatus.isValid) {
          let passwordFeedback = '';
          if (passwordStatus.containsNumericCharacter === false)
            passwordFeedback = 'Password must contain numbers';

          if (passwordStatus.containsNonAlphanumericCharacter === false)
            passwordFeedback = `Password must contain special characters (${passwordStatus.passwordPolicy.allowedNonAlphanumericCharacters})`;
          if (passwordStatus.containsLowercaseLetter === false)
            passwordFeedback = 'Password must contain lower case characters';

          if (passwordStatus.containsUppercaseLetter === false)
            passwordFeedback = 'Password must contain upper case characters';

          if (passwordStatus.meetsMinPasswordLength === false)
            passwordFeedback = `Password must have at least ${passwordStatus.passwordPolicy.customStrengthOptions.minPasswordLength} characters`;
          if (passwordStatus.meetsMaxPasswordLength === false)
            passwordFeedback = `Password must not have more than ${passwordStatus.passwordPolicy.customStrengthOptions.maxPasswordLength} characters`;
          return helper.message({ any:  passwordFeedback  })
        } else {
          return true;
        }
      } catch {
        return true;
      }
    }),

  aggreed: Joi.boolean().custom((value, helper) => { 
    if (value) return true;
    return helper.message({ 'any.only': 'Please aggree to term of service' }) 
  })

})
/**
 * @param {object} data 
 */
export default function validateForm(data) {
  const { error } = schema.validate(data, { abortEarly: false });
  return error;
}
