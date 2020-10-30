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
        sort_order: 6,
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 5,
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 4,
        name: 'verify',
        display_name: 'Verify Phone',
        icon: 'MdPaperPlane',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 3,
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{phone}'
      },
      {
        sort_order: 2,
        name: 'sms',
        display_name: 'Send Message',
        icon: 'MdText',
        user_only: false,
        unverified_only: false,
        action_value: '{phone}'
      },
      {
        sort_order: 1,
        name: 'call',
        display_name: 'Call',
        icon: 'MdCall',
        user_only: false,
        unverified_only: false,
        action_value: '{phone}'
      },
      {
        sort_order: 0,
        name: 'verify',
        display_name: 'Verify Attribute',
        icon: 'MdPaperPlane',
        user_only: true,
        unverified_only: true,
        action_value: '{uuid}'
      },
      {
        sort_order: 0,
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
        sort_order: 5,
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 4,
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 3,
        name: 'verify',
        display_name: 'Verify Email',
        icon: 'MdPaperPlane',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 2,
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{email}'
      },
      {
        sort_order: 1,
        name: 'email',
        display_name: 'Send Email',
        icon: 'MdMail',
        user_only: false,
        unverified_only: false,
        action_value: '{email}'
      },
      {
        sort_order: 0,
        name: 'verify',
        display_name: 'Verify Email',
        icon: 'MdPaperPlane',
        user_only: true,
        unverified_only: true,
        action_value: '{uuid}'
      },
      {
        sort_order: 0,
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
        sort_order: 7,
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 6,
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 5,
        name: 'verify',
        display_name: 'Verify Address',
        icon: 'MdPaperPlane',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 4,
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value:
          '{street_address_1},{street_address_2},{locality},{region},{postal_code},{country}'
      },
      {
        sort_order: 3,
        name: 'nav',
        display_name: 'Get Directions',
        icon: 'MdNavigate',
        user_only: false,
        unverified_only: false,
        action_value:
          '{street_address_1},{street_address_2},{locality},{region},{postal_code},{country}'
      },
      {
        sort_order: 2,
        name: 'verify',
        display_name: 'Verify Address',
        icon: 'MdPaperPlane',
        user_only: true,
        unverified_only: true,
        action_value: '{uuid}'
      },
      {
        sort_order: 1,
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
        sort_order: 5,
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 4,
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 3,
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{latitude},{longitude}'
      },
      {
        sort_order: 2,
        name: 'locate',
        display_name: 'Locate',
        icon: 'MdLocate',
        user_only: false,
        unverified_only: false,
        action_value: '{latitude},{longitude}'
      },
      {
        sort_order: 1,
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
        sort_order: 4,
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 3,
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 2,
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{handle}'
      },
      {
        sort_order: 1,
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
        sort_order: 4,
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 3,
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 2,
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{date}'
      },
      {
        sort_order: 1,
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
        sort_order: 4,
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 3,
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 2,
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{text}'
      },
      {
        sort_order: 1,
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
        sort_order: 4,
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 3,
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 2,
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{}'
      },
      {
        sort_order: 1,
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
        sort_order: 4,
        name: 'delete',
        display_name: 'Delete',
        icon: 'MdTrash',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 3,
        name: 'edit',
        display_name: 'Edit',
        icon: 'MdCreate',
        user_only: true,
        unverified_only: false,
        action_value: '{uuid}'
      },
      {
        sort_order: 2,
        name: 'copy',
        display_name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        user_only: false,
        unverified_only: false,
        action_value: '{}'
      },
      {
        sort_order: 1,
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
