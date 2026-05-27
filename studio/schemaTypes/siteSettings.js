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
    },
    {
      name: 'featuredProjects',
      title: 'Featured Projects',
      description: 'Select and order up to 5 projects to showcase on the homepage carousel.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }]
        }
      ],
      validation: Rule => Rule.max(5)
    }
  ],
};
