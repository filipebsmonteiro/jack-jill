export default () => ({
  current: null,
  loading: false,
  list: [],
  subscribes: [],
  statuses: ['pending', 'approved', 'rejected'],
  roles: ['leader', 'follower', 'judge'],
})
