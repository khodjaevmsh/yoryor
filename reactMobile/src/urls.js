// CORE
export const SEND_NOTIFICATION = '/core/send-notification'

// USER
export const SEND_CODE = '/users/send-confirmation-code'
export const CONFIRM_CODE = '/users/check-confirmation-code'
export const SET_PASSWORD = '/users/set-password'
export const SIGN_UP = '/users/sign-up'
export const SIGN_IN = '/users/sign-in'
export const SIGN_OUT = '/users/sign-out'
export const CHANGE_PASSWORD = '/users/change-password'

export const COUNTRY = '/users/country'
export const REGION = '/users/region'

export const PROFILES = '/users/profiles'
export const PROFILE = '/users/profile/{id}'
export const PROFILE_IMAGES = '/users/profile/images'
export const PROFILE_IMAGE = '/users/profile/image/{id}'
export const CHANGE_PROFILE_IMAGES = '/users/profile/change_images'
export const SINGLE_PROFILE_IMAGE = '/users/profile/image'

export const LIKES = '/users/likes'
export const LIKE = '/users/like/{id}'
export const DISLIKES = '/users/dislikes'
export const DISLIKE = '/users/dislike/{id}'
export const NUM_OF_LIKES = '/users/num-of-likes'

export const DEVICE_TOKEN = '/users/device-token'

// CHAT
export const ROOMS = '/chat/rooms'
export const ROOM = '/chat/room/{id}'
export const MESSAGES = '/chat/messages'
export const UNSEEN_MESSAGES = '/chat/unseen-messages'
