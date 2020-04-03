import { AttributeType } from '../util/types'

export const attributeTypes: AttributeType[] = [
  {
    id: 1,
    name: 'Phone',
    default_collection: 'Phones',
    verify_seconds: 300,
    value_template: {
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
    default_collection: 'Emails',
    verify_seconds: 300,
    value_template: {
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
    default_collection: 'Addresses',
    verify_seconds: 2592000,
    value_template: {
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
    default_collection: 'Locations',
    verify_seconds: null,
    value_template: {
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
    default_collection: 'Links',
    verify_seconds: null,
    value_template: {
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
    default_collection: 'Dates',
    verify_seconds: null,
    value_template: {
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
    default_collection: 'Images',
    verify_seconds: null,
    value_template: {
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
    name: 'Markdown',
    default_collection: 'Other',
    verify_seconds: null,
    value_template: {
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
  }
]
