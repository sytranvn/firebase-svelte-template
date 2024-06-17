import { object, string } from 'yup';
import { validatePassword, getAuth } from 'firebase/auth';
import { FirebaseError, getApp } from 'firebase/app';

const schema = object({
  displayName: string().label("You Name")
    .min(3)
    .max(50)
    .required(),
  email: string().label("Email")
    .email()
    .required(),
  password: string().label("Password")
    .required()
    .test(async function(value) {
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
          return this.createError({ message: passwordFeedback })
        } else {
          return true;
        }
      } catch {
        return true;
      }
    })/** @type {any} */,

  confirmPassword: string().test('passwords-match', 'Passwords must match', function(value,) {
    return value === this.parent.password
  }),
  aggreed: string().oneOf(["true"])
})
/**
 * @param {object} data 
 */
export default async function validateForm(data) {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (/** @type {any} */ err) {
    if (err instanceof FirebaseError) return;
    /** @type {Record<string ,string[]>} */
    const errors = {}
    err.inner.forEach(/** @param {any} i */(i) => {
      errors[i.path] = i.errors
    })
    return errors
  }
}
