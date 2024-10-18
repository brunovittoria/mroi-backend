import { Router } from 'express';
import { endpoint } from 'middlewares';
import { jwt } from 'middlewares/jwt';
import { authenticateUserController } from 'useCases/login/controller';
import { getProfileController } from 'useCases/profile/controller';
import { registerUserController } from 'useCases/registerUser/controller';
import { getUserSharesController } from 'useCases/shares/getUserShares/controller';
import { updateUserShareController } from 'useCases/shares/updateUserShare/controller';

const router = Router();

/**
 * Represents a RegisterPostRequestBody object
 * @typedef {object} RegisterPostRequestBody
 * @property {string} name - User name
 * @property {string} email - User Email
 * @property {string} password - User Password
 * @property {string} phone - User Phone
 */

/**
 * POST /register
 * @tags Authentication
 * @param {RegisterPostRequestBody} request.body.required
 * @return {AcessTokenResponse} 201 - success response
 * @return {Error} 500 - error response
 * @return {Error} 400 - User Already Exists
 */

/**
 * Represents a AcessTokenResponse object
 * @typedef {object} AcessTokenResponse
 * @property {string} token - Access Token
 */
router.post('/register', endpoint(registerUserController));

/**
 * Represents a LoginPostRequestBody object
 * @typedef {object} LoginPostRequestBody
 * @property {string} email - User Email
 * @property {string} password - User Password
 */

/**
 * POST /login
 * @tags Authentication
 * @param {LoginPostRequestBody} request.body.required
 * @return {AcessTokenResponse} 201 - success response
 * @return {Error} 500 - error response
 * @return {Error} 401 - Invalid Credentials
 */

router.post('/login', endpoint(authenticateUserController));

/**
 * Represents a ProfileGetRequestBody object
 * @typedef {object} ProfileGetRequestBody
 * @property {string} email - User Email
 * @property {string} phone - User Phone
 * @property {number} youtubeAccesses -Youtube Access
 * @property {number} githubAccesses - Github Access
 */

/**
 * GET /profile
 * @tags Profile
 * @security Bearer
 * @param {ProfileGetRequestBody} request.body.required
 * @return {ProfileResponse} 201 - success response
 * @return {Error} 500 - error response
 * @return {Error} 401 - Unauthorized
 */

/**
 * Represents a ProfileResponse object
 * @typedef {object} ProfileResponse
 * @property {User} user - User Object
 */

/**
 * Represents a User object
 * @typedef {object} User
 * @property {string} email - User Email
 * @property {string} phone - User Phone
 * @property {string} name - User name
 * @property {string} password - User Password
 */

router.get('/profile', jwt, endpoint(getProfileController));

/**
 * Represents a SharePutRequestBody object
 * @typedef {object} SharePutRequestBody
 * @property {string} destination - Access Destination
 */

/**
 * PUT /shares
 * @tags Share
 * @security Bearer
 * @param {SharePutRequestBody} request.body.required
 * @return  200 - success response
 * @return {Error} 500 - error response
 * @return {Error} 401 - Unauthorized
 */

router.put('/shares', jwt, endpoint(updateUserShareController));

/**
 * GET /shares
 * @tags Share
 * @security Bearer
 * @return {ShareSuccess} 201 - success response
 * @return {Error} 500 - error response
 * @return {Error} 401 - Unauthorized
 */

/**
 * Represents a ShareSuccess Object
 * @typedef {object} ShareSuccess
 * @property {Array<Share>} shares - Shares
 */

/**
 * Represents a Share Object
 * @typedef {object} Share
 * @property {number} id  - Id
 * @property {number} user_id  - User Id
 * @property {string} destination  - Destination
 * @property {number} click_count  - Click Count
 */

router.get('/shares', jwt, endpoint(getUserSharesController));

export default router;

//SWAGGER DOC
/**
 * A ordinary Error response
 * @typedef {object} Error
 * @property {Array<string>} errors.required - Error message
 */

/**
 * Represents a validation error.
 * @typedef {object} ValidationError
 * @property {Array<ValidationErrorItem>} errors.required - Array of validation error items.
 */

/**
 * Represents an item in the validation error array.
 * @typedef {object} ValidationErrorItem
 * @property {string} code.required - The error code (e.g., 'INVALID_FIELD').
 * @property {string} message.required - The error message (e.g., 'Invalid field: name').
 * @property {string} path.required - The path of the invalid field (e.g., 'name').
 */
