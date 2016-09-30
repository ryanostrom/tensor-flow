import DS from 'ember-data';
export default DS.RESTAdapter.extend({
  coalesceFindRequests: true,
  namespace: 'localhost:8080/api'
});
