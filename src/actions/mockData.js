export const user = {
  name: 'Bastilla Shan',
  avatar:
    'https://res.cloudinary.com/capabit-solutions/image/upload/v1529002384/Resplice/lydkw9phbpozik3t8bus.png',
  contactsNum: 8,
  shares: 205
}

export const attributes = [
  {
    id: 1,
    attributeTypeId: 1,
    collection: 'Phones',
    name: 'Mobile',
    values: {
      countryCode: '+1',
      phone: '2185910657',
      extension: ''
    },
    verifiedAt: 1
  },
  {
    id: 2,
    attributeTypeId: 2,
    collection: 'Emails',
    name: 'Work',
    values: {
      email: 'marcus@capabit.com'
    },
    verifiedAt: 1
  },
  {
    id: 3,
    attributeTypeId: 2,
    collection: 'Emails',
    name: 'Personal',
    values: {
      email: 'marcusvirg@yahoo.com'
    },
    verifiedAt: null
  },
  {
    id: 4,
    attributeTypeId: 3,
    collection: 'Addresses',
    name: 'Home',
    values: {
      streetAddress: '886 21st Ave SE',
      streetAddress2: '',
      city: 'Minneapolis',
      state: 'MN',
      zipCode: '55414',
      zipRoute: ''
    }
  },
  {
    id: 5,
    attributeTypeId: 4,
    collection: 'Social',
    name: 'Instagram',
    values: {
      handle: '@marcusv345',
      link: 'https://www.instagram.com/marcusv345/'
    }
  },
  {
    id: 6,
    attributeTypeId: 4,
    collection: 'Social',
    name: 'LinkedIn',
    values: {
      handle: 'marcusvirg345@gmail.com',
      link: 'https://www.linkedin.com/in/marcusvirginia'
    }
  }
]

export const contact = {
  profile: {
    name: 'Darth Vader',
    shares: 50,
    avatar:
      'https://res.cloudinary.com/capabit-solutions/image/upload/v1529421479/Resplice/ncf3iws37vcg6tdofrgh.png',
    relationship: 'Father'
  },
  attributes: [
    {
      id: 1,
      attributeTypeId: 1,
      collection: 'Phones',
      name: 'Mobile',
      values: {
        countryCode: '+1',
        phone: '6123428709',
        extension: ''
      }
    },
    {
      id: 2,
      attributeTypeId: 2,
      collection: 'Emails',
      name: 'Work',
      values: {
        email: 'vader@deathstar.com'
      }
    },
    {
      id: 3,
      attributeTypeId: 2,
      collection: 'Emails',
      name: 'Personal',
      values: {
        email: 'anakin@jedi.com'
      }
    },
    {
      id: 4,
      attributeTypeId: 3,
      collection: 'Addresses',
      name: 'Home',
      values: {
        streetAddress: '1104 Coruscant LN',
        streetAddress2: '',
        city: 'Southern Sector',
        state: 'The Works District',
        zipCode: '55414',
        zipRoute: ''
      }
    },
    {
      id: 5,
      attributeTypeId: 4,
      collection: 'Social',
      name: 'Instagram',
      values: {
        handle: '@vader',
        link: 'https://www.instagram.com/vader/'
      }
    },
    {
      id: 6,
      attributeTypeId: 4,
      collection: 'Social',
      name: 'LinkedIn',
      values: {
        handle: 'vader',
        link: 'https://www.linkedin.com/in/vader'
      }
    }
  ]
}

export const attributeTypes = [
  {
    id: 1,
    defaultCollection: 'Phone',
    value: 'phone',
    name: 'Phone',
    parts: ['Country Code', 'Phone', 'Extension'],
    actions: [
      {
        sortOrder: 1,
        name: 'Call',
        icon: 'MdCall',
        script: 'tel:'
      },
      {
        sortOrder: 2,
        name: 'Send Message',
        icon: 'MdText',
        script: 'sms:'
      },
      {
        sortOrder: 3,
        name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        script: 'copy:'
      },
      {
        sortOrder: 4,
        name: 'Request Update',
        icon: 'MdNotifications',
        script: 'request:'
      }
    ]
  },
  {
    id: 2,
    defaultCollection: 'Email',
    value: 'email',
    name: 'Email',
    parts: ['Email'],
    actions: [
      {
        sortOrder: 1,
        name: 'Send Email',
        icon: 'MdMail',
        script: 'mail:'
      },
      {
        sortOrder: 2,
        name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        script: 'copy:'
      },
      {
        sortOrder: 3,
        name: 'Request Update',
        icon: 'MdNotifications',
        script: 'request:'
      }
    ]
  },
  {
    id: 3,
    defaultCollection: 'Address',
    value: 'address',
    name: 'Address',
    parts: [
      'Street Address',
      'Street Address 2',
      'City',
      'State',
      'Zip Code',
      'Zip Route'
    ],
    actions: [
      {
        sortOrder: 1,
        name: 'Map',
        icon: 'MdNavigate',
        script: 'nav:'
      },
      {
        sortOrder: 2,
        name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        script: 'copy:'
      },
      {
        sortOrder: 3,
        name: 'Request Update',
        icon: 'MdNotifications',
        script: 'request:'
      }
    ]
  },
  {
    id: 4,
    defaultCollection: 'Social Media',
    value: 'socialMedia',
    name: 'Social Media',
    parts: ['Handle', 'Link'],
    actions: [
      {
        sortOrder: 1,
        name: 'Open Link',
        icon: 'MdLink',
        script: 'link:'
      },
      {
        sortOrder: 2,
        name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        script: 'copy:'
      },
      {
        sortOrder: 3,
        name: 'Request Update',
        icon: 'MdNotifications',
        script: 'request:'
      }
    ]
  },
  {
    id: 5,
    defaultCollection: 'Other',
    value: 'text',
    name: 'Text',
    parts: ['Text', 'Link'],
    actions: [
      {
        sortOrder: 1,
        name: 'Open Link',
        icon: 'MdLink',
        script: 'link:'
      },
      {
        sortOrder: 2,
        name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        script: 'copy:'
      },
      {
        sortOrder: 3,
        name: 'Request Update',
        icon: 'MdNotifications',
        script: 'request:'
      }
    ]
  },
  {
    id: 6,
    defaultCollection: 'Other',
    value: 'date',
    name: 'Date',
    parts: ['Year', 'Month', 'Day'],
    actions: [
      {
        sortOrder: 1,
        name: 'Open Link',
        icon: 'MdLink',
        script: 'link:'
      },
      {
        sortOrder: 2,
        name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        script: 'copy:'
      },
      {
        sortOrder: 3,
        name: 'Request Update',
        icon: 'MdNotifications',
        script: 'request:'
      }
    ]
  },
  {
    id: 7,
    defaultCollection: 'Other',
    value: 'dateTime',
    name: 'Date/Time',
    parts: ['Year', 'Month', 'Day', 'Hour', 'Minute', 'Time Zone'],
    actions: [
      {
        sortOrder: 1,
        name: 'Open Link',
        icon: 'MdLink',
        script: 'link:'
      },
      {
        sortOrder: 2,
        name: 'Copy to Clipboard',
        icon: 'MdClipboard',
        script: 'copy:'
      },
      {
        sortOrder: 3,
        name: 'Request Update',
        icon: 'MdNotifications',
        script: 'request:'
      }
    ]
  }
]
