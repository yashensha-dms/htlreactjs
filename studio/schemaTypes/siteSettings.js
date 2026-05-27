export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
    },
    {
      name: 'metrics',
      title: 'Homepage Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'metric',
          title: 'Metric',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() },
            { name: 'value', title: 'Value', type: 'number', validation: Rule => Rule.required() },
            { name: 'suffix', title: 'Suffix', type: 'string' },
          ]
        }
      ]
    }
  ],
};
