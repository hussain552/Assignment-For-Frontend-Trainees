export const initialData = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cspm-1',
          name: 'Cloud Accounts',
          type: 'chart',
          chartType: 'donut',
          data: [
            { name: 'Connected', value: 2 },
            { name: 'Not Connected', value: 2 }
          ],
          total: 4
        },
        {
          id: 'cspm-2',
          name: 'Cloud Account Risk Assessment',
          type: 'chart',
          chartType: 'donut',
          data: [
            { name: 'Failed', value: 1689 },
            { name: 'Warning', value: 681 },
            { name: 'Not available', value: 36 },
            { name: 'Passed', value: 7253 }
          ],
          total: 9659
        }
      ]
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'cwpp-1',
          name: 'Top 5 Namespace Specific Alerts',
          type: 'placeholder',
          text: 'No Graph data available!'
        },
        {
          id: 'cwpp-2',
          name: 'Workload Alerts',
          type: 'placeholder',
          text: 'No Graph data available!'
        }
      ]
    },
    {
      id: 'registry',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'reg-1',
          name: 'Image Risk Assessment',
          type: 'chart',
          chartType: 'bar',
          data: [
            { name: 'Critical', value: 9 },
            { name: 'High', value: 950 },
            { name: 'Medium', value: 300 },
            { name: 'Low', value: 211 }
          ],
          total: 1470
        },
        {
          id: 'reg-2',
          name: 'Image Security Issues',
          type: 'chart',
          chartType: 'bar',
          data: [
            { name: 'Critical', value: 2 },
            { name: 'High', value: 2 },
            { name: 'Medium', value: 4 },
            { name: 'Low', value: 10 }
          ],
          total: 18
        }
      ]
    }
  ]
};
