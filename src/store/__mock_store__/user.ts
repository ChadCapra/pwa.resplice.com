import { IUserProfile, UserAttribute } from '../user/types'

type Dictionary<T> = {
  [key: string]: T
}

interface IUserMock {
  profile: IUserProfile
  attributes: Dictionary<UserAttribute>
}

export const UserMock: IUserMock = {
  profile: {
    uuid: 'uuid',
    name: 'Bastilla Shan',
    avatar:
      'https://res.cloudinary.com/capabit-solutions/image/upload/v1529002384/Resplice/lydkw9phbpozik3t8bus.png',
    locale: 'en-US',
    tags: {
      Friend: 'friend',
      Work: 'work'
    },
    unlock_pin: '555555',
    unlock_pin_expiry: 'datetime',
    user_registered_at: 'datetime',
    share_count: 10,
    attribute_count: 2,
    location_enabled: true,
    notification_value_uuid: 'val'
  },
  attributes: {
    uuidphone: {
      attribute_uuid: 'uuidphone',
      attribute_type_id: 1,
      name: 'Mobile Phone',
      collection: 'Phones',
      value_uuid: 'uuid1',
      value: { phone: '2185910657' },
      verified_at: 'datetime',
      latest_to_verify: true,
      verify_token: null,
      verify_expiry: null,
      qr_shareable: true,
      expiry: null
    },
    uuidemail: {
      attribute_uuid: 'uuidemail',
      attribute_type_id: 2,
      name: 'Primary Email',
      collection: 'Emails',
      value_uuid: 'uuid2',
      value: { email: 'bastilla@jedi.com' },
      verified_at: 'datetime',
      latest_to_verify: true,
      verify_token: null,
      verify_expiry: null,
      qr_shareable: true,
      expiry: null
    },
    uuidlink: {
      attribute_uuid: 'uuidlink',
      attribute_type_id: 5,
      name: 'Website',
      collection: 'Links',
      value_uuid: 'uuid3',
      value: {
        link:
          'https://starwars.com/somereallylonglinkthatwillprobablyoverflowthepage'
      },
      verified_at: 'datetime',
      latest_to_verify: true,
      verify_token: null,
      verify_expiry: null,
      qr_shareable: true,
      expiry: null
    }
  }
}
