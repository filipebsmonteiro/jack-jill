export default () => ({
  current: null,
  loading: false,
  list: [],
  subscribes: [],
  scores: [],
  statuses: ['pending', 'approved', 'rejected'],
  roles: ['leader', 'follower', 'judge'],
})
