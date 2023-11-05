export default () => ({
  current: null,
  loading: false,
  list: [],
  meta: null,
  subscribes: [],
  statuses: ['pending', 'approved', 'rejected'],
  roles: ['leader', 'follower', 'judge'],
})
