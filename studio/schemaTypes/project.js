export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'service',
      title: 'Service',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'area',
      title: 'Area / Size',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'sector',
      title: 'Sector',
      type: 'string',
      options: {
        list: [
          { title: 'Commercial Real Estate & GCC', value: 'commgcc' },
          { title: 'Industrial & Warehousing', value: 'industrial' },
          { title: 'Data Centres & Critical Rooms', value: 'datacentres' },
          { title: 'Pharma & Biotech Life Sciences', value: 'pharma' },
          { title: 'Hospitality & Luxury Retail', value: 'hospitality' },
          { title: 'Hospital & Healthcare', value: 'healthcare' },
          { title: 'Educational Institutes', value: 'education' },
          { title: 'Gov & Infra', value: 'govinfra' }
        ]
      },
      validation: Rule => Rule.required()
    }
  ]
};
