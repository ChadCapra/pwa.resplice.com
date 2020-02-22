import { AttributeType } from '../util/types'

export const attributeTypes: AttributeType[] = [
  {
    id: 1,
    name: 'Phone',
    verify_seconds: 300,
    empty_value: {
      phone: null
    },
    actions: [
      {
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'verify',
        display_name: 'Verify Phone',
        icon: 'MdPaperPlane',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{phone}'
      },
      {
        name: 'sms',
        display_name: 'Send Message',
        icon: 'MdText',
        user_only: false,
        unverified_only: false,
        action_value: '{phone}'
      },
      {
        name: 'call',
        display_name: 'Call',
        icon: 'MdCall',
        user_only: false,
        unverified_only: false,
        action_value: '{phone}'
      },
      {
        name: 'verify',
        display_name: 'Verify Attribute',
        icon: 'MdPaperPlane',
        user_only: true,
        unverified_only: true,
        action_value: '{uuid}'
      },
      {
        name: 'verify',
        display_name: 'Verify Attribute',
        icon: 'MdPaperPlane',
        user_only: true,
        unverified_only: true,
        action_value: '{uuid}'
      }
    ]
  },
  {
    id: 2,
    name: 'Email',
    verify_seconds: 300,
    empty_value: {
      email: null
    },
    actions: [
      {
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'verify',
        display_name: 'Verify Email',
        icon: 'MdPaperPlane',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{email}'
      },
      {
        name: 'email',
        display_name: 'Send Email',
        icon: 'MdMail',
        user_only: false,
        unverified_only: false,
        action_value: '{email}'
      },
      {
        name: 'verify',
        display_name: 'Verify Email',
        icon: 'MdPaperPlane',
        user_only: true,
        unverified_only: true,
        action_value: '{uuid}'
      },
      {
        name: 'verify',
        display_name: 'Verify Email',
        icon: 'MdPaperPlane',
        user_only: true,
        unverified_only: true,
        action_value: '{uuid}'
      }
    ]
  },
  {
    id: 3,
    name: 'Address',
    verify_seconds: 2592000,
    empty_value: {
      country: null,
      locality: null,
      postal_code: null,
      region: null,
      street_address_1: null,
      street_address_2: null
    },
    actions: [
      {
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'verify',
        display_name: 'Verify Address',
        icon: 'MdPaperPlane',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value:
          '{street_address_1},{street_address_2},{locality},{region},{postal_code},{country}'
      },
      {
        name: 'nav',
        display_name: 'Get Directions',
        icon: 'MdNavigate',
        user_only: false,
        unverified_only: false,
        action_value:
          '{street_address_1},{street_address_2},{locality},{region},{postal_code},{country}'
      },
      {
        name: 'verify',
        display_name: 'Verify Address',
        icon: 'MdPaperPlane',
        user_only: true,
        unverified_only: true,
        action_value: '{uuid}'
      },
      {
        name: 'map',
        display_name: 'View Map',
        icon: 'MdMap',
        user_only: false,
        unverified_only: false,
        action_value:
          '{street_address_1},{street_address_2},{locality},{region},{postal_code},{country}'
      }
    ]
  },
  {
    id: 4,
    name: 'Location',
    verify_seconds: null,
    empty_value: {
      latitude: null,
      longitude: null
    },
    actions: [
      {
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{latitude},{longitude}'
      },
      {
        name: 'locate',
        display_name: 'Locate',
        icon: 'MdLocate',
        user_only: false,
        unverified_only: false,
        action_value: '{latitude},{longitude}'
      },
      {
        name: 'navigate',
        display_name: 'Navigate',
        icon: 'MdNavigate',
        user_only: false,
        unverified_only: false,
        action_value: '{latitude},{longitude}'
      }
    ]
  },
  {
    id: 5,
    name: 'Hyperlink',
    verify_seconds: null,
    empty_value: {
      url: null
    },
    actions: [
      {
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{handle}'
      },
      {
        name: 'link',
        display_name: 'Open Link',
        icon: 'MdLink',
        user_only: false,
        unverified_only: false,
        action_value: '{url}'
      }
    ]
  },
  {
    id: 6,
    name: 'Date',
    verify_seconds: null,
    empty_value: {
      end: null,
      start: null
    },
    actions: [
      {
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{date}'
      },
      {
        name: 'calendar',
        display_name: 'Open Calendar',
        icon: 'MdCalendar',
        user_only: false,
        unverified_only: false,
        action_value: '{date}'
      }
    ]
  },
  {
    id: 7,
    name: 'Image',
    verify_seconds: null,
    empty_value: {
      image: null,
      thumbnail: null
    },
    actions: [
      {
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{text}'
      },
      {
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{text}'
      }
    ]
  },
  {
    id: 8,
    name: 'Text',
    verify_seconds: null,
    empty_value: {
      text: null
    },
    actions: [
      {
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{}'
      },
      {
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{}'
      }
    ]
  },
  {
    id: 9,
    name: 'JSON',
    verify_seconds: null,
    empty_value: {},
    actions: [
      {
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{}'
      },
      {
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{}'
      }
    ]
  }
]
